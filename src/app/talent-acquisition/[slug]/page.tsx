import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { talentRoleContent } from "@/content/talent-roles-data";
import { TalentRoleTemplate } from "@/components/templates/talent-role-template";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbJsonLd, getServiceJsonLd, toJsonLdScript } from "@/lib/seo/structured-data";
import { routes } from "@/config/routes";
import type { RouteRecord } from "@/types/route";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// No `/talent-acquisition/` hub route exists in the approved master
// register — only the dynamic `[slug]` pattern is Confirmed, per
// src/config/routes.ts. Breadcrumbs go straight from Home to the role.

export function generateStaticParams() {
  return talentRoleContent.map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const role = talentRoleContent.find((entry) => entry.slug === slug);
  return buildMetadata({
    title: role ? `${role.title} Recruitment` : "Talent Acquisition",
    description: role?.metaDescription,
    path: `/talent-acquisition/${slug}/`,
    // Confirmed per the Master Routes sheet's "Talent acquisition role" rows.
    index: true,
  });
}

export default async function TalentAcquisitionRolePage({ params }: PageProps) {
  const { slug } = await params;
  const role = talentRoleContent.find((entry) => entry.slug === slug);

  if (!role) {
    notFound();
  }

  const roleRoute: RouteRecord = {
    id: role.slug,
    label: role.title,
    path: `/talent-acquisition/${role.slug}/`,
    status: "confirmed",
    readyToIndex: true,
  };
  const breadcrumbTrail = [roleRoute];
  // No FAQPage entry here: TalentRoleTemplate renders role.faqs through
  // FaqWithContactForm, which already emits its own FAQPage JSON-LD from
  // that exact array — adding one here too would duplicate the schema
  // block.
  const jsonLd = [
    getServiceJsonLd({
      name: `${role.title} Recruitment`,
      description: role.metaDescription,
      path: `/talent-acquisition/${role.slug}/`,
    }),
    getBreadcrumbJsonLd(routes.home.label, breadcrumbTrail),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLdScript(jsonLd) }} />
      <TalentRoleTemplate breadcrumbTrail={breadcrumbTrail} role={role} />
    </>
  );
}
