import { absoluteUrl, siteConfig } from "@/config/site";
import type { RouteRecord } from "@/types/route";

/**
 * Organization + WebSite JSON-LD for the homepage, per CLAUDE.md section 16
 * structured-data table. Only includes fields backed by confirmed content —
 * do not add ratings, addresses, founding dates or social profiles until
 * they are verified and approved.
 *
 * `contactPoint`/`address` use the phone/email/city confirmed by explicit
 * user instruction (SEO audit Batch 2 item 3) — `address` deliberately
 * omits `streetAddress`, since only the city is verified, not a specific
 * office. `areaServed: "GB"` reflects genuine UK-wide service coverage,
 * not a claim of a physical presence in every area served.
 */
export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.productionUrl}/#organization`,
    name: siteConfig.legalName,
    url: siteConfig.productionUrl,
    areaServed: "GB",
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressCountry: "GB",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: siteConfig.contactPhone.tel,
      email: siteConfig.contactEmail,
      areaServed: "GB",
    },
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
 * `Service` JSON-LD for an individual service or service-family page, per
 * CLAUDE.md section 16's structured-data table. Only visible, confirmed
 * fields are used — no ratings, reviews or fabricated provider claims.
 * Not used on the curated service/category + location combination pages
 * (SEO audit Batch 2 item 3 explicitly excludes those this batch).
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

interface FaqPageJsonLdInput {
  faqs: { question: string; answer: string }[];
}

/**
 * `FAQPage` JSON-LD for a page's genuine, fully-rendered visible FAQ
 * content (SEO audit Batch 2 item 3). Only pass the exact same `faqs`
 * array a page renders through FaqAccordion/FaqWithContactForm, so the
 * schema can never drift from what a visitor actually sees — an
 * accordion's initially-collapsed answers still qualify, since the full
 * question/answer text is present in the server-rendered HTML the whole
 * time (only a CSS `hidden` toggle changes, per FaqAccordion's own doc
 * comment); nothing here is fetched on demand or absent from the DOM.
 * Do not call this for noindexed pages or pages with no genuine FAQ
 * content.
 */
export function getFaqPageJsonLd({ faqs }: FaqPageJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

interface BlogPostingJsonLdInput {
  path: string;
  headline: string;
  description: string;
  imageUrl?: string;
  authorName?: string;
  datePublished: string;
  dateModified: string;
}

/**
 * `BlogPosting` JSON-LD for a WordPress-sourced Insights article, per
 * CLAUDE.md section 16's structured-data table ("Insight/article ->
 * Article or BlogPosting") and this integration's SEO requirements. Only
 * visible, accurate values are used — `authorName` is omitted entirely
 * (rather than defaulted to "Apex HR") when the source post has no
 * embedded WordPress author, so nothing here is fabricated.
 */
export function getBlogPostingJsonLd({
  path,
  headline,
  description,
  imageUrl,
  authorName,
  datePublished,
  dateModified,
}: BlogPostingJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(path)}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(path) },
    url: absoluteUrl(path),
    headline,
    description,
    ...(imageUrl ? { image: [imageUrl] } : {}),
    datePublished,
    dateModified,
    ...(authorName ? { author: { "@type": "Person", name: authorName } } : {}),
    publisher: { "@id": `${siteConfig.productionUrl}/#organization` },
    isPartOf: { "@id": `${siteConfig.productionUrl}/#website` },
  };
}

/**
 * Safely serialises a JSON-LD value for embedding in a
 * `<script type="application/ld+json">` tag via `dangerouslySetInnerHTML`.
 * Plain `JSON.stringify` does not escape "</", so a text field (an FAQ
 * answer, for example) containing a literal "</script>" substring would
 * prematurely close the surrounding script tag. Escaping "<" to its
 * unicode form prevents that while leaving the parsed JSON value
 * unchanged (SEO audit Batch 2 corrective pass, item 3).
 */
export function toJsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

interface CollectionPageJsonLdInput {
  path: string;
  name: string;
  description: string;
  items: { name: string; path: string }[];
}

/**
 * `CollectionPage` + nested `ItemList` JSON-LD for a genuine directory hub
 * (Services, Sectors, Locations) whose visible content is a crawlable list
 * of links to real child pages — never used to describe the hub itself as
 * one specific `Service`. `items` should match the hub's actual rendered
 * link list exactly, so schema never drifts from visible content.
 */
export function getCollectionPageJsonLd({ path, name, description, items }: CollectionPageJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl(path)}#collectionpage`,
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { "@id": `${siteConfig.productionUrl}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
    },
  };
}

/** `AboutPage` JSON-LD for /about/, referencing the shared Organization entity. */
export function getAboutPageJsonLd(path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${absoluteUrl(path)}#aboutpage`,
    url: absoluteUrl(path),
    name: "About Apex HR",
    about: { "@id": `${siteConfig.productionUrl}/#organization` },
    isPartOf: { "@id": `${siteConfig.productionUrl}/#website` },
  };
}

/**
 * `ContactPage` JSON-LD for /contact/, referencing the shared Organization
 * entity — which already carries the verified `contactPoint` (phone/email)
 * — rather than duplicating those details here.
 */
export function getContactPageJsonLd(path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${absoluteUrl(path)}#contactpage`,
    url: absoluteUrl(path),
    name: "Contact Apex HR",
    about: { "@id": `${siteConfig.productionUrl}/#organization` },
    isPartOf: { "@id": `${siteConfig.productionUrl}/#website` },
  };
}

interface WebPageJsonLdInput {
  path: string;
  name: string;
  description: string;
}

/**
 * Generic `WebPage` JSON-LD for an informational/legal page that doesn't
 * fit a more specific schema.org page type (no `AboutPage`/`ContactPage`
 * equivalent exists for a privacy policy) — per CLAUDE.md section 16's
 * "use JSON-LD only when it matches visible content" and this page's own
 * SEO brief. References the shared Organization/WebSite entities rather
 * than duplicating or inventing organisation data.
 */
export function getWebPageJsonLd({ path, name, description }: WebPageJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    about: { "@id": `${siteConfig.productionUrl}/#organization` },
    isPartOf: { "@id": `${siteConfig.productionUrl}/#website` },
  };
}
