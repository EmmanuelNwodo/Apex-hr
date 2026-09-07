import { InfoPageTemplate } from "@/components/templates/info-page-template";
import { jobsPageContent } from "@/content/supporting-pages-data";
import { buildMetadata } from "@/lib/seo/metadata";
import { routes } from "@/config/routes";

export const metadata = buildMetadata({
  title: "Jobs",
  description: jobsPageContent.lead,
  path: routes.jobs.path,
  index: routes.jobs.readyToIndex,
});

export default function JobsPage() {
  return <InfoPageTemplate breadcrumbTrail={[routes.jobs]} content={jobsPageContent} />;
}
