import { serviceCategories } from "@/config/services";
import { sectors } from "@/config/sectors";
import { routes } from "@/config/routes";
import { sectorImages } from "@/lib/sector-images";

/**
 * Typed homepage content layer — a temporary local fallback pending live
 * Sanity integration. Field names intentionally mirror the `homePage`
 * schema in docs/CONTENT-MODEL.md section 8.4 (hero, trustAndCredibility,
 * employerNeedSelector, ...) so a future Sanity query result can be mapped
 * into these same shapes with minimal rework.
 *
 * Do not add unverified statistics, client names, testimonials, case
 * studies, awards, accreditations, addresses or biographies here — see
 * CLAUDE.md section 2 and DESIGN.md section 30. Anything below marked
 * "TODO: Replace with stakeholder-approved CMS content" is draft/temporary
 * and must not be treated as verified fact.
 */

export interface CtaLink {
  label: string;
  href: string;
  analyticsId?: string;
}

// --- Hero ---------------------------------------------------------------

export interface HeroContent {
  kicker: string;
  heading: string;
  description: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  candidateLink: CtaLink;
}

// TODO: Replace with stakeholder-approved CMS content once copy is signed off.
export const hero: HeroContent = {
  kicker: "HR Company in the UK",
  heading: "A people partner built for growing employers",
  description:
    "Apex HR helps UK employers hire, manage and develop people with confidence, from outsourced HR support to executive search and strategic workforce advisory.",
  primaryCta: { label: "Find Talent", href: routes.findTalent.path, analyticsId: "hero-find-talent" },
  secondaryCta: { label: "Meet Apex HR", href: routes.about.path, analyticsId: "hero-meet-apex" },
  candidateLink: { label: "Search Jobs", href: routes.jobs.path, analyticsId: "hero-search-jobs" },
};

// Short, generic, non-quantified capability labels for the hero's lower-left
// trust-indicator row — not claims of scale, awards or specific results, so
// no verification gate applies (contrast `trust.stats` below, which are
// explicit placeholder statistics).
export const heroTrustIndicators: string[] = ["UK-wide support", "Practical HR expertise", "Built around your business"];

// --- Hero media: workplace facts -------------------------------------------

// General workplace/HR insights, not claims about Apex HR itself — supplied
// verbatim for the auto-rotating fact card overlaid on the hero media panel.
export const workplaceFacts: string[] = [
  "Positive workplace culture is created through everyday actions, not office decorations or slogans alone.",
  "A well-written job description can attract more suitable applicants.",
  "Short breaks can help employees return to tasks with better focus.",
  "Workplace friendships can improve collaboration and employee engagement.",
  "Employees often value sincere recognition as much as financial rewards.",
  "A structured interview process can make recruitment decisions fairer.",
  "Diverse teams can bring different perspectives to workplace challenges.",
];

// --- Trust and credibility ------------------------------------------------

export type TrustPillarIcon = "connected" | "practical" | "partnership";

export interface TrustCapabilityStatement {
  id: string;
  icon: TrustPillarIcon;
  /** Short pillar heading (e.g. "One connected partner"). */
  title: string;
  detail: string;
}

export interface TrustStat {
  id: string;
  value: string;
  suffix?: string;
  /** Short uppercase tag shown above the value (e.g. "HR excellence"). */
  category?: string;
  label: string;
  /** Longer supporting sentence shown only for a featured/highlighted stat. */
  note?: string;
}

export interface TrustApproachHighlight {
  category: string;
  note: string;
}

export interface TrustContent {
  kicker: string;
  heading: string;
  description: string;
  /**
   * Safe, non-quantified capability statements — not statistics, logos or
   * accreditations, none of which are verified yet. Replace with real
   * verified proof (per DESIGN.md 17.2) as soon as it is approved; do not
   * add a number, client name or accreditation here until then.
   */
  capabilityStatements: TrustCapabilityStatement[];
  /**
   * PLACEHOLDER — NOT VERIFIED. CLAUDE.md section 11 and DESIGN.md 17.2
   * require every trust-section statistic to be real and evidenced before
   * publication; these values are illustrative layout content only,
   * requested for a stat-card visual reference (contentStatus: "ai-draft",
   * reviewStatus: "stakeholder-review-required" — see docs/CONTENT-MODEL.md
   * and section 31). Do not let these numbers reach production without a
   * stakeholder supplying and approving real figures.
   */
  stats: TrustStat[];
  /** Fifth, non-quantified proof-panel tile — no number, so no verification gate. */
  approachHighlight: TrustApproachHighlight;
}

