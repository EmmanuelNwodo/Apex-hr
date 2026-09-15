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
| D-013 | Locations hub route | Add `/locations/` as a Confirmed hub route, superseding the earlier "no hub for this family" position | Add a directory page linking to all 16 location pages; link it from the footer's Company column |
| D-014 | Curated service-location subset | Confirm only each location's already-curated `relatedServiceSlugs` combinations (and their parent categories), not the full 816/160 cross-products | Generate pages from existing curated data only; give every combination a unique meta description and genuine local-context content |
| D-015 | Category-location cannibalisation resolution | Redirect the 44 category-location pages backed by only one curated child service to that child's service-location page; retain the 2 pages backed by two curated child services as independently indexable | Raise the category-location curation threshold to 2+ services in `src/config/service-locations.ts`; add 44 permanent redirects to `src/config/redirects.ts`; reposition the 2 retained pages around both child services |
| D-016 | Headless WordPress for Insights/blog | WordPress (`blog.apexhrllc.co.uk`) becomes the editorial source of truth for Insights/blog articles only. The archive stays at `/insights/`; individual articles are root-level `/[slug]/`, never `/insights/[slug]/`. `www.apexhrllc.co.uk` is the only public canonical host; `blog.apexhrllc.co.uk` is CMS/API-origin only | Add `src/lib/wordpress/`; add `src/app/[slug]/page.tsx` guarded by `src/config/reserved-slugs.ts`; read `NEXT_PUBLIC_SITE_URL`/`WORDPRESS_API_URL`/`WORDPRESS_SITE_URL` from environment; extend `sitemap.ts`. Sanity and Supabase are unaffected — see the full entry below |

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

## D-013 — Add a locations hub route

**Decision:** Add `/locations/` as a Confirmed hub route: a directory page linking to all 16 approved location pages, with an entry in the footer's Company column labelled "Locations".

**Rationale:** Requested by explicit later user instruction. This supersedes the position recorded elsewhere in this register and in `docs/MASTER-SITEMAP.md` section 9 that only the dynamic `/locations/[slug]/` pattern was approved for this family — per CLAUDE.md section 3, explicit stakeholder instruction outranks the earlier documented position.

**Canonical URL:** `/locations/`

Individual location pages' breadcrumbs now run Home → Locations → [location], instead of skipping straight from Home to the location.

## D-014 — Confirm a curated subset of service-location combinations

**Decision:** Of the 816 recorded service-location combinations (section 10 of `docs/MASTER-SITEMAP.md`), Confirm and publish only the combinations already present in each location's curated `relatedServiceSlugs` (`src/content/locations-data.ts`) — not the full 58-service x 16-location cross-product. Category-level combinations are derived the same way: a category page is generated for a location only when that location has at least one curated service within it.

**Rationale:** Requested by explicit later user instruction, after being shown the two options: the curated subset (~48 service+location pages, ~24 category+location pages) versus the full 928-page cross-product. CLAUDE.md section 9 explicitly gates publication of every combination behind "approved demand or keyword intent... verified service availability... unique and useful location context... editorial approval," specifically to prevent "near-duplicate doorway pages that merely swap a city name." The curated subset satisfies these gates because each combination was already deliberately selected (not auto-generated) as relevant to that location's real economic context, and each page combines two genuinely distinct real content sources (the service/category's own content plus the location's own regional context) rather than templating a single description across cities.

**Implementation:**

- Combinations are derived in `src/config/service-locations.ts` from existing curated data — no new relationships were separately invented.
- Canonical URLs: `/services/[service-slug]-[location-slug]/` and `/services/[category-slug]-[location-slug]/`, served by the existing `src/app/services/[slug]/page.tsx` dynamic route (extended, not duplicated).
- Meta descriptions are never reused verbatim across locations sharing the same curated service — a real, location-specific clause is appended (`buildComboMetaDescription`) so no two combination pages share an identical meta description.
- No office, verified local presence, or location-specific pricing/availability is claimed — coverage is described as remote/on-site support, matching every individual location page.
- Every other combination in the 816-row register remains Provisional and unpublished; this decision does not authorise a future bulk expansion without a further explicit decision.

## D-015 — Resolve category-location cannibalisation

**Decision:** Of the 46 category-location combination pages confirmed under D-014, only the 2 backed by two or more curated child services at that location (Outsourced HR Services–Worcester, Recruitment & Talent Acquisition–Liverpool) remain independently indexable. The other 44 — each backed by exactly one curated child service, targeting a near-identical keyword to that one service's own service-location page — permanently redirect (301) to that child service-location page.

**Rationale:** Requested by explicit later user instruction, after review of a published category-location decision table (SEO audit Phase 2, category-location cannibalisation report). A category-location page whose only curated child is one service targets essentially the same "[intent] in [location]" query as that service's own page (e.g. "recruitment & talent acquisition london" vs. "executive search london"), which is the near-duplicate-doorway-page risk CLAUDE.md section 9 gates against. Maintaining two indexable URLs per location for that single intent risked continued cannibalisation with no compensating benefit, since the category page could not describe a second service that doesn't exist there. The 2 locations with two curated services in the same category retain a genuine aggregation role neither service page alone can claim, so those stay live.

**Implementation:**

