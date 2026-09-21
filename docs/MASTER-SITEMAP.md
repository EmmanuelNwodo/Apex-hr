# Apex HR Master Sitemap v1.0

**Status:** Approved working architecture  
**Consolidated:** 2 September 2026  
**Canonical taxonomy:** `sector`  
**Companion register:** `Apex_HR_Master_Sitemap_and_URL_Register.xlsx`

## 1. Purpose and authority

This document is the human-readable source of truth for the Apex HR information architecture. The companion workbook is the route-level register and contains every identified canonical route, redirect, provisional pattern and future route.

Where project sources conflict, apply this order:

1. Explicit stakeholder decisions recorded in the URL Decision Register.
2. The approved master sitemap and URL matrix.
3. Apex HR Website Page Structure and SEO Requirements.
4. Apex HR Website Functional Requirements Document.
5. HR Strategy Document workbook.
6. Meeting notes and design references.

## 2. Route status vocabulary

| Status | Meaning | Production treatment |
|---|---|---|
| Confirmed | Approved route requiring no correction | May be implemented and indexed when content is ready |
| Corrected | Approved canonical route that replaces an error or conflict | Implement canonical; redirect a known legacy URL where applicable |
| Redirected | Non-canonical historical, erroneous or competing URL | Permanent `301`; never index or include in the sitemap |
| Provisional | Route or pattern recognised but still subject to content, evidence, integration or stakeholder gates | Keep out of the production XML sitemap and index until approved |
| Future | Explicitly outside the initial delivery scope | Do not build or publish without separate approval |

## 3. Route inventory

| Metric | Count |
|---|---:|
| All route records | 1,087 |
| Confirmed | 153 |
| Corrected | 16 |
| Redirected | 72 |
| Provisional | 839 |
| Future | 7 |
| Routes currently eligible for indexing | 91 |
| Canonical service families | 10 |
| Canonical child services | 48 |
| Service-location combinations | 816 |

The counts above include canonical pages, dynamic route patterns, explicit redirects and future product routes. A route's status does not by itself mean that its content is ready to publish.

## 4. URL conventions

- Use lowercase, human-readable, hyphenated slugs.
- Use a trailing slash for every route except the homepage `/`.
- Use British English in visible content unless a source title or legal term requires otherwise.
- Use flat canonical service routes: `/services/[service-slug]/`.
- Use `sector`, never `industries`, in canonical URLs.
- Use one canonical URL for one principal search intent.
- Do not generate thin service-location pages automatically.
- Do not create a second page when a redirect, taxonomy relationship or filtered view is the correct solution.
- Exception: individual Insights/blog articles are root-level `/[article-slug]/`, not nested under `/insights/` — see `docs/URL-DECISION-REGISTER.md` D-016. The `/insights/` archive route itself is unaffected.

## 5. Top-level architecture

| Page | Canonical URL | Status | Phase |
|---|---|---|---|
| Home | `/` | Confirmed | P1 |
| Services | `/services/` | Confirmed | P1 |
| Sectors | `/sector/` | Corrected | P1 |
| About | `/about/` | Confirmed | P1 |
| Contact | `/contact/` | Corrected | P1 |
| For Employers | `/for-employers/` | Provisional | P1 |
| Find Talent | `/find-talent/` | Provisional | P1 |
| Case Studies | `/case-study/` | Confirmed | P1 |
| Individual case study | `/case-study/[case-study-slug]/` | Provisional | P1 |
| Experts | `/experts/` | Provisional | P1 |
| Expert profile | `/experts/[expert-slug]/` | Provisional | P1 |
| For Candidates | `/for-candidates/` | Provisional | P2 |
| Jobs | `/jobs/` | Provisional | P2 |
| Individual job | `/jobs/[job-slug]/` | Provisional | P2 |
| Talent Pool | `/talent-pool/` | Provisional | P2 |
| Insights | `/insights/` | Confirmed | P3 |
| Individual insight/article | `/[article-slug]/` (root-level, per D-016 — **not** `/insights/[article-slug]/`) | Confirmed pattern; each article Confirmed only once genuinely published in WordPress | P3 |
| Resources | `/resources/` | Confirmed | P3 |
| Reports | `/resources/reports/` | Provisional | P3 |
| Events | `/resources/events/` | Provisional | P3 |
| Webinars | `/resources/webinars/` | Provisional | P3 |

