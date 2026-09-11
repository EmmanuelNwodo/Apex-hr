"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import { useHasMounted } from "@/components/motion/use-has-mounted";

/** The handful of tags these wrappers legitimately need to render as, to stay valid HTML inside a <ul>/<table>/etc., or to carry section landmark semantics. */
export type EntranceElement = "div" | "li" | "tr" | "span" | "section" | "fieldset";

export interface EntranceProps {
  children: ReactNode;
  className?: string;
  /** Extra delay in seconds, layered on top of the variant's own transition — used to sequence e.g. a paragraph just after its heading. */
  delay?: number;
  /** Fraction of the element that must be in the viewport before it triggers (site default: 20%). */
  amount?: number;
  /** Element to render as, when the default `div` would be invalid in context (e.g. a direct child of `<ul>`). Defaults to `div`. */
  as?: EntranceElement;
  /** Forwarded to the rendered element — for `as="section"` landmarks that need an accessible name. */
  "aria-label"?: string;
  id?: string;
  "data-testid"?: string;
}

/**
 * Shared "on-scroll entrance" primitive behind every named wrapper in this
 * folder (RevealHeading, FadeUp, SlideInLeft/Right, ScaleReveal) — one
 * reduced-motion-safe implementation instead of duplicating the same
 * useReducedMotion branch and viewport config in each. Plays once
 * (`viewport={{ once: true }}`) and never re-triggers on re-scroll, per the
 * site's "Layered Rise and Reveal" animation spec. Renders a plain,
 * fully-visible element under prefers-reduced-motion, AND — via
 * useHasMounted — for the server-rendered HTML and the first client paint
 * before hydration completes. Without that second check, Motion's
 * `initial="hidden"` would ship as inline `opacity:0` in the raw SSR HTML,
 * invisible to anyone whose JavaScript is slow, blocked or fails; nothing
 * here depends on JS to exist in markup or to be visible, only to animate.
 */
/** Shared tag lookup tables, reused by StaggerContainer/StaggerItem too so every "as" prop in this folder supports the same element set. */
export const motionTags = {
  div: motion.div,
  li: motion.li,
  tr: motion.tr,
  span: motion.span,
  section: motion.section,
  fieldset: motion.fieldset,
} as const;

export const plainTags = {
  div: "div",
  li: "li",
  tr: "tr",
  span: "span",
  section: "section",
  fieldset: "fieldset",
} as const;

export function Entrance({
  children,
  className,
  delay = 0,
  amount = 0.2,
  as = "div",
  variants,
  "aria-label": ariaLabel,
  id,
  "data-testid": dataTestId,
}: EntranceProps & { variants: Variants }) {
  const shouldReduceMotion = useReducedMotion();
  const hasMounted = useHasMounted();

  if (shouldReduceMotion || !hasMounted) {
    const PlainTag = plainTags[as];
    return (
      <PlainTag className={className} aria-label={ariaLabel} id={id} data-testid={dataTestId}>
        {children}
      </PlainTag>
    );
  }

  const MotionTag = motionTags[as];
  return (
    <MotionTag
      className={cn(className)}
      aria-label={ariaLabel}
      id={id}
      data-testid={dataTestId}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={variants}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}
