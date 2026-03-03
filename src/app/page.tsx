"use client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { servicesData } from "@/data/servicesData";
import { portfolioData } from "@/data/portfolioData";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  IconBrandNextjs, IconBrandPython, IconBrandReact, IconBrandTailwind,
  IconBrandMysql, IconBrandNodejs, IconBrandWordpress, IconShoppingCart,
  IconBrandDocker, IconBrandGit, IconBrandFigma, IconBrandDjango,
  IconApi, IconBrain, IconSpider, IconArrowUpRight, IconStarFilled,
  IconCode, IconRobot
} from "@tabler/icons-react";

/* ─── Animated Counter Component ─── */
function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

/* ─── Tech Stack Data (Extended) ─── */
const techStack = [
  { icon: IconBrandNextjs, name: "Next.js", color: "group-hover:text-white" },
  { icon: IconBrandPython, name: "Python", color: "group-hover:text-yellow-400" },
  { icon: IconBrandReact, name: "React", color: "group-hover:text-cyan-400" },
  { icon: IconBrandNodejs, name: "Node.js", color: "group-hover:text-green-500" },
  { icon: IconBrandTailwind, name: "Tailwind", color: "group-hover:text-cyan-300" },
  { icon: IconBrandMysql, name: "MariaDB", color: "group-hover:text-orange-400" },
  { icon: IconBrandWordpress, name: "WordPress", color: "group-hover:text-blue-400" },
  { icon: IconShoppingCart, name: "Shopify", color: "group-hover:text-green-400" },
  { icon: IconBrandDjango, name: "Django", color: "group-hover:text-emerald-500" },
  { icon: IconBrandDocker, name: "Docker", color: "group-hover:text-blue-500" },
  { icon: IconBrandGit, name: "Git", color: "group-hover:text-orange-500" },
  { icon: IconBrandFigma, name: "Figma", color: "group-hover:text-purple-400" },
  { icon: IconApi, name: "REST APIs", color: "group-hover:text-primary" },
  { icon: IconBrain, name: "OpenAI", color: "group-hover:text-emerald-400" },
  { icon: IconSpider, name: "Selenium", color: "group-hover:text-red-400" },
];

/* ─── Stats Data ─── */
const stats = [
  { value: 300, suffix: "+", label: "Projects Delivered" },
  { value: 1, prefix: "$", suffix: "M+", label: "Client Revenue" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 50, suffix: "+", label: "5-Star Reviews" },
];

