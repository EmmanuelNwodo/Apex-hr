import type { RouteRecord } from "@/types/route";

/**
 * Routes implemented across phases, keyed for reference from navigation,
 * breadcrumbs, sitemap.ts and robots.ts. Statuses and paths are taken
 * directly from docs/MASTER-SITEMAP.md and docs/URL-DECISION-REGISTER.md,
 * cross-checked against the Master Routes sheet of
 * docs/Apex_HR_Master_Sitemap_and_URL_Register.xlsx (1,087 rows) — do not
 * edit a `path` here without updating those documents first.
 *
 * `readyToIndex` follows this phase's explicit rule (see the Phase 3
 * prompt section 5): Confirmed/Corrected routes with genuine authored
 * content are indexable; Provisional routes stay out of the sitemap
 * regardless of content quality. Note: there is no `/locations/` or
 * `/talent-acquisition/` hub route anywhere in the register — only the
 * dynamic `[slug]` pattern is approved for those two families — so no
 * entry for either hub exists here or in src/app.
 */
export const routes = {
  home: {
    id: "home",
    label: "Home",
    path: "/",
    status: "confirmed",
    readyToIndex: true,
  },
  services: {
    id: "services",
    label: "Services",
    path: "/services/",
    status: "confirmed",
    readyToIndex: true,
  },
  sectors: {
    id: "sectors",
    label: "Sectors",
    path: "/sector/",
    status: "corrected",
    readyToIndex: true,
  },
  about: {
    id: "about",
    label: "About",
    path: "/about/",
    status: "confirmed",
    readyToIndex: true,
  },
  contact: {
    id: "contact",
    label: "Contact",
    path: "/contact/",
    status: "corrected",
    readyToIndex: true,
  },
  forEmployers: {
    id: "for-employers",
    label: "Employers",
    path: "/for-employers/",
    status: "provisional",
    readyToIndex: false,
  },
  forCandidates: {
    id: "for-candidates",
    label: "Candidates",
    path: "/for-candidates/",
    status: "provisional",
    readyToIndex: false,
  },
  jobs: {
    id: "jobs",
    label: "Jobs",
    path: "/jobs/",
    status: "provisional",
    readyToIndex: false,
  },
  talentPool: {
    id: "talent-pool",
    label: "Talent Pool",
    path: "/talent-pool/",
    status: "provisional",
    readyToIndex: false,
  },
  findTalent: {
    id: "find-talent",
    label: "Find Talent",
    path: "/find-talent/",
    status: "provisional",
    readyToIndex: false,
  },
  insights: {
    id: "insights",
    label: "Insights",
    path: "/insights/",
    status: "confirmed",
    readyToIndex: true,
  },
  resources: {
    id: "resources",
    label: "Resources",
    path: "/resources/",
    status: "confirmed",
    readyToIndex: true,
  },
  caseStudies: {
    id: "case-study",
    label: "Case Studies",
    path: "/case-study/",
    status: "confirmed",
    readyToIndex: true,
  },
  experts: {
    id: "experts",
    label: "Experts",
    path: "/experts/",
    status: "provisional",
    readyToIndex: false,
  },
} as const satisfies Record<string, RouteRecord>;

export type RouteKey = keyof typeof routes;