## 6. Canonical service taxonomy

The `Services` sheet in the strategy workbook controls the offer catalogue. The competing `Website Sitemap` taxonomy is treated as a proposed navigation structure, not as a second canonical service catalogue.

Matched nested URLs from the competing taxonomy must redirect to the flat canonical service URL. Services found only in the competing taxonomy remain provisional or future until the offer owner approves them.

### 6.1 Outsourced HR Services

- **Parent:** `/services/outsourced-hr-services-firm-in-the-uk/`
- Retained HR Services — `/services/retained-hr-services-firm-in-the-uk/`
- HR Support for Small Businesses & Startups — `/services/hr-support-for-small-businesses-and-startups-firm-in-the-uk/`
- Fractional HR Director / Chief People Officer — `/services/fractional-hr-director-chief-people-officer-firm-in-the-uk/`
- HR Compliance Audit — `/services/hr-compliance-audit-firm-in-the-uk/`
- Employee Handbooks & HR Policies — `/services/employee-handbooks-and-hr-policies-firm-in-the-uk/`
- Payroll Advisory — `/services/payroll-advisory-firm-in-the-uk/`

### 6.2 Recruitment & Talent Acquisition

- **Parent:** `/services/recruitment-and-talent-acquisition-firm-in-the-uk/` — Corrected
- Permanent Recruitment — `/services/permanent-recruitment-firm-in-the-uk/`
- Executive Search — `/services/executive-search-firm-in-the-uk/`
- Contract Staffing — `/services/contract-staffing-firm-in-the-uk/`
- Recruitment Process Outsourcing (RPO) — `/services/recruitment-process-outsourcing-rpo-firm-in-the-uk/`
- Graduate Schemes & Early Careers Design — `/services/graduate-schemes-and-early-careers-design-firm-in-the-uk/`

### 6.3 Employment Law & Employee Relations

- **Parent:** `/services/employment-law-and-employee-relations-firm-in-the-uk/`
- Redundancy & Restructuring Support — `/services/redundancy-and-restructuring-support-firm-in-the-uk/`
- TUPE Advisory — `/services/tupe-advisory-firm-in-the-uk/`
- Workplace Investigations — `/services/workplace-investigations-firm-in-the-uk/`
- Workplace Mediation & Conflict Resolution — `/services/workplace-mediation-and-conflict-resolution-firm-in-the-uk/`
- Employment Tribunal HR Support — `/services/employment-tribunal-hr-support-firm-in-the-uk/`
- Outplacement & Career Transition Services — `/services/outplacement-and-career-transition-services-firm-in-the-uk/`
- Industrial Relations & Trade Union Negotiations — `/services/industrial-relations-and-trade-union-negotiations-firm-in-the-uk/`
- Skilled Worker Sponsorship HR Support — `/services/skilled-worker-sponsorship-hr-support-firm-in-the-uk/`

### 6.4 Organisation Development & Change Management

- **Parent:** `/services/organisation-development-and-change-management-firm-in-the-uk/` — Corrected
- Organisation Design — `/services/organisation-design-firm-in-the-uk/`
- Change Management — `/services/change-management-firm-in-the-uk/`
- Culture Transformation — `/services/culture-transformation-firm-in-the-uk/`
- M&A People Due Diligence & Post-Merger Integration — `/services/ma-people-due-diligence-and-post-merger-integration-firm-in-the-uk/`

### 6.5 Compensation, Reward & Benefits

