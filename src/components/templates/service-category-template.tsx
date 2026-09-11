import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionKicker } from "@/components/ui/section-kicker";
import { LinkButton } from "@/components/ui/link-button";
import { AnimatedSection } from "@/components/motion/animated-section";
import { RevealHeading } from "@/components/motion/reveal-heading";
import { FadeUp } from "@/components/motion/fade-up";
import { SlideInRight } from "@/components/motion/slide-in";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { CategoryServiceExplorer } from "@/components/content/category-service-explorer";
import { FaqWithContactForm } from "@/components/content/faq-with-contact-form";
import { serviceCategoryIcons } from "@/lib/service-category-icons";
import { getServiceCategory } from "@/config/services";
import { serviceContent } from "@/content/services-data";
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
 * a problem section (three per-family challenges), a crawlable grid of
 * every child service (real summaries/links, always in the server-rendered
 * HTML) plus the interactive service picker as a richer companion view
 * (see CategoryServiceExplorer — kept, not replaced: its own children are
 * JS-driven and only the active one is linked, so the static grid is what
 * satisfies "every child service must have a real, crawlable link" per
 * CLAUDE.md section 16's "do not rely on client-side JavaScript to reveal
 * the only copy that satisfies search intent"), a three-step "how we work"
 * outline, potential outcomes, related service families, family-specific
 * FAQs (SEO audit Phase 3 Batch 5), and a closing CTA — each a full-width
 * band with no side margin. The hero's decorative visual uses real data
 * (this family's own child-service names and count) rather than fabricated
 * example labels.
 *
 * Every section below uses the site-wide "Layered Rise and Reveal"
 * on-scroll entrance system (src/components/motion/*): headings rise via
 * RevealHeading, supporting copy via FadeUp, card/list grids stagger via
 * StaggerContainer/StaggerItem, and the hero's decorative panel slides in
 * from the right. Nothing here changes layout, copy, colour or
 * functionality — only how each block enters as a visitor scrolls to it.
 */
export function ServiceCategoryTemplate({
  title,
  breadcrumbTrail,
  category,
  childServices,
}: ServiceCategoryTemplateProps) {
  const Icon = serviceCategoryIcons[category.slug];
  const relatedFamilies = category.relatedFamilySlugs
    .map((slug) => getServiceCategory(slug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  return (
    <div className="bg-surface-page">
      <header className="grid grid-cols-1 overflow-hidden bg-navy lg:grid-cols-[1.08fr_0.92fr]">
        <div className="flex flex-col justify-center gap-6 p-8 sm:p-10 lg:p-16">
          <Breadcrumbs trail={breadcrumbTrail} tone="dark" />
          <RevealHeading>
            <SectionKicker tone="dark">Service family</SectionKicker>
            <h1 className="mt-4 max-w-xl font-display text-display font-bold text-white">
              {title} Firm in the UK
            </h1>
            <p className="mt-3 max-w-xl font-display text-h4 font-semibold text-gold">
              {category.tagline}
            </p>
          </RevealHeading>
          <FadeUp delay={0.15} className="flex flex-col gap-6">
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
          </FadeUp>
        </div>

        <SlideInRight className="relative flex flex-col items-center justify-center gap-8 border-t border-white/10 p-10 lg:border-t-0 lg:border-l lg:p-14">
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
        </SlideInRight>
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
          <a href="#outcomes" className="text-caption font-bold text-text-secondary hover:text-navy">
            Outcomes
          </a>
          {category.faqs.length > 0 && (
            <a href="#faqs" className="text-caption font-bold text-text-secondary hover:text-navy">
              FAQs
            </a>
          )}
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
          <RevealHeading>
            <SectionKicker tone="light">Where we help</SectionKicker>
            <h2 className="mt-4 max-w-md font-display text-h1 font-bold text-navy">
              {title}
            </h2>
          </RevealHeading>
          <FadeUp delay={0.15}>
            <p className="mt-4 max-w-md text-body text-text-secondary">{category.introduction}</p>
          </FadeUp>
        </div>
        <StaggerContainer className="flex flex-col">
          {category.challenges.map((challenge, index) => (
            <StaggerItem
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
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <section id="services-in-family" className="bg-navy px-8 py-16 sm:px-10 lg:px-14 lg:py-20">
        <RevealHeading className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-end lg:gap-14">
          <div>
            <SectionKicker tone="dark">Services in this family</SectionKicker>
            <h2 className="mt-4 max-w-md font-display text-h1 font-bold text-white">
              {childServices.length} confirmed services in {title}
            </h2>
          </div>
          <p className="text-body text-white/70">{category.differentiation}</p>
        </RevealHeading>

        <StaggerContainer data-testid="child-service-grid" className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {childServices.map((service) => {
            const content = serviceContent.find((entry) => entry.slug === service.slug);
            return (
              <StaggerItem key={service.slug}>
                <Link
                  href={`/services/${service.slug}/`}
                  className="group flex flex-col gap-3 rounded-md border border-white/15 bg-white/5 p-6 transition-colors duration-(--duration-fast) hover:border-gold hover:bg-white/8"
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-display text-h4 font-bold text-white">{service.title}</span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-white/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold"
                    />
                  </span>
                  {content && <span className="text-body text-white/70">{content.heroSummary}</span>}
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <div className="mt-14">
          <RevealHeading>
            <SectionKicker tone="dark">Explore a service in detail</SectionKicker>
            <h3 className="mt-4 max-w-md font-display text-h3 font-bold text-white">
              See what a specific service includes
            </h3>
          </RevealHeading>
          <AnimatedSection delay={0.1} className="mt-8">
            <CategoryServiceExplorer categorySlug={category.slug} services={childServices} />
          </AnimatedSection>
        </div>
      </section>

      <section id="approach" className="grid grid-cols-1 gap-10 bg-surface-card p-8 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:p-14">
        <div>
          <RevealHeading>
            <SectionKicker tone="light">How we work</SectionKicker>
            <h2 className="mt-4 max-w-md font-display text-h1 font-bold text-navy">
              Structured enough to guide, flexible enough to fit
            </h2>
          </RevealHeading>
          <FadeUp delay={0.15}>
            <p className="mt-4 max-w-md text-body text-text-secondary">
              Every engagement is shaped around your organisation&apos;s context, pace and
              internal capability.
            </p>
          </FadeUp>
        </div>
        <StaggerContainer className="flex flex-col">
          {category.approach.map((step, index) => (
            <StaggerItem
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
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <section id="outcomes" className="grid grid-cols-1 gap-10 p-8 sm:p-10 lg:grid-cols-[0.7fr_1.3fr] lg:p-14">
        <div>
          <RevealHeading>
            <SectionKicker tone="light">Potential outcomes</SectionKicker>
            <h2 className="mt-4 max-w-md font-display text-h1 font-bold text-navy">
              What this can help your organisation achieve
            </h2>
          </RevealHeading>
          <FadeUp delay={0.15}>
            <p className="mt-4 max-w-md text-body text-text-secondary">
              Outcomes depend on your organisation&apos;s starting point and circumstances —
              this is what the work is designed to support, not a guaranteed result.
            </p>
          </FadeUp>
        </div>
        <StaggerContainer>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {category.outcomes.map((outcome) => (
              <StaggerItem key={outcome} as="li" className="flex items-start gap-3 rounded-md border border-border-subtle bg-surface-card p-5 text-body text-navy">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-gold-ink" />
                {outcome}
              </StaggerItem>
            ))}
          </ul>
        </StaggerContainer>
      </section>

      {relatedFamilies.length > 0 && (
        <section className="bg-surface-warm p-8 sm:p-10 lg:p-14">
          <RevealHeading>
            <SectionKicker tone="light">Related service families</SectionKicker>
            <h2 className="mt-4 max-w-lg font-display text-h2 font-bold text-navy">
              Other support that may also be relevant
            </h2>
          </RevealHeading>
          <StaggerContainer className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {relatedFamilies.map((family) => (
              <StaggerItem key={family.slug}>
                <Link
                  href={`/services/${family.slug}/`}
                  className="group flex items-center justify-between gap-4 rounded-md border border-border-subtle bg-surface-card p-6 transition-colors duration-(--duration-fast) hover:border-navy"
                >
                  <span className="font-display text-body-lg font-bold text-navy">{family.title}</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-text-secondary transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      )}

      {category.faqs.length > 0 && (
        <section id="faqs" className="bg-surface-card p-8 sm:p-10 lg:p-14">
          <RevealHeading>
            <SectionKicker tone="light">Frequently asked questions</SectionKicker>
            <h2 className="mt-4 max-w-2xl font-display text-h2 font-bold text-navy">
              Questions about {title.toLowerCase()}
            </h2>
          </RevealHeading>
          <div className="mt-10">
            <FaqWithContactForm items={category.faqs} />
          </div>
        </section>
      )}

      <div className="flex flex-col gap-6 bg-gold p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10 lg:p-14">
        <RevealHeading>
          <h3 className="font-display text-h2 font-bold text-navy">
            Ready to talk about {title.toLowerCase()}?
          </h3>
          <p className="mt-2 max-w-md text-body text-navy/80">
            Tell us what&apos;s happening in your organisation, and we&apos;ll help you find
            the right way in.
          </p>
        </RevealHeading>
        <FadeUp delay={0.15} className="shrink-0">
          <LinkButton href={routes.contact.path} variant="primary" surface="light">
            Start a conversation
          </LinkButton>
        </FadeUp>
      </div>

      <div className="flex flex-wrap gap-4 bg-surface-page px-8 py-10 sm:px-10 lg:px-14">
        <LinkButton href={routes.findTalent.path} variant="primary" surface="light">
          {routes.findTalent.label}
        </LinkButton>
        <LinkButton href={routes.forEmployers.path} variant="tertiary" surface="light">
          More employer support
        </LinkButton>
        <LinkButton href={routes.services.path} variant="tertiary" surface="light">
          View all services
        </LinkButton>
      </div>
    </div>
  );
}
