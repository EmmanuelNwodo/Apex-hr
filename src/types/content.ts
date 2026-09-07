import type { RouteStatus } from "./route";

/**
 * Shared content-manifest types for Phase 3's CMS-ready architecture.
 * These are the local, typed equivalent of the Sanity schemas described in
 * docs/CONTENT-MODEL.md — a temporary fallback pending live Sanity
 * integration (see src/lib/sanity/). Field names deliberately mirror
 * CONTENT-MODEL.md's `routeIdentity`, `seoFields` and `editorialWorkflow`
 * objects so a future migration can map these records directly onto
 * Sanity documents.
 */

export type PageType =
  | "home"
  | "serviceHub"
  | "serviceCategory"
  | "service"
  | "sectorHub"
  | "sector"
  | "locationHub"
  | "location"
  | "talentAcquisitionHub"
  | "talentAcquisitionRole"
  | "employerLanding"
  | "candidateLanding"
  | "insightsHub"
  | "insightCategory"
  | "resourcesHub"
  | "caseStudiesHub"
  | "expertsHub"
  | "generalInformation"
  | "conversionLanding";

/**
 * Internal editorial workflow state — never rendered to public users.
 * Mirrors docs/CONTENT-MODEL.md section 4.2 `workflowStatus`, narrowed to
 * the two values relevant to this phase's AI-authored first drafts.
 */
export type ContentStatus = "ai-draft" | "stakeholder-approved";

/** Internal review-gate state — never rendered to public users. */
export type ReviewStatus = "stakeholder-review-required" | "in-review" | "approved";

export type PrimaryAudience = "employer" | "candidate" | "general";

export interface ContentManifestEntry {
  pageType: PageType;
  title: string;
  slug: string;
  canonicalPath: string;
  routeStatus: RouteStatus;
  /** Whether this route should appear in the XML sitemap and be indexable. */
  indexable: boolean;
  contentStatus: ContentStatus;
  reviewStatus: ReviewStatus;
  primaryAudience: PrimaryAudience;
  primaryIntent: string;
  primaryKeyword: string;
  secondaryKeywords?: string[];
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** Canonical path of the parent page, if any. */
  parent?: string;
  relatedPages?: string[];
  sourceReferences?: string[];
  legalReviewRequired: boolean;
}

/** A short, generic FAQ pair reused across service/sector/role/location templates. */
export interface ContentFaqItem {
  id: string;
  question: string;
  answer: string;
}

/** A single related-content reference (service, sector, role, etc.). */
export interface RelatedLink {
  label: string;
  href: string;
}
