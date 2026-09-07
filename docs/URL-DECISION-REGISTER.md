# Apex HR URL Decision Register v1.0

**Status:** Resolved working decisions  
**Date:** 2 September 2026  
**Applies to:** Information architecture, CMS modelling, Next.js routing, redirects, navigation and SEO

## Decision summary

| ID | Decision | Resolution | Implementation action |
|---|---|---|---|
| D-001 | Sector root | Use `/sector/`; retire `/industries/` | Redirect `/industries/` and known child routes to `/sector/` equivalents |
| D-002 | Professional Services and IT collision | Professional Services uses `/sector/professional-services/`; IT uses `/sector/technology/` | Create two distinct pages and intents; do not alias both to Technology |
| D-003 | Contact URL | Use `/contact/` | Keep `/about/` for About; never redirect About to Contact |
| D-004 | Location spelling | Use Nottingham, Worcester and Staffordshire | Correct labels/slugs and redirect exact known misspellings |
| D-005 | Canonical service catalogue | Use the `Services` sheet: 10 parent families and 48 child services | Treat the competing Website Sitemap structure as a reconciliation input, not a parallel catalogue |
| D-006 | Service URL depth | Use flat `/services/[service-slug]/` routes | Redirect matched nested service URLs to their flat canonical destinations |
| D-007 | Misspelled URL handling | Correct all canonical names and slugs | Use `301` redirects for known published or referenced erroneous URLs; never preserve an error as canonical |
| D-008 | Service-location pattern | Use `/services/[service-slug]-[location-slug]/` | Retain the approved flat matrix pattern |
| D-009 | Service-location publication | Keep all 816 combinations Provisional | Publish only after service availability, originality, evidence and SEO gates pass |
| D-010 | URL formatting | Use lowercase hyphenated slugs with trailing slashes | Enforce consistently in routing, canonicals, links and sitemap output |
| D-011 | Website-Sitemap-only services | Keep unmatched services Provisional; Salesforce Future | Do not publish or expose in navigation until the commercial offer is approved |
| D-012 | Route governance statuses | Use Confirmed, Corrected, Redirected, Provisional and Future | Apply one status to every route record |

## D-001 — Sector is canonical

**Decision:** The public taxonomy and URL namespace is `sector`, not `industries`.

**Canonical root:** `/sector/`

**Redirect root:** `/industries/` → `/sector/`

All known `/industries/[slug]/` routes redirect to their `/sector/[slug]/` equivalent. Navigation labels may use “Sectors” or an approved audience-friendly label, but canonical URLs must use `/sector/`.

## D-002 — Resolve the Professional Services and IT collision

The source matrix incorrectly assigned both sectors to `/sector/technology/`.

| Sector | Canonical URL | Status |
|---|---|---|
| Professional Services | `/sector/professional-services/` | Corrected |
| IT | `/sector/technology/` | Confirmed |

These pages must target separate needs, proof, terminology and related services. They must not canonicalise to each other.

## D-003 — Contact is separate from About

| Page | Canonical URL | Status |
|---|---|---|
| About | `/about/` | Confirmed |
| Contact | `/contact/` | Corrected |

The workbook's Contact-to-`/about/` mapping was an error. Because `/about/` remains a valid page, it must not redirect to Contact. `/contacts/`, if encountered, redirects to `/contact/`.

## D-004 — Correct location names

| Erroneous name/URL | Correct canonical name/URL | Treatment |
|---|---|---|
| Nothingham / `/locations/nothingham/` | Nottingham / `/locations/nottingham/` | Corrected + `301` |
| Worchester / `/locations/worchester/` | Worcester / `/locations/worcester/` | Corrected + `301` |
| Standfordshire / `/locations/standfordshire/` | Staffordshire / `/locations/staffordshire/` | Corrected + `301` |

All labels, slugs, breadcrumbs, metadata, internal links and CMS references use the corrected spellings.

## D-005 — Reconcile the service taxonomies

The `Services` sheet supplies the canonical commercial catalogue:

- 10 parent service families.
- 48 child services.
- 58 canonical service records in total.

The `Website Sitemap` sheet proposed a partly nested and partly different taxonomy. Reconciliation follows these rules:

1. If an item clearly matches a canonical service, redirect its competing nested URL to the flat canonical URL.
2. If an item is only a grouping label, use it for navigation or CMS relationships rather than creating a duplicate page.
3. If an item represents a genuinely distinct but unconfirmed offer, mark it Provisional.
4. If an item belongs outside the current scope, mark it Future.
5. Never publish two pages for the same principal intent.

Examples:

