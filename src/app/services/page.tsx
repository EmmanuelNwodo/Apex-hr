import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionKicker } from "@/components/ui/section-kicker";
import { LinkButton } from "@/components/ui/link-button";
import { serviceCategories, getServicesByCategory } from "@/config/services";
import { serviceCategoryContent } from "@/content/services-data";
import { buildMetadata } from "@/lib/seo/metadata";
import { routes } from "@/config/routes";

export const metadata = buildMetadata({
  title: "HR & Recruitment Services",
  path: routes.services.path,
  index: routes.services.readyToIndex,
});

export default function ServicesPage() {
  return (
    <Section tone="page">
      <Breadcrumbs trail={[routes.services]} />
      <div className="mt-6 max-w-[var(--container-reading)]">
        <SectionKicker>Services</SectionKicker>
        <h1 className="mt-3 font-display text-h1 font-bold text-navy">
          HR, recruitment and people-consulting services
        </h1>
        <p className="mt-4 text-lead text-text-secondary">
          Apex HR&apos;s services span ten families, from day-to-day outsourced
          HR support through to strategic workforce advisory. Explore a
          family below, or get in touch to discuss your specific need.
        </p>
      </div>
      <div className="mt-8">
        <LinkButton href={routes.findTalent.path} variant="primary" surface="light">
          {routes.findTalent.label}
        </LinkButton>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
        {serviceCategories.map((category) => {
          const content = serviceCategoryContent.find((entry) => entry.slug === category.slug);
          return (
            <div key={category.slug} className="border-t border-border-subtle pt-6">
              <h2 className="font-display text-h4 font-bold text-navy">
                <Link href={`/services/${category.slug}/`} className="hover:underline">
                  {category.title}
                </Link>
              </h2>
              {content && <p className="mt-2 text-body text-text-secondary">{content.summary}</p>}
              <ul className="mt-4 flex flex-col gap-2">
                {getServicesByCategory(category.slug).map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}/`}
                      className="text-body text-text-secondary underline-offset-4 hover:text-navy hover:underline"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