// TODO: Replace with verified statistics, accreditations or client logos once approved.
export const trust: TrustContent = {
  kicker: "Why employers work with us",
  heading: "One partner across HR and recruitment",
  description:
    "Practical people expertise that works in the real world, not advice that simply sits in a report.",
  capabilityStatements: [
    {
      id: "single-partner",
      icon: "connected",
      title: "One connected partner",
      detail: "HR advisory and recruitment delivered as one joined-up service.",
    },
    {
      id: "practical-guidance",
      icon: "practical",
      title: "Advice managers can use",
      detail: "Clear, practical guidance designed for action, not filing away.",
    },
    {
      id: "embedded-support",
      icon: "partnership",
      title: "Alongside your team",
      detail: "Experienced advisers who stay close from recommendation to delivery.",
    },
  ],
  // PLACEHOLDER figures — see TrustContent.stats doc comment above. Not verified.
  stats: [
    { id: "years", value: "8", suffix: "+", category: "HR excellence", label: "Years of experience" },
    { id: "organisations", value: "100", suffix: "+", category: "Partnerships", label: "Organisations supported" },
    {
      id: "retention",
      value: "98",
      suffix: "%",
      category: "Client retention rate",
      label: "Client retention rate",
      note: "Long-term partnerships built on responsive, dependable support.",
    },
    { id: "markets", value: "20", suffix: "+", category: "Global reach", label: "Markets served" },
  ],
  approachHighlight: {
    category: "Our approach",
    note: "Flexible expertise that feels like part of your team.",
  },
};

// --- Partner brands ---------------------------------------------------------

export interface PartnerBrand {
  name: string;
  imageSrc: string;
}

// Logo files supplied directly in public/images/partner-brands — per
// CLAUDE.md section 3, explicit stakeholder-supplied assets take priority
// over the general "do not fabricate client claims" default, so these are
// treated as approved evidence of real client relationships rather than
// placeholder content. Order matches the supplied files. These are the
// background-removed replacement set supplied 9 September 2026 — the
// earlier file set included five brands (Flutterwave, Paystack,
// Interswitch, Carbon, Prune) that are not present in this replacement
// set, so they are omitted here rather than left pointing at deleted files.
export const partnerBrands: PartnerBrand[] = [
  { name: "Kuda", imageSrc: "/images/partner-brands/Kuda.png" },
  { name: "Opay", imageSrc: "/images/partner-brands/Opay.png" },
  { name: "PalmPay", imageSrc: "/images/partner-brands/Palmpay.png" },
  { name: "Moniepoint", imageSrc: "/images/partner-brands/moniepoint2.png" },
  { name: "Wise", imageSrc: "/images/partner-brands/wise2.png" },
  { name: "dLocal", imageSrc: "/images/partner-brands/dlocal.png" },
  { name: "AZA Finance", imageSrc: "/images/partner-brands/aza_finance.png" },
  { name: "PiggyVest", imageSrc: "/images/partner-brands/piggyvest.png" },
  { name: "LemFi", imageSrc: "/images/partner-brands/lemfi2.png" },
  { name: "Cellulant", imageSrc: "/images/partner-brands/Cellulant.png" },
  { name: "Patricia", imageSrc: "/images/partner-brands/patricia.png" },
  { name: "Paxful", imageSrc: "/images/partner-brands/paxful.png" },
  { name: "Raenest", imageSrc: "/images/partner-brands/raenest2.png" },
  { name: "Propellerplate", imageSrc: "/images/partner-brands/propellerplate.png" },
  { name: "Jeriod", imageSrc: "/images/partner-brands/jeriod.png" },
];

// --- Employer need selector -----------------------------------------------

export interface EmployerNeed {
  id: string;
  label: string;
  description: string;
  serviceLabel: string;
  href: string;
}

// Per CLAUDE.md section 11: hire / HR support / strategic people advice.
export const employerNeeds: EmployerNeed[] = [
  {
    id: "hire",
    label: "I need to hire",
    description: "Find candidates through Apex HR recruitment and search.",
    serviceLabel: "Recruitment & Talent Acquisition",
    href: routes.findTalent.path,
  },
  {
    id: "hr-support",
    label: "I need HR support",
    description: "Outsourced HR, compliance and day-to-day people support.",
    serviceLabel: "Outsourced HR Services",
    href: routes.services.path,
  },
  {
    id: "strategic-advice",
    label: "I need strategic people advice",
    description: "Workforce planning, organisation design and change.",
    serviceLabel: "Strategic HR & Workforce Advisory",
    href: routes.contact.path,
  },
];

