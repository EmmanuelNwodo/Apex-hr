/**
 * Motion timing values for use with the `motion` library.
 * Mirrors DESIGN.md section 21.1-21.2. Durations are expressed in seconds
 * (the CSS tokens in src/styles/tokens.css use milliseconds for CSS transitions).
 */

export const duration = {
  instant: 0.1,
  fast: 0.16,
  base: 0.24,
  slow: 0.36,
  story: 0.6,
} as const;

export const ease = {
  standard: [0.2, 0, 0, 1] as const,
  enter: [0, 0, 0.2, 1] as const,
  exit: [0.4, 0, 1, 1] as const,
};

/** Opacity + restrained upward translation reveal, per DESIGN.md 21.2. */
export const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: duration.story, ease: ease.enter },
};
