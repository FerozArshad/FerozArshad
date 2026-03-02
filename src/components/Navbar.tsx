"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export const Navbar = () => {
    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky top-4 z-50 w-full mb-12 flex justify-center"
        >
            <div className="flex items-center justify-between px-6 py-3 bg-black/50 backdrop-blur-md border border-white/10 rounded-full shadow-2xl w-full max-w-3xl">
                <Link href="/" className="flex items-center gap-3">
                    <Image src="/images/feroz-logo.svg" alt="Feroz Arshad Logo" width={32} height={32} />
                    <span className="text-white font-bold text-xl tracking-tight hidden sm:block">Feroz Arshad</span>
                </Link>
                <div className="hidden md:flex space-x-8 text-sm font-medium text-neutral-300">
                    <Link href="/services" className="hover:text-white transition">Services</Link>
                    <Link href="/portfolio" className="hover:text-white transition">Portfolio</Link>
                    <Link href="/insights" className="hover:text-white transition">Insights</Link>
                    <Link href="/about" className="hover:text-white transition">About</Link>
                </div>
                <Link
                    href="/contact"
                    className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-neutral-200 transition"
                >
                    Let's Talk
                </Link>
            </div>
        </motion.nav>
    );
};
