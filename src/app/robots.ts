import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-data";

/**
 * Robots policy — per Spenzio playbook (`02_SEO_TECHNICAL_AND_PERFORMANCE.md`):
 *
 * > "AI crawler robots rules MUST include the same disallow. A bare
 * >  User-agent: GPTBot / Allow: / overrides * and exposes /admin."
 *
 * Each explicit AI/answer-engine bot gets the SAME shared disallow so they
 * can't crawl /admin, /api, or /thank-you.
 *
 * We DO welcome AI bots (ChatGPT / Perplexity / Claude / Gemini etc.) —
 * blocking them removes us from answer-engine citations, which is pure
 * downside for a marketing site.
 */

const DISALLOW = [
  "/admin",
  "/admin/*",
  "/api/*",
];

// Major web search + AI/answer-engine crawlers. All get Allow with shared disallow.
const AI_AND_ENGINES = [
  // OpenAI
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic
  "ClaudeBot",
  "anthropic-ai",
  "Claude-Web",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google AI
  "Google-Extended",
  // Apple AI + crawler
  "Applebot-Extended",
  "Applebot",
  // Microsoft
  "Bingbot",
  // Open data / others
  "CCBot",
  "Amazonbot",
  "Bytespider",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default policy for any bot not listed below
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      // Each named crawler MUST repeat the disallow — see header comment.
      ...AI_AND_ENGINES.map((ua) => ({
        userAgent: ua,
        allow: "/",
        disallow: DISALLOW,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
