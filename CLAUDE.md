# CLAUDE.md — Apex HR Website

> Repository-level operating instructions for Claude Code and other coding agents working on the Apex HR website.

## 1. Document status

- Project: Apex HR Website
- Production domain: `https://www.apexhrllc.co.uk`
- Document status: Working implementation brief
- Last consolidated: 2 September 2026
- Primary market direction: United Kingdom, with verified international capability where supported by evidence
- Primary commercial audience: Employers
- Secondary audience: Candidates and talent
- Implementation model: Custom application; this project is not a WordPress or Elementor export

This file governs implementation behaviour. It does not override an explicitly approved sitemap, signed-off design specification, verified business content, or later written stakeholder decision.

---

## 2. Read this first

Before making material changes:

1. Read this file completely.
2. Read `DESIGN.md` and follow its brand, visual-token, responsive, component, accessibility and motion rules.
3. Read `docs/CONTENT-MODEL.md` before creating or changing CMS schemas, operational tables, relationships, route-bearing content or publishing workflows.
4. Inspect the current repository, `package.json`, route structure, content schemas, migrations, tests, and Git status.
5. Locate the current master sitemap and URL decision register in `docs/` when present.
6. Preserve existing user work and unrelated changes.
7. State assumptions when a required business decision is unresolved.
8. Do not invent routes, statistics, people, offices, jobs, credentials, reviews, clients, accreditations, prices, salaries, results, or integration details. Original first-draft page copy for Confirmed/Corrected routes is authorised under section 31 — factual claims still require evidence.

Do not begin a broad build from a vague request. Translate the request into the smallest safe vertical slice, implement it, validate it, and report what changed.

---

## 3. Source-of-truth hierarchy

When project sources disagree, use this order:

1. Explicit stakeholder approval or later written user instruction.
2. `docs/MASTER-SITEMAP.md`, `docs/Apex_HR_Master_Sitemap_and_URL_Register.xlsx` and `docs/URL-DECISION-REGISTER.md`, which consolidate the approved route matrix and later URL decisions.
3. `Apex_HR_Brand_Style_Guide.pptx` for the approved logo, core colour palette, typography, brand character and tone of voice.
4. `DESIGN.md` for responsive web application of the approved identity, including accessible colour use, tokens, layouts, components and motion.
5. `APEX HR - WEBSITE PAGE STRUCTURE AND SEO REQUIREMENTS.docx` for employer-first hierarchy, conversion, service-page SEO and schema direction.
6. `APEX HR — WEBSITE FUNCTIONAL REQUIREMENTS DOCUMENT.docx` for functional scope, user journeys, integrations, security and non-functional requirements.
7. `HR Strategy Document.xlsx` for the service catalogue, locations, sectors, topic clusters, talent-acquisition roles and marketing activities.
8. `02 1112 WAT - Notes by Gemini.docx` for stakeholder intent, preferred interactions and meeting context.
9. `docs/CONTENT-MODEL.md` for the approved CMS schema, data ownership, relationships, publishing gates and operational model derived from the sources above.
10. This file's working technical recommendations.

Rules for conflicts:

- Never silently replace an approved URL because another document contains a cleaner alternative.
- Never implement two competing canonical URLs for the same page.
- Add unresolved conflicts to `docs/URL-DECISION-REGISTER.md`.
- If a conflict affects a public URL, taxonomy, business claim, data protection decision, integration vendor or project scope, stop and request a decision.
- Minor reversible implementation details may be decided using established project conventions.

---

## 4. Product definition

Apex HR is not a simple brochure website. Build it as:

> An employer-first HR, recruitment and people-consulting platform, supported by a candidate-acquisition system and a scalable SEO/content engine.

The platform has four connected areas:

1. Employer acquisition: services, sectors, locations, experts, case studies, Find Talent, consultation and proposals.
2. Candidate acquisition: jobs, applications, CV uploads and the Apex talent pool.
3. Content and SEO: insights, reports, resources, events, service pages, sector pages, location pages and talent-acquisition-by-role pages.
4. Integrations and measurement: CRM, ATS, email, calendar, attribution, analytics and monitoring.

### Business objectives

- Generate qualified employer leads.
- Grow Apex HR's proprietary candidate and talent database.
- Drive recruitment and consulting revenue.
- Establish credible authority in HR, recruitment, leadership, workforce strategy and HR technology.
- Grow the opted-in newsletter database.
- Attribute leads and applications to their originating content, service, CTA and campaign.
- Deliver a premium experience without sacrificing accessibility, performance or search visibility.

---

## 5. Audience and conversion priority

The public website is employer-first and candidate-visible.

### Primary employer audiences

- CEOs, founders and business owners
- HR and people leaders
- Directors and senior decision-makers
- Hiring managers
- Organisations seeking recruitment, outsourced HR or strategic people support

### Secondary audiences

- Candidates searching for vacancies
- Candidates joining the Apex talent pool
- Professionals uploading a CV
- Readers seeking HR, leadership and workforce insights
- Partners and general visitors

### CTA hierarchy

- Primary global CTA: `Find Talent`
- Secondary employer CTA: `Meet Apex HR`, `Discuss Your Needs`, or a service-specific equivalent
- Candidate CTA: `Search Jobs`
- Supporting candidate CTAs: `Join Talent Pool` and `Upload Your CV`

Do not give employer, candidate and general-content journeys equal visual weight in the homepage hero. Candidate routes must remain easy to find in navigation and must appear as a dedicated gateway after the core employer proposition and proof.

### Working primary navigation

- Services
- Sectors
- Employers
- Candidates / Jobs
- Insights
- About
- Persistent `Find Talent` CTA

