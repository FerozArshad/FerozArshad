import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { IconArrowLeft, IconCalendar, IconFolder } from "@tabler/icons-react";
import Link from "next/link";
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
 * Per the Spenzio playbook (`04_BLOG_CMS_ADMIN_PORTAL.md`):
 *  - `generateStaticParams` from getAllSlugs() → every published article
 *    pre-renders at build.
 *  - `revalidate = 3600` ISR — picks up DB edits within an hour; server-action
 *    `revalidatePath` from /admin/insights mutations invalidates immediately.
 *  - `generateMetadata`: pulls article, sets alternates.canonical,
 *    openGraph.images: [cover_image] + twitter.images, OG type 'article',
 *    publishedTime, modifiedTime, authors, tags.
 *  - Renders Article + BreadcrumbList JSON-LD with publisher → Org @id,
 *    mainEntityOfPage, inLanguage 'en-US', wordCount from content.
 */
export const revalidate = 3600;

// Pre-render every published insight at build time
export async function generateStaticParams() {
  try {
    const slugs = await prisma.insight.findMany({
      where: { publishedAt: { not: null } },
      select: { slug: true },
    });
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    // If DB is unreachable at build, fall back to dynamic rendering
    return [];
  }
}

function plainTextFromContent(content: string): string {
  return content.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function excerpt(content: string, max = 155): string {
  const plain = plainTextFromContent(content);
  if (plain.length <= max) return plain;
  return plain.slice(0, max - 1).trimEnd() + "…";
}

function wordCount(content: string): number {
  const plain = plainTextFromContent(content);
  if (!plain) return 0;
  return plain.split(/\s+/).filter(Boolean).length;
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const insight = await prisma.insight.findUnique({ where: { slug } });
  if (!insight) return { title: "Insight not found" };

  const desc = excerpt(insight.content);
  const url = `/insights/${insight.slug}`;
  // Until cover-image upload (task #11) lands, fall back to the brand OG image.
  const image = DEFAULT_OG_IMAGE;

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
      tags: insight.category ? [insight.category] : undefined,
      images: [{ url: image, width: 1200, height: 630, alt: insight.title }],
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

  const publishedAt = (insight.publishedAt ?? insight.createdAt).toISOString();
  const modifiedAt = insight.updatedAt.toISOString();
  const url = `/insights/${insight.slug}`;
  const desc = excerpt(insight.content);
  const words = wordCount(insight.content);
  const image = toAbsolute(DEFAULT_OG_IMAGE);

  return (
    <>
      {/* ── JSON-LD ───────────────────────────────────────────────────── */}
      <ArticleSchema
        headline={insight.title}
        description={desc}
        url={url}
        image={image}
        datePublished={publishedAt}
        dateModified={modifiedAt}
        author={{ name: AUTHOR.name, url: SITE_URL }}
        wordCount={words}
        keywords={insight.category ? [insight.category] : undefined}
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
            Back to Engineering Blog
          </Link>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight mb-8">
            {insight.title}
          </h1>

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
            <div className="text-sm text-muted-foreground">
              {Math.max(1, Math.ceil(words / 220))} min read
            </div>
          </div>

          {/* Author byline — E-E-A-T author signal */}
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-border">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm">
              {AUTHOR.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="leading-tight">
              <div className="font-medium text-foreground">{AUTHOR.name}</div>
              <div className="text-xs text-muted-foreground">
                {AUTHOR.jobTitle} · {SITE_NAME}
              </div>
            </div>
          </div>

          <article className="prose prose-invert prose-lg max-w-none text-foreground prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-blue-400 prose-p:leading-relaxed">
            {/* Trusted content — only admin can publish via /admin/insights. */}
            <div dangerouslySetInnerHTML={{ __html: insight.content.replace(/\n/g, "<br/>") }} />
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
