import Link from "next/link";
import { ArrowUpRight, CheckCircle2, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionKicker } from "@/components/ui/section-kicker";
import { LinkButton } from "@/components/ui/link-button";
import { FaqWithContactForm } from "@/components/content/faq-with-contact-form";
import { routes } from "@/config/routes";
import type { RouteRecord } from "@/types/route";
import type { ContentFaqItem } from "@/types/content";

interface ServiceLocationTemplateProps {
  breadcrumbTrail: RouteRecord[];
  /** e.g. "Permanent Recruitment" or "Recruitment & Talent Acquisition" */
  entityTitle: string;
  /** The real service or category page this combination page supports, e.g. "/services/permanent-recruitment/" */
  entityHref: string;
  /** service.heroSummary or category.summary — real, unmodified per-entity copy. */
  entitySummary: string;
  bulletListTitle: string;
  bulletList: string[];
  locationTitle: string;
  locationRegion: string;
  /** The real individual location page this combination page supports, e.g. "/locations/london/" — links here specifically (not just the /locations/ hub) so it owns the broader "HR support in {location}" intent this combo page does not compete for. */
  locationHref: string;
  /** location.localContext or location.coverageStatement — real, unmodified per-location copy. */
  localContext: string;
  faqs: ContentFaqItem[];
}

/**
 * Curated service/category + location combination page template — see
 * docs/URL-DECISION-REGISTER.md D-014 and src/config/service-locations.ts
 * for which combinations exist and why. Every page combines two genuinely
 * distinct, already-authored data sources (the service/category's own
 * content and the location's own regional context) rather than swapping a
 * city name into an otherwise identical template, per CLAUDE.md section 9's
 * requirement that a service-location page have "unique and useful
 * location context." No physical office or verified local presence is
 * claimed (CLAUDE.md section 9) — coverage is described as remote/on-site
 * support, matching every individual location page.
 */
export function ServiceLocationTemplate({
  breadcrumbTrail,
  entityTitle,
  entityHref,
  entitySummary,
  bulletListTitle,
  bulletList,
  locationTitle,
  locationRegion,
  locationHref,
  localContext,
  faqs,
}: ServiceLocationTemplateProps) {
  return (
    <div className="bg-surface-page">
      <header className="grid grid-cols-1 overflow-hidden bg-navy lg:grid-cols-[1.08fr_0.92fr]">
        <div className="flex flex-col justify-center gap-6 p-8 sm:p-10 lg:p-16">
          <Breadcrumbs trail={breadcrumbTrail} tone="dark" />
          <div>
            <SectionKicker tone="dark">{locationTitle}</SectionKicker>
            <h1 className="mt-4 max-w-xl font-display text-display font-bold text-white">
              {entityTitle} Firm in {locationTitle}
            </h1>
          </div>
          <p className="max-w-lg text-lead text-white/70">{entitySummary}</p>
          <div className="flex flex-wrap items-center gap-4">
            <LinkButton href={routes.contact.path} variant="primary" surface="dark">
              Discuss your needs
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </LinkButton>
            <LinkButton href={entityHref} variant="secondary" surface="dark">
              {`Explore ${entityTitle}`}
            </LinkButton>
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-center gap-8 border-t border-white/10 p-10 lg:border-t-0 lg:border-l lg:p-14">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="absolute h-72 w-72 rounded-full border border-white/10" />
            <span className="absolute h-44 w-44 rounded-full border border-white/10" />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-2 rounded-md bg-cream px-10 py-7 text-center shadow-(--shadow-modal)">
            <MapPin aria-hidden="true" className="h-7 w-7 text-navy" />
            <p className="mt-1 max-w-52 font-display text-h4 font-bold text-navy">{locationRegion}</p>
            <p className="max-w-52 text-small text-text-secondary">
              Remote and on-site support, no local office claimed
            </p>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-10 p-8 sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:p-14">
        <div>
          <SectionKicker tone="light">Local context</SectionKicker>
          <h2 className="mt-4 max-w-lg font-display text-h1 font-bold text-navy">
            {locationTitle}&apos;s people market
          </h2>
          <p className="mt-4 max-w-lg text-body-lg text-text-secondary">{localContext}</p>
          <Link
            href={locationHref}
            className="mt-4 inline-flex w-fit items-center gap-2 text-caption font-bold uppercase tracking-widest text-gold-ink underline-offset-4 hover:underline"
          >
            {`See all HR and recruitment support in ${locationTitle}`}
          </Link>
        </div>

        <aside className="rounded-md bg-surface-card p-8">
          <SectionKicker tone="light">{bulletListTitle}</SectionKicker>
          <ul className="mt-5 flex flex-col gap-3">
            {bulletList.map((item) => (
              <li key={item} className="flex items-start gap-3 text-body text-text-primary">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-gold-ink" />
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      {faqs.length > 0 && (
        <section className="bg-surface-card p-8 sm:p-10 lg:p-14">
          <SectionKicker tone="light">Frequently asked questions</SectionKicker>
          <h2 className="mt-4 max-w-2xl font-display text-h2 font-bold text-navy">
            Questions about {entityTitle.toLowerCase()} in {locationTitle}
          </h2>
          <div className="mt-10">
            {/* No FAQPage schema on these curated combination pages —
                SEO audit Batch 2 item 3 explicitly excludes them pending
                the separate location-resolution decision table. */}
            <FaqWithContactForm items={faqs} includeSchema={false} />
          </div>
        </section>
      )}

      <div className="flex flex-col gap-6 bg-gold p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10 lg:p-14">
        <div>
          <h3 className="font-display text-h2 font-bold text-navy">
            Ready to talk about {entityTitle.toLowerCase()} in {locationTitle}?
          </h3>
          <p className="mt-2 max-w-md text-body text-navy/80">
            Tell us what&apos;s happening in your organisation, and we&apos;ll help you find the
            right way in.
          </p>
        </div>
        <LinkButton href={routes.contact.path} variant="primary" surface="light" className="shrink-0">
          Start a conversation
        </LinkButton>
      </div>

      <div className="flex flex-wrap gap-4 bg-surface-page px-8 py-10 sm:px-10 lg:px-14">
        <Link
          href={routes.locations.path}
          className="text-body font-semibold text-navy underline-offset-4 hover:underline"
        >
          View all locations
        </Link>
        <Link
          href={routes.services.path}
          className="text-body font-semibold text-navy underline-offset-4 hover:underline"
        >
          View all services
        </Link>
      </div>
    </div>
  );
}
