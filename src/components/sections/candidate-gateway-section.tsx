import Image from "next/image";
import { Section } from "@/components/layout/section";
import { SectionKicker } from "@/components/ui/section-kicker";
import { LinkButton } from "@/components/ui/link-button";
import { RevealHeading } from "@/components/motion/reveal-heading";
import { FadeUp } from "@/components/motion/fade-up";
import { SlideInRight } from "@/components/motion/slide-in";
import { candidateGateway } from "@/content/home";

/**
 * Candidate gateway: visually distinct but subordinate to the employer
 * proposition, per DESIGN.md 17.9 and CLAUDE.md section 14.
 * `candidateGateway.links` (Search Jobs, Upload Your CV) render as two
 * prominent buttons. Join the Talent Pool and Candidate Resources are
 * deliberately not repeated here — see the doc comment on
 * `candidateGateway` in src/content/home.ts for why that still satisfies
 * CLAUDE.md section 14. Does not imply a candidate portal or account
 * system in phase one.
 */
export function CandidateGatewaySection() {
  const [primaryLink, secondaryLink] = candidateGateway.links;

  return (
    <Section tone="warm" gutter="always">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <RevealHeading>
            <SectionKicker>{candidateGateway.kicker}</SectionKicker>
            <h2 className="mt-4 max-w-lg font-display text-h1 font-bold text-navy">
              {candidateGateway.heading}
            </h2>
          </RevealHeading>
          <FadeUp delay={0.15}>
            <p className="mt-4 max-w-[50ch] text-body-lg text-text-secondary">
              {candidateGateway.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {primaryLink && (
                <LinkButton
                  href={primaryLink.href}
                  variant="primary"
                  surface="light"
                  data-analytics-id={primaryLink.analyticsId}
                >
                  {primaryLink.label}
                </LinkButton>
              )}
              {secondaryLink && (
                <LinkButton
                  href={secondaryLink.href}
                  variant="secondary"
                  surface="light"
                  data-analytics-id={secondaryLink.analyticsId}
                >
                  {secondaryLink.label}
                </LinkButton>
              )}
            </div>
          </FadeUp>
        </div>

        <div className="lg:col-span-6">
          <SlideInRight className="relative aspect-video w-full overflow-hidden rounded-md bg-surface-card">
            <Image
              src="/images/candidates.png"
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </SlideInRight>
        </div>
      </div>
    </Section>
  );
}
