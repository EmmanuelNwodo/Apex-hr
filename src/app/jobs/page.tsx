import { VacancyArchive } from "@/components/jobs/vacancy-archive";
import { jobsPageContent } from "@/content/supporting-pages-data";
import { buildMetadata } from "@/lib/seo/metadata";
import { routes } from "@/config/routes";
import { filterVacancies, getOpenVacancies, type VacancyQuery } from "@/lib/wordpress";

export const metadata = buildMetadata({
  title: "Apex HR Job Board",
  description: jobsPageContent.lead,
  path: routes.jobs.path,
  index: routes.jobs.readyToIndex,
});

interface JobsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function firstSearchParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const params = await searchParams;
  const filters: VacancyQuery = {
    keyword: firstSearchParam(params.q),
    location: firstSearchParam(params.location),
    sector: firstSearchParam(params.sector),
    employmentType: firstSearchParam(params.employmentType),
    workplaceArrangement: firstSearchParam(params.workplace),
    seniority: firstSearchParam(params.seniority),
  };
  const requestedPage = Number(firstSearchParam(params.page) ?? 1);
  const page = Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const result = await getOpenVacancies();
  const filteredVacancies = filterVacancies(result.vacancies, filters);

  return (
    <VacancyArchive
      allVacancies={result.vacancies}
      vacancies={filteredVacancies}
      filters={filters}
      page={page}
      unavailable={result.unavailable}
    />
  );
}
