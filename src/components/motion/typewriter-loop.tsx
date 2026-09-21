"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useHasMounted } from "@/components/motion/use-has-mounted";

interface TypewriterLoopProps {
  text: string;
  charDelayMs?: number;
  startDelayMs?: number;
  holdMs?: number;
  fadeMs?: number;
  className?: string;
}

/**
 * Continuously repeating typewriter heading: wait `startDelayMs`, type
 * `text` one character every `charDelayMs`, hold the complete heading for
 * `holdMs`, fade it out over `fadeMs`, clear it, then type again —
 * forever. Driven by a single chained async sequence (awaited setTimeouts)
 * rather than a fixed setInterval, so the hold only ever starts once
 * typing has actually finished and the next cycle can never start early
 * or overlap the current one. A cancellation flag plus a single tracked
 * timeout id guarantee only one sequence ever runs and every pending
 * timer is cleared on unmount. Reduced-motion users see the complete
 * heading immediately, with the loop disabled entirely.
 *
 * SEO renderability audit remediation: renders the complete, plain `text`
 * (an ordinary, non-`aria-hidden` text node — never only an `aria-label`)
 * for the server-rendered HTML and the very first client paint, exactly
 * like every other entrance-animation primitive in this folder
 * (useHasMounted — see its own doc comment). The typewriter effect is a
 * purely visual enhancement layered on top of real content, never a
 * substitute for it: search engines and no-JS visitors always receive the
 * full heading text. Once mounted, this switches to the animated
 * `aria-hidden` span below and the existing typing cycle proceeds
 * completely unchanged (same clear/type/hold/fade timing); the parent
 * heading's `aria-label` continues to carry the accessible name throughout
 * that animated phase, exactly as before this fix. Reduced-motion users
 * are unaffected — they already saw the complete heading immediately.
 */
export function TypewriterLoop({
  text,
  charDelayMs = 150,
  startDelayMs = 500,
  holdMs = 5000,
  fadeMs = 400,
  className,
}: TypewriterLoopProps) {
  const [visibleText, setVisibleText] = useState("");
  const [isFading, setIsFading] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const hasMounted = useHasMounted();
  const cancelledRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    cancelledRef.current = false;

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        timeoutRef.current = setTimeout(() => {
          timeoutRef.current = null;
          resolve();
        }, ms);
      });

    async function runCycle() {
      await sleep(startDelayMs);

      const chars = Array.from(text);

      while (!cancelledRef.current) {
        setIsFading(false);
        setVisibleText("");

        for (let i = 0; i < chars.length; i += 1) {
          if (cancelledRef.current) return;
          setVisibleText(chars.slice(0, i + 1).join(""));
          if (i < chars.length - 1) {
            await sleep(charDelayMs);
          }
        }

        if (cancelledRef.current) return;
        await sleep(holdMs);

        if (cancelledRef.current) return;
        setIsFading(true);
        await sleep(fadeMs);
      }
    }

    runCycle();

    return () => {
      cancelledRef.current = true;
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [text, charDelayMs, startDelayMs, holdMs, fadeMs, shouldReduceMotion]);

  if (shouldReduceMotion || !hasMounted) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        opacity: isFading ? 0 : 1,
        transition: isFading ? `opacity ${fadeMs}ms ease-in-out` : "none",
      }}
    >
      {visibleText}
    </span>
  );
}
