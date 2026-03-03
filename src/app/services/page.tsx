"use client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { servicesData } from "@/data/servicesData";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";

export default function ServicesPage() {
    const { scrollYProgress } = useScroll();
    const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);

    return (
        <div className="relative w-full bg-black text-white selection:bg-primary selection:text-white">
            <Navbar />

            {/* AWWWARDS HEADER */}
            <section className="relative h-[65vh] flex flex-col justify-end pb-20 px-4 md:px-12 overflow-hidden">
                <motion.div style={{ y: yText }} className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start mix-blend-difference">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-primary font-heading font-bold uppercase tracking-widest mb-6 block"
                    >
                        ARCHITECTURAL SOLUTIONS
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl md:text-[9vw] font-heading font-black leading-[0.8] uppercase tracking-tighter"
                    >
                        EXPERTISE.
                    </motion.h1>
                    <p className="text-xl text-neutral-400 mt-6 max-w-2xl font-sans">
                        Comprehensive deployment scaling from ultra-fast visual storefronts to headless autonomous backend systems. No cookie-cutter templates.
                    </p>
                </motion.div>

                <div className="absolute top-0 right-[-10vw] w-[80vw] h-full flex items-center justify-end pointer-events-none opacity-[0.04] blur-sm">
                    <span className="text-[35vw] font-heading font-black text-outline">LOGIC</span>
                </div>
            </section>

            <div className="w-full bg-neutral-950 relative z-20 border-t border-white/5 rounded-t-[3rem] py-32 px-4 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        {servicesData.map((service, idx) => {
                            const Icon = service.icon;
                            return (
                                <motion.div
                                    key={service.slug}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                                >
                                    <Link href={`/services/${service.slug}`} className="group block h-full">
                                        <div className="relative h-full p-8 lg:p-16 rounded-[2.5rem] bg-black border border-white/5 hover:border-white/20 transition duration-500 overflow-hidden">

                                            {/* Minimalist Hover Background indicator */}
                                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none mix-blend-overlay"></div>

                                            <div className="flex justify-between items-start mb-16 relative z-10">
                                                <Icon className="h-12 w-12 text-primary mix-blend-difference" stroke={1.5} />
                                                <div className="w-12 h-12 rounded-full border border-white/5 absolute top-0 right-0 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition duration-300">
                                                    <IconArrowRight className="w-5 h-5" />
                                                </div>
                                            </div>

                                            <div className="relative z-10 max-w-md">
                                                <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tighter uppercase mb-6 group-hover:text-primary transition duration-300">{service.title}</h2>
                                                <p className="text-neutral-400 mb-10 font-sans text-lg">
                                                    {service.shortDescription}
                                                </p>

                                                <ul className="space-y-4">
                                                    {service.features.slice(0, 3).map((feature, fIdx) => (
                                                        <li key={fIdx} className="flex items-center gap-4 text-xs font-mono tracking-widest uppercase text-neutral-500">
                                                            <div className="h-[1px] w-6 bg-primary/40 block"></div>
                                                            {feature}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
