/**
 * SINGLE SOURCE OF TRUTH for canonical host + site identity.
 *
 * Per the Spenzio playbook (`02_SEO_TECHNICAL_AND_PERFORMANCE.md`):
 *   "The #1 SEO bug we found: metadataBase/canonicals pointed to one host but the
 *    served host was another. Google sees the declared canonical redirecting and
 *    splits or discounts ranking signals."
 *
 * Every absolute URL used in metadata, sitemap, robots, JSON-LD @id/url MUST
 * derive from `SITE_URL`. Never `process.env.NEXT_PUBLIC_SITE_URL` (drifts on
 * Vercel between build + run), never an inline string.
 *
 * If we ever change canonical host (apex ↔ www), change ONE constant here.
 */

export const SITE_URL = "https://ferozarshad.com";

export const SITE_NAME = "Feroz Arshad";
export const SITE_TITLE = "Feroz Arshad — Solo Engineer, Designer & Strategist";
export const SITE_DESCRIPTION =
  "A one-person practice that ships SaaS, AI automation and high-conversion commerce. Weekly Friday demos, outcome pricing, NDA + full IP transfer on every brief.";

export const SITE_LOCALE = "en_US";
export const SITE_LANG = "en-US";

/** JSON-LD @id anchors — referenced from other entities (publisher, provider, etc.) */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const SERVICE_ID = `${SITE_URL}/#service`;
export const PERSON_ID = `${SITE_URL}/#person`;

/** Personal-brand identity used in structured data + author bylines */
export const AUTHOR = {
  name: "Feroz Arshad",
  jobTitle: "Independent Engineer, Designer & Strategist",
  email: "info@ferozarshad.com",
  emailContact: "hello@ferozarshad.com",
  location: { city: "Karachi", country: "PK", countryName: "Pakistan" },
  socials: [
    "https://github.com/FerozArshad",
    "https://linkedin.com/in/ferozarshad",
  ],
};

export const CONTACT = {
  email: "info@ferozarshad.com",
  emailHello: "hello@ferozarshad.com",
};

/** OG / Twitter default image (relative paths are resolved against metadataBase = SITE_URL) */
export const DEFAULT_OG_IMAGE = "/logo-black.png";

/**
 * Build an absolute URL on the canonical host.
 *  toAbsolute("/insights/foo")  →  "https://ferozarshad.com/insights/foo"
 *  toAbsolute("https://x.com")  →  "https://x.com"   (already absolute, pass-through)
 */
export function toAbsolute(path: string): string {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Browser-side origins allowed to POST to public APIs (CSRF / origin allowlist).
 * Must include apex + www explicitly — `process.env.NEXT_PUBLIC_SITE_URL` is
 * unreliable on Vercel build/run boundaries.
 */
export const ALLOWED_ORIGINS = [
  "https://ferozarshad.com",
  "https://www.ferozarshad.com",
  // Vercel preview domain pattern is allowed below via .endsWith() check; this list
  // covers the canonical production hosts.
];

/** Returns true if a given Origin header value is allowed to POST to public APIs. */
export function isAllowedOrigin(origin: string | null | undefined): boolean {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  // Allow Vercel preview deployments of either project
  if (origin.endsWith(".vercel.app")) return true;
  // Allow localhost during dev (different ports)
  if (origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:")) return true;
  return false;
}
