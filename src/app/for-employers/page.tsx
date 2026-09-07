import { InfoPageTemplate } from "@/components/templates/info-page-template";
import { forEmployersPageContent } from "@/content/supporting-pages-data";
import { buildMetadata } from "@/lib/seo/metadata";
import { routes } from "@/config/routes";

export const metadata = buildMetadata({
  title: "For Employers",
  description: forEmployersPageContent.lead,
  path: routes.forEmployers.path,
  index: routes.forEmployers.readyToIndex,
});

export default function ForEmployersPage() {
  return <InfoPageTemplate breadcrumbTrail={[routes.forEmployers]} content={forEmployersPageContent} />;
}
