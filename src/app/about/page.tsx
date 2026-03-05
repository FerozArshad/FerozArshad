"use client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticWrapper } from "@/components/MagneticWrapper";
import Link from "next/link";
import {
    IconBrandNextjs, IconBrandReact, IconBrandPython, IconBrandTailwind,
    IconBrandMysql, IconBrandNodejs, IconBrandWordpress, IconShoppingCart,
    IconBrandDocker, IconBrandGit, IconBrandFigma, IconBrandDjango,
    IconApi, IconBrain, IconSpider, IconArrowUpRight
} from "@tabler/icons-react";

export default function About() {
    const { scrollYProgress } = useScroll();
    const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);

    const skills = [
        { icon: IconBrandNextjs, name: "Next.js 14+", category: "Frontend" },
        { icon: IconBrandReact, name: "React", category: "Frontend" },
        { icon: IconBrandTailwind, name: "Tailwind CSS", category: "Frontend" },
        { icon: IconBrandNodejs, name: "Node.js", category: "Backend" },
        { icon: IconBrandPython, name: "Python", category: "Backend" },
        { icon: IconBrandDjango, name: "Django", category: "Backend" },
        { icon: IconApi, name: "REST APIs", category: "Backend" },
        { icon: IconBrandMysql, name: "MariaDB/SQL", category: "Backend" },
        { icon: IconBrandDocker, name: "Docker", category: "Backend" },
        { icon: IconBrandWordpress, name: "WordPress", category: "CMS" },
        { icon: IconShoppingCart, name: "Shopify", category: "CMS" },
        { icon: IconBrain, name: "OpenAI", category: "AI" },
        { icon: IconSpider, name: "Selenium", category: "AI" },
        { icon: IconBrandGit, name: "Git", category: "Tools" },
        { icon: IconBrandFigma, name: "Figma", category: "Tools" },
    ];

    return (
        <div className="relative w-full bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
            <Navbar />

            {/* AWWWARDS HEADER */}
            <section className="relative h-[80vh] flex flex-col justify-end pb-20 px-4 md:px-12 overflow-hidden">
                <motion.div style={{ y: yText }} className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start mix-blend-difference">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-primary font-heading font-bold uppercase tracking-widest mb-6 block"
                    >
                        THE ARCHITECT BEHIND THE CODE
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-7xl md:text-[8vw] font-heading font-black leading-[0.85] uppercase tracking-tighter"
                    >
                        FEROZ <br /> ARSHAD.
                    </motion.h1>
                </motion.div>

                <div className="absolute top-0 right-0 w-[80vw] h-full flex items-center justify-end pointer-events-none opacity-10 blur-sm">
                    <span className="text-[30vw] font-heading font-black text-outline">ENGINEER</span>
                </div>
            </section>

            <div className="w-full bg-card relative z-20 border-t border-border rounded-t-[3rem] pt-32 pb-32 px-4 md:px-12">

                {/* ═════════ THE NARRATIVE ═════════ */}
                <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 mb-40">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-heading font-black uppercase mb-8 leading-none">Not Just Another <br /> <span className="text-neutral-600 italic">Developer.</span></h2>
                    </div>
                    <div>
                        <p className="text-xl md:text-2xl font-sans text-neutral-400 leading-relaxed mb-8">
                            I don't just write code; I architect ecosystems that drive multi-million dollar revenue. From autonomous AI pipelines to lightning-fast SaaS infrastructure, my craft defies standard templates.
                        </p>
                        <p className="text-lg font-sans text-neutral-500 leading-relaxed mb-12">
                            With over 300+ successful enterprise deployments globally, my mission is to continuously blur the line between highly scalable backend logic and award-winning frontend experiences.
                        </p>
                        <MagneticWrapper>
                            <Link href="/contact" className="inline-flex items-center gap-3 font-heading font-bold text-lg uppercase tracking-widest text-primary border-b border-primary pb-1 hover:text-foreground hover:border-foreground transition-colors">
                                Start A Project <IconArrowUpRight className="w-6 h-6" />
                            </Link>
                        </MagneticWrapper>
                    </div>
                </section>

                {/* ═════════ TECHNICAL ARSENAL ═════════ */}
                <section className="max-w-7xl mx-auto mb-32">
                    <h2 className="text-[8vw] font-heading font-black uppercase text-center mb-24 opacity-20 text-outline mix-blend-overlay">Technical Arsenal</h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {skills.map((skill, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.05 }}
                                className="group flex flex-col items-center justify-center p-8 border border-border bg-background hover:bg-foreground hover:text-background transition-colors duration-500 rounded-2xl cursor-default"
                            >
                                <skill.icon className="w-10 h-10 mb-4 text-muted-foreground group-hover:text-background transition-colors" />
                                <span className="font-heading font-bold uppercase text-xs tracking-widest">{skill.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    );
}
