import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { IconArrowLeft, IconCalendar, IconFolder } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  ArticleSchema,
  BreadcrumbSchema,
} from "@/components/StructuredData";
import {
  SITE_URL,
  SITE_NAME,
  AUTHOR,
  DEFAULT_OG_IMAGE,
  toAbsolute,
} from "@/lib/site-data";

/**
 * Per Spenzio playbook (`04_BLOG_CMS_ADMIN_PORTAL.md`):
 *  - generateStaticParams from published insights → every article pre-renders
 *  - revalidate = 3600 (ISR) — picks up DB edits hourly without redeploy
 *  - Article + BreadcrumbList JSON-LD with publisher → Org @id, inLanguage en-US
 *  - Cover via next/image fill + priority + aspect-video parent (zero CLS)
 *  - Renders multi-section bodies with whitespace-pre-line (plain text, no HTML).
 *    Falls back to legacy `content` field if no sections present.
 */
export const revalidate = 3600;

type Section = { heading: string; body: string };

export async function generateStaticParams() {
  try {
    const slugs = await prisma.insight.findMany({
      where: { publishedAt: { not: null } },
      select: { slug: true },
    });
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

function plainText(str: string): string {
  return str.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function sectionsFromRow(row: { sections: unknown; content: string }): Section[] {
  if (Array.isArray(row.sections)) {
    return (row.sections as Section[]).filter(
      (s) => s && typeof s === "object" && (s.heading || s.body)
    );
  }
  if (row.content) {
    return [{ heading: "", body: row.content }];
  }
  return [];
}

function wordCountOf(sections: Section[]): number {
  const blob = sections.map((s) => `${s.heading} ${s.body}`).join(" ");
  const plain = plainText(blob);
  return plain ? plain.split(/\s+/).filter(Boolean).length : 0;
}

function excerptOf(sections: Section[], explicit?: string | null, max = 155): string {
  if (explicit?.trim()) return explicit.trim().slice(0, max);
  const first = sections.map((s) => s.body).find((b) => b.length > 0) ?? "";
  const plain = plainText(first);
  return plain.length <= max ? plain : plain.slice(0, max - 1).trimEnd() + "…";
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const insight = await prisma.insight.findUnique({ where: { slug } });
  if (!insight) return { title: "Insight not found" };

  const sections = sectionsFromRow(insight);
  const desc = excerptOf(sections, insight.excerpt);
  const url = `/insights/${insight.slug}`;
  const image = insight.coverImage || DEFAULT_OG_IMAGE;

  return {
    title: insight.title,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: insight.title,
      description: desc,
      url,
      type: "article",
      publishedTime: (insight.publishedAt ?? insight.createdAt).toISOString(),
      modifiedTime: insight.updatedAt.toISOString(),
      authors: [SITE_URL],
      tags: insight.tags ? insight.tags.split(",").map((t) => t.trim()) : undefined,
      images: [{ url: image, width: 1200, height: 630, alt: insight.coverAlt || insight.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: insight.title,
      description: desc,
      images: [image],
    },
  };
}

export default async function InsightPost(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const insight = await prisma.insight.findUnique({ where: { slug } });
  if (!insight) notFound();

  const sections = sectionsFromRow(insight);
  const words = wordCountOf(sections);
  const publishedAt = (insight.publishedAt ?? insight.createdAt).toISOString();
  const modifiedAt = insight.updatedAt.toISOString();
  const url = `/insights/${insight.slug}`;
  const desc = excerptOf(sections, insight.excerpt);
  const image = insight.coverImage ? toAbsolute(insight.coverImage) : toAbsolute(DEFAULT_OG_IMAGE);
  const authorName = insight.authorName || AUTHOR.name;
  const authorRole = insight.authorRole || AUTHOR.jobTitle;
  const readTime = insight.readTime || `${Math.max(1, Math.ceil(words / 220))} min read`;
  const tagList = insight.tags ? insight.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];

  return (
    <>
      <ArticleSchema
        headline={insight.title}
        description={desc}
        url={url}
        image={image}
        datePublished={publishedAt}
        dateModified={modifiedAt}
        author={{ name: authorName, url: SITE_URL }}
        wordCount={words}
        keywords={tagList.length > 0 ? tagList : insight.category ? [insight.category] : undefined}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Insights", url: "/insights" },
          { name: insight.title, url },
        ]}
      />

      <Navbar />
      <main className="min-h-screen pt-32 pb-20 relative">
        <div className="absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-primary/5 to-transparent -z-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-primary hover:text-blue-400 transition-colors mb-8 font-semibold text-sm uppercase tracking-wider"
          >
            <IconArrowLeft className="w-4 h-4" />
            Back to insights
          </Link>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight mb-8">
            {insight.title}
          </h1>

          {/* meta strip */}
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground border-b border-border pb-8 mb-10">
            <div className="flex items-center gap-2">
              <IconCalendar className="w-5 h-5 text-primary" />
              <time dateTime={publishedAt}>
                {new Date(publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <IconFolder className="w-5 h-5 text-primary" />
              <span className="uppercase tracking-wide text-sm font-semibold">
                {insight.category}
              </span>
            </div>
            <div className="text-sm">{readTime}</div>
          </div>

          {/* author byline */}
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-border">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm">
              {authorName.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="leading-tight">
              <div className="font-medium text-foreground">{authorName}</div>
              <div className="text-xs text-muted-foreground">
                {authorRole} · {SITE_NAME}
              </div>
            </div>
          </div>

          {/* cover image (LCP candidate — priority) */}
          {insight.coverImage && (
            <figure className="mb-12 -mx-4 md:mx-0">
              <div className="relative aspect-video rounded-lg overflow-hidden border border-border">
                <Image
                  src={insight.coverImage}
                  alt={insight.coverAlt || insight.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 900px"
                  className="object-cover"
                />
              </div>
              {insight.coverAlt && (
                <figcaption className="mt-3 text-center text-xs text-muted-foreground">
                  {insight.coverAlt}
                </figcaption>
              )}
            </figure>
          )}

          {/* body */}
          <article className="prose prose-invert prose-lg max-w-none text-foreground prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-blue-400 prose-p:leading-relaxed">
            {sections.length === 0 ? (
              <p className="text-muted-foreground italic">
                This insight has no published body yet.
              </p>
            ) : (
              sections.map((section, idx) => (
                <section key={idx} className="mb-12">
                  {section.heading && (
                    <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-4">
                      {section.heading}
                    </h2>
                  )}
                  <div className="whitespace-pre-line leading-relaxed">
                    {section.body}
                  </div>
                </section>
              ))
            )}
          </article>

          {/* tags */}
          {tagList.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-2">
              {tagList.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
