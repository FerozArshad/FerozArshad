import {
    SITE_URL,
    SITE_NAME,
    SITE_DESCRIPTION,
    SITE_LANG,
    ORG_ID,
    WEBSITE_ID,
    SERVICE_ID,
    PERSON_ID,
    AUTHOR,
    DEFAULT_OG_IMAGE,
    toAbsolute,
} from "@/lib/site-data";

/**
 * Schema.org JSON-LD generators.
 *
 * Per the Spenzio playbook (`02_SEO_TECHNICAL_AND_PERFORMANCE.md`):
 *   - One canonical SITE_URL. Every absolute URL routes through site-data.ts.
 *   - Org + WebSite are emitted from the root layout (site-wide).
 *   - Service + FAQ + Breadcrumb are emitted from the relevant page.
 *   - FAQ schema text MUST match visible rendered FAQ text exactly.
 */

const LOGO_URL = toAbsolute(DEFAULT_OG_IMAGE);

// ─────────────────────────────────────────────────────────────────────────────
// PERSON  ·  /#person
// ─────────────────────────────────────────────────────────────────────────────
export const PersonSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": PERSON_ID,
        name: AUTHOR.name,
        url: SITE_URL,
        image: LOGO_URL,
        sameAs: AUTHOR.socials,
        jobTitle: AUTHOR.jobTitle,
        description:
            "Solo practice shipping SaaS, AI automation, and high-conversion commerce. Weekly Friday demos, outcome pricing, full IP transfer.",
        email: AUTHOR.email,
        knowsAbout: [
            "Next.js", "React", "Python", "Node.js", "n8n", "OpenAI",
            "E-Commerce", "SaaS", "AI Automation", "Web Scraping", "Docker",
            "Prisma", "PostgreSQL", "MySQL", "Headless Commerce", "Shopify Hydrogen",
        ],
        address: {
            "@type": "PostalAddress",
            addressLocality: AUTHOR.location.city,
            addressCountry: AUTHOR.location.country,
        },
        worksFor: { "@id": ORG_ID },
    };
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
};

// ─────────────────────────────────────────────────────────────────────────────
// WEBSITE  ·  /#website
// ─────────────────────────────────────────────────────────────────────────────
export const WebsiteSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        inLanguage: SITE_LANG,
        publisher: { "@id": ORG_ID },
        potentialAction: {
            "@type": "SearchAction",
            target: `${SITE_URL}/insights?q={search_term_string}`,
            "query-input": "required name=search_term_string",
        },
    };
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
};

// ─────────────────────────────────────────────────────────────────────────────
// PROFESSIONAL SERVICE  ·  /#service (also serves as the "Organization" entity)
// ─────────────────────────────────────────────────────────────────────────────
export const ProfessionalServiceSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": ["Organization", "ProfessionalService"],
        "@id": ORG_ID,
        additionalType: SERVICE_ID,
        name: `${SITE_NAME} — Independent Practice`,
        legalName: SITE_NAME,
        url: SITE_URL,
        logo: LOGO_URL,
        image: LOGO_URL,
        description:
            "Full-stack engineering, design & strategy in one head. SaaS, AI automation, headless commerce. Weekly Friday demos, outcome pricing, full IP transfer on delivery.",
        slogan: "One operator. No agency. No handoffs.",
        priceRange: "$$$",
        areaServed: [
            { "@type": "Country", name: "Worldwide" },
            { "@type": "Country", name: "United States" },
            { "@type": "Country", name: "United Kingdom" },
            { "@type": "Country", name: "Pakistan" },
        ],
        serviceType: [
            "AI & Workflow Automation",
            "Full-Stack SaaS Architecture",
            "Headless E-Commerce Development",
            "Custom Web Design & Development",
            "Technical Strategy & CTO Advisory",
        ],
        email: AUTHOR.email,
        founder: { "@id": PERSON_ID },
        sameAs: AUTHOR.socials,
        contactPoint: [
            {
                "@type": "ContactPoint",
                contactType: "sales",
                email: AUTHOR.emailContact,
                availableLanguage: ["English", "Urdu"],
                areaServed: "Worldwide",
            },
            {
                "@type": "ContactPoint",
                contactType: "customer support",
                email: AUTHOR.email,
                availableLanguage: ["English"],
                areaServed: "Worldwide",
            },
        ],
        address: {
            "@type": "PostalAddress",
            addressLocality: AUTHOR.location.city,
            addressCountry: AUTHOR.location.country,
        },
        makesOffer: [
            { "@type": "Offer", name: "The Sprint", price: "8000", priceCurrency: "USD", description: "4-week fixed scope" },
            { "@type": "Offer", name: "The Build", price: "25000", priceCurrency: "USD", description: "8–16 week full-stack build" },
            { "@type": "Offer", name: "The Retainer", price: "5000", priceCurrency: "USD", description: "Monthly retainer, 20 senior hours" },
        ],
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "60",
            bestRating: "5",
        },
    };
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
};