Treat this as the working navigation model until the canonical information architecture is signed off. Keep navigation labels understandable; do not expose the entire SEO page inventory in the primary menu.

---

## 6. Working technology stack

Use this stack unless the repository or a later approved decision says otherwise:

### Application

- Next.js App Router
- React
- TypeScript with strict mode
- Node.js runtime supported by the chosen Next.js release
- `npm` as package manager when starting a new repository

### Interface

- Tailwind CSS
- shadcn/ui and Radix primitives where they reduce implementation risk
- Lucide React icons
- Motion for React for ordinary animation
- GSAP only for a justified, isolated scroll-driven experience that Motion cannot handle cleanly

### Content and data

- Sanity for public editorial content
- Supabase PostgreSQL for operational records
- Supabase Storage for private CVs and application files
- Next.js Server Actions and Route Handlers for server-side operations
- React Hook Form and Zod for complex forms and shared validation

### Services

- Vercel for hosting and preview deployments
- GitHub for source control
- Resend for transactional email unless the approved email provider changes
- Cloudflare Turnstile for spam and bot protection
- Sentry for error monitoring
- Google Tag Manager, Google Analytics 4 and Google Search Console for measurement

### Testing

- Vitest for unit tests
- React Testing Library for component behaviour
- Playwright for critical user journeys
- axe-based accessibility checks
- Lighthouse or equivalent performance checks

### Version policy

- Inspect `package.json` before writing version-specific code.
- Use mutually compatible stable releases and commit the lockfile.
- Do not upgrade framework, CMS, database client or animation dependencies as part of an unrelated task.
- Avoid adding a dependency when the platform or existing stack already provides the capability.

---

## 7. System boundaries

### Sanity owns public editorial content

Sanity may manage:

- Site settings and navigation
- Homepage sections
- Service categories and services
- Sectors
- Locations
- Service-location page content
- Talent-acquisition roles
- Experts and team profiles
- Topic clusters (Insights *category* hubs only — see WordPress below for articles)
- Case studies
- Testimonials
- FAQs
- Reports, resources, events and webinars
- Jobs only when no ATS is currently the vacancy source of truth
- SEO fields and social-sharing assets

### WordPress owns Insights/blog article content

Per `docs/URL-DECISION-REGISTER.md` D-016, WordPress (`blog.apexhrllc.co.uk`, consumed headlessly via `src/lib/wordpress/`) is the source of truth for individual Insights/blog articles only — not for any other content type this section assigns to Sanity. The archive stays at `/insights/`; articles are served at the root-level `/[slug]/`. `blog.apexhrllc.co.uk` is the CMS/API origin only and must never be a public canonical, sitemap entry or visitor-facing link; `www.apexhrllc.co.uk` (or the current `NEXT_PUBLIC_SITE_URL`) is the only public canonical host.

### Supabase owns operational and personal data

Supabase may manage:

- Find Talent submissions
- Employer contact information
- Candidate records
- Talent-pool registrations
- Job applications
- Consent records and consent versions
- Application status where no ATS owns it
- Attribution data
- Private file metadata and storage references
- Integration delivery/status logs that do not expose secrets or unnecessary personal information

### ATS owns recruitment workflow when selected

When an ATS is approved, it should become the source of truth for live vacancies and application workflow. Create an adapter between the website and ATS; do not scatter vendor-specific code throughout pages and components.

### CRM owns qualified employer relationship records when selected

Find Talent and consultation requests must be persisted safely, then synchronised through a CRM adapter. Do not block the website build on a vendor that has not been confirmed.

### Never mix these boundaries

- Do not store CV files in Sanity.
- Do not put private applicant files in `public/`.
- Do not expose a Supabase service-role key in browser code.
- Do not use analytics as a source of truth for leads or consent.
- Do not make the website database the permanent ATS if an approved ATS is available.
- Do not use `blog.apexhrllc.co.uk` as a public canonical URL, sitemap entry or visitor-facing link — see D-016.
- Do not model Insights/blog articles in Sanity while WordPress is the confirmed source of truth for them (D-016); do not remove or repurpose the unrelated Sanity integration on the strength of this decision alone.

---

## 8. Recommended repository structure

Adapt this to the existing repository rather than reorganising working code without cause:

```text
.
├── CLAUDE.md
├── DESIGN.md
├── brand-assets/                 # Approved source assets; do not mutate casually
├── docs/
│   ├── architecture.md
│   ├── CONTENT-MODEL.md
│   ├── URL-DECISION-REGISTER.md
│   ├── MASTER-SITEMAP.md
│   ├── Apex_HR_Master_Sitemap_and_URL_Register.xlsx
│   ├── measurement-plan.md
│   └── privacy-data-flow.md
├── public/
│   ├── brand/                    # Optimised production copies
│   ├── icons/
│   └── images/
├── sanity/
│   ├── schemaTypes/
│   └── structure/
├── supabase/
│   └── migrations/
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   ├── api/
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── sections/
│   │   ├── forms/
│   │   ├── motion/
│   │   └── seo/
│   ├── features/
│   │   ├── find-talent/
│   │   ├── jobs/
│   │   ├── applications/
│   │   ├── talent-pool/
│   │   └── newsletter/
│   ├── integrations/
│   │   ├── ats/
│   │   ├── crm/
│   │   ├── email/
│   │   └── calendar/
│   ├── lib/
│   │   ├── analytics/
│   │   ├── env/
│   │   ├── seo/
│   │   ├── security/
│   │   ├── sanity/
│   │   ├── supabase/
│   │   └── validation/
│   └── types/
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/
```

