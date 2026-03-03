"use client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconBook2 } from "@tabler/icons-react";

const articles = [
    {
        title: "Why You Need to Stop Using Zapier and Switch to n8n (Self-Hosted)",
        date: "October 12, 2024",
        category: "AI Automation",
        slug: "switch-to-n8n"
    },
    {
        title: "The Death of Elementor: Why Headless E-Commerce is the Future",
        date: "September 04, 2024",
        category: "Web Architecture",
        slug: "headless-ecommerce-future"
    },
    {
        title: "How I Built an Autonomous Lead Generation Pipeline with Python Selenium",
        date: "August 19, 2024",
        category: "Python SaaS",
        slug: "autonomous-lead-generation"
    },
    {
        title: "Optimizing Next.js 14 App Router for 100/100 Core Web Vitals",
        date: "July 22, 2024",
        category: "Performance",
        slug: "nextjs-core-web-vitals"
    }
];

export default function InsightsPage() {
    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <h1 className="text-5xl font-extrabold mb-6 tracking-tight">Insights & Engineering Blog</h1>
                    <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
                        Technical deep-dives into modern web architecture, AI automation logic, and scaling premium SaaS products.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 pl-2">
                    {articles.map((article, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                            <Link href="#" className="group block h-full">
                                <div className="h-full p-8 rounded-[2rem] bg-card border border-white/5 hover:border-primary/50 hover:bg-white/5 transition duration-500 relative overflow-hidden">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition duration-300">
                                            <IconBook2 className="w-6 h-6 text-neutral-400 group-hover:text-primary transition" />
                                        </div>
                                        <span className="text-neutral-500 text-sm font-mono border border-white/10 px-3 py-1 rounded-full">{article.date}</span>
                                    </div>
                                    <span className="text-primary text-xs font-bold tracking-widest uppercase mb-3 block">{article.category}</span>
                                    <h3 className="text-2xl font-bold text-white group-hover:text-primary transition duration-300 mb-4 leading-snug">
                                        {article.title}
                                    </h3>
                                    <p className="text-neutral-500 text-sm italic mt-auto pt-4 border-t border-white/5">
                                        (Full article integration pending CMS Database)
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}
