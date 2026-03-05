"use client";
import Link from "next/link";
import { IconBrandGithub, IconBrandLinkedin, IconBrandUpwork, IconMail } from "@tabler/icons-react";
import { MagneticWrapper } from "@/components/MagneticWrapper";

export const Footer = () => {
    return (
        <footer className="bg-card pt-32 pb-12 rounded-t-[3rem] -mt-10 relative z-30 border-t border-border">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col items-center text-center mb-24">
                    <h2 className="text-[15vw] leading-[0.8] font-heading font-black uppercase tracking-tighter text-outline opacity-20 hover:opacity-100 hover:text-foreground hover:text-outline-none transition-all duration-700 cursor-default">
                        FEROZ ARSHAD
                    </h2>
                </div>

                <div className="grid md:grid-cols-4 gap-12 mb-12 border-t border-border pt-16">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <h3 className="text-3xl font-heading font-extrabold tracking-tighter text-foreground mb-6 uppercase">Digital Architect</h3>
                        <p className="text-muted-foreground max-w-sm font-sans text-lg leading-relaxed mb-8">
                            Engineering scalable web systems and autonomous pipelines for enterprise clients worldwide. Out-innovate your competition.
                        </p>
                        <div className="flex gap-4">
                            <MagneticWrapper><a href="https://github.com/FerozArshad" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition duration-500"><IconBrandGithub className="w-5 h-5" /></a></MagneticWrapper>
                            <MagneticWrapper><a href="https://linkedin.com/in/ferozarshad" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition duration-500"><IconBrandLinkedin className="w-5 h-5" /></a></MagneticWrapper>
                            <MagneticWrapper><a href="https://upwork.com/freelancers/ferozarshad" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-green-600 hover:border-green-600 hover:text-white transition duration-500"><IconBrandUpwork className="w-5 h-5" /></a></MagneticWrapper>
                            <MagneticWrapper><a href="mailto:contact@ferozarshad.com" className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition duration-500"><IconMail className="w-5 h-5" /></a></MagneticWrapper>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xs font-heading font-bold tracking-widest uppercase text-muted-foreground mb-8">Navigation</h4>
                        <ul className="space-y-4 font-heading text-sm uppercase tracking-widest font-bold">
                            <li><Link href="/services" className="text-muted-foreground hover:text-foreground hover:italic transition-all">Services</Link></li>
                            <li><Link href="/portfolio" className="text-muted-foreground hover:text-foreground hover:italic transition-all">Portfolio</Link></li>
                            <li><Link href="/insights" className="text-muted-foreground hover:text-foreground hover:italic transition-all">Insights</Link></li>
                            <li><Link href="/about" className="text-muted-foreground hover:text-foreground hover:italic transition-all">About</Link></li>
                            <li><Link href="/contact" className="text-muted-foreground hover:text-foreground hover:italic transition-all">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-xs font-heading font-bold tracking-widest uppercase text-muted-foreground mb-8">Expertise</h4>
                        <ul className="space-y-4 font-heading text-sm uppercase tracking-widest font-bold">
                            <li><Link href="/services/ai-automation" className="text-muted-foreground hover:text-foreground hover:italic transition-all">AI Validation & n8n</Link></li>
                            <li><Link href="/services/full-stack-saas" className="text-muted-foreground hover:text-foreground hover:italic transition-all">SaaS Architecture</Link></li>
                            <li><Link href="/services/ecommerce" className="text-muted-foreground hover:text-foreground hover:italic transition-all">Headless E-Commerce</Link></li>
                            <li><Link href="/services/custom-web-design" className="text-muted-foreground hover:text-foreground hover:italic transition-all">Creative WebGL Design</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-16 pt-8 border-t border-border">
                    <p className="text-muted-foreground font-sans text-sm">© {new Date().getFullYear()} Feroz Arshad. All rights reserved.</p>
                    <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase opacity-50">Engineered with Next.js & Framer Motion</p>
                </div>
            </div>
        </footer>
    );
};
