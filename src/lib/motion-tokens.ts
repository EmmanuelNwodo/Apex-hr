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

/**
 * "Layered Rise and Reveal" on-scroll entrance system (site-wide, see
 * src/components/motion/*.tsx). One shared timing language across every
 * variant below: a premium, slightly overshooting ease, a ~0.9s settle and
 * a ~0.12s stagger interval, so unrelated sections still read as one
 * consistent motion system rather than several unrelated effects.
 */
export const premiumEase = [0.22, 1, 0.36, 1] as const;
export const revealDuration = 0.9;
export const staggerInterval = 0.12;

/** Section headings: the most pronounced rise (50-60px). */
export const headingRiseVariants = {
  hidden: { opacity: 0, y: 56 },
  show: { opacity: 1, y: 0, transition: { duration: revealDuration, ease: premiumEase } },
};

/** Whole-section wrapper (AnimatedSection): a moderate rise, between a heading's and a paragraph's. */
export const sectionRiseVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: revealDuration, ease: premiumEase } },
};

/** Supporting paragraphs/body content: a lighter rise (25-35px) than headings. */
export const paragraphRiseVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: revealDuration, ease: premiumEase } },
};

/** Images slotted on the right side of a layout: slide in from the right while scaling up. */
export const slideInRightVariants = {
  hidden: { opacity: 0, x: 48, scale: 0.92 },
  show: { opacity: 1, x: 0, scale: 1, transition: { duration: revealDuration, ease: premiumEase } },
};

/** Images slotted on the left side of a layout: slide in from the left while scaling up. */
export const slideInLeftVariants = {
  hidden: { opacity: 0, x: -48, scale: 0.92 },
  show: { opacity: 1, x: 0, scale: 1, transition: { duration: revealDuration, ease: premiumEase } },
};

/** Stats, logos and small badges: fade in while scaling up from a slight shrink. */
export const scaleRevealVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: revealDuration, ease: premiumEase } },
};

/** A staggered group's own container — carries no visual change itself, only orchestrates its children's timing. */
export const staggerContainerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: staggerInterval, delayChildren: 0.05 } },
};

/** Default staggered child: rises and fades in, per card/footer-column/form-field use. */
export const staggerItemRiseVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: revealDuration, ease: premiumEase } },
};

/** Staggered child variant for logos/badges: fades and scales rather than rising. */
export const staggerItemScaleVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: revealDuration, ease: premiumEase } },
};
