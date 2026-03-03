"use client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import {
    IconBrandNextjs, IconBrandPython, IconBrandReact, IconBrandTailwind,
    IconBrandMysql, IconBrandNodejs, IconBrandWordpress, IconShoppingCart,
    IconBrandDocker, IconBrandGit, IconBrandFigma, IconBrandDjango,
    IconApi, IconBrain, IconSpider, IconBrandHtml5, IconBrandCss3
} from "@tabler/icons-react";

const skills = [
    { icon: IconBrandNextjs, name: "Next.js", category: "Frontend" },
    { icon: IconBrandReact, name: "React", category: "Frontend" },
    { icon: IconBrandTailwind, name: "Tailwind CSS", category: "Frontend" },
    { icon: IconBrandHtml5, name: "HTML5", category: "Frontend" },
    { icon: IconBrandCss3, name: "CSS3", category: "Frontend" },
    { icon: IconBrandFigma, name: "Figma", category: "Frontend" },
    { icon: IconBrandPython, name: "Python", category: "Backend" },
    { icon: IconBrandDjango, name: "Django", category: "Backend" },
    { icon: IconApi, name: "FastAPI", category: "Backend" },
    { icon: IconBrandNodejs, name: "Node.js", category: "Backend" },
    { icon: IconBrandMysql, name: "MariaDB/SQL", category: "Backend" },
    { icon: IconBrandDocker, name: "Docker", category: "Backend" },
    { icon: IconBrandWordpress, name: "WordPress", category: "CMS" },
    { icon: IconShoppingCart, name: "Shopify", category: "CMS" },
    { icon: IconBrain, name: "OpenAI", category: "AI" },
    { icon: IconSpider, name: "Selenium", category: "AI" },
    { icon: IconBrandGit, name: "Git/GitHub", category: "Tools" },
];

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <div className="max-w-5xl mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-5xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">About Feroz Arshad</h1>
                    <p className="text-xl text-neutral-400 mb-16 leading-relaxed max-w-2xl">
                        From a Computer Science graduate to a Top-Rated developer driving $1M+ in client revenue across 300+ projects.
                    </p>
                </motion.div>

                <div className="space-y-16">
                    {/* Section 1: Journey */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="p-8 rounded-[2rem] bg-card border border-white/5"
                    >
                        <h2 className="text-2xl font-bold mb-6 text-primary">The Journey</h2>
                        <div className="prose prose-invert max-w-none">
                            <p className="text-neutral-300 leading-relaxed mb-4 text-lg">
                                I began my journey in 2021, focusing heavily on WordPress and E-Commerce, where I quickly became a Top-Rated seller on Fiverr and Upwork, completing over 300 projects. However, I realized the limitations of traditional CMS environments when scaling enterprise workflows.
                            </p>
                            <p className="text-neutral-300 leading-relaxed text-lg">
                                This drove me to master Full-Stack SaaS architecture and AI Automation. Today, I don't just build beautiful interfaces; I build the autonomous backend systems (n8n, OpenAI, FastAPI) that power multi-million dollar business pipelines.
                            </p>
                        </div>
                    </motion.section>

                    {/* Section 2: Tech Skills Grid */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold mb-10 pl-2">Technical Proficiency</h2>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                            {skills.map((skill, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: idx * 0.03 }}
                                    className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-card border border-white/5 hover:border-primary/30 hover:bg-white/5 transition duration-300 cursor-default"
                                >
                                    <skill.icon className="w-8 h-8 text-neutral-500 group-hover:text-primary transition duration-300" stroke={1.5} />
                                    <span className="text-xs text-neutral-500 font-medium text-center group-hover:text-neutral-300 transition">{skill.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Section 3: Timeline */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h2 className="text-3xl font-bold mb-10 pl-2">Experience & Milestones</h2>
                        <div className="border-l-2 border-primary/20 pl-8 space-y-12 ml-4">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="relative"
                            >
                                <span className="absolute -left-[2.45rem] top-1.5 h-5 w-5 rounded-full bg-primary border-4 border-[#0a0a0a] shadow-[0_0_15px_rgba(59,130,246,0.5)]"></span>
                                <span className="text-sm font-bold text-primary mb-2 block tracking-widest uppercase">2023 - Present</span>
                                <h3 className="text-2xl font-bold text-white mb-3">AI Automation & SaaS Architect</h3>
                                <p className="text-neutral-400 text-lg leading-relaxed">Deploying autonomous AI agents, massive web scrapers, and highly scalable Next.js architectures for enterprise clients.</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="relative"
                            >
                                <span className="absolute -left-[2.45rem] top-1.5 h-5 w-5 rounded-full bg-neutral-700 border-4 border-[#0a0a0a]"></span>
                                <span className="text-sm font-bold text-neutral-500 mb-2 block tracking-widest uppercase">2021 - 2023</span>
                                <h3 className="text-2xl font-bold text-white mb-3">Top-Rated E-Commerce Expert</h3>
                                <p className="text-neutral-400 text-lg leading-relaxed">Completed 300+ custom web design projects globally. Generated significant revenue scaling UI/UX for e-commerce platforms.</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="relative"
                            >
                                <span className="absolute -left-[2.45rem] top-1.5 h-5 w-5 rounded-full bg-neutral-700 border-4 border-[#0a0a0a]"></span>
                                <span className="text-sm font-bold text-neutral-500 mb-2 block tracking-widest uppercase">2019 - 2023</span>
                                <h3 className="text-2xl font-bold text-white mb-3">B.Sc. Computer Science</h3>
                                <p className="text-neutral-400 text-lg leading-relaxed">Graduated from Islamia University Bahawalpur, building the absolute core academic foundation in data structures, algorithms, and application flow.</p>
                            </motion.div>
                        </div>
                    </motion.section>
                </div>
            </div>
            <Footer />
        </>
    );
}
