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
import { ServicePageTemplate } from "@/components/templates/service-page-template";
import { ServiceCategoryTemplate } from "@/components/templates/service-category-template";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbJsonLd, getServiceJsonLd } from "@/lib/seo/structured-data";
import { routes } from "@/config/routes";
import type { RouteRecord } from "@/types/route";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [...serviceCategories, ...services].map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getServiceCategory(slug);
  const service = getService(slug);

  if (category) {
    const content = serviceCategoryContent.find((entry) => entry.slug === slug);
    return buildMetadata({
      title: category.title,
      description: content?.summary,
      path: `/services/${slug}/`,
      index: routes.services.readyToIndex,
    });
  }

  if (service) {
    const content = serviceContent.find((entry) => entry.slug === slug);
    return buildMetadata({
      title: service.title,
      description: content?.metaDescription,
      path: `/services/${slug}/`,
      index: routes.services.readyToIndex,
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

    return (
      <ServiceCategoryTemplate
        title={category.title}
        breadcrumbTrail={[routes.services, toRoute(category.title, `/services/${category.slug}/`)]}
        category={content}
        childServices={getServicesByCategory(category.slug)}
      />
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
        name: service.title,
        description: content.metaDescription,
        path: `/services/${service.slug}/`,
      }),
      getBreadcrumbJsonLd(routes.home.label, breadcrumbTrail),
    ];

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ServicePageTemplate
          title={service.title}
          breadcrumbTrail={breadcrumbTrail}
          service={content}
        />
      </>
    );
  }

  notFound();
}
