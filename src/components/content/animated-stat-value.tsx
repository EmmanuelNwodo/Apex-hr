"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";

interface AnimatedStatValueProps {
  value: string;
  className?: string;
}

/**
 * Counts a trust-stat number up from 0 to its target value once it scrolls
 * into view, then holds — a small client island so the surrounding
 * TrustSection stays a server component (DESIGN.md performance guidance:
 * `use client` at the narrowest boundary). Renders the live count through a
 * MotionValue bound directly to the DOM text node, not React state, so the
 * ~60fps updates during the count don't trigger React re-renders. A
 * non-numeric value (should one ever appear) renders as static text.
 * Reduced-motion users see the final number immediately, per DESIGN.md 21.4.
 */
export function AnimatedStatValue({ value, className }: AnimatedStatValueProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();
  const target = Number(value);
  const isNumeric = !Number.isNaN(target);

  const count = useMotionValue(isNumeric && !shouldReduceMotion ? 0 : target);
  const rounded = useTransform(count, (latest) => Math.round(latest).toString());

  useEffect(() => {
    if (!isNumeric || shouldReduceMotion || !isInView) return;

    const controls = animate(count, target, { duration: 1.6, ease: "easeOut" });
    return () => controls.stop();
  }, [isInView, shouldReduceMotion, isNumeric, target, count]);

  if (!isNumeric) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <motion.span ref={ref} className={className}>
      {rounded}
    </motion.span>
  );
}