Route groups are organisational only. They must not change approved public URLs.

---

## 9. URL governance

The approved master sitemap/URL matrix controls production URLs. Treat URLs as business data, not as names to regenerate freely from labels.

### Mandatory URL rules

- Maintain a typed route registry or CMS route field derived from the approved matrix.
- Use lowercase URLs and the trailing-slash convention already present in the master matrix.
- Configure canonical URLs consistently.
- Use the corrected canonical spellings approved in the URL Decision Register. Redirect a known published or referenced erroneous URL directly to the corrected canonical URL.
- Do not expose internal route-group names.
- Do not create duplicate indexable URLs for the same intent.
- Redirect approved aliases permanently to the selected canonical URL.
- Generate navigation, breadcrumbs, canonicals and sitemaps from the same canonical route data where practical.
- `notFound()` must be used for unpublished, invalid or disallowed dynamic combinations.

### Known route families

```text
/
/about/
/contact/
/services/
/for-employers/
/for-candidates/
/jobs/
/jobs/[approved-job-slug]/
/talent-pool/
/sector/
/sector/[approved-sector-slug]/
/locations/[approved-location-slug]/
/talent-acquisition/[approved-role-slug]/
/insights/
/case-study/
/resources/
/find-talent/
```

Routes explicitly marked Provisional remain gated even when their URL pattern is recorded. Do not include them in the production XML sitemap or index until their stated gate is satisfied.

### Canonical sector URLs

`/sector/` is canonical. `/industries/` and known children are redirect-only aliases.

| Sector label | Canonical URL | Status |
|---|---|---|
| Startups & Scale-ups | `/sector/startups-scale-ups/` | Confirmed |
| Professional Services | `/sector/professional-services/` | Corrected; distinct from IT |
| Healthcare | `/sector/health-care/` | Confirmed |
| Life Sciences | `/sector/life-sciences/` | Confirmed |
| IT | `/sector/technology/` | Confirmed; Technology URL represents IT only |
| Financial Services | `/sector/financial-services/` | Confirmed |
| Accountants | `/sector/accountants/` | Confirmed |
| Architects | `/sector/architects/` | Confirmed |
| Care Homes | `/sector/care-homes/` | Confirmed |
| Charity | `/sector/charity/` | Confirmed |
| Construction | `/sector/construction/` | Corrected |
| Distribution | `/sector/distribution/` | Corrected |
| Education | `/sector/education/` | Confirmed |
| Engineers | `/sector/engineers/` | Confirmed |
| Leisure | `/sector/leisure/` | Confirmed |
| Manufacturers | `/sector/manufacturers/` | Confirmed |
| Hospitality | `/sector/hospitality/` | Confirmed |

Do not publish `/industries/.../` pages. Implement the approved `301` rules from the Redirects sheet of the master register.

### Location catalogue

Canonical location routes:

- `/locations/london/`
- `/locations/manchester/`
- `/locations/birmingham/`
- `/locations/leeds/`
- `/locations/bristol/`
- `/locations/edinburgh/`
- `/locations/glasgow/`
- `/locations/nottingham/`
- `/locations/newcastle/`
- `/locations/warwickshire/`
- `/locations/worcester/`
- `/locations/yorkshire/`
- `/locations/staffordshire/`
- `/locations/liverpool/`
- `/locations/oxford/`
- `/locations/leicester/`

The canonical spellings are Nottingham, Worcester and Staffordshire. Redirect the exact known legacy misspellings `nothingham`, `worchester` and `standfordshire` when those URLs may be requested.

### Service-location pages

The master matrix contains flat public URLs such as:

```text
/services/retained-hr-services-london/
/services/executive-search-manchester/
```

Preserve the public URL format from the approved matrix even if the internal implementation uses a dynamic resolver. Do not replace these with `/services/[service]/[location]/` without explicit approval and a migration plan.

Technical capability does not grant permission to publish every service-location combination. A combination may be indexable only when it has:

- Approved demand or keyword intent
- Unique and useful location context
- Verified service availability
- Unique metadata and headings
- Meaningful internal links
- No fabricated office or local-presence claim
- Editorial approval or an approved bulk-publishing rule

Reuse central service facts through structured data relationships, but do not publish near-duplicate doorway pages that merely swap a city name.

### Talent-acquisition-by-role pages

The workbook defines 62 role pages beneath `/talent-acquisition/`. Exact labels and URLs in the approved matrix are authoritative. Implement these as structured content records, not individually hard-coded components.

---

## 10. Service catalogue

The `Services` sheet defines the canonical catalogue: 10 parent families and 48 child services. Canonical services use flat `/services/[service-slug]/` URLs from `docs/MASTER-SITEMAP.md` and the master workbook.

### Outsourced HR Services

- Retained HR Services
- HR Support for Small Businesses & Startups
- Fractional HR Director / Chief People Officer
- HR Compliance Audit
- Employee Handbooks & HR Policies
- Payroll Advisory

### Recruitment & Talent Acquisition

- Permanent Recruitment
- Executive Search
- Contract Staffing
- Recruitment Process Outsourcing (RPO)
- Graduate Schemes & Early Careers Design

### Employment Law & Employee Relations

- Redundancy & Restructuring Support
- TUPE Advisory
- Workplace Investigations
- Workplace Mediation & Conflict Resolution
- Employment Tribunal HR Support
- Outplacement & Career Transition Services
- Industrial Relations & Trade Union Negotiations
- Skilled Worker Sponsorship HR Support

### Organisation Development & Change Management

- Organisation Design
- Change Management
- Culture Transformation
- M&A People Due Diligence & Post-Merger Integration

