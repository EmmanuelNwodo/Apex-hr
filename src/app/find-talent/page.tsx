import { InfoPageTemplate } from "@/components/templates/info-page-template";
import { findTalentPageContent } from "@/content/supporting-pages-data";
import { buildMetadata } from "@/lib/seo/metadata";
import { routes } from "@/config/routes";

export const metadata = buildMetadata({
  title: "Find Talent",
  description: findTalentPageContent.lead,
  path: routes.findTalent.path,
  index: routes.findTalent.readyToIndex,
});

/**
 * Accessible fallback route for the Find Talent CTA. The four-step form
 * (CLAUDE.md section 13) remains a later phase — this page exists so the
 * global CTA always resolves to a real, crawlable destination.
 */
export default function FindTalentPage() {
  return <InfoPageTemplate breadcrumbTrail={[routes.findTalent]} content={findTalentPageContent} />;
}
