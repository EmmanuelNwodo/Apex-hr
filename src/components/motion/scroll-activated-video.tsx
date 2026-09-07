"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface ScrollActivatedVideoProps {
  src: string;
  className?: string;
}

// Slower than native speed for a calmer, more ambient background feel.
const PLAYBACK_RATE = 0.6;

/**
 * Background video that only starts playing once it scrolls into the
 * viewport — via a native IntersectionObserver calling `play()`/`pause()`
 * directly, rather than the `autoPlay` attribute firing immediately on
 * mount (compare HeroVideo, which autoplays right away). Muted, looped
 * and `playsInline` throughout, and played back at `PLAYBACK_RATE` for a
 * slower, more deliberate motion. Fades in/out with the intersection
 * state (--duration-story) instead of snapping straight to a playing
 * frame, so entering/leaving the viewport reads as a smooth transition.
 * Reduced-motion users get a static first frame that never plays and
 * never fades, per DESIGN.md 21.4.
 */
export function ScrollActivatedVideo({ src, className }: ScrollActivatedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || shouldReduceMotion) return;

    video.playbackRate = PLAYBACK_RATE;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  return (
    <video
      ref={videoRef}
      className={cn(
        className,
        !shouldReduceMotion &&
          cn("opacity-0 transition-opacity duration-(--duration-story) ease-in-out", isVisible && "opacity-100"),
      )}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      controls={Boolean(shouldReduceMotion)}
      aria-hidden={shouldReduceMotion ? undefined : "true"}
      onLoadedMetadata={(event) => {
        event.currentTarget.playbackRate = PLAYBACK_RATE;
      }}
    />
  );
}
