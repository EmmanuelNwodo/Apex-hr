import { absoluteUrl, siteConfig } from "@/config/site";
import type { RouteRecord } from "@/types/route";

/**
 * Organization + WebSite JSON-LD for the homepage, per CLAUDE.md section 16
 * structured-data table. Only includes fields backed by confirmed content —
 * do not add ratings, addresses, founding dates or social profiles until
 * they are verified and approved.
 */
export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.productionUrl}/#organization`,
    name: siteConfig.legalName,
    url: siteConfig.productionUrl,
    ...(siteConfig.socialProfiles.length > 0
      ? { sameAs: siteConfig.socialProfiles }
      : {}),
  };
}

export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.productionUrl}/#website`,
    url: siteConfig.productionUrl,
    name: siteConfig.name,
    publisher: { "@id": `${siteConfig.productionUrl}/#organization` },
  };
}

interface ServiceJsonLdInput {
  name: string;
  description: string;
  path: string;
}

/**
 * `Service` JSON-LD for an individual service page, per CLAUDE.md section
 * 16's structured-data table. Only visible, confirmed fields are used — no
 * ratings, reviews or fabricated provider claims.
 */
export function getServiceJsonLd({ name, description, path }: ServiceJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    provider: { "@id": `${siteConfig.productionUrl}/#organization` },
    areaServed: "GB",
  };
}

/**
 * `BreadcrumbList` JSON-LD matching a page's visible Breadcrumbs component.
 * `trail` should be the same route list passed to <Breadcrumbs trail={…}/>
 * excluding Home, which this function prepends automatically.
 */
export function getBreadcrumbJsonLd(homeLabel: string, trail: RouteRecord[]) {
  const items = [{ label: homeLabel, path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.path),
    })),
  };
}
