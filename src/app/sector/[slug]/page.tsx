import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSector, sectors } from "@/config/sectors";
import { sectorContent } from "@/content/sectors-data";
import { SectorPageTemplate } from "@/components/templates/sector-page-template";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbJsonLd, getServiceJsonLd, toJsonLdScript } from "@/lib/seo/structured-data";
import { routes } from "@/config/routes";
import type { RouteRecord } from "@/types/route";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return sectors.map((sector) => ({ slug: sector.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sector = getSector(slug);
  const content = sectorContent.find((entry) => entry.slug === slug);
  return buildMetadata({
    title: sector ? `HR Company for ${sector.title} in the UK` : "Sector",
    description: content?.metaDescription,
    path: `/sector/${slug}/`,
    index: routes.sectors.readyToIndex,
  });
}

export default async function SectorPage({ params }: PageProps) {
  const { slug } = await params;
  const sector = getSector(slug);
  const content = sectorContent.find((entry) => entry.slug === slug);

  if (!sector || !content) {
    notFound();
  }

  const sectorRoute: RouteRecord = {
    id: sector.slug,
    label: sector.title,
    path: `/sector/${sector.slug}/`,
    status: "confirmed",
    readyToIndex: routes.sectors.readyToIndex,
  };
  const breadcrumbTrail = [routes.sectors, sectorRoute];
  // No FAQPage entry here: SectorPageTemplate renders sector.faqs through
  // FaqWithContactForm, which already emits its own FAQPage JSON-LD from
  // that exact array (see includeSchema on that component) — adding one
  // here too would duplicate the schema block.
  const jsonLd = [
    getServiceJsonLd({
      name: `HR Company for ${sector.title} in the UK`,
      description: content.metaDescription,
      path: `/sector/${sector.slug}/`,
    }),
    getBreadcrumbJsonLd(routes.home.label, breadcrumbTrail),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLdScript(jsonLd) }} />
      <SectorPageTemplate title={sector.title} breadcrumbTrail={breadcrumbTrail} sector={content} />
    </>
  );
}
