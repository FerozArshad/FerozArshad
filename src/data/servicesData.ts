import { IconRobot, IconCode, IconShoppingCart, IconDashboard } from "@tabler/icons-react";

export const servicesData = [
    {
        slug: "ai-automation",
        title: "AI & Business Automation",
        shortDescription: "Building autonomous agents and n8n workflows.",
        fullDescription: "Stop doing manual tasks. I build n8n workflows that connect your CRM, emails, and Slack bots with OpenAI to automate your entire lead generation pipeline. By leveraging advanced natural language processing, I create systems that can understand customer intent and route inquiries automatically without human intervention.",
        features: [
            "n8n Workflow Automation",
            "Custom GPTs & Customer Support Bots",
            "Python Web Scraping (Selenium)",
            "Automated Lead Scoring",
            "API Integrations (Salesforce, HubSpot, Zapier)"
        ],
        icon: IconRobot,
    },
    {
        slug: "full-stack-saas",
        title: "Full-Stack SaaS Architecture",
        shortDescription: "High-performance REST APIs and real-time dashboards.",
        fullDescription: "Building the logic engines that power modern startups. From custom REST APIs using Python FastAPI to real-time dashboards processing thousands of events with Next.js and WebSockets. I focus on creating scalable, secure, and maintainable backend systems that can grow with your user base.",
        features: [
            "Python (Django, FastAPI)",
            "Next.js & React (App Router)",
            "Database Architecture (PostgreSQL, Supabase)",
            "Real-time Data Processing (WebSockets)",
            "Cloud Deployment & Docker"
        ],
        icon: IconCode,
    },
    {
        slug: "ecommerce",
        title: "Premium E-Commerce Development",
        shortDescription: "Custom, high-conversion Shopify and WooCommerce stores.",
        fullDescription: "E-Commerce stores built to handle high volume traffic and maximize conversion rates. I have engineered platforms that generated $1M+ in revenue by focusing on micro-interactions, seamless checkout flows, and sub-second page load times. Whether you are using Shopify Liquid or custom WooCommerce templates, I ensure your store performs flawlessly.",
        features: [
            "Custom Shopify Liquid Development",
            "WooCommerce Scaling & Optimization",
            "100% Core Web Vitals Optimization",
            "Headless E-Commerce Integrations",
            "Payment Gateway Setup (Stripe, PayPal)"
        ],
        icon: IconShoppingCart,
    },
    {
        slug: "custom-web-design",
        title: "High-Conversion Web Design",
        shortDescription: "Visually stunning, responsive, and blazing fast websites.",
        fullDescription: "Your website is your digital storefront. I specialize in building visually stunning, highly responsive websites using WordPress, Elementor Pro, and Next.js. I focus on creating a seamless user experience (UX) with modern UI principles, ensuring your brand stands out and converts visitors into leads.",
        features: [
            "WordPress & Elementor Pro",
            "Custom PHP Plugin Development",
            "Framer Motion Micro-animations",
            "Figma to Code React/Next.js",
            "Complex Multi-page SEO Architectures"
        ],
        icon: IconDashboard,
    },
];
