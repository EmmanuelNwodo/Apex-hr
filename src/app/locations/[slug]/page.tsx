import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLocation, locations } from "@/config/locations";
import { locationContent } from "@/content/locations-data";
import { LocationPageTemplate } from "@/components/templates/location-page-template";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbJsonLd } from "@/lib/seo/structured-data";
import { routes } from "@/config/routes";
import type { RouteRecord } from "@/types/route";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// No `/locations/` hub route exists in the approved master register — see
// src/config/routes.ts. Breadcrumbs for this page therefore go straight
// from Home to the location, with no intermediate hub crumb.

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
  const breadcrumbTrail = [locationRoute];
  const jsonLd = getBreadcrumbJsonLd(routes.home.label, breadcrumbTrail);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LocationPageTemplate title={location.title} breadcrumbTrail={breadcrumbTrail} location={content} />
    </>
  );
}
