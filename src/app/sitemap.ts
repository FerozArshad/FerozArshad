import type { MetadataRoute } from "next";
import { SITE_URL as BASE } from "@/lib/site-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/insights`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  // Pull live insights from DB if available; fall back silently if Prisma unavailable
  let insightPages: MetadataRoute.Sitemap = [];
  try {
    const { prisma } = await import("@/lib/prisma");
    const insights = await prisma.insight.findMany({
      where: { publishedAt: { not: null } },
      select: { slug: true, updatedAt: true },
    });
    insightPages = insights.map((i) => ({
      url: `${BASE}/insights/${i.slug}`,
      lastModified: i.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    // DB unavailable at build → static fallback ok
  }

  return [...staticPages, ...insightPages];
}
