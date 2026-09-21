"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { fadeInUp } from "@/lib/motion-tokens";
import { useHasMounted } from "@/components/motion/use-has-mounted";

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
 * div with no animation when the user prefers reduced motion, or before
 * hydration completes (useHasMounted — see its own doc comment; the same
 * gate `Entrance`/`StaggerContainer` use, so this file cannot ship
 * `initial={fadeInUp.initial}`'s `opacity:0` as inline SSR styling — SEO
 * renderability audit remediation, added defensively even though this
 * component currently has no call sites in the app).
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const hasMounted = useHasMounted();

  if (shouldReduceMotion || !hasMounted) {
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