/* ─── Testimonials ─── */
const testimonials = [
  {
    quote: "Feroz completely transformed our e-commerce infrastructure. Revenue doubled within the first quarter after launch.",
    name: "Sarah K.",
    role: "CEO, Fashion E-Commerce",
    stars: 5,
  },
  {
    quote: "The n8n automation pipeline he built saves us 30+ hours per week. It's like having an extra team member that never sleeps.",
    name: "Michael T.",
    role: "Operations Lead, SaaS Startup",
    stars: 5,
  },
  {
    quote: "Best developer I've hired on Upwork. Delivered ahead of schedule with impeccable code quality and communication.",
    name: "Amanda R.",
    role: "Marketing Director",
    stars: 5,
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      {/* ═══════════════ SECTION 1: HERO ═══════════════ */}
      <section className="flex flex-col items-center justify-center text-center mt-20 mb-32 z-10 relative px-4">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6"
        >
          Top-Rated Developer • 300+ Projects • $1M+ Revenue
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 max-w-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 leading-tight"
        >
          I engineer scalable web architectures & autonomous AI systems.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-neutral-400 max-w-2xl mb-10"
        >
          Transforming businesses with custom Next.js performance, intelligent automation pipelines, and high-conversion designs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex gap-4"
        >
          <Link href="/portfolio" className="bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition shadow-[0_0_30px_-5px_rgba(59,130,246,0.4)]">
            View My Work
          </Link>
          <Link href="/contact" className="bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-white px-8 py-3 rounded-full font-semibold transition">
            Contact Me
          </Link>
        </motion.div>
      </section>

      {/* ═══════════════ SECTION 2: ANIMATED STATS ═══════════════ */}
      <section className="mb-32 py-16 border-y border-white/5 bg-gradient-to-r from-transparent via-neutral-900/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </p>
                <p className="text-sm text-neutral-500 uppercase tracking-widest font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 3: TECH STACK MARQUEE ═══════════════ */}
      <section className="mb-32 overflow-hidden py-10 border-y border-white/5 bg-gradient-to-r from-transparent via-neutral-900/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <p className="text-sm font-bold tracking-widest uppercase text-neutral-500 mb-8">Architecting with Enterprise-Grade Systems</p>
          <div className="grid grid-cols-5 md:grid-cols-5 lg:grid-cols-15 gap-6 md:gap-8 w-full">
            {techStack.map((tech, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                className="flex flex-col items-center gap-2 group cursor-default"
              >
                <tech.icon className={`w-10 h-10 md:w-12 md:h-12 text-neutral-600 ${tech.color} transition duration-300`} stroke={1.5} />
                <span className="text-[10px] md:text-xs text-neutral-600 font-mono group-hover:text-neutral-300 transition">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 4: SERVICES BENTO BOX ═══════════════ */}
      <section id="services" className="mb-32 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col mb-10 items-center text-center"
        >
          <h2 className="text-4xl font-extrabold tracking-tight mb-3">My Arsenal</h2>
          <p className="text-neutral-400 max-w-xl">The intersection of cutting-edge web design and backend AI automation.</p>
        </motion.div>

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

      {/* ═══════════════ SECTION 5: FEATURED PORTFOLIO ═══════════════ */}
      <section className="mb-32 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-12"
        >
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-3">Featured Case Studies</h2>
            <p className="text-neutral-400 max-w-xl">Real problems. Engineered solutions. Measurable outcomes.</p>
          </div>
          <Link href="/portfolio" className="text-primary text-sm font-bold hover:underline mt-4 md:mt-0 flex items-center gap-1">
            View All <IconArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {portfolioData.slice(0, 4).map((project, idx) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link href={`/portfolio/${project.slug}`} className="group block">
                <div className="rounded-[2.5rem] bg-card border border-white/5 p-3 hover:border-primary/50 transition duration-500 hover:shadow-[0_0_40px_-15px_rgba(59,130,246,0.3)]">
                  <div className="w-full h-56 rounded-[2rem] bg-gradient-to-br from-neutral-900 to-black mb-4 flex items-center justify-center relative overflow-hidden group-hover:scale-[0.98] transition duration-500">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                    <div className="w-20 h-20 rounded-full border border-white/10 bg-white/5 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:border-primary/50 transition duration-500">
                      <IconArrowUpRight className="w-7 h-7 text-neutral-500 group-hover:text-primary transition" />
                    </div>
                  </div>
                  <div className="px-5 pb-5">
                    <span className="text-primary text-xs font-bold tracking-widest uppercase mb-2 block">{project.category}</span>
                    <h3 className="text-xl font-bold group-hover:text-primary transition duration-300 mb-2 leading-tight">{project.title}</h3>
                    <p className="text-neutral-500 text-sm line-clamp-2">{project.problem}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════ SECTION 6: TESTIMONIALS ═══════════════ */}
      <section className="mb-32 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-extrabold tracking-tight mb-3">Client Testimonials</h2>
          <p className="text-neutral-400 max-w-xl mx-auto">Trusted by startups, agencies, and enterprise teams worldwide.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-[2rem] bg-card border border-white/5 hover:border-primary/20 transition duration-500 relative overflow-hidden"
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <IconStarFilled key={i} className="w-4 h-4 text-yellow-500" />
                ))}
              </div>
              <p className="text-neutral-300 leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="text-white font-bold text-sm">{t.name}</p>
                <p className="text-neutral-500 text-xs">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════ SECTION 7: CTA BANNER ═══════════════ */}
      <section className="mb-32 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-black to-primary/10 border border-primary/20 p-12 md:p-16 text-center overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-primary/20 blur-[100px] pointer-events-none"></div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 relative z-10">Ready to Build Something Extraordinary?</h2>
          <p className="text-neutral-400 max-w-xl mx-auto mb-8 relative z-10">Let's discuss your project architecture. I respond within 2 hours.</p>
          <div className="flex gap-4 justify-center relative z-10">
            <Link href="/contact" className="bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition shadow-[0_0_30px_-5px_rgba(59,130,246,0.4)]">
              Start a Project
            </Link>
            <Link href="/portfolio" className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 py-3 rounded-full font-semibold transition">
              Explore Portfolio
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}