// ─────────────────────────────────────────────────────────────────────────────
// BREADCRUMBS
// ─────────────────────────────────────────────────────────────────────────────
type Crumb = { name: string; url: string };
export const BreadcrumbSchema = ({ items }: { items: Crumb[] }) => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: item.name,
            item: item.url.startsWith("http") ? item.url : toAbsolute(item.url),
        })),
    };
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
};

// ─────────────────────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────────────────────
type FaqItem = { q: string; a: string };
export const FaqSchema = ({ items }: { items: FaqItem[] }) => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
    };
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
};

// ─────────────────────────────────────────────────────────────────────────────
// CASE STUDY ITEM LIST
// ─────────────────────────────────────────────────────────────────────────────
type Case = {
    name: string;
    description: string;
    url: string;
    image?: string;
};
export const CaseStudySchema = ({ items }: { items: Case[] }) => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: items.map((c, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            item: {
                "@type": "CreativeWork",
                name: c.name,
                description: c.description,
                url: c.url.startsWith("http") ? c.url : toAbsolute(c.url),
                ...(c.image && { image: c.image.startsWith("http") ? c.image : toAbsolute(c.image) }),
                author: { "@id": PERSON_ID },
            },
        })),
    };
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
};

// ─────────────────────────────────────────────────────────────────────────────
// SERVICE (per-service landing page) — used on /services/[slug] in next epic
// ─────────────────────────────────────────────────────────────────────────────
type ServiceProps = {
    name: string;
    description: string;
    serviceType: string;
    url: string;
    image?: string;
};
export const ServiceSchema = ({ name, description, serviceType, url, image }: ServiceProps) => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        serviceType,
        url: url.startsWith("http") ? url : toAbsolute(url),
        ...(image && { image: image.startsWith("http") ? image : toAbsolute(image) }),
        provider: { "@id": ORG_ID },
        areaServed: [
            { "@type": "Country", name: "Worldwide" },
        ],
        inLanguage: SITE_LANG,
    };
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
};

// ─────────────────────────────────────────────────────────────────────────────
// ARTICLE (per-insight detail page) — used on /insights/[slug] in next epic
// ─────────────────────────────────────────────────────────────────────────────
type ArticleProps = {
    headline: string;
    description: string;
    url: string;
    image?: string;
    datePublished?: string;
    dateModified?: string;
    author?: { name: string; url?: string };
    wordCount?: number;
    keywords?: string[];
};
export const ArticleSchema = ({
    headline,
    description,
    url,
    image,
    datePublished,
    dateModified,
    author,
    wordCount,
    keywords,
}: ArticleProps) => {
    const absUrl = url.startsWith("http") ? url : toAbsolute(url);
    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline,
        description,
        url: absUrl,
        mainEntityOfPage: absUrl,
        inLanguage: SITE_LANG,
        ...(image && { image: [image.startsWith("http") ? image : toAbsolute(image)] }),
        ...(datePublished && { datePublished }),
        ...(dateModified && { dateModified }),
        ...(wordCount && { wordCount }),
        ...(keywords && keywords.length > 0 && { keywords: keywords.join(", ") }),
        author: author
            ? { "@type": "Person", name: author.name, ...(author.url && { url: author.url }) }
            : { "@id": PERSON_ID },
        publisher: { "@id": ORG_ID },
    };
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
};
