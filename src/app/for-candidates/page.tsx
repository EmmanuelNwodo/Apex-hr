import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CircleCheck,
  Compass,
  FileText,
  FileUser,
  MessagesSquare,
  Route as RouteIcon,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionKicker } from "@/components/ui/section-kicker";
import { LinkButton } from "@/components/ui/link-button";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { forCandidatesPageContent } from "@/content/supporting-pages-data";
import { buildMetadata } from "@/lib/seo/metadata";
import { routes } from "@/config/routes";

export const metadata = buildMetadata({
  title: "For Candidates",
  description: forCandidatesPageContent.lead,
  path: routes.forCandidates.path,
  index: routes.forCandidates.readyToIndex,
});

const startPaths = [
  {
    icon: BriefcaseBusiness,
    title: "Search live roles",
    detail: "Browse current opportunities across HR, people, leadership and specialist functions.",
    href: routes.jobs.path,
    linkLabel: "View vacancies",
  },
  {
    icon: FileUser,
    title: "Share your CV",
    detail: "Tell us what you're looking for and we'll keep you in mind for suitable future roles.",
    href: routes.talentPool.path,
    linkLabel: "Join the talent pool",
  },
  {
    icon: Compass,
    title: "Build your next step",
    detail: "Use practical guidance to sharpen your CV, interviews and wider career strategy.",
    href: routes.resources.path,
    linkLabel: "Explore resources",
  },
];

const processSteps = [
  {
    title: "We get to know you",
    detail: "Your experience matters, but so do your ambitions, priorities and preferred way of working.",
  },
  {
    title: "We share the right opportunities",
    detail: "You receive relevant role context and an honest view of the employer and process.",
  },
  {
    title: "We prepare you properly",
    detail: "Practical guidance helps you approach interviews with clarity and confidence.",
  },
  {
    title: "We stay connected",
    detail: "Support continues through offer, onboarding and your next career chapter.",
  },
];

const promises = [
  "Honest conversations about role fit, expectations and progression.",
  "Your details handled responsibly and only shared with your agreement.",
  "Clear process updates so you always understand what comes next.",
  "A long-term relationship that goes beyond one application.",
];

const resources = [
  { icon: FileText, title: "Build a stronger CV", detail: "Structure your experience clearly and make your value easier to see." },
  { icon: MessagesSquare, title: "Prepare for interviews", detail: "Turn examples from your career into focused, credible answers." },
  { icon: RouteIcon, title: "Plan your next move", detail: "Clarify the environment, scope and progression you want next." },
];

/**
 * For Candidates page, restructured per the approved reference layout —
 * with two deliberate departures from it, both required by CLAUDE.md:
 * - the reference's hero included a fabricated "candidate profile"
 *   preview (an avatar, an "open to opportunities" status and two
 *   personalised job matches). Apex has no candidate accounts or
 *   matching feature in phase one (CLAUDE.md section 14), so a mockup of
 *   one was replaced with a plain decorative panel, matching the pattern
 *   used on every other rebuilt page's hero.
 * - the reference's "Featured opportunities" section listed four
 *   fabricated sample jobs with an interactive filter/search. No real
 *   vacancy source exists yet (see jobsPageContent's own note: "No
 *   vacancies are fabricated or listed here until they are genuine, live
 *   roles"), so that section was replaced with an honest state pointing
 *   to the real (in-progress) jobs page and the talent pool instead of a
 *   fake, unfiltered keyword search over fabricated listings.
 * Everything else reuses the existing forCandidatesPageContent fields.
 */