- `src/config/service-locations.ts`: `categoryLocationCombos` now requires at least 2 curated child services in the same category at a location (previously ≥1) — this alone reduces the combo set from 46 to 2, so the 44 retired combinations are no longer generated as pages at all.
- `src/config/redirects.ts`: 44 new permanent-redirect rules, each `/services/[category-slug]-[location-slug]/` → `/services/[the one child service-slug]-[location-slug]/`.
- The 2 retained pages use a dedicated `CategoryLocationTemplate` (`src/components/templates/category-location-template.tsx`) that names and links to both confirmed child services, distinguishes the broad category page from each specific service page in its own copy, and carries `Service` + `BreadcrumbList` JSON-LD. `FAQPage` schema is deliberately withheld — the only FAQ content available at those two locations is the generic "no physical office" item shared by every location, not genuine page-specific content.
- No service-location destination page's content was rewritten; only a canonical/title/broken-link fix would have qualified, and none was needed.

## D-016 — Headless WordPress for Insights/blog content

**Decision:** WordPress, hosted at `blog.apexhrllc.co.uk`, is the editorial source of truth for Insights/blog articles — and only that content family. Next.js remains the sole public presentation layer: nothing in `blog.apexhrllc.co.uk` is served directly to visitors.

- **Archive:** `/insights/` (unchanged route; now lists live WordPress posts instead of an always-empty local array).
- **Individual articles:** root-level `/[slug]/` (`src/app/[slug]/page.tsx`) — explicitly **not** `/insights/[slug]/`. This matches WordPress's own flat permalink structure and avoids a nested nesting that the CMS itself doesn't produce.
- **Public canonical host:** `https://www.apexhrllc.co.uk` for every page on the site, articles included. `https://blog.apexhrllc.co.uk` is the CMS admin and REST API origin only — it must never appear as a canonical URL, a sitemap entry, or a public link a visitor can click to leave the Next.js site (its own media host, `/wp-content/uploads/...`, remains directly referenced for images, which is expected and unrelated).
- **Root-level slug protection:** `src/config/reserved-slugs.ts` derives a guard set from `src/config/routes.ts` (the same registry every other route consumer reads) plus a small explicit list for routes not in that registry (`talent-acquisition`, `api`) or not yet built (`privacy-policy`, `terms`). `app/[slug]/page.tsx` checks this guard before ever calling WordPress, so a post slug can never shadow an existing or anticipated Apex HR route — Next.js's own static-over-dynamic routing already prevents an existing page from being shadowed at the routing layer; the guard is deliberate defence-in-depth, not the only protection.

**Rationale:** Requested by explicit later user instruction. WordPress is a mature, low-friction editorial tool for the SEO/content team; building an equivalent authoring workflow for Insights inside Sanity was not requested and would duplicate effort the team already has a working tool for. Scoping the decision to Insights/blog only avoids re-opening the CMS boundaries CLAUDE.md section 7 already assigns elsewhere.

**Explicitly out of scope / unaffected by this decision:**

- **Sanity** is not removed and was not in active use for Insights (its `src/lib/sanity/` module was, and remains, an unconfigured stub — the `@sanity/client` package was never installed, no query in the codebase ever ran against it). It continues to be the intended CMS for every non-Insights content type CLAUDE.md section 7 assigns it, unless and until a separate decision says otherwise.
- **Supabase** remains the system of record for all operational data (Find Talent submissions, candidate/talent-pool records, applications, consent) — completely untouched by this decision.
- Jobs, applications, contact forms, Services, Sectors, Locations and the employer/candidate journeys are all unaffected.

**Implementation:**

- `src/lib/wordpress/` — server-only data layer (`config.ts`, `types.ts`, `client.ts`, `sanitize.ts`, `adapters.ts`, barrel `index.ts`). Normalises WordPress's REST response into an internal `Article` model; no UI component depends on WordPress's raw response shape. Publishes `getPosts`, `getPostBySlug` (via WordPress's own `?slug=` filter, never a full-list search), `getCategories`, `getRecentPosts`, `getRelatedPosts`, `getAllPublishedPostsForSitemap`. Every function degrades to an honest empty/`null` result on an unconfigured, unreachable or malformed CMS response — never throws, never exposes a raw upstream error to a visitor.
- `sanitize-html` (one small, maintained dependency) sanitises `content.rendered` server-side: allow-lists ordinary editorial elements, strips scripts/handlers/unsafe protocols/embeds, preserves Gutenberg classes for styling, and rewrites `blog.apexhrllc.co.uk/{slug}/` links to the public site while leaving `/wp-content/`, `/wp-admin/` and `/wp-json/` links untouched.
- `src/app/[slug]/page.tsx` — no `generateStaticParams`; every request resolves live, with the data layer's own ~5-minute `fetch` revalidation window, so a newly published post appears without a rebuild.
- `src/app/sitemap.ts` — now async; appends every currently-published WordPress article (root-level URL, `lastModified` from WordPress's own `modified` date) to the existing manifest-driven entries, filtered against the same reserved-slug guard.
- `src/config/site.ts` — `productionUrl` now reads `NEXT_PUBLIC_SITE_URL` (falling back to the previous hard-coded domain when unset), so canonical/OG/sitemap URLs across the **whole site**, not only WordPress articles, resolve to the confirmed production domain already configured in `.env.local` and on Vercel.
- `next.config.ts` — `images.remotePatterns` narrowly allows `blog.apexhrllc.co.uk` for WordPress-hosted media; no other external host is permitted.

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