- **Parent:** `/services/compensation-reward-and-benefits-firm-in-the-uk/`
- Salary Benchmarking — `/services/salary-benchmarking-firm-in-the-uk/`
- Job Evaluation & Pay Structures — `/services/job-evaluation-and-pay-structures-firm-in-the-uk/`
- Reward Strategy — `/services/reward-strategy-firm-in-the-uk/`
- Pay Equity & Pay Gap Reporting — `/services/pay-equity-and-pay-gap-reporting-firm-in-the-uk/`
- Employee Benefits Consulting — `/services/employee-benefits-consulting-firm-in-the-uk/`
- Executive Compensation & Share Schemes — `/services/executive-compensation-and-share-schemes-firm-in-the-uk/`

### 6.6 Learning & Leadership Development

- **Parent:** `/services/learning-and-leadership-development-firm-in-the-uk/` — Corrected
- Leadership & Management Training — `/services/leadership-and-management-training-firm-in-the-uk/`
- Executive Coaching & 360 Feedback — `/services/executive-coaching-and-360-feedback-firm-in-the-uk/`
- Learning Strategy & Capability Development — `/services/learning-strategy-and-capability-development-firm-in-the-uk/`

### 6.7 Performance & Talent Management

- **Parent:** `/services/performance-and-talent-management-firm-in-the-uk/` — Corrected
- Performance Management — `/services/performance-management-firm-in-the-uk/`
- Succession Planning & Talent Mapping — `/services/succession-planning-and-talent-mapping-firm-in-the-uk/`
- Competency Frameworks — `/services/competency-frameworks-firm-in-the-uk/`

### 6.8 Employee Experience & Engagement

- **Parent:** `/services/employee-experience-and-engagement-firm-in-the-uk/`
- Employee Experience Strategy — `/services/employee-experience-strategy-firm-in-the-uk/`
- Employee Engagement Surveys & Action Planning — `/services/employee-engagement-surveys-and-action-planning-firm-in-the-uk/`
- Employer Branding & Employee Value Proposition (EVP) — `/services/employer-branding-and-employee-value-proposition-evp-firm-in-the-uk/`
- Workplace Wellbeing & Mental Health — `/services/workplace-wellbeing-and-mental-health-firm-in-the-uk/`
- Diversity, Equity & Inclusion (DEI) Consulting — `/services/diversity-equity-and-inclusion-dei-consulting-firm-in-the-uk/`

### 6.9 HR Technology & People Analytics

- **Parent:** `/services/hr-technology-and-people-analytics-firm-in-the-uk/`
- HRIS Implementation — `/services/hris-implementation-firm-in-the-uk/`
- HR Software Selection — `/services/hr-software-selection-firm-in-the-uk/`
- People Analytics & HR Dashboards — `/services/people-analytics-and-hr-dashboards-firm-in-the-uk/`
- Digital HR Transformation — `/services/digital-hr-transformation-firm-in-the-uk/`
- AI Workplace Policy & HR Integration — `/services/ai-workplace-policy-and-hr-integration-firm-in-the-uk/`

### 6.10 Strategic HR & Workforce Advisory

- **Parent:** `/services/strategic-hr-and-workforce-advisory-firm-in-the-uk/`
- People Strategy — `/services/people-strategy-firm-in-the-uk/`
- Strategic Workforce Planning — `/services/strategic-workforce-planning-firm-in-the-uk/`
- Global Mobility & Expatriate HR Management — `/services/global-mobility-and-expatriate-hr-management-firm-in-the-uk/`

## 7. Additional service candidates

| Service | Proposed URL | Status |
|---|---|---|
| Recruitment Advisory | `/services/recruitment-advisory/` | Provisional |
| Workforce Transformation | `/services/workforce-transformation/` | Provisional |
| Talent Management | `/services/talent-management/` | Provisional |
| Talent Review | `/services/talent-review/` | Provisional |
| HR Technology Strategy | `/services/hr-technology-strategy/` | Provisional |
| Demand Modelling | `/services/demand-modelling/` | Provisional |
| Critical Role Planning | `/services/critical-role-planning/` | Provisional |
| Global Talent Strategy | `/services/global-talent-strategy/` | Provisional |
| Talent Strategy | `/services/talent-strategy/` | Provisional |
| Interim HR Director | `/services/interim-hr-director/` | Provisional |
| Salesforce | `/services/salesforce/` | Future |

