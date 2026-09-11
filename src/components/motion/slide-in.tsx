"use client";

import { Entrance, type EntranceProps } from "@/components/motion/entrance";
import { slideInLeftVariants, slideInRightVariants } from "@/lib/motion-tokens";

/**
 * Entrance for imagery positioned on the LEFT of a layout: slides in from
 * the left while scaling from 0.92 to 1. Pair with SlideInRight on the
 * opposite side of an alternating text/image section so left- and
 * right-hand images always travel inward from their own side, never past
 * each other.
 *
 * The horizontal travel is deliberately modest (48px) rather than a large
 * sweep — enough to read as a slide without the animating element ever
 * needing to paint outside its section on narrow viewports. `overflow-x`
 * is additionally clipped at the `<body>` level (see layout.tsx) as a
 * belt-and-braces guard against a horizontal scrollbar on any breakpoint.
 */
export function SlideInLeft(props: EntranceProps) {
  return <Entrance {...props} variants={slideInLeftVariants} />;
}

/** Entrance for imagery positioned on the RIGHT of a layout — see SlideInLeft. */
export function SlideInRight(props: EntranceProps) {
  return <Entrance {...props} variants={slideInRightVariants} />;
}
