"use client";
import { Navbar } from "@/components/Navbar";
import { servicesData } from "@/data/servicesData";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { IconCode, IconRobot, IconShoppingCart, IconDashboard, IconBrandNextjs, IconBrandPython, IconBrandReact, IconBrandTailwind, IconBrandMysql, IconBrandNodejs } from "@tabler/icons-react";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center mt-20 mb-32 z-10 relative px-4">
        <span className="px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6 animate-pulse">
          Top-Rated Developer • $1M+ Client Revenue Generated
        </span>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 max-w-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 leading-tight">
          I engineer scalable web architectures & autonomous AI systems.
        </h1>
        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mb-10">
          Transforming businesses with custom Next.js performance, intelligent automation pipelines, and high-conversion designs.
        </p>
        <div className="flex gap-4">
          <button className="bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition">
            View My Work
          </button>
          <button className="bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-white px-8 py-3 rounded-full font-semibold transition">
            Contact Me
          </button>
        </div>
      </section>

      {/* Tech Stack Authenticity Banner (Marquee/Grid) */}
      <section className="mb-32 overflow-hidden py-10 border-y border-white/5 bg-gradient-to-r from-transparent via-neutral-900/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <p className="text-sm font-bold tracking-widest uppercase text-neutral-500 mb-8">Architecting with Enterprise Grade Systems</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 hover:opacity-100 transition duration-500">
            <div className="flex flex-col items-center gap-2 group"><IconBrandNextjs className="w-12 h-12 text-white group-hover:text-primary transition" stroke={1.5} /><span className="text-xs text-neutral-600 font-mono">Next.js 14</span></div>
            <div className="flex flex-col items-center gap-2 group"><IconBrandPython className="w-12 h-12 text-white group-hover:text-green-500 transition" stroke={1.5} /><span className="text-xs text-neutral-600 font-mono">Python/FastAPI</span></div>
            <div className="flex flex-col items-center gap-2 group"><IconBrandReact className="w-12 h-12 text-white group-hover:text-blue-500 transition" stroke={1.5} /><span className="text-xs text-neutral-600 font-mono">React</span></div>
            <div className="flex flex-col items-center gap-2 group"><IconBrandNodejs className="w-12 h-12 text-white group-hover:text-green-600 transition" stroke={1.5} /><span className="text-xs text-neutral-600 font-mono">Node.js (n8n)</span></div>
            <div className="flex flex-col items-center gap-2 group"><IconBrandTailwind className="w-12 h-12 text-white group-hover:text-cyan-400 transition" stroke={1.5} /><span className="text-xs text-neutral-600 font-mono">Tailwind CSS</span></div>
            <div className="flex flex-col items-center gap-2 group"><IconBrandMysql className="w-12 h-12 text-white group-hover:text-orange-500 transition" stroke={1.5} /><span className="text-xs text-neutral-600 font-mono">MariaDB/SQL</span></div>
          </div>
        </div>
      </section>

      {/* Skills / Services Bento Box Layout */}
      <section id="services" className="mb-32">
        <div className="flex flex-col mb-10 items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-2">My Arsenal</h2>
          <p className="text-neutral-400">The intersection of cutting-edge web design and backend AI automation.</p>
        </div>

        <BentoGrid>
          {servicesData.map((item, i) => (
            <BentoGridItem
              key={item.slug}
              href={`/services/${item.slug}`}
              title={item.title}
              description={item.shortDescription}
              header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 flex items-center justify-center"><item.icon className="h-10 w-10 text-primary" stroke={1.5} /></div>}
              icon={<item.icon className="h-5 w-5 text-neutral-500" stroke={1.5} />}
              className={i === 0 || i === 3 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      </section>
    </>
  );
}

const items = [
  {
    title: "AI & Business Automation",
    description: "Building autonomous agents, web scrapers, and n8n workflows that save thousands of manual hours and connect to your CRM.",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 flex items-center justify-center"><IconRobot className="h-10 w-10 text-primary" /></div>,
    icon: <IconRobot className="h-5 w-5 text-neutral-500" />,
  },
  {
    title: "Full-Stack SaaS Architecture",
    description: "High-performance REST APIs and real-time dashboards using Next.js, Python FastAPI, and Django.",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-neutral-900 flex items-center justify-center"><IconCode className="h-10 w-10 text-neutral-600" /></div>,
    icon: <IconCode className="h-5 w-5 text-neutral-500" />,
  },
  {
    title: "Premium Web & E-Commerce",
    description: "Scale your revenue with custom, 100% PageSpeed optimized Shopify and WordPress platforms built to convert.",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-neutral-900 flex items-center justify-center"><IconShoppingCart className="h-10 w-10 text-neutral-600" /></div>,
    icon: <IconShoppingCart className="h-5 w-5 text-neutral-500" />,
  },
  {
    title: "Data Engineering & Scraping",
    description: "Extracting valuable business leads via Python pipelines, transforming unorganized data into actionable customer profiles.",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 flex items-center justify-center"><IconDashboard className="h-10 w-10 text-primary" /></div>,
    icon: <IconDashboard className="h-5 w-5 text-neutral-500" />,
  },
];