These routes must not be included in navigation, generated in the production sitemap or indexed until their distinct commercial offer and search intent are approved.

## 8. Sector architecture

`/sector/` is canonical. `/industries/` and all known child routes under it must permanently redirect to the corresponding sector route.

| Sector | Canonical URL | Status |
|---|---|---|
| Startups & Scale-ups | `/sector/hr-company-for-startups-and-scale-ups-in-the-uk/` | Confirmed |
| Professional Services | `/sector/hr-company-for-professional-services-in-the-uk/` | Corrected |
| Healthcare | `/sector/hr-company-for-healthcare-in-the-uk/` | Confirmed |
| Life Sciences | `/sector/hr-company-for-life-sciences-in-the-uk/` | Confirmed |
| IT | `/sector/hr-company-for-it-in-the-uk/` | Confirmed |
| Financial Services | `/sector/hr-company-for-financial-services-in-the-uk/` | Confirmed |
| Accountants | `/sector/hr-company-for-accountants-in-the-uk/` | Confirmed |
| Architects | `/sector/hr-company-for-architects-in-the-uk/` | Confirmed |
| Care Homes | `/sector/hr-company-for-care-homes-in-the-uk/` | Confirmed |
| Charity | `/sector/hr-company-for-charity-in-the-uk/` | Confirmed |
| Construction | `/sector/hr-company-for-construction-in-the-uk/` | Corrected |
| Distribution | `/sector/hr-company-for-distribution-in-the-uk/` | Corrected |
| Education | `/sector/hr-company-for-education-in-the-uk/` | Confirmed |
| Engineers | `/sector/hr-company-for-engineers-in-the-uk/` | Confirmed |
| Leisure | `/sector/hr-company-for-leisure-in-the-uk/` | Confirmed |
| Manufacturers | `/sector/hr-company-for-manufacturers-in-the-uk/` | Confirmed |
| Hospitality | `/sector/hr-company-for-hospitality-in-the-uk/` | Confirmed |

Professional Services and IT are separate intents. Professional Services uses `/sector/hr-company-for-professional-services-in-the-uk/`; IT alone retains `/sector/hr-company-for-it-in-the-uk/`.

## 9. Location architecture

A `/locations/` hub route (directory of all locations below) was added by explicit later stakeholder instruction — see `docs/URL-DECISION-REGISTER.md` D-013. It supersedes the earlier position that only the dynamic `[slug]` pattern was approved for this family.

| Location | Canonical URL | Status |
|---|---|---|
| All locations (hub) | `/locations/` | Confirmed |
| London | `/locations/london/` | Confirmed |
| Manchester | `/locations/manchester/` | Confirmed |
| Birmingham | `/locations/birmingham/` | Confirmed |
| Leeds | `/locations/leeds/` | Confirmed |
| Bristol | `/locations/bristol/` | Confirmed |
| Edinburgh | `/locations/edinburgh/` | Confirmed |
| Glasgow | `/locations/glasgow/` | Confirmed |
| Nottingham | `/locations/nottingham/` | Corrected |
| Newcastle | `/locations/newcastle/` | Confirmed |
| Warwickshire | `/locations/warwickshire/` | Confirmed |
| Worcester | `/locations/worcester/` | Corrected |
| Yorkshire | `/locations/yorkshire/` | Confirmed |
| Staffordshire | `/locations/staffordshire/` | Corrected |
| Liverpool | `/locations/liverpool/` | Confirmed |
| Oxford | `/locations/oxford/` | Confirmed |
| Leicester | `/locations/leicester/` | Confirmed |

Corrected legacy spellings use permanent redirects:

