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
| Individual insight | `/insights/[article-slug]/` | Provisional | P3 |
| Resources | `/resources/` | Confirmed | P3 |
| Reports | `/resources/reports/` | Provisional | P3 |
| Events | `/resources/events/` | Provisional | P3 |
| Webinars | `/resources/webinars/` | Provisional | P3 |

## 6. Canonical service taxonomy

The `Services` sheet in the strategy workbook controls the offer catalogue. The competing `Website Sitemap` taxonomy is treated as a proposed navigation structure, not as a second canonical service catalogue.

Matched nested URLs from the competing taxonomy must redirect to the flat canonical service URL. Services found only in the competing taxonomy remain provisional or future until the offer owner approves them.

### 6.1 Outsourced HR Services

- **Parent:** `/services/outsourced-hr-services/`
- Retained HR Services — `/services/retained-hr-services/`
- HR Support for Small Businesses & Startups — `/services/hr-support-for-small-businesses-and-startups/`
- Fractional HR Director / Chief People Officer — `/services/fractional-hr-director-chief-people-officer/`
- HR Compliance Audit — `/services/hr-compliance-audit/`
- Employee Handbooks & HR Policies — `/services/employee-handbooks-and-hr-policies/`
- Payroll Advisory — `/services/payroll-advisory/`

### 6.2 Recruitment & Talent Acquisition

- **Parent:** `/services/recruitment-talent-acquisition/` — Corrected
- Permanent Recruitment — `/services/permanent-recruitment/`
- Executive Search — `/services/executive-search/`
- Contract Staffing — `/services/contract-staffing/`
- Recruitment Process Outsourcing (RPO) — `/services/recruitment-process-outsourcing-rpo/`
- Graduate Schemes & Early Careers Design — `/services/graduate-schemes-and-early-careers-design/`

### 6.3 Employment Law & Employee Relations

- **Parent:** `/services/employment-law-and-employee-relations/`
- Redundancy & Restructuring Support — `/services/redundancy-and-restructuring-support/`
- TUPE Advisory — `/services/tupe-advisory/`
- Workplace Investigations — `/services/workplace-investigations/`
- Workplace Mediation & Conflict Resolution — `/services/workplace-mediation-and-conflict-resolution/`
- Employment Tribunal HR Support — `/services/employment-tribunal-hr-support/`
- Outplacement & Career Transition Services — `/services/outplacement-and-career-transition-services/`
- Industrial Relations & Trade Union Negotiations — `/services/industrial-relations-and-trade-union-negotiations/`
- Skilled Worker Sponsorship HR Support — `/services/skilled-worker-sponsorship-hr-support/`

### 6.4 Organisation Development & Change Management

- **Parent:** `/services/organisation-development-change-management/` — Corrected
- Organisation Design — `/services/organisation-design/`
- Change Management — `/services/change-management/`
- Culture Transformation — `/services/culture-transformation/`
- M&A People Due Diligence & Post-Merger Integration — `/services/ma-people-due-diligence-and-post-merger-integration/`

### 6.5 Compensation, Reward & Benefits

- **Parent:** `/services/compensation-reward-and-benefits/`
- Salary Benchmarking — `/services/salary-benchmarking/`
- Job Evaluation & Pay Structures — `/services/job-evaluation-and-pay-structures/`
- Reward Strategy — `/services/reward-strategy/`
- Pay Equity & Pay Gap Reporting — `/services/pay-equity-and-pay-gap-reporting/`
- Employee Benefits Consulting — `/services/employee-benefits-consulting/`
- Executive Compensation & Share Schemes — `/services/executive-compensation-and-share-schemes/`

### 6.6 Learning & Leadership Development

- **Parent:** `/services/learning-and-leadership-development/` — Corrected
- Leadership & Management Training — `/services/leadership-and-management-training/`
- Executive Coaching & 360 Feedback — `/services/executive-coaching-and-360-feedback/`
- Learning Strategy & Capability Development — `/services/learning-strategy-and-capability-development/`

### 6.7 Performance & Talent Management

- **Parent:** `/services/performance-and-talent-management/` — Corrected
- Performance Management — `/services/performance-management/`
- Succession Planning & Talent Mapping — `/services/succession-planning-and-talent-mapping/`
- Competency Frameworks — `/services/competency-frameworks/`

### 6.8 Employee Experience & Engagement

- **Parent:** `/services/employee-experience-and-engagement/`
- Employee Experience Strategy — `/services/employee-experience-strategy/`
- Employee Engagement Surveys & Action Planning — `/services/employee-engagement-surveys-and-action-planning/`
- Employer Branding & Employee Value Proposition (EVP) — `/services/employer-branding-and-employee-value-proposition-evp/`
- Workplace Wellbeing & Mental Health — `/services/workplace-wellbeing-and-mental-health/`
- Diversity, Equity & Inclusion (DEI) Consulting — `/services/diversity-equity-and-inclusion-dei-consulting/`

### 6.9 HR Technology & People Analytics

- **Parent:** `/services/hr-technology-and-people-analytics/`
- HRIS Implementation — `/services/hris-implementation/`
- HR Software Selection — `/services/hr-software-selection/`
- People Analytics & HR Dashboards — `/services/people-analytics-and-hr-dashboards/`
- Digital HR Transformation — `/services/digital-hr-transformation/`
- AI Workplace Policy & HR Integration — `/services/ai-workplace-policy-and-hr-integration/`

### 6.10 Strategic HR & Workforce Advisory

- **Parent:** `/services/strategic-hr-and-workforce-advisory/`
- People Strategy — `/services/people-strategy/`
- Strategic Workforce Planning — `/services/strategic-workforce-planning/`
- Global Mobility & Expatriate HR Management — `/services/global-mobility-and-expatriate-hr-management/`

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
| Startups & Scale-ups | `/sector/startups-scale-ups/` | Confirmed |
| Professional Services | `/sector/professional-services/` | Corrected |
| Healthcare | `/sector/health-care/` | Confirmed |
| Life Sciences | `/sector/life-sciences/` | Confirmed |
| IT | `/sector/technology/` | Confirmed |
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

Professional Services and IT are separate intents. Professional Services uses `/sector/professional-services/`; IT alone retains `/sector/technology/`.

## 9. Location architecture

| Location | Canonical URL | Status |
|---|---|---|
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

Example:

```text
/services/executive-search-london/
```

The register contains 816 combinations: 48 child services multiplied by the UK plus 16 named locations. Every combination is **Provisional**.

A service-location page may move to Confirmed only when all of these gates pass:

- Apex genuinely delivers that service in the stated location.
- The page contains original, locally useful content rather than token substitution.
- The title, H1, metadata, body content, proof and internal links are distinct.
- No office, practitioner, customer, rating or result is fabricated.
- Search intent does not substantially duplicate the national service page.
- The content and SEO owner explicitly approves indexation.

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
