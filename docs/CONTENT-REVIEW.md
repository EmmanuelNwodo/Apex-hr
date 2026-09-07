# Apex HR Content Review — Phase 3

**Status:** All content below is AI-authored first draft (`contentStatus: "ai-draft"`, `reviewStatus: "stakeholder-review-required"` in `src/content/manifest.ts`). Nothing in this document or the pages it describes has been approved by Apex HR stakeholders. No internal workflow status is shown to public users.

**Authority for this content:** CLAUDE.md section 31 (content-authoring authorisation, recorded 3 September 2026).

---

## 1. Generated page groups

| Group | Count | Files |
|---|---:|---|
| Homepage | 1 | `src/app/page.tsx` (content largely from Phase 2; Trust section copy updated) |
| Service categories | 10 | `src/content/services-data.ts` → `serviceCategoryContent` |
| Individual services | 48 | `src/content/services-data.ts` → `serviceContent` |
| Sectors | 17 | `src/content/sectors-data.ts` |
| Locations | 16 | `src/content/locations-data.ts` |
| Talent-acquisition roles | 62 | `src/content/talent-roles-data.ts` |
| Insight categories | 8 | `src/config/insight-categories.ts` (summary copy) |
| Supporting pages | 9 | `src/content/supporting-pages-data.ts` (About, Contact, For Employers, For Candidates, Find Talent, Jobs, Talent Pool) plus Resources, Case Studies and Experts hubs (inline in their route files) |

**Total original page records generated this phase: 171** (10 + 48 + 17 + 16 + 62 + 8 + 9 + 1 homepage refresh), rendering as 179 static pages including index/hub pages.

## 2. Statements requiring business verification

None of the content below states a fact as an established Apex HR achievement — all "how Apex HR can help" language deliberately uses "can support" rather than "has delivered for" (per this phase's sector-content rule). Even so, before publication a stakeholder should confirm:

- The 48 service descriptions accurately reflect how Apex HR actually delivers each service (engagement options, delivery approach) — these are informed, plausible defaults, not confirmed Apex HR process.
- The "Why Apex HR" / "Why choose Apex HR" differentiator statements on the homepage and every service page are positioning language, not verified claims — confirm they reflect the real value proposition.
- The 16 location pages' regional/economic context statements are general knowledge about each city/region, not Apex-specific coverage claims — confirm Apex HR can genuinely support employers in each listed location before indexing.
- The FAQ answers throughout (homepage, every service/sector/location/role page) are plausible but unverified — particularly anything implying a process detail (e.g. response times, engagement structure).

## 3. Content requiring legal review

Employment-law-adjacent services are flagged `legalReviewRequired: true` in `src/content/services-data.ts` and use deliberately informational, non-absolute language throughout (see CLAUDE.md section 31). **15 of 48 services** are flagged:

- HR Compliance Audit
- Employee Handbooks & HR Policies
- Contract Staffing (IR35/employment status)
- Redundancy & Restructuring Support
- TUPE Advisory
- Workplace Investigations
- Employment Tribunal HR Support
- Industrial Relations & Trade Union Negotiations
- Skilled Worker Sponsorship HR Support
- M&A People Due Diligence & Post-Merger Integration
- Pay Equity & Pay Gap Reporting
- Executive Compensation & Share Schemes
- Diversity, Equity & Inclusion (DEI) Consulting
- AI Workplace Policy & HR Integration
- Global Mobility & Expatriate HR Management

Each of these pages includes an explicit FAQ or note distinguishing Apex HR's HR-process support from regulated legal/tax/immigration advice, and none states a guaranteed legal outcome, a specific legal threshold/figure, or cites specific legislation. A qualified employment lawyer should still review this copy before publication, particularly the FAQ answers.

No legal, cookie or terms policy pages (`/privacy-policy/`, `/cookies/`, `/terms/` or similar) were created this phase — they are not present in `docs/MASTER-SITEMAP.md`'s route inventory, so creating them would mean inventing an ungoverned route. If Apex HR needs these pages, they must first be added to the master sitemap and URL register.

## 4. Missing team information

No expert/practitioner profiles exist. `/experts/` renders an honest empty state (`EmptyEditorialState`) rather than fictional profiles, consistent with CLAUDE.md's prohibition on generated avatars representing real people. Needed before this section can populate: real names, roles, professional summaries, verified qualifications and approved portraits for each practitioner.

## 5. Missing case studies

No case studies exist. `/case-study/` and every service page's case-study slot render an honest empty state. Needed: verified client work (with permission to publish, or an agreed anonymisation approach), a lead expert, and approved results.

## 6. Missing testimonials

No testimonials exist anywhere in the codebase. None are referenced by any template. Needed: a quotation, attribution (or agreed anonymisation), and confirmed permission to publish, per `docs/CONTENT-MODEL.md` section 12.3.

## 7. Missing company details

- No verified years of operation, employee count, or organisation-wide statistics — the Trust section on the homepage intentionally uses non-quantified capability statements instead (see `src/content/home.ts`).
- No accreditations, awards or professional-body memberships are referenced anywhere.
- No client logos exist for a logo marquee.
- `siteConfig.socialProfiles` (`src/config/site.ts`) is an empty array — no social profile URLs are known.

## 8. Missing contact information

- No verified phone number, email address or postal address exists anywhere in the codebase. The Contact page (`/contact/`) explains that verified details will be published once confirmed, and directs users to the Find Talent form instead.
- No `office` records exist for any of the 16 location pages — none claims a physical Apex HR office, per CLAUDE.md section 9 and this phase's location rules.
- `siteConfig.legalName` is set to `"Apex HR"` as a working name; no registered company name, company number or registered address is known or invented.

## 9. Missing media assets

- No approved logo asset exists (unchanged from Phase 1) — `Logo` (`src/components/ui/logo.tsx`) remains a temporary text mark.
- No approved photography exists for the homepage hero, service pages, sector pages, location pages or expert profiles. All visual treatment remains CSS-based/abstract (no `next/image` usage yet, since there is no real image to optimise).
- No Open Graph / social-sharing image exists; `buildMetadata()`'s `ogImagePath` parameter is unused by any page this phase.
