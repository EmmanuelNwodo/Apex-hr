"use client";

import { useReducedMotion } from "motion/react";

interface HeroVideoProps {
  src: string;
  className?: string;
}

/**
 * Decorative hero background video. Autoplays muted and loops when motion
 * is welcome, per DESIGN.md 17.1 ("do not use autoplay video with essential
 * audio") and 21.3 (no autoplay sound). Under prefers-reduced-motion it
 * stays paused on its first frame with native controls instead, so the
 * visitor can opt in — DESIGN.md 21.4 requires auto-moving media to stop
 * and all content/controls to remain available.
 */
export function HeroVideo({ src, className }: HeroVideoProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <video
      className={className}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      autoPlay={!shouldReduceMotion}
      controls={Boolean(shouldReduceMotion)}
      aria-hidden={shouldReduceMotion ? undefined : "true"}
    />
  );
}
