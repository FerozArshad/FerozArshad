export const PersonSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Feroz Arshad",
        url: "https://ferozarshad.com",
        image: "https://ferozarshad.com/logo-black.png",
        sameAs: [
            "https://github.com/FerozArshad",
            "https://linkedin.com/in/ferozarshad",
            "https://upwork.com/freelancers/ferozarshad",
        ],
        jobTitle: "Independent Engineer, Designer & Strategist",
        description:
            "Solo practice shipping SaaS, AI automation, and high-conversion commerce. Weekly Friday demos, outcome pricing, full IP transfer.",
        knowsAbout: [
            "Next.js", "React", "Python", "Node.js", "n8n", "OpenAI",
            "E-Commerce", "SaaS", "AI Automation", "Web Scraping", "Docker",
            "Prisma", "PostgreSQL", "MySQL", "Headless Commerce", "Shopify Hydrogen",
        ],
        address: {
            "@type": "PostalAddress",
            addressLocality: "Karachi",
            addressCountry: "PK",
        },
        worksFor: {
            "@type": "Organization",
            name: "Feroz Arshad — Independent Practice",
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export const WebsiteSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Feroz Arshad",
        url: "https://ferozarshad.com",
        description:
            "Solo engineering, design & strategy practice — SaaS, AI automation, and high-conversion commerce.",
        publisher: { "@type": "Person", name: "Feroz Arshad" },
        potentialAction: {
            "@type": "SearchAction",
            target: "https://ferozarshad.com/portfolio?q={search_term_string}",
            "query-input": "required name=search_term_string",
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export const ProfessionalServiceSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://ferozarshad.com/#service",
        name: "Feroz Arshad — Independent Practice",
        url: "https://ferozarshad.com",
        image: "https://ferozarshad.com/logo-black.png",
        description:
            "Full-stack engineering, design & strategy in one head. SaaS, AI automation, headless commerce. Weekly Friday demos, outcome pricing, full IP transfer on delivery.",
        priceRange: "$$$",
        areaServed: "Worldwide",
        serviceType: [
            "AI & Workflow Automation",
            "Full-Stack SaaS Architecture",
            "Headless E-Commerce Development",
            "Custom Web Design & Development",
            "Technical Strategy & CTO Advisory",
        ],
        founder: { "@type": "Person", name: "Feroz Arshad" },
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

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

type Crumb = { name: string; url: string };
export const BreadcrumbSchema = ({ items }: { items: Crumb[] }) => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: item.name,
            item: item.url,
        })),
    };
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

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
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

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
                url: c.url,
                ...(c.image && { image: c.image }),
                author: { "@type": "Person", name: "Feroz Arshad" },
            },
        })),
    };
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};
