import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionKicker } from "@/components/ui/section-kicker";
import { LinkButton } from "@/components/ui/link-button";
import { HeroVideo } from "@/components/motion/hero-video";
import { TypewriterLoop } from "@/components/motion/typewriter-loop";
import { WorkplaceFactCard } from "@/components/content/workplace-fact-card";
import { hero, workplaceFacts } from "@/content/home";

/**
 * Employer-focused hero, per DESIGN.md 17.1 and CLAUDE.md section 11.
 * The media panel plays the approved brand hero video (muted, looping,
 * per DESIGN.md 19.4/21.4 — see HeroVideo for the reduced-motion
 * behaviour), overlaid by an auto-rotating WorkplaceFactCard in its
 * lower-right corner. The H1 continuously types out, holds, fades and
 * retypes via TypewriterLoop (see that component's doc comment for the
 * timing/accessibility/SEO handling). Not wrapped in a scroll-reveal —
 * the hero must be visible immediately, not delayed by entrance motion.
 */
export function HeroSection() {
  return (
    <section className="border-b border-border-subtle bg-surface-warm">
      <Container
        size="wide"
        className="grid grid-cols-1 items-stretch gap-12 py-16 md:py-20 lg:grid-cols-12 lg:py-28"
      >
        <div className="lg:col-span-6 lg:self-center">
          <SectionKicker>{hero.kicker}</SectionKicker>
          <h1
            className="mt-4 max-w-2xl font-display text-display font-bold text-navy"
            aria-label={hero.heading}
          >
            <TypewriterLoop text={hero.heading} />
          </h1>
          <p className="mt-6 max-w-[45ch] text-lead text-text-secondary">{hero.description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <LinkButton
              href={hero.primaryCta.href}
              variant="primary"
              surface="light"
              data-analytics-id={hero.primaryCta.analyticsId}
            >
              {hero.primaryCta.label}
            </LinkButton>
            <LinkButton
              href={hero.secondaryCta.href}
              variant="secondary"
              surface="light"
              data-analytics-id={hero.secondaryCta.analyticsId}
            >
              {hero.secondaryCta.label}
            </LinkButton>
          </div>
          <p className="mt-6 text-small text-text-secondary">
            Hiring for yourself?{" "}
            <Link
              href={hero.candidateLink.href}
              data-analytics-id={hero.candidateLink.analyticsId}
              className="font-semibold text-navy underline-offset-4 hover:underline"
            >
              {hero.candidateLink.label}
            </Link>
          </p>
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-md bg-surface-warm sm:aspect-3/4 lg:aspect-auto lg:h-full lg:min-h-105 lg:rounded-none">
            <HeroVideo
              src="/videos/apex-hr-hero-video.mp4"
              className="h-full w-full object-cover"
            />
          </div>
          <WorkplaceFactCard facts={workplaceFacts} />
        </div>
      </Container>
    </section>
  );
}
