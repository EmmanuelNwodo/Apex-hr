import { InfoPageTemplate } from "@/components/templates/info-page-template";
import { aboutPageContent } from "@/content/supporting-pages-data";
import { buildMetadata } from "@/lib/seo/metadata";
import { routes } from "@/config/routes";

export const metadata = buildMetadata({
  title: "About Apex HR",
  description: aboutPageContent.lead,
  path: routes.about.path,
  index: routes.about.readyToIndex,
});

export default function AboutPage() {
  return <InfoPageTemplate breadcrumbTrail={[routes.about]} content={aboutPageContent} />;
}