// Supporting copy and CTA for the need-selector intro column.
export const needSelectorIntro: { description: string; adviserCta: CtaLink; exploreCta: CtaLink } = {
  description:
    "Choose the option that best describes what you need from Apex HR, and we'll point you to the right service.",
  adviserCta: {
    label: "Not sure? Speak to an adviser",
    href: routes.contact.path,
    analyticsId: "need-selector-speak-to-adviser",
  },
  // SEO audit Phase 3 Batch 4: a prominent, descriptively-anchored body
  // link to /for-employers/ — previously only reachable from the homepage
  // via the global header nav, not from any homepage body content.
  exploreCta: {
    label: "See the full picture of employer support",
    href: routes.forEmployers.path,
    analyticsId: "need-selector-for-employers",
  },
};

// --- Employer problems ------------------------------------------------------

export type EmployerProblemIcon = "compliance" | "hiring" | "reward" | "leadership";

export interface EmployerProblem {
  id: string;
  icon: EmployerProblemIcon;
  /** Short problem statement shown in the selectable list. */
  problem: string;
  /** Positive, solution-framed heading shown once this problem is selected. */
  solutionTitle: string;
  detail: string;
  serviceLabel: string;
  href: string;
}

// contentStatus: ai-draft / reviewStatus: stakeholder-review-required
// (CLAUDE.md section 31) — original problem/solution copy, no claims or figures.
export const employerProblems: EmployerProblem[] = [
  {
    id: "compliance-risk",
    icon: "compliance",
    problem: "Compliance and employment law risk",
    solutionTitle: "Stay compliant as employment law changes.",
    detail:
      "Keep policies, contracts and people processes current, consistent and legally sound, before small gaps become costly risks.",
    serviceLabel: "HR Compliance Audit",
    href: "/services/hr-compliance-audit/",
  },
  {
    id: "slow-hiring",
    icon: "hiring",
    problem: "Slow, costly hiring",
    solutionTitle: "Hire the right people, without costly delays.",
    detail:
      "Reduce long vacancies and avoid poor-fit hires with a focused recruitment process built around the role and your organisation.",
    serviceLabel: "Permanent Recruitment",
    href: "/services/permanent-recruitment/",
  },
  {
    id: "unclear-reward",
    icon: "reward",
    problem: "Unclear reward and pay structures",
    solutionTitle: "Build a fair and defensible pay structure.",
    detail:
      "Bring consistency to pay decisions with robust market benchmarking, clear salary bands and an approach employees can trust.",
    serviceLabel: "Salary Benchmarking",
    href: "/services/salary-benchmarking/",
  },
  {
    id: "leadership-gaps",
    icon: "leadership",
    problem: "Leadership capability gaps",
    solutionTitle: "Give managers the skills to lead well.",
    detail:
      "Develop confident people leaders who can communicate clearly, manage performance and bring out the best in their teams.",
    serviceLabel: "Leadership & Management Training",
    href: "/services/leadership-and-management-training/",
  },
];

// --- HR services overview ---------------------------------------------------

export interface FeaturedServiceGroup {
  slug: string;
  title: string;
  href: string;
  description: string;
  imageSrc: string;
}

// Featured subset per DESIGN.md 17.5 — avoid listing all 10 families here.
// Sourced from the canonical taxonomy in src/config/services.ts, not duplicated.
// contentStatus: ai-draft / reviewStatus: stakeholder-review-required
// (CLAUDE.md section 31) — original, non-quantified capability summaries for
// each Confirmed service category; no claims, figures or outcomes asserted.
const featuredServiceCategories: Record<string, { description: string; imageSrc: string }> = {
  "outsourced-hr-services": {
    description:
      "Ongoing HR support from an embedded partner who knows your business, covering everything from day-to-day people queries to full HR management.",
    imageSrc: "/images/outsourced-hr-services.png",
  },
  "recruitment-talent-acquisition": {
    description:
      "Permanent, contract and executive hiring delivered by recruiters who understand HR as well as talent, so you find the right people without compromising on fit.",
    imageSrc: "/images/recruitment-talent-acquisition.png",
  },
  "employment-law-and-employee-relations": {
    description:
      "Practical, informed support through redundancies, investigations, disputes and tribunal processes, so sensitive situations are handled with confidence.",
    imageSrc: "/images/employment-law-and-employee-relations.png",
  },
  "compensation-reward-and-benefits": {
    description:
      "Salary benchmarking, pay structures and reward strategy that keep your offer competitive and fair, helping you attract and retain the people you need.",
    imageSrc: "/images/compensation-reward-and-benefits.png",
  },
  "learning-and-leadership-development": {
    description:
      "Leadership training, coaching and capability programmes built around your people's real challenges, developing managers who get the best from their teams.",
    imageSrc: "/images/learning-and-leadership-development.png",
  },
  "strategic-hr-and-workforce-advisory": {
    description:
      "People strategy and workforce planning that align your HR function with where the business is heading, so you can plan ahead with confidence.",
    imageSrc: "/images/strategic-hr-and-workforce-advisory.png",
  },
};

