import { PrivacyPolicyTemplate } from "@/components/templates/privacy-policy-template";
import { privacyPolicyLastUpdated, privacyPolicyLead, privacyPolicySections } from "@/content/privacy-policy-data";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbJsonLd, getWebPageJsonLd, toJsonLdScript } from "@/lib/seo/structured-data";
import { routes } from "@/config/routes";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Read the Apex HR Privacy Policy to understand how we collect, use, store, share and protect personal data across our HR and recruitment services.",
  path: routes.privacyPolicy.path,
  index: routes.privacyPolicy.readyToIndex,
});

/**
 * Privacy Policy page, per the approved privacy-policy implementation
 * brief. A plain server component (no "use client" anywhere in this file
 * or PrivacyPolicyTemplate) rendering fully static, server-generated HTML
 * — no client-side fetch, no hydration dependency for the policy text
 * itself, matching the site's technical SEO renderability requirements.
 */
export default function PrivacyPolicyPage() {
  const jsonLd = [
    getWebPageJsonLd({
      path: routes.privacyPolicy.path,
      name: "Privacy Policy | Apex HR",
      description: "Learn how Apex HR collects, uses, stores and protects personal information.",
    }),
    getBreadcrumbJsonLd(routes.home.label, [routes.privacyPolicy]),
  ];

  return (
    <div className="bg-surface-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLdScript(jsonLd) }} />
      <PrivacyPolicyTemplate
        breadcrumbTrail={[routes.privacyPolicy]}
        sections={privacyPolicySections}
        lead={privacyPolicyLead}
        lastUpdated={privacyPolicyLastUpdated}
      />
    </div>
  );
}
