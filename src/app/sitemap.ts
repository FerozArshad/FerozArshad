import type { MetadataRoute } from "next";
import { portfolioData } from "@/data/portfolioData";
import { servicesData } from "@/data/servicesData";

const BASE = "https://ferozarshad.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/insights`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];

  const servicePages: MetadataRoute.Sitemap = servicesData.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const portfolioPages: MetadataRoute.Sitemap = portfolioData.map((p) => ({
    url: `${BASE}/portfolio/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

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

  return [...staticPages, ...servicePages, ...portfolioPages, ...insightPages];
}
