import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getService,
  getServiceCategory,
  getServicesByCategory,
  serviceCategories,
  services,
} from "@/config/services";
import { serviceCategoryContent, serviceContent } from "@/content/services-data";
import { getLocation } from "@/config/locations";
import { locationContent } from "@/content/locations-data";
import {
  buildComboMetaDescription,
  categoryLocationCombos,
  getChildServicesForCategoryCombo,
  getLocationCombo,
  serviceLocationCombos,
} from "@/config/service-locations";
import { ServicePageTemplate } from "@/components/templates/service-page-template";
import { ServiceCategoryTemplate } from "@/components/templates/service-category-template";
import { ServiceLocationTemplate } from "@/components/templates/service-location-template";
import { CategoryLocationTemplate } from "@/components/templates/category-location-template";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbJsonLd, getServiceJsonLd, toJsonLdScript } from "@/lib/seo/structured-data";
import { routes } from "@/config/routes";
import type { RouteRecord } from "@/types/route";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [
    ...serviceCategories,
    ...services,
    ...serviceLocationCombos,
    ...categoryLocationCombos,
  ].map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getServiceCategory(slug);
  const service = getService(slug);

  if (category) {
    const content = serviceCategoryContent.find((entry) => entry.slug === slug);
    return buildMetadata({
      title: `${category.title} Firm in the UK`,
      description: content?.summary,
      path: `/services/${slug}/`,
      index: routes.services.readyToIndex,
    });
  }

  if (service) {
    const content = serviceContent.find((entry) => entry.slug === slug);
    return buildMetadata({
      title: `${service.title} Firm in the UK`,
      description: content?.metaDescription,
      path: `/services/${slug}/`,
      index: routes.services.readyToIndex,
    });
  }

  const combo = getLocationCombo(slug);
  if (combo) {
    const location = getLocation(combo.locationSlug);
    const locationInfo = locationContent.find((entry) => entry.slug === combo.locationSlug);
    const locationTitle = location?.title ?? combo.locationSlug;
    if (combo.type === "service") {
      const entity = getService(combo.serviceSlug);
      const content = serviceContent.find((entry) => entry.slug === combo.serviceSlug);
      return buildMetadata({
        title: entity ? `${entity.title} Firm in ${locationTitle}` : "Service",
        description:
          content && locationInfo
            ? buildComboMetaDescription(content.metaDescription, locationTitle, locationInfo.region)
            : content?.metaDescription,
        path: `/services/${slug}/`,
        index: routes.locations.readyToIndex,
      });
    }
    const entity = getServiceCategory(combo.categorySlug);
    const content = serviceCategoryContent.find((entry) => entry.slug === combo.categorySlug);
    return buildMetadata({
      title: entity ? `${entity.title} in ${locationTitle}` : "Service",
      description:
        content && locationInfo
          ? buildComboMetaDescription(content.summary, locationTitle, locationInfo.region)
          : content?.summary,
      path: `/services/${slug}/`,
      index: routes.locations.readyToIndex,
    });
  }

  return buildMetadata({ title: "Service", path: `/services/${slug}/`, index: false });
}

function toRoute(label: string, path: string): RouteRecord {
  return { id: path, label, path, status: "confirmed", readyToIndex: routes.services.readyToIndex };
}

