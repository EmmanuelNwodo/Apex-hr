import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionKicker } from "@/components/ui/section-kicker";
import { SectionHeading } from "@/components/ui/section-heading";
import { LinkButton } from "@/components/ui/link-button";
import { FaqWithContactForm } from "@/components/content/faq-with-contact-form";
import { RevealHeading } from "@/components/motion/reveal-heading";
import { FadeUp } from "@/components/motion/fade-up";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { routes } from "@/config/routes";
import type { RouteRecord } from "@/types/route";
import type { TalentRoleContent } from "@/content/talent-roles-data";
import { getService } from "@/config/services";
import { getSector } from "@/config/sectors";

interface TalentRoleTemplateProps {
  breadcrumbTrail: RouteRecord[];
  role: TalentRoleContent;
}

/**
 * Reusable talent-acquisition-by-role page template. Does not claim
 * candidate availability, salary data or placement timescales, and does
 * not present general guidance as regulated career advice, per this
 * phase's talent-acquisition rules.
 *
 * Every section uses the site-wide "Layered Rise and Reveal" on-scroll
 * entrance system (src/components/motion/*): headings rise via
 * RevealHeading, supporting copy via FadeUp, and lists stagger
 * individually via StaggerContainer/StaggerItem. Nothing here changes
 * layout, copy, colour or functionality — only how each block enters as a
 * visitor scrolls to it.
 */
export function TalentRoleTemplate({ breadcrumbTrail, role }: TalentRoleTemplateProps) {
  const relatedServices = role.relatedServiceSlugs
    .map((slug) => getService(slug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const relatedSectors = role.relatedSectorSlugs
    .map((slug) => getSector(slug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  return (
    <>
      <Section tone="page">
        <Breadcrumbs trail={breadcrumbTrail} />
        <RevealHeading className="mt-6 max-w-(--container-reading)">
          <SectionKicker>{role.roleFamily}</SectionKicker>
          <h1 className="mt-3 font-display text-h1 font-bold text-navy">{role.title}</h1>
          <p className="mt-4 text-lead text-text-secondary">{role.overview}</p>
        </RevealHeading>
        <FadeUp delay={0.15} className="mt-8 flex flex-wrap gap-4">
          <LinkButton href={routes.findTalent.path} variant="primary" surface="light">
            {routes.findTalent.label}
          </LinkButton>
        </FadeUp>
      </Section>

      <Section tone="card">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <RevealHeading>
              <SectionHeading title="Typical hiring challenges" as="h3" />
            </RevealHeading>
            <StaggerContainer>
              <ul className="mt-4 flex flex-col gap-2">
                {role.hiringChallenges.map((item) => (
                  <StaggerItem key={item} as="li" className="text-body text-text-secondary">
                    {item}
                  </StaggerItem>
                ))}
              </ul>
            </StaggerContainer>
          </div>
          <div>
            <RevealHeading>
              <SectionHeading title="Skills and capabilities commonly sought" as="h3" />
            </RevealHeading>
            <StaggerContainer>
              <ul className="mt-4 flex flex-col gap-2">
                {role.skillsSought.map((item) => (
                  <StaggerItem key={item} as="li" className="text-body text-text-secondary">
                    {item}
                  </StaggerItem>
                ))}
              </ul>
            </StaggerContainer>
          </div>
        </div>
      </Section>

      <Section tone="page">
        <RevealHeading>
          <SectionHeading title="Recruitment approach" />
        </RevealHeading>
        <FadeUp delay={0.15}>
          <p className="mt-4 text-body-lg text-text-secondary">{role.recruitmentApproach}</p>
        </FadeUp>
      </Section>

      {(relatedSectors.length > 0 || relatedServices.length > 0) && (
        <Section tone="card">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {relatedSectors.length > 0 && (
              <div>
                <RevealHeading>
                  <SectionHeading title="Relevant sectors" as="h3" />
                </RevealHeading>
                <StaggerContainer>
                  <ul className="mt-4 flex flex-col gap-2">
                    {relatedSectors.map((sector) => (
                      <StaggerItem key={sector.slug} as="li">
                        <Link
                          href={`/sector/${sector.slug}/`}
                          className="text-body font-semibold text-navy underline-offset-4 hover:underline"
                        >
                          {sector.title}
                        </Link>
                      </StaggerItem>
                    ))}
                  </ul>
                </StaggerContainer>
              </div>
            )}
            {relatedServices.length > 0 && (
              <div>
                <RevealHeading>
                  <SectionHeading title="Related recruitment services" as="h3" />
                </RevealHeading>
                <StaggerContainer>
                  <ul className="mt-4 flex flex-col gap-2">
                    {relatedServices.map((service) => (
                      <StaggerItem key={service.slug} as="li">
                        <Link
                          href={`/services/${service.slug}/`}
                          className="text-body font-semibold text-navy underline-offset-4 hover:underline"
                        >
                          {service.title}
                        </Link>
                      </StaggerItem>
                    ))}
                  </ul>
                </StaggerContainer>
              </div>
            )}
          </div>
        </Section>
      )}

      <Section tone="page">
        <RevealHeading>
          <SectionHeading title="Frequently asked questions" />
        </RevealHeading>
        <div className="mt-8">
          <FaqWithContactForm items={role.faqs} />
        </div>
      </Section>

      <Section tone="dark" className="text-center">
        <RevealHeading>
          <h2 className="mx-auto max-w-2xl font-display text-h2 font-bold text-white">
            Hiring for a {role.title.toLowerCase()} role?
          </h2>
        </RevealHeading>
        <FadeUp delay={0.15}>
          <LinkButton
            href={routes.findTalent.path}
            variant="primary"
            surface="dark"
            className="mt-8"
            data-analytics-id={`talent-role-cta-${role.slug}`}
          >
            {routes.findTalent.label}
          </LinkButton>
        </FadeUp>
      </Section>
    </>
  );
}
