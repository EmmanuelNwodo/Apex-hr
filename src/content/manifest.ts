import type { ContentManifestEntry } from "@/types/content";
import { routes } from "@/config/routes";
import { serviceCategories, services } from "@/config/services";
import { sectors } from "@/config/sectors";
import { locations } from "@/config/locations";
import { insightCategories } from "@/config/insight-categories";
import { serviceCategoryContent, serviceContent } from "@/content/services-data";
import { sectorContent } from "@/content/sectors-data";
import { locationContent } from "@/content/locations-data";
import { talentRoleContent } from "@/content/talent-roles-data";
import {
  aboutPageContent,
  contactPageContent,
  findTalentPageContent,
  forCandidatesPageContent,
  forEmployersPageContent,
  jobsPageContent,
  talentPoolPageContent,
} from "@/content/supporting-pages-data";

/**
 * Machine-readable content manifest for the whole site, per this phase's
 * brief section 6. Every entry is derived from the same content records
 * that render the pages (not hand-typed separately), so the manifest can
 * never silently drift from what's actually published. Used by
 * sitemap.ts, robots.ts and tests/unit/content-audit.test.ts.
 *
 * `contentStatus`/`reviewStatus` are internal workflow markers — never
 * rendered to public users — reflecting that all copy here is an
 * AI-authored first draft pending stakeholder review, per CLAUDE.md
 * section 32.
 */
