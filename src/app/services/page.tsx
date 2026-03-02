"use client";
import { Navbar } from "@/components/Navbar";
import { servicesData } from "@/data/servicesData";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";

export default function ServicesPage() {
    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">Services Architecture</h1>
                    <p className="text-xl text-neutral-400 mb-20 max-w-3xl leading-relaxed">
                        Comprehensive development services scaling from visual e-commerce storefronts to high-performance AI backend systems. Select an area below to dive deep into my architectural approach.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {servicesData.map((service, idx) => {
                        const Icon = service.icon;
                        return (
                            <motion.div
                                key={service.slug}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                style={{ willChange: "transform, opacity" }}
                            >
                                <Link href={`/services/${service.slug}`} className="group block h-full">
                                    <div className="relative h-full p-8 lg:p-12 rounded-[2.5rem] bg-card border border-white/5 hover:border-primary/50 transition duration-500 overflow-hidden shadow-2xl">
                                        {/* Background Glow */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>

                                        <div className="flex justify-between items-start mb-8 relative z-10">
                                            <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-primary/30 transition duration-300">
                                                <Icon className="h-8 w-8 text-primary" stroke={1.5} />
                                            </div>
                                            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition duration-300 text-neutral-500">
                                                <IconArrowRight className="w-6 h-6" />
                                            </div>
                                        </div>

                                        <div className="relative z-10">
                                            <h2 className="text-3xl font-bold mb-4 group-hover:text-primary transition duration-300">{service.title}</h2>
                                            <p className="text-neutral-400 mb-8 leading-relaxed">
                                                {service.shortDescription}
                                            </p>

                                            <ul className="space-y-3">
                                                {service.features.slice(0, 3).map((feature, fIdx) => (
                                                    <li key={fIdx} className="flex items-center gap-3 text-sm text-neutral-300">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50 block"></span>
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
        </>
    );
}
