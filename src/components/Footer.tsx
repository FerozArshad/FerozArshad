"use client";
import Link from "next/link";
import { IconBrandGithub, IconBrandLinkedin, IconBrandUpwork, IconMail } from "@tabler/icons-react";

export const Footer = () => {
    return (
        <footer className="border-t border-white/5 bg-black mt-32">
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <h3 className="text-2xl font-extrabold tracking-tight text-white mb-4">Feroz Arshad</h3>
                        <p className="text-neutral-500 max-w-md leading-relaxed mb-6">
                            Top-Rated Full-Stack Developer & AI Automation Architect. Engineering scalable web systems and autonomous pipelines for enterprise clients worldwide.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://github.com/FerozArshad" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 transition duration-300">
                                <IconBrandGithub className="w-5 h-5 text-neutral-400 hover:text-white transition" />
                            </a>
                            <a href="https://linkedin.com/in/ferozarshad" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 transition duration-300">
                                <IconBrandLinkedin className="w-5 h-5 text-neutral-400 hover:text-white transition" />
                            </a>
                            <a href="https://upwork.com/freelancers/ferozarshad" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-green-500/20 hover:border-green-500/50 transition duration-300">
                                <IconBrandUpwork className="w-5 h-5 text-neutral-400 hover:text-white transition" />
                            </a>
                            <a href="mailto:contact@ferozarshad.com" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 transition duration-300">
                                <IconMail className="w-5 h-5 text-neutral-400 hover:text-white transition" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-bold tracking-widest uppercase text-neutral-400 mb-6">Navigation</h4>
                        <ul className="space-y-3">
                            <li><Link href="/services" className="text-neutral-500 hover:text-white transition text-sm">Services</Link></li>
                            <li><Link href="/portfolio" className="text-neutral-500 hover:text-white transition text-sm">Portfolio</Link></li>
                            <li><Link href="/insights" className="text-neutral-500 hover:text-white transition text-sm">Insights</Link></li>
                            <li><Link href="/about" className="text-neutral-500 hover:text-white transition text-sm">About</Link></li>
                            <li><Link href="/contact" className="text-neutral-500 hover:text-white transition text-sm">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-sm font-bold tracking-widest uppercase text-neutral-400 mb-6">Services</h4>
                        <ul className="space-y-3">
                            <li><Link href="/services/ai-automation" className="text-neutral-500 hover:text-white transition text-sm">AI & Automation</Link></li>
                            <li><Link href="/services/full-stack-saas" className="text-neutral-500 hover:text-white transition text-sm">Full-Stack SaaS</Link></li>
                            <li><Link href="/services/ecommerce" className="text-neutral-500 hover:text-white transition text-sm">E-Commerce</Link></li>
                            <li><Link href="/services/custom-web-design" className="text-neutral-500 hover:text-white transition text-sm">Web Design</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-neutral-600 text-sm">© {new Date().getFullYear()} Feroz Arshad. All rights reserved.</p>
                    <p className="text-neutral-700 text-xs font-mono">Engineered with Next.js 16 · Prisma · MariaDB · Framer Motion</p>
                </div>
            </div>
        </footer>
    );
};
