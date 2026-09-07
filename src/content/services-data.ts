import type { ContentFaqItem } from "@/types/content";

/**
 * Original first-draft service content, authored under the explicit
 * content-authoring authorisation recorded in CLAUDE.md section 32. Every
 * record here is `contentStatus: "ai-draft"` — see src/content/manifest.ts.
 *
 * Rules followed throughout:
 * - No client names, results, testimonials, statistics, accreditations or
 *   years-of-operation claims are stated as fact anywhere in this file.
 * - Employment-law-adjacent services use informational, non-absolute
 *   language and are flagged `legalReviewRequired: true`.
 * - Slugs and categorySlug values must match src/config/services.ts exactly
 *   — cross-checked against the Master Routes sheet of
 *   docs/Apex_HR_Master_Sitemap_and_URL_Register.xlsx (48 Confirmed child
 *   services, 10 Confirmed/Corrected parent categories).
 */

export interface ServiceCategoryChallenge {
  title: string;
  detail: string;
}

export interface ServiceCategoryApproachStep {
  title: string;
  detail: string;
}

export interface ServiceCategoryContent {
  slug: string;
  /** Short, service-family-specific hero headline. */
  tagline: string;
  summary: string;
  introduction: string;
  /** Three short employer problems this service family addresses. */
  challenges: ServiceCategoryChallenge[];
  /** Three-step "how we work" outline for this service family specifically
   * (distinct from the site-wide five-step process on the homepage). */
  approach: ServiceCategoryApproachStep[];
}

export interface ServiceContent {
  slug: string;
  categorySlug: string;
  metaDescription: string;
  primaryKeyword: string;
  heroSummary: string;
  employerChallenge: string;
  businessOutcomes: string[];
  whatItIncludes: string[];
  whenNeeded: string[];
  whoWeSupport: string;
  deliveryApproach: string[];
  engagementOptions: string[];
  whyApex: string;
  relatedServiceSlugs: string[];
  relatedSectorSlugs: string[];
  faqs: ContentFaqItem[];
  legalReviewRequired: boolean;
}

export const serviceCategoryContent: ServiceCategoryContent[] = [
  {
    slug: "outsourced-hr-services",
    tagline: "HR support, without the overhead of an HR department.",
    summary: "Day-to-day HR support and outsourced HR leadership for businesses without a full in-house team.",
    introduction:
      "For many growing businesses, HR sits with a founder, an office manager or a finance lead who is already stretched. Outsourced HR gives employers access to the policies, advice and hands-on support of a wider HR function without the cost of building one from scratch.",
    challenges: [
      {
        title: "HR sits with whoever has time",
        detail: "People issues land on a founder, office manager or finance lead who is already stretched thin.",
      },
      {
        title: "Policies haven't kept pace",
        detail: "Contracts, handbooks and processes were written early on and haven't been reviewed as the business has grown.",
      },
      {
        title: "Every issue feels like the first time",
        detail: "Without a consistent HR partner, similar situations get handled differently each time they come up.",
      },
    ],
    approach: [
      { title: "Understand", detail: "Review current HR practices, contracts and policies." },
      { title: "Agree scope", detail: "Set out ongoing support and how quickly you can reach us." },
      { title: "Adapt", detail: "Revisit priorities as the business and its risks change." },
    ],
  },
  {
    slug: "recruitment-talent-acquisition",
    tagline: "Hire well, without slowing down.",
    summary: "Permanent, contract and executive recruitment delivered alongside genuine HR expertise.",
    introduction:
      "Recruitment works best when it is informed by a real understanding of the role, the team and the organisation's people strategy. Apex HR combines recruitment delivery with HR knowledge, from single permanent hires to volume and executive search programmes.",
    challenges: [
      {
        title: "Vacancies stay open too long",
        detail: "Slow, generic hiring processes lose strong candidates to faster-moving employers.",
      },
      {
        title: "The wrong hire is expensive to unwind",
        detail: "Recruitment disconnected from HR strategy increases the risk of a poor-fit appointment.",
      },
      {
        title: "Senior roles need a different approach",
        detail: "Executive and specialist hires call for search, not just advertising a vacancy.",
      },
    ],
    approach: [
      { title: "Brief", detail: "Understand the role, the team and what success looks like." },
      { title: "Search", detail: "Identify and assess candidates against the real requirements." },
      { title: "Appoint", detail: "Support the offer, onboarding and early weeks in the role." },
    ],
  },
  {
    slug: "employment-law-and-employee-relations",
    tagline: "Handle difficult situations with confidence.",
    summary: "Practical, informational support for redundancy, TUPE, investigations, mediation and other employee-relations situations.",
    introduction:
      "Employee-relations issues are high-stakes and often time-sensitive. This service family provides practical HR support through difficult situations — it is informational HR guidance, not a substitute for regulated legal advice, and complex or high-risk matters should always be reviewed by a qualified employment lawyer.",
    challenges: [
      {
        title: "A difficult situation needs a clear next step",
        detail: "Redundancy, investigations and disputes are high-stakes and often time-sensitive.",
      },
      {
        title: "Policies exist, but confidence doesn't",
        detail: "Managers know a process is documented but aren't sure how to apply it fairly and consistently.",
      },
      {
        title: "Risk isn't visible until it's a problem",
        detail: "Employment law changes regularly, and gaps in everyday practice are easy to miss.",
      },
    ],
    approach: [
      { title: "Assess", detail: "Understand the situation and the options available." },
      { title: "Advise", detail: "Provide practical, informational guidance on next steps." },
      { title: "Support", detail: "Stay involved through to resolution, referring to legal counsel where needed." },
    ],
  },
  {
    slug: "organisation-development-change-management",
    tagline: "Change the organisation, without losing the people.",
    summary: "Structuring, restructuring and transforming organisations through periods of growth or change.",
    introduction:
      "Growth, restructuring, M&A and culture change all put pressure on how an organisation is structured and how people experience it. This service family helps employers design, sequence and deliver organisational change with less disruption to the business.",
    challenges: [
      {
        title: "Growth has blurred accountability",
        detail: "Roles, reporting lines and decision-making no longer match how the organisation actually works.",
      },
      {
        title: "Change is creating resistance",
        detail: "Managers need a practical roadmap for communication, consultation and implementation.",
      },
      {
        title: "Culture and strategy have drifted apart",
        detail: "Everyday behaviours are undermining the outcomes leaders want to achieve.",
      },
    ],
    approach: [
      { title: "Understand", detail: "Diagnose the business need, people risks and readiness for change." },
      { title: "Design", detail: "Build a practical solution with clear ownership, milestones and measures." },
      { title: "Embed", detail: "Equip leaders and managers to make the change work beyond the project." },
    ],
  },
  {
    slug: "compensation-reward-and-benefits",
    tagline: "Pay and reward that's fair, and easy to defend.",
    summary: "Pay structures, reward strategy and benefits design that support recruitment, retention and fairness.",
    introduction:
      "Reward decisions affect recruitment, retention and how fairly employees feel they are treated. This service family covers benchmarking, pay structures, reward strategy, pay equity reporting, benefits and executive compensation.",
    challenges: [
      {
        title: "Pay decisions lack a consistent basis",
        detail: "Salaries have been set ad hoc rather than benchmarked against the market.",
      },
      {
        title: "Reward isn't helping retention",
        detail: "Good performers leave for better-structured packages elsewhere.",
      },
      {
        title: "Fairness is hard to evidence",
        detail: "Without clear pay structures, it's difficult to demonstrate consistent, equitable decisions.",
      },
    ],
    approach: [
      { title: "Benchmark", detail: "Compare current pay against relevant market data." },
      { title: "Design", detail: "Build structures and a reward approach that fit the business." },
      { title: "Implement", detail: "Support rollout and ongoing governance of the new approach." },
    ],
  },
  {
    slug: "learning-and-leadership-development",
    tagline: "Build leaders who bring out the best in their teams.",
    summary: "Leadership training, coaching and capability development for managers and teams.",
    introduction:
      "Capable leaders and well-supported managers directly affect engagement, retention and performance. This service family covers leadership and management training, executive coaching, and building a broader learning strategy.",
    challenges: [
      {
        title: "Managers were promoted, not trained",
        detail: "Technical strength doesn't always translate into confident people leadership.",
      },
      {
        title: "Development feels generic",
        detail: "One-size-fits-all training doesn't address the specific gaps holding a team back.",
      },
      {
        title: "Capability hasn't kept up with growth",
        detail: "As the organisation scales, leadership skills need to scale with it.",
      },
    ],
    approach: [
      { title: "Diagnose", detail: "Identify the specific capability gaps holding teams back." },
      { title: "Develop", detail: "Design training and coaching around real scenarios." },
      { title: "Reinforce", detail: "Support managers to apply new skills after the programme ends." },
    ],
  },
  {
    slug: "performance-and-talent-management",
    tagline: "Make consistent, defensible people decisions.",
    summary: "Performance management, succession planning and competency frameworks that support consistent decision-making.",
    introduction:
      "Consistent, fair performance and talent processes help employers make better decisions about development, promotion and succession. This service family covers performance management design, succession planning and competency frameworks.",
    challenges: [
      {
        title: "Performance conversations are inconsistent",
        detail: "Managers approach reviews differently, which makes outcomes feel unfair.",
      },
      {
        title: "Succession relies on memory, not planning",
        detail: "Key-person risk isn't visible until someone hands in their notice.",
      },
      {
        title: "Competency expectations aren't written down",
        detail: "Without a shared framework, decisions about promotion and development are hard to defend.",
      },
    ],
    approach: [
      { title: "Review", detail: "Assess current performance and talent processes." },
      { title: "Design", detail: "Build frameworks that are consistent and easy for managers to use." },
      { title: "Embed", detail: "Train managers and monitor how the approach is working." },
    ],
  },
  {
    slug: "employee-experience-and-engagement",
    tagline: "An employee experience people actually believe in.",
    summary: "Employee experience strategy, engagement surveys, employer branding, wellbeing and DEI consulting.",
    introduction:
      "How people experience work shapes engagement, retention and employer reputation. This service family covers employee experience strategy, engagement surveys, employer branding and EVP, workplace wellbeing, and diversity, equity and inclusion consulting.",
    challenges: [
      {
        title: "Engagement is assumed, not measured",
        detail: "Without structured feedback, problems only surface once someone resigns.",
      },
      {
        title: "The employer brand doesn't match reality",
        detail: "What's promised to candidates and what employees experience have drifted apart.",
      },
      {
        title: "Good intentions haven't become practice",
        detail: "Wellbeing and inclusion goals exist but aren't reflected in everyday people practices.",
      },
    ],
    approach: [
      { title: "Listen", detail: "Understand the current employee experience and engagement levels." },
      { title: "Design", detail: "Build a targeted action plan around what you've heard." },
      { title: "Sustain", detail: "Track progress and keep the plan current." },
    ],
  },
  {
    slug: "hr-technology-and-people-analytics",
    tagline: "HR technology that works for your business, not the other way round.",
    summary: "HRIS implementation, HR software selection, people analytics and digital HR transformation.",
    introduction:
      "The right HR technology reduces administrative burden and gives employers better visibility of their workforce. This service family covers HRIS implementation, software selection, people analytics and dashboards, digital HR transformation, and AI workplace policy.",
    challenges: [
      {
        title: "HR data lives in spreadsheets",
        detail: "Basic workforce questions take far too long to answer.",
      },
      {
        title: "The current system doesn't fit the business",
        detail: "HR software was chosen for an earlier stage of growth and hasn't kept pace.",
      },
      {
        title: "Digital change stalls without a plan",
        detail: "New systems are introduced without the people-side support needed to make them stick.",
      },
    ],
    approach: [
      { title: "Assess", detail: "Review current systems, data and reporting needs." },
      { title: "Select or build", detail: "Recommend the right technology and analytics approach." },
      { title: "Adopt", detail: "Support rollout, training and change management." },
    ],
  },
  {
    slug: "strategic-hr-and-workforce-advisory",
    tagline: "Plan the workforce you'll need, not just the one you have.",
    summary: "People strategy, strategic workforce planning and global mobility advisory for growing organisations.",
    introduction:
      "As organisations scale, HR needs to move from administration to strategic workforce planning. This service family covers people strategy, strategic workforce planning and global mobility and expatriate HR management.",
    challenges: [
      {
        title: "HR is still administrative",
        detail: "People strategy hasn't caught up with the pace of the business.",
      },
      {
        title: "Workforce planning is reactive",
        detail: "Hiring happens in response to pressure rather than a plan.",
      },
      {
        title: "International growth raises new questions",
        detail: "Expanding into new markets brings unfamiliar employment considerations.",
      },
    ],
    approach: [
      { title: "Understand", detail: "Connect business strategy to future workforce needs." },
      { title: "Plan", detail: "Build a practical workforce and people strategy." },
      { title: "Advise", detail: "Provide ongoing strategic input as plans evolve." },
    ],
  },
];

const generic = {
  outcomes: {
    compliance: "Reduced compliance risk and fewer avoidable disputes",
    retention: "Improved retention among people managers and teams",
    consistency: "More consistent, defensible people decisions",
    time: "Less HR administration time for founders and managers",
  },
};

