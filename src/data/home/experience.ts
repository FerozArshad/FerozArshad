export interface ExperienceEntry {
  role: string;
  org: string;
  date: string;
  active: boolean;
  /** Description as segments; segments with accent: true render in accent-ink. */
  desc: { text: string; accent?: boolean }[];
}

export const experience: ExperienceEntry[] = [
  {
    role: "Full-Stack Developer",
    org: "Storm Marketing Studio",
    date: "2024 — Present",
    active: true,
    desc: [
      { text: "Building client sites and internal tooling with " },
      { text: "Next.js", accent: true },
      { text: " and " },
      { text: "Python", accent: true },
      { text: "; designing " },
      { text: "AI automation", accent: true },
      { text: " and lead-gen pipelines with " },
      { text: "n8n", accent: true },
      { text: " and LLM integrations." },
    ],
  },
  {
    role: "Python Developer — Dictionary Digitization & Chatbot",
    org: "Brightpatways Pte. Ltd",
    date: "Aug 2025 — Mar 2026",
    active: false,
    desc: [
      { text: "Automated PDF-to-database extraction with " },
      { text: "Python", accent: true },
      { text: " (PDFMiner / PDFPlumber), transforming raw data into structured " },
      { text: "JSON", accent: true },
      { text: " and powering a WhatsApp/WeChat dictionary bot through an " },
      { text: "n8n", accent: true },
      { text: " workflow." },
    ],
  },
  {
    role: "Python Backend Developer",
    org: "Viral Connections",
    date: "Mar 2023 — Jul 2025",
    active: false,
    desc: [
      { text: "Built high-performance " },
      { text: "FastAPI", accent: true },
      { text: " endpoints serving real-time KPIs, automated financial " },
      { text: "CSV data pipelines", accent: true },
      { text: ", integrated " },
      { text: "Stripe", accent: true },
      { text: " subscription billing, and secured multi-tenant APIs with " },
      { text: "JWT", accent: true },
      { text: " auth and rate limiting." },
    ],
  },
  {
    role: "Web Developer",
    org: "Rankyard",
    date: "Mar 2020 — Feb 2023",
    active: false,
    desc: [
      { text: "Developed and customized " },
      { text: "WordPress", accent: true },
      { text: " themes and plugins for international clients, with responsive design and strong " },
      { text: "SEO", accent: true },
      { text: " performance." },
    ],
  },
  {
    role: "BSc Computer Science",
    org: "The Islamia University of Bahawalpur · 3.53 CGPA",
    date: "2019 — 2023",
    active: false,
    desc: [{ text: "Foundation in algorithms, databases and software engineering." }],
  },
];
