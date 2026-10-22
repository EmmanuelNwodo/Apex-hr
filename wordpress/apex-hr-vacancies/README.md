# Apex HR Vacancies

A small, self-contained WordPress plugin for managing Apex HR vacancies and private job applications. Version 1.2.0 registers the `vacancy` post type, provides a details metabox, registers vacancy metadata with the REST API, limits anonymous REST vacancy responses to published posts, and accepts authenticated Next.js application submissions.

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

## Application management and private CV handling (version 1.2.0)

The Next.js application form posts to the site's server-side API, which validates fields and Cloudflare Turnstile and forwards the application to WordPress over HTTPS. The browser never receives WordPress credentials. WordPress stores applications in `{$wpdb->prefix}apex_hr_applications` and stores CVs in a private directory outside the public webroot. Candidate data is not exposed through a public GET endpoint.

The endpoint is:

```text
POST /wp-json/apex-hr/v1/applications
```

It is registered on `rest_api_init`, accepts `multipart/form-data`, and has a `permission_callback`. Requests require a logged-in WordPress user with `submit_apex_hr_applications`; WordPress Application Password authentication must be used over HTTPS. Anonymous submissions, public nonce workarounds and permissive CORS are not supported. The endpoint verifies that the submitted vacancy is a published `vacancy` post, has **Open** status, matches its authoritative slug and has not passed its closing date.

On activation, and on `plugins_loaded` when a stored schema version is older, the plugin uses WordPress `dbDelta()` to create or upgrade the application table. It records a cryptographically random public UUID and unique idempotency key, authoritative vacancy details, consent, source/UTM attribution, private CV metadata, `New` application status and `pending` notification status. Dates are UTC. Existing records are preserved; candidate IP addresses are not stored.

### Roles and capabilities

- `apex_hr_application_submitter` — dedicated integration role with only `read` and `submit_apex_hr_applications`. It does not receive post editing/publishing, media upload, application management or CV download capabilities.
- `manage_apex_hr_applications` — granted to administrators; gates the Applications and Application Settings screens.
- `download_apex_hr_cvs` — granted to administrators; required in addition to an application-specific nonce for a CV download.

Role creation and capability upgrades are idempotent. Administrators do not automatically receive `submit_apex_hr_applications`. Create a dedicated WordPress user with the integration role, then generate an Application Password in that user's profile. Store the username and password only in server-side environment variables. See [Job Board setup](../../docs/JOB-BOARD-SETUP.md) for the staging procedure and deployment settings.

The **Vacancies → Applications** screen supports search, vacancy and status filters, pagination, application details and nonce-protected status changes. A CV is streamed as an attachment only to a logged-in user with `download_apex_hr_cvs` and a valid per-application nonce. No permanent download URL or filesystem path is exposed.

### Private CV storage

Set `APEX_HR_PRIVATE_CV_DIR` in `wp-config.php` to an absolute writable directory outside the public document root. If it is not defined, the plugin attempts to create `apex-hr-private-cvs` beside (not inside) the public document root. On supported non-Windows hosts, directory and file permissions are restricted to `0700` and `0600`. A configured path that is public, unavailable or unwritable is reported as unavailable; the plugin never falls back to the WordPress Media Library and creates no attachment records.

Only PDF, DOC and DOCX files up to 5 MB are accepted. The endpoint checks file extension, detected MIME type and file contents, uses an unpredictable server-generated filename, and retains a sanitised original filename for administrator display. Files are not attached to notification email and never receive a public URL. If database insertion fails, the newly uploaded file is removed.

### Notifications and migration boundary

**Vacancies → Application Settings** stores the internal notification recipient through the WordPress Settings API. It defaults to `bilkis@apexhrllc.co.uk` and administrators may change it. After a successful database insert, the plugin sends a plain-text `wp_mail()` notification including candidate/contact details, vacancy details, UUID, source attribution and a protected admin link. The candidate email is used as Reply-To. Mail failure does not delete the application; notification status is set to `Failed` with a safe error description. Configure WordPress SMTP for reliable delivery; this plugin does not implement an external SMTP provider.

The active Next.js submission route forwards to WordPress. Supabase application code, migrations, packages and environment variables are deliberately retained until end-to-end staging has passed and removal is approved. Do not delete or disable those remaining items as part of this plugin release.

## Deactivate or remove

Deactivate the plugin from **Plugins**. Deactivation preserves vacancy content, metadata, application records and settings. Deleting the plugin files also preserves database records; remove vacancy posts through WordPress if they should be deleted.
