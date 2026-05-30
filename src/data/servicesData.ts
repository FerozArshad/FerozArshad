import { IconRobot, IconCode, IconShoppingCart, IconDashboard } from "@tabler/icons-react";

export const servicesData = [
    {
        slug: "ai-automation",
        title: "AI & Business Automation",
        shortDescription: "Building autonomous agents and n8n workflows.",
        fullDescription: "Stop doing manual tasks. I build n8n workflows that connect your CRM, emails, and Slack bots with OpenAI to automate your entire lead generation pipeline. By leveraging advanced natural language processing, I create systems that can understand customer intent and route inquiries automatically without human intervention.",
        serviceType: "AI & Workflow Automation",
        features: [
            "n8n Workflow Automation",
            "Custom GPTs & Customer Support Bots",
            "Python Web Scraping (Selenium)",
            "Automated Lead Scoring",
            "API Integrations (Salesforce, HubSpot, Zapier)"
        ],
        icon: IconRobot,
        faqs: [
            {
                q: "Will you use n8n or a custom Python pipeline?",
                a: "It depends on the volume and complexity. n8n is the right call for most workflows under ~10,000 events per day — faster to build, easier to hand off. Beyond that, or where you need bespoke logic the available nodes can't express, I drop into custom Python with a state machine in Postgres. The decision goes in the brief in week one."
            },
            {
                q: "Can the workflow handle webhooks from anywhere?",
                a: "Yes. Most builds expose a webhook URL on n8n that any third-party service can POST to (Zendesk, HubSpot, Slack, Stripe, Calendly, custom forms). Authenticated with a header secret. Replies asynchronously so the calling system never blocks."
            },
            {
                q: "How long does an autonomous-support routing build take?",
                a: "Nine days end-to-end for the median case: intake → classification → reply drafting → routing to the right inbox. That includes a clickable prototype in week one and the production cutover in week two. Real numbers from a Series-B fintech build."
            },
            {
                q: "What happens to my data — does anything leave the box?",
                a: "OpenAI processing leaves the box (that's the trade for using their models). Everything else stays inside the workflow's Postgres. Data retention is configurable per node. If you need fully on-prem, I swap OpenAI for Llama or Mistral running locally."
            }
        ]
    },
    {
        slug: "full-stack-saas",
        title: "Full-Stack SaaS Architecture",
        shortDescription: "High-performance REST APIs and real-time dashboards.",
        fullDescription: "Building the logic engines that power modern startups. From custom REST APIs using Python FastAPI to real-time dashboards processing thousands of events with Next.js and WebSockets. I focus on creating scalable, secure, and maintainable backend systems that can grow with your user base.",
        serviceType: "Full-Stack SaaS Architecture",
        features: [
            "Python (Django, FastAPI)",
            "Next.js & React (App Router)",
            "Database Architecture (PostgreSQL, Supabase)",
            "Real-time Data Processing (WebSockets)",
            "Cloud Deployment & Docker"
        ],
        icon: IconCode,
        faqs: [
            {
                q: "Next.js or a separate React frontend + Python backend?",
                a: "Default to Next.js App Router with server actions for tighter coupling and faster shipping. I split into separate frontend + FastAPI when you have a non-web client (mobile, native, embedded device) that needs the same API, or when the backend's compute profile (heavy Python ML, long-running jobs) doesn't fit a serverless function. Decided in week one."
            },
            {
                q: "How do you handle auth — Supabase, Clerk, NextAuth, custom?",
                a: "Supabase Auth or Clerk for most SaaS builds — both are battle-tested and ship faster than rolling auth from scratch. Custom JWT + bcrypt + DB sessions only when there's a specific reason (HIPAA-compliant audit trail, integration with an existing identity provider, etc). 2FA via TOTP is included on every auth I ship."
            },
            {
                q: "What scale can a solo-built SaaS actually handle?",
                a: "Vercel + Supabase + a 12 M-row Postgres dedupe index serves 8 production tenants today at 0.08 s p50 query latency. Real numbers from the B2B lead-gen SaaS in the case studies. Past 100 K daily active users you start needing dedicated infra and a team — but most founders never get there alone, and by then revenue funds the engineers."
            },
            {
                q: "Do you handle billing — Stripe, paddles, etc.?",
                a: "Yes. Stripe Subscriptions + webhooks is the default. I wire metered billing, plan upgrades, prorations, dunning emails, and a customer portal. Paddle and Lemon Squeezy when you need merchant-of-record for tax reasons."
            }
        ]
    },
    {
        slug: "ecommerce",
        title: "Premium E-Commerce Development",
        shortDescription: "Custom, high-conversion Shopify and WooCommerce stores.",
        fullDescription: "E-Commerce stores built to handle high volume traffic and maximize conversion rates. I have engineered platforms that generated $1M+ in revenue by focusing on micro-interactions, seamless checkout flows, and sub-second page load times. Whether you are using Shopify Liquid or custom WooCommerce templates, I ensure your store performs flawlessly.",
        serviceType: "Headless E-Commerce Development",
        features: [
            "Custom Shopify Liquid Development",
            "WooCommerce Scaling & Optimization",
            "100% Core Web Vitals Optimization",
            "Headless E-Commerce Integrations",
            "Payment Gateway Setup (Stripe, PayPal)"
        ],
        icon: IconShoppingCart,
        faqs: [
            {
                q: "Shopify Liquid or Hydrogen (headless)?",
                a: "Liquid for most stores under $5 M annual GMV — themes are mature, the Shopify checkout is gold-standard, and you ship faster. Hydrogen when you need a marketing site / blog / community stitched into the same React tree as the storefront, or when you've outgrown what Liquid templates can express. Heritage Apothecary was a Hydrogen rebuild — $1.1 M revenue across 7 months, +42 % conversion rate vs. the prior Liquid theme."
            },
            {
                q: "Can you migrate from WooCommerce to Shopify?",
                a: "Yes — WooCommerce → Shopify is the most common migration I do. Products, customers, order history, SEO redirects, and metafields all come across. Subscription customers need a separate workflow (Recharge or Bold). Timeline is 4-6 weeks for a 1,000-SKU store."
            },
            {
                q: "What conversion lift should I realistically expect?",
                a: "+15 % to +50 % on the storefront, depending on the starting point. The big levers are usually checkout speed (sub-2-second), zero-CLS hero images, and copy on the PDP that addresses the actual purchase objection. I install CRO instrumentation (Microsoft Clarity, GA4 enhanced ecommerce, post-purchase survey) so the lift is measurable, not anecdotal."
            },
            {
                q: "Do you do Shopify apps or just storefronts?",
                a: "Storefronts mainly. Custom Shopify apps when an off-the-shelf one doesn't exist for the workflow you need — e.g., custom bundle pricing, dealer portal with tiered visibility, B2B quote-to-order. Built as embedded apps using the Shopify Polaris components."
            }
        ]
    },
    {
        slug: "custom-web-design",
        title: "High-Conversion Web Design",
        shortDescription: "Visually stunning, responsive, and blazing fast websites.",
        fullDescription: "Your website is your digital storefront. I specialize in building visually stunning, highly responsive websites using WordPress, Elementor Pro, and Next.js. I focus on creating a seamless user experience (UX) with modern UI principles, ensuring your brand stands out and converts visitors into leads.",
        serviceType: "Custom Web Design & Development",
        features: [
            "WordPress & Elementor Pro",
            "Custom PHP Plugin Development",
            "Framer Motion Micro-animations",
            "Figma to Code React/Next.js",
            "Complex Multi-page SEO Architectures"
        ],
        icon: IconDashboard,
        faqs: [
            {
                q: "WordPress or Next.js?",
                a: "WordPress + Elementor Pro when the client needs to publish content frequently without a developer in the loop, and the site has fewer than ~50 pages of structured content. Next.js for marketing sites that need top-1-percentile performance, real CMS integration with type safety, or that share components with a separate app. The decision goes in the brief in week one."
            },
            {
                q: "How fast will the site actually be?",
                a: "All-green Core Web Vitals on the LCP screen and a sub-1-second Time to First Byte on every page I ship. Concretely: 95+ on PageSpeed mobile, 99+ desktop. Image optimization, font subsetting, code-splitting, and edge caching are all included — not 'optional add-ons'."
            },
            {
                q: "Do you handle SEO too?",
                a: "Technical SEO is built in: full structured-data graph (Organization, WebSite, FAQ, BreadcrumbList, Service, Article), sitemap + robots tuned for AI crawlers, per-page metadata, hreflang, canonical consistency, and a /llms.txt. Content SEO (keyword research, article briefs, link building) is a separate retainer engagement."
            },
            {
                q: "What's included after launch?",
                a: "30 days of post-ship retainer at no extra cost: bug fixes, copy tweaks, analytics setup, and one round of post-launch CRO based on real traffic data. After that, ongoing support is the $5 K/mo retainer or paid sprints as needed."
            }
        ]
    },
];

