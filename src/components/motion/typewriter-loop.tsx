"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

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
 * Mark this span `aria-hidden` and put the plain string in an
 * `aria-label` on the parent heading: the visible text is blank for part
 * of every cycle (mid-clear, mid-fade), so the accessible name must not
 * depend on it.
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

  if (shouldReduceMotion) {
    return (
      <span aria-hidden="true" className={className}>
        {text}
      </span>
    );
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
