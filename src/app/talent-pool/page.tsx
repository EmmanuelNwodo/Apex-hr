import { InfoPageTemplate } from "@/components/templates/info-page-template";
import { talentPoolPageContent } from "@/content/supporting-pages-data";
import { buildMetadata } from "@/lib/seo/metadata";
import { routes } from "@/config/routes";

export const metadata = buildMetadata({
  title: "Talent Pool",
  description: talentPoolPageContent.lead,
  path: routes.talentPool.path,
  index: routes.talentPool.readyToIndex,
});

export default function TalentPoolPage() {
  return <InfoPageTemplate breadcrumbTrail={[routes.talentPool]} content={talentPoolPageContent} />;
}
