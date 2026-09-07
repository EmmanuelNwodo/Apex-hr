import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionKicker } from "@/components/ui/section-kicker";
import { LinkButton } from "@/components/ui/link-button";
import { routes } from "@/config/routes";
import type { RouteRecord } from "@/types/route";
import type { ServiceItem } from "@/config/services";
import type { ServiceCategoryContent } from "@/content/services-data";

interface ServiceCategoryTemplateProps {
  title: string;
  breadcrumbTrail: RouteRecord[];
  category: ServiceCategoryContent;
  childServices: ServiceItem[];
}

/** Reusable service-family (category) hub template. */
export function ServiceCategoryTemplate({
  title,
  breadcrumbTrail,
  category,
  childServices,
}: ServiceCategoryTemplateProps) {
  return (
    <>
      <Section tone="page">
        <Breadcrumbs trail={breadcrumbTrail} />
        <div className="mt-6 max-w-[var(--container-reading)]">
          <SectionKicker>Service family</SectionKicker>
          <h1 className="mt-3 font-display text-h1 font-bold text-navy">{title}</h1>
          <p className="mt-4 text-lead text-text-secondary">{category.summary}</p>
          <p className="mt-4 text-body-lg text-text-secondary">{category.introduction}</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <LinkButton href={routes.findTalent.path} variant="primary" surface="light">
            {routes.findTalent.label}
          </LinkButton>
          <LinkButton href={routes.services.path} variant="tertiary" surface="light">
            View all services
          </LinkButton>
        </div>
      </Section>

      <Section tone="card">
        <h2 className="font-display text-h3 font-bold text-navy">Services in this family</h2>
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {childServices.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}/`}
                className="group flex items-center justify-between gap-4 border border-border-subtle bg-surface-card p-5 transition-colors duration-[var(--duration-fast)] hover:border-navy"
              >
                <span className="font-semibold text-navy">{service.title}</span>
                <ArrowRight
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-navy transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