### Compensation, Reward & Benefits

- Salary Benchmarking
- Job Evaluation & Pay Structures
- Reward Strategy
- Pay Equity & Pay Gap Reporting
- Employee Benefits Consulting
- Executive Compensation & Share Schemes

### Learning & Leadership Development

- Leadership & Management Training
- Executive Coaching & 360 Feedback
- Learning Strategy & Capability Development

### Performance & Talent Management

- Performance Management
- Succession Planning & Talent Mapping
- Competency Frameworks

### Employee Experience & Engagement

- Employee Experience Strategy
- Employee Engagement Surveys & Action Planning
- Employer Branding & Employee Value Proposition (EVP)
- Workplace Wellbeing & Mental Health
- Diversity, Equity & Inclusion (DEI) Consulting

### HR Technology & People Analytics

- HRIS Implementation
- HR Software Selection
- People Analytics & HR Dashboards
- Digital HR Transformation
- AI Workplace Policy & HR Integration

### Strategic HR & Workforce Advisory

- People Strategy
- Strategic Workforce Planning
- Global Mobility & Expatriate HR Management

The workbook's Website Sitemap is a reconciliation input, not a second canonical taxonomy. Redirect matched nested service URLs to their flat canonical destinations. Keep unmatched additional offers Provisional; keep Salesforce Future. Do not publish either category until its commercial offer and principal intent are approved.

---

## 11. Homepage specification

The homepage must be employer-first. Header and footer surround this ordered content flow:

1. Employer-focused hero
2. Trust and credibility
3. Employer need selector
4. Employer problems
5. HR services
6. Recruitment spotlight
7. Why Apex HR
8. Who Apex supports / sectors
9. How Apex works
10. Case studies and results
11. Apex experts
12. Candidate gateway
13. Insights
14. Employer FAQs
15. Final employer CTA

### Homepage hero

- Working primary keyword direction: `HR Company in the UK`.
- Present a concise UK HR and people-partner proposition.
- Primary CTA: `Find Talent`.
- Secondary CTA: `Meet Apex HR`.
- Keep `Search Jobs` visible but visually subordinate.
- Do not claim unverified market leadership, scale, outcomes or geographic presence.

### Trust section

Only show verified:

- Years of experience
- Organisations supported
- Markets served
- Placements
- Accreditations
- Client logos
- Measurable results

If proof is missing, use an honest placeholder in development or omit the item. Never fabricate a metric to complete the layout.

### Employer need selector

Prioritise:

- I need to hire → Find Talent
- I need HR support → Services
- I need strategic people advice → Consultation or Meet Apex HR

Candidate opportunities may appear as a secondary route.

### How Apex works

Use this working narrative unless service-specific evidence requires variation:

1. Understand
2. Diagnose
3. Recommend
4. Implement
5. Measure

---

## 12. Reusable service-page specification

Each core service page must represent one principal search intent and use this adaptable structure:

1. Visible breadcrumb
2. Search-and-conversion hero
3. Employer challenge
4. Business outcomes
5. What the service includes
6. When the service is needed
7. Who Apex supports
8. Service-specific delivery approach
9. Verified engagement options
10. Why Apex for this service
11. Closest case study or verified proof
12. Relevant expert
13. Up to four related services
14. Two to four relevant insights
15. Six to ten useful service-specific FAQs where content exists
16. Service-specific final CTA

Do not force generic corporate copy into every service page. Do not duplicate the same process, FAQs or CTA wording when the service requires different information.

The page should communicate:

```text
Employer problem → Apex response → Business outcome → Evidence → Next action
```

---

## 13. Employer journey and Find Talent

`Find Talent` is a global website feature:

- Keep the CTA in the header.
- Open the same accessible form in a modal, drawer or panel where appropriate.
- Maintain `/find-talent/` as a normal fallback page.
- Do not require account creation before submission.
- Preserve entered information between steps.
- Provide a visible progress indicator and accessible inline errors.

### Four-step form

#### Step 1 — Hiring need

- Role
- Location
- Employment type
- Number of vacancies

#### Step 2 — Requirements

- Seniority
- Salary range where appropriate
- Required skills
- Hiring timeline
- Job-description upload

#### Step 3 — Employer details

- Company
- Contact name
- Work email
- Phone
- Company size

#### Step 4 — Context and consent

- Additional information
- Privacy information
- Consent
- Submission

### Submission behaviour

- Validate on client and server, with the server as authority.
- Validate upload extension, MIME type, signature and file size.
- Apply spam protection and rate limiting.
- Persist the submission before attempting optional integrations.
- Create or update the CRM/ATS record through an adapter.
- Notify Apex HR without exposing unnecessary sensitive content in email.
- Send an accessible confirmation to the employer.
- Show a useful confirmation state even if an optional notification fails.
- Record integration failures for secure retry.

### Attribution fields

Capture where available:

- Originating page
- Associated service or sector
- CTA identifier and placement
- UTM source, medium, campaign, term and content
- Referrer
- Landing page
- Consent timestamp and consent version

Do not place personal or sensitive form values into analytics events.

---

## 14. Candidate, jobs and talent-pool journeys

### Candidate gateway

Provide clear routes to:

- Search Jobs
- Upload Your CV
- Join Talent Pool
- Candidate resources

### Jobs archive

Support approved filters such as:

- Keyword
- Location
- Industry or sector
- Function
- Seniority
- Employment type
- Working arrangement

Filters must be keyboard-accessible, reflected in useful URL/search state where appropriate, and must not generate unlimited indexable combinations.

### Job page