export const featuredServiceGroups: FeaturedServiceGroup[] = serviceCategories
  .filter((category) => category.slug in featuredServiceCategories)
  .map((category) => ({
    slug: category.slug,
    title: category.title,
    href: `/services/${category.slug}/`,
    ...featuredServiceCategories[category.slug],
  }));

// --- Recruitment spotlight ---------------------------------------------------

export interface RecruitmentFeature {
  title: string;
  href: string;
}

export interface RecruitmentSpotlightContent {
  kicker: string;
  heading: string;
  description: string;
  cta: CtaLink;
  features: RecruitmentFeature[];
}

// TODO: Replace with stakeholder-approved recruitment copy.
export const recruitmentSpotlight: RecruitmentSpotlightContent = {
  kicker: "Recruitment",
  heading: "Hire with a recruitment partner who knows HR too",
  description:
    "From single permanent hires to executive search and full RPO, Apex HR combines recruitment delivery with HR expertise.",
  cta: { label: "Find Talent", href: routes.findTalent.path, analyticsId: "recruitment-spotlight-find-talent" },
  features: [
    { title: "Permanent Recruitment", href: "/services/permanent-recruitment/" },
    { title: "Executive Search", href: "/services/executive-search/" },
    { title: "Contract Staffing", href: "/services/contract-staffing/" },
    { title: "Recruitment Process Outsourcing (RPO)", href: "/services/recruitment-process-outsourcing-rpo/" },
  ],
};

// --- Why Apex HR ---------------------------------------------------------

export interface ValueProposition {
  id: string;
  title: string;
  detail: string;
}

// TODO: Replace with stakeholder-approved, evidence-led differentiators.
// These are operating-approach statements, not quantified claims — avoid
// "industry-leading", "number one" or similar unverified superlatives.
export const valuePropositions: ValueProposition[] = [
  {
    id: "one-partner",
    title: "One partner across HR and recruitment",
    detail: "Avoid juggling separate HR, legal and recruitment suppliers.",
  },
  {
    id: "practical",
    title: "Practical, not just policy",
    detail: "Guidance built to be used by managers, not filed away.",
  },
  {
    id: "embedded",
    title: "Advisors who work alongside your team",
    detail: "Embedded support rather than a one-off report and handover.",
  },
  {
    id: "compliance-first",
    title: "Compliance built in, not bolted on",
    detail: "Policies and processes designed to keep pace with UK employment law, not a one-off audit.",
  },
  {
    id: "sector-aware",
    title: "Sector-aware delivery",
    detail: "Support shaped around your sector's real hiring and people challenges, not a generic playbook.",
  },
  {
    id: "uk-focused",
    title: "Built for UK employers",
    detail: "Apex HR's primary market is the UK, with international capability considered case by case.",
  },
];

// --- Sectors -----------------------------------------------------------

export interface FeaturedSector {
  slug: string;
  title: string;
  href: string;
  /** Omitted for a sector with no approved photo yet — SectorCard falls
   * back to a plain text tile rather than a placeholder stock image. */
  imageSrc?: string;
}

// Featured subset — Professional Services and IT stay visually distinct
// per docs/URL-DECISION-REGISTER.md D-002. Sourced from src/config/sectors.ts.
// Chosen to match the sectors with an approved photo (see
// featuredSectorImages below); swap in other sectors as more photos land.
const featuredSectorSlugs = [
  "startups-scale-ups",
  "professional-services",
  "health-care",
  "technology",
  "construction",
  "distribution",
  "manufacturers",
  "hospitality",
];

export const featuredSectors: FeaturedSector[] = sectors
  .filter((sector) => featuredSectorSlugs.includes(sector.slug))
  .map((sector) => ({
    slug: sector.slug,
    title: sector.title,
    href: `/sector/${sector.slug}/`,
    imageSrc: sectorImages[sector.slug],
  }));

// --- How Apex works ---------------------------------------------------------

export interface ProcessStepContent {
  id: string;
  step: string;
  title: string;
  detail: string;
}

