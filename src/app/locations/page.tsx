import Link from "next/link";
import { ArrowDown, ArrowRight, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionKicker } from "@/components/ui/section-kicker";
import { LinkButton } from "@/components/ui/link-button";
import { locations } from "@/config/locations";
import { locationContent } from "@/content/locations-data";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbJsonLd, getCollectionPageJsonLd, toJsonLdScript } from "@/lib/seo/structured-data";
import { routes } from "@/config/routes";

const HUB_DESCRIPTION =
  "Apex HR supports employers with HR and recruitment services across 16 UK locations, including remote and hybrid teams, from its London base.";

export const metadata = buildMetadata({
  title: "Locations We Support",
  description: HUB_DESCRIPTION,
  path: routes.locations.path,
  index: routes.locations.readyToIndex,
});

/**
 * Locations hub — added by explicit later user instruction (see
 * docs/URL-DECISION-REGISTER.md D-013) so the footer's new "Locations"
 * link has a real landing page, rather than the 16 individual
 * /locations/[slug]/ pages sitting with no directory linking them
 * together. Follows the same full-width structure already used for the
 * Services and Sectors hubs (dark hero, directory grid, closing CTA) — no
 * rounded "page shell" card, consistent with every other page on the
 * site. No physical office is claimed for any location (CLAUDE.md section
 * 9) — the copy below only describes remote/on-site support coverage.
 */
export default function LocationsPage() {
  const jsonLd = [
    getCollectionPageJsonLd({
      path: routes.locations.path,
      name: "Locations We Support",
      description: HUB_DESCRIPTION,
      items: locations.map((location) => ({ name: location.title, path: `/locations/${location.slug}/` })),
    }),
    getBreadcrumbJsonLd(routes.home.label, [routes.locations]),
  ];

  return (
    <div className="bg-surface-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLdScript(jsonLd) }}
      />
      <div className="px-5 py-8 sm:px-0 md:py-12">
        <Breadcrumbs trail={[routes.locations]} />
      </div>

      <header className="grid grid-cols-1 overflow-hidden bg-navy lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col justify-center gap-6 p-8 sm:p-10 lg:p-16">
          <SectionKicker tone="dark">Locations</SectionKicker>
          <h1 className="max-w-xl font-display text-display font-bold text-white">
            HR and recruitment support across the UK
          </h1>
          <p className="max-w-lg text-lead text-white/70">
            Apex HR supports employers hiring and managing people across these locations, including
            remote and hybrid teams.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <LinkButton href="#location-directory" variant="primary" surface="dark">
              Browse locations
              <ArrowDown aria-hidden="true" className="h-4 w-4" />
            </LinkButton>
            <LinkButton href={routes.contact.path} variant="secondary" surface="dark">
              Discuss your location
            </LinkButton>
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-center gap-8 border-t border-white/10 p-10 lg:border-t-0 lg:border-l lg:p-14">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="absolute h-72 w-72 rounded-full border border-white/10" />
            <span className="absolute h-44 w-44 rounded-full border border-white/10" />
          </div>

          <div className="relative z-10 flex flex-wrap justify-center gap-3">
            {locations.slice(0, 4).map((location) => (
              <span
                key={location.slug}
                className="inline-flex items-center rounded-full border border-white/15 bg-white/8 px-4 py-2 text-small font-semibold text-white"
              >
                {location.title}
              </span>
            ))}
          </div>

          <div className="relative z-10 rounded-md bg-cream px-10 py-7 text-center shadow-(--shadow-modal)">
            <MapPin aria-hidden="true" className="mx-auto h-7 w-7 text-navy" />
            <p className="mt-1 font-display text-display font-bold text-navy">{locations.length}</p>
            <p className="mt-2 max-w-44 text-small text-text-secondary">
              locations supported by one connected HR partner
            </p>
          </div>
        </div>
      </header>

      <section id="location-directory" className="p-8 sm:p-10 lg:p-14">
        <SectionKicker tone="light">Where we support</SectionKicker>
        <h2 className="mt-4 max-w-2xl font-display text-h1 font-bold text-navy">
          Find HR and recruitment support in your area
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => {
            const content = locationContent.find((entry) => entry.slug === location.slug);
            return (
              <Link
                key={location.slug}
                href={`/locations/${location.slug}/`}
                className="group flex items-center justify-between gap-4 rounded-md border border-border-subtle bg-surface-card p-6 transition-colors duration-(--duration-fast) hover:border-navy"
              >
                <span className="flex items-center gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-success/10 text-success">
                    <MapPin aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-display text-body-lg font-bold text-navy">{location.title}</span>
                    {content && <span className="block text-small text-text-secondary">{content.region}</span>}
                  </span>
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-text-secondary transition-transform group-hover:translate-x-1"
                />
              </Link>
            );
          })}
        </div>
      </section>

      <div className="flex flex-col gap-6 bg-gold p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10 lg:p-14">
        <div>
          <h3 className="font-display text-h2 font-bold text-navy">Don&apos;t see your location?</h3>
          <p className="mt-2 max-w-md text-body text-navy/80">
            Apex HR can support employers beyond this list, including remote and hybrid teams. Tell
            us where you&apos;re based.
          </p>
        </div>
        <LinkButton href={routes.contact.path} variant="primary" surface="light" className="shrink-0">
          Talk to an adviser
        </LinkButton>
      </div>
    </div>
  );
}