- Show accurate role data, location, working arrangement, employment type and closing date.
- Make expired or closed status clear.
- Remove or update `JobPosting` data when a vacancy closes.
- Provide an accessible application route.
- Do not invent a salary when none is supplied.

### Talent pool

Collect only information needed for recruitment, such as:

- Contact details
- CV
- Skills and experience
- Industries and functions
- Preferred locations
- Employment and work-arrangement preferences
- Availability
- Required privacy acknowledgement and consent

Do not implement candidate accounts in phase one unless explicitly approved.

### Automated CV or AI screening

AI CV parsing, ATS-compliance checks and matching are future features, not phase-one requirements.

- Do not automatically reject or discard a candidate solely because a CV is judged "not ATS compliant."
- Do not make automated decisions based on protected or sensitive characteristics.
- Any future scoring must be explainable, auditable, tested for unfair outcomes and subject to meaningful human review.
- Keep raw CVs and extracted data private and apply documented retention rules.

---

## 15. Content models

`docs/CONTENT-MODEL.md` is the detailed implementation specification for CMS schemas, Supabase records, route validation, publishing gates, relationships and Studio structure. Do not create a conflicting model in code. The summary below establishes the minimum boundaries.

Prefer structured, relational models over large untyped rich-text pages.

### Core Sanity document types

- `siteSettings`
- `navigation`
- `footer`
- `page`
- `serviceCategory`
- `service`
- `sector`
- `location`
- `serviceLocationPage`
- `talentRole`
- `job` when not ATS-managed
- `insight`
- `insightCategory`
- `caseStudy`
- `expert`
- `testimonial`
- `faq`
- `resource`
- `report`
- `event`
- `office`

### Shared fields where relevant

- Internal title
- Public title
- Approved slug or exact route
- Summary
- Structured body content
- Status: draft, review, published, archived
- Featured image with alt text
- Related services
- Related sectors
- Related locations
- Related experts
- Related case studies
- Related insights
- CTA configuration
- SEO title
- Meta description
- Canonical override only when necessary
- Open Graph title, description and image
- Indexing directive
- Publication and updated dates
- Review owner

### Relationship rules

- A service may link to the closest case study, relevant expert, related services and supporting insights.
- An expert may link to services, case studies and authored or reviewed insights.
- A case study must identify the relevant service and use verified results.
- A location page must not imply a physical office unless an approved office record exists.
- Relationship fields should drive modules and internal links; editors should not repeatedly paste the same URLs into rich text.

---

## 16. SEO requirements

SEO is an architectural requirement, not a launch-day plugin task.

### Page-level requirements

Every indexable page must have:

- One clear user intent
- One principal topic or keyword direction
- Unique SEO title
- Unique meta description
- One descriptive H1
- Logical H2/H3 hierarchy
- Canonical URL
- Open Graph metadata
- A meaningful social image where available
- Crawlable body content
- Contextual internal links
- Accurate breadcrumbs when hierarchical
- Image alt text based on purpose, not keyword stuffing

### Technical SEO

- Generate XML sitemaps from approved, published canonical records.
- Exclude drafts, expired jobs, invalid combinations, internal search results and private routes.
- Maintain `robots.txt` deliberately.
- Use permanent redirects for approved migrations.
- Avoid redirect chains and soft 404s.
- Keep essential content present in rendered HTML and available on mobile.
- Do not rely on hover, animation or client-side JavaScript to reveal the only copy that satisfies search intent.
- Paginate or use crawl-safe loading for large archives.
- Prevent faceted job search from creating crawl traps.
- Add `noindex` only for a defined reason; do not use it to hide architecture errors.
- Do not implement hreflang until genuine regional/language equivalents exist.

### Content quality controls

- Use British English for UK-targeted pages unless source content requires otherwise.
- Preserve accurate company terminology.
- Do not keyword-stuff.
- Do not create near-duplicate city pages.
- Do not publish AI-generated business claims without human verification.
- Do not invent legal advice; HR/employment-law content requires suitable review.
- Time-sensitive articles must show accurate publication and update dates.

### Structured data

Use JSON-LD only when it matches visible content:

| Page type | Schema |
|---|---|
| Homepage | `Organization` + `WebSite` |
| Service page | `Service` + `BreadcrumbList` |
| Insight/article | `Article` or `BlogPosting` |
| Expert profile | `ProfilePage` + `Person` |
| Visible eligible FAQ | `FAQPage` where appropriate |
| Individual live vacancy | `JobPosting` |
| Genuine public office page | `LocalBusiness` where appropriate |

Controls:

- Maintain one consistent organisation entity and stable `@id`.
- Do not mark up fabricated ratings, reviews, locations, people, vacancies or services.
- Do not place `JobPosting` on archives or service pages.
- Match canonical URL, visible content and structured data.
- Validate structured data after template changes.

---

## 17. Design and interaction direction

`DESIGN.md` is the detailed visual implementation specification. Do not invent permanent colours, typography, spacing, radius, component variants or motion patterns outside it.

The desired experience is premium, innovative, credible and interactive. It should combine:

- The authority and clarity of a leading consulting firm
- The specialist confidence of executive search and recruitment
- The polish and responsiveness of a modern HR technology company

Reference organisations may inspire interaction principles, information hierarchy and quality expectations, but never copy their protected content, branding or distinctive layouts.

### Reference landscape

- Consulting credibility: Deloitte, Aon, EY and iVentions
- HR-technology interaction: HiBob and Culture Amp
- Recruitment and executive-search confidence: Michael Page, Robert Walters and Heidrick
- Global-employment experience: Deel, Remote, Multiplier, Papaya Global, Oyster and Atlas
- Thought-leadership structure: SHRM