// Per CLAUDE.md section 11.
export const processSteps: ProcessStepContent[] = [
  { id: "understand", step: "01", title: "Understand", detail: "We learn your business, people and priorities." },
  { id: "diagnose", step: "02", title: "Diagnose", detail: "We identify what's working and what's holding you back." },
  { id: "recommend", step: "03", title: "Recommend", detail: "We propose a clear, practical plan of action." },
  { id: "implement", step: "04", title: "Implement", detail: "We deliver the plan alongside your team." },
  { id: "measure", step: "05", title: "Measure", detail: "We track outcomes and adjust as your business changes." },
];

// --- Case studies ---------------------------------------------------------

export interface CaseStudyPreview {
  id: string;
  title: string;
  summary: string;
  href: string;
}

// No verified case studies are approved yet — kept empty rather than
// fabricated. EmptyEditorialState renders in place of this list.
export const caseStudyPreviews: CaseStudyPreview[] = [];

// --- Experts ---------------------------------------------------------------

export interface ExpertPreview {
  id: string;
  name: string;
  role: string;
  bio: string;
  href: string;
  imageSrc?: string;
}

// No approved practitioner profiles exist yet — kept empty rather than
// fabricated. EmptyEditorialState renders in place of this list.
export const expertPreviews: ExpertPreview[] = [];

// --- Candidate gateway -------------------------------------------------------

export interface CandidateGatewayContent {
  kicker: string;
  heading: string;
  description: string;
  links: CtaLink[];
}

// `links` order matters: CandidateGatewaySection renders the first as a
// primary button and the second as a secondary button. Join the Talent
// Pool and Candidate Resources aren't listed here — they're reachable via
// the primary navigation's "Candidates" item (routes.forCandidates) per
// CLAUDE.md section 5, so CLAUDE.md section 14's candidate-gateway routes
// all stay reachable without every one needing a button in this section.
export const candidateGateway: CandidateGatewayContent = {
  kicker: "Careers",
  heading: "Your next opportunity could start here",
  description:
    "Search current vacancies or join the Apex talent pool so we can contact you about future opportunities.",
  links: [
    { label: "Search Jobs", href: routes.jobs.path, analyticsId: "candidate-gateway-search-jobs" },
    { label: "Upload Your CV", href: routes.forCandidates.path, analyticsId: "candidate-gateway-upload-cv" },
  ],
};

// --- Insights ---------------------------------------------------------------

export interface InsightPreview {
  id: string;
  contentType: string;
  title: string;
  summary: string;
  /** Machine-readable ISO date for the `<time dateTime>` attribute. */
  date?: string;
  /** Human-readable date label; falls back to `date` when omitted. */
  dateDisplay?: string;
  topic: string;
  href: string;
  /**
   * Already resolved through the featured-image fallback chain (WordPress
   * featured media -> Yoast OG image -> first content image) — see
   * src/lib/wordpress/client.ts's `resolveFeaturedImage`. `null`/omitted
   * means none of those three real sources exist; InsightCard applies the
   * local Apex HR placeholder image in that case, not this file.
   */
  image?: { url: string; alt: string; width?: number; height?: number } | null;
}

// --- FAQs --------------------------------------------------------------

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

// TODO: Replace with stakeholder-approved employer FAQ content.
export const employerFaqs: FaqItem[] = [
  {
    id: "outsourced-hr",
    question: "What is outsourced HR support?",
    answer:
      "Outsourced HR gives your business access to HR expertise (policies, compliance, employee relations and day-to-day advice) without hiring a full in-house team.",
  },
  {
    id: "recruitment-scope",
    question: "Can Apex HR help with a single vacancy or ongoing recruitment?",
    answer:
      "Yes. Apex HR supports both one-off hires and ongoing recruitment programmes, including permanent, contract and executive search.",
  },
  {
    id: "international",
    question: "Do you work with businesses outside the UK?",
    answer:
      "Apex HR's primary market is the UK. International capability is considered case by case where it can be properly supported.",
  },
  {
    id: "find-talent-process",
    question: "How does a Find Talent enquiry work?",
    answer: "Submit your hiring need through Find Talent and an Apex HR advisor will follow up to discuss next steps.",
  },
];

// --- Final CTA ---------------------------------------------------------

export interface FinalCtaContent {
  heading: string;
  description: string;
  primaryCta: CtaLink;
}

export const finalCta: FinalCtaContent = {
  heading: "Ready to talk about your hiring or HR need?",
  description: "Tell us what you're looking for and an Apex HR advisor will get back to you.",
  primaryCta: { label: "Find Talent", href: routes.findTalent.path, analyticsId: "final-cta-find-talent" },
};
