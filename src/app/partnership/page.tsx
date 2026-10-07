import {
  ArrowDown,
  ArrowRight,
  BellRing,
  BookOpenCheck,
  CalendarDays,
  Calculator,
  ChartNoAxesCombined,
  Globe2,
  Handshake,
  RefreshCw,
  Scale,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { FadeUp } from "@/components/motion/fade-up";
import { RevealHeading } from "@/components/motion/reveal-heading";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { LinkButton } from "@/components/ui/link-button";
import { SectionKicker } from "@/components/ui/section-kicker";
import { routes } from "@/config/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbJsonLd, toJsonLdScript } from "@/lib/seo/structured-data";

export const metadata = buildMetadata({
  title: "HR Partnership & Pricing",
  description:
    "Explore Apex HR’s monthly people partnership tiers, from strategic HR advisory to fractional Chief Human Resources Officer services.",
  path: routes.partnership.path,
  index: routes.partnership.readyToIndex,
});

type PartnershipPlanId = "starter" | "growth" | "scale" | "enterprise";

interface PartnershipPlan {
  id: PartnershipPlanId;
  name: string;
  price: string;
  comparisonPrice: string;
  allocation: string;
  description: string;
}

const partnershipPlans: PartnershipPlan[] = [
  {
    id: "starter",
    name: "Starter Partner",
    price: "From £500 / month",
    comparisonPrice: "From £500",
    allocation: "2 days",
    description:
      "2 days per month of strategic HR advisory. Ideal for businesses just beginning to formalise their people function. Includes a monthly strategy call and email support between sessions.",
  },
  {
    id: "growth",
    name: "Growth Partner",
    price: "From £1,000 / month",
    comparisonPrice: "From £1,000",
    allocation: "5 days",
    description:
      "5 days per month plus project support. Consistent senior HR input as you scale your team and people practices. Includes quarterly people review sessions and priority access.",
  },
  {
    id: "scale",
    name: "Scale Partner",
    price: "From £2,500 / month",
    comparisonPrice: "From £2,500",
    allocation: "10 days",
    description:
      "10 days per month with a dedicated HR Business Partner embedded in your leadership team rhythm. Full project support, board-level people reporting, and strategic people advisory included.",
  },
  {
    id: "enterprise",
    name: "Enterprise Partner",
    price: "Custom pricing",
    comparisonPrice: "Custom pricing",
    allocation: "Discuss requirements",
    description:
      "Full fractional Chief Human Resources Officer services plus a specialist team across talent, reward, L&D, DEI, and HR technology. Designed for complex, multi-market organisations with significant people challenges.",
  },
];

const comparisonRows: {
  feature: string;
  values: Record<PartnershipPlanId, string>;
}[] = [
  {
    feature: "Monthly price",
    values: {
      starter: "From £500",
      growth: "From £1,000",
      scale: "From £2,500",
      enterprise: "Custom pricing",
    },
  },
  {
    feature: "Monthly advisory allocation",
    values: {
      starter: "2 days",
      growth: "5 days",
      scale: "10 days",
      enterprise: "Discuss requirements",
    },
  },
  {
    feature: "Strategic support",
    values: {
      starter: "Strategic HR advisory",
      growth: "Consistent senior HR input",
      scale: "Strategic people advisory",
      enterprise: "Fractional Chief Human Resources Officer services",
    },
  },
  {
    feature: "Plan-specific review or contact",
    values: {
      starter: "Monthly strategy call and email support",
      growth: "Quarterly people review sessions and priority access",
      scale: "Dedicated HR Business Partner",
      enterprise: "Specialist team",
    },
  },
  {
    feature: "Project support",
    values: {
      starter: "Discuss requirements",
      growth: "Project support",
      scale: "Full project support",
      enterprise: "Discuss requirements",
    },
  },
  {
    feature: "Board-level people reporting",
    values: {
      starter: "Discuss requirements",
      growth: "Discuss requirements",
      scale: "Included",
      enterprise: "Discuss requirements",
    },
  },
  {
    feature: "Specialist coverage",
    values: {
      starter: "Discuss requirements",
      growth: "Discuss requirements",
      scale: "Discuss requirements",
      enterprise: "Talent, reward, L&D, DEI, and HR technology",
    },
  },
];

const partnershipBenefits: { icon: LucideIcon; title: string; detail: string }[] = [
  {
    icon: UserRound,
    title: "Dedicated point of contact",
    detail: "One senior consultant who knows your business inside out. No call centres, no handoffs, no strangers.",
  },
  {
    icon: CalendarDays,
    title: "Monthly people review",
    detail: "A structured monthly session to review your people metrics, priorities, and upcoming challenges.",
  },
  {
    icon: BellRing,
    title: "Priority response",
    detail: "All retainer partners get same-day response on urgent HR matters. You are never left waiting.",
  },
  {
    icon: BookOpenCheck,
    title: "Policy library access",
    detail: "Full access to our HR policy template library, customised for your organisation and jurisdiction.",
  },
  {
    icon: Handshake,
    title: "Quarterly strategy session",
    detail: "A deep dive every quarter to align your people strategy to your business objectives for the next 90 days.",
  },
  {
    icon: RefreshCw,
    title: "No lock-in contracts",
    detail: "All retainers are rolling monthly. We earn your trust every month, not through contractual obligation.",
  },
];

const globalPartners: { number: string; icon: LucideIcon; title: string; focus: string }[] = [
  { number: "01", icon: Scale, title: "Legal Alliance", focus: "Employment Law" },
  { number: "02", icon: Calculator, title: "Finance Partner", focus: "Payroll" },
  { number: "03", icon: ChartNoAxesCombined, title: "Tech Partner", focus: "HRIS & Analytics" },
  { number: "04", icon: Globe2, title: "Global Footprint", focus: "Deep Network" },
];

const enquiryHref = `${routes.contact.path}#contact-form-area`;

export default function PartnershipPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd(routes.home.label, [routes.partnership]);

  return (
    <div className="bg-surface-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLdScript(breadcrumbJsonLd) }}
      />

      <header className="bg-navy text-white">
        <div className="mx-auto grid w-full max-w-360 grid-cols-1 gap-10 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:px-12 lg:py-20">
          <div className="flex flex-col items-start gap-6">
            <Breadcrumbs trail={[routes.partnership]} tone="dark" />
            <RevealHeading>
              <SectionKicker tone="dark">People partnership</SectionKicker>
              <h1 className="mt-5 max-w-3xl font-display text-h1 font-bold text-white">
                Your dedicated people partner, <span className="font-normal italic text-gold">on retainer.</span>
              </h1>
            </RevealHeading>
            <FadeUp delay={0.12}>
              <p className="max-w-2xl text-lead text-white/75">
                Not every organisation is ready for a full-time Chief Human Resources Officer, but every
                organisation deserves senior HR thinking. Our partnership model gives you exactly that,
                at the right level for your stage.
              </p>
            </FadeUp>
            <div className="flex flex-col items-start gap-3 pt-1 sm:flex-row sm:items-center sm:gap-4">
              <LinkButton href="#partnership-tiers" variant="primary" surface="dark">
                Explore partnership tiers
                <ArrowDown aria-hidden="true" className="h-4 w-4" />
              </LinkButton>
              <LinkButton href={enquiryHref} variant="secondary" surface="dark">
                Book a consultation
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </LinkButton>
            </div>
          </div>

          <aside
            aria-label="Monthly partnership allocations"
            className="relative overflow-hidden rounded-md border border-white/15 bg-white/5 p-6 sm:p-8"
          >
            <div aria-hidden="true" className="absolute right-0 top-0 h-1 w-24 bg-gold" />
            <div className="flex items-start justify-between gap-4 border-b border-white/15 pb-5">
              <div>
                <p className="text-caption font-semibold uppercase tracking-[0.08em] text-gold">A level for each stage</p>
                <h2 className="mt-2 font-display text-h3 font-bold text-white">Monthly advisory allocation</h2>
              </div>
              <Handshake aria-hidden="true" className="mt-1 h-7 w-7 shrink-0 text-gold" />
            </div>
            <ul className="mt-2 divide-y divide-white/10">
              {partnershipPlans.map((plan) => (
                <li key={plan.id} className="flex items-center justify-between gap-5 py-4">
                  <span className="text-body text-white/75">{plan.name}</span>
                  <span className="text-right text-body font-semibold text-white">{plan.allocation}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 border-t border-white/15 pt-5 text-small text-white/60">
              Four partnership levels. One conversation to find your fit.
            </p>
          </aside>
        </div>
      </header>

      <section id="partnership-tiers" className="scroll-mt-24 bg-white">
        <div className="mx-auto w-full max-w-360 px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <RevealHeading className="max-w-3xl">
            <SectionKicker>Partnership tiers</SectionKicker>
            <h2 className="mt-4 font-display text-h2 font-bold text-navy">
              Ongoing people partnership, built around your growth stage.
            </h2>
            <p className="mt-4 text-body-lg text-text-secondary">Choose the level that fits your stage.</p>
          </RevealHeading>

          <StaggerContainer className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {partnershipPlans.map((plan) => (
              <StaggerItem key={plan.id} className="flex h-full flex-col rounded-md border border-border-subtle bg-surface-page p-6 transition-transform duration-(--duration-base) hover:-translate-y-1">
                <div className="min-h-24">
                  <p className="text-caption font-semibold uppercase tracking-[0.08em] text-text-accent-light">
                    {plan.id === "enterprise" ? "Tailored support" : `${plan.allocation} monthly advisory`}
                  </p>
                  <h3 className="mt-2 font-display text-h4 font-bold text-navy">{plan.name}</h3>
                </div>
                <p className="mt-2 min-h-14 font-display text-h3 font-bold text-navy">{plan.price}</p>
                <p className="mt-4 flex-1 text-body text-text-secondary">{plan.description}</p>
                <LinkButton
                  href={enquiryHref}
                  variant="secondary"
                  surface="light"
                  size="compact"
                  className="mt-7 w-full whitespace-normal text-center"
                >
                  Discuss {plan.name}
                  <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                </LinkButton>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section aria-labelledby="comparison-heading" className="bg-surface-page">
        <div className="mx-auto w-full max-w-360 px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <RevealHeading className="max-w-3xl">
            <SectionKicker>Compare partnership levels</SectionKicker>
            <h2 id="comparison-heading" className="mt-4 font-display text-h2 font-bold text-navy">
              Clear scope. A level that fits.
            </h2>
            <p className="mt-4 text-body-lg text-text-secondary">
              Review the monthly allocation and the support specified for each partnership.
            </p>
          </RevealHeading>

          <p id="partnership-table-scroll-hint" className="mt-7 flex items-center gap-2 text-small text-text-secondary xl:hidden">
            <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
            Scroll horizontally to compare all four partnership tiers.
          </p>
          <div
            role="region"
            aria-label="Partnership tier comparison table"
            aria-describedby="partnership-table-scroll-hint"
            tabIndex={0}
            className="mt-3 overflow-x-auto rounded-md border border-border-subtle focus-visible:outline-offset-4"
          >
            <table className="w-full min-w-280 table-fixed border-collapse text-left">
              <caption className="bg-navy px-5 py-4 text-left text-small font-semibold text-white">
                Partnership tier comparison
              </caption>
              <colgroup>
                <col className="w-55" />
                {partnershipPlans.map((plan) => <col key={plan.id} className="w-56.25" />)}
              </colgroup>
              <thead className="bg-navy text-white">
                <tr>
                  <th scope="col" className="px-5 py-5 align-bottom text-small font-semibold text-white/75">Feature</th>
                  {partnershipPlans.map((plan) => (
                    <th key={plan.id} scope="col" className="px-5 py-5 align-bottom">
                      <span className="block font-display text-h4 font-bold">{plan.name}</span>
                      <span className="mt-2 block text-body font-semibold text-gold">{plan.comparisonPrice}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr key={row.feature} className={index % 2 === 0 ? "bg-white" : "bg-surface-page"}>
                    <th scope="row" className="border-t border-border-subtle px-5 py-4 text-small font-bold text-navy">
                      {row.feature}
                    </th>
                    {partnershipPlans.map((plan) => (
                      <td key={plan.id} className="border-t border-border-subtle px-5 py-4 text-small text-text-secondary">
                        {row.values[plan.id]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-peach">
                <tr>
                  <th scope="row" className="px-5 py-5 text-small font-bold text-navy">Next step</th>
                  {partnershipPlans.map((plan) => (
                    <td key={plan.id} className="px-5 py-4">
                      <LinkButton href={enquiryHref} variant="secondary" surface="light" size="compact" className="w-full whitespace-normal text-center">
                        Discuss {plan.name}
                        <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                      </LinkButton>
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="mt-6 border-l-2 border-gold pl-4 text-body font-semibold text-navy">
            Every tier also includes the shared partnership benefits listed below.
          </p>
        </div>
      </section>

      <section className="bg-peach">
        <div className="mx-auto w-full max-w-360 px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <RevealHeading className="max-w-3xl">
            <SectionKicker>What’s included</SectionKicker>
            <h2 className="mt-4 font-display text-h2 font-bold text-navy">Every partnership comes with this.</h2>
          </RevealHeading>
          <StaggerContainer className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {partnershipBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <StaggerItem key={benefit.title} className="flex h-full flex-col border border-navy/10 bg-white p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-peach text-navy">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-h4 font-bold text-navy">{benefit.title}</h3>
                  <p className="mt-3 text-body text-text-secondary">{benefit.detail}</p>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-surface-page">
        <div className="mx-auto w-full max-w-360 px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <RevealHeading className="max-w-3xl">
            <SectionKicker>Our global network</SectionKicker>
            <h2 className="mt-4 font-display text-h2 font-bold text-navy">Strategic partners across the world.</h2>
          </RevealHeading>
          <StaggerContainer className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {globalPartners.map((partner) => {
              const Icon = partner.icon;
              return (
                <StaggerItem key={partner.number} className="flex min-h-48 flex-col border border-border-subtle bg-white p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-h3 font-bold text-gold-ink">{partner.number}</span>
                    <Icon aria-hidden="true" className="h-5 w-5 text-navy" />
                  </div>
                  <h3 className="mt-auto pt-8 font-display text-h4 font-bold text-navy">{partner.title}</h3>
                  <p className="mt-1 text-small text-text-secondary">{partner.focus}</p>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-navy">
        <div className="mx-auto flex w-full max-w-360 flex-col items-center px-5 py-14 text-center sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <SectionKicker tone="dark">Start a conversation</SectionKicker>
          <h2 className="mt-5 max-w-4xl font-display text-h2 font-bold text-white">
            Let’s find the right partnership for your business.
          </h2>
          <p className="mt-5 max-w-3xl text-body-lg text-white/75">
            Tell us about your organisation, your priorities, and where you want to go. We’ll help you
            explore the partnership level that fits your stage.
          </p>
          <LinkButton href={enquiryHref} variant="primary" surface="dark" className="mt-8">
            Book a consultation
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </LinkButton>
        </div>
      </section>
    </div>
  );
}