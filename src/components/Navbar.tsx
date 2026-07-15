"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MagneticWrapper } from "@/components/MagneticWrapper";

export const Navbar = () => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed top-0 left-0 right-0 z-[100] w-full p-4 md:p-8 pointer-events-none"
        >
            <div className="flex items-center justify-between w-full max-w-7xl mx-auto pointer-events-auto text-foreground">
                <MagneticWrapper>
                    <Link href="/" className="flex items-center gap-4 group">
                        <span className="font-heading font-black text-2xl tracking-tighter uppercase leading-none group-hover:italic transition-all">Feroz<br />Arshad</span>
                    </Link>
                </MagneticWrapper>
                <div className="hidden md:flex space-x-12 text-xs font-heading font-bold uppercase tracking-widest">
                    <MagneticWrapper><Link href="/" className="hover:italic transition-all">Home</Link></MagneticWrapper>
                    <MagneticWrapper><Link href="/insights" className="hover:italic transition-all">Insights</Link></MagneticWrapper>
                </div>
                <MagneticWrapper className="pointer-events-auto">
                    <Link href="/#contact" className="fixed top-6 right-6 md:static px-6 py-3 border border-border rounded-full text-xs font-heading font-bold uppercase tracking-widest hover:bg-foreground hover:text-background hover:scale-105 transition-all text-foreground bg-background/50 backdrop-blur-md md:bg-transparent md:backdrop-blur-none">
                        Let's Talk
                    </Link>
                </MagneticWrapper>
            </div>
        </motion.nav>
    );
};
