import { Section } from "@/components/layout/section";
import { EmployerChallengeNavigator } from "@/components/content/employer-challenge-navigator";
import { AnimatedSection } from "@/components/motion/animated-section";
import { employerProblems } from "@/content/home";

interface EmployerProblemsSectionProps {
  /**
   * When true, renders with a transparent background instead of its own
   * solid navy fallback — used when a shared SectionVideoBackground in an
   * ancestor wrapper (see page.tsx) already supplies the video/scrim
   * behind this section and NeedSelectorSection together, so the two
   * sections read as one continuous video rather than two separate clips.
   */
  transparent?: boolean;
}

/**
 * Employer problems section per DESIGN.md 17.4 and CLAUDE.md section 11.
 * The heading and interactive problem/solution navigator both live inside
 * EmployerChallengeNavigator's single cream "shell" card (per the approved
 * reference layout), which floats over this section's own dark surface —
 * its own navy fallback by default, or the shared background video when
 * `transparent` (see page.tsx) — so the video stays visible in the
 * surrounding padding while the shell itself keeps guaranteed contrast.
 * Uses the default `gutter="auto"` (no side margin from `sm` up) rather
 * than `gutter="always"`, per later explicit user instruction removing
 * this section's side margin.
 */
export function EmployerProblemsSection({ transparent = false }: EmployerProblemsSectionProps) {
  return (
    <Section tone="dark" className={transparent ? "bg-transparent" : undefined}>
      <AnimatedSection>
        <EmployerChallengeNavigator problems={employerProblems} />
      </AnimatedSection>
    </Section>
  );
}
