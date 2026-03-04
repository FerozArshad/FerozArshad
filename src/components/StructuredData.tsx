export const PersonSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Feroz Arshad",
        url: "https://ferozarshad.com",
        sameAs: [
            "https://github.com/FerozArshad",
            "https://linkedin.com/in/ferozarshad",
            "https://upwork.com/freelancers/ferozarshad",
        ],
        jobTitle: "Full-Stack Developer & AI Automation Architect",
        description: "Expert Full-Stack Developer specializing in autonomous AI workflows, Next.js SaaS architecture, and high-conversion E-commerce development.",
        knowsAbout: [
            "Next.js", "React", "Python", "Node.js", "n8n", "OpenAI",
            "E-Commerce", "SaaS", "AI Automation", "Web Scraping", "Docker",
        ],
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
        description: "Enterprise AI Automation & High-Conversion Web Architecture by Feroz Arshad.",
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
        name: "Feroz Arshad — Digital Architecture",
        url: "https://ferozarshad.com",
        description: "Full-Stack Development, AI Automation, and Enterprise-Grade Web Architecture services.",
        priceRange: "$$$$",
        areaServed: "Worldwide",
        serviceType: [
            "AI Automation Consulting",
            "Full-Stack SaaS Development",
            "Headless E-Commerce Architecture",
            "Custom Web Design & Development",
        ],
        founder: {
            "@type": "Person",
            name: "Feroz Arshad",
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};
