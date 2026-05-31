"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/utils/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";

export type Section = { heading: string; body: string };

async function requireAdmin() {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120);
}

function cleanSections(raw: unknown): Section[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((s) => {
      if (typeof s !== "object" || s === null) return null;
      const obj = s as Record<string, unknown>;
      return {
        heading: typeof obj.heading === "string" ? obj.heading.trim() : "",
        body: typeof obj.body === "string" ? obj.body.trim() : "",
      };
    })
    .filter((s): s is Section => !!s && (s.heading.length > 0 || s.body.length > 0));
}

function sectionsToContent(sections: Section[]): string {
  // Mirror sections into the legacy `content` text field for back-compat
  // with the existing public render until everything's migrated.
  return sections
    .map((s) => `${s.heading ? `## ${s.heading}\n\n` : ""}${s.body || ""}`)
    .join("\n\n");
}

function buildExcerpt(sections: Section[], explicit?: string): string {
  if (explicit?.trim()) return explicit.trim().slice(0, 500);
  const first = sections.map((s) => s.body).find((b) => b.length > 0) ?? "";
  return first.replace(/\s+/g, " ").trim().slice(0, 280);
}

type ArticleForm = {
  id?: string;
  title: string;
  slug?: string;
  category: string;
  excerpt?: string;
  sections: unknown;
  coverImage?: string;
  coverAlt?: string;
  authorName?: string;
  authorRole?: string;
  readTime?: string;
  tags?: string;
  publish: boolean;
};

export async function createArticle(form: ArticleForm) {
  await requireAdmin();
  const sections = cleanSections(form.sections);
  const title = form.title.trim();
  if (!title) throw new Error("Title is required");
  const slug = (form.slug?.trim() || slugify(title)).toLowerCase();
  if (!slug) throw new Error("Slug could not be generated");

  const existing = await prisma.insight.findUnique({ where: { slug } });
  if (existing) throw new Error(`Slug already exists: ${slug}`);

  const excerpt = buildExcerpt(sections, form.excerpt);
  const content = sectionsToContent(sections);

  const created = await prisma.insight.create({
    data: {
      slug,
      title,
      category: form.category.trim() || "General",
      content,
      excerpt,
      sections: sections as unknown as object, // JSON column
      coverImage: form.coverImage?.trim() || null,
      coverAlt: form.coverAlt?.trim() || null,
      authorName: form.authorName?.trim() || "Feroz Arshad",
      authorRole: form.authorRole?.trim() || "Independent Engineer, Designer & Strategist",
      readTime: form.readTime?.trim() || null,
      tags: form.tags?.trim() || null,
      publishedAt: form.publish ? new Date() : null,
    },
  });

  revalidatePath("/admin/insights");
  revalidatePath("/insights");
  revalidatePath(`/insights/${created.slug}`);
  redirect("/admin/insights");
}

export async function updateArticle(form: ArticleForm) {
  await requireAdmin();
  if (!form.id) throw new Error("Missing id");
  const sections = cleanSections(form.sections);
  const title = form.title.trim();
  if (!title) throw new Error("Title is required");

  const existing = await prisma.insight.findUnique({ where: { id: form.id } });
  if (!existing) throw new Error("Insight not found");

  const newSlug = form.slug?.trim().toLowerCase() || existing.slug;
  if (newSlug !== existing.slug) {
    const clash = await prisma.insight.findUnique({ where: { slug: newSlug } });
    if (clash) throw new Error(`Slug already exists: ${newSlug}`);
  }

  const excerpt = buildExcerpt(sections, form.excerpt);
  const content = sectionsToContent(sections);

  const updated = await prisma.insight.update({
    where: { id: form.id },
    data: {
      slug: newSlug,
      title,
      category: form.category.trim() || existing.category,
      content,
      excerpt,
      sections: sections as unknown as object,
      coverImage: form.coverImage?.trim() || null,
      coverAlt: form.coverAlt?.trim() || null,
      authorName: form.authorName?.trim() || existing.authorName || "Feroz Arshad",
      authorRole: form.authorRole?.trim() || existing.authorRole,
      readTime: form.readTime?.trim() || null,
      tags: form.tags?.trim() || null,
      publishedAt: form.publish ? existing.publishedAt ?? new Date() : null,
    },
  });

  revalidatePath("/admin/insights");
  revalidatePath("/insights");
  if (existing.slug !== updated.slug) revalidatePath(`/insights/${existing.slug}`);
  revalidatePath(`/insights/${updated.slug}`);
  redirect("/admin/insights");
}

export async function deleteArticle(id: string) {
  await requireAdmin();
  const existing = await prisma.insight.findUnique({ where: { id } });
  if (!existing) return;
  await prisma.insight.delete({ where: { id } });
  revalidatePath("/admin/insights");
  revalidatePath("/insights");
  revalidatePath(`/insights/${existing.slug}`);
}

export async function getArticleById(id: string) {
  await requireAdmin();
  return prisma.insight.findUnique({ where: { id } });
}

/**
 * Cover image upload via Vercel Blob.
 *
 * Per the Spenzio playbook: cover images live on CDN-backed storage with public
 * URLs (Vercel Blob here, Supabase Storage in the original). NOT in /public/
 * (which would require redeploys on every upload).
 *
 * Requires BLOB_READ_WRITE_TOKEN env var (Vercel auto-provisions when you enable
 * Blob storage on the project: Storage tab → Create → Blob). Hobby plan ships
 * 500 MB free per month which is plenty for blog covers.
 */
export async function uploadCoverImage(formData: FormData): Promise<{ url: string }> {
  await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File)) throw new Error("No file provided");
  if (file.size > 5 * 1024 * 1024) throw new Error("File too large (max 5 MB)");
  if (!file.type.startsWith("image/")) throw new Error("Only images allowed");

  const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
  const safeExt = /^[a-z0-9]{1,5}$/.test(ext) ? ext : "bin";
  const filename = `insights/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`;

  const blob = await put(filename, file, {
    access: "public",
    contentType: file.type,
    addRandomSuffix: false,
  });

  return { url: blob.url };
}