Use these references to understand quality, motion, navigation, credibility and conversion patterns. Do not reproduce their copy, trade dress, page compositions or brand identity.

### Design principles

- Employer confidence before visual novelty
- Strong typography and deliberate whitespace
- Editorial, human and professional tone
- Reusable design tokens and components
- Clear conversion hierarchy
- Meaningful motion that guides attention
- Progressive disclosure rather than dumping all information at once
- High-quality responsive layouts at every breakpoint
- Real content dimensions, not designs that only work with lorem ipsum

### Desired interaction patterns

- Scroll-triggered reveals
- Layered or stacked testimonial cards
- Interactive service and sector cards
- Animated, verified statistics
- Partner/client-logo marquee when logos are approved
- Guided storytelling for the Apex proposition and delivery process
- Persistent but unobtrusive access to high-value CTAs

### Animation rules

- Use server components by default and isolate animated client components.
- Prefer transform and opacity animation.
- Respect `prefers-reduced-motion`.
- Never hijack native scrolling.
- Avoid animation that blocks navigation or content access.
- Avoid autoplay media with sound.
- Test motion on mid-range mobile hardware.
- Lazy-load heavy animation code.
- If motion harms comprehension, accessibility or Core Web Vitals, simplify it.

### Brand assets

- Treat `brand-assets/` as the source for approved logos, imagery, fonts and guidelines.
- Put optimised production copies in `public/brand/` or the approved asset pipeline.
- Do not redraw, recolour, distort or replace the logo without approval.
- Do not use an AI-generated image as an official team member, client or office representation.
- Generated avatars or illustrations may be used only as clearly illustrative artwork, never as misleading evidence of a real person, client, office or event.
- Record licences and provenance for stock or generated assets.
- `DESIGN.md` must define exact colour, type, spacing, radius, shadow and motion tokens; do not invent permanent brand tokens in component files.

---

## 18. Accessibility requirements

Target WCAG 2.2 AA.

- Use semantic HTML before ARIA.
- Maintain a logical heading hierarchy.
- Ensure full keyboard access.
- Provide visible, consistent focus states.
- Make modals/drawers trap focus correctly, label themselves and restore focus when closed.
- Provide labels, descriptions and programmatic error associations for form fields.
- Announce multi-step form errors and success states appropriately.
- Never use colour alone to communicate status.
- Meet contrast requirements.
- Provide meaningful alt text; use empty alt text for decorative images.
- Support zoom, text resizing and reflow.
- Ensure touch targets are comfortably usable.
- Pause or control moving content when required.
- Respect reduced-motion preferences.
- Test with keyboard-only navigation and at least one screen-reader workflow before launch.

Accessibility is part of the definition of done, not a later polish pass.

---

## 19. Performance requirements

Target good Core Web Vitals on representative mobile devices:

- LCP: 2.5 seconds or better at the 75th percentile
- INP: 200 ms or better at the 75th percentile
- CLS: 0.1 or better at the 75th percentile

Implementation rules:

- Use React Server Components by default.
- Add `use client` only at the narrowest interactive boundary.
- Optimise and size images; prevent layout shift.
- Use `next/font` or a similarly controlled font strategy.
- Limit font families, weights and third-party scripts.
- Dynamically import heavy client-only features.
- Avoid shipping entire icon, animation or utility libraries when only a subset is used.
- Cache public CMS content deliberately and revalidate through webhooks where supported.
- Do not cache personal submissions or private records as public content.
- Measure bundles and real pages; do not declare performance based only on local impressions.

---

## 20. Security, privacy and data protection

Applicant and employer data are sensitive business data. Build with UK GDPR and data-minimisation principles in mind.

### Required controls

- Validate and sanitise all untrusted input on the server.
- Use allowlists for file types and enforce upload size limits.
- Store CVs and job descriptions in private buckets.
- Use short-lived signed URLs for authorised file access.
- Enable Row Level Security on exposed Supabase tables.
- Use least-privilege server credentials.
- Keep secrets in environment variables and deployment secret stores.
- Never commit `.env` files, access tokens or service keys.
- Never log CV contents, full form payloads or sensitive applicant details.
- Record consent timestamp, policy version and purpose.
- Define retention and deletion rules before production launch.
- Protect forms with spam controls and rate limits.
- Apply appropriate security headers and a tested Content Security Policy.
- Verify webhook signatures.
- Make integration operations idempotent where retries are possible.
- Back up operational data and test the recovery approach.
- Provide role-based access for internal administrative tools.

Do not send sensitive CV data to an AI provider, analytics tool or unapproved third party.

---

## 21. Analytics and event model

Use a documented data layer rather than scattered analytics calls.

Recommended events include:

- `cta_click`
- `find_talent_start`
- `find_talent_step_view`
- `find_talent_step_complete`
- `find_talent_submit_success`
- `find_talent_submit_error`
- `consultation_start`
- `consultation_submit_success`
- `job_search`
- `job_filter_apply`
- `job_view`
- `application_start`
- `application_submit_success`
- `talent_pool_start`
- `talent_pool_submit_success`
- `newsletter_subscribe_success`
- `resource_download`
- `outbound_link_click`

Each event should have a schema with approved, non-sensitive properties. Include page, CTA identifier, service/sector context and campaign attribution where relevant. Never send names, emails, phone numbers, CV text or free-text form content to analytics.

Consent-aware analytics must not run before the applicable consent state permits it.

---

## 22. Integration architecture

Use ports/adapters so vendors can be changed without rewriting page logic.

Example interfaces:

