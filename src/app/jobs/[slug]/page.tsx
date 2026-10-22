import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { JobApplicationForm } from "@/components/jobs/job-application-form";
import { LinkButton } from "@/components/ui/link-button";
import { routes } from "@/config/routes";
import { absoluteUrl } from "@/config/site";
import { getVacancyBySlug, getOpenVacancies, isVacancyOpen } from "@/lib/wordpress";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbJsonLd, getJobPostingJsonLd, toJsonLdScript } from "@/lib/seo/structured-data";
import type { RouteRecord } from "@/types/route";

interface VacancyPageProps {
  params: Promise<{ slug: string }>;
}

async function loadVacancy(slug: string) {
  return getVacancyBySlug(slug);
}

export async function generateMetadata({ params }: VacancyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const vacancy = await loadVacancy(slug);
  if (!vacancy) return buildMetadata({ title: "Vacancy not found", path: `/jobs/${slug}/` });

  const open = isVacancyOpen(vacancy);
  const metadata = buildMetadata({
    title: vacancy.seoTitle || vacancy.title,
    description: vacancy.metaDescription || vacancy.summary || undefined,
    path: `/jobs/${vacancy.slug}/`,
    index: open,
  });

  return {
    ...metadata,
    alternates: { canonical: absoluteUrl(`/jobs/${vacancy.slug}/`) },
  };
}

function formatDate(value: string): string | null {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" }).format(date);
}

function VacancyList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-8">
      <h2 className="font-display text-h3 font-bold text-navy">{title}</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-body text-text-secondary">
        {items.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}
      </ul>
    </section>
  );
}

export default async function VacancyPage({ params }: VacancyPageProps) {
  const { slug } = await params;
  const vacancy = await loadVacancy(slug);
  if (!vacancy) notFound();

  const open = isVacancyOpen(vacancy);
  const relatedVacancies = open
    ? (await getOpenVacancies()).vacancies.filter((entry) => entry.slug !== vacancy.slug).slice(0, 3)
    : [];
  const route: RouteRecord = {
    id: `vacancy-${vacancy.slug}`,
    label: vacancy.title,
    path: `/jobs/${vacancy.slug}/`,
    status: "confirmed",
    readyToIndex: open,
  };
  const breadcrumbTrail = [routes.jobs, route];
  const structuredData = [
    ...(open ? [getJobPostingJsonLd(vacancy)] : []),
    getBreadcrumbJsonLd(routes.home.label, breadcrumbTrail),
  ];
  const closingDate = formatDate(vacancy.closingDate);

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLdScript(structuredData) }} />
      <header className="bg-navy py-10 text-white sm:py-14">
        <Container size="wide">
          <Breadcrumbs trail={breadcrumbTrail} tone="dark" />
          <div className="mt-8 max-w-4xl">
            <p className="text-small font-semibold uppercase tracking-[0.08em] text-gold">Apex HR Job Board</p>
            <h1 className="mt-3 font-display text-h1 font-bold">{vacancy.title}</h1>
            {vacancy.reference && <p className="mt-3 text-body text-white/70">Vacancy reference: {vacancy.reference}</p>}
            <ul className="mt-5 flex flex-wrap gap-2 p-0 text-small text-white/80">
              {[vacancy.location, vacancy.employmentType, vacancy.workplaceArrangement, vacancy.seniority]
                .filter(Boolean)
                .map((item) => <li key={item} className="list-none rounded-full border border-white/20 px-3 py-1">{item}</li>)}
            </ul>
            {vacancy.salaryDisplay && <p className="mt-4 text-body-lg font-semibold">{vacancy.salaryDisplay}</p>}
            {closingDate && <p className="mt-3 text-small text-white/70">Closing date: {closingDate}</p>}
            {open ? (
              <LinkButton href="#apply" variant="primary" surface="dark" className="mt-6">
                Apply for This Role
              </LinkButton>
            ) : (
              <p className="mt-6 inline-flex rounded-md border border-white/30 px-4 py-3 font-semibold text-white" role="status">
                Applications for this vacancy are closed.
              </p>
            )}
          </div>
        </Container>
      </header>

      <Container size="wide" className="py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <article className="min-w-0">
            {vacancy.summary && (
              <p className="max-w-3xl text-lead text-text-secondary">{vacancy.summary}</p>
            )}
            {vacancy.descriptionHtml && (
              <section aria-label="Vacancy description" className="wp-content mt-8 max-w-3xl" dangerouslySetInnerHTML={{ __html: vacancy.descriptionHtml }} />
            )}
            <VacancyList title="Responsibilities" items={vacancy.responsibilities} />
            <VacancyList title="Requirements" items={vacancy.requirements} />
            <VacancyList title="Desirable skills" items={vacancy.desirableSkills} />
            <VacancyList title="Benefits" items={vacancy.benefits} />
            {vacancy.sector && (
              <p className="mt-8 text-body text-text-secondary">Sector: <span className="font-semibold text-navy">{vacancy.sector}</span></p>
            )}
          </article>

          <aside className="h-fit rounded-md border border-border-subtle bg-surface-card p-6">
            <h2 className="font-display text-h4 font-bold text-navy">Interested in this role?</h2>
            {open ? (
              <LinkButton href="#apply" variant="primary" surface="light" className="mt-4 w-full justify-center">
                Apply for This Role
              </LinkButton>
            ) : (
              <p className="mt-3 text-body text-text-secondary">This vacancy is no longer accepting applications.</p>
            )}
            <p className="mt-5 text-body text-text-secondary">Not the right opportunity today?</p>
            <Link href={routes.talentPool.path} className="mt-2 inline-block font-semibold text-navy underline underline-offset-4">
              Join the Talent Pool
            </Link>
            <Link href={routes.jobs.path} className="mt-3 inline-block font-semibold text-navy underline underline-offset-4">
              Back to the Job Board
            </Link>
          </aside>
        </div>

        {open && <div className="mt-12 max-w-3xl"><JobApplicationForm vacancy={vacancy} /></div>}

        {relatedVacancies.length > 0 && (
          <section aria-labelledby="related-vacancies-heading" className="mt-16 border-t border-border-subtle pt-10">
            <h2 id="related-vacancies-heading" className="font-display text-h2 font-bold text-navy">Other open vacancies</h2>
            <ul className="mt-6 grid gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {relatedVacancies.map((related) => (
                <li key={related.id} className="list-none rounded-md border border-border-subtle bg-white p-5">
                  <h3 className="font-display text-h4 font-bold text-navy">
                    <Link href={`${routes.jobs.path}${related.slug}/`} className="underline-offset-4 hover:underline">{related.title}</Link>
                  </h3>
                  <p className="mt-2 text-body text-text-secondary">{[related.location, related.employmentType].filter(Boolean).join(" · ")}</p>
                  <Link href={`${routes.jobs.path}${related.slug}/`} className="mt-4 inline-block font-semibold text-navy underline underline-offset-4">View Vacancy</Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </Container>
    </main>
  );
}
