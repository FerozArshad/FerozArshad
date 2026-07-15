"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // The home page relies on position:fixed/sticky chrome (matrix background,
    // custom cursor, floating WhatsApp). A transformed/will-change ancestor
    // would turn those into containing-block prisoners, so skip the wrapper.
    if (pathname === "/") return <>{children}</>;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full"
                style={{ willChange: "transform, opacity" }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
