import { routes } from "@/config/routes";
import type { CtaConfig, NavItem } from "@/types/navigation";

/**
 * Working navigation model per CLAUDE.md section 5, used until the
 * canonical information architecture is signed off.
 */
export const primaryNavigation: NavItem[] = [
  { route: routes.services },
  { route: routes.sectors },
  { route: routes.forEmployers },
  { route: routes.forCandidates },
  { route: routes.insights },
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
  employers: [
    { route: routes.services },
    { route: routes.forEmployers },
    { route: routes.findTalent },
    { route: routes.sectors },
    { route: routes.caseStudies },
  ] satisfies NavItem[],
  candidates: [
    { route: routes.forCandidates },
    { route: routes.jobs },
    { route: routes.talentPool },
  ] satisfies NavItem[],
  company: [
    { route: routes.about },
    { route: routes.insights },
    { route: routes.resources },
    { route: routes.experts },
    { route: routes.contact },
  ] satisfies NavItem[],
};
