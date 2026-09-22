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
 *
 * SEO renderability audit remediation: `count`'s own initial value is the
 * real target (never `0`), which is what server-rendered HTML and the
 * first client paint show — no `useHasMounted`-gated branch swapping the
 * element between a plain `<span>` and `<motion.span>` is needed here
 * (unlike Entrance/TypewriterLoop) precisely because a MotionValue's
 * initial value already renders correctly on the server on its own.
 *
 * Regression fix: an earlier version of this fix DID add that branch, and
 * it broke the count-up animation everywhere, permanently: Framer's
 * `useInView` (node_modules/framer-motion/.../use-in-view.mjs) attaches
 * its IntersectionObserver in an effect keyed only on the *stable* `ref`
 * object, so it runs exactly once, on first mount, watching whatever DOM
 * node `ref.current` pointed to at that moment. Swapping `<span>` for
 * `<motion.span>` once `hasMounted` flipped true is a different element
 * type at the same tree position, so React unmounts the original node and
 * mounts a new one — but the observer never re-attaches to it (its own
 * effect dependencies never changed), so `isInView` could never again
 * reflect the real, currently-rendered element's viewport status. The
 * `animate()` call was consequently never reached, leaving every counter
 * stuck at the `0` the reset effect had already set. Rendering the SAME
 * `<motion.span>` unconditionally (whenever `isNumeric`) keeps the ref's
 * DOM node identity stable for the component's entire lifetime, so
 * `useInView` observes the real element throughout and the viewport
 * trigger fires reliably.
 */
export function AnimatedStatValue({ value, className }: AnimatedStatValueProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();
  const target = Number(value);
  const isNumeric = !Number.isNaN(target);

  const count = useMotionValue(target);
  const rounded = useTransform(count, (latest) => Math.round(latest).toString());

  useEffect(() => {
    // Reset-and-animate only once the element is actually in view (rather
    // than resetting to 0 as soon as the component mounts, off-screen or
    // not): this is what keeps the server-correct target value visible
    // right through hydration, with the 0 -> target animation happening
    // exactly at the moment a visitor scrolls the stat into view, never
    // before. `once: true` means `isInView` only ever transitions
    // false -> true, so this effect's body runs at most once per mount.
    if (!isNumeric || shouldReduceMotion || !isInView) return;

    count.set(0);
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
