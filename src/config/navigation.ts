import { routes } from "@/config/routes";
import type { CtaConfig, NavItem } from "@/types/navigation";

/**
 * Working navigation model per CLAUDE.md section 5, used until the
 * canonical information architecture is signed off.
 */
// SEO audit Phase 3 Batch 4 corrective pass: Insights is only listed once
// routes.insights.readyToIndex is true (the single source of truth in
// routes.ts) — while it stays an empty, noindex hub, showing it as a normal
// primary-nav destination would present it as a useful page when it isn't.
// Restores automatically the moment that route is approved indexable —
// nothing else about the route (status, sitemap inclusion) is affected.
export const primaryNavigation: NavItem[] = [
  { route: routes.services },
  { route: routes.sectors },
  { route: routes.forEmployers },
  { route: routes.forCandidates },
  ...(routes.insights.readyToIndex ? [{ route: routes.insights }] : []),
  { route: routes.about },
];

export const utilityNavigation: NavItem[] = [{ route: routes.contact }];

export const primaryCta: CtaConfig = {
  label: "Find Talent",
  route: routes.findTalent,
  analyticsId: "nav-find-talent",
};

export const candidateCta: CtaConfig = {
  label: "Search Jobs",
  route: routes.jobs,
  analyticsId: "nav-search-jobs",
};

export const footerNavigation = {
  // SEO audit Phase 3 Batch 5 preliminary correction: Case Studies is only
  // listed once routes.caseStudies.readyToIndex is true — see the same
  // rationale as Insights/Resources below.
  employers: [
    { route: routes.services },
    { route: routes.forEmployers },
    { route: routes.findTalent },
    { route: routes.sectors },
    ...(routes.caseStudies.readyToIndex ? [{ route: routes.caseStudies }] : []),
  ] satisfies NavItem[],
  candidates: [
    { route: routes.forCandidates },
    { route: routes.jobs },
    { route: routes.talentPool },
  ] satisfies NavItem[],
  // SEO audit Phase 3 Batch 4 corrective pass: Insights and Resources are
  // only listed once their route's readyToIndex is true — see the same
  // rationale on primaryNavigation above. Experts is unaffected here
  // (out of this correction's authorised scope) despite carrying the same
  // readyToIndex: false status.
  company: [
    { route: routes.about },
    ...(routes.insights.readyToIndex ? [{ route: routes.insights }] : []),
    ...(routes.resources.readyToIndex ? [{ route: routes.resources }] : []),
    { route: routes.experts },
    { route: routes.locations },
    { route: routes.contact },
  ] satisfies NavItem[],
};