// Generic FAQs shown on the /services list page and the homepage.
// Kept separate from per-service FAQs (Spenzio playbook: rendered FAQ text MUST
// match JSON-LD text exactly — share the source).
export const SERVICES_FAQS = [
    {
        q: "How do your engagements typically run?",
        a: "Three productized tiers. The Sprint is a 4-week fixed-scope engagement at $8 k. The Build is an 8-16 week multi-month delivery from $25 k. The Retainer is $5 k/month, 3-month minimum, 20 senior hours. Every tier ships weekly Friday demos and a 30-day post-ship retainer."
    },
    {
        q: "Why outcome pricing instead of hourly?",
        a: "Hourly aligns my incentive against yours — I make more when the work takes longer. Outcome pricing aligns us: I commit to a scope and a price, and we both want the same thing — ship it well and ship it fast."
    },
    {
        q: "Do you sign NDAs?",
        a: "Mutual NDA up front on every engagement. Full IP transfer on delivery. Code, design files, and documentation in a repo you own from day one — if I get hit by a bus, your team can keep shipping."
    },
    {
        q: "What if I need someone for ongoing work after the sprint?",
        a: "The Retainer is the answer. $5 k/month for 20 senior hours, 3-month minimum, pause-or-cancel any time. Sprint clients get first refusal on the next month's retainer slots before they go on the public availability list."
    }
];
