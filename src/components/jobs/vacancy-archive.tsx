import Link from "next/link";
import { BriefcaseBusiness, MapPin } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { LinkButton } from "@/components/ui/link-button";
import { siteConfig } from "@/config/site";
import { routes } from "@/config/routes";
import type { Vacancy, VacancyQuery } from "@/lib/wordpress";

const PAGE_SIZE = 12;

interface VacancyArchiveProps {
  allVacancies: Vacancy[];
  vacancies: Vacancy[];
  filters: VacancyQuery;
  page: number;
  unavailable: boolean;
}

function distinctValues(vacancies: Vacancy[], pick: (vacancy: Vacancy) => string): string[] {
  return [...new Set(vacancies.map(pick).filter(Boolean))].sort((a, b) => a.localeCompare(b, "en-GB"));
}

function formatClosingDate(value: string): string | null {
  const date = new Date(`${value}T00:00:00Z`);
  if (!value || Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" }).format(date);
}

function buildPageHref(filters: VacancyQuery, page: number): string {
  const params = new URLSearchParams();
  if (filters.keyword) params.set("q", filters.keyword);
  if (filters.location) params.set("location", filters.location);
  if (filters.sector) params.set("sector", filters.sector);
  if (filters.employmentType) params.set("employmentType", filters.employmentType);
  if (filters.workplaceArrangement) params.set("workplace", filters.workplaceArrangement);
  if (filters.seniority) params.set("seniority", filters.seniority);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `${routes.jobs.path}?${query}` : routes.jobs.path;
}

function FilterSelect({
  name,
  label,
  value,
  values,
}: {
  name: string;
  label: string;
  value?: string;
  values: string[];
}) {
  return (
    <label className="flex flex-col gap-2 text-small font-semibold text-navy">
      {label}
      <select
        name={name}
        defaultValue={value ?? ""}
        className="min-h-12 rounded-md border border-border-subtle bg-white px-3 text-body font-normal"
      >
        <option value="">All {label.toLocaleLowerCase("en-GB")}</option>
        {values.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

export function VacancyArchive({ allVacancies, vacancies, filters, page, unavailable }: VacancyArchiveProps) {
  const totalPages = Math.max(1, Math.ceil(vacancies.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const visibleVacancies = vacancies.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const locations = distinctValues(allVacancies, (vacancy) => vacancy.location);
  const sectors = distinctValues(allVacancies, (vacancy) => vacancy.sector);
  const employmentTypes = distinctValues(allVacancies, (vacancy) => vacancy.employmentType);
  const arrangements = distinctValues(allVacancies, (vacancy) => vacancy.workplaceArrangement);
  const seniorityLevels = distinctValues(allVacancies, (vacancy) => vacancy.seniority);

  return (
    <main>
      <header className="bg-navy py-12 text-white sm:py-16">
        <Container size="wide">
          <Breadcrumbs trail={[routes.jobs]} tone="dark" />
          <p className="mt-8 text-small font-semibold uppercase tracking-[0.08em] text-gold">Candidates</p>
          <h1 className="mt-3 font-display text-h1 font-bold">Apex HR Job Board</h1>
          <p className="mt-4 max-w-2xl text-body-lg text-white/75">
            Explore current vacancies published by Apex HR. Filter by role, location and working arrangement to find opportunities that match your experience.
          </p>
        </Container>
      </header>

      <section aria-labelledby="vacancy-search-heading" className="py-10 sm:py-14">
        <Container size="wide">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="vacancy-search-heading" className="font-display text-h3 font-bold text-navy">Current vacancies</h2>
              {!unavailable && (
                <p className="mt-2 text-body text-text-secondary" aria-live="polite">
                  {vacancies.length} {vacancies.length === 1 ? "vacancy" : "vacancies"} available
                </p>
              )}
            </div>
          </div>

          <form method="get" action={routes.jobs.path} className="mt-6 rounded-md border border-border-subtle bg-surface-card p-5 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <label className="flex flex-col gap-2 text-small font-semibold text-navy sm:col-span-2 lg:col-span-3">
                Search vacancies
                <input
                  type="search"
                  name="q"
                  defaultValue={filters.keyword}
                  placeholder="Job title, keyword or reference"
                  className="min-h-12 rounded-md border border-border-subtle bg-white px-3 text-body font-normal"
                />
              </label>
              <FilterSelect name="location" label="Location" value={filters.location} values={locations} />
              <FilterSelect name="sector" label="Sector" value={filters.sector} values={sectors} />
              <FilterSelect name="employmentType" label="Employment type" value={filters.employmentType} values={employmentTypes} />
              <FilterSelect name="workplace" label="Work arrangement" value={filters.workplaceArrangement} values={arrangements} />
              <FilterSelect name="seniority" label="Seniority" value={filters.seniority} values={seniorityLevels} />
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-md bg-navy px-5 font-semibold text-white hover:bg-navy/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy">
                Find vacancies
              </button>
              <Link href={routes.jobs.path} className="inline-flex min-h-11 items-center px-3 font-semibold text-navy underline underline-offset-4">
                Clear filters
              </Link>
            </div>
          </form>

          {unavailable ? (
            <div className="mt-8 rounded-md border border-border-subtle bg-surface-card p-6" role="status">
              <h3 className="font-display text-h4 font-bold text-navy">Vacancies are temporarily unavailable</h3>
              <p className="mt-2 text-body text-text-secondary">
                Please try again later, or contact Apex HR at{" "}
                <a className="font-semibold text-navy underline underline-offset-4" href={`mailto:${siteConfig.contactEmail}`}>
                  {siteConfig.contactEmail}
                </a>.
              </p>
            </div>
          ) : visibleVacancies.length === 0 ? (
            <div className="mt-8 rounded-md border border-border-subtle bg-surface-card p-6" role="status">
              <h3 className="font-display text-h4 font-bold text-navy">No matching vacancies</h3>
              <p className="mt-2 max-w-2xl text-body text-text-secondary">
                There are currently no vacancies matching your selection. Please adjust your filters or join the Apex HR talent pool.
              </p>
              <LinkButton href={routes.talentPool.path} variant="secondary" surface="light" className="mt-5">
                Join the Talent Pool
              </LinkButton>
            </div>
          ) : (
            <>
              <ul className="mt-8 grid list-none gap-5 p-0 md:grid-cols-2">
                {visibleVacancies.map((vacancy) => {
                  const closingDate = formatClosingDate(vacancy.closingDate);
                  return (
                    <li key={vacancy.id} className="flex flex-col rounded-md border border-border-subtle bg-white p-6">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-display text-h4 font-bold text-navy">
                          <Link href={`${routes.jobs.path}${vacancy.slug}/`} className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2">
                            {vacancy.title}
                          </Link>
                        </h3>
                        {vacancy.featured && (
                          <span className="shrink-0 rounded-full bg-surface-card px-3 py-1 text-xs font-semibold text-navy">Featured</span>
                        )}
                      </div>
                      {vacancy.reference && <p className="mt-2 text-small text-text-secondary">Reference: {vacancy.reference}</p>}
                      <p className="mt-4 flex items-center gap-2 text-body text-text-secondary">
                        <MapPin aria-hidden="true" className="h-4 w-4 shrink-0" /> {vacancy.location || "Location not specified"}
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-2 p-0 text-small text-text-secondary">
                        {[vacancy.employmentType, vacancy.workplaceArrangement, vacancy.seniority].filter(Boolean).map((label) => (
                          <li key={label} className="list-none rounded-full border border-border-subtle px-3 py-1">{label}</li>
                        ))}
                      </ul>
                      {vacancy.salaryDisplay && <p className="mt-3 text-body font-semibold text-navy">{vacancy.salaryDisplay}</p>}
                      {vacancy.summary && <p className="mt-4 text-body text-text-secondary">{vacancy.summary}</p>}
                      {closingDate && <p className="mt-4 text-small text-text-secondary">Applications close {closingDate}</p>}
                      <LinkButton href={`${routes.jobs.path}${vacancy.slug}/`} variant="secondary" surface="light" className="mt-6 self-start">
                        View Vacancy
                        <BriefcaseBusiness aria-hidden="true" className="ml-2 h-4 w-4" />
                      </LinkButton>
                    </li>
                  );
                })}
              </ul>

              {totalPages > 1 && (
                <nav aria-label="Vacancy pages" className="mt-8 flex items-center justify-between">
                  {currentPage > 1 ? (
                    <Link href={buildPageHref(filters, currentPage - 1)} className="min-h-11 rounded-md px-3 py-2 font-semibold text-navy underline underline-offset-4">Previous page</Link>
                  ) : <span />}
                  <p className="text-small text-text-secondary" aria-current="page">Page {currentPage} of {totalPages}</p>
                  {currentPage < totalPages ? (
                    <Link href={buildPageHref(filters, currentPage + 1)} className="min-h-11 rounded-md px-3 py-2 font-semibold text-navy underline underline-offset-4">Next page</Link>
                  ) : <span />}
                </nav>
              )}
            </>
          )}
        </Container>
      </section>
    </main>
  );
}
