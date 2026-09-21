import type { ContentManifestEntry } from "@/types/content";
import { routes } from "@/config/routes";
import { getServicesByCategory, serviceCategories, services } from "@/config/services";
import { sectors } from "@/config/sectors";
import { locations, getLocation } from "@/config/locations";
import { buildComboMetaDescription, categoryLocationCombos, serviceLocationCombos } from "@/config/service-locations";
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
    metaDescription:
      "Apex HR is an employer-first HR company in the UK, combining outsourced HR support, recruitment and workforce advisory, with a separate pathway for candidates.",
    h1: "A people partner built for growing employers",
    relatedPages: [
      routes.services.path,
      routes.sectors.path,
      routes.forEmployers.path,
      routes.forCandidates.path,
      routes.findTalent.path,
    ],
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
    // URL-to-H1 alignment correction (docs/URL-DECISION-REGISTER.md D-017):
    // h1/metaTitle now match the actual rendered hero exactly —
    // `{title} Firm in the UK`, per ServiceCategoryTemplate's <h1> JSX —
    // rather than the bare family name this field previously (incorrectly)
    // recorded. The rendered <title> tag also carries the root layout's
    // " | Apex HR" template on top of this metaTitle value.
    // relatedPages lists the real links the page renders: every child
    // service plus each related family from content.relatedFamilySlugs.
    const childPaths = getServicesByCategory(category.slug).map((service) => `/services/${service.slug}/`);
    const relatedFamilyPaths = (content?.relatedFamilySlugs ?? []).map((slug) => `/services/${slug}/`);
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
      metaTitle: `${category.title} Firm in the UK | Apex HR`,
      metaDescription: content?.summary ?? "",
      h1: `${category.title} Firm in the UK`,
      parent: routes.services.path,
      relatedPages: [...childPaths, ...relatedFamilyPaths],
      legalReviewRequired: false,
    });
  }

  // SEO audit Phase 3 Batches 6A/6B/6C1/6C2: explicit principal-intent
  // phrases for the nineteen optimised children, overriding the generic
  // "Convert employer interest in X" fallback — matches each batch's
  // approved intent-ownership table, so e.g. Retained HR Services and HR
  // Compliance Audit no longer share a near-identical recorded intent.
  const primaryIntentOverrides: Record<string, string> = {
    // Batch 6A — Outsourced HR Services
    "retained-hr-services-firm-in-the-uk": "Ongoing retained HR support for UK employers",
    "hr-support-for-small-businesses-and-startups-firm-in-the-uk": "HR support for UK small businesses and startups",
    "fractional-hr-director-chief-people-officer-firm-in-the-uk": "Part-time senior HR leadership",
    "hr-compliance-audit-firm-in-the-uk": "Review of an organisation's HR compliance, policies and processes",
    "employee-handbooks-and-hr-policies-firm-in-the-uk": "Creation and review of employee handbooks and workplace policies",
    "payroll-advisory-firm-in-the-uk": "HR-focused payroll guidance and process support",
    // Batch 6B — Recruitment & Talent Acquisition
    "permanent-recruitment-firm-in-the-uk": "Recruitment support for permanent employees",
    "executive-search-firm-in-the-uk": "Search and recruitment for senior, executive and leadership appointments",
    "contract-staffing-firm-in-the-uk": "Recruitment support for temporary, interim or contract staffing needs",
    "recruitment-process-outsourcing-rpo-firm-in-the-uk": "Outsourcing some or all recruitment-process activity",
    "graduate-schemes-and-early-careers-design-firm-in-the-uk": "Designing structured graduate and early-career recruitment programmes",
    // Batch 6C1 — Employment Law & Employee Relations (first four)
    "redundancy-and-restructuring-support-firm-in-the-uk": "HR process and people support during redundancy or organisational restructuring",
    "tupe-advisory-firm-in-the-uk": "HR and people-process support for organisational transfers where TUPE may be relevant",
    "workplace-investigations-firm-in-the-uk": "Structured workplace fact-finding and investigation support",
    "workplace-mediation-and-conflict-resolution-firm-in-the-uk": "Facilitated workplace mediation and conflict-resolution support",
    // Batch 6C2 — Employment Law & Employee Relations (remaining four)
    "employment-tribunal-hr-support-firm-in-the-uk": "HR documentation, process and management support connected with employment tribunal matters",
    "outplacement-and-career-transition-services-firm-in-the-uk": "Employer-funded support for employees leaving an organisation and moving towards new employment",
    "industrial-relations-and-trade-union-negotiations-firm-in-the-uk": "Employer-side HR support for trade-union engagement and collective workplace matters",
    "skilled-worker-sponsorship-hr-support-firm-in-the-uk": "HR process and workforce support connected with UK Skilled Worker sponsorship",
    // Batch 6D — Organisation Development & Change Management
    "organisation-design-firm-in-the-uk": "Designing organisational structures, roles, responsibilities and ways of working",
    "change-management-firm-in-the-uk": "Supporting the people side of organisational change and adoption",
    "culture-transformation-firm-in-the-uk": "Assessing and intentionally developing workplace culture and behaviours",
    "ma-people-due-diligence-and-post-merger-integration-firm-in-the-uk": "Identifying and managing people-related considerations before and after mergers or acquisitions",
    // Batch 6E1 — Compensation, Reward & Benefits (first three)
    "salary-benchmarking-firm-in-the-uk": "Comparing roles and pay against relevant external market data",
    "job-evaluation-and-pay-structures-firm-in-the-uk": "Assessing role value and developing consistent job grades, pay bands or structures",
    "reward-strategy-firm-in-the-uk": "Developing an organisation-wide approach to pay, recognition, incentives and benefits",
    // Batch 6E2 — Compensation, Reward & Benefits (remaining three)
    "pay-equity-and-pay-gap-reporting-firm-in-the-uk": "Reviewing pay patterns and supporting appropriate pay-gap analysis and reporting",
    "employee-benefits-consulting-firm-in-the-uk": "Helping employers review and develop employee-benefits arrangements",
    "executive-compensation-and-share-schemes-firm-in-the-uk": "Supporting the design and governance of executive reward and employee share arrangements",
    // Batch 6F — Learning & Leadership Development
    "leadership-and-management-training-firm-in-the-uk": "Structured training for managers and organisational leaders",
    "executive-coaching-and-360-feedback-firm-in-the-uk": "Individual leadership coaching and structured multi-source feedback",
    "learning-strategy-and-capability-development-firm-in-the-uk": "Organisation-wide learning strategy and workforce capability planning",
    // Batch 6G — Performance & Talent Management
    "performance-management-firm-in-the-uk": "Designing and improving structured employee-performance processes",
    "succession-planning-and-talent-mapping-firm-in-the-uk": "Identifying critical roles, succession needs and internal talent considerations",
    "competency-frameworks-firm-in-the-uk": "Defining the skills, knowledge and behaviours associated with roles or organisational levels",
    // Batch 6H — Employee Experience & Engagement
    "employee-experience-strategy-firm-in-the-uk": "Designing a coherent employee-experience approach across relevant stages of the employee journey",
    "employee-engagement-surveys-and-action-planning-firm-in-the-uk": "Supporting the design, delivery and interpretation of employee-engagement surveys and turning findings into practical action planning",
    "employer-branding-and-employee-value-proposition-evp-firm-in-the-uk": "Helping an employer define and communicate what it offers employees and prospective employees",
    "workplace-wellbeing-and-mental-health-firm-in-the-uk": "HR-led support for workplace wellbeing and organisational approaches to mental-health-related work issues",
    "diversity-equity-and-inclusion-dei-consulting-firm-in-the-uk": "Organisational HR support for diversity, equity and inclusion strategy, policies, practices and implementation",
    // Final consolidated phase — HR Technology & People Analytics
    "hris-implementation-firm-in-the-uk": "Planning and implementing a Human Resources Information System (HRIS)",
    "hr-software-selection-firm-in-the-uk": "Helping employers define requirements and assess suitable HR software",
    "people-analytics-and-hr-dashboards-firm-in-the-uk": "Defining workforce measures, analysing people data and presenting useful HR reporting",
    "digital-hr-transformation-firm-in-the-uk": "Wider organisational change involving HR technology, processes, data and working practices",
    "ai-workplace-policy-and-hr-integration-firm-in-the-uk": "Workplace policy, governance and HR-process considerations involving artificial intelligence",
    // Final consolidated phase — Strategic HR & Workforce Advisory
    "people-strategy-firm-in-the-uk": "Helping employers align people priorities with organisational needs",
    "strategic-workforce-planning-firm-in-the-uk": "Considering future workforce demand, supply, capability, skills and possible scenarios",
    "global-mobility-and-expatriate-hr-management-firm-in-the-uk": "HR coordination for employees working across borders",
  };

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
      primaryIntent: primaryIntentOverrides[service.slug] ?? `Convert employer interest in ${service.title}`,
      primaryKeyword: content.primaryKeyword,
      metaTitle: `${service.title} Firm in the UK | Apex HR`,
      metaDescription: content.metaDescription,
      h1: `${service.title} Firm in the UK`,
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
      metaTitle: `HR Company for ${sector.title} in the UK | Apex HR`,
      metaDescription: content.metaDescription,
      h1: `HR Company for ${sector.title} in the UK`,
      parent: routes.sectors.path,
      relatedPages: content.relatedServiceSlugs.map((slug) => `/services/${slug}/`),
      legalReviewRequired: false,
    });
  }

  entries.push({
    pageType: "locationHub",
    title: "Locations",
    slug: "",
    canonicalPath: routes.locations.path,
    routeStatus: routes.locations.status,
    indexable: routes.locations.readyToIndex,
    contentStatus: "ai-draft",
    reviewStatus: "stakeholder-review-required",
    primaryAudience: "employer",
    primaryIntent: "Let employers find location-specific HR and recruitment coverage",
    primaryKeyword: "locations we support",
    metaTitle: "Locations We Support | Apex HR",
    metaDescription: "Explore the UK locations Apex HR can support with HR and recruitment.",
    h1: "HR and recruitment support across the UK",
    legalReviewRequired: false,
  });

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
      parent: routes.locations.path,
      legalReviewRequired: false,
    });
  }

  // Curated service/category + location combination pages — see
  // docs/URL-DECISION-REGISTER.md D-014 and src/config/service-locations.ts.
  for (const combo of serviceLocationCombos) {
    const service = services.find((entry) => entry.slug === combo.serviceSlug);
    const content = serviceContent.find((entry) => entry.slug === combo.serviceSlug);
    const location = getLocation(combo.locationSlug);
    const locationInfo = locationContent.find((entry) => entry.slug === combo.locationSlug);
    if (!service || !content || !location || !locationInfo) continue;
    entries.push({
      pageType: "serviceLocation",
      title: `${service.title} in ${location.title}`,
      slug: combo.slug,
      canonicalPath: `/services/${combo.slug}/`,
      routeStatus: "confirmed",
      indexable: true,
      contentStatus: "ai-draft",
      reviewStatus: "stakeholder-review-required",
      primaryAudience: "employer",
      primaryIntent: `Explain ${service.title} coverage in ${location.title}`,
      primaryKeyword: `${service.title.toLowerCase()} ${location.title.toLowerCase()}`,
      metaTitle: `${service.title} in ${location.title} | Apex HR`,
      metaDescription: buildComboMetaDescription(content.metaDescription, location.title, locationInfo.region),
      h1: `${service.title} in ${location.title}`,
      parent: `/services/${service.slug}/`,
      legalReviewRequired: content.legalReviewRequired,
    });
  }

  for (const combo of categoryLocationCombos) {
    const category = serviceCategories.find((entry) => entry.slug === combo.categorySlug);
    const content = serviceCategoryContent.find((entry) => entry.slug === combo.categorySlug);
    const location = getLocation(combo.locationSlug);
    const locationInfo = locationContent.find((entry) => entry.slug === combo.locationSlug);
    if (!category || !content || !location || !locationInfo) continue;
    entries.push({
      pageType: "serviceCategoryLocation",
      title: `${category.title} in ${location.title}`,
      slug: combo.slug,
      canonicalPath: `/services/${combo.slug}/`,
      routeStatus: "confirmed",
      indexable: true,
      contentStatus: "ai-draft",
      reviewStatus: "stakeholder-review-required",
      primaryAudience: "employer",
      primaryIntent: `Explain ${category.title} coverage in ${location.title}`,
      primaryKeyword: `${category.title.toLowerCase()} ${location.title.toLowerCase()}`,
      metaTitle: `${category.title} in ${location.title} | Apex HR`,
      metaDescription: buildComboMetaDescription(content.summary, location.title, locationInfo.region),
      h1: `${category.title} in ${location.title}`,
      parent: `/services/${category.slug}/`,
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
    /**
     * Real rendered <title>/H1 for pages rebuilt with bespoke marketing
     * copy (About/Contact/For Employers/For Candidates) — per SEO audit
     * Batch 1, synchronising this data with the live pages after it was
     * found to still record the pre-rebuild generic route.label values.
     * Falls back to the generic route.label derivation when omitted
     * (Find Talent/Jobs/Talent Pool still use their InfoPageTemplate
     * heading as both, which happens to equal route.label today).
     */
    title?: string;
    h1?: string;
    /**
     * SEO audit Phase 3 Batch 4: explicit principal-intent phrase for the
     * five core pages' keyword-to-URL map, overriding the generic
     * `route.label.toLowerCase()` fallback (which produced weak single-word
     * values like "employers"/"candidates" for these specific pages).
     */
    primaryKeyword?: string;
    /** SEO audit Phase 3 Batch 4: real internal links added/confirmed on the page. */
    relatedPages?: string[];
  }> = [
    {
      pageType: "generalInformation",
      route: routes.about,
      audience: "general",
      lead: aboutPageContent.lead,
      intent: "Explain what Apex HR is, its employer-first approach and its separate candidate pathway",
      // No `title` override: the real page now passes a bare "About" to
      // buildMetadata() (SEO audit Batch 2 item 1), so the generic
      // route.label fallback below already produces the correct
      // "About | Apex HR" — an explicit override here would just
      // reintroduce the "About Apex HR | Apex HR" duplication bug.
      h1: "A people partner that works alongside you",
      primaryKeyword: "About Apex HR and its approach",
      relatedPages: [routes.services.path, routes.contact.path],
    },
    {
      pageType: "generalInformation",
      route: routes.contact,
      audience: "general",
      lead: contactPageContent.lead,
      intent: "Give employers and candidates a way to get in touch with Apex HR in London, UK",
      h1: "Let's talk about what your people need next.",
      primaryKeyword: "Contact Apex HR in London, UK",
      relatedPages: [routes.forEmployers.path, routes.forCandidates.path, routes.findTalent.path],
    },
    {
      pageType: "employerLanding",
      route: routes.forEmployers,
      audience: "employer",
      lead: forEmployersPageContent.lead,
      intent: "Orient employers toward the right HR or recruitment support and route to Find Talent/Contact",
      title: "HR & Recruitment Support for Employers",
      h1: "The right people support, exactly when you need it",
      primaryKeyword: "HR support and recruitment support for UK employers",
      relatedPages: [routes.services.path, routes.findTalent.path, routes.contact.path],
    },
    {
      pageType: "candidateLanding",
      route: routes.forCandidates,
      audience: "candidate",
      lead: forCandidatesPageContent.lead,
      intent: "Orient candidates toward current opportunities, the talent pool and the candidate journey",
      title: "Candidate Support & Opportunities",
      h1: "Make your next move count",
      primaryKeyword: "Apex HR candidate support, opportunities and candidate journey",
      relatedPages: [routes.jobs.path, routes.talentPool.path],
    },
    { pageType: "conversionLanding", route: routes.findTalent, audience: "employer", lead: findTalentPageContent.lead, intent: "Capture an employer hiring enquiry" },
    { pageType: "conversionLanding", route: routes.jobs, audience: "candidate", lead: jobsPageContent.lead, intent: "Let candidates find current vacancies" },
    { pageType: "conversionLanding", route: routes.talentPool, audience: "candidate", lead: talentPoolPageContent.lead, intent: "Capture candidate interest for future roles" },
  ];

  for (const page of supportingPages) {
    const title = page.title ?? page.route.label;
    entries.push({
      pageType: page.pageType,
      title,
      slug: page.route.id,
      canonicalPath: page.route.path,
      routeStatus: page.route.status,
      indexable: page.route.readyToIndex,
      contentStatus: "ai-draft",
      reviewStatus: "stakeholder-review-required",
      primaryAudience: page.audience,
      primaryIntent: page.intent,
      primaryKeyword: page.primaryKeyword ?? page.route.label.toLowerCase(),
      metaTitle: `${title} | Apex HR`,
      metaDescription: page.lead,
      h1: page.h1 ?? page.route.label,
      relatedPages: page.relatedPages,
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
