"use client";

import { Entrance, type EntranceProps } from "@/components/motion/entrance";
import { paragraphRiseVariants } from "@/lib/motion-tokens";

/**
 * Entrance for supporting content — paragraphs, lists, button rows,
 * generic body blocks: fades in while rising ~25-35px, a lighter rise than
 * RevealHeading so a heading+paragraph pair reads as one layered sequence.
 * Pass `delay` (seconds) to have it settle just after a sibling
 * RevealHeading, per the site's "Layered Rise and Reveal" spec.
 */
export function FadeUp(props: EntranceProps) {
  return <Entrance {...props} variants={paragraphRiseVariants} />;
}