- `CrmClient.createOrUpdateEmployerLead()`
- `AtsClient.listJobs()`
- `AtsClient.getJob()`
- `AtsClient.submitApplication()`
- `EmailClient.sendEmployerConfirmation()`
- `EmailClient.sendInternalLeadNotification()`
- `CalendarClient.createBookingLink()`

Rules:

- Keep vendor SDK imports inside the relevant integration module.
- Map external payloads to internal typed models.
- Persist submission state before making non-transactional external calls.
- Add timeouts, safe retries and idempotency keys where supported.
- Handle vendor downtime gracefully.
- Do not mock a production integration without making the mock status obvious.
- Do not choose or install an ATS/CRM vendor simply to fill an unresolved requirement.

---

## 23. Environment variables

Validate environment variables at startup. Names may be adapted to repository conventions.

```text
NEXT_PUBLIC_SITE_URL

WORDPRESS_API_URL
WORDPRESS_SITE_URL

NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
SANITY_API_READ_TOKEN
SANITY_REVALIDATE_SECRET

NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY

RESEND_API_KEY
TRANSACTIONAL_EMAIL_FROM
INTERNAL_LEAD_NOTIFICATION_EMAIL

NEXT_PUBLIC_TURNSTILE_SITE_KEY
TURNSTILE_SECRET_KEY

NEXT_PUBLIC_GTM_ID
NEXT_PUBLIC_GA_MEASUREMENT_ID

NEXT_PUBLIC_SENTRY_DSN
SENTRY_AUTH_TOKEN
```

Server-only variables must never be imported into client components or exposed through `NEXT_PUBLIC_` names.

---

## 24. Coding standards

### TypeScript

- Keep strict mode enabled.
- Avoid `any`; use `unknown` and narrow it.
- Define shared domain types at system boundaries.
- Derive types from Zod schemas where practical.
- Model success and failure states explicitly.

### React and Next.js

- Prefer server components.
- Keep client components small and purposeful.
- Avoid unnecessary `useEffect`; derive values or fetch on the server where possible.
- Use loading, error and not-found states intentionally.
- Use route handlers for external HTTP endpoints and webhooks.
- Use server actions for suitable same-application mutations.
- Revalidate the narrowest path or tag required after CMS changes.
- Do not fetch the same content repeatedly across a render tree.

### Components

- Build reusable primitives before repeating visual patterns.
- Keep content/data concerns out of low-level UI components.
- Use variants rather than copied components for controlled visual differences.
- Do not create a universal component with dozens of unrelated boolean props.
- Maintain accessible names and focus behaviour inside shared primitives.

### Styling

- Use design tokens from `DESIGN.md` and the Tailwind theme.
- Avoid unexplained magic values.
- Avoid arbitrary z-index escalation; define a layer scale.
- Keep responsive rules content-driven.
- Do not put permanent brand values inline when a token exists.

### Errors and logging

- Give users concise, actionable errors.
- Log technical context on the server without exposing secrets or personal data.
- Use stable error codes for important form/integration failures.
- Do not swallow errors silently.

---

## 25. Testing and validation

Every material change must be validated at the appropriate level.

### Minimum checks

- Formatting
- Linting
- Type checking
- Relevant unit/component tests
- Production build

### Critical Playwright journeys

- Main navigation on desktop and mobile
- Find Talent opens, closes and restores focus
- Find Talent completes all four steps
- Find Talent validation and error recovery
- Jobs filtering and vacancy navigation
- Job application submission
- Talent-pool registration and upload
- Newsletter subscription
- Canonical 404 behaviour
- Cookie/analytics consent behaviour where implemented

### SEO checks

- Metadata and canonical output
- Sitemap inclusion/exclusion
- Robots directives
- Structured-data validity
- Breadcrumb consistency
- Redirect behaviour
- No duplicate H1 introduced by templates

### Accessibility checks

- Automated axe scan
- Keyboard walkthrough
- Focus order
- Modal/drawer focus management
- Form labels and error announcements
- Reduced-motion mode
- Contrast and responsive zoom

### Reporting

- Never claim a test, build, audit or validation passed unless it was actually run.
- Report the command and meaningful outcome.
- If a check cannot run, state why and identify the residual risk.

---

## 26. Git and change discipline

- Inspect `git status` before editing.
- Preserve unrelated changes.
- Do not use destructive Git commands unless explicitly authorised.
- Keep commits focused on one coherent change.
- Do not commit generated secrets, private exports, uploaded CVs or local environment files.
- Include migrations and schema changes with the code that depends on them.
- Update documentation when a route, content model, environment variable, data flow or architectural decision changes.
- Prefer conventional commit messages such as `feat:`, `fix:`, `refactor:`, `docs:`, `test:` and `chore:`.

Before committing, run the relevant formatting, lint, type-check, tests and build commands. A build is not optional when the change affects routing, rendering, metadata, schemas, server code or dependencies.

---

## 27. Delivery phases

### P0 — Foundation

- Master sitemap and canonical route registry
- URL decision register
- Content models
- Technical architecture
- Design system and `DESIGN.md`
- Analytics/event architecture
- Integration interfaces
- Privacy and data-flow documentation
- Project scaffold and CI checks

### P1 — Employer acquisition

- Header, footer and navigation
- Employer-first homepage
- Services and core service template
- Sectors
- Confirmed location pages
- Employer journey
- Find Talent
- Meet Apex HR / consultation
- Case studies
- Experts
- Contact route once approved

### P2 — Candidate acquisition

- Candidate gateway
- Jobs archive and filters
- Individual job pages
- Applications
- CV upload
- Talent-pool registration

### P3 — Content and SEO engine