| Competing URL | Canonical URL | Treatment |
|---|---|---|
| `/services/talent-acquisition-recruitment/executive-search/` | `/services/executive-search/` | `301` |
| `/services/organisation-development-change/organisation-design/` | `/services/organisation-design/` | `301` |
| `/services/learning-development/executive-coaching/` | `/services/executive-coaching-and-360-feedback/` | `301` |
| `/services/compensation-benefits/salary-benchmarking/` | `/services/salary-benchmarking/` | `301` |
| `/services/hr-technology-analytics/people-analytics/` | `/services/people-analytics-and-hr-dashboards/` | `301` |

## D-006 — Flat service URLs

Canonical service pages use:

```text
/services/[service-slug]/
```

The service family is stored as structured CMS data and used for navigation and breadcrumbs; it is not required in the canonical child-service URL.

This avoids route duplication, preserves the approved matrix, and keeps service pages stable if navigation groupings change.

## D-007 — Correct spelling errors without retaining bad canonicals

Known corrected service routes include:

| Legacy/error URL | Canonical URL | Treatment |
|---|---|---|
| `/services/recruitment-talent-and-acuqisition/` | `/services/recruitment-talent-acquisition/` | `301` |
| `/services/organisation-deevelopment-and-change-movement/` | `/services/organisation-development-change-management/` | `301` |
| `/services/leadership-and-leadership-development/` | `/services/learning-and-leadership-development/` | `301` |
| `/services/performance-management/` when used for the parent family | `/services/performance-and-talent-management/` | Reassign the parent; no redirect |

The last row resolves a parent/child collision: `/services/performance-management/` remains the child service page, while the parent family receives its own corrected URL. It cannot redirect because it remains a valid canonical destination.

Known corrected sector routes include:

| Legacy/error URL | Canonical URL |
|---|---|
| `/sector/constructions/` | `/sector/construction/` |
| `/sector/destributors/` | `/sector/distribution/` |
| `/industries/constructions/` | `/sector/construction/` |
| `/industries/destributors/` | `/sector/distribution/` |

### Redirect rule

- Use a direct permanent `301` when the old URL was published, indexed, linked, supplied to a developer, or otherwise at risk of being requested.
- If a spelling error existed only in an internal planning cell and was never used, implement only the corrected canonical URL.
- Do not create redirect chains.
- Do not expose legacy URLs in internal links or XML sitemaps.

## D-008 and D-009 — Service-location routes

The format remains:

```text
/services/[service-slug]-[location-slug]/
```

The 816 possible combinations are recorded but remain Provisional. They are not a licence to mass-publish duplicated pages. Each route requires verified delivery coverage, genuinely local value, unique metadata and substantive original content.

Misspelled matrix headings are corrected before any route is generated. Because the matrix is a planning source, 816 corrected canonical routes are retained without automatically generating 144 redirects for never-published misspelled variants.

## D-010 — URL formatting

Canonical URLs must:

- be lowercase;
- use hyphens, not spaces or underscores;
- end with `/`, except `/` itself;
- avoid unnecessary dates, query strings and tracking parameters;
- remain stable after publication;
- be generated from governed CMS slug fields rather than duplicated literals.

## D-011 — Provisional and future services

The following Website-Sitemap-only service concepts remain Provisional:

- Recruitment Advisory
- Workforce Transformation
- Talent Management
- Talent Review
- HR Technology Strategy
- Demand Modelling
- Critical Role Planning
- Global Talent Strategy
- Talent Strategy
- Interim HR Director

Salesforce remains Future. None may be indexed or added to primary navigation until its offer, owner, content and principal keyword are approved.

## D-012 — Status control

Every route must carry exactly one of the five approved statuses. Only Confirmed and Corrected routes may enter the build backlog. Corrected routes must include the previous URL where one exists. Redirected routes are never indexable. Provisional and Future routes are excluded from production sitemaps.

## Redirect implementation checklist

- Implement all entries in the workbook's `Redirects` sheet.
- Use HTTP `301`, not JavaScript or meta-refresh redirects.
- Resolve each rule in one hop.
- Test both the response code and final destination.
- Update internal links to the canonical URL.
- Use self-referencing canonicals on canonical pages.
- Remove redirect sources from XML sitemaps.
- Preserve query strings only when they contain required application state; discard tracking parameters where safe.
- Monitor `404`, redirect-loop and soft-404 reports after deployment.

## Remaining gates, not unresolved URL conflicts

The structural conflicts requested for this round are resolved. The following routes remain Provisional because they depend on separate product or content decisions:

- Employer and candidate journey routes.
- Jobs and ATS-backed job details.
- Talent Pool.
- Find Talent fallback page and CRM destination.
- Experts and profile routes.
- Reports, events and webinars.
- Individual insight and case-study routes.
- All service-location combinations.
- Additional service candidates listed above.

These are approval gates, not permission to invent content or integrations.
