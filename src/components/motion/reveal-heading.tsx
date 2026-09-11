"use client";

import { Entrance, type EntranceProps } from "@/components/motion/entrance";
import { headingRiseVariants } from "@/lib/motion-tokens";

/**
 * Entrance for section headings (h1/h2/h3, typically alongside their
 * kicker): fades in while rising ~56px, the most pronounced rise in the
 * site's "Layered Rise and Reveal" system. Wrap the heading markup itself
 * (or the small kicker+heading block above it) — this renders a `div`
 * around its children, it does not replace or alter the heading tag.
 */
export function RevealHeading(props: EntranceProps) {
  return <Entrance {...props} variants={headingRiseVariants} />;
}
