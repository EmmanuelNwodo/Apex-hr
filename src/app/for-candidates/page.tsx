import { InfoPageTemplate } from "@/components/templates/info-page-template";
import { forCandidatesPageContent } from "@/content/supporting-pages-data";
import { buildMetadata } from "@/lib/seo/metadata";
import { routes } from "@/config/routes";

export const metadata = buildMetadata({
  title: "For Candidates",
  description: forCandidatesPageContent.lead,
  path: routes.forCandidates.path,
  index: routes.forCandidates.readyToIndex,
});

export default function ForCandidatesPage() {
  return <InfoPageTemplate breadcrumbTrail={[routes.forCandidates]} content={forCandidatesPageContent} />;
}
