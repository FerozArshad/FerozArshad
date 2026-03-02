export const portfolioData = [
    {
        slug: "million-dollar-ecommerce",
        title: "$1M+ Revenue High-Conversion E-Commerce Store",
        category: "Shopify & React",
        role: "Lead Full-Stack Developer",
        timeline: "8 Weeks",
        techStack: ["Next.js", "Shopify Storefront API", "Tailwind CSS"],
        problem: "The client was stuck on a slow, legacy WooCommerce setup that was crashing during high-traffic ad campaigns, leading to massive cart abandonment and poor conversion rates.",
        solution: "Engineered a custom Headless Shopify architecture using Next.js. I implemented a sub-second optimized checkout flow, intelligent product caching, and a highly interactive, animated frontend to drastically improve User Experience.",
        outcome: "Page loading speed dropped from 4.5s to 0.8s. The improved UX and stability during traffic spikes allowed the client to scale their ad spend, crossing $1M+ in revenue within 6 months of launch."
    },
    {
        slug: "ai-support-bot",
        title: "Autonomous AI Customer Support & Routing Setup",
        category: "n8n & OpenAI",
        role: "AI Automation Architect",
        timeline: "4 Weeks",
        techStack: ["n8n", "OpenAI API", "Zendesk API", "Python"],
        problem: "The client's support team was overwhelmed with repetitive Level-1 queries, leading to 24+ hour response times and dropped leads.",
        solution: "Built a fully autonomous n8n workflow. The system intercepts incoming emails/tickets, utilizes the OpenAI API to analyze sentiment and intent, resolves basic queries instantly using RAG (Retrieval-Augmented Generation), and routes complex issues to human agents.",
        outcome: "Level-1 ticket volume decreased by 70%. Average response time dropped from 24 hours to < 2 minutes. Saved the company an estimated $40,000/year in support overhead."
    },
    {
        slug: "youtube-blog-automation",
        title: "YouTube to SEO Blog Pipeline Integration",
        category: "Python & Whisper",
        role: "Backend Engineer",
        timeline: "2 Weeks",
        techStack: ["Python", "OpenAI Whisper", "WordPress REST API"],
        problem: "A content creator with millions of views on YouTube wanted to build a written SEO presence but lacked the time to write articles.",
        solution: "Developed a Python-based pipeline that automatically monitors the YouTube channel, downloads new videos, transcribes them using OpenAI Whisper, formats them into SEO-optimized articles, and publishes them as Drafts to their WordPress site.",
        outcome: "Generated over 150+ high-quality articles automatically. The website saw a 300% increase in organic SEO traffic within 3 months, completely hands-off for the creator."
    },
    {
        slug: "lead-gen-scraper",
        title: "Enterprise B2B Lead Generation Scraper",
        category: "Full-Stack SaaS",
        role: "Full-Stack Developer",
        timeline: "6 Weeks",
        techStack: ["Python Selenium", "FastAPI", "React", "PostgreSQL"],
        problem: "A sales agency was spending hundreds of manual hours weekly finding and verifying B2B leads on LinkedIn and specialized directories.",
        solution: "Engineered a scalable web scraping architecture using Python and Selenium, wrapped in a FastAPI backend. Built a React dashboard for the agency to input parameters, visualizing the automated extraction, cleaning, and verification of thousands of leads.",
        outcome: "Reduced manual lead generation time by 95%. The agency scaled their outreach volume 10x, resulting in their highest grossing sales quarter ever."
    }
];
