# Apex HR Vacancies

A small, self-contained WordPress plugin for managing Apex HR vacancies and preparing private application administration in the WordPress dashboard. It registers the `vacancy` post type, provides a details metabox, registers vacancy metadata with the REST API, and limits anonymous REST vacancy responses to published posts.

## Requirements

- WordPress 6.0 or later
- PHP 7.4 or later
- Permission to install plugins and publish vacancies
- An administrator account for application management and private-storage settings

No paid plugin or custom-field dependency is required.

## Install

1. In WordPress, open **Plugins → Add New Plugin → Upload Plugin**.
2. Upload a ZIP containing the `apex-hr-vacancies` folder and activate **Apex HR Vacancies**.
3. Confirm the site is available at the expected WordPress origin and that the REST API is enabled. The plugin disables visitor-facing vacancy pages on the WordPress origin; the public vacancy pages are served by the Apex HR website.

The plugin source is the `apex-hr-vacancies` folder. Package that folder as a ZIP when installing through the WordPress upload screen; do not upload only the PHP file.

## Create and publish a vacancy

1. In the dashboard, open **Vacancies → Add Vacancy**.
2. Enter the job title in the title field. Use the standard editor for the full job description, **Excerpt** for the short summary, and the permalink controls for the URL slug.
3. Complete the fields in **Vacancy details**. Employment type, workplace arrangement and vacancy status use controlled options.
4. Add an approved featured image using the normal WordPress **Featured image** control. Add only verified vacancy information; do not invent salary or employer details.
5. Save as **Draft** while preparing the listing. Set the vacancy status to **Open**, then publish when the listing is approved and live.
6. To stop listing a role without deleting its history, change vacancy status to **Closed** or **Filled** and unpublish the post if it must no longer be publicly retrievable.

The public REST API exposes `vacancy` posts at:

```text
/wp-json/wp/v2/vacancies
/wp-json/wp/v2/vacancies/{id}
```

The metadata appears in each REST response under `meta`, using these exact keys and types:

| REST metadata key | Type | Notes |
| --- | --- | --- |
| `apex_hr_vacancy_reference` | string | Vacancy reference |
| `apex_hr_responsibilities` | string | Newline-delimited text |
| `apex_hr_requirements` | string | Newline-delimited text |
| `apex_hr_desirable_skills` | string | Newline-delimited text |
| `apex_hr_benefits` | string | Newline-delimited text |
| `apex_hr_sector` | string | |
| `apex_hr_department` | string | |
| `apex_hr_location` | string | |
| `apex_hr_employment_type` | string | Controlled option |
| `apex_hr_workplace_arrangement` | string | Controlled option |
| `apex_hr_seniority` | string | |
| `apex_hr_salary_min` | number | Non-negative |
| `apex_hr_salary_max` | number | Non-negative |
| `apex_hr_salary_currency` | string | Three-letter ISO 4217 code |
| `apex_hr_salary_unit` | string | Optional enum: `HOUR`, `DAY`, `WEEK`, `MONTH`, `YEAR` |
| `apex_hr_salary_display` | string | Human-readable salary text |
| `apex_hr_closing_date` | string | `YYYY-MM-DD` |
| `apex_hr_application_email` | string | Optional email |
| `apex_hr_featured` | boolean | |
| `apex_hr_vacancy_status` | string | `Open`, `Closed`, or `Filled` |
| `apex_hr_seo_title` | string | |
| `apex_hr_meta_description` | string | |

The WordPress title, slug, excerpt, full description, and featured image use the standard post fields. The slug is used by the public Apex HR website and is not a public WordPress vacancy URL.

Salary amounts are non-negative numbers, currency uses a three-letter ISO 4217 code, dates use `YYYY-MM-DD`, and application email is optional. The salary minimum may not exceed the maximum. Use the display-text field for human-readable compensation wording; do not add a numeric amount unless it is confirmed.

## Public visibility and privacy

- Anonymous REST collection requests are restricted to WordPress `publish` posts, even when a caller supplies another status.
- Anonymous REST item responses for draft, pending, private, future, or otherwise unpublished posts return not found. WordPress authenticated editorial access remains governed by normal WordPress capabilities.
- REST-visible metadata is intended for published vacancy content. Do not put applicant data, CVs, private notes, or other sensitive information in vacancy fields.
- Vacancy status (`Open`, `Closed`, or `Filled`) is editorial data, separate from WordPress post status. Vacancy pages are excluded from WordPress's core and Yoast sitemaps. The public Next.js site's `vacancy-sitemap.xml` includes only published, open, non-expired vacancies at their canonical `www.apexhrllc.co.uk/jobs/{slug}/` URLs.
- The vacancy REST API does not expose application data. Candidate records are kept in a separate operational table and are never stored as vacancy posts or vacancy metadata.

## Application management foundation (Phase 1)

Phase 1 creates the WordPress database, private-storage and administrator foundation for the future WordPress application system. It does **not** yet accept applications, upload CVs, serve CV downloads, or send email. The Next.js application-submission route and its Supabase integration remain active and unchanged until the Phase 2 application migration is complete.

On activation, and on `plugins_loaded` when a stored schema version is older, the plugin uses WordPress `dbDelta()` to create or upgrade `{$wpdb->prefix}apex_hr_applications`. The table contains candidate and vacancy details, consent and attribution data, application/notification states, private CV metadata and lifecycle timestamps. Upgrades preserve existing records; deactivation does not delete application data.

The plugin defines these capabilities:

- `submit_apex_hr_applications` — reserved for the future server-side integration user; it is not granted automatically.
- `manage_apex_hr_applications` — granted to administrators; gates the Applications and Application Settings screens.
- `download_apex_hr_cvs` — granted to administrators for the future secured download workflow. No download endpoint exists in Phase 1.

Editors, authors and subscribers do not receive private-application capabilities. The **Vacancies → Applications** screen supports search, vacancy and status filters, pagination, application details and nonce-protected status changes. The CV download control is disabled until Phase 2.

### Private CV storage

Set `APEX_HR_PRIVATE_CV_DIR` in `wp-config.php` to an absolute writable directory outside the public document root. If it is not defined, the plugin attempts to create `apex-hr-private-cvs` beside (not inside) the public document root. On supported non-Windows hosts, directory permissions are restricted to `0700`. A configured path that is public, unavailable or unwritable is reported as unavailable; the plugin never falls back to the WordPress Media Library and creates no attachment records.

The Application Settings screen and administrator notice report storage availability. Prepared helpers enforce PDF, DOC and DOCX extension/MIME matching and a 5 MB size limit, generate random server-side filenames, and safely delete files inside the private directory. These helpers are not connected to public upload handling in this phase.

### Application settings and phase boundary

**Vacancies → Application Settings** stores a notification recipient through the WordPress Settings API. The default is `bilkis@apexhrllc.co.uk`; administrators may change it. This value is only configuration in Phase 1—no notification is sent.

Phase 2 will add the authenticated application submission path, secure CV downloads and email notifications. Supabase application code and its migration remain temporarily present and in use by the existing Next.js submission path until that migration is complete. Do not remove or disable Supabase as part of Phase 1.

## Deactivate or remove

Deactivate the plugin from **Plugins**. Deactivation preserves vacancy content, metadata, application records and settings. Deleting the plugin files also preserves database records; remove vacancy posts through WordPress if they should be deleted.
