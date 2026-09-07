import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionKicker } from "@/components/ui/section-kicker";
import { LinkButton } from "@/components/ui/link-button";
import { Reveal } from "@/components/motion/reveal";
import { CategoryServiceExplorer } from "@/components/content/category-service-explorer";
import { serviceCategoryIcons } from "@/lib/service-category-icons";
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

/**
 * Service-family (category) page template, per the approved reference
 * layout: a dark hero with a decorative "system" visual, an anchor bar,
 * a problem section (three per-family challenges), an interactive
 * service picker scoped to this family's own children (see
 * CategoryServiceExplorer), a three-step "how we work" outline specific
 * to this family, and a closing CTA — all inside one rounded cream page
 * shell, matching the pattern already used for the services and sectors
 * hubs. The hero's decorative visual uses real data (this family's own
 * child-service names and count) rather than fabricated example labels.
 */
export function ServiceCategoryTemplate({
  title,
  breadcrumbTrail,
  category,
  childServices,
}: ServiceCategoryTemplateProps) {
  const Icon = serviceCategoryIcons[category.slug];

  return (
    <div className="bg-surface-page py-8 md:py-12">
      <Container size="wide">
        <div className="overflow-hidden rounded-md bg-cream shadow-(--shadow-modal)">
          <header className="grid grid-cols-1 overflow-hidden bg-navy lg:grid-cols-[1.08fr_0.92fr]">
            <div className="flex flex-col justify-center gap-6 p-8 sm:p-10 lg:p-16">
              <Breadcrumbs trail={breadcrumbTrail} tone="dark" />
              <div>
                <SectionKicker tone="dark">Service family</SectionKicker>
                <h1 className="mt-4 max-w-xl font-display text-display font-bold text-white">
                  {category.tagline}
                </h1>
              </div>
              <p className="max-w-lg text-lead text-white/70">{category.summary}</p>
              <div className="flex flex-wrap items-center gap-4">
                <LinkButton href={routes.contact.path} variant="primary" surface="dark">
                  Discuss your needs
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </LinkButton>
                <LinkButton href="#services-in-family" variant="secondary" surface="dark">
                  Explore this service family
                </LinkButton>
              </div>
            </div>

            <div className="relative flex flex-col items-center justify-center gap-8 border-t border-white/10 p-10 lg:border-t-0 lg:border-l lg:p-14">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="absolute h-72 w-72 rounded-full border border-white/10" />
                <span className="absolute h-44 w-44 rounded-full border border-white/10" />
              </div>

              <div className="relative z-10 flex flex-wrap justify-center gap-3">
                {childServices.slice(0, 4).map((service) => (
                  <span
                    key={service.slug}
                    className="inline-flex items-center rounded-full border border-white/15 bg-white/8 px-4 py-2 text-small font-semibold text-white"
                  >
                    {service.title}
                  </span>
                ))}
              </div>

              <div className="relative z-10 flex flex-col items-center gap-2 rounded-md bg-cream px-10 py-7 text-center shadow-(--shadow-modal)">
                {Icon && <Icon aria-hidden="true" className="h-7 w-7 text-navy" />}
                <p className="mt-1 font-display text-display font-bold text-navy">{childServices.length}</p>
                <p className="max-w-44 text-small text-text-secondary">
                  connected services in this family
                </p>
              </div>
            </div>
          </header>

          <div className="flex flex-col gap-3 border-b border-border-subtle bg-surface-card px-8 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-14">
            <nav aria-label="On this page" className="flex flex-wrap items-center gap-5">
              <a href="#overview" className="text-caption font-bold text-text-secondary hover:text-navy">
                Overview
              </a>
              <a href="#services-in-family" className="text-caption font-bold text-text-secondary hover:text-navy">
                Services
              </a>
              <a href="#approach" className="text-caption font-bold text-text-secondary hover:text-navy">
                Our approach
              </a>
              <a href={routes.contact.path} className="text-caption font-bold text-text-secondary hover:text-navy">
                Talk to us
              </a>
            </nav>
            <span className="text-caption font-bold text-success">Practical support. Clear outcomes.</span>
          </div>

          <section
            id="overview"
            className="grid grid-cols-1 gap-10 p-8 sm:p-10 lg:grid-cols-[0.82fr_1.18fr] lg:p-14"
          >
            <div>
              <SectionKicker tone="light">Where we help</SectionKicker>
              <h2 className="mt-4 max-w-md font-display text-h1 font-bold text-navy">
                {title}
              </h2>
              <p className="mt-4 max-w-md text-body text-text-secondary">{category.introduction}</p>
            </div>
            <div className="flex flex-col">
              {category.challenges.map((challenge, index) => (
                <div
                  key={challenge.title}
                  className="grid grid-cols-[auto_1fr] gap-4 border-b border-border-subtle py-6 first:border-t"
                >
                  <span className="font-display text-body-lg text-gold-ink">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-h4 font-bold text-navy">{challenge.title}</h3>
                    <p className="mt-1 text-body text-text-secondary">{challenge.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="services-in-family" className="bg-navy px-8 py-16 sm:px-10 lg:px-14 lg:py-20">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-end lg:gap-14">
              <div>
                <SectionKicker tone="dark">Services in this family</SectionKicker>
                <h2 className="mt-4 max-w-md font-display text-h1 font-bold text-white">
                  Choose the support your organisation needs
                </h2>
              </div>
              <p className="text-body text-white/70">
                Select a service to see how Apex HR can turn this into a clear, practical
                programme of work.
              </p>
            </div>

            <Reveal className="mt-10">
              <CategoryServiceExplorer categorySlug={category.slug} services={childServices} />
            </Reveal>
          </section>

          <section id="approach" className="grid grid-cols-1 gap-10 bg-surface-card p-8 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:p-14">
            <div>
              <SectionKicker tone="light">How we work</SectionKicker>
              <h2 className="mt-4 max-w-md font-display text-h1 font-bold text-navy">
                Structured enough to guide, flexible enough to fit
              </h2>
              <p className="mt-4 max-w-md text-body text-text-secondary">
                Every engagement is shaped around your organisation&apos;s context, pace and
                internal capability.
              </p>
            </div>
            <div className="flex flex-col">
              {category.approach.map((step, index) => (
                <div
                  key={step.title}
                  className="grid grid-cols-[auto_1fr] gap-4 border-b border-border-subtle py-6 first:border-t"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-success/10 text-success">
                    <span className="font-display text-body-lg">{index + 1}</span>
                  </span>
                  <div>
                    <h3 className="font-display text-h4 font-bold text-navy">{step.title}</h3>
                    <p className="mt-1 text-body text-text-secondary">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="mx-4 mb-4 mt-4 flex flex-col gap-6 rounded-md bg-gold p-8 sm:mx-6 sm:mb-6 sm:mt-6 sm:flex-row sm:items-center sm:justify-between lg:mx-8 lg:mb-8 lg:mt-8 lg:p-12">
            <div>
              <h3 className="font-display text-h2 font-bold text-navy">
                Ready to talk about {title.toLowerCase()}?
              </h3>
              <p className="mt-2 max-w-md text-body text-navy/80">
                Tell us what&apos;s happening in your organisation, and we&apos;ll help you find
                the right way in.
              </p>
            </div>
            <LinkButton href={routes.contact.path} variant="primary" surface="light" className="shrink-0">
              Start a conversation
            </LinkButton>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          <LinkButton href={routes.findTalent.path} variant="primary" surface="light">
            {routes.findTalent.label}
          </LinkButton>
          <LinkButton href={routes.services.path} variant="tertiary" surface="light">
            View all services
          </LinkButton>
        </div>
      </Container>
    </div>
  );
}