- Insights and topic clusters
- Reports and resources
- Events/webinars
- Approved service-location programme
- Talent-acquisition-by-role pages
- Newsletter
- Scalable internal linking

### P4 — Integrations and optimisation

- Confirmed CRM
- Confirmed ATS
- Email marketing
- Calendar/booking
- Attribution and dashboards
- Performance, accessibility, security and SEO hardening

### Future scope; do not build without approval

- Candidate portal
- Employer portal
- AI CV parsing
- AI candidate matching
- AI candidate assistant
- AI employer assistant
- Advanced personalisation

---

## 28. URL decisions and remaining gates

The canonical sitemap decisions are recorded in `docs/URL-DECISION-REGISTER.md`. The following rules are resolved and must not be reopened implicitly during implementation:

| Decision | Approved rule |
|---|---|
| Taxonomy root | Use `/sector/`; redirect `/industries/` aliases |
| Professional Services | Use `/sector/professional-services/` |
| IT | Use `/sector/technology/` |
| Contact | Use `/contact/`; keep `/about/` as a separate valid page |
| Locations | Use Nottingham, Worcester and Staffordshire spellings |
| Service catalogue | Use 10 parent families and 48 children from the Services sheet |
| Service routes | Use flat `/services/[service-slug]/` canonicals |
| Spelling errors | Use corrected canonicals and direct `301` redirects for known requestable legacy URLs |
| Service-location routes | Use `/services/[service-slug]-[location-slug]/`; keep all 816 combinations Provisional |
| Formatting | Lowercase, hyphenated, trailing-slash URLs |
| Route states | Confirmed, Corrected, Redirected, Provisional or Future |

The following remain genuine approval or integration gates. They are not permission to guess:

| Gate | Working rule |
|---|---|
| Employer and candidate journey routes | Keep the recorded URLs Provisional until stakeholder sign-off |
| Jobs and job details | Keep Provisional until the ATS and live-vacancy rules are confirmed |
| Find Talent | Keep the accessible fallback route Provisional; preserve an adapter boundary for the CRM |
| Additional service candidates | Keep unmatched Website-Sitemap-only offers Provisional; Salesforce is Future |
| Experts route | Treat `/experts/` and profiles as Provisional |
| CRM vendor | Use an adapter; do not select silently |
| ATS vendor | Use an adapter; do not select silently |
| Booking platform | Keep integration abstract until confirmed |
| Verified proof | Omit unsupported statistics, clients, outcomes, offices and claims |

When a route decision changes, update the master workbook, `MASTER-SITEMAP.md`, `URL-DECISION-REGISTER.md`, redirects, generated route data and related tests in the same change.

---

## 29. Definition of done

A feature is complete only when:

- It matches the approved requirement and route.
- It uses real or explicitly marked placeholder content.
- It is responsive.
- It is keyboard-accessible and passes relevant accessibility checks.
- It handles loading, empty, error and success states.
- It validates untrusted data on the server.
- It does not expose secrets or personal data.
- It includes appropriate analytics without personal information.
- It includes correct metadata and structured data where relevant.
- Relevant tests pass.
- The production build passes.
- Documentation and environment-variable examples are updated.
- No unrelated user work was overwritten.
- Remaining assumptions or blockers are reported.

---

## 30. Agent response format

For implementation tasks, finish with:

1. Outcome: what now works.
2. Changed files: concise list.
3. Validation: commands actually run and results.
4. Decisions/assumptions: only those that matter.
5. Remaining work: blockers or the next logical slice.

Lead with the outcome. Do not bury failures. Do not present provisional content or mocked integrations as production-ready.

---

## 31. Content-authoring authorisation

Recorded 3 September 2026, superseding the blanket "do not invent content" language in section 2 item 8 for page copy specifically. The restriction on fabricating facts is unchanged and remains in force without exception.

- The AI agent may generate original first-draft marketing and informational website copy (headings, descriptions, service/sector/location/role explanations, FAQs, supporting-page copy) for routes marked Confirmed or Corrected in the master sitemap, without waiting for the user to supply every paragraph.
- All such generated copy is a first draft only. It must be tracked with `contentStatus: "ai-draft"` and `reviewStatus: "stakeholder-review-required"` in the content layer (see `docs/CONTENT-MODEL.md` and the local content-manifest pattern in `src/content/manifest.ts`), and these internal workflow markers must never be rendered to public users.
- Factual claims still require evidence. Do not fabricate client names or logos, testimonials, case studies or results, revenue or placement figures, success rates, awards, accreditations, partnerships, office addresses, team members, expert biographies, years of operation, employee counts, regulatory approvals, guarantees, proprietary technology, existing ATS/CRM integrations, or legal outcomes. Where proof is unavailable, use an honest empty or editorial-preview state instead of a section, never a fabricated example presented as real.
- Employment-law-adjacent content requires appropriate review: use informational, non-absolute language, avoid guaranteeing compliance or a legal outcome, avoid hard-coding time-sensitive legal thresholds unless verified, and flag the content as requiring legal review rather than presenting it as regulated legal advice.
- Route-status publication rules are unchanged: only Confirmed/Corrected routes may be built as indexable pages; Redirected routes are implemented only as redirects; Provisional and Future routes stay out of the sitemap regardless of how good the drafted copy is.

## 32. Final instruction

Build Apex HR as a credible employer-first digital business system, not a collection of visually impressive but disconnected pages. Every design, content, route and technical decision must support at least one of these outcomes:

- Employer trust and conversion
- Candidate acquisition and usability
- Search visibility and content authority
- Secure, measurable operations
- Maintainable future growth

When those outcomes conflict, protect accuracy, privacy, accessibility and the approved information architecture first.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
