"use client";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { IconArrowUpRight } from "@tabler/icons-react";

export default function PortfolioPage() {
    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-5xl font-bold mb-6">Case Studies & Portfolio</h1>
                    <p className="text-xl text-neutral-400 mb-12 max-w-2xl">
                        Deep dives into 300+ completed projects. See the problem, the architectural solution, and the resulting ROI.
                    </p>
                </motion.div>

                {/* Categories / Filter Placeholder */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex gap-4 mb-16 flex-wrap"
                >
                    {["All", "AI & Automation", "SaaS Backend", "WordPress & UI"].map((tag) => (
                        <span key={tag} className="px-5 py-2 rounded-full border border-white/10 text-sm font-medium hover:bg-white hover:text-black cursor-pointer transition duration-300">
                            {tag}
                        </span>
                    ))}
                </motion.div>

                {/* Portfolio Grid */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {portfolioData.map((c, idx) => (
                        <motion.div
                            key={c.slug}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            style={{ willChange: "transform, opacity" }}
                        >
                            <Link href={`/portfolio/${c.slug}`} className="group block">
                                <div className="rounded-[2.5rem] bg-card border border-white/5 p-3 hover:border-primary/50 transition duration-500 hover:shadow-[0_0_40px_-15px_rgba(59,130,246,0.3)]">
                                    <div className="w-full h-72 md:h-80 rounded-[2rem] bg-gradient-to-br from-neutral-900 to-black mb-6 flex flex-col items-center justify-center relative overflow-hidden group-hover:scale-[0.98] transition duration-500">
                                        {/* Abstract geometric placeholder for premium feel */}
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                                        <div className="w-24 h-24 rounded-full border border-white/10 bg-white/5 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:border-primary/50 transition duration-500">
                                            <IconArrowUpRight className="w-8 h-8 text-neutral-500 group-hover:text-primary transition" />
                                        </div>
                                    </div>
                                    <div className="px-6 pb-6">
                                        <span className="text-primary text-xs font-bold tracking-widest uppercase mb-3 block">{c.category}</span>
                                        <h3 className="text-3xl font-bold group-hover:text-primary transition duration-300 mb-2 leading-tight">{c.title}</h3>
                                        <p className="text-neutral-400 line-clamp-2">{c.problem}</p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );
}
