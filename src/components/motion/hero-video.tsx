"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroVideoProps {
  src: string;
  className?: string;
  /** Positions the pause/play control relative to the nearest positioned ancestor (e.g. the hero section). */
  controlClassName?: string;
}

/**
 * Decorative hero background video. Autoplays muted and loops when motion
 * is welcome, per DESIGN.md 17.1 ("do not use autoplay video with essential
 * audio") and 21.3 (no autoplay sound). Under prefers-reduced-motion it
 * stays paused on its first frame with native controls instead, so the
 * visitor can opt in — DESIGN.md 21.4 requires auto-moving media to stop
 * and all content/controls to remain available. This reduced-motion branch
 * is unchanged from the original implementation.
 *
 * Adds one thing on top of that original behaviour: a small custom
 * pause/play button, rendered only in the autoplay (non-reduced-motion)
 * branch — reduced-motion users already get native controls, so a second
 * control would be redundant. The button is a sibling of `<video>`
 * (a Fragment, not a wrapping div) so it positions via `controlClassName`
 * against whatever relatively-positioned ancestor the caller already has.
 */
export function HeroVideo({ src, className, controlClassName }: HeroVideoProps) {
  const shouldReduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }

  return (
    <>
      <video
        ref={videoRef}
        className={className}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        autoPlay={!shouldReduceMotion}
        controls={Boolean(shouldReduceMotion)}
        aria-hidden={shouldReduceMotion ? undefined : "true"}
        tabIndex={shouldReduceMotion ? undefined : -1}
      />
      {!shouldReduceMotion && (
        <button
          type="button"
          onClick={toggle}
          aria-label={isPlaying ? "Pause background video" : "Play background video"}
          className={cn(
            "grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/40 bg-navy/50 text-white backdrop-blur-sm transition-colors duration-(--duration-fast) hover:bg-navy/70 focus-visible:outline focus-visible:outline-[length:var(--focus-width)] focus-visible:outline-offset-[var(--focus-offset)] focus-visible:outline-gold",
            controlClassName,
          )}
        >
          {isPlaying ? (
            <Pause aria-hidden="true" className="h-4 w-4" />
          ) : (
            <Play aria-hidden="true" className="h-4 w-4 translate-x-px" />
          )}
        </button>
      )}
    </>
  );
}