export default async function ServiceOrCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getServiceCategory(slug);
  const service = getService(slug);

  if (category) {
    const content = serviceCategoryContent.find((entry) => entry.slug === category.slug);
    if (!content) notFound();

    const breadcrumbTrail = [routes.services, toRoute(category.title, `/services/${category.slug}/`)];
    const jsonLd = [
      getServiceJsonLd({
        name: `${category.title} Firm in the UK`,
        description: content.summary,
        path: `/services/${category.slug}/`,
      }),
      getBreadcrumbJsonLd(routes.home.label, breadcrumbTrail),
    ];

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLdScript(jsonLd) }}
        />
        <ServiceCategoryTemplate
          title={category.title}
          breadcrumbTrail={breadcrumbTrail}
          category={content}
          childServices={getServicesByCategory(category.slug)}
        />
      </>
    );
  }

  if (service) {
    const content = serviceContent.find((entry) => entry.slug === service.slug);
    if (!content) notFound();

    const parentCategory = getServiceCategory(service.categorySlug);
    const breadcrumbTrail = [
      routes.services,
      ...(parentCategory
        ? [toRoute(parentCategory.title, `/services/${parentCategory.slug}/`)]
        : []),
      toRoute(service.title, `/services/${service.slug}/`),
    ];
    const jsonLd = [
      getServiceJsonLd({
        name: `${service.title} Firm in the UK`,
        description: content.metaDescription,
        path: `/services/${service.slug}/`,
      }),
      getBreadcrumbJsonLd(routes.home.label, breadcrumbTrail),
    ];

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLdScript(jsonLd) }}
        />
        <ServicePageTemplate
          title={service.title}
          breadcrumbTrail={breadcrumbTrail}
          service={content}
          showForEmployersLink
        />
      </>
    );
  }

  const combo = getLocationCombo(slug);
  if (combo) {
    const location = getLocation(combo.locationSlug);
    const locationInfo = locationContent.find((entry) => entry.slug === combo.locationSlug);
    if (!location || !locationInfo) notFound();

    if (combo.type === "service") {
      const entity = getService(combo.serviceSlug);
      const content = serviceContent.find((entry) => entry.slug === combo.serviceSlug);
      if (!entity || !content) notFound();

      const parentCategory = getServiceCategory(entity.categorySlug);
      const breadcrumbTrail = [
        routes.services,
        ...(parentCategory
          ? [toRoute(parentCategory.title, `/services/${parentCategory.slug}/`)]
          : []),
        toRoute(entity.title, `/services/${entity.slug}/`),
        toRoute(`${entity.title} in ${location.title}`, `/services/${slug}/`),
      ];

      // No FAQPage schema here: the FAQs this page renders are each
      // generic to either the service or the location individually (see
      // ServiceLocationTemplate props below), not written specifically
      // for this service+location combination — matching the same
      // deliberate omission already used for the two retained
      // category-location pages below.
      const jsonLd = [
        getServiceJsonLd({
          name: `${entity.title} Firm in ${location.title}`,
          description: buildComboMetaDescription(content.metaDescription, location.title, locationInfo.region),
          path: `/services/${slug}/`,
        }),
        getBreadcrumbJsonLd(routes.home.label, breadcrumbTrail),
      ];

      return (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: toJsonLdScript(jsonLd) }}
          />
          <ServiceLocationTemplate
            breadcrumbTrail={breadcrumbTrail}
            entityTitle={entity.title}
            entityHref={`/services/${entity.slug}/`}
            entitySummary={content.heroSummary}
            bulletListTitle="What this includes"
            bulletList={content.whatItIncludes}
            locationTitle={location.title}
            locationRegion={locationInfo.region}
            locationHref={`/locations/${location.slug}/`}
            localContext={locationInfo.localContext}
            faqs={[...content.faqs.slice(0, 3), ...locationInfo.faqs]}
          />
        </>
      );
    }

    const entity = getServiceCategory(combo.categorySlug);
    const content = serviceCategoryContent.find((entry) => entry.slug === combo.categorySlug);
    if (!entity || !content) notFound();

    const breadcrumbTrail = [
      routes.services,
      toRoute(entity.title, `/services/${entity.slug}/`),
      toRoute(`${entity.title} in ${location.title}`, `/services/${slug}/`),
    ];

    // Only reached for the two retained multi-child category-location pages
    // (SEO audit Phase 2 Batch 3, docs/URL-DECISION-REGISTER.md D-015) — the
    // 44 single-child combinations no longer exist in categoryLocationCombos
    // at all, so getLocationCombo() can never resolve their slugs here; they
    // redirect before reaching this route (see src/config/redirects.ts).
    const childServices = getChildServicesForCategoryCombo(combo)
      .map((childService) => {
        const childContent = serviceContent.find((entry) => entry.slug === childService.slug);
        if (!childContent) return null;
        return {
          title: childService.title,
          href: `/services/${childService.slug}-${location.slug}/`,
          summary: childContent.heroSummary,
        };
      })
      .filter((entry): entry is NonNullable<typeof entry> => entry !== null);
    if (childServices.length < 2) notFound();

    const jsonLd = [
      getServiceJsonLd({
        name: `${entity.title} in ${location.title}`,
        description: buildComboMetaDescription(content.summary, location.title, locationInfo.region),
        path: `/services/${slug}/`,
      }),
      getBreadcrumbJsonLd(routes.home.label, breadcrumbTrail),
    ];

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLdScript(jsonLd) }}
        />
        <CategoryLocationTemplate
          breadcrumbTrail={breadcrumbTrail}
          categoryTitle={entity.title}
          categoryHref={`/services/${entity.slug}/`}
          categorySummary={content.summary}
          bulletListTitle="Where this family helps"
          bulletList={content.challenges.map((challenge) => challenge.title)}
          childServices={childServices}
          locationTitle={location.title}
          locationRegion={locationInfo.region}
          locationHref={`/locations/${location.slug}/`}
          localContext={locationInfo.localContext}
          faqs={locationInfo.faqs}
        />
      </>
    );
  }

  notFound();
}