function buildManifest(): ContentManifestEntry[] {
  const entries: ContentManifestEntry[] = [];

  entries.push({
    pageType: "home",
    title: "Home",
    slug: "",
    canonicalPath: routes.home.path,
    routeStatus: routes.home.status,
    indexable: routes.home.readyToIndex,
    contentStatus: "ai-draft",
    reviewStatus: "stakeholder-review-required",
    primaryAudience: "employer",
    primaryIntent: "Establish Apex HR as a UK HR and recruitment partner for employers",
    primaryKeyword: "HR company in the UK",
    metaTitle: "Apex HR — HR Company in the UK",
    metaDescription: "Apex HR is a UK HR, recruitment and people-consulting partner for employers.",
    h1: "A people partner built for growing employers",
    relatedPages: [routes.services.path, routes.sectors.path, routes.findTalent.path],
    legalReviewRequired: false,
  });

  entries.push({
    pageType: "serviceHub",
    title: "Services",
    slug: "",
    canonicalPath: routes.services.path,
    routeStatus: routes.services.status,
    indexable: routes.services.readyToIndex,
    contentStatus: "ai-draft",
    reviewStatus: "stakeholder-review-required",
    primaryAudience: "employer",
    primaryIntent: "Let employers browse the full HR and recruitment service catalogue",
    primaryKeyword: "HR services UK",
    metaTitle: "HR & Recruitment Services | Apex HR",
    metaDescription: "Explore Apex HR's HR, recruitment and people-consulting services.",
    h1: "HR, recruitment and people-consulting services",
    legalReviewRequired: false,
  });

  for (const category of serviceCategories) {
    const content = serviceCategoryContent.find((entry) => entry.slug === category.slug);
    entries.push({
      pageType: "serviceCategory",
      title: category.title,
      slug: category.slug,
      canonicalPath: `/services/${category.slug}/`,
      routeStatus: "confirmed",
      indexable: routes.services.readyToIndex,
      contentStatus: "ai-draft",
      reviewStatus: "stakeholder-review-required",
      primaryAudience: "employer",
      primaryIntent: `Introduce the ${category.title} service family`,
      primaryKeyword: category.title.toLowerCase(),
      metaTitle: `${category.title} | Apex HR`,
      metaDescription: content?.summary ?? "",
      h1: category.title,
      parent: routes.services.path,
      legalReviewRequired: false,
    });
  }

  for (const service of services) {
    const content = serviceContent.find((entry) => entry.slug === service.slug);
    if (!content) continue;
    entries.push({
      pageType: "service",
      title: service.title,
      slug: service.slug,
      canonicalPath: `/services/${service.slug}/`,
      routeStatus: "confirmed",
      indexable: routes.services.readyToIndex,
      contentStatus: "ai-draft",
      reviewStatus: "stakeholder-review-required",
      primaryAudience: "employer",
      primaryIntent: `Convert employer interest in ${service.title}`,
      primaryKeyword: content.primaryKeyword,
      metaTitle: `${service.title} | Apex HR`,
      metaDescription: content.metaDescription,
      h1: service.title,
      parent: `/services/${service.categorySlug}/`,
      relatedPages: content.relatedServiceSlugs.map((slug) => `/services/${slug}/`),
      sourceReferences: ["docs/MASTER-SITEMAP.md", "docs/Apex_HR_Master_Sitemap_and_URL_Register.xlsx"],
      legalReviewRequired: content.legalReviewRequired,
    });
  }

  entries.push({
    pageType: "sectorHub",
    title: "Sectors",
    slug: "",
    canonicalPath: routes.sectors.path,
    routeStatus: routes.sectors.status,
    indexable: routes.sectors.readyToIndex,
    contentStatus: "ai-draft",
    reviewStatus: "stakeholder-review-required",
    primaryAudience: "employer",
    primaryIntent: "Let employers find sector-specific HR context",
    primaryKeyword: "sectors we support",
    metaTitle: "Sectors We Support | Apex HR",
    metaDescription: "Explore the sectors Apex HR can support with HR and recruitment.",
    h1: "Sectors Apex HR can support",
    legalReviewRequired: false,
  });

  for (const sector of sectors) {
    const content = sectorContent.find((entry) => entry.slug === sector.slug);
    if (!content) continue;
    entries.push({
      pageType: "sector",
      title: sector.title,
      slug: sector.slug,
      canonicalPath: `/sector/${sector.slug}/`,
      routeStatus: "confirmed",
      indexable: routes.sectors.readyToIndex,
      contentStatus: "ai-draft",
      reviewStatus: "stakeholder-review-required",
      primaryAudience: "employer",
      primaryIntent: `Explain how Apex HR can support ${sector.title} employers`,
      primaryKeyword: `HR support for ${sector.title.toLowerCase()}`,
      metaTitle: `${sector.title} | Apex HR`,
      metaDescription: content.metaDescription,
      h1: sector.title,
      parent: routes.sectors.path,
      relatedPages: content.relatedServiceSlugs.map((slug) => `/services/${slug}/`),
      legalReviewRequired: false,
    });
  }

  for (const location of locations) {
    const content = locationContent.find((entry) => entry.slug === location.slug);
    if (!content) continue;
    entries.push({
      pageType: "location",
      title: location.title,
      slug: location.slug,
      canonicalPath: `/locations/${location.slug}/`,
      routeStatus: "confirmed",
      indexable: true,
      contentStatus: "ai-draft",
      reviewStatus: "stakeholder-review-required",
      primaryAudience: "employer",
      primaryIntent: `Explain HR and recruitment coverage in ${location.title}`,
      primaryKeyword: `HR support in ${location.title.toLowerCase()}`,
      metaTitle: `HR & Recruitment Support in ${location.title} | Apex HR`,
      metaDescription: content.metaDescription,
      h1: `HR and recruitment support in ${location.title}`,
      legalReviewRequired: false,
    });
  }

  for (const role of talentRoleContent) {
    entries.push({
      pageType: "talentAcquisitionRole",
      title: role.title,
      slug: role.slug,
      canonicalPath: `/talent-acquisition/${role.slug}/`,
      routeStatus: "confirmed",
      indexable: true,
      contentStatus: "ai-draft",
      reviewStatus: "stakeholder-review-required",
      primaryAudience: "employer",
      primaryIntent: `Support employers hiring for ${role.title}`,
      primaryKeyword: `${role.title.toLowerCase()} recruitment`,
      metaTitle: `${role.title} Recruitment | Apex HR`,
      metaDescription: role.metaDescription,
      h1: role.title,
      relatedPages: role.relatedServiceSlugs.map((slug) => `/services/${slug}/`),
      sourceReferences: ["docs/Apex_HR_Master_Sitemap_and_URL_Register.xlsx"],
      legalReviewRequired: false,
    });
  }

  const supportingPages: Array<{
    pageType: ContentManifestEntry["pageType"];
    route: (typeof routes)[keyof typeof routes];
    audience: ContentManifestEntry["primaryAudience"];
    lead: string;
    intent: string;
  }> = [
    { pageType: "generalInformation", route: routes.about, audience: "general", lead: aboutPageContent.lead, intent: "Explain what Apex HR is and how it works" },
    { pageType: "generalInformation", route: routes.contact, audience: "general", lead: contactPageContent.lead, intent: "Give employers and candidates a way to get in touch" },
    { pageType: "employerLanding", route: routes.forEmployers, audience: "employer", lead: forEmployersPageContent.lead, intent: "Orient employers toward the right service or route" },
    { pageType: "candidateLanding", route: routes.forCandidates, audience: "candidate", lead: forCandidatesPageContent.lead, intent: "Orient candidates toward jobs and the talent pool" },
    { pageType: "conversionLanding", route: routes.findTalent, audience: "employer", lead: findTalentPageContent.lead, intent: "Capture an employer hiring enquiry" },
    { pageType: "conversionLanding", route: routes.jobs, audience: "candidate", lead: jobsPageContent.lead, intent: "Let candidates find current vacancies" },
    { pageType: "conversionLanding", route: routes.talentPool, audience: "candidate", lead: talentPoolPageContent.lead, intent: "Capture candidate interest for future roles" },
  ];

  for (const page of supportingPages) {
    entries.push({
      pageType: page.pageType,
      title: page.route.label,
      slug: page.route.id,
      canonicalPath: page.route.path,
      routeStatus: page.route.status,
      indexable: page.route.readyToIndex,
      contentStatus: "ai-draft",
      reviewStatus: "stakeholder-review-required",
      primaryAudience: page.audience,
      primaryIntent: page.intent,
      primaryKeyword: page.route.label.toLowerCase(),
      metaTitle: `${page.route.label} | Apex HR`,
      metaDescription: page.lead,
      h1: page.route.label,
      legalReviewRequired: false,
    });
  }

  entries.push({
    pageType: "insightsHub",
    title: "Insights",
    slug: "",
    canonicalPath: routes.insights.path,
    routeStatus: routes.insights.status,
    indexable: routes.insights.readyToIndex,
    contentStatus: "ai-draft",
    reviewStatus: "stakeholder-review-required",
    primaryAudience: "general",
    primaryIntent: "Organise HR thought-leadership content by topic",
    primaryKeyword: "HR insights",
    metaTitle: "Insights | Apex HR",
    metaDescription: "HR and workforce insights from Apex HR.",
    h1: "HR and workforce insights",
    legalReviewRequired: false,
  });

  for (const category of insightCategories) {
    entries.push({
      pageType: "insightCategory",
      title: category.title,
      slug: category.slug,
      canonicalPath: `/insights/${category.slug}/`,
      routeStatus: "confirmed",
      indexable: routes.insights.readyToIndex,
      contentStatus: "ai-draft",
      reviewStatus: "stakeholder-review-required",
      primaryAudience: "general",
      primaryIntent: `Organise ${category.title} articles`,
      primaryKeyword: `${category.title.toLowerCase()} insights`,
      metaTitle: `${category.title} Insights | Apex HR`,
      metaDescription: category.summary,
      h1: `${category.title} Insights`,
      parent: routes.insights.path,
      legalReviewRequired: false,
    });
  }

  entries.push({
    pageType: "resourcesHub",
    title: "Resources",
    slug: "",
    canonicalPath: routes.resources.path,
    routeStatus: routes.resources.status,
    indexable: routes.resources.readyToIndex,
    contentStatus: "ai-draft",
    reviewStatus: "stakeholder-review-required",
    primaryAudience: "general",
    primaryIntent: "Host downloadable resources for employers and candidates",
    primaryKeyword: "HR resources",
    metaTitle: "Resources | Apex HR",
    metaDescription: "Guides, reports and resources from Apex HR.",
    h1: "Resources",
    legalReviewRequired: false,
  });

  entries.push({
    pageType: "caseStudiesHub",
    title: "Case Studies",
    slug: "",
    canonicalPath: routes.caseStudies.path,
    routeStatus: routes.caseStudies.status,
    indexable: routes.caseStudies.readyToIndex,
    contentStatus: "ai-draft",
    reviewStatus: "stakeholder-review-required",
    primaryAudience: "employer",
    primaryIntent: "Present verified proof of Apex HR's work",
    primaryKeyword: "HR case studies",
    metaTitle: "Case Studies | Apex HR",
    metaDescription: "Verified results and case studies from Apex HR's work with employers.",
    h1: "Results for the employers we work with",
    legalReviewRequired: false,
  });

  entries.push({
    pageType: "expertsHub",
    title: "Experts",
    slug: "",
    canonicalPath: routes.experts.path,
    routeStatus: routes.experts.status,
    indexable: routes.experts.readyToIndex,
    contentStatus: "ai-draft",
    reviewStatus: "stakeholder-review-required",
    primaryAudience: "general",
    primaryIntent: "Introduce Apex HR's practitioners",
    primaryKeyword: "Apex HR experts",
    metaTitle: "Experts | Apex HR",
    metaDescription: "Meet the people behind Apex HR.",
    h1: "The people behind Apex HR",
    legalReviewRequired: false,
  });

  return entries;
}

export const contentManifest: ContentManifestEntry[] = buildManifest();
