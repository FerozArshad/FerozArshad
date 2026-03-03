"use client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { IconArrowUpRight } from "@tabler/icons-react";

export default function PortfolioPage() {
    const { scrollYProgress } = useScroll();
    const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);

    return (
        <div className="relative w-full bg-black text-white selection:bg-primary selection:text-white">
            <Navbar />

            {/* AWWWARDS HEADER */}
            <section className="relative h-[60vh] flex flex-col justify-end pb-20 px-4 md:px-12 overflow-hidden">
                <motion.div style={{ y: yText }} className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start mix-blend-difference">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-primary font-heading font-bold uppercase tracking-widest mb-6 block"
                    >
                        SELECTED ARCHIVE
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl md:text-[10vw] font-heading font-black leading-[0.8] uppercase tracking-tighter"
                    >
                        PORTFOLIO.
                    </motion.h1>
                    <p className="text-xl text-neutral-400 mt-6 max-w-2xl font-sans">
                        Deep dives into 300+ completed projects. See the problem, the architectural solution, and the resulting ROI.
                    </p>
                </motion.div>

                <div className="absolute top-0 right-0 w-[80vw] h-full flex items-center justify-end pointer-events-none opacity-[0.05] blur-md">
                    <span className="text-[35vw] font-heading font-black text-outline">WORK</span>
                </div>
            </section>

            <div className="w-full bg-neutral-950 relative z-20 border-t border-white/5 rounded-t-[3rem] py-32 px-4 md:px-12">
                <div className="max-w-7xl mx-auto">
                    {/* Categories Filter Placeholder */}
                    <div className="flex gap-4 mb-24 flex-wrap">
                        {["All Logic", "AI & Automation", "SaaS Systems", "WordPress Frameworks"].map((tag) => (
                            <span key={tag} className="px-6 py-3 rounded-full border border-white/5 text-xs font-heading font-bold tracking-widest uppercase hover:bg-white hover:text-black cursor-pointer transition duration-300">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* brutalist Portfolio Grid */}
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
                        {portfolioData.map((c, idx) => (
                            <motion.div
                                key={c.slug}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: (idx % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className={`group ${idx % 2 === 1 ? 'md:mt-32' : ''}`}
                            >
                                <Link href={`/portfolio/${c.slug}`} className="block">
                                    <div className="w-full aspect-[4/3] rounded-[2rem] bg-black mb-8 overflow-hidden relative border border-white/5">
                                        {/* Abstract Geometric Glow */}
                                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay z-10"></div>
                                        <div className="w-full h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent)]">
                                            <span className="font-heading font-bold text-5xl text-white/5 uppercase tracking-widest">{c.category.split(" ")[0]}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 items-start justify-between">
                                        <div className="max-w-md">
                                            <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-3 block">{c.category}</span>
                                            <h3 className="text-3xl md:text-5xl font-heading font-bold group-hover:text-primary transition-colors leading-[0.9] tracking-tighter uppercase mb-4">{c.title}</h3>
                                            <p className="text-neutral-400 font-sans line-clamp-2">{c.problem}</p>
                                        </div>
                                        <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:border-primary transition-colors duration-500 bg-black">
                                            <IconArrowUpRight className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
