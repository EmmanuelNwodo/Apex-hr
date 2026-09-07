import { InfoPageTemplate } from "@/components/templates/info-page-template";
import { contactPageContent } from "@/content/supporting-pages-data";
import { buildMetadata } from "@/lib/seo/metadata";
import { routes } from "@/config/routes";

export const metadata = buildMetadata({
  title: "Contact",
  description: contactPageContent.lead,
  path: routes.contact.path,
  index: routes.contact.readyToIndex,
});

export default function ContactPage() {
  return <InfoPageTemplate breadcrumbTrail={[routes.contact]} content={contactPageContent} />;
}
