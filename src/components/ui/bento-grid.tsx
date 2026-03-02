import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import Link from "next/link";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
    href,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
    href?: string;
}) => {
    const innerContent = (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{ willChange: "transform" }}
            className={cn(
                "row-span-1 rounded-3xl group/bento transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-card dark:border-white/[0.1] bg-white border border-transparent justify-between flex flex-col space-y-4 overflow-hidden relative h-full w-full",
                className
            )}
        >
            {/* Background Glow on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover/bento:opacity-100 transition duration-500 ease-in-out pointer-events-none"></div>

            {header}
            <div className="group-hover/bento:translate-x-2 transition duration-200 z-10 relative">
                {icon}
                <div className="font-sans font-bold text-neutral-600 dark:text-neutral-100 mb-2 mt-2 text-xl">
                    {title}
                </div>
                <div className="font-sans font-normal text-neutral-600 text-sm dark:text-neutral-400">
                    {description}
                </div>
            </div>
        </motion.div>
    );

    return href ? (
        <Link href={href} className={cn("block h-full w-full", className)}>
            {innerContent}
        </Link>
    ) : (
        innerContent
    );
};
