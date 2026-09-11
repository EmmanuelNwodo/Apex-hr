import Link from "next/link";
import { Section } from "@/components/layout/section";
import { SectionKicker } from "@/components/ui/section-kicker";
import { LinkButton } from "@/components/ui/link-button";
import { RevealHeading } from "@/components/motion/reveal-heading";
import { FadeUp } from "@/components/motion/fade-up";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { recruitmentSpotlight } from "@/content/home";

/** Recruitment gets its own chapter and CTA, per DESIGN.md 17.5. */
export function RecruitmentSpotlightSection() {
  return (
    <Section tone="warm" gutter="always">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <RevealHeading>
            <SectionKicker>{recruitmentSpotlight.kicker}</SectionKicker>
            <h2 className="mt-3 font-display text-h2 font-bold text-navy">
              {recruitmentSpotlight.heading}
            </h2>
          </RevealHeading>
          <FadeUp delay={0.15}>
            <p className="mt-4 max-w-[50ch] text-body-lg text-text-secondary">
              {recruitmentSpotlight.description}
            </p>
            <LinkButton
              href={recruitmentSpotlight.cta.href}
              variant="primary"
              surface="light"
              className="mt-8"
              data-analytics-id={recruitmentSpotlight.cta.analyticsId}
            >
              {recruitmentSpotlight.cta.label}
            </LinkButton>
          </FadeUp>
        </div>
        <StaggerContainer className="lg:col-span-6">
          <ul className="grid grid-cols-1 gap-3">
            {recruitmentSpotlight.features.map((service) => (
              <StaggerItem key={service.href} as="li">
                <Link
                  href={service.href}
                  className="block border border-border-strong bg-surface-card p-5 text-body font-semibold text-navy underline-offset-4 hover:underline"
                >
                  {service.title}
                </Link>
              </StaggerItem>
            ))}
          </ul>
        </StaggerContainer>
      </div>
    </Section>
  );
}
