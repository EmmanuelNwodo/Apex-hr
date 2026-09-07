import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionKicker } from "@/components/ui/section-kicker";
import { SectionHeading } from "@/components/ui/section-heading";
import { LinkButton } from "@/components/ui/link-button";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { routes } from "@/config/routes";
import type { RouteRecord } from "@/types/route";
import type { SectorContent } from "@/content/sectors-data";
import { getService } from "@/config/services";
import { talentRoleContent } from "@/content/talent-roles-data";

interface SectorPageTemplateProps {
  title: string;
  breadcrumbTrail: RouteRecord[];
  sector: SectorContent;
}

/** Reusable sector page template. */
export function SectorPageTemplate({ title, breadcrumbTrail, sector }: SectorPageTemplateProps) {
  const relatedServices = sector.relatedServiceSlugs
    .map((slug) => getService(slug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const relatedRoles = talentRoleContent.filter((role) =>
    role.relatedSectorSlugs.includes(sector.slug),
  );

  return (
    <>
      <Section tone="page">
        <Breadcrumbs trail={breadcrumbTrail} />
        <div className="mt-6 max-w-[var(--container-reading)]">
          <SectionKicker>Sector</SectionKicker>
          <h1 className="mt-3 font-display text-h1 font-bold text-navy">{title}</h1>
          <p className="mt-4 text-lead text-text-secondary">{sector.overview}</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <LinkButton href={routes.findTalent.path} variant="primary" surface="light">
            {routes.findTalent.label}
          </LinkButton>
          <LinkButton href={routes.contact.path} variant="secondary" surface="light">
            Discuss your needs
          </LinkButton>
        </div>
      </Section>

      <Section tone="card" containerSize="reading">
        <SectionHeading title="Common workforce and people challenges" />
        <ul className="mt-6 flex flex-col gap-3">
          {sector.challenges.map((challenge) => (
            <li key={challenge} className="flex items-start gap-3 text-body text-text-primary">
              <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-gold-ink" />
              {challenge}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="page" containerSize="reading">
        <SectionHeading title="Recruitment considerations" />
        <p className="mt-4 text-body-lg text-text-secondary">{sector.recruitmentConsiderations}</p>
      </Section>

      <Section tone="card" containerSize="reading">
        <SectionHeading title="How Apex HR can help" />
        <p className="mt-4 text-body-lg text-text-secondary">{sector.howApexHelps}</p>
      </Section>

      {(relatedServices.length > 0 || relatedRoles.length > 0) && (
        <Section tone="page">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {relatedServices.length > 0 && (
              <div>
                <SectionHeading title="Relevant HR services" as="h3" />
                <ul className="mt-4 flex flex-col gap-2">
                  {relatedServices.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}/`}
                        className="text-body font-semibold text-navy underline-offset-4 hover:underline"
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {relatedRoles.length > 0 && (
              <div>
                <SectionHeading title="Relevant talent needs" as="h3" />
                <ul className="mt-4 flex flex-col gap-2">
                  {relatedRoles.slice(0, 6).map((role) => (
                    <li key={role.slug}>
                      <Link
                        href={`/talent-acquisition/${role.slug}/`}
                        className="text-body font-semibold text-navy underline-offset-4 hover:underline"
                      >
                        {role.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Section>
      )}

      <Section tone="card" containerSize="reading">
        <SectionHeading title="Frequently asked questions" />
        <div className="mt-8">
          <FaqAccordion items={sector.faqs} />
        </div>
      </Section>

      <Section tone="dark" className="text-center">
        <h2 className="mx-auto max-w-2xl font-display text-h2 font-bold text-white">
          Ready to talk about hiring or HR support in {title.toLowerCase()}?
        </h2>
        <LinkButton
          href={routes.findTalent.path}
          variant="primary"
          surface="dark"
          className="mt-8"
          data-analytics-id={`sector-cta-${sector.slug}`}
        >
          {routes.findTalent.label}
        </LinkButton>
      </Section>
    </>
  );
}
