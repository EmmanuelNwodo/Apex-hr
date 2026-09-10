import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLocation, locations } from "@/config/locations";
import { locationContent } from "@/content/locations-data";
import { LocationPageTemplate } from "@/components/templates/location-page-template";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbJsonLd, getServiceJsonLd, toJsonLdScript } from "@/lib/seo/structured-data";
import { routes } from "@/config/routes";
import type { RouteRecord } from "@/types/route";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocation(slug);
  const content = locationContent.find((entry) => entry.slug === slug);
  return buildMetadata({
    title: location ? `HR & Recruitment Support in ${location.title}` : "Location",
    description: content?.metaDescription,
    path: `/locations/${slug}/`,
    // Confirmed/Corrected per docs/MASTER-SITEMAP.md section 9.
    index: true,
  });
}

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params;
  const location = getLocation(slug);
  const content = locationContent.find((entry) => entry.slug === slug);

  if (!location || !content) {
    notFound();
  }

  const locationRoute: RouteRecord = {
    id: location.slug,
    label: location.title,
    path: `/locations/${location.slug}/`,
    status: "confirmed",
    readyToIndex: true,
  };
  const breadcrumbTrail = [routes.locations, locationRoute];
  // No FAQPage entry here: LocationPageTemplate renders its FAQ list
  // (location.faqs plus three generic questions, via buildLocationFaqs)
  // through FaqWithContactForm, which already emits its own FAQPage
  // JSON-LD from that exact array — adding one here too would duplicate
  // the schema block.
  const jsonLd = [
    getServiceJsonLd({
      name: `HR and Recruitment Support in ${location.title}`,
      description: content.metaDescription,
      path: `/locations/${location.slug}/`,
    }),
    getBreadcrumbJsonLd(routes.home.label, breadcrumbTrail),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLdScript(jsonLd) }} />
      <LocationPageTemplate title={location.title} breadcrumbTrail={breadcrumbTrail} location={content} />
    </>
  );
}
