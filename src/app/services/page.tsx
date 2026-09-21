import { ArrowDown, ChartNoAxesCombined, UserRoundSearch, UsersRound } from "lucide-react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionKicker } from "@/components/ui/section-kicker";
import { LinkButton } from "@/components/ui/link-button";
import { RevealHeading } from "@/components/motion/reveal-heading";
import { FadeUp } from "@/components/motion/fade-up";
import { AnimatedSection } from "@/components/motion/animated-section";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { ServiceFamilyNavigator } from "@/components/content/service-family-navigator";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbJsonLd, getCollectionPageJsonLd, toJsonLdScript } from "@/lib/seo/structured-data";
import { routes } from "@/config/routes";
import { serviceCategories } from "@/config/services";

const HUB_DESCRIPTION =
  "Explore Apex HR's ten connected HR and recruitment service families, from outsourced HR support to workforce strategy, and find the right expertise for your organisation.";

export const metadata = buildMetadata({
  title: "HR & Recruitment Services",
  description: HUB_DESCRIPTION,
  path: routes.services.path,
  index: routes.services.readyToIndex,
});

// Three quick-start shortcuts into the service-family navigator below,
// per the approved reference layout's hero "start with your priority"
// selector — each links straight to the closest-matching service family.
const priorityRoutes = [
  {
    icon: UserRoundSearch,
    title: "Hire the right people",
    detail: "Recruitment and executive search",
    href: "/services/recruitment-and-talent-acquisition-firm-in-the-uk/",
  },
  {
    icon: UsersRound,
    title: "Strengthen your HR",
    detail: "Outsourced support and compliance",
    href: "/services/outsourced-hr-services-firm-in-the-uk/",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Shape what comes next",
    detail: "Strategy, change and workforce advisory",
    href: "/services/strategic-hr-and-workforce-advisory-firm-in-the-uk/",
  },
];

/**
 * Services hub, restructured per the approved reference layout: a dark
 * hero with quick-start priority routes, then an interactive service
 * family navigator (see ServiceFamilyNavigator), all inside one rounded
 * cream "page shell". Breadcrumbs sit outside the shell in the normal
 * page background, per DESIGN.md's visible-breadcrumb requirement. Each
 * section is now a full-width band with no side margin (per later user
 * instruction; previously the whole page sat inside that rounded card,
 * inset from the browser edges).
 */
export default function ServicesPage() {
  const jsonLd = [
    getCollectionPageJsonLd({
      path: routes.services.path,
      name: "HR & Recruitment Services",
      description: HUB_DESCRIPTION,
      items: serviceCategories.map((category) => ({ name: category.title, path: `/services/${category.slug}/` })),
    }),
    getBreadcrumbJsonLd(routes.home.label, [routes.services]),
  ];

  return (
    <div className="bg-surface-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLdScript(jsonLd) }}
      />
      <div className="px-5 py-8 sm:px-0 md:py-12">
        <Breadcrumbs trail={[routes.services]} />
      </div>

      <header className="grid grid-cols-1 overflow-hidden bg-navy lg:grid-cols-[1.08fr_0.92fr]">
            <div className="flex flex-col justify-center gap-6 p-8 sm:p-10 lg:p-16">
              <RevealHeading>
                <SectionKicker tone="dark">Apex HR services</SectionKicker>
                <h1 className="max-w-2xl font-display text-display font-bold text-white">
                  People expertise for every stage of growth
                </h1>
              </RevealHeading>
              <FadeUp delay={0.15} className="flex flex-col gap-6">
                <p className="max-w-lg text-lead text-white/70">
                  From everyday HR support and specialist recruitment to workforce strategy and
                  transformation, choose the expertise your organisation needs now.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <LinkButton href="#service-families" variant="primary" surface="dark">
                    Find the right service
                    <ArrowDown aria-hidden="true" className="h-4 w-4" />
                  </LinkButton>
                  <LinkButton href={routes.contact.path} variant="secondary" surface="dark">
                    Speak to an adviser
                  </LinkButton>
                </div>
              </FadeUp>
            </div>

            <StaggerContainer className="flex flex-col justify-center gap-3 border-t border-white/10 bg-black/10 p-8 sm:p-10 lg:border-t-0 lg:border-l lg:p-12">
              <span className="text-caption font-semibold uppercase tracking-[0.08em] text-white/55">
                Start with your priority
              </span>
              {priorityRoutes.map((route) => (
                <StaggerItem key={route.href}>
                  <Link
                    href={route.href}
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-md border border-white/15 bg-white/5 p-4 transition-colors duration-(--duration-fast) hover:border-gold hover:bg-white/10"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-gold/15 text-gold">
                      <route.icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-body-lg font-semibold text-white">
                        {route.title}
                      </span>
                      <span className="mt-0.5 block text-small text-white/55">{route.detail}</span>
                    </span>
                    <ArrowDown
                      aria-hidden="true"
                      className="h-4 w-4 -rotate-90 text-white/60 transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </header>

          <RevealHeading
            className="grid grid-cols-1 gap-6 p-8 sm:p-10 lg:grid-cols-[1fr_0.68fr] lg:items-end lg:gap-10 lg:p-14"
          >
            <div>
              <SectionKicker tone="light">Explore our expertise</SectionKicker>
              <h2 className="mt-4 max-w-2xl font-display text-h1 font-bold text-navy">
                Ten connected service families. One trusted partner.
              </h2>
            </div>
            <p className="text-body-lg text-text-secondary lg:text-right">
              Choose a service family to see how Apex HR can support your organisation.
            </p>
          </RevealHeading>

      <AnimatedSection delay={0.1} className="px-5 pb-8 sm:px-0 sm:pb-10 lg:pb-14">
        <ServiceFamilyNavigator />
      </AnimatedSection>

      <div className="flex flex-col gap-6 bg-navy p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10 lg:p-14">
        <RevealHeading>
          <h3 className="font-display text-h2 font-bold text-white">Not sure which service fits?</h3>
          <p className="mt-2 max-w-md text-body text-white/70">
            Tell us what&apos;s happening in your organisation and we&apos;ll point you in the right
            direction.
          </p>
        </RevealHeading>
        <FadeUp delay={0.15} className="shrink-0">
          <LinkButton href={routes.contact.path} variant="primary" surface="dark">
            Speak to an adviser
          </LinkButton>
        </FadeUp>
      </div>
    </div>
  );
}
