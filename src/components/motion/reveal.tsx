"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { fadeInUp } from "@/lib/motion-tokens";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Additional delay in seconds, for restrained staggering of a few items. */
  delay?: number;
}

/**
 * Wraps content in a subtle opacity + upward-translation entrance when it
 * scrolls into view (DESIGN.md 21.2). This is the only client boundary —
 * the wrapped content itself can remain server-rendered. Renders a plain
 * div with no animation when the user prefers reduced motion.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={fadeInUp.initial}
      whileInView={fadeInUp.animate}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...fadeInUp.transition, delay }}
    >
      {children}
    </motion.div>
  );
}
