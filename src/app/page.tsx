"use client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { portfolioData } from "@/data/portfolioData";
import { servicesData } from "@/data/servicesData";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { MagneticWrapper } from "@/components/MagneticWrapper";
import {
  IconArrowUpRight, IconStarFilled,
  IconBrandNextjs, IconBrandPython, IconBrandReact, IconBrandTailwind,
  IconBrandMysql, IconBrandNodejs, IconShoppingCart, IconBrandDocker,
  IconBrain, IconSpider, IconBrandDjango
} from "@tabler/icons-react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const yServices = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <div className="relative w-full selection:bg-primary selection:text-white">
      <Navbar />

      {/* ═══════════════ SECTION 1: AWWWARDS HERO ═══════════════ */}
      <section className="relative h-[90vh] flex flex-col justify-center items-center overflow-hidden w-full px-4">
        <motion.div style={{ y: yHero, opacity: opacityHero }} className="text-center z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12vw] md:text-[8vw] font-heading font-black uppercase tracking-tighter leading-[0.85] text-white mix-blend-difference"
          >
            DIGITAL <br /> <span className="text-primary italic">ARCHITECT</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-8 text-lg md:text-xl font-sans text-neutral-400 max-w-xl mx-auto mix-blend-difference z-20"
          >
            Engineering autonomous AI logic and high-conversion frontend systems. Breaking the grid. Defying the template.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-12 flex gap-6 z-20 relative"
          >
            <MagneticWrapper>
              <Link href="/portfolio" className="group relative px-8 py-4 bg-white text-black font-heading font-bold uppercase tracking-widest text-sm rounded-full overflow-hidden flex items-center gap-2">
                <span className="relative z-10">Explore Work</span>
                <IconArrowUpRight className="w-4 h-4 relative z-10 group-hover:rotate-45 transition-transform" />
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1] z-0"></div>
              </Link>
            </MagneticWrapper>
            <MagneticWrapper>
              <Link href="/contact" className="px-8 py-4 bg-transparent border border-white/20 hover:border-white text-white font-heading font-bold uppercase tracking-widest text-sm rounded-full transition-colors duration-500">
                Let's Talk
              </Link>
            </MagneticWrapper>
          </motion.div>
        </motion.div>

        {/* Abstract Line Art Typography Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 z-0 overflow-hidden">
          <div className="text-[25vw] font-heading font-extrabold uppercase text-outline whitespace-nowrap opacity-20 -rotate-6">
            FEROZ ARSHAD
          </div>
        </div>
      </section>

      <div className="w-full bg-black relative z-20 border-t border-white/10 rounded-t-[3rem] -mt-10 overflow-hidden pt-20 pb-32">

        {/* ═══════════════ SECTION 2: ENDLESS MARQUEE ═══════════════ */}
        <section className="mb-40 py-10 border-y border-white/5 bg-neutral-950/50 backdrop-blur-sm overflow-hidden flex">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ ease: "linear", duration: 20, repeat: Infinity }}
            className="flex whitespace-nowrap items-center gap-16"
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-16 items-center">
                <span className="text-4xl font-heading font-bold text-outline uppercase">Next.js</span>
                <IconBrandReact className="w-8 h-8 text-neutral-600" />
                <span className="text-4xl font-heading font-bold text-outline uppercase">Python</span>
                <IconBrain className="w-8 h-8 text-neutral-600" />
                <span className="text-4xl font-heading font-bold text-outline uppercase">MariaDB</span>
                <IconBrandDocker className="w-8 h-8 text-neutral-600" />
                <span className="text-4xl font-heading font-bold text-outline uppercase">Rest APIs</span>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ═══════════════ SECTION 3: ASYMMETRICAL SERVICES ═══════════════ */}
        <section className="max-w-7xl mx-auto px-4 mb-40">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5 relative">
              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-heading font-black uppercase leading-none mb-6"
              >
                Core <br /><span className="text-neutral-600 italic">Expertise</span>
              </motion.h2>
              <p className="text-neutral-400 font-sans text-lg max-w-sm">Crafting logic for multi-million dollar brands. No templates. Pure engineering.</p>
            </div>

            <motion.div
              style={{ y: yServices }}
              className="md:col-span-7 grid sm:grid-cols-2 gap-6"
            >
              {servicesData.map((svc, i) => (
                <motion.div
                  key={svc.slug}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group p-8 rounded-[2rem] bg-card border border-white/5 hover:bg-neutral-900 transition-colors duration-500"
                >
                  <svc.icon className="w-10 h-10 text-primary mb-6" stroke={1.5} />
                  <h3 className="text-2xl font-heading font-bold mb-3 group-hover:text-primary transition-colors">{svc.title}</h3>
                  <p className="text-neutral-400 font-sans text-sm">{svc.shortDescription}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ SECTION 4: HORIZONTAL SCROLL PORTFOLIO (Simplified to Grid for standard layout but high-end look) ═══════════════ */}
        <section className="max-w-7xl mx-auto px-4 mb-40">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8"
          >
            <h2 className="text-5xl md:text-6xl font-heading font-black uppercase">Selected Works</h2>
            <MagneticWrapper>
              <Link href="/portfolio" className="text-primary font-heading font-bold uppercase text-sm flex items-center gap-2 tracking-widest hover:text-white transition-colors">
                View Archive <IconArrowUpRight className="w-5 h-5" />
              </Link>
            </MagneticWrapper>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {portfolioData.slice(0, 4).map((project, idx) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`group ${idx % 2 === 1 ? 'md:mt-32' : ''}`}
              >
                <Link href={`/portfolio/${project.slug}`} className="block">
                  <div className="w-full aspect-[4/3] rounded-[2rem] bg-neutral-900 mb-8 overflow-hidden relative">
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay z-10"></div>
                    <div className="w-full h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent)]">
                      <span className="font-heading font-bold text-4xl text-white/5 uppercase tracking-widest">{project.category.split(" ")[0]}</span>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start justify-between">
                    <div>
                      <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2 block">{project.category}</span>
                      <h3 className="text-3xl font-heading font-bold group-hover:text-primary transition-colors leading-tight">{project.title}</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:border-primary transition-colors duration-500">
                      <IconArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════════ SECTION 5: BRUTALIST CTA ═══════════════ */}
        <section className="mb-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-7xl mx-auto bg-primary rounded-[3rem] p-12 md:p-24 text-center text-black relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')] opacity-30 mix-blend-overlay pointer-events-none"></div>
            <h2 className="text-6xl md:text-8xl font-heading font-black uppercase leading-none mb-8 tracking-tighter">
              Let's Build <br /> <span className="text-white">Something Epic.</span>
            </h2>
            <MagneticWrapper>
              <Link href="/contact" className="inline-block px-12 py-5 bg-black text-white rounded-full font-heading font-bold uppercase tracking-widest text-lg hover:scale-105 transition-transform duration-500">
                Start Your Project
              </Link>
            </MagneticWrapper>
          </motion.div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