- `/locations/nothingham/` → `/locations/nottingham/`
- `/locations/worchester/` → `/locations/worcester/`
- `/locations/standfordshire/` → `/locations/staffordshire/`

## 10. Service-location architecture

The approved pattern is flat:

```text
/services/[service-slug]-[location-slug]/
```

Example (as of `docs/URL-DECISION-REGISTER.md` D-017, service slugs carry the `-firm-in-the-uk` suffix, so the combined service-location slug does too):

```text
/services/executive-search-firm-in-the-uk-london/
```

The register contains 816 recorded service-location combinations (48 child services x 16 named locations, plus the parent categories) and 160 recorded category-location combinations. The default status for any combination not explicitly Confirmed below remains **Provisional**.

A service-location page may move to Confirmed only when all of these gates pass:

- Apex genuinely delivers that service in the stated location.
- The page contains original, locally useful content rather than token substitution.
- The title, H1, metadata, body content, proof and internal links are distinct.
- No office, practitioner, customer, rating or result is fabricated.
- Search intent does not substantially duplicate the national service page.
- The content and SEO owner explicitly approves indexation.

**Confirmed subset (D-014):** by explicit later stakeholder instruction, the combinations already curated in each location's `relatedServiceSlugs` (`src/content/locations-data.ts` — the 3-5 services genuinely picked as relevant to that location's real economic context, plus each service's parent category) are Confirmed and published at `/services/[service-slug]-[location-slug]/` and `/services/[category-slug]-[location-slug]/`. Every other combination in the 816/160 totals remains Provisional. See `docs/URL-DECISION-REGISTER.md` D-014 and `src/config/service-locations.ts` for the exact generated set.

## 11. Talent acquisition by role

The canonical family uses:

```text
/talent-acquisition/[occupation-slug]/
```

The workbook contains 62 confirmed occupation routes from the approved TAR sheet. They should use one dynamic CMS-driven template and must not be implemented as 62 hand-coded components.

## 12. Insight categories

| Category | Canonical URL | Status |
|---|---|---|
| Organisation Development | `/insights/organisation-development/` | Corrected |
| Learning & Development | `/insights/learning-development/` | Confirmed |
| Performance & Talent | `/insights/performance-talent/` | Corrected |
| Reward | `/insights/reward/` | Confirmed |
| Employee Experience | `/insights/employee-experience/` | Corrected |
| HR Technology | `/insights/hr-technology/` | Corrected |
| Workforce Strategy | `/insights/workforce-strategy/` | Confirmed |
| People Strategy | `/insights/people-strategy/` | Confirmed |

Article ideas and topic-cluster keywords do not become routes until original content has been approved and published.

## 13. Redirect policy

- Use server-side or edge-level `301` redirects.
- Redirect directly to the final canonical destination; avoid chains.
- Keep redirect sources out of navigation, canonicals, structured data and XML sitemaps.
- Preserve redirects indefinitely when an old URL was live, linked externally or indexed.
- If a misspelled planning URL was never published, use only the corrected URL and do not create unnecessary redirect rules.
- Never redirect `/about/` to `/contact/`; `/about/` remains a valid independent page. The source spreadsheet's Contact-to-About mapping is corrected by creating `/contact/`.

The complete 72-rule redirect registry is in the companion workbook.

## 14. Future routes

The following remain outside the initial build:

- `/candidate-portal/`
- `/candidate-portal/cv-analysis/`
- `/employer-portal/`
- `/employer-portal/talent-matching/`
- `/candidate-assistant/`
- `/employer-assistant/`
- `/services/salesforce/`

## 15. Implementation rule

Only Confirmed and Corrected routes may enter the implementation backlog. Redirected routes are implemented only as redirect rules. Provisional routes require their stated approval gates. Future routes require a separate scope decision.

Before deployment, generate navigation, breadcrumbs, canonicals, XML sitemaps, structured data and CMS references from this governed route data rather than duplicating URLs across the codebase.