export const serviceContent: ServiceContent[] = [
  // ---- Outsourced HR Services ----
  {
    slug: "retained-hr-services",
    categorySlug: "outsourced-hr-services",
    metaDescription: "Ongoing outsourced HR support for UK employers, covering policy, compliance, employee relations and day-to-day people advice.",
    primaryKeyword: "outsourced HR services",
    heroSummary: "Ongoing HR support and advice, so your business always has someone to call when a people issue comes up.",
    employerChallenge:
      "Without a dedicated HR function, people issues tend to land on whoever is available — a founder, office manager or finance lead — often without the confidence to know what's required or defensible.",
    businessOutcomes: [
      generic.outcomes.compliance,
      "A single point of contact for day-to-day HR questions",
      generic.outcomes.time,
      "Documented, consistent HR processes as the business grows",
    ],
    whatItIncludes: [
      "Ongoing HR advisory access",
      "Policy and contract review",
      "Support with individual employee issues as they arise",
      "Regular check-ins on HR risk areas",
    ],
    whenNeeded: [
      "No in-house HR function yet",
      "HR is currently handled informally or reactively",
      "The business is growing and HR needs are becoming more frequent",
    ],
    whoWeSupport: "Small and mid-sized employers who need reliable, ongoing HR support without hiring a full in-house team.",
    deliveryApproach: [
      "Review current HR practices, contracts and policies",
      "Agree the ongoing scope and response expectations",
      "Provide ongoing advisory support and documentation",
      "Periodically review HR risk areas as the business changes",
    ],
    engagementOptions: ["Ongoing retained support", "Fixed-term project support", "Ad hoc advisory sessions"],
    whyApex:
      "Apex HR combines HR advisory with recruitment and organisational expertise, so retained support can flex as your priorities change rather than being limited to one narrow specialism.",
    relatedServiceSlugs: ["hr-support-for-small-businesses-and-startups", "hr-compliance-audit", "employee-handbooks-and-hr-policies", "fractional-hr-director-chief-people-officer"],
    relatedSectorSlugs: ["startups-scale-ups", "professional-services", "construction"],
    faqs: [
      { id: "scope", question: "What does retained HR support typically cover?", answer: "Retained support usually covers day-to-day advisory access, policy and contract review, and support with individual employee situations as they come up. The exact scope is agreed at the outset." },
      { id: "response", question: "How quickly can Apex HR respond to an issue?", answer: "Response expectations are agreed as part of the engagement, so you know what to expect before a situation arises." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "hr-support-for-small-businesses-and-startups",
    categorySlug: "outsourced-hr-services",
    metaDescription: "Practical HR support for small businesses and startups, built for lean teams without an in-house HR function.",
    primaryKeyword: "HR support for startups",
    heroSummary: "Right-sized HR support for small businesses and startups, so people processes are in place from the start without slowing you down.",
    employerChallenge:
      "Early-stage businesses often delay HR until a problem forces the issue — by which point contracts, policies or decisions may already be exposed to risk.",
    businessOutcomes: [
      "Foundational HR set up correctly from an early stage",
      generic.outcomes.time,
      "Confidence when making early hiring and people decisions",
    ],
    whatItIncludes: [
      "Starter employment contracts and offer templates",
      "Core policy set for a growing team",
      "Guidance on first hires and probation processes",
      "Access to advice as people questions come up",
    ],
    whenNeeded: [
      "Making your first few hires",
      "No formal contracts, policies or HR processes yet",
      "Preparing for investment or scale-up due diligence",
    ],
    whoWeSupport: "Founders and early leadership teams at startups and small businesses building their first HR foundations.",
    deliveryApproach: [
      "Understand the team, growth plans and immediate risks",
      "Put essential contracts and policies in place",
      "Support first hiring and onboarding processes",
      "Stay available as new questions come up",
    ],
    engagementOptions: ["Fixed-scope HR foundations project", "Ongoing lightweight retained support"],
    whyApex:
      "Apex HR works with founders directly, in plain language, rather than handing over generic templates and leaving you to interpret them.",
    relatedServiceSlugs: ["retained-hr-services", "employee-handbooks-and-hr-policies", "fractional-hr-director-chief-people-officer", "permanent-recruitment"],
    relatedSectorSlugs: ["startups-scale-ups", "technology", "professional-services"],
    faqs: [
      { id: "first-hire", question: "Do we need this before our first hire?", answer: "It's usually best to have core contracts and policies in place before your first hire, so expectations are clear from day one." },
      { id: "growth", question: "What happens as we grow beyond a startup team?", answer: "Support can scale into retained HR services or a fractional HR director arrangement as headcount and complexity increase." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "fractional-hr-director-chief-people-officer",
    categorySlug: "outsourced-hr-services",
    metaDescription: "Senior HR leadership on a fractional basis — a Fractional HR Director or Chief People Officer for businesses not ready for a full-time hire.",
    primaryKeyword: "fractional HR director",
    heroSummary: "Senior HR leadership on a part-time or fractional basis, for businesses that need strategic people leadership before they're ready for a full-time hire.",
    employerChallenge:
      "A business can outgrow ad hoc HR support before it can justify a full-time HR director salary, leaving a gap in senior people leadership at a critical stage of growth.",
    businessOutcomes: [
      "Strategic HR leadership without a full-time senior hire",
      "A people strategy aligned to business goals",
      "Stronger HR governance ahead of scale or investment",
    ],
    whatItIncludes: [
      "Regular strategic HR leadership time",
      "People strategy and workforce planning input",
      "Oversight of HR policy, structure and risk",
      "Mentoring for existing HR or people-ops staff",
    ],
    whenNeeded: [
      "Scaling past the point ad hoc HR support can cover",
      "Preparing for investment, acquisition or rapid growth",
      "No senior HR voice at leadership-team level",
    ],
    whoWeSupport: "Scale-ups and mid-sized businesses that need senior HR leadership without committing to a full-time executive hire.",
    deliveryApproach: [
      "Assess current people strategy and HR maturity",
      "Agree a regular cadence of strategic leadership time",
      "Set priorities aligned to business objectives",
      "Review and adjust priorities as the business evolves",
    ],
    engagementOptions: ["Fixed days per month", "Project-based leadership for a defined initiative"],
    whyApex:
      "Apex HR's fractional leadership draws on both HR strategy and recruitment delivery experience, useful when growth and hiring plans are closely linked.",
    relatedServiceSlugs: ["retained-hr-services", "people-strategy", "strategic-workforce-planning", "organisation-design"],
    relatedSectorSlugs: ["startups-scale-ups", "technology", "financial-services"],
    faqs: [
      { id: "vs-retained", question: "How is this different from retained HR support?", answer: "Retained HR support is typically operational and advisory; a fractional HR Director or CPO sits at leadership-team level and focuses on strategic direction." },
      { id: "time", question: "How much time is typically involved?", answer: "This is agreed based on the business's needs, from a set number of days per month to project-based leadership for a specific initiative." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "hr-compliance-audit",
    categorySlug: "outsourced-hr-services",
    metaDescription: "An independent HR compliance audit identifying gaps in contracts, policies and processes, with practical recommendations.",
    primaryKeyword: "HR compliance audit",
    heroSummary: "An independent review of your HR practices, identifying gaps and giving you a practical plan to close them.",
    employerChallenge:
      "Contracts and policies often go unreviewed for years while employment practice and legislation move on, leaving gaps that only surface when something goes wrong.",
    businessOutcomes: [
      generic.outcomes.compliance,
      "A clear, prioritised action plan",
      "Documented evidence of good HR practice",
    ],
    whatItIncludes: [
      "Review of contracts, policies and key HR processes",
      "Gap analysis against good-practice HR standards",
      "A prioritised report of findings and recommendations",
      "Optional support implementing the recommendations",
    ],
    whenNeeded: [
      "No HR audit has been carried out recently",
      "Preparing for investment, acquisition or a funding round",
      "After a near-miss or employee-relations issue",
    ],
    whoWeSupport: "Employers who want an independent, practical view of their current HR compliance position.",
    deliveryApproach: [
      "Review existing contracts, policies and HR records",
      "Assess current processes against good practice",
      "Deliver a clear findings report with prioritised actions",
      "Support implementation where needed",
    ],
    engagementOptions: ["Fixed-scope audit", "Audit plus implementation support"],
    whyApex:
      "The audit results in a practical, prioritised plan rather than a generic checklist, so you know what to fix first.",
    relatedServiceSlugs: ["employee-handbooks-and-hr-policies", "retained-hr-services", "workplace-investigations"],
    relatedSectorSlugs: ["professional-services", "financial-services", "construction"],
    faqs: [
      { id: "outcome", question: "What do we get at the end of the audit?", answer: "A written report identifying gaps and risks, with practical, prioritised recommendations for closing them." },
      { id: "legal", question: "Is this a legal audit?", answer: "This is an HR practice review, not a substitute for formal legal advice. Higher-risk findings may be recommended for review by a qualified employment lawyer." },
    ],
    legalReviewRequired: true,
  },
  {
    slug: "employee-handbooks-and-hr-policies",
    categorySlug: "outsourced-hr-services",
    metaDescription: "Clear, practical employee handbooks and HR policies tailored to your business, not generic templates.",
    primaryKeyword: "employee handbook and HR policies",
    heroSummary: "Employee handbooks and HR policies written in plain language and tailored to how your business actually operates.",
    employerChallenge:
      "Generic downloaded templates often don't reflect how a business actually works, leaving gaps or contradictions that surface exactly when they're needed most.",
    businessOutcomes: [
      "Clear, consistent rules that managers can actually apply",
      generic.outcomes.compliance,
      "A better onboarding experience for new starters",
    ],
    whatItIncludes: [
      "Employee handbook drafted for your business",
      "Core HR policies (e.g. leave, conduct, flexible working)",
      "Manager-facing guidance for applying policies consistently",
      "Periodic review as employment practice evolves",
    ],
    whenNeeded: [
      "No handbook exists, or it hasn't been updated in years",
      "Policies are inconsistent across teams",
      "Preparing for growth or a new HR system rollout",
    ],
    whoWeSupport: "Employers who need policies that genuinely reflect how their business runs, not a downloaded template.",
    deliveryApproach: [
      "Understand your current practices and culture",
      "Draft handbook and policy content for review",
      "Refine based on your feedback",
      "Support rollout and manager briefing",
    ],
    engagementOptions: ["Full handbook and policy suite", "Individual policy drafting", "Annual policy review retainer"],
    whyApex:
      "Policies are written to reflect your actual business, not lifted from a generic template library.",
    relatedServiceSlugs: ["hr-compliance-audit", "retained-hr-services", "hr-support-for-small-businesses-and-startups"],
    relatedSectorSlugs: ["professional-services", "care-homes", "hospitality"],
    faqs: [
      { id: "template", question: "Are these generic templates?", answer: "No — policies are drafted around how your business actually operates, then refined with your input." },
      { id: "update", question: "How often should policies be reviewed?", answer: "Good practice is an annual review, or sooner if employment practice or your business changes materially." },
    ],
    legalReviewRequired: true,
  },
  {
    slug: "payroll-advisory",
    categorySlug: "outsourced-hr-services",
    metaDescription: "Payroll advisory support helping employers get payroll processes, controls and provider relationships right.",
    primaryKeyword: "payroll advisory",
    heroSummary: "Advisory support to help you get payroll processes, controls and provider relationships right.",
    employerChallenge:
      "Payroll errors are highly visible to employees and can be costly to fix, yet many businesses inherit payroll processes without ever reviewing whether they're fit for purpose.",
    businessOutcomes: [
      "Fewer payroll errors and employee queries",
      "Clearer processes between HR and payroll",
      "Better-informed decisions when selecting or reviewing a provider",
    ],
    whatItIncludes: [
      "Review of current payroll processes and controls",
      "Guidance on HR-to-payroll data handoffs",
      "Support selecting or reviewing a payroll provider",
      "Advice on statutory payroll obligations at a process level",
    ],
    whenNeeded: [
      "Recurring payroll errors or employee queries",
      "Switching payroll provider or system",
      "Scaling headcount and outgrowing current processes",
    ],
    whoWeSupport: "Employers who want confidence that their payroll processes and provider relationships are working well.",
    deliveryApproach: [
      "Review current payroll processes and pain points",
      "Identify gaps between HR and payroll data flows",
      "Recommend process or provider improvements",
      "Support implementation of agreed changes",
    ],
    engagementOptions: ["One-off payroll process review", "Provider selection support", "Ongoing advisory retainer"],
    whyApex:
      "This is advisory support around your payroll process and provider relationship, not payroll processing itself — so it stays independent of any one provider.",
    relatedServiceSlugs: ["hr-compliance-audit", "hris-implementation", "reward-strategy"],
    relatedSectorSlugs: ["professional-services", "manufacturers", "distribution"],
    faqs: [
      { id: "process-payroll", question: "Does Apex HR run our payroll?", answer: "This service is advisory — reviewing and improving your payroll processes and provider relationship, not processing payroll itself." },
      { id: "provider", question: "Can you help us choose a new payroll provider?", answer: "Yes, this includes support comparing providers against your specific requirements." },
    ],
    legalReviewRequired: false,
  },

  // ---- Recruitment & Talent Acquisition ----
  {
    slug: "permanent-recruitment",
    categorySlug: "recruitment-talent-acquisition",
    metaDescription: "Permanent recruitment support for UK employers, from role definition through to offer, backed by HR expertise.",
    primaryKeyword: "permanent recruitment",
    heroSummary: "Permanent recruitment support from role definition through to offer, informed by genuine HR expertise, not just CV matching.",
    employerChallenge:
      "A poor permanent hire is expensive and disruptive, yet many recruitment processes focus on speed to fill rather than genuine role and team fit.",
    businessOutcomes: [
      "Candidates assessed against the role and team, not just a CV",
      "A faster, better-structured hiring process",
      "Reduced risk of early attrition from a poor fit",
    ],
    whatItIncludes: [
      "Role scoping and person-specification support",
      "Candidate sourcing, screening and shortlisting",
      "Interview process design and support",
      "Offer and onboarding guidance",
    ],
    whenNeeded: [
      "Hiring for a new or replacement permanent role",
      "Previous hiring processes haven't found the right fit",
      "No internal recruitment resource or expertise",
    ],
    whoWeSupport: "Employers hiring permanent staff who want a structured, well-supported recruitment process.",
    deliveryApproach: [
      "Scope the role, team and success criteria",
      "Source and screen suitable candidates",
      "Support structured interviews and assessment",
      "Support offer, negotiation and onboarding",
    ],
    engagementOptions: ["Single-role recruitment", "Multiple concurrent roles", "Ongoing recruitment partnership"],
    whyApex:
      "Recruitment is informed by HR expertise in role design and team fit, not just keyword matching against a CV.",
    relatedServiceSlugs: ["executive-search", "contract-staffing", "recruitment-process-outsourcing-rpo", "graduate-schemes-and-early-careers-design"],
    relatedSectorSlugs: ["professional-services", "technology", "financial-services"],
    faqs: [
      { id: "timescale", question: "How long does permanent recruitment typically take?", answer: "Timescales vary by role and market, and are discussed as part of scoping — Apex HR does not commit to a fixed placement time without understanding the role first." },
      { id: "guarantee", question: "Is the hire guaranteed?", answer: "Engagement terms, including any rebate or replacement arrangements, are agreed and confirmed before the search begins." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "executive-search",
    categorySlug: "recruitment-talent-acquisition",
    metaDescription: "Executive search for senior and leadership hires, combining a targeted search approach with genuine HR insight.",
    primaryKeyword: "executive search",
    heroSummary: "A targeted, confidential search approach for senior and leadership hires where the wrong appointment carries real organisational risk.",
    employerChallenge:
      "Senior hires are harder to source through advertising alone, and a poor leadership appointment has an outsized impact on the wider organisation.",
    businessOutcomes: [
      "Access to candidates not actively applying elsewhere",
      "A rigorous, confidential search process",
      "Stronger alignment between the hire and organisational strategy",
    ],
    whatItIncludes: [
      "Confidential search and direct approach",
      "Structured leadership-level assessment",
      "Market mapping and competitor insight where useful",
      "Support through offer and transition",
    ],
    whenNeeded: [
      "Hiring at senior leadership or executive level",
      "The role requires discretion or confidentiality",
      "Previous searches haven't surfaced the right calibre of candidate",
    ],
    whoWeSupport: "Organisations hiring senior leaders, executives or other business-critical, hard-to-fill roles.",
    deliveryApproach: [
      "Define the leadership brief and success profile",
      "Map the market and approach suitable candidates directly",
      "Assess shortlisted candidates against the brief",
      "Support offer, reference and onboarding",
    ],
    engagementOptions: ["Retained executive search", "Confidential replacement search"],
    whyApex:
      "Search is grounded in organisational and HR context, not just a market map of job titles.",
    relatedServiceSlugs: ["permanent-recruitment", "fractional-hr-director-chief-people-officer", "succession-planning-and-talent-mapping"],
    relatedSectorSlugs: ["financial-services", "professional-services", "life-sciences"],
    faqs: [
      { id: "confidential", question: "Can a search be run confidentially?", answer: "Yes, confidential search — including for replacement hires — is a core part of this service." },
      { id: "levels", question: "What seniority levels does this cover?", answer: "Typically senior leadership, director and executive-level roles, agreed at the outset of the engagement." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "contract-staffing",
    categorySlug: "recruitment-talent-acquisition",
    metaDescription: "Contract and interim staffing support for short-term, project or cover requirements.",
    primaryKeyword: "contract staffing",
    heroSummary: "Contract and interim staffing support to cover short-term needs, projects or absence without the overhead of a permanent hire.",
    employerChallenge:
      "Short-term or project-based resourcing needs often don't justify a permanent hire, but finding suitable interim talent quickly can be difficult without the right network.",
    businessOutcomes: [
      "Faster access to interim or contract talent",
      "Flexibility to scale resourcing up or down",
      "Reduced disruption during absence or peak periods",
    ],
    whatItIncludes: [
      "Sourcing and screening of contract or interim candidates",
      "Support with engagement terms and onboarding",
      "Ongoing coordination for the duration of the placement",
    ],
    whenNeeded: [
      "Covering maternity, long-term absence or a vacancy gap",
      "A time-limited project needs specific skills",
      "Testing a new role before committing to a permanent hire",
    ],
    whoWeSupport: "Employers with short-term, project-based or flexible resourcing needs.",
    deliveryApproach: [
      "Understand the requirement, timeline and budget",
      "Source and screen suitable contract or interim candidates",
      "Support engagement and onboarding",
      "Stay available for the duration of the placement",
    ],
    engagementOptions: ["Single contract placement", "Ongoing flexible resourcing support"],
    whyApex:
      "Contract staffing is handled with the same HR rigour as permanent recruitment, reducing risk around engagement terms and onboarding.",
    relatedServiceSlugs: ["permanent-recruitment", "recruitment-process-outsourcing-rpo", "outplacement-and-career-transition-services"],
    relatedSectorSlugs: ["construction", "distribution", "technology"],
    faqs: [
      { id: "ir35", question: "Do you advise on IR35 or employment status?", answer: "General guidance on engagement structure can be discussed, but formal IR35 or employment-status determinations should be confirmed with a qualified adviser." },
    ],
    legalReviewRequired: true,
  },
  {
    slug: "recruitment-process-outsourcing-rpo",
    categorySlug: "recruitment-talent-acquisition",
    metaDescription: "Recruitment Process Outsourcing (RPO) for employers with ongoing or high-volume hiring needs.",
    primaryKeyword: "recruitment process outsourcing",
    heroSummary: "An outsourced recruitment function for employers with ongoing or high-volume hiring needs, run as an extension of your team.",
    employerChallenge:
      "Sustained or high-volume hiring can overwhelm an internal team, leading to inconsistent candidate experience and slower time to hire.",
    businessOutcomes: [
      "Consistent, scalable recruitment capacity",
      "A more consistent candidate experience",
      "Freed-up internal capacity for other HR priorities",
    ],
    whatItIncludes: [
      "Dedicated recruitment capacity aligned to your process",
      "End-to-end management of sourcing through offer",
      "Reporting on hiring pipeline and outcomes",
    ],
    whenNeeded: [
      "Sustained or seasonal high-volume hiring",
      "Internal recruitment capacity is stretched",
      "Scaling headcount quickly following investment or growth",
    ],
    whoWeSupport: "Employers with sustained or high-volume recruitment needs who want dedicated, scalable capacity.",
    deliveryApproach: [
      "Agree scope, volumes and success measures",
      "Embed recruitment capacity aligned to your process",
      "Manage the pipeline end-to-end",
      "Report on outcomes and refine as needed",
    ],
    engagementOptions: ["Full RPO partnership", "Project-based RPO for a defined hiring period"],
    whyApex:
      "RPO capacity is grounded in HR practice as well as recruitment delivery, supporting a consistent and fair candidate experience at volume.",
    relatedServiceSlugs: ["permanent-recruitment", "graduate-schemes-and-early-careers-design", "contract-staffing"],
    relatedSectorSlugs: ["distribution", "hospitality", "manufacturers"],
    faqs: [
      { id: "volume", question: "What volume of hiring does RPO suit?", answer: "RPO tends to suit sustained or high-volume hiring where dedicated capacity is more efficient than ad hoc recruitment support." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "graduate-schemes-and-early-careers-design",
    categorySlug: "recruitment-talent-acquisition",
    metaDescription: "Design and delivery support for graduate schemes and early-careers hiring programmes.",
    primaryKeyword: "graduate scheme design",
    heroSummary: "Design and delivery support for graduate schemes and early-careers programmes that build a genuine talent pipeline.",
    employerChallenge:
      "Early-careers hiring requires a different approach to experienced hiring — assessment, onboarding and development all need to be designed with less work history to go on.",
    businessOutcomes: [
      "A structured, fair early-careers assessment process",
      "Stronger onboarding and early retention",
      "A repeatable programme rather than a one-off hiring push",
    ],
    whatItIncludes: [
      "Programme design, including assessment approach",
      "Sourcing and screening of early-careers candidates",
      "Onboarding and early development planning support",
    ],
    whenNeeded: [
      "Building a graduate or early-careers programme for the first time",
      "Existing early-careers hiring is ad hoc or inconsistent",
      "Planning a structured entry-level talent pipeline",
    ],
    whoWeSupport: "Employers building or improving graduate schemes and other early-careers hiring programmes.",
    deliveryApproach: [
      "Define programme goals and role profiles",
      "Design a fair, structured assessment process",
      "Support sourcing, screening and selection",
      "Support onboarding and early development planning",
    ],
    engagementOptions: ["Full programme design and delivery", "Programme design only, delivered in-house"],
    whyApex:
      "Programmes are designed with both recruitment and long-term development in mind, not just a single hiring push.",
    relatedServiceSlugs: ["permanent-recruitment", "recruitment-process-outsourcing-rpo", "learning-strategy-and-capability-development"],
    relatedSectorSlugs: ["professional-services", "financial-services", "engineers"],
    faqs: [
      { id: "size", question: "Does this suit smaller employers, or only large graduate schemes?", answer: "Programmes are scaled to the employer — this can support a small, structured early-careers intake as well as larger schemes." },
    ],
    legalReviewRequired: false,
  },

  // ---- Employment Law & Employee Relations ----
  {
    slug: "redundancy-and-restructuring-support",
    categorySlug: "employment-law-and-employee-relations",
    metaDescription: "Practical HR support for redundancy and restructuring processes, focused on fair, well-run process.",
    primaryKeyword: "redundancy and restructuring support",
    heroSummary: "Practical HR support for redundancy and restructuring situations, focused on running a fair, well-documented process.",
    employerChallenge:
      "Redundancy and restructuring are high-risk processes that need to be handled fairly and consistently, but many employers only go through them rarely and lack in-house experience.",
    businessOutcomes: [
      "A structured, well-documented process",
      "Reduced risk of avoidable procedural errors",
      "Clearer, more compassionate communication with affected employees",
    ],
    whatItIncludes: [
      "Process planning and documentation support",
      "Selection-criteria and consultation guidance",
      "Support drafting communications and letters",
      "Manager briefing and support through the process",
    ],
    whenNeeded: [
      "Planning a redundancy or restructuring exercise",
      "Restructuring following a merger, acquisition or downturn",
      "No recent in-house experience running this kind of process",
    ],
    whoWeSupport: "Employers planning or managing redundancy or organisational restructuring processes.",
    deliveryApproach: [
      "Understand the business case and proposed structure",
      "Plan a fair, well-documented process and timeline",
      "Support consultation and communication",
      "Support managers through delivery",
    ],
    engagementOptions: ["Full process support", "Documentation and planning only", "Manager coaching through an existing process"],
    whyApex:
      "This is informational HR process support, not legal advice — Apex HR recommends qualified legal review for complex, large-scale or contested situations.",
    relatedServiceSlugs: ["tupe-advisory", "outplacement-and-career-transition-services", "employment-tribunal-hr-support"],
    relatedSectorSlugs: ["manufacturers", "construction", "distribution"],
    faqs: [
      { id: "legal-advice", question: "Is this a substitute for legal advice?", answer: "No. This is practical HR process support. Complex, large-scale or high-risk redundancy situations should be reviewed by a qualified employment lawyer." },
      { id: "timeline", question: "How long does a redundancy process take?", answer: "Timelines depend on the number of affected employees and any statutory consultation requirements, and are planned as part of the process." },
    ],
    legalReviewRequired: true,
  },
  {
    slug: "tupe-advisory",
    categorySlug: "employment-law-and-employee-relations",
    metaDescription: "Practical HR advisory support for TUPE transfers, covering process, communication and integration.",
    primaryKeyword: "TUPE advisory",
    heroSummary: "Practical HR support through a TUPE transfer, covering process, employee communication and integration planning.",
    employerChallenge:
      "TUPE transfers involve detailed process requirements and significant people-management complexity, often on a tight transaction timeline.",
    businessOutcomes: [
      "A clearer, better-managed transfer process",
      "Reduced disruption to transferring employees",
      "Smoother integration into the new organisation",
    ],
    whatItIncludes: [
      "Transfer process planning and documentation support",
      "Employee communication and consultation support",
      "Post-transfer integration and harmonisation planning",
    ],
    whenNeeded: [
      "Acquiring or losing a contract or business unit involving TUPE",
      "Planning employee communication for an upcoming transfer",
      "Integrating transferred employees into existing teams",
    ],
    whoWeSupport: "Employers involved in a business transfer or service change where TUPE applies.",
    deliveryApproach: [
      "Understand the transaction and transfer scope",
      "Plan communication and consultation activity",
      "Support the transfer process and documentation",
      "Support post-transfer integration",
    ],
    engagementOptions: ["Full transfer support", "Communication and integration support only"],
    whyApex:
      "This is HR process and communication support alongside your legal advisers — TUPE has specific legal requirements that should be confirmed with a qualified employment lawyer.",
    relatedServiceSlugs: ["redundancy-and-restructuring-support", "organisation-design", "ma-people-due-diligence-and-post-merger-integration"],
    relatedSectorSlugs: ["care-homes", "construction", "distribution"],
    faqs: [
      { id: "legal", question: "Does Apex HR provide the legal TUPE assessment?", answer: "No — Apex HR provides HR process and communication support. Legal assessment of whether and how TUPE applies should come from a qualified employment lawyer." },
    ],
    legalReviewRequired: true,
  },
  {
    slug: "workplace-investigations",
    categorySlug: "employment-law-and-employee-relations",
    metaDescription: "Independent, structured workplace investigations into conduct, grievance or misconduct concerns.",
    primaryKeyword: "workplace investigations",
    heroSummary: "Independent, structured workplace investigations, helping you gather the facts fairly before deciding next steps.",
    employerChallenge:
      "Internal investigations can be difficult to run impartially when the people involved know each other, and a poorly run process can undermine the outcome regardless of the facts.",
    businessOutcomes: [
      "An independent, well-documented investigation",
      "A fairer process for everyone involved",
      "A clearer evidential basis for any subsequent decision",
    ],
    whatItIncludes: [
      "Investigation planning and scoping",
      "Independent interviews and evidence gathering",
      "A clear written investigation report",
    ],
    whenNeeded: [
      "A grievance or conduct concern has been raised",
      "Internal capacity or independence is limited",
      "The situation is sensitive or involves senior staff",
    ],
    whoWeSupport: "Employers who need an independent, structured investigation into a workplace concern.",
    deliveryApproach: [
      "Agree the scope and terms of reference",
      "Conduct interviews and gather evidence independently",
      "Produce a clear, factual investigation report",
      "Hand findings back for your decision-making process",
    ],
    engagementOptions: ["Full independent investigation", "Investigation support alongside internal HR"],
    whyApex:
      "The investigator's role is to establish the facts fairly and independently — any subsequent decision remains yours, informed by your own or external legal advice where appropriate.",
    relatedServiceSlugs: ["workplace-mediation-and-conflict-resolution", "employment-tribunal-hr-support", "hr-compliance-audit"],
    relatedSectorSlugs: ["professional-services", "care-homes", "education"],
    faqs: [
      { id: "outcome", question: "Does Apex HR decide the outcome?", answer: "No — an investigation establishes the facts. Any disciplinary or other decision remains the employer's, informed by the findings and appropriate advice." },
    ],
    legalReviewRequired: true,
  },
  {
    slug: "workplace-mediation-and-conflict-resolution",
    categorySlug: "employment-law-and-employee-relations",
    metaDescription: "Independent workplace mediation to help resolve conflict between employees or teams constructively.",
    primaryKeyword: "workplace mediation",
    heroSummary: "Independent, structured mediation to help resolve workplace conflict before it escalates further.",
    employerChallenge:
      "Unresolved conflict between employees or within teams can affect morale, performance and retention long before it becomes a formal grievance.",
    businessOutcomes: [
      "A constructive route to resolving conflict",
      "Reduced likelihood of escalation to formal process",
      "Improved working relationships going forward",
    ],
    whatItIncludes: [
      "Independent mediation sessions",
      "Structured preparation with each party beforehand",
      "Support agreeing a way forward",
    ],
    whenNeeded: [
      "Ongoing conflict between colleagues or within a team",
      "A relationship breakdown is affecting performance or wellbeing",
      "Before a situation escalates to formal grievance",
    ],
    whoWeSupport: "Employers looking for an independent, constructive way to resolve workplace conflict.",
    deliveryApproach: [
      "Understand the situation from all parties",
      "Prepare each party for a mediation session",
      "Facilitate an independent mediation session",
      "Support agreeing and following up on next steps",
    ],
    engagementOptions: ["Single mediation session", "Ongoing conflict-resolution support for a team"],
    whyApex:
      "The mediator remains independent of the internal reporting lines involved, which can make it easier for both parties to engage openly.",
    relatedServiceSlugs: ["workplace-investigations", "employee-experience-strategy", "leadership-and-management-training"],
    relatedSectorSlugs: ["professional-services", "health-care", "education"],
    faqs: [
      { id: "voluntary", question: "Is mediation voluntary?", answer: "Mediation works best when all parties engage voluntarily and in good faith — this is discussed and agreed before a session takes place." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "employment-tribunal-hr-support",
    categorySlug: "employment-law-and-employee-relations",
    metaDescription: "HR support for employers responding to an employment tribunal claim, working alongside legal representation.",
    primaryKeyword: "employment tribunal HR support",
    heroSummary: "HR process and evidence support for employers responding to an employment tribunal claim, working alongside your legal representation.",
    employerChallenge:
      "A tribunal claim is stressful and time-consuming, and pulling together an accurate HR record under pressure is difficult without dedicated support.",
    businessOutcomes: [
      "A well-organised HR record to support your case",
      "Reduced administrative burden during proceedings",
      "Clearer coordination between HR and your legal team",
    ],
    whatItIncludes: [
      "Gathering and organising relevant HR documentation",
      "Preparing witness statements and timelines with those involved",
      "Coordinating with your legal representation",
    ],
    whenNeeded: [
      "An employment tribunal claim has been lodged",
      "Preparing HR evidence ahead of a hearing or settlement discussion",
    ],
    whoWeSupport: "Employers responding to an employment tribunal claim who need HR-side coordination and evidence support.",
    deliveryApproach: [
      "Understand the claim and current evidence position",
      "Gather and organise relevant HR records",
      "Support statement and timeline preparation",
      "Coordinate with your legal representation throughout",
    ],
    engagementOptions: ["Full tribunal support", "Documentation and evidence preparation only"],
    whyApex:
      "This service supports your legal representation with HR process and evidence — it is not a substitute for qualified legal representation at tribunal.",
    relatedServiceSlugs: ["workplace-investigations", "redundancy-and-restructuring-support", "hr-compliance-audit"],
    relatedSectorSlugs: ["professional-services", "manufacturers", "care-homes"],
    faqs: [
      { id: "represent", question: "Does Apex HR represent us at tribunal?", answer: "No — Apex HR provides HR-side support and evidence preparation. Tribunal representation should come from a qualified solicitor or barrister." },
    ],
    legalReviewRequired: true,
  },
  {
    slug: "outplacement-and-career-transition-services",
    categorySlug: "employment-law-and-employee-relations",
    metaDescription: "Outplacement and career transition support for employees leaving through redundancy or restructuring.",
    primaryKeyword: "outplacement support",
    heroSummary: "Career transition support for departing employees, helping them move forward positively after redundancy or restructuring.",
    employerChallenge:
      "How an employer supports people leaving through redundancy affects morale among remaining staff as well as the departing employees' experience and the organisation's reputation.",
    businessOutcomes: [
      "A more supportive, respectful exit experience",
      "Positive impact on remaining employees' trust",
      "Stronger employer reputation during workforce change",
    ],
    whatItIncludes: [
      "One-to-one career transition support",
      "CV, interview and job-search guidance",
      "Practical support navigating the next step",
    ],
    whenNeeded: [
      "Running a redundancy or restructuring process",
      "Wanting to support departing employees beyond statutory requirements",
    ],
    whoWeSupport: "Employers who want to support employees leaving through redundancy or restructuring.",
    deliveryApproach: [
      "Understand the departing employees and their needs",
      "Provide one-to-one career transition support",
      "Support practical job-search activity",
      "Check in through the transition period",
    ],
    engagementOptions: ["Individual outplacement support", "Group outplacement programme for larger exercises"],
    whyApex:
      "Support is practical and personal, not a generic careers pack handed over at the exit meeting.",
    relatedServiceSlugs: ["redundancy-and-restructuring-support", "employee-experience-strategy", "permanent-recruitment"],
    relatedSectorSlugs: ["manufacturers", "financial-services", "distribution"],
    faqs: [
      { id: "who-pays", question: "Who pays for outplacement support?", answer: "This is typically funded by the employer as part of supporting departing employees through a redundancy or restructuring process." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "industrial-relations-and-trade-union-negotiations",
    categorySlug: "employment-law-and-employee-relations",
    metaDescription: "HR support for industrial relations and trade union negotiations, helping employers prepare and engage constructively.",
    primaryKeyword: "industrial relations support",
    heroSummary: "Practical support preparing for and engaging in trade union negotiations and wider industrial relations matters.",
    employerChallenge:
      "Union negotiations require careful preparation and a consistent approach, particularly for employers without regular experience of collective bargaining.",
    businessOutcomes: [
      "Clearer negotiation preparation and positioning",
      "More consistent engagement with union representatives",
      "Reduced risk of avoidable disputes",
    ],
    whatItIncludes: [
      "Negotiation preparation and briefing support",
      "Guidance on collective consultation processes",
      "Support during ongoing union engagement",
    ],
    whenNeeded: [
      "Preparing for a pay or terms negotiation with a recognised union",
      "Managing an ongoing industrial relations situation",
      "Building a more structured approach to union engagement",
    ],
    whoWeSupport: "Employers with recognised trade unions or works councils who need support preparing for and managing negotiations.",
    deliveryApproach: [
      "Understand the current industrial relations context",
      "Prepare negotiation position and briefing materials",
      "Support the negotiation or consultation process",
      "Review outcomes and next steps",
    ],
    engagementOptions: ["Negotiation preparation support", "Ongoing industrial relations advisory"],
    whyApex:
      "This is informational HR support — specific legal questions about collective bargaining obligations should be confirmed with a qualified employment lawyer.",
    relatedServiceSlugs: ["redundancy-and-restructuring-support", "employee-engagement-surveys-and-action-planning", "reward-strategy"],
    relatedSectorSlugs: ["manufacturers", "distribution", "construction"],
    faqs: [
      { id: "recognised", question: "Does this require a recognised union already in place?", answer: "This service is typically most relevant where a union is already recognised, but early guidance can also help employers approaching recognition discussions." },
    ],
    legalReviewRequired: true,
  },
  {
    slug: "skilled-worker-sponsorship-hr-support",
    categorySlug: "employment-law-and-employee-relations",
    metaDescription: "HR process support for employers sponsoring Skilled Worker visas, working alongside qualified immigration advisers.",
    primaryKeyword: "skilled worker sponsorship HR support",
    heroSummary: "HR-side process support for employers sponsoring international talent, working alongside qualified immigration advisers.",
    employerChallenge:
      "Skilled Worker sponsorship involves detailed record-keeping and process obligations that sit alongside — but are distinct from — the formal immigration application itself.",
    businessOutcomes: [
      "Clearer internal sponsorship processes",
      "Better-organised right-to-work and compliance records",
      "Smoother onboarding for sponsored employees",
    ],
    whatItIncludes: [
      "Guidance on internal sponsorship HR processes",
      "Right-to-work record-keeping support",
      "Onboarding support for sponsored employees",
    ],
    whenNeeded: [
      "Becoming a licensed sponsor for the first time",
      "Scaling international hiring under an existing licence",
      "Reviewing current sponsorship record-keeping practices",
    ],
    whoWeSupport: "Employers who sponsor, or are considering sponsoring, Skilled Worker visas.",
    deliveryApproach: [
      "Understand your current or planned sponsorship activity",
      "Review internal HR processes and record-keeping",
      "Support onboarding for sponsored employees",
      "Recommend qualified immigration advice where needed",
    ],
    engagementOptions: ["HR process review", "Ongoing sponsorship HR support"],
    whyApex:
      "This is HR process support only — formal sponsor licence applications, compliance and immigration status questions must be handled by a qualified immigration adviser or solicitor.",
    relatedServiceSlugs: ["hr-compliance-audit", "employee-handbooks-and-hr-policies", "permanent-recruitment"],
    relatedSectorSlugs: ["technology", "health-care", "life-sciences"],
    faqs: [
      { id: "immigration-advice", question: "Does Apex HR provide immigration advice?", answer: "No. This is HR process support alongside your qualified immigration adviser — Apex HR does not provide immigration or visa legal advice." },
    ],
    legalReviewRequired: true,
  },

  // ---- Organisation Development & Change Management ----
  {
    slug: "organisation-design",
    categorySlug: "organisation-development-change-management",
    metaDescription: "Organisation design support to build structures that match your strategy and support how work actually gets done.",
    primaryKeyword: "organisation design",
    heroSummary: "Organisation design support to build a structure that matches your strategy and how work actually gets done.",
    employerChallenge:
      "Organisational structures often evolve informally over time, leaving unclear reporting lines, duplicated roles or gaps that slow decision-making down.",
    businessOutcomes: [
      "A structure aligned to strategic priorities",
      "Clearer roles, accountabilities and reporting lines",
      "Reduced duplication and decision-making friction",
    ],
    whatItIncludes: [
      "Current-state structure and role analysis",
      "Design of target structure and role definitions",
      "Support planning the transition",
    ],
    whenNeeded: [
      "Growth has outpaced the current structure",
      "Unclear accountabilities are slowing decisions down",
      "Planning a restructure ahead of a strategic shift",
    ],
    whoWeSupport: "Employers whose organisational structure needs to evolve to support their strategy.",
    deliveryApproach: [
      "Understand strategy, current structure and pain points",
      "Design options for a target structure",
      "Agree the preferred design and role definitions",
      "Support transition planning and communication",
    ],
    engagementOptions: ["Structure review and design", "Design plus transition support"],
    whyApex:
      "Design work starts from your strategy and how work actually flows, not a generic organisational template.",
    relatedServiceSlugs: ["change-management", "strategic-workforce-planning", "competency-frameworks"],
    relatedSectorSlugs: ["professional-services", "technology", "financial-services"],
    faqs: [
      { id: "redundancy", question: "Does organisation design always involve redundancies?", answer: "No — design changes can involve role changes without headcount reduction. Where redundancies are involved, this is planned separately and carefully." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "change-management",
    categorySlug: "organisation-development-change-management",
    metaDescription: "Change management support to help employers plan and deliver organisational change with less disruption.",
    primaryKeyword: "change management",
    heroSummary: "Practical change management support, helping you plan and deliver organisational change with less disruption to the business.",
    employerChallenge:
      "Change initiatives often fail not because the plan was wrong, but because the people side of change — communication, engagement and support — wasn't managed well.",
    businessOutcomes: [
      "A structured, well-communicated change process",
      "Higher employee engagement through the transition",
      "Reduced disruption to day-to-day operations",
    ],
    whatItIncludes: [
      "Change impact assessment and planning",
      "Communication and engagement planning",
      "Manager coaching and support through delivery",
    ],
    whenNeeded: [
      "Planning a significant organisational or process change",
      "A previous change initiative faced resistance",
      "Managing change alongside a restructure or system rollout",
    ],
    whoWeSupport: "Employers planning or delivering significant organisational change.",
    deliveryApproach: [
      "Assess the scope and impact of the change",
      "Plan communication and engagement activity",
      "Support managers through delivery",
      "Review adoption and adjust as needed",
    ],
    engagementOptions: ["Change planning support", "Full change delivery support"],
    whyApex:
      "Change management here focuses on the people side of change alongside the practical plan, not just a project timeline.",
    relatedServiceSlugs: ["organisation-design", "culture-transformation", "employee-experience-strategy"],
    relatedSectorSlugs: ["professional-services", "manufacturers", "technology"],
    faqs: [
      { id: "size", question: "Does this only apply to large-scale change?", answer: "No — the same principles apply to smaller changes, scaled to fit the size of the initiative." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "culture-transformation",
    categorySlug: "organisation-development-change-management",
    metaDescription: "Culture transformation support to help employers shift how their organisation actually operates day to day.",
    primaryKeyword: "culture transformation",
    heroSummary: "Practical support shifting organisational culture, focused on how the business actually operates day to day, not just stated values.",
    employerChallenge:
      "Culture is often described through values statements that don't match daily experience, and shifting real behaviour takes more than a new set of posters on the wall.",
    businessOutcomes: [
      "A clearer, more honest picture of current culture",
      "Behaviour change aligned to desired culture",
      "Better alignment between stated values and daily experience",
    ],
    whatItIncludes: [
      "Current-culture diagnosis, including employee input",
      "Definition of target culture and behaviours",
      "Practical initiatives to close the gap",
    ],
    whenNeeded: [
      "Values and daily behaviour don't match",
      "Following a merger, leadership change or period of rapid growth",
      "Engagement data points to cultural issues",
    ],
    whoWeSupport: "Employers who want to shift how their organisation actually operates, not just restate their values.",
    deliveryApproach: [
      "Diagnose current culture, including employee input",
      "Define target culture and priority behaviours",
      "Design practical initiatives to close the gap",
      "Review progress over time",
    ],
    engagementOptions: ["Culture diagnosis", "Diagnosis plus ongoing transformation support"],
    whyApex:
      "Work starts with an honest diagnosis of current culture, not an assumption about what the culture should say.",
    relatedServiceSlugs: ["change-management", "employee-experience-strategy", "leadership-and-management-training"],
    relatedSectorSlugs: ["technology", "startups-scale-ups", "professional-services"],
    faqs: [
      { id: "quick-fix", question: "How quickly can culture change?", answer: "Genuine culture change takes sustained effort over time — Apex HR does not promise a quick fix, but focuses on practical, visible initiatives." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "ma-people-due-diligence-and-post-merger-integration",
    categorySlug: "organisation-development-change-management",
    metaDescription: "People due diligence and post-merger integration support for M&A transactions.",
    primaryKeyword: "M&A people due diligence",
    heroSummary: "People due diligence and post-merger integration support, so workforce risk is understood before and managed after a transaction.",
    employerChallenge:
      "People risk is often under-assessed during M&A due diligence, and integration issues — culture clashes, duplicated roles, unclear reporting lines — can undermine the value of the deal.",
    businessOutcomes: [
      "A clearer picture of people risk ahead of a transaction",
      "A structured integration plan post-completion",
      "Reduced disruption and attrition during integration",
    ],
    whatItIncludes: [
      "People due diligence review ahead of transaction",
      "Integration planning across structure, culture and process",
      "Support through the integration period",
    ],
    whenNeeded: [
      "Preparing for or completing an acquisition or merger",
      "Planning integration of two organisations' people and processes",
    ],
    whoWeSupport: "Organisations undertaking M&A activity who need people-focused due diligence and integration support.",
    deliveryApproach: [
      "Review target organisation's people risk areas",
      "Report findings to inform the transaction",
      "Plan integration across structure, culture and process",
      "Support delivery through the integration period",
    ],
    engagementOptions: ["Due diligence review only", "Due diligence plus integration support"],
    whyApex:
      "This is HR and organisational due diligence support alongside your legal and financial advisers, not a substitute for them.",
    relatedServiceSlugs: ["organisation-design", "change-management", "tupe-advisory"],
    relatedSectorSlugs: ["professional-services", "financial-services", "technology"],
    faqs: [
      { id: "scope", question: "Does this replace financial or legal due diligence?", answer: "No — this focuses specifically on people and organisational risk, alongside your financial and legal due diligence workstreams." },
    ],
    legalReviewRequired: true,
  },

  // ---- Compensation, Reward & Benefits ----
  {
    slug: "salary-benchmarking",
    categorySlug: "compensation-reward-and-benefits",
    metaDescription: "Salary benchmarking to help employers set competitive, defensible pay levels for their roles and market.",
    primaryKeyword: "salary benchmarking",
    heroSummary: "Salary benchmarking to help you set pay levels that are competitive, defensible and aligned to your market.",
    employerChallenge:
      "Pay decisions made without reliable market data risk losing candidates to competitors, or paying more than necessary without knowing it.",
    businessOutcomes: [
      "Pay levels grounded in market data",
      "Stronger footing in recruitment and retention conversations",
      "A more defensible basis for pay decisions",
    ],
    whatItIncludes: [
      "Role-by-role market benchmarking",
      "Comparison against your current pay structure",
      "Recommendations for closing any gaps",
    ],
    whenNeeded: [
      "Setting pay for new or existing roles",
      "Losing candidates or staff over pay",
      "No benchmarking has been done recently",
    ],
    whoWeSupport: "Employers who want confidence that their pay levels are competitive and fair.",
    deliveryApproach: [
      "Agree the roles and market to benchmark against",
      "Gather and analyse relevant market data",
      "Compare findings against your current structure",
      "Recommend next steps",
    ],
    engagementOptions: ["One-off benchmarking exercise", "Annual benchmarking review"],
    whyApex:
      "Benchmarking is tied back to your actual pay structure and recruitment experience, not delivered as a standalone data dump.",
    relatedServiceSlugs: ["job-evaluation-and-pay-structures", "reward-strategy", "pay-equity-and-pay-gap-reporting"],
    relatedSectorSlugs: ["technology", "financial-services", "professional-services"],
    faqs: [
      { id: "data-source", question: "Where does the benchmarking data come from?", answer: "Benchmarking draws on relevant available market data sources appropriate to the roles and sector being reviewed." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "job-evaluation-and-pay-structures",
    categorySlug: "compensation-reward-and-benefits",
    metaDescription: "Job evaluation and pay structure design to create a consistent, fair basis for pay decisions.",
    primaryKeyword: "job evaluation and pay structures",
    heroSummary: "Job evaluation and pay structure design, creating a consistent, fair basis for how roles are valued and paid.",
    employerChallenge:
      "Without a consistent job evaluation approach, pay can drift apart for similar roles over time, creating fairness issues and difficult conversations.",
    businessOutcomes: [
      "A consistent, defensible basis for valuing roles",
      "A clear pay structure that's easier to administer",
      "Reduced risk of unexplained pay inconsistency",
    ],
    whatItIncludes: [
      "Job evaluation of key roles",
      "Design of a pay structure or grading framework",
      "Guidance on applying the structure to individual roles",
    ],
    whenNeeded: [
      "No formal pay structure currently exists",
      "Pay has become inconsistent across similar roles",
      "Preparing for growth and more structured pay decisions",
    ],
    whoWeSupport: "Employers who want a consistent, structured approach to valuing and paying roles.",
    deliveryApproach: [
      "Evaluate key roles using a consistent methodology",
      "Design a pay structure or grading framework",
      "Map current roles into the new structure",
      "Support rollout and ongoing application",
    ],
    engagementOptions: ["Job evaluation only", "Evaluation plus full pay-structure design"],
    whyApex:
      "The structure is designed to be usable day to day by your managers, not just a one-off consultancy deliverable.",
    relatedServiceSlugs: ["salary-benchmarking", "reward-strategy", "pay-equity-and-pay-gap-reporting"],
    relatedSectorSlugs: ["manufacturers", "care-homes", "distribution"],
    faqs: [
      { id: "maintain", question: "Who maintains the structure afterwards?", answer: "Guidance is provided so your team can apply and maintain the structure, with ongoing support available if needed." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "reward-strategy",
    categorySlug: "compensation-reward-and-benefits",
    metaDescription: "Reward strategy design connecting pay, benefits and recognition to your business and people goals.",
    primaryKeyword: "reward strategy",
    heroSummary: "A reward strategy that connects pay, benefits and recognition to your business goals and what your people actually value.",
    employerChallenge:
      "Reward decisions are often made piecemeal — a benefit added here, a pay review there — without an underlying strategy connecting them to business goals.",
    businessOutcomes: [
      "A coherent reward approach aligned to strategy",
      "Reward that supports recruitment and retention priorities",
      "Clearer reward decision-making going forward",
    ],
    whatItIncludes: [
      "Review of current reward approach and spend",
      "Reward strategy aligned to business and people goals",
      "Recommendations across pay, benefits and recognition",
    ],
    whenNeeded: [
      "Reward decisions feel reactive or inconsistent",
      "Preparing for a period of growth or change",
      "Reviewing return on current benefits and reward spend",
    ],
    whoWeSupport: "Employers who want a considered, strategic approach to reward rather than piecemeal decisions.",
    deliveryApproach: [
      "Review current reward approach and effectiveness",
      "Understand business goals and workforce priorities",
      "Design a reward strategy and recommendations",
      "Support implementation",
    ],
    engagementOptions: ["Reward strategy review", "Strategy plus implementation support"],
    whyApex:
      "Recommendations are grounded in your actual business priorities and budget, not a generic best-practice checklist.",
    relatedServiceSlugs: ["salary-benchmarking", "employee-benefits-consulting", "executive-compensation-and-share-schemes"],
    relatedSectorSlugs: ["technology", "startups-scale-ups", "professional-services"],
    faqs: [
      { id: "budget", question: "Does this require increasing reward spend?", answer: "Not necessarily — strategy work often focuses on using existing spend more effectively, as well as identifying where investment would have the most impact." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "pay-equity-and-pay-gap-reporting",
    categorySlug: "compensation-reward-and-benefits",
    metaDescription: "Pay equity analysis and pay gap reporting support, helping employers understand and address pay disparities.",
    primaryKeyword: "pay equity and pay gap reporting",
    heroSummary: "Pay equity analysis and reporting support, helping you understand pay disparities and plan a considered response.",
    employerChallenge:
      "Understanding whether pay gaps exist — and why — requires careful analysis, and getting reporting or messaging wrong can create reputational risk.",
    businessOutcomes: [
      "A clearer, evidence-based understanding of pay gaps",
      "A considered narrative and action plan",
      "Better-informed pay equity decisions going forward",
    ],
    whatItIncludes: [
      "Pay equity data analysis",
      "Support with statutory or voluntary reporting requirements",
      "Recommendations for addressing identified gaps",
    ],
    whenNeeded: [
      "Preparing statutory pay gap reporting",
      "Wanting to understand pay equity proactively",
      "Responding to a pay equity concern raised internally",
    ],
    whoWeSupport: "Employers who want a clear, evidence-based understanding of pay equity across their organisation.",
    deliveryApproach: [
      "Gather and analyse relevant pay data",
      "Identify and explain any disparities found",
      "Support reporting requirements where applicable",
      "Recommend a considered action plan",
    ],
    engagementOptions: ["Pay equity analysis", "Analysis plus reporting support"],
    whyApex:
      "Analysis and reporting are approached carefully and factually, without overstating findings or committing to specific figures the data doesn't support.",
    relatedServiceSlugs: ["job-evaluation-and-pay-structures", "reward-strategy", "diversity-equity-and-inclusion-dei-consulting"],
    relatedSectorSlugs: ["financial-services", "professional-services", "education"],
    faqs: [
      { id: "statutory", question: "Does this cover statutory gender pay gap reporting obligations?", answer: "Support is provided at a process and analysis level. Employers should confirm their specific statutory obligations with a qualified adviser, since requirements and thresholds can change." },
    ],
    legalReviewRequired: true,
  },
  {
    slug: "employee-benefits-consulting",
    categorySlug: "compensation-reward-and-benefits",
    metaDescription: "Employee benefits consulting to help employers design a benefits offering that fits their people and budget.",
    primaryKeyword: "employee benefits consulting",
    heroSummary: "Employee benefits consulting to help you design an offering that genuinely fits your people and your budget.",
    employerChallenge:
      "Benefits packages are often inherited or copied from competitors, without checking whether they actually match what employees value.",
    businessOutcomes: [
      "A benefits offering aligned to what employees value",
      "Better return on benefits spend",
      "A clearer story to tell candidates and employees",
    ],
    whatItIncludes: [
      "Review of current benefits and employee feedback",
      "Benchmarking against comparable employers",
      "Recommendations for the benefits package",
    ],
    whenNeeded: [
      "Reviewing benefits ahead of renewal",
      "Benefits uptake or satisfaction seems low",
      "Building a benefits offering for the first time",
    ],
    whoWeSupport: "Employers who want to design or review a benefits package that fits their workforce.",
    deliveryApproach: [
      "Review current benefits and gather employee input",
      "Benchmark against comparable employers",
      "Recommend a considered benefits package",
      "Support communication to employees",
    ],
    engagementOptions: ["Benefits review", "Review plus implementation support"],
    whyApex:
      "Recommendations are grounded in what your specific workforce values, not a generic benefits list.",
    relatedServiceSlugs: ["reward-strategy", "workplace-wellbeing-and-mental-health", "salary-benchmarking"],
    relatedSectorSlugs: ["technology", "professional-services", "startups-scale-ups"],
    faqs: [
      { id: "provider", question: "Does Apex HR arrange the benefits providers?", answer: "This service focuses on strategy and design; where provider selection is needed, this can be discussed as part of the engagement." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "executive-compensation-and-share-schemes",
    categorySlug: "compensation-reward-and-benefits",
    metaDescription: "Executive compensation and share scheme advisory support for senior leadership reward design.",
    primaryKeyword: "executive compensation and share schemes",
    heroSummary: "Advisory support designing executive compensation and share schemes that align leadership incentives with business goals.",
    employerChallenge:
      "Executive reward carries particular scrutiny and complexity, and getting the structure wrong can misalign incentives or create governance risk.",
    businessOutcomes: [
      "Executive reward aligned to business strategy",
      "A more defensible, considered reward structure",
      "Clearer governance around senior reward decisions",
    ],
    whatItIncludes: [
      "Review of current executive reward arrangements",
      "Market context for executive pay and incentives",
      "Recommendations on structure, informed by your goals",
    ],
    whenNeeded: [
      "Designing reward for a new senior hire",
      "Reviewing existing executive compensation arrangements",
      "Considering a share scheme for senior leadership",
    ],
    whoWeSupport: "Boards and leadership teams reviewing or designing senior executive reward.",
    deliveryApproach: [
      "Understand business strategy and governance context",
      "Review current or comparable executive reward",
      "Recommend a structure aligned to your goals",
      "Support implementation alongside legal and tax advisers",
    ],
    engagementOptions: ["Executive reward review", "Design plus implementation support"],
    whyApex:
      "This is reward design and market-context advisory support — share scheme legal and tax structuring must be confirmed with qualified legal and tax advisers.",
    relatedServiceSlugs: ["reward-strategy", "fractional-hr-director-chief-people-officer", "salary-benchmarking"],
    relatedSectorSlugs: ["financial-services", "technology", "professional-services"],
    faqs: [
      { id: "tax", question: "Does Apex HR provide tax advice on share schemes?", answer: "No — share scheme structuring should always involve qualified legal and tax advisers. Apex HR advises on reward design and market context." },
    ],
    legalReviewRequired: true,
  },

  // ---- Learning & Leadership Development ----
  {
    slug: "leadership-and-management-training",
    categorySlug: "learning-and-leadership-development",
    metaDescription: "Leadership and management training to build capable, confident people managers.",
    primaryKeyword: "leadership and management training",
    heroSummary: "Practical leadership and management training that builds capable, confident people managers, not just theory.",
    employerChallenge:
      "People are often promoted into management because they were good at their previous role, without training in how to actually manage people.",
    businessOutcomes: [
      "More confident, capable people managers",
      "Improved engagement and retention within teams",
      "More consistent management practice across the business",
    ],
    whatItIncludes: [
      "Core management skills training",
      "Practical tools for everyday management situations",
      "Optional follow-up coaching or reinforcement sessions",
    ],
    whenNeeded: [
      "New or first-time managers need support",
      "Management practice is inconsistent across the business",
      "Engagement data points to management-related issues",
    ],
    whoWeSupport: "Employers who want to build genuinely capable people managers, not just tick a training box.",
    deliveryApproach: [
      "Understand current management capability and gaps",
      "Design training relevant to your management context",
      "Deliver training with practical, applicable tools",
      "Support reinforcement after the session",
    ],
    engagementOptions: ["Single training workshop", "Structured management development programme"],
    whyApex:
      "Training is designed around your actual management challenges, not delivered as an off-the-shelf course.",
    relatedServiceSlugs: ["executive-coaching-and-360-feedback", "learning-strategy-and-capability-development", "performance-management"],
    relatedSectorSlugs: ["care-homes", "hospitality", "manufacturers"],
    faqs: [
      { id: "format", question: "Is training delivered in person or online?", answer: "Format is agreed based on your team's needs and preferences, including in-person, virtual or blended delivery." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "executive-coaching-and-360-feedback",
    categorySlug: "learning-and-leadership-development",
    metaDescription: "Executive coaching and 360-degree feedback to support senior leaders' development.",
    primaryKeyword: "executive coaching",
    heroSummary: "One-to-one executive coaching and structured 360-degree feedback to support senior leaders' development.",
    employerChallenge:
      "Senior leaders often have the least access to honest feedback and development support, precisely when their impact on the organisation is greatest.",
    businessOutcomes: [
      "More self-aware, effective senior leaders",
      "Structured, actionable feedback for development",
      "Stronger leadership behaviour aligned to organisational needs",
    ],
    whatItIncludes: [
      "One-to-one executive coaching sessions",
      "Structured 360-degree feedback process",
      "A development plan based on feedback themes",
    ],
    whenNeeded: [
      "Supporting a leader in a new or expanded role",
      "Development feedback is currently limited or informal",
      "Preparing a leader for greater responsibility",
    ],
    whoWeSupport: "Senior leaders and the organisations investing in their development.",
    deliveryApproach: [
      "Agree coaching goals and, where relevant, 360 scope",
      "Gather structured feedback from relevant colleagues",
      "Deliver ongoing one-to-one coaching sessions",
      "Review progress against development goals",
    ],
    engagementOptions: ["Coaching only", "360 feedback only", "Combined coaching and 360 programme"],
    whyApex:
      "Coaching is grounded in structured feedback and organisational context, not generic leadership theory alone.",
    relatedServiceSlugs: ["leadership-and-management-training", "succession-planning-and-talent-mapping", "fractional-hr-director-chief-people-officer"],
    relatedSectorSlugs: ["financial-services", "professional-services", "technology"],
    faqs: [
      { id: "confidential", question: "Is coaching confidential?", answer: "Coaching conversations are treated as confidential between coach and leader, with themes (not verbatim content) shared with sponsors where agreed in advance." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "learning-strategy-and-capability-development",
    categorySlug: "learning-and-leadership-development",
    metaDescription: "Learning strategy and capability development support to build a coherent approach to workforce development.",
    primaryKeyword: "learning strategy",
    heroSummary: "Learning strategy support to help you build a coherent, sustainable approach to developing your workforce.",
    employerChallenge:
      "Training often happens reactively — a course here, a workshop there — without a strategy connecting it to the capabilities the business actually needs.",
    businessOutcomes: [
      "A learning approach connected to business capability needs",
      "More efficient use of learning and development budget",
      "A clearer picture of capability gaps across the organisation",
    ],
    whatItIncludes: [
      "Review of current learning activity and capability gaps",
      "Learning strategy aligned to business priorities",
      "Recommendations on delivery approach and prioritisation",
    ],
    whenNeeded: [
      "Learning and development activity feels disconnected from strategy",
      "Reviewing learning budget and provider spend",
      "Planning capability development for a growth phase",
    ],
    whoWeSupport: "Employers who want a more strategic, connected approach to workforce learning and development.",
    deliveryApproach: [
      "Review current learning activity and capability gaps",
      "Understand business priorities and future capability needs",
      "Design a learning strategy and priority roadmap",
      "Support implementation planning",
    ],
    engagementOptions: ["Learning strategy review", "Strategy plus implementation support"],
    whyApex:
      "Strategy is grounded in the capabilities your business actually needs next, not a generic learning framework.",
    relatedServiceSlugs: ["leadership-and-management-training", "competency-frameworks", "hr-software-selection"],
    relatedSectorSlugs: ["technology", "professional-services", "engineers"],
    faqs: [
      { id: "content", question: "Does Apex HR create training content?", answer: "Strategy and roadmap design is the primary focus; specific content or course delivery can be discussed as part of the engagement." },
    ],
    legalReviewRequired: false,
  },

  // ---- Performance & Talent Management ----
  {
    slug: "performance-management",
    categorySlug: "performance-and-talent-management",
    metaDescription: "Performance management design that supports fair, consistent and genuinely useful performance conversations.",
    primaryKeyword: "performance management design",
    heroSummary: "Performance management design that supports fair, consistent conversations managers and employees actually find useful.",
    employerChallenge:
      "Many performance processes exist mainly to justify pay decisions, leaving managers and employees seeing them as a box-ticking exercise rather than a useful conversation.",
    businessOutcomes: [
      "More consistent, fairer performance decisions",
      "Performance conversations that feel genuinely useful",
      "A clearer link between performance and development",
    ],
    whatItIncludes: [
      "Review of current performance process",
      "Design of a process that fits your culture and size",
      "Manager guidance and training on using it well",
    ],
    whenNeeded: [
      "The current process feels bureaucratic or unused",
      "Performance decisions feel inconsistent across teams",
      "Building a performance process for the first time",
    ],
    whoWeSupport: "Employers who want a performance process people actually engage with, not just complete.",
    deliveryApproach: [
      "Review current process and gather feedback",
      "Design a process that fits your culture and scale",
      "Support manager training on using it effectively",
      "Review adoption and refine over time",
    ],
    engagementOptions: ["Process design", "Design plus manager training"],
    whyApex:
      "The design starts from what managers and employees actually find useful, not a generic annual-review template.",
    relatedServiceSlugs: ["succession-planning-and-talent-mapping", "competency-frameworks", "leadership-and-management-training"],
    relatedSectorSlugs: ["professional-services", "technology", "manufacturers"],
    faqs: [
      { id: "annual", question: "Does this have to be an annual review process?", answer: "No — many organisations now prefer more frequent, lighter-touch check-ins. The right cadence is designed around your context." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "succession-planning-and-talent-mapping",
    categorySlug: "performance-and-talent-management",
    metaDescription: "Succession planning and talent mapping to help employers prepare for key role transitions.",
    primaryKeyword: "succession planning",
    heroSummary: "Succession planning and talent mapping, so you know who could step up when a key role becomes vacant.",
    employerChallenge:
      "Losing a key person unexpectedly is disruptive when there's no clear view of who could step in, or what development they'd need first.",
    businessOutcomes: [
      "A clearer view of succession risk in key roles",
      "Development plans for potential successors",
      "Reduced disruption from unplanned departures",
    ],
    whatItIncludes: [
      "Identification of business-critical roles",
      "Talent mapping against those roles",
      "Development recommendations for identified successors",
    ],
    whenNeeded: [
      "No clear succession plan for key roles",
      "A senior leader's departure would create significant risk",
      "Planning for retirement or planned leadership transition",
    ],
    whoWeSupport: "Employers who want to reduce the risk of losing key people without a plan in place.",
    deliveryApproach: [
      "Identify business-critical roles and risk",
      "Map potential internal successors",
      "Recommend development to close readiness gaps",
      "Review the plan periodically",
    ],
    engagementOptions: ["Succession risk review", "Full talent mapping and development planning"],
    whyApex:
      "The focus is on practical readiness — real development plans, not just a list of names on an org chart.",
    relatedServiceSlugs: ["performance-management", "competency-frameworks", "executive-coaching-and-360-feedback"],
    relatedSectorSlugs: ["professional-services", "manufacturers", "financial-services"],
    faqs: [
      { id: "small-business", question: "Is this only relevant for large organisations?", answer: "No — even a small leadership team benefits from understanding succession risk in a handful of critical roles." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "competency-frameworks",
    categorySlug: "performance-and-talent-management",
    metaDescription: "Competency framework design to create a consistent basis for recruitment, development and performance.",
    primaryKeyword: "competency frameworks",
    heroSummary: "Competency framework design that creates one consistent basis for recruitment, development and performance decisions.",
    employerChallenge:
      "Without a shared framework, recruitment, performance and development can end up assessing people against different, inconsistent expectations.",
    businessOutcomes: [
      "A consistent basis for recruitment and performance decisions",
      "Clearer expectations at each level of the organisation",
      "Better-aligned development planning",
    ],
    whatItIncludes: [
      "Definition of core and role-specific competencies",
      "Behavioural indicators at each level",
      "Guidance on applying the framework across HR processes",
    ],
    whenNeeded: [
      "Recruitment, performance and development use inconsistent criteria",
      "Building a more structured approach to talent decisions",
      "Scaling and needing a consistent framework across more roles",
    ],
    whoWeSupport: "Employers who want one consistent framework underpinning their HR processes.",
    deliveryApproach: [
      "Identify core and role-specific competencies",
      "Define behavioural indicators at each level",
      "Support embedding the framework across HR processes",
    ],
    engagementOptions: ["Framework design", "Design plus embedding support"],
    whyApex:
      "Frameworks are built to be genuinely usable across recruitment, performance and development, not filed away after launch.",
    relatedServiceSlugs: ["performance-management", "succession-planning-and-talent-mapping", "job-evaluation-and-pay-structures"],
    relatedSectorSlugs: ["professional-services", "financial-services", "technology"],
    faqs: [
      { id: "roles", question: "Does the framework cover every role individually?", answer: "Frameworks typically define core organisation-wide competencies plus role-family-specific ones, rather than a unique framework per individual role." },
    ],
    legalReviewRequired: false,
  },

  // ---- Employee Experience & Engagement ----
  {
    slug: "employee-experience-strategy",
    categorySlug: "employee-experience-and-engagement",
    metaDescription: "Employee experience strategy covering the full employee journey from attraction through to exit.",
    primaryKeyword: "employee experience strategy",
    heroSummary: "An employee experience strategy that looks at the full journey — from attraction through to exit — not just isolated initiatives.",
    employerChallenge:
      "Employee experience initiatives often happen in isolation — a wellbeing session here, an onboarding tweak there — without a coherent view of the whole journey.",
    businessOutcomes: [
      "A coherent view of the employee journey",
      "Better-prioritised experience investments",
      "Improved engagement and retention over time",
    ],
    whatItIncludes: [
      "Employee journey mapping",
      "Identification of priority moments that matter",
      "A strategy and roadmap for improvement",
    ],
    whenNeeded: [
      "Experience initiatives feel disconnected or ad hoc",
      "Engagement or retention data points to journey gaps",
      "Building an employee experience strategy for the first time",
    ],
    whoWeSupport: "Employers who want a coherent, prioritised approach to employee experience.",
    deliveryApproach: [
      "Map the current employee journey",
      "Identify the moments that matter most",
      "Design a strategy and prioritised roadmap",
      "Support implementation of priority initiatives",
    ],
    engagementOptions: ["Journey mapping and strategy", "Strategy plus implementation support"],
    whyApex:
      "The starting point is your actual employee journey and data, not a generic experience framework.",
    relatedServiceSlugs: ["employee-engagement-surveys-and-action-planning", "employer-branding-and-employee-value-proposition-evp", "workplace-wellbeing-and-mental-health"],
    relatedSectorSlugs: ["technology", "hospitality", "professional-services"],
    faqs: [
      { id: "size", question: "Does this suit smaller employers?", answer: "Yes — journey mapping and prioritisation scale to the size of the organisation and the resources available." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "employee-engagement-surveys-and-action-planning",
    categorySlug: "employee-experience-and-engagement",
    metaDescription: "Employee engagement surveys and practical action planning to turn results into real change.",
    primaryKeyword: "employee engagement survey",
    heroSummary: "Employee engagement surveys designed to get honest input, paired with practical action planning that turns results into change.",
    employerChallenge:
      "Engagement surveys often generate a report that sits unread, with no clear follow-through — which can make employees more sceptical about being asked again.",
    businessOutcomes: [
      "Honest, useful engagement data",
      "A practical action plan managers can actually deliver",
      "Improved trust that feedback leads to change",
    ],
    whatItIncludes: [
      "Survey design and distribution",
      "Results analysis by team and theme",
      "Facilitated action planning with leaders and managers",
    ],
    whenNeeded: [
      "No recent engagement data exists",
      "Previous surveys didn't lead to visible action",
      "Wanting to understand engagement ahead of a change initiative",
    ],
    whoWeSupport: "Employers who want engagement data that actually leads to action, not just a report.",
    deliveryApproach: [
      "Design and distribute the survey",
      "Analyse results by team and theme",
      "Facilitate action planning with leaders",
      "Support follow-through and communication",
    ],
    engagementOptions: ["Survey and analysis only", "Survey plus facilitated action planning"],
    whyApex:
      "The focus is as much on what happens after the survey as the survey itself.",
    relatedServiceSlugs: ["employee-experience-strategy", "leadership-and-management-training", "workplace-wellbeing-and-mental-health"],
    relatedSectorSlugs: ["professional-services", "manufacturers", "care-homes"],
    faqs: [
      { id: "anonymous", question: "Are survey responses anonymous?", answer: "Anonymity or confidentiality settings are agreed upfront and clearly communicated to employees before the survey is launched." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "employer-branding-and-employee-value-proposition-evp",
    categorySlug: "employee-experience-and-engagement",
    metaDescription: "Employer branding and Employee Value Proposition (EVP) development to support recruitment and retention.",
    primaryKeyword: "employer branding and EVP",
    heroSummary: "Employer branding and Employee Value Proposition development that reflects what it's genuinely like to work for you.",
    employerChallenge:
      "An employer brand that overstates reality can attract candidates for the wrong reasons, leading to early disappointment and attrition.",
    businessOutcomes: [
      "A clearer, more honest employer value proposition",
      "Stronger alignment between recruitment marketing and reality",
      "Improved candidate attraction and early retention",
    ],
    whatItIncludes: [
      "Research into what employees genuinely value",
      "EVP definition and messaging framework",
      "Guidance on applying it across recruitment channels",
    ],
    whenNeeded: [
      "No clear or current employer value proposition exists",
      "Struggling to attract the right candidates",
      "Employer brand and actual employee experience have drifted apart",
    ],
    whoWeSupport: "Employers who want an employer brand grounded in genuine employee experience.",
    deliveryApproach: [
      "Research current employee experience and perception",
      "Define an EVP grounded in that research",
      "Develop messaging and application guidance",
      "Support rollout across recruitment channels",
    ],
    engagementOptions: ["EVP research and definition", "EVP plus rollout support"],
    whyApex:
      "The EVP is built from genuine employee input, not written in isolation by a marketing team.",
    relatedServiceSlugs: ["employee-experience-strategy", "permanent-recruitment", "graduate-schemes-and-early-careers-design"],
    relatedSectorSlugs: ["technology", "startups-scale-ups", "hospitality"],
    faqs: [
      { id: "marketing", question: "Does this include recruitment marketing design?", answer: "This service focuses on defining the EVP and messaging framework; visual/creative execution can be coordinated with your marketing function or agency." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "workplace-wellbeing-and-mental-health",
    categorySlug: "employee-experience-and-engagement",
    metaDescription: "Workplace wellbeing and mental health support to help employers build a genuinely supportive working environment.",
    primaryKeyword: "workplace wellbeing and mental health",
    heroSummary: "Practical support building a workplace wellbeing approach that goes beyond a single awareness day.",
    employerChallenge:
      "Wellbeing initiatives can end up as isolated, one-off events rather than addressing the working conditions that actually affect employee wellbeing.",
    businessOutcomes: [
      "A more coherent, sustained wellbeing approach",
      "Better manager confidence supporting wellbeing conversations",
      "Reduced avoidable absence linked to wellbeing issues",
    ],
    whatItIncludes: [
      "Review of current wellbeing approach and risk areas",
      "Wellbeing strategy and practical initiatives",
      "Manager guidance on supportive conversations",
    ],
    whenNeeded: [
      "Wellbeing activity feels disconnected or one-off",
      "Absence or engagement data suggests wellbeing concerns",
      "Building a wellbeing strategy for the first time",
    ],
    whoWeSupport: "Employers who want a genuine, sustained approach to workplace wellbeing.",
    deliveryApproach: [
      "Review current wellbeing approach and risk areas",
      "Design a wellbeing strategy and practical initiatives",
      "Support manager training on wellbeing conversations",
      "Review impact over time",
    ],
    engagementOptions: ["Wellbeing strategy review", "Strategy plus manager training"],
    whyApex:
      "This is HR strategy and manager-capability support — it is not a substitute for clinical or occupational health advice, which is signposted where appropriate.",
    relatedServiceSlugs: ["employee-experience-strategy", "employee-benefits-consulting", "employee-engagement-surveys-and-action-planning"],
    relatedSectorSlugs: ["care-homes", "health-care", "education"],
    faqs: [
      { id: "clinical", question: "Does Apex HR provide clinical mental health support?", answer: "No. This is HR strategy and manager-capability support. Employees needing clinical support should be signposted to appropriate occupational health or medical services." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "diversity-equity-and-inclusion-dei-consulting",
    categorySlug: "employee-experience-and-engagement",
    metaDescription: "DEI consulting to help employers build a genuinely inclusive workplace, grounded in practical action.",
    primaryKeyword: "DEI consulting",
    heroSummary: "Diversity, equity and inclusion consulting grounded in practical action, not just a policy statement.",
    employerChallenge:
      "DEI commitments can end up as a values statement with no practical follow-through, which employees notice and often distrust.",
    businessOutcomes: [
      "A clearer, evidence-based DEI starting point",
      "Practical initiatives with measurable focus areas",
      "Improved trust that commitments are genuine",
    ],
    whatItIncludes: [
      "Review of current DEI position and data",
      "Priority focus areas and practical initiatives",
      "Guidance embedding DEI into everyday HR processes",
    ],
    whenNeeded: [
      "No clear DEI strategy exists yet",
      "Wanting to move from statement to practical action",
      "Embedding DEI into recruitment, reward or development processes",
    ],
    whoWeSupport: "Employers who want a genuine, practical approach to diversity, equity and inclusion.",
    deliveryApproach: [
      "Review current position, data and employee feedback",
      "Identify priority focus areas",
      "Design practical, achievable initiatives",
      "Support embedding DEI into everyday HR processes",
    ],
    engagementOptions: ["DEI review and priority-setting", "Review plus implementation support"],
    whyApex:
      "The focus is on practical, achievable initiatives grounded in your actual data, not generic commitments.",
    relatedServiceSlugs: ["pay-equity-and-pay-gap-reporting", "employee-experience-strategy", "employer-branding-and-employee-value-proposition-evp"],
    relatedSectorSlugs: ["professional-services", "education", "charity"],
    faqs: [
      { id: "legal", question: "Does this cover legal compliance around equality law?", answer: "This is a practical HR and strategy service. Specific equality-law compliance questions should be confirmed with a qualified employment lawyer." },
    ],
    legalReviewRequired: true,
  },

  // ---- HR Technology & People Analytics ----
  {
    slug: "hris-implementation",
    categorySlug: "hr-technology-and-people-analytics",
    metaDescription: "HRIS implementation support to help employers roll out a new HR system smoothly.",
    primaryKeyword: "HRIS implementation",
    heroSummary: "Practical support implementing a new HRIS, so the rollout actually improves how HR data and processes work.",
    employerChallenge:
      "HR system implementations often run over budget and under-deliver when the underlying HR processes weren't reviewed before the system was configured around them.",
    businessOutcomes: [
      "A smoother, better-planned implementation",
      "HR processes reviewed, not just replicated, in the new system",
      "Improved data quality and manager self-service",
    ],
    whatItIncludes: [
      "Requirements gathering and process review",
      "Implementation planning and project support",
      "Support with data migration and go-live",
    ],
    whenNeeded: [
      "Implementing a new HRIS or replacing an existing one",
      "Current HR processes are manual or spreadsheet-based",
      "A previous implementation didn't go to plan",
    ],
    whoWeSupport: "Employers implementing a new HR information system.",
    deliveryApproach: [
      "Review current processes and requirements",
      "Support vendor and configuration decisions",
      "Manage implementation planning and stakeholders",
      "Support go-live and early adoption",
    ],
    engagementOptions: ["Requirements and planning support", "Full implementation project support"],
    whyApex:
      "Implementation is grounded in reviewing your HR processes first, not just replicating existing spreadsheets in a new system.",
    relatedServiceSlugs: ["hr-software-selection", "people-analytics-and-hr-dashboards", "digital-hr-transformation"],
    relatedSectorSlugs: ["professional-services", "technology", "manufacturers"],
    faqs: [
      { id: "vendor", question: "Does Apex HR sell HR software?", answer: "No — Apex HR provides independent implementation support, not software sales, so recommendations stay focused on your needs." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "hr-software-selection",
    categorySlug: "hr-technology-and-people-analytics",
    metaDescription: "Independent HR software selection support to help employers choose the right system for their needs.",
    primaryKeyword: "HR software selection",
    heroSummary: "Independent support choosing HR software, based on your actual requirements rather than a vendor's sales pitch.",
    employerChallenge:
      "The HR software market is crowded, and choosing the wrong system can mean years of working around a poor fit.",
    businessOutcomes: [
      "A system genuinely matched to your requirements",
      "A more structured, confident selection process",
      "Reduced risk of costly re-selection later",
    ],
    whatItIncludes: [
      "Requirements gathering across HR and stakeholders",
      "Market review and shortlist of suitable systems",
      "Support through vendor demos and decision-making",
    ],
    whenNeeded: [
      "Selecting HR software for the first time",
      "Current system no longer fits your needs",
      "Wanting an independent view before committing to a vendor",
    ],
    whoWeSupport: "Employers choosing new HR software who want independent, requirements-led support.",
    deliveryApproach: [
      "Gather requirements from HR and key stakeholders",
      "Review the market and shortlist suitable systems",
      "Support demos, evaluation and decision-making",
      "Hand over to implementation planning",
    ],
    engagementOptions: ["Requirements and shortlist support", "Full selection process support"],
    whyApex:
      "Advice is independent of any software vendor, so recommendations are based on fit, not commission.",
    relatedServiceSlugs: ["hris-implementation", "people-analytics-and-hr-dashboards", "digital-hr-transformation"],
    relatedSectorSlugs: ["professional-services", "technology", "financial-services"],
    faqs: [
      { id: "independent", question: "Is Apex HR affiliated with any software vendor?", answer: "No — this is independent advisory support, which is what allows recommendations to focus purely on fit for your business." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "people-analytics-and-hr-dashboards",
    categorySlug: "hr-technology-and-people-analytics",
    metaDescription: "People analytics and HR dashboard design to give employers clearer visibility of their workforce.",
    primaryKeyword: "people analytics and HR dashboards",
    heroSummary: "People analytics and dashboard design that give leaders genuinely useful visibility of their workforce.",
    employerChallenge:
      "Many organisations hold plenty of HR data but struggle to turn it into insight that actually informs decisions.",
    businessOutcomes: [
      "Clearer, decision-useful workforce insight",
      "Dashboards leaders and managers actually use",
      "Better-informed people decisions over time",
    ],
    whatItIncludes: [
      "Review of available HR data and current reporting",
      "Design of relevant metrics and dashboards",
      "Guidance on using insight in decision-making",
    ],
    whenNeeded: [
      "HR reporting is manual or inconsistent",
      "Leaders want better workforce visibility",
      "Data exists but isn't being used effectively",
    ],
    whoWeSupport: "Employers who want to turn existing HR data into genuinely useful insight.",
    deliveryApproach: [
      "Review available data and current reporting",
      "Define metrics that matter to your business",
      "Design dashboards and reporting approach",
      "Support adoption by leaders and managers",
    ],
    engagementOptions: ["Metrics and dashboard design", "Design plus ongoing analytics support"],
    whyApex:
      "The focus is on metrics that are genuinely useful to your decisions, not a generic dashboard template.",
    relatedServiceSlugs: ["hris-implementation", "digital-hr-transformation", "strategic-workforce-planning"],
    relatedSectorSlugs: ["technology", "financial-services", "professional-services"],
    faqs: [
      { id: "system", question: "Do we need a specific HR system for this?", answer: "Analytics can often be built from existing data sources; a dedicated system can make this easier but isn't always essential to get started." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "digital-hr-transformation",
    categorySlug: "hr-technology-and-people-analytics",
    metaDescription: "Digital HR transformation support to modernise HR processes, systems and ways of working.",
    primaryKeyword: "digital HR transformation",
    heroSummary: "Digital HR transformation support that modernises processes and systems in a way your team can actually sustain.",
    employerChallenge:
      "HR transformation projects can become overly ambitious technology projects that lose sight of the practical process and people changes needed alongside them.",
    businessOutcomes: [
      "HR processes that are more efficient and less manual",
      "Technology change that's actually adopted",
      "A more sustainable, modern HR operating model",
    ],
    whatItIncludes: [
      "Review of current HR processes and technology",
      "Transformation roadmap and prioritisation",
      "Support through delivery and change adoption",
    ],
    whenNeeded: [
      "HR processes remain largely manual or paper-based",
      "Planning a broader HR technology and process overhaul",
      "A previous transformation stalled or lost momentum",
    ],
    whoWeSupport: "Employers planning a broader modernisation of their HR technology and processes.",
    deliveryApproach: [
      "Review current HR processes and technology",
      "Design a realistic transformation roadmap",
      "Support delivery of priority initiatives",
      "Support change adoption across the HR team",
    ],
    engagementOptions: ["Transformation roadmap", "Roadmap plus delivery support"],
    whyApex:
      "The roadmap is scoped to be realistic and sustainable for your team, not an unlimited technology wish-list.",
    relatedServiceSlugs: ["hris-implementation", "hr-software-selection", "people-analytics-and-hr-dashboards"],
    relatedSectorSlugs: ["professional-services", "manufacturers", "financial-services"],
    faqs: [
      { id: "scope", question: "Does transformation always mean a new system?", answer: "Not necessarily — transformation can include process redesign and better use of existing systems, not only new technology." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "ai-workplace-policy-and-hr-integration",
    categorySlug: "hr-technology-and-people-analytics",
    metaDescription: "AI workplace policy and HR integration support, helping employers set clear, considered guidelines for AI use at work.",
    primaryKeyword: "AI workplace policy",
    heroSummary: "Practical support setting clear, considered workplace policy for how AI tools are used across your organisation.",
    employerChallenge:
      "Employees are adopting AI tools faster than most employers have set clear policy for, creating risk around data, fairness and consistency.",
    businessOutcomes: [
      "Clear guidelines for appropriate AI use at work",
      "Reduced risk around data and confidentiality",
      "A more considered, consistent approach across teams",
    ],
    whatItIncludes: [
      "Review of current AI tool use and risk areas",
      "AI workplace policy drafted for your organisation",
      "Manager and employee guidance on the policy",
    ],
    whenNeeded: [
      "No current policy on employee use of AI tools",
      "Employees are already using AI tools informally",
      "Considering AI-supported HR processes and want clear guardrails",
    ],
    whoWeSupport: "Employers who want clear, practical guidance on AI use in the workplace.",
    deliveryApproach: [
      "Review current AI tool use and risk areas",
      "Draft a workplace AI policy for your organisation",
      "Support communication and manager guidance",
      "Review and update the policy as practice evolves",
    ],
    engagementOptions: ["AI policy drafting", "Policy plus wider HR-process AI advisory"],
    whyApex:
      "This is HR policy and process guidance, not legal or data-protection advice — specific legal questions should be confirmed with a qualified adviser.",
    relatedServiceSlugs: ["employee-handbooks-and-hr-policies", "digital-hr-transformation", "hr-compliance-audit"],
    relatedSectorSlugs: ["technology", "professional-services", "financial-services"],
    faqs: [
      { id: "data-protection", question: "Does this cover data protection compliance for AI tools?", answer: "General HR policy guidance is provided; specific data-protection compliance questions should be confirmed with a qualified data-protection or legal adviser." },
    ],
    legalReviewRequired: true,
  },

  // ---- Strategic HR & Workforce Advisory ----
  {
    slug: "people-strategy",
    categorySlug: "strategic-hr-and-workforce-advisory",
    metaDescription: "People strategy development connecting HR priorities directly to business goals.",
    primaryKeyword: "people strategy",
    heroSummary: "A people strategy that connects HR priorities directly to what the business is actually trying to achieve.",
    employerChallenge:
      "HR activity can end up disconnected from business strategy, with initiatives chosen because they're familiar rather than because they support what the business needs next.",
    businessOutcomes: [
      "HR priorities aligned to business strategy",
      "A clearer roadmap for HR investment",
      "Stronger case for HR's role at leadership level",
    ],
    whatItIncludes: [
      "Review of business strategy and current HR activity",
      "Definition of people strategy priorities",
      "A practical roadmap for delivery",
    ],
    whenNeeded: [
      "HR activity feels disconnected from business goals",
      "Building HR strategy ahead of a growth phase",
      "No current people strategy exists",
    ],
    whoWeSupport: "Leadership teams who want HR to be a genuine strategic partner to the business.",
    deliveryApproach: [
      "Understand business strategy and priorities",
      "Review current HR activity and capability",
      "Define people strategy priorities and roadmap",
      "Support ongoing delivery and review",
    ],
    engagementOptions: ["Strategy definition", "Strategy plus ongoing delivery support"],
    whyApex:
      "Strategy work starts from your business goals, not a generic HR framework applied regardless of context.",
    relatedServiceSlugs: ["strategic-workforce-planning", "fractional-hr-director-chief-people-officer", "organisation-design"],
    relatedSectorSlugs: ["technology", "professional-services", "startups-scale-ups"],
    faqs: [
      { id: "size", question: "Is this only relevant for larger organisations?", answer: "No — even a small leadership team benefits from a clear, deliberate people strategy connected to business goals." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "strategic-workforce-planning",
    categorySlug: "strategic-hr-and-workforce-advisory",
    metaDescription: "Strategic workforce planning to help employers plan future headcount and capability needs.",
    primaryKeyword: "strategic workforce planning",
    heroSummary: "Strategic workforce planning to help you understand future headcount and capability needs before you need them.",
    employerChallenge:
      "Hiring plans are often built reactively, role by role, rather than from a clear view of what capabilities the business will need over the next few years.",
    businessOutcomes: [
      "A clearer view of future workforce needs",
      "More proactive, better-timed hiring plans",
      "Reduced risk of capability gaps during growth",
    ],
    whatItIncludes: [
      "Review of business plans and current workforce",
      "Modelling of future headcount and capability needs",
      "A workforce plan to guide hiring and development",
    ],
    whenNeeded: [
      "Planning for significant growth or change",
      "Hiring plans feel reactive rather than planned",
      "Preparing workforce plans for investment or board reporting",
    ],
    whoWeSupport: "Employers who want to plan their future workforce proactively, not just react to vacancies.",
    deliveryApproach: [
      "Understand business plans and growth drivers",
      "Review current workforce and capability",
      "Model future workforce needs",
      "Produce a practical workforce plan",
    ],
    engagementOptions: ["Workforce planning exercise", "Ongoing workforce planning support"],
    whyApex:
      "Planning is grounded in your actual business plans and growth drivers, not generic workforce modelling.",
    relatedServiceSlugs: ["people-strategy", "permanent-recruitment", "recruitment-process-outsourcing-rpo"],
    relatedSectorSlugs: ["technology", "manufacturers", "financial-services"],
    faqs: [
      { id: "accuracy", question: "How accurate can workforce planning really be?", answer: "Workforce plans are a planning tool based on reasonable assumptions, reviewed and adjusted as circumstances change — not a guarantee of exact future headcount." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "global-mobility-and-expatriate-hr-management",
    categorySlug: "strategic-hr-and-workforce-advisory",
    metaDescription: "Global mobility and expatriate HR management support for employers moving people across borders.",
    primaryKeyword: "global mobility HR management",
    heroSummary: "HR support for global mobility and expatriate assignments, working alongside your immigration, tax and legal advisers.",
    employerChallenge:
      "Moving employees across borders involves coordinating HR, immigration, tax and often local employment law, and gaps between these workstreams create risk and a poor employee experience.",
    businessOutcomes: [
      "Better-coordinated international assignments",
      "A clearer HR process for supporting mobile employees",
      "Improved employee experience during relocation",
    ],
    whatItIncludes: [
      "Assignment planning and HR process support",
      "Coordination points with immigration, tax and legal advisers",
      "Support for the assignee's HR experience throughout",
    ],
    whenNeeded: [
      "Planning an international assignment or relocation",
      "Building a repeatable global mobility process",
      "Reviewing current mobility HR practices",
    ],
    whoWeSupport: "Employers managing international assignments or building a global mobility capability.",
    deliveryApproach: [
      "Understand the assignment and business context",
      "Plan the HR process and coordination points",
      "Support the assignee through the process",
      "Review and refine your mobility approach over time",
    ],
    engagementOptions: ["Single assignment support", "Global mobility process design"],
    whyApex:
      "This is HR process and coordination support — immigration, tax and local employment law advice must come from qualified specialists in each relevant jurisdiction.",
    relatedServiceSlugs: ["skilled-worker-sponsorship-hr-support", "strategic-workforce-planning", "people-strategy"],
    relatedSectorSlugs: ["financial-services", "technology", "life-sciences"],
    faqs: [
      { id: "tax-legal", question: "Does Apex HR handle tax and immigration for the assignment?", answer: "No — Apex HR coordinates the HR process. Tax, immigration and local employment law must be handled by qualified specialists in the relevant jurisdiction." },
    ],
    legalReviewRequired: true,
  },
];
