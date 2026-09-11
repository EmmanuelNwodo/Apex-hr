"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { useHasMounted } from "@/components/motion/use-has-mounted";

interface WorkplaceFactCardProps {
  facts: string[];
  intervalMs?: number;
  className?: string;
}

interface FactTheme {
  background: string;
  heading: string;
  text: string;
}

/**
 * One coordinated colour theme per fact, applied to the card background,
 * the "Workplace fact" heading and the fact text. Selected by the current
 * fact's index — see WorkplaceFactCard below. Each combination keeps
 * WCAG AA contrast between its background and both foreground colours.
 */
const factThemes: FactTheme[] = [
  { background: "#17233F", heading: "#5BC29A", text: "#FFFFFF" },
  { background: "#16362F", heading: "#E8B77D", text: "#F7F2E8" },
  { background: "#4B2431", heading: "#F4B89A", text: "#FFF6F0" },
  { background: "#103B45", heading: "#74D3C2", text: "#F5FFFC" },
  { background: "#342440", heading: "#E5B96F", text: "#FFF9F0" },
  { background: "#272B31", heading: "#F09A86", text: "#FFFFFF" },
  { background: "#19395B", heading: "#81C8E8", text: "#F7FBFF" },
];

const FULL_MOTION_DURATION = 1.2;
const REDUCED_MOTION_DURATION = 0.2;

/**
 * Auto-rotating "workplace fact" card, designed to overlap the lower-right
 * corner of a media panel (e.g. the hero video). Plays a one-time entrance
 * — fade, gentle scale and an inward slide from the lower-right — the
 * first time it scrolls into view, via Motion's `whileInView` (backed by
 * IntersectionObserver, `viewport={{ once: true }}` so it never repeats).
 * Rotation through `facts` then starts, one at a time, every `intervalMs`,
 * pausing on hover/focus and resuming when the pointer or focus leaves.
 *
 * Each fact carries its own colour theme (`factThemes`, indexed by the
 * current fact). The card background and heading colour live on elements
 * that stay mounted across rotations, so their `color`/`backgroundColor`
 * genuinely tween through intermediate hues over `FULL_MOTION_DURATION`
 * seconds, in step with the fact-text fade/slide (mode="wait" AnimatePresence
 * keyed on the active index). Reduced-motion users get a short, slide-free
 * opacity fade instead, at `REDUCED_MOTION_DURATION`.
 *
 * Renders a fully-visible, unanimated version of the card (same first
 * theme, same first fact) until useHasMounted confirms React has actually
 * hydrated — otherwise Motion's `initial={opacity:0, ...}` would ship as
 * inline styling in the raw SSR HTML, invisible to anyone whose
 * JavaScript is slow, blocked or fails.
 */
export function WorkplaceFactCard({ facts, intervalMs = 5000, className }: WorkplaceFactCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const hasMounted = useHasMounted();

  useEffect(() => {
    if (!hasEntered || isPaused || facts.length <= 1) return;
    const id = setInterval(() => {
      setActiveIndex((current) => (current + 1) % facts.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [hasEntered, isPaused, intervalMs, facts.length]);

  const activeFact = facts[activeIndex];
  const theme = factThemes[activeIndex % factThemes.length];
  const colorDuration = shouldReduceMotion ? REDUCED_MOTION_DURATION : FULL_MOTION_DURATION;
  const contentDuration = shouldReduceMotion ? REDUCED_MOTION_DURATION : FULL_MOTION_DURATION;
  const cardClassName = cn(
    "absolute right-4 bottom-4 z-10 w-[calc(100%-2rem)] max-w-72 rounded-md p-6 shadow-(--shadow-modal) sm:right-6 sm:bottom-6 sm:w-72 lg:-right-6 lg:-bottom-6 lg:w-80 lg:p-8",
    className,
  );

  if (!hasMounted) {
    return (
      <div
        className={cardClassName}
        role="group"
        aria-label="Workplace fact"
        tabIndex={0}
        style={{ backgroundColor: factThemes[0].background }}
      >
        <p className="text-small font-semibold uppercase tracking-[0.08em]" style={{ color: factThemes[0].heading }}>
          Workplace fact
        </p>
        <div className="mt-3 min-h-28">
          <p className="text-body" style={{ color: factThemes[0].text }}>
            {facts[0]}
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={cardClassName}
      role="group"
      aria-label="Workplace fact"
      tabIndex={0}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      initial={
        shouldReduceMotion
          ? { opacity: 1, backgroundColor: factThemes[0].background }
          : { opacity: 0, scale: 0.96, x: 28, y: 28, backgroundColor: factThemes[0].background }
      }
      whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: shouldReduceMotion ? 0.01 : 0.6, ease: [0.2, 0, 0, 1] }}
      onViewportEnter={() => setHasEntered(true)}
      animate={{
        backgroundColor: theme.background,
        transition: { duration: colorDuration, ease: "easeInOut" },
      }}
    >
      <motion.p
        className="text-small font-semibold uppercase tracking-[0.08em]"
        initial={{ color: factThemes[0].heading }}
        animate={{ color: theme.heading, transition: { duration: colorDuration, ease: "easeInOut" } }}
      >
        Workplace fact
      </motion.p>
      <div className="mt-3 min-h-28">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={activeIndex}
            className="text-body"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, color: theme.text }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: contentDuration, ease: "easeInOut" }}
          >
            {activeFact}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
