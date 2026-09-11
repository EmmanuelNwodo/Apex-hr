"use client";

import type { ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { motionTags, plainTags, type EntranceElement } from "@/components/motion/entrance";
import { useHasMounted } from "@/components/motion/use-has-mounted";
import {
  staggerContainerVariants,
  staggerItemRiseVariants,
  staggerItemScaleVariants,
} from "@/lib/motion-tokens";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  /**
   * Viewport root margin controlling when the stagger triggers, as a
   * fraction of the *viewport's own* height — see Entrance's doc comment
   * on the same param for why this is margin-based rather than a
   * target-relative amount (a target-relative 20% threshold is
   * unreachable for any grid/list taller than 5x the viewport, a real bug
   * found on this site).
   */
  triggerMargin?: number;
  /** Element to render as, when the default `div` would be invalid in context or a landmark tag is wanted. Defaults to `div`. */
  as?: EntranceElement;
  "aria-label"?: string;
  id?: string;
  "data-testid"?: string;
}

/**
 * Orchestrates a staggered entrance (~0.12s between each child) for a grid
 * or list of cards, logos, footer columns or form fields — wrap the grid/
 * list element itself, then wrap each direct child in StaggerItem. Plays
 * once on scroll-into-view and never re-triggers. Under
 * prefers-reduced-motion, or before React has hydrated on the client
 * (useHasMounted — see its doc comment), both this and StaggerItem render
 * a plain, already-visible wrapper — children never depend on JS to be
 * visible, and are never hidden in the server-rendered HTML.
 */
export function StaggerContainer({
  children,
  className,
  triggerMargin = -0.2,
  as = "div",
  "aria-label": ariaLabel,
  id,
  "data-testid": dataTestId,
}: StaggerContainerProps) {
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
      viewport={{ once: true, margin: `0px 0px ${Math.round(triggerMargin * 100)}% 0px` }}
      variants={staggerContainerVariants}
    >
      {children}
    </MotionTag>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  /** "rise" (default — cards, footer columns, form fields) or "scale" (logos, badges). */
  mode?: "rise" | "scale";
  /** Element to render as, when the default `div` would be invalid in context (e.g. a direct child of `<ul>`). Defaults to `div`. */
  as?: EntranceElement;
}

/**
 * One staggered child of a StaggerContainer. Must be a direct (or
 * variant-forwarding) descendant of StaggerContainer to inherit its
 * "hidden"/"show" timing — it intentionally sets no `initial`/`animate` of
 * its own under normal motion, relying on Motion's variant propagation
 * from the nearest ancestor. Independently reduced-motion-safe: renders a
 * plain div itself if the container above it already bailed out, or if
 * this is somehow used without one.
 */
export function StaggerItem({ children, className, mode = "rise", as = "div" }: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();
  const hasMounted = useHasMounted();

  if (shouldReduceMotion || !hasMounted) {
    const PlainTag = plainTags[as];
    return <PlainTag className={className}>{children}</PlainTag>;
  }

  const MotionTag = motionTags[as];
  return (
    <MotionTag className={cn(className)} variants={mode === "scale" ? staggerItemScaleVariants : staggerItemRiseVariants}>
      {children}
    </MotionTag>
  );
}
