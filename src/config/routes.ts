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
 * regardless of content quality. Note: there is no `/talent-acquisition/`
 * hub route anywhere in the register — only the dynamic `[slug]` pattern
 * is approved for that family, so no entry for it exists here or in
 * src/app. A `/locations/` hub route was added by explicit later user
 * instruction (see docs/URL-DECISION-REGISTER.md D-013) — update
 * docs/MASTER-SITEMAP.md section 9 and the master workbook to match if
 * this route ever changes.
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
  locations: {
    id: "locations",
    label: "Locations",
    path: "/locations/",
    status: "confirmed",
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
    // Promoted from Provisional per explicit stakeholder approval
    // (SEO audit Batch 1): bespoke content now meets the Confirmed
    // content-readiness bar per CLAUDE.md section 2 item 8/section 31.
    status: "confirmed",
    readyToIndex: true,
  },
  forCandidates: {
    id: "for-candidates",
    label: "Candidates",
    path: "/for-candidates/",
    // Promoted from Provisional per explicit stakeholder approval
    // (SEO audit Batch 1): bespoke content now meets the Confirmed
    // content-readiness bar per CLAUDE.md section 2 item 8/section 31.
    status: "confirmed",
    readyToIndex: true,
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
  // insights/resources/caseStudies: the routes and their URLs are approved
  // (status stays "confirmed"), but per this file's own documented rule
  // above ("Confirmed... routes with genuine authored content are
  // indexable"), a route being Confirmed doesn't by itself make it
  // indexable if there's no real content behind it yet. Each page's own
  // generateMetadata() reads readyToIndex directly, so flipping it here is
  // the single source of truth for both its <meta robots> tag and
  // sitemap.ts inclusion — no second place needs updating.
  //
  // insights: flipped to true (docs/URL-DECISION-REGISTER.md D-016) once
  // WordPress became the live source of truth for this route and genuine
  // published articles existed to index — not automatic, an explicit
  // status change made at that point. /resources/ and /case-study/ remain
  // false below: both still render only an honest "nothing published yet"
  // EmptyEditorialState, since no resources or case studies exist yet.
  // Flip each back to true the first time real content is published there.
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
    readyToIndex: false,
  },
  caseStudies: {
    id: "case-study",
    label: "Case Studies",
    path: "/case-study/",
    status: "confirmed",
    readyToIndex: false,
  },
  experts: {
    id: "experts",
    label: "Experts",
    path: "/experts/",
    status: "provisional",
    readyToIndex: false,
  },
  // Added per explicit later user instruction (Privacy Policy
  // implementation): real, complete policy content, so Confirmed +
  // indexable per this file's own documented rule above. The
  // "privacy-policy" segment was already reserved in
  // src/config/reserved-slugs.ts in anticipation of this route.
  privacyPolicy: {
    id: "privacy-policy",
    label: "Privacy Policy",
    path: "/privacy-policy/",
    status: "confirmed",
    readyToIndex: true,
  },
} as const satisfies Record<string, RouteRecord>;

export type RouteKey = keyof typeof routes;
