"use client";

import { Entrance, type EntranceProps } from "@/components/motion/entrance";
import { scaleRevealVariants } from "@/lib/motion-tokens";

/**
 * Entrance for stats, badges and single logos: fades in while scaling up
 * from 0.9 to 1, rather than rising. Wrap the stat/logo's own container —
 * an existing internal number-counter animation (e.g. AnimatedStatValue)
 * is untouched by this; it keeps counting on its own independent trigger,
 * this only animates the surrounding block's entrance.
 */
export function ScaleReveal(props: EntranceProps) {
  return <Entrance {...props} variants={scaleRevealVariants} />;
}
