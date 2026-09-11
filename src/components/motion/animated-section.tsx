"use client";

import { Entrance, type EntranceProps } from "@/components/motion/entrance";
import { sectionRiseVariants } from "@/lib/motion-tokens";

/**
 * General-purpose whole-block entrance — fades in while rising a moderate
 * amount (between RevealHeading's and FadeUp's). Use it for a block that
 * doesn't cleanly split into a separate heading/body pair, e.g. a CTA
 * band's own background/decorative frame, or a self-contained widget.
 * For a CTA band where the content should rise in just after its
 * background/decoration appears, wrap the outer band in AnimatedSection
 * and the inner heading/paragraph/button group in a nested RevealHeading
 * or FadeUp with a small `delay` (e.g. 0.15-0.2s).
 */
export function AnimatedSection(props: EntranceProps) {
  return <Entrance {...props} variants={sectionRiseVariants} />;
}
