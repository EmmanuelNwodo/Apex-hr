import Link from "next/link";
import { Section } from "@/components/layout/section";
import { SectionKicker } from "@/components/ui/section-kicker";
import { LinkButton } from "@/components/ui/link-button";
import { Reveal } from "@/components/motion/reveal";
import { recruitmentSpotlight } from "@/content/home";

/** Recruitment gets its own chapter and CTA, per DESIGN.md 17.5. */
export function RecruitmentSpotlightSection() {
  return (
    <Section tone="warm" gutter="always">
      <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <SectionKicker>{recruitmentSpotlight.kicker}</SectionKicker>
          <h2 className="mt-3 font-display text-h2 font-bold text-navy">
            {recruitmentSpotlight.heading}
          </h2>
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
        </div>
        <ul className="grid grid-cols-1 gap-3 lg:col-span-6">
          {recruitmentSpotlight.features.map((service) => (
            <li key={service.href}>
              <Link
                href={service.href}
                className="block border border-border-strong bg-surface-card p-5 text-body font-semibold text-navy underline-offset-4 hover:underline"
              >
                {service.title}
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