export default function ForCandidatesPage() {
  return (
    <div className="bg-surface-page py-8 md:py-12">
      <Container size="wide">
        <div className="overflow-hidden rounded-md bg-cream shadow-(--shadow-modal)">
          <header className="grid grid-cols-1 overflow-hidden bg-navy lg:grid-cols-[1.06fr_0.94fr]">
            <div className="flex flex-col justify-center gap-6 p-8 sm:p-10 lg:p-16">
              <Breadcrumbs trail={[routes.forCandidates]} tone="dark" />
              <div>
                <SectionKicker tone="dark">For candidates</SectionKicker>
                <h1 className="mt-4 max-w-xl font-display text-display font-bold text-white">
                  Make your next move count
                </h1>
              </div>
              <p className="max-w-lg text-lead text-white/70">{forCandidatesPageContent.lead}</p>
              <div className="flex flex-wrap items-center gap-4">
                <LinkButton href={routes.jobs.path} variant="primary" surface="dark">
                  Search Jobs
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </LinkButton>
                <LinkButton href={routes.talentPool.path} variant="secondary" surface="dark">
                  Join our talent pool
                </LinkButton>
              </div>
            </div>

            <div className="relative flex flex-col items-center justify-center gap-8 border-t border-white/10 p-10 lg:border-t-0 lg:border-l lg:p-14">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="absolute h-72 w-72 rounded-full border border-white/10" />
                <span className="absolute h-44 w-44 rounded-full border border-white/10" />
              </div>

              <div className="relative z-10 flex flex-wrap justify-center gap-3">
                {["HR & People", "Recruitment", "Leadership", "Specialist roles"].map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center rounded-full border border-white/15 bg-white/8 px-4 py-2 text-small font-semibold text-white"
                  >
                    {label}
                  </span>
                ))}
              </div>

              <div className="relative z-10 flex flex-col items-center gap-2 rounded-md bg-cream px-10 py-7 text-center shadow-(--shadow-modal)">
                <Compass aria-hidden="true" className="h-7 w-7 text-navy" />
                <p className="mt-1 font-display text-h4 font-bold text-navy">One recruiter</p>
                <p className="max-w-44 text-small text-text-secondary">All the way from search to your first day</p>
              </div>
            </div>
          </header>

          <section className="p-8 sm:p-10 lg:p-14">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
              <div>
                <SectionKicker tone="light">Start your journey</SectionKicker>
                <h2 className="mt-4 max-w-lg font-display text-h1 font-bold text-navy">
                  Choose the route that feels right
                </h2>
              </div>
              <p className="text-body text-text-secondary">
                Whether you&apos;re actively searching or simply open to the right conversation,
                there&apos;s an easy way to stay connected.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-border-subtle bg-border-subtle sm:grid-cols-3">
              {startPaths.map((path) => (
                <div key={path.title} className="flex flex-col justify-between gap-8 bg-surface-card p-7">
                  <div>
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-gold/20 text-gold-ink">
                      <path.icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <h3 className="mt-6 font-display text-h4 font-bold text-navy">{path.title}</h3>
                    <p className="mt-2 text-body text-text-secondary">{path.detail}</p>
                  </div>
                  <Link
                    href={path.href}
                    className="inline-flex w-fit items-center gap-2 text-caption font-bold uppercase tracking-widest text-gold-ink"
                  >
                    {path.linkLabel}
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-navy p-8 sm:p-10 lg:p-14">
            <SectionKicker tone="dark">Featured opportunities</SectionKicker>
            <h2 className="mt-4 max-w-lg font-display text-h1 font-bold text-white">
              Roles worth exploring
            </h2>
            <div className="mt-10 flex flex-col items-start gap-6 rounded-md border border-dashed border-white/25 p-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-body text-white/70">
                The searchable jobs archive is being built out as the recruitment platform
                develops — no vacancies are listed here until they&apos;re genuine, live roles.
                In the meantime, search current vacancies directly or join the talent pool to
                hear about suitable roles as they arise.
              </p>
              <div className="flex shrink-0 flex-wrap gap-4">
                <LinkButton href={routes.jobs.path} variant="primary" surface="dark">
                  Search Jobs
                </LinkButton>
                <LinkButton href={routes.talentPool.path} variant="secondary" surface="dark">
                  Join Talent Pool
                </LinkButton>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-10 p-8 sm:p-10 lg:grid-cols-[0.7fr_1.3fr] lg:p-14">
            <div>
              <SectionKicker tone="light">What to expect</SectionKicker>
              <h2 className="mt-4 max-w-md font-display text-h1 font-bold text-navy">
                A more human recruitment experience
              </h2>
              <p className="mt-4 max-w-md text-body text-text-secondary">
                Clear communication, useful feedback and thoughtful role matching — from the
                first conversation to your first day.
              </p>
            </div>
            <div className="flex flex-col">
              {processSteps.map((step, index) => (
                <div key={step.title} className="grid grid-cols-[auto_1fr] gap-4 border-b border-border-subtle py-6 first:border-t">
                  <span className="font-display text-body-lg text-gold-ink">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-h4 font-bold text-navy">{step.title}</h3>
                    <p className="mt-1 text-body text-text-secondary">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 gap-10 bg-navy p-8 sm:p-10 lg:grid-cols-2 lg:p-14">
            <div>
              <SectionKicker tone="dark">Our candidate promise</SectionKicker>
              <h2 className="mt-4 max-w-md font-display text-h1 font-bold text-white">
                Clarity at every turn
              </h2>
              <ul className="mt-8 flex flex-col gap-4">
                {promises.map((promise) => (
                  <li key={promise} className="flex items-start gap-3 text-body text-white/85">
                    <CircleCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    {promise}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative flex min-h-64 items-center justify-center overflow-hidden rounded-md bg-white/5 p-8 lg:min-h-full">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="h-56 w-56 rounded-full border border-white/15" />
              </div>
              <div className="relative z-10 flex flex-wrap justify-center gap-3">
                {["Ambition", "Opportunity", "Progress"].map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-small font-semibold text-white"
                  >
                    <Compass aria-hidden="true" className="h-4 w-4 text-gold" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="p-8 sm:p-10 lg:p-14">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
              <div>
                <SectionKicker tone="light">Career toolkit</SectionKicker>
                <h2 className="mt-4 max-w-lg font-display text-h1 font-bold text-navy">
                  Useful support for your search
                </h2>
              </div>
              <p className="text-body text-text-secondary">
                Short, practical resources designed to help you present your experience and
                make better career decisions.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {resources.map((resource) => (
                <div key={resource.title} className="flex flex-col justify-between gap-6 rounded-md border border-border-subtle bg-surface-card p-6">
                  <div>
                    <resource.icon aria-hidden="true" className="h-6 w-6 text-gold-ink" />
                    <h3 className="mt-4 font-display text-h4 font-bold text-navy">{resource.title}</h3>
                    <p className="mt-2 text-body text-text-secondary">{resource.detail}</p>
                  </div>
                  <Link
                    href={routes.resources.path}
                    className="inline-flex w-fit items-center gap-2 text-caption font-bold uppercase tracking-widest text-gold-ink"
                  >
                    Explore resources
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {forCandidatesPageContent.faqs && forCandidatesPageContent.faqs.length > 0 && (
            <section className="grid grid-cols-1 gap-12 bg-surface-card p-8 sm:p-10 lg:grid-cols-[0.7fr_1.3fr] lg:p-14">
              <div>
                <SectionKicker tone="light">Questions answered</SectionKicker>
                <h2 className="mt-4 font-display text-h2 font-bold text-navy">Before you apply</h2>
              </div>
              <FaqAccordion items={forCandidatesPageContent.faqs} />
            </section>
          )}

          <div className="mx-4 mb-4 mt-4 flex flex-col gap-6 rounded-md bg-gold p-8 sm:mx-6 sm:mb-6 sm:mt-6 sm:flex-row sm:items-center sm:justify-between lg:mx-8 lg:mb-8 lg:mt-8 lg:p-12">
            <div>
              <h3 className="font-display text-h2 font-bold text-navy">
                Ready for a role that feels like real progress?
              </h3>
            </div>
            <LinkButton href={routes.jobs.path} variant="primary" surface="light" className="shrink-0">
              Explore current opportunities
            </LinkButton>
          </div>
        </div>
      </Container>
    </div>
  );
}
