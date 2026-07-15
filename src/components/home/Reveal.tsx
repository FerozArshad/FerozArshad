"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

const EASE = [0.22, 0.9, 0.3, 1] as const;

/**
 * Scroll-reveal block: starts opacity 0 / translateY(22px), animates in on
 * intersection (10% visible), staggered 90ms per sibling via the `i` index.
 * Pass `now` to animate immediately on mount (hero).
 */
export default function Reveal({
  i = 0,
  now = false,
  className,
  style,
  children,
}: {
  i?: number;
  now?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const target = { opacity: 1, y: 0 };
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      {...(now
        ? { animate: target }
        : { whileInView: target, viewport: { once: true, amount: 0.1 } })}
      transition={{ duration: 0.7, ease: EASE, delay: i * 0.09 }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
