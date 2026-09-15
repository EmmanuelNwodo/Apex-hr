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
  /**
   * SEO audit Phase 3 Batch 5: one short paragraph explaining how this
   * family's child services differ from one another — answers "how do
   * these child services differ", the parent-page-only question a child
   * page never needs to answer for its own siblings.
   */
  differentiation: string;
  /**
   * SEO audit Phase 3 Batch 5: potential organisational outcomes for this
   * family, in cautious ("can help", "may support") language — never a
   * guaranteed result.
   */
  outcomes: string[];
  /** SEO audit Phase 3 Batch 5: 2-3 genuinely related service-family slugs. */
  relatedFamilySlugs: string[];
  /**
   * SEO audit Phase 3 Batch 5: genuine, family-specific decision-stage
   * FAQs — not the same questions repeated across every family page.
   */
  faqs: ContentFaqItem[];
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
  /**
   * SEO audit Phase 3 Batch 6A: what this specific service does NOT cover —
   * explicit scope boundaries, distinct from `whatItIncludes`. Optional
   * because most of the 48 services don't need one; only added where a
   * genuine boundary/cannibalisation risk exists (see the six Outsourced HR
   * Services children). Canonical-page-only — never read by
   * ServiceLocationTemplate or CategoryLocationTemplate, so adding it never
   * changes any service-location or category-location page's output.
   */
  outOfScope?: string[];
  /**
   * SEO audit Phase 3 Batch 6A: one short paragraph distinguishing this
   * service from its closest siblings, so a parent family's child services
   * don't read as interchangeable. Canonical-page-only, same rationale as
   * `outOfScope`.
   */
  differentiationNote?: string;
  /**
   * SEO audit Phase 3 Batch 6A: extra FAQs beyond `faqs`, rendered only on
   * the canonical service page. Deliberately a separate field rather than
   * appending to `faqs` — service-location combination pages read
   * `faqs.slice(0, 3)` directly (see src/app/services/[slug]/page.tsx), so
   * appending here would silently change location-page content for the two
   * of these six services that have service-location combinations
   * (HR Compliance Audit, HR Support for Small Businesses & Startups).
   * `additionalFaqs` is never read by any location template.
   */
  additionalFaqs?: ContentFaqItem[];
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
    differentiation:
      "The right service usually depends on how much ongoing support is needed and at what level. Retained HR Services and HR Support for Small Businesses & Startups both provide ongoing, day-to-day advisory access: the difference is business size and complexity. A Fractional HR Director or Chief People Officer sits at leadership-team level, focused on strategic direction rather than day-to-day queries. HR Compliance Audit and Employee Handbooks & HR Policies are more contained, output-focused reviews rather than ongoing partnerships, and Payroll Advisory is specifically about payroll process and provider relationships, not general HR support.",
    outcomes: [
      "A more consistent approach to everyday HR issues as they arise",
      "Contracts, handbooks and policies that reflect how the business actually operates",
      "A clearer, more predictable route to HR advice for managers",
      "A shift away from ad hoc, reactive people decisions",
    ],
    relatedFamilySlugs: ["employment-law-and-employee-relations", "strategic-hr-and-workforce-advisory"],
    faqs: [
      {
        id: "retained-vs-fractional",
        question: "What's the difference between Retained HR Services and a Fractional HR Director?",
        answer:
          "Retained HR Services gives ongoing day-to-day advisory access and delivery support. A Fractional HR Director or Chief People Officer works at a more senior, strategic level, typically alongside the leadership team, rather than handling day-to-day HR queries.",
      },
      {
        id: "audit-first",
        question: "Do I need an HR Compliance Audit before setting up retained support?",
        answer:
          "Not necessarily, but an audit can be a useful starting point if you're unsure where existing policies and processes stand. Some employers start with an audit and then move into ongoing retained support.",
      },
      {
        id: "size",
        question: "Is outsourced HR only for small businesses?",
        answer:
          "No. Outsourced HR support scales from small businesses without any in-house HR through to larger organisations that want to supplement or lead their people function without building a full internal team.",
      },
      {
        id: "payroll",
        question: "Can Apex HR help with payroll as well as HR?",
        answer:
          "Payroll Advisory covers the process, controls and provider relationship around payroll. It's advisory support, not payroll processing itself, and can sit alongside wider outsourced HR support.",
      },
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
    differentiation:
      "These services are mainly differentiated by seniority, volume and employment type rather than by function. Permanent Recruitment covers standard permanent hiring; Executive Search is a more intensive, senior-level search approach for leadership and specialist roles. Contract Staffing covers fixed-term and interim hiring rather than permanent roles. Recruitment Process Outsourcing (RPO) is for employers with ongoing or high-volume hiring who want a recruitment function run as an extension of their own team, rather than a single campaign. Graduate Schemes & Early Careers Design is distinct again: it's about building an early-careers hiring programme, not filling one vacancy.",
    outcomes: [
      "A more focused and efficient hiring process",
      "Better-informed hiring decisions",
      "Greater flexibility when recruitment demand changes",
      "A more structured route into the organisation for entry-level and graduate talent",
    ],
    relatedFamilySlugs: ["outsourced-hr-services", "strategic-hr-and-workforce-advisory"],
    faqs: [
      {
        id: "executive-vs-permanent",
        question: "When is Executive Search a better fit than Permanent Recruitment?",
        answer:
          "Executive Search suits senior, specialist or hard-to-fill leadership roles where a targeted search is more effective than advertising. Permanent Recruitment suits most other permanent hiring needs.",
      },
      {
        id: "contract-vs-rpo",
        question: "What's the difference between Contract Staffing and Recruitment Process Outsourcing?",
        answer:
          "Contract Staffing places individual contractors or interim staff into fixed-term roles. Recruitment Process Outsourcing (RPO) hands Apex HR an ongoing recruitment function or programme, covering multiple hires over time rather than a single placement.",
      },
      {
        id: "rpo-volume",
        question: "Is RPO only for high-volume hiring?",
        answer:
          "RPO tends to suit employers with ongoing or high-volume hiring needs, since it's structured as an extension of the internal team rather than a one-off campaign. For a single hire, Permanent Recruitment or Executive Search is usually more appropriate.",
      },
      {
        id: "combine-with-hr",
        question: "Can recruitment be combined with wider HR support?",
        answer:
          "Yes. Recruitment delivered through this family can sit alongside outsourced HR support, so onboarding, contracts and policies are handled by the same partner.",
      },
    ],
  },
  {
    slug: "employment-law-and-employee-relations",
    tagline: "Handle difficult situations with confidence.",
    summary: "Practical, informational support for redundancy, TUPE, investigations, mediation and other employee-relations situations.",
    introduction:
      "Employee-relations issues are high-stakes and often time-sensitive. This service family provides practical HR support through difficult situations. It is informational HR guidance, not a substitute for regulated legal advice, and complex or high-risk matters should always be reviewed by a qualified employment lawyer.",
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
    differentiation:
      "Each service addresses a distinct type of employee-relations situation: Redundancy & Restructuring Support and TUPE Advisory apply to organisational change (job losses and business transfers respectively); Workplace Investigations and Workplace Mediation & Conflict Resolution apply to individual or team-level disputes and concerns; Employment Tribunal HR Support applies once a claim has been raised; Outplacement & Career Transition Services supports departing employees after a redundancy or exit; Industrial Relations & Trade Union Negotiations applies specifically where a recognised union is involved; and Skilled Worker Sponsorship HR Support applies to the HR process side of sponsoring overseas workers.",
    outcomes: [
      "A clearer, more consistent process for handling employee-relations situations",
      "A more considered approach to managing risk in difficult situations",
      "Practical HR support that works alongside legal advice, not instead of it",
      "A more structured, respectful experience for employees going through a difficult situation",
    ],
    relatedFamilySlugs: ["outsourced-hr-services", "organisation-development-change-management"],
    faqs: [
      {
        id: "is-this-legal-advice",
        question: "Is this legal advice?",
        answer:
          "No. This is informational HR guidance and practical process support. Apex HR is not a law firm, and complex or high-risk employee-relations matters should be reviewed by a qualified employment lawyer.",
      },
      {
        id: "investigation-vs-mediation",
        question: "What's the difference between Workplace Investigations and Workplace Mediation?",
        answer:
          "An investigation establishes what happened in relation to a specific concern or allegation. Mediation is a facilitated conversation aimed at resolving a conflict or restoring a working relationship. The two are sometimes used together, but serve different purposes.",
      },
      {
        id: "redundancy-vs-tupe",
        question: "Do you support redundancy and TUPE situations together?",
        answer:
          "They're offered as distinct services because they apply to different situations (redundancy involves reducing roles, while TUPE applies when a business or service transfers to a new employer), but Apex HR can advise which applies, or whether both are relevant, for a specific situation.",
      },
      {
        id: "tribunal-timing",
        question: "When should Employment Tribunal HR Support be involved?",
        answer:
          "This service provides HR-process support once a tribunal claim has been raised or is anticipated. It works alongside, not instead of, legal representation.",
      },
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
    differentiation:
      "Organisation Design is about the structure itself: roles, reporting lines and decision rights. Change Management is about how a change, including a redesign, is planned, communicated and implemented. Culture Transformation addresses behaviours and ways of working, which can be a distinct piece of work or run alongside a structural or change programme. M&A People Due Diligence & Post-Merger Integration applies specifically around a merger or acquisition, combining elements of design, change and culture work at speed.",
    outcomes: [
      "A structure better aligned with how the organisation actually needs to operate",
      "Clearer communication and a more considered approach during a change programme",
      "Closer alignment between everyday behaviour and stated culture or strategy",
      "A more structured approach to integrating people through a merger or acquisition",
    ],
    relatedFamilySlugs: ["strategic-hr-and-workforce-advisory", "employee-experience-and-engagement"],
    faqs: [
      {
        id: "design-vs-change",
        question: "Do we need Organisation Design or Change Management?",
        answer:
          "Organisation Design focuses on the structure itself: roles, reporting lines and decision-making. Change Management focuses on how any change, including a redesign, is planned and delivered. Many engagements involve both, in sequence.",
      },
      {
        id: "culture-standalone",
        question: "Is Culture Transformation only relevant during major change?",
        answer:
          "No. It can be run as a standalone piece of work when behaviours and stated culture have drifted apart, or alongside a structural or change programme.",
      },
      {
        id: "ma-timing",
        question: "When should M&A People Due Diligence start?",
        answer:
          "Ideally before a deal completes, so people-related risks and integration planning can inform the transaction, though support is also available once a deal has completed and integration is underway.",
      },
      {
        id: "timelines",
        question: "How long does an organisation design or change programme typically take?",
        answer:
          "Timelines depend on the scope and complexity of the organisation involved; Apex HR agrees a realistic timetable as part of scoping the engagement rather than quoting a fixed duration upfront.",
      },
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
    differentiation:
      "Salary Benchmarking compares current pay to the external market. Job Evaluation & Pay Structures builds the internal framework (pay bands and levels) that benchmarking data feeds into. Reward Strategy sits above both, setting the overall approach to pay, benefits and recognition. Pay Equity & Pay Gap Reporting focuses specifically on fairness and reporting. Employee Benefits Consulting covers the non-salary elements of reward, and Executive Compensation & Share Schemes applies specifically to senior leadership reward design, including share scheme structuring considerations.",
    outcomes: [
      "Pay decisions that can be explained and supported with market evidence",
      "A more structured pay framework in place of ad hoc, one-off decisions",
      "Reward that's more closely aligned with recruitment and retention goals",
      "Greater confidence in pay fairness and reporting",
    ],
    relatedFamilySlugs: ["performance-and-talent-management", "outsourced-hr-services"],
    faqs: [
      {
        id: "benchmarking-vs-evaluation",
        question: "What's the difference between Salary Benchmarking and Job Evaluation?",
        answer:
          "Salary Benchmarking compares your pay to the external market. Job Evaluation & Pay Structures uses that and other evidence to build a consistent internal framework of pay bands and levels.",
      },
      {
        id: "statutory-reporting",
        question: "Does Apex HR handle statutory pay gap reporting requirements?",
        answer:
          "Pay Equity & Pay Gap Reporting provides HR support around fairness analysis and reporting. Specific statutory thresholds and deadlines should be confirmed against current GOV.UK guidance, and this service does not replace specialist legal or regulatory advice where that's required.",
      },
      {
        id: "exec-comp-separate",
        question: "Is Executive Compensation part of general Reward Strategy?",
        answer:
          "It's offered separately because senior and share-based reward involves different considerations to general employee reward. Legal and tax structuring for share schemes should be confirmed with qualified legal and tax advisers.",
      },
      {
        id: "benefits-included",
        question: "Do you advise on employee benefits as well as pay?",
        answer:
          "Yes. Employee Benefits Consulting covers the non-salary elements of reward, such as benefits design, alongside pay-focused services in this family.",
      },
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
    differentiation:
      "Leadership & Management Training is group-based, skills-focused development for managers and teams. Executive Coaching & 360 Feedback is individual, typically for a senior leader, combining structured feedback with one-to-one coaching. Learning Strategy & Capability Development sits above both: it's about the broader approach to building capability across the organisation, which training and coaching then deliver against.",
    outcomes: [
      "Managers who feel more confident handling people-management situations",
      "Individual leaders with clearer, evidenced development priorities",
      "A learning approach targeted at the organisation's actual capability gaps",
      "Development that's more likely to be applied after a programme ends",
    ],
    relatedFamilySlugs: ["performance-and-talent-management", "employee-experience-and-engagement"],
    faqs: [
      {
        id: "training-vs-strategy",
        question: "Should we start with training or a learning strategy?",
        answer:
          "If capability gaps are already clear, Leadership & Management Training can start directly. If it's unclear where to focus, Learning Strategy & Capability Development helps identify priorities first.",
      },
      {
        id: "coaching-for-underperformance",
        question: "Is Executive Coaching only for underperforming leaders?",
        answer:
          "No. It's commonly used for capable leaders moving into a bigger role, navigating a specific challenge, or wanting structured, confidential development, not only as a response to a problem.",
      },
      {
        id: "what-is-360",
        question: "What does 360 feedback involve?",
        answer:
          "It gathers structured feedback from a leader's manager, peers and direct reports to build a fuller picture of their impact, which then informs the coaching focus.",
      },
      {
        id: "tailored-training",
        question: "Can training be tailored to our specific managers?",
        answer:
          "Yes. Training is built around real scenarios relevant to your teams rather than delivered as generic, off-the-shelf content.",
      },
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
    differentiation:
      "Performance Management is the ongoing process of setting expectations and reviewing individual performance. Succession Planning & Talent Mapping looks ahead, identifying key roles and potential successors before a gap arises. Competency Frameworks underpin both: they define the expectations and standards that performance reviews and succession decisions are measured against.",
    outcomes: [
      "More consistent performance conversations across the organisation",
      "Greater visibility of key-person risk in critical roles",
      "A shared, transparent basis for promotion and development decisions",
      "Greater clarity for managers on what 'good' looks like in a role",
    ],
    relatedFamilySlugs: ["learning-and-leadership-development", "compensation-reward-and-benefits"],
    faqs: [
      {
        id: "framework-first",
        question: "Do we need a Competency Framework before Performance Management?",
        answer:
          "It helps. A Competency Framework gives performance reviews a consistent, shared standard to measure against, though Apex HR can also work with an existing framework or help establish one alongside a new performance process.",
      },
      {
        id: "succession-vs-workforce-planning",
        question: "How is Succession Planning different from general workforce planning?",
        answer:
          "Succession Planning & Talent Mapping focuses specifically on key roles and who could step into them, rather than the broader workforce numbers and structure covered by strategic workforce planning.",
      },
      {
        id: "existing-reviews",
        question: "Can this family help if performance reviews already exist but aren't working well?",
        answer:
          "Yes. Apex HR can review an existing performance process and redesign the parts that aren't delivering consistent, useful outcomes, rather than starting from scratch.",
      },
      {
        id: "org-size",
        question: "Is this only for large organisations?",
        answer: "No. The scale of any framework or process is adapted to the size and complexity of the organisation.",
      },
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
    differentiation:
      "Employee Experience Strategy sets the overall direction. Employee Engagement Surveys & Action Planning measures how employees actually experience work and turns that into a plan. Employer Branding & Employee Value Proposition (EVP) focuses specifically on how the organisation is presented to candidates and employees. Workplace Wellbeing & Mental Health addresses everyday wellbeing practice. This is HR-led workplace support, not clinical or occupational-health provision. Diversity, Equity & Inclusion (DEI) Consulting focuses specifically on fairness and inclusion across people practices.",
    outcomes: [
      "A clearer picture of how employees actually experience the organisation",
      "An employer brand and EVP more closely aligned with what employees actually experience",
      "Wellbeing practices embedded in everyday management, rather than treated as a one-off initiative",
      "More consistent, inclusive people practices across the organisation",
    ],
    relatedFamilySlugs: ["learning-and-leadership-development", "organisation-development-change-management"],
    faqs: [
      {
        id: "survey-before-plan",
        question: "Do we need a survey before an action plan?",
        answer:
          "Employee Engagement Surveys & Action Planning is designed to work as one connected service: the survey data directly shapes the plan, rather than being a separate step.",
      },
      {
        id: "wellbeing-not-clinical",
        question: "Is Workplace Wellbeing & Mental Health a clinical or occupational-health service?",
        answer:
          "No. This is HR-led support for embedding wellbeing practice into everyday management. It is not clinical treatment or occupational-health provision, and complex individual health matters should involve an appropriately qualified professional.",
      },
      {
        id: "dei-vs-strategy",
        question: "How does DEI Consulting relate to Employee Experience Strategy?",
        answer:
          "DEI Consulting focuses specifically on fairness and inclusion across people practices, and can be run as a standalone review or as part of a wider employee experience strategy.",
      },
      {
        id: "evp-in-recruitment",
        question: "Can Employer Branding work be used in recruitment?",
        answer:
          "Yes. An EVP built through this service is designed to be used consistently across recruitment and existing-employee communications, not just one or the other.",
      },
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
    differentiation:
      "HR Software Selection helps choose the right system before anything is built. HRIS Implementation is the delivery of a chosen system. People Analytics & HR Dashboards is about using the data a system produces, rather than the system itself. Digital HR Transformation is broader again: the wider change programme that technology sits within. AI Workplace Policy & HR Integration is distinct from all of these: it's about how AI is used responsibly within HR and the wider workplace, not a specific software system.",
    outcomes: [
      "More time available for higher-value HR work, instead of manual administration",
      "HR technology that's more likely to be properly adopted, not left underused",
      "Easier, more confident access to workforce information from real data",
      "A more considered, documented approach to AI use in HR and the workplace",
    ],
    relatedFamilySlugs: ["strategic-hr-and-workforce-advisory", "organisation-development-change-management"],
    faqs: [
      {
        id: "selection-vs-implementation",
        question: "Do we need HR Software Selection or HRIS Implementation?",
        answer:
          "If a system hasn't been chosen yet, HR Software Selection helps identify the right fit first. HRIS Implementation is for delivering a system that's already been chosen.",
      },
      {
        id: "analytics-vs-transformation",
        question: "What's the difference between People Analytics and Digital HR Transformation?",
        answer:
          "People Analytics & HR Dashboards focuses on using workforce data you already have. Digital HR Transformation is the broader change programme, which may include new systems, analytics and process change together.",
      },
      {
        id: "vendor-independence",
        question: "Is Apex HR affiliated with any HR software vendor?",
        answer:
          "No. Recommendations are independent of any one vendor, which is what allows this service to focus on fit for your business rather than a specific product.",
      },
      {
        id: "ai-policy-scope",
        question: "What does AI Workplace Policy & HR Integration cover?",
        answer:
          "It covers how AI tools are used responsibly within HR and the wider workplace, including policy considerations. It is not a specific software implementation.",
      },
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
    differentiation:
      "People Strategy is the overarching direction: how the people function supports business goals. Strategic Workforce Planning is more specific: forecasting the roles, skills and headcount the organisation will need. Global Mobility & Expatriate HR Management applies specifically where people move across borders, covering the HR considerations of international assignments.",
    outcomes: [
      "A people strategy more clearly connected to business goals",
      "Workforce planning based on a forecast, rather than reactive hiring under pressure",
      "A more structured, considered approach to international assignments",
      "Better-informed strategic decisions as the organisation scales",
    ],
    relatedFamilySlugs: ["organisation-development-change-management", "recruitment-talent-acquisition"],
    faqs: [
      {
        id: "people-strategy-vs-workforce-planning",
        question: "How does People Strategy differ from Strategic Workforce Planning?",
        answer:
          "People Strategy sets the overall direction connecting people decisions to business goals. Strategic Workforce Planning is the more specific forecasting of roles, skills and headcount needed to deliver that strategy.",
      },
      {
        id: "mobility-small-numbers",
        question: "Do we need Global Mobility support if we only have a few international staff?",
        answer:
          "It can still help: the HR considerations around even a small number of international assignments, such as employment terms and coordination across locations, benefit from a structured approach, though scope is adapted to the organisation's actual needs.",
      },
      {
        id: "large-orgs-only",
        question: "Is this only relevant to large organisations?",
        answer:
          "No. Strategic workforce planning and people strategy work benefit organisations at various stages of growth, particularly those scaling quickly or entering new markets.",
      },
      {
        id: "immigration",
        question: "Does Apex HR advise on immigration or visa matters for international moves?",
        answer:
          "Global Mobility & Expatriate HR Management covers the HR-process side of international assignments. Immigration and visa matters should be confirmed with a qualified immigration adviser.",
      },
    ],
  },
];

export const serviceContent: ServiceContent[] = [
  // ---- Outsourced HR Services ----
  {
    slug: "retained-hr-services",
    categorySlug: "outsourced-hr-services",
    metaDescription: "Apex HR is a retained HR services firm giving UK employers ongoing advisory access to policy, compliance and employee-relations support without an in-house team.",
    primaryKeyword: "retained HR services",
    heroSummary: "Ongoing HR support and advice, so your business always has someone to call when a people issue comes up.",
    employerChallenge:
      "Without a dedicated HR function, people issues tend to land on whoever is available (a founder, office manager or finance lead), often without the confidence to know what's required or defensible.",
    businessOutcomes: [
      "A consistent, single point of contact for day-to-day HR questions",
      "Less time spent by founders and managers on routine HR administration",
      "More consistent, documented HR processes as the business grows",
      "Less exposure to avoidable people-related risk",
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
    outOfScope: [
      "A specific guaranteed response time: expectations are agreed as part of the engagement, not promised upfront",
      "Unlimited or 24/7 availability",
      "Replacing a dedicated in-house HR team for organisations that need one",
      "Payroll processing or formal HR compliance certification",
    ],
    differentiationNote:
      "Retained HR Services provides ongoing, operational HR advisory access: distinct from a one-off HR Compliance Audit (a fixed-scope review), Employee Handbooks & HR Policies (a specific drafting deliverable), and a Fractional HR Director or Chief People Officer (senior strategic leadership, not day-to-day advisory support).",
    additionalFaqs: [
      {
        id: "vs-inhouse",
        question: "How is this different from having an in-house HR team?",
        answer:
          "Retained HR Services gives you ongoing access to HR expertise without employing HR staff directly. It suits businesses that don't yet need, or can't yet justify, a full in-house HR function.",
      },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "hr-support-for-small-businesses-and-startups",
    categorySlug: "outsourced-hr-services",
    metaDescription: "Apex HR is an HR support firm for UK small businesses and startups, helping lean teams build practical HR foundations without an in-house function.",
    primaryKeyword: "HR support for startups",
    heroSummary: "Right-sized HR support for small businesses and startups, so people processes are in place from the start without slowing you down.",
    employerChallenge:
      "Early-stage businesses often delay HR until a problem forces the issue, by which point contracts, policies or decisions may already be exposed to risk.",
    businessOutcomes: [
      "Foundational HR set up correctly from an early stage",
      "More time for founders to focus on the business, rather than HR administration",
      "Greater confidence when making early hiring and people decisions",
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
    outOfScope: [
      "Enterprise-scale HR programmes built for large, established organisations",
      "Senior strategic leadership at Chief People Officer level (see Fractional HR Director/CPO)",
      "Formal HR compliance certification",
    ],
    differentiationNote:
      "This service is scoped to the size and stage of an early business (foundational contracts, policies and first-hire support) rather than the broader ongoing advisory access of Retained HR Services or the senior strategic focus of a Fractional HR Director/CPO.",
    additionalFaqs: [
      {
        id: "one-size",
        question: "Do all startups need the same HR support?",
        answer:
          "No. Needs vary by team size, sector and growth plans. Support is scoped to your specific stage and priorities rather than a standard package.",
      },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "fractional-hr-director-chief-people-officer",
    categorySlug: "outsourced-hr-services",
    metaDescription: "Apex HR is a fractional HR director firm giving UK businesses senior HR leadership on a part-time basis, without the cost of a full-time hire.",
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
    outOfScope: [
      "Acting as a statutory company director, company secretary or other legal officer",
      "Day-to-day operational HR administration (see Retained HR Services)",
      "Internal management authority over your existing staff: decisions remain with your organisation",
    ],
    differentiationNote:
      "This is senior, strategic HR leadership: distinct from Retained HR Services, which provides ongoing operational advisory access rather than leadership-team-level strategic input.",
    additionalFaqs: [
      {
        id: "statutory-officer",
        question: "Does a Fractional HR Director become a company officer?",
        answer:
          "No. This is an advisory leadership role, not a statutory director or company secretary appointment, and it does not transfer legal or management authority to Apex HR.",
      },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "hr-compliance-audit",
    categorySlug: "outsourced-hr-services",
    metaDescription: "Apex HR is an HR compliance audit firm helping UK employers identify gaps in contracts, policies and processes, with clear, practical recommendations.",
    primaryKeyword: "HR compliance audit",
    // SEO audit Phase 3 Batch 6C2: "independent" removed as an unsupported
    // positioning claim (no accreditation or verified independent-auditor
    // status exists in the approved business information) — completes the
    // Batch 6C1 metaDescription/whoWeSupport fix. This field is shared
    // with 8 HR Compliance Audit service-location pages and the
    // Outsourced HR Services–Worcester category-location page's child
    // card; this specific change was explicitly authorised for exactly
    // those pages, reported in full in the Batch 6C2 closing report.
    heroSummary: "A practical review of your HR practices, identifying gaps and giving you a plan to close them.",
    employerChallenge:
      "Contracts and policies often go unreviewed for years while employment practice and legislation move on, leaving gaps that only surface when something goes wrong.",
    businessOutcomes: [
      "A clearer picture of current HR compliance risk",
      "A clear, prioritised action plan",
      "Documented evidence of a considered approach to HR practice",
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
    // SEO audit Phase 3 Batch 6C1: "independent" removed as an unverified
    // positioning claim (no accreditation or verified independent-auditor
    // status exists in the approved business information) — see the
    // matching metaDescription fix above, and the Batch 6C2 heroSummary
    // fix, which completed removing this claim from every field on this
    // record (canonical page and shared fields alike).
    whoWeSupport: "Employers who want a practical, objective view of their current HR compliance position.",
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
    outOfScope: [
      "A legal audit or formal regulatory certification",
      "A guarantee of legal compliance",
      "A substitute for advice from a qualified employment lawyer",
    ],
    differentiationNote:
      "An audit is a fixed-scope review producing findings and recommendations: distinct from Retained HR Services (ongoing advisory support) and Employee Handbooks & HR Policies (specific document drafting), though audit findings often lead into one of those services.",
    additionalFaqs: [
      {
        id: "certification",
        question: "Does a completed audit guarantee legal compliance?",
        answer:
          "No. The audit identifies gaps and gives practical recommendations based on the evidence reviewed. It is not a certification or guarantee, and higher-risk findings may still need review by a qualified employment lawyer.",
      },
    ],
    legalReviewRequired: true,
  },
  {
    slug: "employee-handbooks-and-hr-policies",
    categorySlug: "outsourced-hr-services",
    metaDescription: "Apex HR is an HR policy firm helping UK employers create clear, practical employee handbooks and policies tailored to their business, not generic templates.",
    primaryKeyword: "employee handbook and HR policies",
    heroSummary: "Employee handbooks and HR policies written in plain language and tailored to how your business actually operates.",
    employerChallenge:
      "Generic downloaded templates often don't reflect how a business actually works, leaving gaps or contradictions that surface exactly when they're needed most.",
    businessOutcomes: [
      "Clear, consistent rules that managers can actually apply",
      "Policies more closely aligned with how the business actually operates",
      "A clearer onboarding experience for new starters",
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
      { id: "template", question: "Are these generic templates?", answer: "No. Policies are drafted around how your business actually operates, then refined with your input." },
      { id: "update", question: "How often should policies be reviewed?", answer: "Good practice is an annual review, or sooner if employment practice or your business changes materially." },
    ],
    outOfScope: [
      "A guarantee that a template or policy document ensures legal compliance",
      "Ongoing HR advisory support beyond the drafting and review engagement (see Retained HR Services)",
    ],
    differentiationNote:
      "A handbook sets out an organisation's overall workplace rules and culture in one document; individual policies (for example leave, conduct or flexible working) cover specific topics in more detail and can be created or updated independently of the full handbook.",
    additionalFaqs: [
      {
        id: "no-guarantee",
        question: "Does a new handbook guarantee legal compliance?",
        answer:
          "No document can guarantee compliance on its own: policies are drafted to reflect current good practice and your business, but should be kept under review as law and circumstances change.",
      },
    ],
    legalReviewRequired: true,
  },
  {
    slug: "payroll-advisory",
    categorySlug: "outsourced-hr-services",
    metaDescription: "Apex HR is a payroll advisory firm helping UK employers get payroll processes, controls and provider relationships right.",
    primaryKeyword: "payroll advisory",
    heroSummary: "Advisory support to help you get payroll processes, controls and provider relationships right.",
    employerChallenge:
      "Payroll errors are highly visible to employees and can be costly to fix, yet many businesses inherit payroll processes without ever reviewing whether they're fit for purpose.",
    businessOutcomes: [
      "A more reliable, well-controlled payroll process",
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
      "This is advisory support around your payroll process and provider relationship, not payroll processing itself, so it stays independent of any one provider.",
    relatedServiceSlugs: ["hr-compliance-audit", "hris-implementation", "reward-strategy"],
    relatedSectorSlugs: ["professional-services", "manufacturers", "distribution"],
    faqs: [
      { id: "process-payroll", question: "Does Apex HR run our payroll?", answer: "This service is advisory: reviewing and improving your payroll processes and provider relationship, not processing payroll itself." },
      { id: "provider", question: "Can you help us choose a new payroll provider?", answer: "Yes, this includes support comparing providers against your specific requirements." },
    ],
    outOfScope: [
      "Processing payroll or running payroll on your behalf",
      "Filing taxes or providing regulated tax advice",
      "Acting as your accountant",
      "Guaranteeing payroll accuracy: this sits with your payroll provider or system",
    ],
    differentiationNote:
      "This is advisory support around payroll process, controls and provider relationships: distinct from payroll processing (a payroll bureau or software), tax filing (an accountant or tax adviser) and regulated financial advice.",
    additionalFaqs: [
      {
        id: "tax-filing",
        question: "Does Apex HR file our payroll taxes?",
        answer:
          "No. Apex HR does not file taxes or provide regulated tax or accounting advice. For tax-specific matters, an accountant or qualified tax adviser should be involved.",
      },
      {
        id: "accuracy",
        question: "Does Apex HR guarantee payroll will be error-free?",
        answer:
          "No. This service advises on process, controls and provider relationships to reduce the risk of errors, but day-to-day payroll accuracy sits with your payroll provider or system.",
      },
    ],
    legalReviewRequired: false,
  },

  // ---- Recruitment & Talent Acquisition ----
  {
    slug: "permanent-recruitment",
    categorySlug: "recruitment-talent-acquisition",
    metaDescription: "Apex HR is a permanent recruitment firm helping UK employers hire confidently, from role definition through to offer, backed by genuine HR expertise.",
    primaryKeyword: "permanent recruitment",
    heroSummary: "Permanent recruitment support from role definition through to offer, informed by genuine HR expertise, not just CV matching.",
    employerChallenge:
      "A poor permanent hire is expensive and disruptive, yet many recruitment processes focus on speed to fill rather than genuine role and team fit.",
    businessOutcomes: [
      "Candidates assessed against the role and team, not just a CV",
      "A more structured, better-organised hiring process",
      "Less risk of early attrition from a poor fit",
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
      { id: "timescale", question: "How long does permanent recruitment typically take?", answer: "Timescales vary by role and market, and are discussed as part of scoping. Apex HR does not commit to a fixed placement time without understanding the role first." },
      { id: "guarantee", question: "Is the hire guaranteed?", answer: "Engagement terms, including any rebate or replacement arrangements, are agreed and confirmed before the search begins." },
    ],
    outOfScope: [
      "A guarantee of candidate availability, hiring speed or a successful placement",
      "The final hiring decision: this remains with your organisation",
      "Senior executive search (see Executive Search) or temporary and contract placements (see Contract Staffing)",
    ],
    differentiationNote:
      "Permanent Recruitment covers standard permanent hiring. Executive Search is a more intensive, targeted approach reserved for senior leadership and business-critical roles. Contract Staffing covers fixed-term or interim placements rather than permanent roles, and Recruitment Process Outsourcing (RPO) hands Apex HR an ongoing recruitment function rather than a single campaign.",
    additionalFaqs: [
      {
        id: "final-decision",
        question: "Who makes the final hiring decision?",
        answer:
          "You do. Apex HR supports sourcing, screening and process, but the final hiring decision and offer remain with your organisation.",
      },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "executive-search",
    categorySlug: "recruitment-talent-acquisition",
    metaDescription: "Apex HR is an executive search firm helping UK employers make senior and leadership appointments, combining targeted search with genuine HR insight.",
    primaryKeyword: "executive search",
    heroSummary: "A targeted, confidential search approach for senior and leadership hires where the wrong appointment carries real organisational risk.",
    employerChallenge:
      "Senior hires are harder to source through advertising alone, and a poor leadership appointment has an outsized impact on the wider organisation.",
    businessOutcomes: [
      "A search that reaches beyond candidates who are actively applying",
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
      { id: "confidential", question: "Can a search be run confidentially?", answer: "Confidential search (including for replacement hires) is Apex HR's standard approach for senior appointments, though the extent of confidentiality achievable depends on the specific situation and is agreed and managed case by case." },
      { id: "levels", question: "What seniority levels does this cover?", answer: "Typically senior leadership, director and executive-level roles, agreed at the outset of the engagement." },
    ],
    outOfScope: [
      "A guarantee of a particular success rate, placement outcome or timescale",
      "An exclusive or proprietary candidate database: search draws on genuine market mapping and direct approach, not a claimed private network",
      "Absolute, unconditional confidentiality in every circumstance",
    ],
    differentiationNote:
      "Executive Search is reserved for senior leadership, executive or other business-critical roles where a targeted, confidential search is more effective than standard advertising: distinct from Permanent Recruitment, which covers standard permanent hiring more broadly.",
    additionalFaqs: [
      {
        id: "exclusive-network",
        question: "Does Apex HR have an exclusive network of executive candidates?",
        answer:
          "Search is conducted through genuine market mapping and direct approach for each brief, rather than a claimed proprietary or exclusive candidate database.",
      },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "contract-staffing",
    categorySlug: "recruitment-talent-acquisition",
    metaDescription: "Apex HR is a contract staffing firm helping UK employers cover short-term, project or interim needs with flexible, well-managed contract talent.",
    primaryKeyword: "contract staffing",
    heroSummary: "Contract and interim staffing support to cover short-term needs, projects or absence without the overhead of a permanent hire.",
    employerChallenge:
      "Short-term or project-based resourcing needs often don't justify a permanent hire, but finding suitable interim talent quickly can be difficult without the right network.",
    businessOutcomes: [
      "A more efficient route to interim or contract talent",
      "Flexibility to scale resourcing up or down",
      "Less disruption during absence or peak periods",
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
    outOfScope: [
      "Acting as the legal employer, agency worker provider, payroll operator or tax adviser, unless separately verified and agreed for a specific engagement",
      "Formal determination of employment status or IR35 position: this should be confirmed with a qualified adviser",
      "Permanent recruitment (see Permanent Recruitment) or an ongoing outsourced recruitment function (see Recruitment Process Outsourcing)",
    ],
    differentiationNote:
      "Contract Staffing covers fixed-term, interim or temporary placements: distinct from Permanent Recruitment (permanent roles) and Recruitment Process Outsourcing (an ongoing recruitment function across multiple hires). The specific contractual, employment-status and tax arrangements depend on the actual engagement model agreed for each placement.",
    additionalFaqs: [
      {
        id: "who-employs",
        question: "Does Apex HR employ the contractor or interim worker?",
        answer:
          "This depends on the engagement model agreed for the specific placement, and is not assumed to be Apex HR by default. Arrangements are confirmed when setting up each engagement, with formal employment-status questions referred to a qualified adviser.",
      },
    ],
    legalReviewRequired: true,
  },
  {
    slug: "recruitment-process-outsourcing-rpo",
    categorySlug: "recruitment-talent-acquisition",
    metaDescription: "Apex HR is a Recruitment Process Outsourcing (RPO) firm helping UK employers manage ongoing or high-volume hiring with a structured, scalable approach.",
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
    outOfScope: [
      "A guarantee of cost savings, reduced time-to-hire or a specific hiring volume",
      "One-off, single-role recruitment (see Permanent Recruitment or Executive Search)",
      "General outsourced HR support beyond recruitment (see Outsourced HR Services)",
    ],
    differentiationNote:
      "Recruitment Process Outsourcing (RPO) hands Apex HR an ongoing recruitment function or programme, covering multiple hires over time as an extension of your own team: distinct from a single recruitment campaign (Permanent Recruitment or Executive Search) and from Outsourced HR Services, which covers wider HR advisory rather than recruitment delivery specifically.",
    additionalFaqs: [
      {
        id: "governance",
        question: "Who is responsible for hiring decisions under an RPO arrangement?",
        answer:
          "Apex HR manages the recruitment process end-to-end, but hiring decisions, governance and final sign-off remain with your organisation, agreed as part of the engagement.",
      },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "graduate-schemes-and-early-careers-design",
    categorySlug: "recruitment-talent-acquisition",
    metaDescription: "Apex HR is a graduate recruitment firm helping UK employers design and deliver effective graduate schemes and early-careers hiring programmes.",
    primaryKeyword: "graduate scheme design",
    heroSummary: "Design and delivery support for graduate schemes and early-careers programmes that build a genuine talent pipeline.",
    employerChallenge:
      "Early-careers hiring requires a different approach to experienced hiring: assessment, onboarding and development all need to be designed with less work history to go on.",
    businessOutcomes: [
      "A structured, fair early-careers assessment process",
      "A more structured onboarding experience, designed to support early retention",
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
      { id: "size", question: "Does this suit smaller employers, or only large graduate schemes?", answer: "Programmes are scaled to the employer: this can support a small, structured early-careers intake as well as larger schemes." },
    ],
    outOfScope: [
      "A guarantee of graduate hiring volumes, access to particular universities, or specific diversity outcomes",
      "Filling a single, individual permanent vacancy (see Permanent Recruitment)",
    ],
    differentiationNote:
      "This service is about designing and running a structured, repeatable early-careers programme (assessment, onboarding and development built for candidates with less work history) rather than filling one individual permanent vacancy.",
    additionalFaqs: [
      {
        id: "universities",
        question: "Does Apex HR have relationships with specific universities?",
        answer:
          "Programme design is built around your organisation's needs and sourcing channels rather than a claimed set of university partnerships or guaranteed candidate volumes.",
      },
    ],
    legalReviewRequired: false,
  },

  // ---- Employment Law & Employee Relations ----
  {
    slug: "redundancy-and-restructuring-support",
    categorySlug: "employment-law-and-employee-relations",
    metaDescription: "Apex HR is a redundancy and restructuring firm helping UK employers run a fair, well-documented process that protects both the business and its people.",
    primaryKeyword: "redundancy and restructuring support",
    heroSummary: "Practical HR support for redundancy and restructuring situations, focused on running a fair, well-documented process.",
    employerChallenge:
      "Redundancy and restructuring are high-risk processes that need to be handled fairly and consistently, but many employers only go through them rarely and lack in-house experience.",
    businessOutcomes: [
      "A more structured, better-documented process",
      "Support that may help reduce the risk of avoidable procedural errors",
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
      "This is informational HR process support, not legal advice. Apex HR recommends qualified legal review for complex, large-scale or contested situations.",
    relatedServiceSlugs: ["tupe-advisory", "outplacement-and-career-transition-services", "employment-tribunal-hr-support"],
    relatedSectorSlugs: ["manufacturers", "construction", "distribution"],
    faqs: [
      { id: "legal-advice", question: "Is this a substitute for legal advice?", answer: "No. This is practical HR process support. Complex, large-scale or high-risk redundancy situations should be reviewed by a qualified employment lawyer." },
      { id: "timeline", question: "How long does a redundancy process take?", answer: "Timelines depend on the number of affected employees and any statutory consultation requirements, and are planned as part of the process." },
    ],
    outOfScope: [
      "A determination of whether a specific redundancy or restructuring process is fair or lawful: this is a legal question for a qualified employment lawyer",
      "A guarantee that the process will avoid disputes, grievances or tribunal claims",
      "Setting or confirming statutory consultation thresholds or timescales: these should be confirmed against current GOV.UK/Acas guidance and legal advice",
      "Ongoing support for departing employees after they leave (see Outplacement & Career Transition Services)",
    ],
    differentiationNote:
      "This service covers the HR process and people side of planning and running a redundancy or restructuring exercise: distinct from Outplacement & Career Transition Services, which supports employees after they leave, and from TUPE Advisory, which applies specifically to business transfers rather than headcount reduction. Management remains responsible for the underlying business decision and any legal sign-off; Apex HR does not determine whether a process is fair or lawful.",
    additionalFaqs: [
      {
        id: "management-responsibility",
        question: "Who is responsible for the redundancy decision and its legal fairness?",
        answer:
          "The employer is responsible for the underlying business decision and for ensuring the process is lawful, informed by qualified legal advice. Apex HR provides HR process and documentation support, not a legal determination of fairness.",
      },
    ],
    legalReviewRequired: true,
  },
  {
    slug: "tupe-advisory",
    categorySlug: "employment-law-and-employee-relations",
    metaDescription: "Apex HR is a TUPE advisory firm helping UK employers manage transfers with clear process, communication and integration support.",
    primaryKeyword: "TUPE advisory",
    heroSummary:
      "Practical HR support through a TUPE transfer, the Transfer of Undertakings (Protection of Employment) Regulations, covering process, employee communication and integration planning.",
    employerChallenge:
      "Whether TUPE applies depends on the specific circumstances of a transaction, and getting this wrong has real consequences, yet transfers often move on a tight timeline with significant people-management complexity. Apex HR supports the HR process and communication around a transfer; the legal determination of whether and how TUPE applies should come from a qualified employment lawyer.",
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
      "This is HR process and communication support alongside your legal advisers. TUPE has specific legal requirements that should be confirmed with a qualified employment lawyer.",
    relatedServiceSlugs: ["redundancy-and-restructuring-support", "organisation-design", "ma-people-due-diligence-and-post-merger-integration"],
    relatedSectorSlugs: ["care-homes", "construction", "distribution"],
    faqs: [
      { id: "legal", question: "Does Apex HR provide the legal TUPE assessment?", answer: "No. Apex HR provides HR process and communication support. Legal assessment of whether and how TUPE applies should come from a qualified employment lawyer." },
    ],
    outOfScope: [
      "The legal determination of whether TUPE applies to a specific transaction: this is a legal question for a qualified employment lawyer",
      "Drafting or advising on the legal transfer agreement itself",
      "A guarantee of a smooth or dispute-free transfer",
    ],
    differentiationNote:
      "TUPE Advisory applies specifically to business, contract or service transfers where TUPE may be relevant: distinct from Redundancy & Restructuring Support, which applies to headcount reduction rather than a change of employer, though the two are sometimes relevant to the same wider transaction.",
    additionalFaqs: [
      {
        id: "applies-always",
        question: "Does TUPE always apply to a business transfer?",
        answer:
          "Not necessarily. Whether TUPE applies depends on the specific facts of the transaction. Apex HR supports the HR process around a transfer; the legal determination should be confirmed with a qualified employment lawyer.",
      },
    ],
    legalReviewRequired: true,
  },
  {
    slug: "workplace-investigations",
    categorySlug: "employment-law-and-employee-relations",
    metaDescription: "Apex HR is a workplace investigations firm helping UK employers examine conduct, grievance or misconduct concerns, carried out outside internal reporting lines.",
    primaryKeyword: "workplace investigations",
    heroSummary:
      "Structured workplace investigations carried out by someone external to your internal reporting lines, helping you gather the facts fairly before deciding next steps.",
    employerChallenge:
      "Internal investigations can be difficult to run impartially when the people involved know each other, and a poorly run process can undermine the outcome regardless of the facts.",
    businessOutcomes: [
      "A structured, well-documented investigation",
      "A fairer process, supported by someone outside your internal reporting lines",
      "A clearer evidential basis for any subsequent decision",
    ],
    whatItIncludes: [
      "Investigation planning and scoping, including terms of reference",
      "Interviews and evidence gathering, conducted outside your internal reporting lines",
      "A clear, factual written investigation report",
    ],
    whenNeeded: [
      "A grievance or conduct concern has been raised",
      "Internal capacity or distance from those involved is limited",
      "The situation is sensitive or involves senior staff",
    ],
    whoWeSupport: "Employers who need a structured investigation into a workplace concern, carried out by someone outside their internal reporting lines.",
    deliveryApproach: [
      "Agree the scope and terms of reference",
      "Conduct interviews and gather evidence in a structured, consistent way",
      "Produce a clear, factual investigation report",
      "Hand findings back for your decision-making process",
    ],
    engagementOptions: ["Full investigation support", "Investigation support alongside internal HR"],
    whyApex:
      "The investigator's role is to establish the facts fairly and consistently. Any subsequent decision remains yours, informed by the findings and appropriate advice.",
    relatedServiceSlugs: ["workplace-mediation-and-conflict-resolution", "employment-tribunal-hr-support", "hr-compliance-audit"],
    relatedSectorSlugs: ["professional-services", "care-homes", "education"],
    faqs: [
      { id: "outcome", question: "Does Apex HR decide the outcome?", answer: "No. An investigation establishes the facts. Any disciplinary or other decision remains the employer's, informed by the findings and appropriate advice." },
    ],
    outOfScope: [
      "A guarantee of complete confidentiality: information may need to be shared as part of a fair process, and this is explained at the outset",
      "A guarantee of legal privilege over the investigation or its findings",
      "The disciplinary or other management decision: this remains the employer's",
      "Any criminal investigation or law-enforcement authority",
      "A guarantee of a particular finding or outcome",
    ],
    differentiationNote:
      "An investigation is fact-finding (establishing what happened in relation to a specific concern), distinct from Workplace Mediation & Conflict Resolution, which is a facilitated conversation aimed at resolving a relationship rather than establishing facts. The two are sometimes used in sequence, but serve different purposes.",
    additionalFaqs: [
      {
        id: "confidentiality",
        question: "Is the investigation completely confidential?",
        answer:
          "Information is handled sensitively and only shared with those who genuinely need it, but complete confidentiality cannot be guaranteed: a fair process may require sharing relevant information with the people involved, and this is explained before the investigation begins.",
      },
      {
        id: "privilege",
        question: "Does the investigation carry legal privilege?",
        answer:
          "Not automatically. Legal privilege depends on how and by whom an investigation is commissioned, and should be confirmed with a qualified employment lawyer if this matters for a specific situation.",
      },
    ],
    legalReviewRequired: true,
  },
  {
    slug: "workplace-mediation-and-conflict-resolution",
    categorySlug: "employment-law-and-employee-relations",
    metaDescription: "Apex HR is a workplace mediation firm helping UK employers resolve conflict between employees or teams through structured, facilitated support.",
    primaryKeyword: "workplace mediation",
    heroSummary:
      "Structured, facilitated mediation to help address workplace conflict before it escalates further, led by someone outside your internal reporting lines.",
    employerChallenge:
      "Unresolved conflict between employees or within teams can affect morale, performance and retention long before it becomes a formal grievance.",
    businessOutcomes: [
      "A structured route to discussing conflict and working towards resolution",
      "A lower likelihood of escalation to a formal process, though this cannot be guaranteed",
      "An opportunity to rebuild working relationships going forward",
    ],
    whatItIncludes: [
      "Facilitated mediation sessions",
      "Structured preparation with each party beforehand",
      "Support exploring a way forward, where the parties reach one",
    ],
    whenNeeded: [
      "Ongoing conflict between colleagues or within a team",
      "A relationship breakdown is affecting performance or wellbeing",
      "Before a situation escalates to formal grievance",
    ],
    whoWeSupport: "Employers looking for a structured, facilitated way to address workplace conflict.",
    deliveryApproach: [
      "Understand the situation from all parties",
      "Prepare each party for a mediation session",
      "Facilitate a mediation session, led by someone outside your internal reporting lines",
      "Support next steps, where the parties reach agreement",
    ],
    engagementOptions: ["Single mediation session", "Ongoing conflict-resolution support for a team"],
    whyApex:
      "The facilitator sits outside the internal reporting lines involved, which can make it easier for both parties to engage openly.",
    relatedServiceSlugs: ["workplace-investigations", "employee-experience-strategy", "leadership-and-management-training"],
    relatedSectorSlugs: ["professional-services", "health-care", "education"],
    faqs: [
      { id: "voluntary", question: "Is mediation voluntary?", answer: "Mediation works best when all parties engage voluntarily and in good faith: this is discussed and agreed before a session takes place." },
    ],
    outOfScope: [
      "A guarantee that mediation will resolve the conflict or that parties will reach agreement",
      "A determination of who is right or wrong: mediation is not an investigation or a disciplinary process",
      "Legal advice on any underlying employment-law question raised during a session",
      "Suitability for every workplace dispute: mediation is not always the appropriate route, and this is assessed before proceeding",
    ],
    differentiationNote:
      "Mediation is a facilitated conversation aimed at helping parties find their own way forward: distinct from Workplace Investigations, which establishes facts about a specific concern, and from formal legal advice. Not every workplace dispute is suitable for mediation; suitability is assessed as part of scoping.",
    additionalFaqs: [
      {
        id: "guaranteed-resolution",
        question: "Does mediation guarantee a resolution?",
        answer:
          "No. Mediation provides a structured opportunity for parties to work towards a resolution, but the outcome depends on the parties involved and cannot be guaranteed.",
      },
      {
        id: "suitable-for-all",
        question: "Is mediation suitable for every workplace dispute?",
        answer:
          "No. Mediation suits situations where a facilitated conversation could help. It is not appropriate for every dispute, and suitability is assessed before proceeding.",
      },
    ],
    legalReviewRequired: true,
  },
  {
    slug: "employment-tribunal-hr-support",
    categorySlug: "employment-law-and-employee-relations",
    metaDescription: "Apex HR is an employment tribunal HR support firm helping UK employers coordinate records and internal processes alongside appointed legal advisers where applicable.",
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
      "This service supports your legal representation with HR process and evidence. It is not a substitute for qualified legal representation at tribunal.",
    relatedServiceSlugs: ["workplace-investigations", "redundancy-and-restructuring-support", "hr-compliance-audit"],
    relatedSectorSlugs: ["professional-services", "manufacturers", "care-homes"],
    faqs: [
      { id: "represent", question: "Does Apex HR represent us at tribunal?", answer: "No. Apex HR provides HR-side support and evidence preparation. Tribunal representation should come from a qualified solicitor or barrister." },
    ],
    outOfScope: [
      "Legal strategy or advice on the merits of the claim",
      "Legal representation at tribunal: this should come from a qualified solicitor or barrister",
      "Drafting tribunal pleadings or other formal legal filings",
      "Predicting or guaranteeing the outcome of a tribunal claim",
      "Any claim of legal privilege over materials Apex HR prepares",
    ],
    differentiationNote:
      "This service supports the HR and evidence-organisation side of a tribunal claim, working alongside your appointed legal representation: distinct from Workplace Investigations (fact-finding before a claim arises) and from the legal representation itself, which remains your solicitor or barrister's responsibility.",
    additionalFaqs: [
      {
        id: "privilege",
        question: "Does material Apex HR prepares carry legal privilege?",
        answer:
          "Not automatically. Legal privilege depends on how materials are prepared and by whom, and should be confirmed with your legal representation.",
      },
    ],
    legalReviewRequired: true,
  },
  {
    slug: "outplacement-and-career-transition-services",
    categorySlug: "employment-law-and-employee-relations",
    metaDescription: "Apex HR is an outplacement firm helping UK employers support employees leaving through redundancy or restructuring into their next career step.",
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
    outOfScope: [
      "A guarantee of interviews, job offers or placement into a new role",
      "A specific guaranteed timescale for finding new employment",
      "Access to a particular set of employers or vacancies",
      "Automatic entry into Apex HR's candidate or talent-pool database: participants are never added without their own informed agreement",
    ],
    differentiationNote:
      "This service supports employees during their transition to new employment after a decision has been made, distinct from Redundancy & Restructuring Support, which covers the HR process of planning and running the redundancy or restructuring itself. Any move for a participant into Apex HR's own candidate pathways happens only with the participant's informed, separate agreement, never automatically.",
    additionalFaqs: [
      {
        id: "database",
        question: "Are outplacement participants automatically added to Apex HR's candidate database?",
        answer:
          "No. Participants are never added to Apex HR's talent pool or candidate database without their own informed, separate agreement.",
      },
      {
        id: "guarantee",
        question: "Does outplacement guarantee a new job?",
        answer:
          "No. Outplacement provides practical career-transition support. It cannot guarantee interviews, offers, placement or a specific timescale for finding new employment.",
      },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "industrial-relations-and-trade-union-negotiations",
    categorySlug: "employment-law-and-employee-relations",
    metaDescription: "Apex HR is an industrial relations firm helping UK employers prepare for and engage constructively in trade union negotiations.",
    primaryKeyword: "industrial relations support",
    heroSummary: "Practical support preparing for and engaging in trade union negotiations and wider industrial relations matters.",
    employerChallenge:
      "Union negotiations require careful preparation and a consistent approach, particularly for employers without regular experience of collective bargaining.",
    businessOutcomes: [
      "Clearer negotiation preparation and positioning",
      "More consistent engagement with union representatives",
      "A more structured approach that may help reduce avoidable disputes",
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
      "This is informational HR support. Specific legal questions about collective bargaining obligations should be confirmed with a qualified employment lawyer.",
    relatedServiceSlugs: ["redundancy-and-restructuring-support", "employee-engagement-surveys-and-action-planning", "reward-strategy"],
    relatedSectorSlugs: ["manufacturers", "distribution", "construction"],
    faqs: [
      { id: "recognised", question: "Does this require a recognised union already in place?", answer: "This service is typically most relevant where a union is already recognised, but early guidance can also help employers approaching recognition discussions." },
    ],
    outOfScope: [
      "Acting as legal counsel, or as the trade union itself",
      "A guarantee of reaching agreement or avoiding industrial action",
      "A guarantee of improved union relations",
      "A guarantee of confidentiality in every circumstance",
      "A guarantee of a specific negotiation result",
    ],
    differentiationNote:
      "This service covers employer-side preparation and process support for engaging with a recognised trade union or works council on collective matters: distinct from Workplace Mediation & Conflict Resolution, which addresses individual or team-level conflict, and from Redundancy & Restructuring Support, which covers organisational change rather than ongoing collective engagement.",
    additionalFaqs: [
      {
        id: "not-legal-counsel",
        question: "Does Apex HR act as our legal counsel or negotiate as the union?",
        answer:
          "No. Apex HR supports your organisation's own preparation and process as the employer. It does not act as your legal counsel or as the trade union, and specific legal questions about collective bargaining obligations should be confirmed with a qualified employment lawyer.",
      },
    ],
    legalReviewRequired: true,
  },
  {
    slug: "skilled-worker-sponsorship-hr-support",
    categorySlug: "employment-law-and-employee-relations",
    metaDescription: "Apex HR is a Skilled Worker sponsorship HR firm helping UK employers manage the HR process for the UK Skilled Worker route, working alongside qualified immigration advisers.",
    primaryKeyword: "skilled worker sponsorship HR support",
    heroSummary: "HR-side process support for employers sponsoring international talent, working alongside qualified immigration advisers.",
    employerChallenge:
      "Skilled Worker sponsorship involves detailed record-keeping and process obligations that sit alongside, but are distinct from, the formal immigration application itself.",
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
      "This is HR process support only. Formal sponsor licence applications, compliance and immigration status questions must be handled by a qualified immigration adviser or solicitor.",
    relatedServiceSlugs: ["hr-compliance-audit", "employee-handbooks-and-hr-policies", "permanent-recruitment"],
    relatedSectorSlugs: ["technology", "health-care", "life-sciences"],
    faqs: [
      { id: "immigration-advice", question: "Does Apex HR provide immigration advice?", answer: "No. This is HR process support alongside your qualified immigration adviser. Apex HR does not provide immigration or visa legal advice." },
    ],
    outOfScope: [
      "Determining whether a specific individual qualifies for a Skilled Worker visa: this is an immigration-law question",
      "Guaranteeing a sponsor licence, visa approval or any immigration outcome",
      "Current salary thresholds, fees or processing times: these change and should be confirmed against current GOV.UK guidance",
      "Acting as an immigration adviser or government body",
    ],
    differentiationNote:
      "Being a licensed sponsor and an individual holding a Skilled Worker visa are related but distinct: the sponsor licence sits with the employer, while eligibility for the visa itself is determined by the Home Office for each individual. This service supports the employer's HR processes around sponsorship, not the individual immigration application or determination.",
    additionalFaqs: [
      {
        id: "visa-vs-sponsorship",
        question: "Are 'sponsorship' and a 'Skilled Worker visa' the same thing?",
        answer:
          "No. Sponsorship refers to the employer's licence and processes for supporting a worker's visa application; the Skilled Worker visa itself is the individual's immigration status, determined by the Home Office. Apex HR supports the employer's HR side of sponsorship, not individual visa determinations.",
      },
    ],
    legalReviewRequired: true,
  },

  // ---- Organisation Development & Change Management ----
  {
    slug: "organisation-design",
    categorySlug: "organisation-development-change-management",
    metaDescription: "Apex HR is an organisation design firm helping UK employers build structures that match their strategy and support how work actually gets done.",
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
      { id: "redundancy", question: "Does organisation design always involve redundancies?", answer: "No. Design changes can involve role changes without headcount reduction. Where redundancies are involved, this is planned separately and carefully." },
    ],
    outOfScope: [
      "Legal advice on changing employment terms or contracts: this should be obtained from a qualified employment lawyer alongside any structural change.",
      "An assumption that redesign automatically requires redundancies: many structural changes involve no headcount reduction.",
      "Final decisions on organisational structure: these remain with your leadership team, with Apex HR providing analysis, options and design support.",
      "Guaranteed efficiency, productivity or cost savings from a new structure.",
    ],
    differentiationNote:
      "Organisation Design focuses on the structure itself: roles, reporting lines, accountability and decision rights. Change Management, a related service, focuses on how people move through a transition once a new structure or way of working has been agreed.",
    additionalFaqs: [
      { id: "decision-rights", question: "What are 'decision rights' in organisation design?", answer: "Decision rights describe who is accountable for making which decisions within a structure. Clarifying this alongside reporting lines can help reduce duplicated effort and slow decision-making." },
      { id: "final-say", question: "Does Apex HR make the final decision on our structure?", answer: "No. Apex HR provides analysis and design options. Final decisions on organisational structure remain with your leadership team." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "change-management",
    categorySlug: "organisation-development-change-management",
    metaDescription: "Apex HR is a change management firm helping UK employers plan the people side of organisational change through clear communication, engagement and adoption planning.",
    primaryKeyword: "change management",
    heroSummary: "Practical change management support, helping you plan the people side of organisational change through clear communication, engagement and adoption planning.",
    employerChallenge:
      "Change initiatives often fail not because the plan was wrong, but because the people side of change (communication, engagement and support) wasn't managed well.",
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
      { id: "size", question: "Does this only apply to large-scale change?", answer: "No. The same principles apply to smaller changes, scaled to fit the size of the initiative." },
    ],
    outOfScope: [
      "Guaranteed employee acceptance, adoption rates or elimination of resistance to change.",
      "Project management of the underlying business change itself, such as IT delivery, systems implementation or construction: this sits with your project or programme management function.",
      "Guaranteed delivery timescales for the wider change initiative.",
      "Guaranteed project success: outcomes depend on many factors beyond the people-change workstream.",
    ],
    differentiationNote:
      "Change Management here covers the people side of change: communication, engagement, readiness and adoption support. It is not project management of the underlying change itself, and it is distinct from Organisation Design, which focuses on the target structure rather than how people move through the transition to it.",
    additionalFaqs: [
      { id: "project-management", question: "Is this the same as project management?", answer: "No. Apex HR's change management support focuses on the people side of change, such as communication, engagement and manager support. It works alongside, not in place of, project or programme management for the underlying change itself." },
      { id: "resistance", question: "Can you guarantee employees will accept the change?", answer: "No. Apex HR cannot guarantee acceptance, adoption rates or the elimination of resistance. The aim is a structured, well-communicated process that gives the change the best practical chance of success." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "culture-transformation",
    categorySlug: "organisation-development-change-management",
    metaDescription: "Apex HR is a culture transformation firm helping UK employers shift how their organisation actually operates day to day, not just what it states.",
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
      { id: "quick-fix", question: "How quickly can culture change?", answer: "Genuine culture change takes sustained effort over time. Apex HR does not promise a quick fix, but focuses on practical, visible initiatives." },
    ],
    outOfScope: [
      "Guaranteed improvements to engagement, retention or productivity.",
      "Psychological diagnosis or assessment of individual employees.",
      "Culture change delivered independently of leadership behaviour: genuine culture change depends on visible leadership commitment, not an external initiative alone.",
      "A single workshop, away-day or values document, presented on its own as complete culture transformation.",
    ],
    differentiationNote:
      "Culture Transformation focuses on how the organisation actually behaves day to day: leadership signals, working practices and lived experience. It is distinct from Employee Experience & Engagement, which focuses more specifically on structured listening and the end-to-end employee journey.",
    additionalFaqs: [
      { id: "leadership-role", question: "What role does leadership play in culture transformation?", answer: "A central one. Culture is shaped by leadership behaviour more than any single initiative, so Apex HR's work is designed to support leaders, not to impose culture independently of them." },
      { id: "psychological", question: "Does this involve psychologically assessing individual employees?", answer: "No. This work looks at organisational culture, systems and behaviours as a whole, not psychological assessment of individual employees." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "ma-people-due-diligence-and-post-merger-integration",
    categorySlug: "organisation-development-change-management",
    metaDescription: "Apex HR is an M&A people due diligence firm helping UK employers understand workforce risk before a transaction and manage integration afterwards.",
    primaryKeyword: "M&A people due diligence",
    heroSummary: "People due diligence and post-merger integration support for Mergers and Acquisitions (M&A), so workforce risk is understood before a transaction and managed after it.",
    employerChallenge:
      "People risk is often under-assessed during M&A due diligence, and integration issues (culture clashes, duplicated roles, unclear reporting lines) can undermine the value of the deal.",
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
      { id: "scope", question: "Does this replace financial or legal due diligence?", answer: "No. This focuses specifically on people and organisational risk, alongside your financial and legal due diligence workstreams." },
    ],
    outOfScope: [
      "Financial, legal, tax or investment due diligence: these should be provided by your qualified financial, legal and tax advisers.",
      "Valuation of the business or certification of transaction risk.",
      "Guarantees of deal completion or successful integration outcomes.",
      "Legal conclusions about employee transfers or liabilities, including TUPE: these require advice from a qualified employment lawyer.",
    ],
    differentiationNote:
      "This service covers people-related due diligence and post-merger integration specifically: workforce information, organisational structure, culture and leadership considerations. It works alongside, and does not replace, financial, legal, tax and transaction-professional advice, and is distinct from Change Management, which supports the people side of change more generally rather than the specific context of a merger or acquisition.",
    additionalFaqs: [
      { id: "pre-vs-post", question: "What is the difference between the due diligence stage and post-merger integration?", answer: "Due diligence takes place before a transaction completes, reviewing people-related risk to inform the deal. Post-merger integration takes place afterwards, focusing on bringing structures, culture and processes together." },
      { id: "legal-transfers", question: "Does this cover the legal position on employee transfers, such as TUPE?", answer: "No. Apex HR does not provide legal conclusions on employee transfers or liabilities. Where TUPE or similar considerations apply, a qualified employment lawyer should be involved; see also TUPE Advisory." },
      { id: "financial-diligence", question: "Does this replace financial or legal due diligence on the transaction?", answer: "No. This service focuses specifically on people and organisational due diligence, working alongside your financial, legal and tax advisers rather than replacing them." },
    ],
    legalReviewRequired: true,
  },

  // ---- Compensation, Reward & Benefits ----
  {
    slug: "salary-benchmarking",
    categorySlug: "compensation-reward-and-benefits",
    metaDescription: "Apex HR is a salary benchmarking firm helping UK employers compare roles and pay against relevant external market data to inform pay decisions.",
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
    whoWeSupport: "Employers who want pay levels informed by reliable, relevant external market data.",
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
    outOfScope: [
      "Proprietary or exclusive salary data: recommendations draw on relevant available external market sources, not a private Apex HR dataset.",
      "Real-time or fully exhaustive market coverage: data reflects the sources available at the time of the exercise, not every role and employer in the market.",
      "Guaranteed recruitment or retention outcomes from adopting benchmarked pay levels.",
      "A determination of legally correct or fair pay: benchmarking informs pay decisions; it does not itself establish legal compliance, such as equal pay obligations.",
      "A specific salary figure for your organisation without current, relevant market data to support it.",
    ],
    differentiationNote:
      "Salary Benchmarking compares roles and pay against relevant external market data. It is distinct from Job Evaluation & Pay Structures, which assesses role value and consistency inside your own organisation; the two are often used together but answer different questions: where a role sits in the market, versus how it compares to other roles within your business.",
    additionalFaqs: [
      { id: "vs-job-evaluation", question: "How is salary benchmarking different from job evaluation?", answer: "Salary benchmarking compares a role's pay against the external market. Job evaluation assesses a role's value and consistency relative to other roles inside your own organisation. The two are complementary but answer different questions." },
      { id: "data-quality", question: "How reliable is the benchmarking data?", answer: "Results depend on the quality, coverage and date of the market data available for the roles and sector in question: data sources and their limitations are made clear as part of the exercise." },
      { id: "decision", question: "Does the benchmark tell us exactly what to pay?", answer: "No. Market data informs pay decisions rather than dictating them. Final pay decisions remain with your organisation, taking the benchmark alongside your own budget, strategy and internal equity considerations." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "job-evaluation-and-pay-structures",
    categorySlug: "compensation-reward-and-benefits",
    metaDescription: "Apex HR is a job evaluation firm helping UK employers build a consistent, structured basis for valuing roles and designing pay structures.",
    primaryKeyword: "job evaluation and pay structures",
    heroSummary: "Job evaluation and pay structure design, creating a consistent, structured basis for how roles are valued and paid.",
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
    outOfScope: [
      "Guaranteed equal pay compliance: a consistent evaluation approach can support a defensible position, but does not itself certify legal compliance.",
      "Legal defensibility as a certified or guaranteed outcome: where legal assurance is required, this should be obtained from a qualified employment lawyer.",
      "Guaranteed employee acceptance of grading outcomes.",
      "Elimination of pay disputes.",
      "A guaranteed grading outcome for any specific role, decided in advance of the evaluation.",
      "Assessment of an individual employee's personal performance: job evaluation assesses the role, not the person currently in it.",
    ],
    differentiationNote:
      "Job Evaluation & Pay Structures assesses the value of roles and builds internal consistency, distinct from Salary Benchmarking (which compares pay to the external market) and Pay Equity & Pay Gap Reporting (which analyses pay outcomes for equity and reporting purposes). It also does not assess individual employee performance: that sits with performance management.",
    additionalFaqs: [
      { id: "vs-performance", question: "Is job evaluation the same as assessing an employee's performance?", answer: "No. Job evaluation assesses the role itself, including its responsibilities and organisational value, not the performance of the person currently doing it. Performance is assessed separately through performance management." },
      { id: "vs-benchmarking", question: "How does this differ from salary benchmarking?", answer: "Job evaluation looks at internal consistency: how roles compare to each other within your organisation. Salary benchmarking looks externally, comparing pay to the market. They work well together but ask different questions." },
      { id: "final-decision", question: "Who makes the final pay decision?", answer: "Job evaluation and the resulting structure inform pay decisions, but final decisions on individual pay remain with your organisation's management." },
    ],
    legalReviewRequired: true,
  },
  {
    slug: "reward-strategy",
    categorySlug: "compensation-reward-and-benefits",
    metaDescription: "Apex HR is a reward strategy firm helping UK employers connect pay, benefits and recognition to their business and people goals.",
    primaryKeyword: "reward strategy",
    heroSummary: "A reward strategy that connects pay, benefits and recognition to your business goals and what your people actually value.",
    employerChallenge:
      "Reward decisions are often made piecemeal, a benefit added here, a pay review there, without an underlying strategy connecting them to business goals.",
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
      { id: "budget", question: "Does this require increasing reward spend?", answer: "Not necessarily. Strategy work often focuses on using existing spend more effectively, as well as identifying where investment would have the most impact." },
    ],
    outOfScope: [
      "Guaranteed improvements to retention, engagement or performance from a new reward strategy.",
      "Guaranteed cost savings.",
      "Guaranteed employee acceptance of reward changes.",
      "Tax efficiency advice or guaranteed tax outcomes: this requires a qualified tax adviser or accountant.",
      "Legal, tax, accounting, financial or other regulated advice: this sits with qualified, appropriately regulated professionals.",
      "Administration of individual employee benefits: this is a strategic, organisation-wide service, not day-to-day benefits administration.",
      "Guaranteed outcomes from any particular incentive scheme.",
    ],
    differentiationNote:
      "Reward Strategy sets an organisation-wide approach connecting pay, benefits, incentives and recognition to your business and people goals. It is distinct from Employee Benefits Consulting, which focuses on the design and administration of specific benefits, and from Executive Compensation & Share Schemes, which focuses specifically on senior executive and share-based reward.",
    additionalFaqs: [
      { id: "vs-benefits", question: "How does this differ from employee benefits consulting?", answer: "Reward Strategy sets the overall, organisation-wide approach connecting pay, benefits, incentives and recognition to your goals. Employee Benefits Consulting focuses more specifically on the design and administration of individual benefits within that approach." },
      { id: "vs-executive", question: "Does this cover executive pay and share schemes?", answer: "Not specifically. Executive pay and share-based reward are covered by Executive Compensation & Share Schemes. Reward Strategy sets the organisation-wide approach that executive reward typically sits within." },
      { id: "tax", question: "Does Apex HR provide tax advice on reward or benefits?", answer: "No. Tax, accounting and other regulated financial advice is outside Apex HR's scope. Qualified tax or financial advisers should be involved wherever a reward decision has tax or accounting implications." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "pay-equity-and-pay-gap-reporting",
    categorySlug: "compensation-reward-and-benefits",
    metaDescription: "Apex HR is a pay equity firm helping UK employers understand and address pay disparities through careful analysis and considered reporting.",
    primaryKeyword: "pay equity and pay gap reporting",
    heroSummary: "Pay equity analysis and reporting support, helping you understand pay disparities and plan a considered response.",
    employerChallenge:
      "Understanding whether pay gaps exist, and why, requires careful analysis, and getting reporting or messaging wrong can create reputational risk.",
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
    outOfScope: [
      "Certification of equal pay compliance.",
      "A legal determination of whether unlawful pay discrimination has occurred: this requires qualified legal advice.",
      "A guarantee that identified pay gaps will close or narrow by any particular amount.",
      "A guarantee of statutory reporting compliance: employers remain responsible for confirming their own statutory reporting obligations.",
      "Legal representation in connection with a pay equity or discrimination claim.",
      "Statutory reporting thresholds, deadlines or calculation rules: these should be confirmed against current GOV.UK guidance, as they can change.",
    ],
    differentiationNote:
      "Pay Equity & Pay Gap Reporting analyses pay outcomes across groups and supports reporting and action planning. It is distinct from Salary Benchmarking (external market comparison), Job Evaluation & Pay Structures (internal role-value consistency) and Reward Strategy (the broader, organisation-wide reward approach), though findings from this analysis often inform work in those areas.",
    additionalFaqs: [
      { id: "vs-benchmarking-evaluation", question: "How does pay equity analysis differ from salary benchmarking or job evaluation?", answer: "Salary benchmarking compares pay to the external market, and job evaluation assesses internal role consistency. Pay equity analysis looks specifically at whether pay patterns differ in ways connected to protected characteristics or other groupings, which is a distinct question from either." },
      { id: "discrimination", question: "Does this determine whether unlawful pay discrimination has taken place?", answer: "No. Apex HR's analysis identifies patterns and questions that may need further investigation. A legal determination of unlawful discrimination requires qualified legal advice." },
      { id: "close-gap", question: "Can you guarantee that identified pay gaps will close?", answer: "No. Apex HR can support analysis, reporting and action planning, but closing a pay gap depends on decisions and actions your organisation takes over time, and no guaranteed outcome can be promised." },
    ],
    legalReviewRequired: true,
  },
  {
    slug: "employee-benefits-consulting",
    categorySlug: "compensation-reward-and-benefits",
    metaDescription: "Apex HR is an employee benefits consulting firm helping UK employers design a benefits offering that genuinely fits their people and budget.",
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
      { id: "provider", question: "Does Apex HR arrange the benefits providers?", answer: "No. Apex HR is not an insurance broker, financial adviser or pension adviser, and does not arrange, select or endorse specific benefits providers. This service focuses on reviewing your current benefits and helping design a considered benefits approach; any provider decision, and any regulated advice around it, remain with your organisation and appropriately regulated advisers." },
    ],
    outOfScope: [
      "Regulated financial advice, investment advice or insurance broking: Apex HR is not authorised to provide these and does not act as your insurance broker.",
      "Pension advice: this requires a qualified, regulated pension adviser.",
      "Tax or legal advice on benefits arrangements.",
      "Guaranteed savings from switching or renegotiating a benefits provider.",
      "Guaranteed employee uptake or satisfaction with any benefits offering.",
      "Endorsement or recommendation of a specific benefits provider.",
    ],
    differentiationNote:
      "Employee Benefits Consulting focuses on reviewing and designing the specific benefits an organisation offers. It is distinct from Reward Strategy, which sets the organisation-wide approach connecting pay, benefits, incentives and recognition to broader business goals: Reward Strategy is the umbrella, and Employee Benefits Consulting works within it on the benefits component specifically.",
    additionalFaqs: [
      { id: "vs-reward-strategy", question: "How does Employee Benefits Consulting differ from Reward Strategy?", answer: "Reward Strategy sets the organisation-wide approach connecting pay, benefits, incentives and recognition to your goals. Employee Benefits Consulting focuses specifically on reviewing and designing the benefits component within that approach." },
      { id: "regulated-advice", question: "Does Apex HR provide financial, insurance, pension or tax advice on benefits?", answer: "No. These are regulated activities requiring a qualified, authorised adviser. Apex HR's role is reviewing and designing your benefits approach from an HR and workforce perspective, working alongside your regulated advisers where needed." },
      { id: "provider-savings", question: "Can you guarantee savings from switching benefits providers?", answer: "No. Any potential savings depend on your current arrangements, the market and decisions your organisation makes. Apex HR does not guarantee provider savings, uptake or employee satisfaction." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "executive-compensation-and-share-schemes",
    categorySlug: "compensation-reward-and-benefits",
    metaDescription: "Apex HR is an executive compensation firm helping UK employers design senior leadership reward and share schemes aligned to their business goals.",
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
      "This is reward design and market-context advisory support: share scheme legal and tax structuring must be confirmed with qualified legal and tax advisers.",
    relatedServiceSlugs: ["reward-strategy", "fractional-hr-director-chief-people-officer", "salary-benchmarking"],
    relatedSectorSlugs: ["financial-services", "technology", "professional-services"],
    faqs: [
      { id: "tax", question: "Does Apex HR provide tax advice on share schemes?", answer: "No. Share scheme structuring should always involve qualified legal and tax advisers. Apex HR advises on reward design and market context." },
    ],
    outOfScope: [
      "Legal, tax, accounting, investment or securities advice: share scheme structuring and any securities-law considerations must be confirmed with qualified legal, tax and, where relevant, regulated advisers.",
      "Valuation of the company or its shares.",
      "Drafting share-scheme legal documentation or scheme rules.",
      "Regulatory approval or clearance of any scheme.",
      "Shareholder approval of any scheme or arrangement: this is a decision for your shareholders and governing body.",
      "Guaranteed tax efficiency of any structure.",
      "Guaranteed performance outcomes from an incentive design.",
      "Fiduciary or remuneration-committee decision-making authority: final decisions remain with your board or remuneration committee.",
    ],
    differentiationNote:
      "Executive Compensation & Share Schemes focuses specifically on senior executive and share-based reward, including governance and market-context considerations. It is distinct from Reward Strategy, which covers organisation-wide reward for the whole workforce, and from Employee Benefits Consulting, which focuses on broader employee benefits rather than executive-level share and incentive arrangements. This service does not extend into Mergers and Acquisitions (M&A) advisory; where a transaction is involved, see M&A People Due Diligence & Post-Merger Integration for people-related M&A support.",
    additionalFaqs: [
      { id: "vs-reward-strategy", question: "How does Executive Compensation & Share Schemes differ from Reward Strategy?", answer: "Reward Strategy covers pay, benefits, incentives and recognition across the whole organisation. Executive Compensation & Share Schemes focuses specifically on senior executive and share-based reward, including the governance considerations that come with it." },
      { id: "share-scheme-legal", question: "Does Apex HR draft share scheme legal documents or provide tax advice?", answer: "No. Share scheme legal documentation, tax structuring and securities-law considerations must be confirmed with qualified legal, tax and, where relevant, regulated advisers. Apex HR supports reward design and market context, not legal or tax execution." },
      { id: "committee-authority", question: "Does Apex HR make the final decision on executive reward?", answer: "No. Final decisions remain with your board or remuneration committee. Apex HR provides advisory support and market context to inform that decision." },
    ],
    legalReviewRequired: true,
  },

  // ---- Learning & Leadership Development ----
  {
    slug: "leadership-and-management-training",
    categorySlug: "learning-and-leadership-development",
    metaDescription: "Apex HR is a leadership and management training firm helping UK employers build capable, confident people managers, not just theory.",
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
    outOfScope: [
      "Accredited or externally certified qualifications: unless a specific accreditation is confirmed and verified for your programme, training is not presented as leading to a formal qualification.",
      "Guaranteed changes in manager behaviour, team productivity or performance as a direct result of training.",
      "Guaranteed promotion or career progression for participants.",
      "An assumption that the same training format or content suits every organisation or every manager.",
      "A specific training outcome or completion time promised in advance of understanding your management context.",
    ],
    differentiationNote:
      "Leadership & Management Training delivers structured training for managers and leadership groups. It is distinct from Executive Coaching & 360 Feedback, which is individual, one-to-one development work, and from Learning Strategy & Capability Development, which sets the organisation-wide learning approach that training programmes like this one sit within.",
    additionalFaqs: [
      { id: "vs-coaching", question: "How is this different from executive coaching?", answer: "Leadership & Management Training is typically delivered to groups of managers around shared skills and topics. Executive Coaching & 360 Feedback is individual, one-to-one development work, usually for senior leaders." },
      { id: "vs-strategy", question: "How does this relate to learning strategy?", answer: "Learning Strategy & Capability Development sets the organisation-wide approach to learning and development. Leadership & Management Training is one form of delivery that can sit within that strategy." },
      { id: "accreditation", question: "Does this lead to a formal qualification?", answer: "Not by default. Training is designed around your management context rather than a fixed accredited course. Where a specific accreditation is relevant and available, this would be confirmed separately." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "executive-coaching-and-360-feedback",
    categorySlug: "learning-and-leadership-development",
    metaDescription: "Apex HR is an executive coaching firm helping UK employers support senior leaders' development through coaching and structured 360-degree feedback.",
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
    outOfScope: [
      "Psychological diagnosis, treatment or therapy: coaching is a development conversation, not a clinical or medical service. Where a participant may benefit from therapeutic or medical support, this sits outside coaching and should be sought separately.",
      "A guarantee of confidentiality in every circumstance: there are limited situations, such as safeguarding or legal obligations, where confidentiality may need to be limited; this is explained as part of any coaching arrangement.",
      "Guaranteed leadership improvement, promotion or performance outcomes from coaching or 360 feedback.",
      "Certified or accredited coaching credentials: unless a specific coach's accreditation is confirmed and verified, none is claimed.",
      "360-degree feedback presented as an objective clinical or psychological assessment: it reflects the perceptions of colleagues who provide feedback, not a validated diagnostic instrument.",
    ],
    differentiationNote:
      "Executive Coaching & 360 Feedback is individual development work for senior leaders, distinct from Leadership & Management Training (group-delivered training), from performance management (which assesses job performance against objectives, owned by the organisation) and from therapy or counselling (which addresses clinical or personal wellbeing needs, not organisational leadership development).",
    additionalFaqs: [
      { id: "vs-training", question: "How does coaching differ from leadership training?", answer: "Executive Coaching & 360 Feedback is individual, one-to-one development work tailored to a specific leader. Leadership & Management Training is typically delivered to groups of managers around shared topics." },
      { id: "vs-therapy", question: "Is coaching a form of therapy or counselling?", answer: "No. Coaching is a development conversation focused on leadership and organisational goals, not a clinical or medical service. Where therapeutic or medical support may be helpful, this is outside coaching and should be sought separately, such as through a GP or qualified therapist." },
      { id: "confidentiality-limits", question: "Are there any limits to coaching confidentiality?", answer: "Coaching conversations are treated as confidential between coach and leader, with only agreed themes shared with sponsors. There are limited circumstances, such as safeguarding concerns or legal obligations, where confidentiality may need to be limited: this is explained as part of any coaching arrangement." },
      { id: "vs-performance-management", question: "Is 360 feedback the same as a performance appraisal?", answer: "No. 360-degree feedback gathers colleagues' perceptions to inform coaching and development, and is not a validated clinical or psychological assessment. Performance appraisal is a separate, organisation-owned process assessing performance against job objectives; see Performance Management." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "learning-strategy-and-capability-development",
    categorySlug: "learning-and-leadership-development",
    metaDescription: "Apex HR is a learning strategy firm helping UK employers build a coherent, connected approach to developing workforce capability.",
    primaryKeyword: "learning strategy",
    heroSummary: "Learning strategy support to help you build a coherent, sustainable approach to developing your workforce.",
    employerChallenge:
      "Training often happens reactively (a course here, a workshop there) without a strategy connecting it to the capabilities the business actually needs.",
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
    outOfScope: [
      "A guarantee of closing every identified skills gap.",
      "Guaranteed employee participation in learning activity.",
      "Guaranteed adoption of new skills or ways of working following training.",
      "Guaranteed productivity improvement or return on investment from learning spend.",
      "A guarantee that the organisation will be ready for future workforce needs.",
    ],
    differentiationNote:
      "Learning Strategy & Capability Development sets the organisation-wide approach to learning, prioritisation and governance. It is distinct from Leadership & Management Training, which delivers specific training programmes, and from Strategic Workforce Planning, which focuses on future workforce numbers and structure rather than learning content and capability-building activity.",
    additionalFaqs: [
      { id: "vs-training", question: "How does this differ from leadership training?", answer: "Learning Strategy & Capability Development sets the organisation-wide learning approach and priorities. Leadership & Management Training is one form of delivery (a specific training programme) that can sit within that strategy." },
      { id: "vs-workforce-planning", question: "How does this differ from strategic workforce planning?", answer: "Strategic Workforce Planning focuses on future workforce numbers, structure and roles. Learning Strategy & Capability Development focuses on the learning and capability-building activity needed to develop your existing and future workforce." },
      { id: "roi", question: "Can you guarantee a return on our learning investment?", answer: "No. Measurement and evaluation can be planned as part of the strategy, but return on investment depends on many factors beyond the strategy itself, including how it's implemented and adopted." },
    ],
    legalReviewRequired: false,
  },

  // ---- Performance & Talent Management ----
  {
    slug: "performance-management",
    categorySlug: "performance-and-talent-management",
    metaDescription: "Apex HR is a performance management firm helping UK employers design consistent, genuinely useful performance conversations for managers and employees.",
    primaryKeyword: "performance management design",
    heroSummary: "Performance management design that supports consistent conversations managers and employees actually find useful.",
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
      { id: "annual", question: "Does this have to be an annual review process?", answer: "No. Many organisations now prefer more frequent, lighter-touch check-ins. The right cadence is designed around your context." },
    ],
    outOfScope: [
      "Guaranteed performance improvement as a direct result of a new process.",
      "Guaranteed employee engagement.",
      "Legal compliance or legal defensibility of your performance process: this should be confirmed with a qualified employment lawyer, particularly where the process feeds into formal decisions.",
      "Elimination of bias or the elimination of performance-related disputes.",
      "Disciplinary, dismissal, promotion or pay decisions: these remain decisions for your organisation's management, informed by the process but not made by Apex HR.",
      "An assumption that a performance rating is automatically objective: ratings reflect structured judgement, not an automatically neutral measurement.",
    ],
    differentiationNote:
      "Performance Management designs the ongoing process for setting expectations, giving feedback and reviewing performance: distinct from Executive Coaching & 360 Feedback, which is individual development work for a specific leader, and from Competency Frameworks, which defines the skills, knowledge and behaviours a performance process can then be assessed against.",
    additionalFaqs: [
      { id: "vs-annual-appraisal", question: "Is this the same as an annual appraisal?", answer: "Not necessarily. This service can support an ongoing performance process with regular feedback, an annual appraisal, or a combination, depending on what fits your organisation. An annual appraisal alone is one possible design choice, not the only one." },
      { id: "vs-coaching", question: "How does this differ from executive coaching?", answer: "Performance Management designs the organisation-wide process for setting expectations and reviewing performance. Executive Coaching & 360 Feedback is individual, one-to-one development work for a specific leader." },
      { id: "decisions", question: "Does Apex HR make performance-related decisions, such as pay or promotion?", answer: "No. Apex HR designs the process and supports managers in using it. Decisions such as pay, promotion, disciplinary action or dismissal remain with your organisation's management." },
    ],
    legalReviewRequired: true,
  },
  {
    slug: "succession-planning-and-talent-mapping",
    categorySlug: "performance-and-talent-management",
    metaDescription: "Apex HR is a succession planning firm helping UK employers prepare for key role transitions with practical talent mapping and development plans.",
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
      "The focus is on practical readiness: real development plans, not just a list of names on an org chart.",
    relatedServiceSlugs: ["performance-management", "competency-frameworks", "executive-coaching-and-360-feedback"],
    relatedSectorSlugs: ["professional-services", "manufacturers", "financial-services"],
    faqs: [
      { id: "small-business", question: "Is this only relevant for large organisations?", answer: "No. Even a small leadership team benefits from understanding succession risk in a handful of critical roles." },
    ],
    outOfScope: [
      "A guarantee of succession readiness: readiness is assessed and developed, not guaranteed in advance.",
      "A promise of promotion or appointment to any individual: identification as a potential successor is not a commitment of a future role.",
      "A description of any employee as objectively 'high potential' without explaining that this depends on defined evidence and judgement, not a fixed, universal measure.",
      "A guarantee of confidentiality in every circumstance.",
      "A claim that bias has been eliminated from succession or talent-mapping judgements.",
      "Selection criteria that exclude or disadvantage people based on protected characteristics: succession and talent decisions must be made on fair, job-relevant criteria.",
      "Automated tools making final talent or succession decisions: any tools used inform, but do not replace, management judgement.",
    ],
    differentiationNote:
      "Succession Planning & Talent Mapping identifies critical roles and internal talent considerations, distinct from Strategic Workforce Planning (broader future workforce numbers and structure across the organisation), from external recruitment (which looks outside the organisation), and from a promise of promotion: identification as a potential successor is not a guaranteed future appointment.",
    additionalFaqs: [
      { id: "promotion-guarantee", question: "Does being identified as a potential successor guarantee promotion?", answer: "No. Identification as a potential successor is not a commitment or promise of a future role. Appointment decisions are made by your organisation when a role actually becomes available, based on the circumstances at the time." },
      { id: "vs-workforce-planning", question: "How does this differ from strategic workforce planning?", answer: "Strategic Workforce Planning looks at future workforce numbers, structure and roles across the organisation. Succession Planning & Talent Mapping focuses specifically on critical roles and the internal talent who could step into them." },
      { id: "vs-recruitment", question: "How does talent mapping differ from recruitment?", answer: "Talent mapping considers internal talent already within your organisation. External recruitment looks outside the organisation to fill a role. The two are often used together, particularly where internal readiness gaps exist." },
      { id: "data-handling", question: "How is employee information handled in this process?", answer: "Succession and talent-mapping discussions involve identifiable information about individuals. This should be handled carefully, on a need-to-know basis, consistent with your data-protection obligations." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "competency-frameworks",
    categorySlug: "performance-and-talent-management",
    metaDescription: "Apex HR is a competency framework firm helping UK employers create a consistent basis for recruitment, development and performance decisions.",
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
    outOfScope: [
      "Scientific or psychological validation of the framework: competency frameworks are structured HR tools, not clinically validated instruments.",
      "Guaranteed objectivity: a framework reduces inconsistency but reflects structured judgement, not an automatically neutral measurement.",
      "Legal compliance guaranteed simply by using the framework.",
      "Elimination of bias in recruitment, performance or development decisions that use the framework.",
      "Guaranteed performance improvement from adopting a framework.",
      "A determination of an employee's personal worth or suitability: the framework assesses observable skills, knowledge and behaviours relevant to a role, not a person's inherent worth.",
    ],
    differentiationNote:
      "Competency Frameworks define the skills, knowledge and behaviours expected at a role or level, providing a shared reference point that Job Evaluation, Performance Management and other HR processes can draw on. It is distinct from Job Evaluation & Pay Structures (which assesses a role's relative value for pay purposes) and from Performance Management (which uses a framework, among other inputs, to assess actual performance), and it is not a psychometric or personality assessment of any individual.",
    additionalFaqs: [
      { id: "vs-job-evaluation", question: "How does this differ from job evaluation?", answer: "Job evaluation assesses a role's relative value for pay purposes. A competency framework defines the skills, knowledge and behaviours expected at a role or level, and can be used alongside job evaluation, performance management and recruitment." },
      { id: "vs-performance-management", question: "How does this relate to performance management?", answer: "A competency framework can provide one of the reference points a performance process assesses people against. Performance Management is the broader process design; the framework is one input into it." },
      { id: "psychometric", question: "Is this a psychometric or personality assessment?", answer: "No. A competency framework defines observable skills, knowledge and behaviours relevant to a role, not a clinical, personality or psychometric assessment of an individual." },
    ],
    legalReviewRequired: false,
  },

  // ---- Employee Experience & Engagement ----
  {
    slug: "employee-experience-strategy",
    categorySlug: "employee-experience-and-engagement",
    metaDescription: "Apex HR is an employee experience firm helping UK employers design a coherent approach across the full employee journey, from attraction through to exit.",
    primaryKeyword: "employee experience strategy",
    heroSummary: "An employee experience strategy that looks at the full journey (from attraction through to exit), not just isolated initiatives.",
    employerChallenge:
      "Employee experience initiatives often happen in isolation (a wellbeing session here, an onboarding tweak there) without a coherent view of the whole journey.",
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
    relatedServiceSlugs: ["employee-engagement-surveys-and-action-planning", "culture-transformation", "workplace-wellbeing-and-mental-health"],
    relatedSectorSlugs: ["technology", "hospitality", "professional-services"],
    faqs: [
      { id: "size", question: "Does this suit smaller employers?", answer: "Yes. Journey mapping and prioritisation scale to the size of the organisation and the resources available." },
    ],
    outOfScope: [
      "Guaranteed engagement, retention, productivity or cultural change from an experience strategy.",
      "A survey alone: employee experience strategy considers the wider journey, not only a single engagement survey (see Employee Engagement Surveys & Action Planning for that specific service).",
      "Final decisions on experience priorities or implementation: these remain with your leadership and management team; employee feedback informs decisions but does not transfer decision-making authority to Apex HR.",
      "An objective measurement of every aspect of employee experience, or a diagnosis of individual employee psychology.",
    ],
    differentiationNote:
      "Employee Experience Strategy looks at the wider employee journey (the moments and touchpoints that shape how people experience working for you) and is distinct from Employee Engagement Surveys & Action Planning, which is a specific listening exercise that can inform this wider strategy, and from Culture Transformation, which focuses more directly on organisational behaviours and ways of working rather than the end-to-end journey.",
    additionalFaqs: [
      { id: "vs-survey", question: "Is this the same as an engagement survey?", answer: "No. An engagement survey is one way of listening to employees and can inform this work, but Employee Experience Strategy looks at the wider employee journey, not only survey data. See Employee Engagement Surveys & Action Planning for that specific service." },
      { id: "vs-culture", question: "How does this differ from culture transformation?", answer: "Employee Experience Strategy focuses on the journey and touchpoints employees move through. Culture Transformation focuses more directly on organisational behaviours and ways of working. The two are related and often connected, but address different questions." },
      { id: "decisions", question: "Does employee feedback automatically determine the resulting decisions?", answer: "No. Feedback informs the strategy and priorities, but decisions remain with your leadership and management team. Feedback does not transfer decision-making authority to Apex HR." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "employee-engagement-surveys-and-action-planning",
    categorySlug: "employee-experience-and-engagement",
    metaDescription: "Apex HR is an employee engagement firm helping UK employers run surveys and turn honest feedback into practical, visible action.",
    primaryKeyword: "employee engagement survey",
    heroSummary: "Employee engagement surveys designed to get honest input, paired with practical action planning that turns results into change.",
    employerChallenge:
      "Engagement surveys often generate a report that sits unread, with no clear follow-through, which can make employees more sceptical about being asked again.",
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
    outOfScope: [
      "A guarantee that individual respondents cannot be identified: this is harder to assure in small teams or through detailed free-text comments, and should be considered when agreeing the survey approach.",
      "Guaranteed participation, response rates or candid answers.",
      "Guaranteed engagement improvement or successful implementation of the resulting action plan.",
      "Scientific, psychometric or clinical validation of the survey instrument.",
      "Survey results presented as objective truth: results are one input that informs, rather than replaces, management judgement.",
      "A named survey platform, benchmark database or proprietary scoring system: the specific tools and data sources used are agreed as part of the engagement.",
      "Data access, reporting thresholds, free-text handling, retention and employee communications assumed by default: these are agreed and confirmed as part of setting up the engagement.",
    ],
    differentiationNote:
      "Employee Engagement Surveys & Action Planning is a specific listening exercise: designing, running and acting on a survey. It is distinct from Employee Experience Strategy, which looks at the wider employee journey beyond any one survey; from Culture Transformation, which focuses on organisational behaviours rather than survey data specifically; from Workplace Wellbeing & Mental Health, which addresses wellbeing specifically rather than engagement broadly; and from general performance-management processes, which assess individual performance rather than aggregate employee sentiment.",
    additionalFaqs: [
      { id: "anonymous-vs-confidential", question: "What is the difference between an anonymous and a confidential survey?", answer: "An anonymous survey is designed so responses cannot be traced back to an individual at all. A confidential survey means identifiable responses are handled carefully and only shared in a controlled way, but are not fully anonymous. Which approach is used, and its practical limits, especially in small teams or with free-text answers, is agreed and clearly explained to employees before the survey is launched." },
      { id: "small-groups", question: "Can employees in small teams be identified from their answers?", answer: "It's possible, particularly in small teams or through detailed free-text comments, even where a survey is intended to be anonymous or confidential. Reporting thresholds and free-text handling are agreed as part of the engagement to manage this risk, but it cannot be entirely eliminated." },
      { id: "objective-truth", question: "Are survey results treated as the final word on engagement?", answer: "No. Survey results are one useful input alongside management's own knowledge and judgement, not an objective, standalone truth or a substitute for management decision-making." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "employer-branding-and-employee-value-proposition-evp",
    categorySlug: "employee-experience-and-engagement",
    metaDescription: "Apex HR is an employer branding firm helping UK employers define and communicate an Employee Value Proposition (EVP) that reflects genuine experience.",
    primaryKeyword: "employer branding and EVP",
    heroSummary: "Employer branding and Employee Value Proposition development that reflects what it's genuinely like to work for you.",
    employerChallenge:
      "An employer brand that overstates the real Employee Value Proposition (EVP), what it's actually like to work for you, can attract candidates for the wrong reasons, leading to early disappointment and attrition.",
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
    outOfScope: [
      "Guaranteed applicant numbers, quality of hire, candidate acceptance, retention or reputation improvement.",
      "Exclusive access to candidates or recruitment channels, or a proprietary applicant database.",
      "Guaranteed reach, search ranking, engagement or recruitment outcomes from EVP or employer-brand messaging.",
      "Endorsement of your employer brand by employees: messaging reflects genuine research, not a claimed formal endorsement.",
      "Ownership, management or guaranteed influence over third-party employer review platforms.",
      "Delivery of recruitment campaigns or recruitment marketing execution: this service defines the EVP and messaging framework; creative and campaign delivery sits with your marketing function, agency, or Apex HR's recruitment services separately.",
    ],
    differentiationNote:
      "Employer Branding & Employee Value Proposition (EVP) work defines and communicates what it is genuinely like to work for you. It is distinct from Apex HR's recruitment delivery services, such as Permanent Recruitment, which fill specific vacancies, from recruitment marketing campaign execution, and from Employee Experience Strategy, which addresses the wider employee journey rather than how that experience is defined and communicated externally.",
    additionalFaqs: [
      { id: "vs-recruitment", question: "Is this the same as recruitment marketing or advertising?", answer: "No. This service focuses on defining the Employee Value Proposition (EVP) and messaging framework. Recruitment marketing campaign execution and specific vacancy delivery are separate activities, which can be coordinated with your marketing function, agency, or Apex HR's recruitment services." },
      { id: "employee-endorsement", question: "Does the EVP imply that all employees endorse it?", answer: "No. Messaging is grounded in genuine research into what employees value, but it is not presented as a formal endorsement by every employee, and individual employee statements are not fabricated or attributed without basis." },
      { id: "guarantees", question: "Can you guarantee this will improve our applicant numbers or retention?", answer: "No. A genuine, well-communicated EVP can support attraction and retention, but Apex HR cannot guarantee applicant numbers, quality of hire, acceptance rates, retention or reputation outcomes, which depend on many factors beyond messaging." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "workplace-wellbeing-and-mental-health",
    categorySlug: "employee-experience-and-engagement",
    metaDescription: "Apex HR is a workplace wellbeing firm helping UK employers build a genuinely supportive working environment, beyond a single awareness day.",
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
      "This is HR strategy and manager-capability support. It is not a substitute for clinical or occupational health advice, which is signposted where appropriate.",
    relatedServiceSlugs: ["employee-experience-strategy", "culture-transformation", "employee-engagement-surveys-and-action-planning"],
    relatedSectorSlugs: ["care-homes", "health-care", "education"],
    faqs: [
      { id: "clinical", question: "Does Apex HR provide clinical mental health support?", answer: "No. This is HR strategy and manager-capability support. Employees needing clinical support should be signposted to appropriate occupational health or medical services." },
    ],
    outOfScope: [
      "Medical care, diagnosis, treatment, therapy, counselling or occupational-health provision: this is workplace and HR support, not a clinical service.",
      "A decision on whether an individual employee is medically fit for work: this is a clinical or occupational-health judgement, not an HR one.",
      "Diagnostic, treatment or emergency guidance for any individual: complex or urgent individual health questions require appropriately qualified professional input, sought separately.",
      "Guaranteed improved health, reduced absence, reduced stress, productivity, engagement or legal compliance.",
      "A guarantee of confidentiality where employer processes, safeguarding duties or information-sharing requirements may apply.",
      "An assumption that any policy, workshop or wellbeing programme can prevent every workplace or health problem.",
      "A suggestion that employee wellbeing is solely the individual employee's responsibility: organisational and management factors are part of this work.",
    ],
    differentiationNote:
      "Workplace Wellbeing & Mental Health is HR-led organisational support (reviewing working conditions, building manager capability and designing a wellbeing approach), distinct from occupational health (clinical assessment and fitness-for-work judgements), employee assistance programmes (individual, confidential support services), and clinical or therapeutic services (diagnosis and treatment). It also differs from Employee Engagement Surveys & Action Planning, which addresses engagement broadly rather than wellbeing specifically, and from general Culture Transformation work, which addresses organisational behaviours more widely.",
    additionalFaqs: [
      { id: "fit-for-work", question: "Does Apex HR decide whether an employee is fit for work?", answer: "No. Fitness-for-work decisions are a clinical or occupational-health judgement, not something Apex HR's HR strategy and manager-capability support provides." },
      { id: "vs-eap", question: "Is this the same as an employee assistance programme?", answer: "No. An employee assistance programme provides confidential, individual support services directly to employees. This service is HR-led organisational and manager-capability support; the two can complement each other." },
      { id: "confidentiality-limits", question: "Is everything discussed as part of this work kept confidential?", answer: "Not in every circumstance. Employer safeguarding duties and information-sharing requirements can mean some information needs to be shared or acted on. This is explained as part of any engagement, rather than assumed by default." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "diversity-equity-and-inclusion-dei-consulting",
    categorySlug: "employee-experience-and-engagement",
    metaDescription: "Apex HR is a Diversity, Equity & Inclusion (DEI) consulting firm helping UK employers build a genuinely inclusive workplace, grounded in practical action.",
    primaryKeyword: "DEI consulting",
    heroSummary: "Diversity, Equity & Inclusion (DEI) consulting grounded in practical action, not just a policy statement.",
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
    relatedServiceSlugs: ["pay-equity-and-pay-gap-reporting", "culture-transformation", "employee-experience-strategy"],
    relatedSectorSlugs: ["professional-services", "education", "charity"],
    faqs: [
      { id: "legal", question: "Does this cover legal compliance around equality law?", answer: "This is a practical HR and strategy service. Specific equality-law compliance questions should be confirmed with a qualified employment lawyer." },
    ],
    outOfScope: [
      "Guaranteed representation, hiring, promotion, retention, belonging, inclusion or cultural outcomes.",
      "A claim that any process, policy or training eliminates bias or discrimination.",
      "Legal compliance, certification or regulatory approval: equality-law compliance should be confirmed with a qualified employment lawyer.",
      "Employment decisions made by Apex HR: hiring, promotion, retention and other employment decisions remain with your organisation.",
      "Invented workforce demographics, pay gaps, protected-characteristic findings or benchmark data: any data used is your organisation's own, agreed as part of the engagement.",
      "A description of any process as automatically fair, unbiased or objective.",
      "Automated decision-making or profiling based on protected characteristics.",
      "Treating employees as interchangeable representatives of a demographic group.",
    ],
    differentiationNote:
      "Diversity, Equity & Inclusion (DEI) Consulting supports organisational strategy, policy and practice. It is distinct from Culture Transformation (broader organisational behaviours), Employee Experience Strategy (the wider employee journey), Employee Engagement Surveys & Action Planning (a specific listening exercise), Pay Equity & Pay Gap Reporting (pay-specific analysis and reporting), and general recruitment services (filling specific vacancies), though DEI considerations can connect to all of these.",
    additionalFaqs: [
      { id: "vs-pay-equity", question: "Is this the same as a pay equity or pay gap review?", answer: "No. Pay Equity & Pay Gap Reporting analyses pay patterns specifically. DEI Consulting covers the wider organisational strategy, policy and practice; the two are often connected but are separate services." },
      { id: "bias-elimination", question: "Can DEI initiatives eliminate bias completely?", answer: "No. Practical initiatives can reduce identified risks and improve practice over time, but no process, policy or training can be said to eliminate bias or discrimination entirely." },
      { id: "data", question: "Does this involve analysing our workforce demographic data?", answer: "It can, where relevant and agreed: data sources, access, purpose and reporting approach are agreed as part of the engagement. No workforce demographics, pay gaps or protected-characteristic findings are assumed or invented in advance." },
      { id: "employment-decisions", question: "Does Apex HR make hiring or promotion decisions as part of this work?", answer: "No. Apex HR supports strategy, policy and practice. Hiring, promotion, retention and other employment decisions remain with your organisation." },
    ],
    legalReviewRequired: true,
  },

  // ---- HR Technology & People Analytics ----
  {
    slug: "hris-implementation",
    categorySlug: "hr-technology-and-people-analytics",
    metaDescription: "Apex HR is an HRIS implementation firm helping UK employers roll out a new HR information system smoothly, with processes reviewed, not just replicated.",
    primaryKeyword: "HRIS implementation",
    heroSummary: "Practical support implementing a new HRIS, so the rollout actually improves how HR data and processes work.",
    employerChallenge:
      "Human Resources Information System (HRIS) implementations often run over budget and under-deliver when the underlying HR processes weren't reviewed before the system was configured around them.",
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
      { id: "vendor", question: "Does Apex HR sell HR software?", answer: "No. Apex HR is not a software vendor or reseller. Implementation support focuses on your processes, requirements and data, not on selling any particular system." },
    ],
    outOfScope: [
      "Error-free data migration: data quality is reviewed and planned for, but migration risk cannot be guaranteed away entirely.",
      "Guaranteed system compatibility, uninterrupted operation, or guaranteed data accuracy after migration.",
      "Security or privacy compliance certification: this should be confirmed with the software vendor and, where needed, a qualified data-protection or information-security professional.",
      "Guaranteed user adoption, fixed delivery dates, or guaranteed financial savings from the implementation.",
      "Acting as the software vendor, hosting provider, cybersecurity assessor or data controller for the system: these roles sit with the vendor and your organisation as data controller.",
    ],
    differentiationNote:
      "HRIS Implementation supports planning and delivering the implementation of a specific HR system once selected. It is distinct from HR Software Selection, which supports choosing which system to implement, and from Digital HR Transformation, which is a wider organisational change effort that can extend well beyond any single system implementation.",
    additionalFaqs: [
      { id: "vs-selection", question: "Is this the same as choosing which HR software to buy?", answer: "No. HR Software Selection supports choosing which system to implement. HRIS Implementation supports planning and delivering the implementation once a system has been selected." },
      { id: "vs-transformation", question: "How does this differ from digital HR transformation?", answer: "Digital HR Transformation is a wider organisational change effort spanning processes, data and ways of working, which can involve more than one system. HRIS Implementation focuses specifically on implementing a particular HR information system." },
      { id: "data-controller", question: "Does Apex HR act as the data controller for our HR system?", answer: "No. Data controller responsibilities remain with your organisation. Apex HR supports the implementation project, not the ongoing hosting, security or data-controller role for the system." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "hr-software-selection",
    categorySlug: "hr-technology-and-people-analytics",
    metaDescription: "Apex HR is an HR software selection firm helping UK employers define requirements and choose a system that genuinely fits their needs.",
    primaryKeyword: "HR software selection",
    heroSummary: "Requirements-led support choosing HR software, based on your actual needs rather than a vendor's sales pitch.",
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
    whoWeSupport: "Employers choosing new HR software who want requirements-led support, not a vendor sales pitch.",
    deliveryApproach: [
      "Gather requirements from HR and key stakeholders",
      "Review the market and shortlist suitable systems",
      "Support demos, evaluation and decision-making",
      "Hand over to implementation planning",
    ],
    engagementOptions: ["Requirements and shortlist support", "Full selection process support"],
    whyApex:
      "Apex HR is not a software vendor or reseller and does not receive vendor commission, so recommendations are based on fit for your requirements.",
    relatedServiceSlugs: ["hris-implementation", "people-analytics-and-hr-dashboards", "digital-hr-transformation"],
    relatedSectorSlugs: ["professional-services", "technology", "financial-services"],
    faqs: [
      { id: "independent", question: "Is Apex HR affiliated with any software vendor?", answer: "No. Apex HR is not affiliated with, and does not receive commission from, any software vendor. Recommendations are based on your requirements, not a vendor relationship." },
    ],
    outOfScope: [
      "A guarantee of best fit, price, compatibility, security or compliance for any recommended system.",
      "A guarantee of implementation success or return on investment: this service covers selection, not implementation delivery, which is a separate activity (see HRIS Implementation).",
      "The purchasing decision itself: requirements and evaluation support inform the decision, but the client makes the final purchasing decision.",
      "Vendor partnerships, private vendor data, or product certifications: Apex HR is not a reseller and does not claim exclusive or private vendor relationships.",
    ],
    differentiationNote:
      "HR Software Selection helps define requirements and assess suitable systems, distinct from HRIS Implementation, which delivers the implementation once a system is chosen. The client makes the final purchasing decision; this service informs that decision rather than making it.",
    additionalFaqs: [
      { id: "decision-owner", question: "Who makes the final decision on which software to buy?", answer: "You do. This service supports requirements gathering, market review and evaluation, but the purchasing decision remains with your organisation." },
      { id: "vs-implementation", question: "Does this include implementing the chosen system?", answer: "No. Implementation is a separate activity. See HRIS Implementation for support once a system has been selected." },
      { id: "roi", question: "Can you guarantee the system will deliver a return on investment?", answer: "No. A well-matched system supported by good requirements work improves the odds of a good outcome, but return on investment depends on many factors beyond selection, including implementation and adoption." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "people-analytics-and-hr-dashboards",
    categorySlug: "hr-technology-and-people-analytics",
    metaDescription: "Apex HR is a people analytics firm helping UK employers turn existing HR data into clearer, genuinely useful workforce dashboards and insight.",
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
    outOfScope: [
      "Predictive certainty: analytics can highlight patterns and inform decisions, not predict outcomes with certainty.",
      "Causation drawn from dashboard correlations: a correlation shown on a dashboard does not by itself prove one factor causes another.",
      "Complete or error-free data: analysis and dashboards are only as reliable as the underlying data provided.",
      "Automatic anonymity or guaranteed confidentiality of underlying employee data: data handling, access and reporting thresholds are agreed as part of the engagement.",
      "A claim that dashboards or metrics are objective or bias-free: metric design and interpretation involve judgement.",
      "Identification of individual employee intentions, such as an intention to resign.",
      "Automated final employment decisions based on dashboard data: decisions remain with your organisation's management, informed by, not determined by, the data.",
      "A proprietary algorithm or benchmark dataset: metrics and dashboards are built around your own data and agreed definitions.",
    ],
    differentiationNote:
      "People Analytics & HR Dashboards defines workforce measures and presents HR reporting to inform decisions on an ongoing basis. It differs from reporting delivered as part of a specific, one-off analysis in other services, such as Pay Equity & Pay Gap Reporting's pay-specific analysis, by focusing on broader, ongoing workforce metrics and dashboards.",
    additionalFaqs: [
      { id: "predictive", question: "Can dashboards predict who will leave the organisation?", answer: "No. Analytics can highlight patterns that may be worth investigating, such as trends associated with turnover, but cannot identify individual employee intentions or predict outcomes with certainty." },
      { id: "data-quality", question: "How reliable are the dashboards?", answer: "Reliability depends on the quality, completeness and context of the underlying data. Data limitations are made clear as part of the engagement rather than presented as complete or error-free." },
      { id: "decisions", question: "Do dashboards make employment decisions for us?", answer: "No. Dashboards and analytics inform decisions. Final employment decisions remain with your organisation's management, applying judgement alongside the data." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "digital-hr-transformation",
    categorySlug: "hr-technology-and-people-analytics",
    metaDescription: "Apex HR is a digital HR transformation firm helping UK employers modernise HR processes, systems and ways of working sustainably.",
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
      { id: "scope", question: "Does transformation always mean a new system?", answer: "Not necessarily. Transformation can include process redesign and better use of existing systems, not only new technology." },
    ],
    outOfScope: [
      "Guaranteed adoption, productivity gains or financial savings from a transformation programme.",
      "A guaranteed completion date or disruption-free delivery.",
      "A guarantee that transformation succeeds: success depends on factors including leadership commitment and change adoption, not the roadmap alone.",
      "Purchasing or installing a single system as a complete transformation: this is broader organisational change spanning processes, data, technology and ways of working.",
    ],
    differentiationNote:
      "Digital HR Transformation is a wider organisational change effort spanning HR processes, data, technology and ways of working, broader than implementing one system (HRIS Implementation) or selecting software (HR Software Selection), and distinct from general Change Management, which supports the people side of change more generally rather than HR-technology-led transformation specifically.",
    additionalFaqs: [
      { id: "vs-single-system", question: "Is this the same as implementing a new HR system?", answer: "Not necessarily. Implementing a single system is covered by HRIS Implementation. Digital HR Transformation is broader, often spanning multiple processes, data sources and systems." },
      { id: "vs-change-management", question: "How does this differ from change management?", answer: "Change Management supports the people side of change generally. Digital HR Transformation is specifically about modernising HR technology, data and processes, and can draw on change management support as part of delivery." },
      { id: "timescale", question: "Can you guarantee when the transformation will be complete?", answer: "No. Timescales depend on scope, resourcing and how the organisation adopts change. A realistic roadmap is built together, but a fixed completion date cannot be guaranteed in advance." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "ai-workplace-policy-and-hr-integration",
    categorySlug: "hr-technology-and-people-analytics",
    metaDescription: "Apex HR is an AI workplace policy firm helping UK employers set clear, considered guidelines for how artificial intelligence tools are used at work.",
    primaryKeyword: "AI workplace policy",
    heroSummary: "Practical support setting clear, considered workplace policy for how artificial intelligence (AI) tools are used across your organisation.",
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
      "This is HR policy and process guidance, not legal or data-protection advice. Specific legal questions should be confirmed with a qualified adviser.",
    relatedServiceSlugs: ["employee-handbooks-and-hr-policies", "digital-hr-transformation", "hr-compliance-audit"],
    relatedSectorSlugs: ["technology", "professional-services", "financial-services"],
    faqs: [
      { id: "data-protection", question: "Does this cover data protection compliance for AI tools?", answer: "General HR policy guidance is provided; specific data-protection compliance questions should be confirmed with a qualified data-protection or legal adviser." },
    ],
    outOfScope: [
      "A claim of legal or regulatory compliance, cybersecurity assurance, or formal data-protection compliance certification.",
      "Formal auditing or certification of AI systems or tools.",
      "A claim that AI is accurate, safe, explainable or unbiased: this depends on the specific tool and its use, not something Apex HR certifies.",
      "A claim that a policy alone eliminates misuse, discrimination or other risk from AI tools.",
      "Automated employment decisions made by Apex HR, or a claim that automated decisions are compliant without human oversight: meaningful human responsibility is expected to remain in employment decisions.",
      "Certainty about future AI regulation: the regulatory landscape is still developing and specific requirements should be confirmed against current authoritative guidance.",
      "Software development, technical AI implementation or system security work: this is workplace HR policy and process guidance, not technical AI build or security assessment.",
    ],
    differentiationNote:
      "AI Workplace Policy & HR Integration covers workplace policy, governance and HR-process considerations for how AI tools are used by people at work. It is distinct from software development, technical AI implementation and system security work, which are specialist technical disciplines, not part of this HR policy service.",
    additionalFaqs: [
      { id: "compliance", question: "Does this guarantee our AI use is legally compliant?", answer: "No. This is HR policy and process guidance. Specific legal, regulatory, cybersecurity or data-protection compliance questions should be confirmed with qualified specialist advisers, particularly as AI regulation continues to develop." },
      { id: "human-oversight", question: "Does Apex HR make employment decisions using AI on our behalf?", answer: "No. Apex HR does not make employment decisions using AI, automated or otherwise. Meaningful human responsibility is expected to remain in employment decisions, and policy guidance reflects that." },
      { id: "vs-technical", question: "Does this include building or securing AI systems?", answer: "No. This covers workplace HR policy and governance. Software development, technical AI implementation and system security are separate, specialist technical disciplines." },
    ],
    legalReviewRequired: true,
  },

  // ---- Strategic HR & Workforce Advisory ----
  {
    slug: "people-strategy",
    categorySlug: "strategic-hr-and-workforce-advisory",
    metaDescription: "Apex HR is a people strategy firm helping UK employers connect HR priorities directly to what the business is trying to achieve.",
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
      { id: "size", question: "Is this only relevant for larger organisations?", answer: "No. Even a small leadership team benefits from a clear, deliberate people strategy connected to business goals." },
    ],
    outOfScope: [
      "Guaranteed growth, engagement, retention, productivity, workforce performance or financial results.",
      "Corporate or commercial strategy decisions: this is people strategy aligned to business goals, not a substitute for your organisation's overall corporate strategy, which remains a leadership responsibility.",
      "Final decisions on organisational direction: leadership retains responsibility for organisational decisions; this service informs and supports, not replaces, that responsibility.",
    ],
    differentiationNote:
      "People Strategy connects HR priorities to organisational needs at a strategic level. It is distinct from Strategic Workforce Planning, which focuses specifically on future headcount, capability and skills modelling; from Organisation Design, which focuses on structure; from Fractional HR Director/Chief People Officer support, which provides ongoing senior HR leadership capacity; and from ongoing outsourced HR, which delivers day-to-day HR operational support.",
    additionalFaqs: [
      { id: "vs-workforce-planning", question: "How does this differ from strategic workforce planning?", answer: "Strategic Workforce Planning focuses specifically on future headcount, capability and skills needs. People Strategy is broader, connecting overall HR priorities to what the business is trying to achieve." },
      { id: "vs-fractional", question: "How does this differ from a fractional HR director?", answer: "A Fractional HR Director/Chief People Officer provides ongoing, part-time senior HR leadership capacity. People Strategy is a defined piece of strategic work; the two are often used together, but are separate services." },
      { id: "corporate-strategy", question: "Does this set our overall corporate strategy?", answer: "No. This connects HR and people priorities to your existing business goals. Overall corporate strategy remains a leadership responsibility." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "strategic-workforce-planning",
    categorySlug: "strategic-hr-and-workforce-advisory",
    metaDescription: "Apex HR is a strategic workforce planning firm helping UK employers understand future headcount and capability needs before they arise.",
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
      { id: "accuracy", question: "How accurate can workforce planning really be?", answer: "Workforce plans are a planning tool based on reasonable assumptions, reviewed and adjusted as circumstances change, not a guarantee of exact future headcount." },
    ],
    outOfScope: [
      "Guaranteed headcount forecasts: scenarios and forecasts are planning tools based on reasonable assumptions, not certain predictions.",
      "Guaranteed hiring success or guaranteed cost savings.",
      "Guaranteed workforce performance.",
      "Bias-free modelling: modelling reflects the data and assumptions used, which involve judgement and should be reviewed critically, not treated as neutral by default.",
      "Automated decisions about individual employees based on workforce modelling: modelling informs organisation-level planning, not individual employment decisions.",
    ],
    differentiationNote:
      "Strategic Workforce Planning considers future workforce demand, supply, capability and skills at an organisation-wide level. It is distinct from People Strategy, which is broader HR strategic alignment; from Organisation Design, which focuses on structure rather than future headcount; from Succession Planning & Talent Mapping, which focuses on specific critical roles and internal successors; and from recruitment services, which fill identified vacancies rather than plan future workforce needs.",
    additionalFaqs: [
      { id: "certainty", question: "Are workforce planning scenarios guaranteed predictions?", answer: "No. Scenarios and forecasts are planning tools based on reasonable assumptions at the time, reviewed and adjusted as circumstances change. They are not certain predictions of the future." },
      { id: "vs-succession", question: "How does this differ from succession planning?", answer: "Succession Planning & Talent Mapping focuses on specific critical roles and the internal people who could step into them. Strategic Workforce Planning looks more broadly at future workforce numbers, capability and skills across the organisation." },
      { id: "vs-people-strategy", question: "How does this differ from people strategy?", answer: "People Strategy is broader, connecting overall HR priorities to business goals. Strategic Workforce Planning focuses specifically on future workforce demand, supply, capability and skills modelling." },
    ],
    legalReviewRequired: false,
  },
  {
    slug: "global-mobility-and-expatriate-hr-management",
    categorySlug: "strategic-hr-and-workforce-advisory",
    metaDescription: "Apex HR is a global mobility HR firm helping UK employers coordinate international assignments, working alongside immigration, tax and legal advisers.",
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
      "This is HR process and coordination support: immigration, tax and local employment law advice must come from qualified specialists in each relevant jurisdiction.",
    relatedServiceSlugs: ["skilled-worker-sponsorship-hr-support", "strategic-workforce-planning", "people-strategy"],
    relatedSectorSlugs: ["financial-services", "technology", "life-sciences"],
    faqs: [
      { id: "tax-legal", question: "Does Apex HR handle tax and immigration for the assignment?", answer: "No. Apex HR coordinates the HR process. Tax, immigration and local employment law must be handled by qualified specialists in the relevant jurisdiction." },
    ],
    outOfScope: [
      "Visa or sponsorship eligibility decisions: these are made by the relevant immigration authority, not Apex HR.",
      "Guaranteed visas, permissions or immigration outcomes.",
      "Cross-border legal or tax compliance guaranteed by Apex HR: this requires qualified legal, tax and immigration advisers in each relevant jurisdiction.",
      "Complete knowledge of every jurisdiction's immigration, tax or employment-law requirements: specialist local advisers are required for each relevant country.",
      "Regulated immigration-adviser status or government authority: Apex HR is not a government body or a regulated immigration adviser.",
      "Fixed processing times for visas, permits or relocations.",
      "Guaranteed assignment or relocation outcomes.",
    ],
    differentiationNote:
      "Global Mobility & Expatriate HR Management coordinates the HR side of employees working across borders (assignment planning, process and employee experience), working alongside, and clearly distinct from, specialist immigration advice, legal advice, tax advice, payroll advice and relocation services, each of which must come from qualified specialists in the relevant jurisdiction.",
    additionalFaqs: [
      { id: "immigration-decision", question: "Does Apex HR decide visa or sponsorship eligibility?", answer: "No. Visa and sponsorship eligibility decisions are made by the relevant immigration authority. Apex HR coordinates the HR side of an assignment, working alongside your qualified immigration adviser." },
      { id: "jurisdictions", question: "Does Apex HR know the requirements for every country?", answer: "No. Immigration, tax and employment-law requirements vary by jurisdiction and change over time. Specialist local advisers are required for each relevant country; Apex HR coordinates the HR process around their input." },
      { id: "processing-times", question: "Can you guarantee how long a visa or relocation will take?", answer: "No. Processing times depend on the relevant immigration authority, jurisdiction and individual circumstances, and cannot be guaranteed in advance." },
    ],
    legalReviewRequired: true,
  },
];
