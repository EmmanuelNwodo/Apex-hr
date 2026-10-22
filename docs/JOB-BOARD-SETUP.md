# Job Board setup

The public Job Board is rendered by the Next.js site at `/jobs/`. WordPress
stores vacancy records and serves them through its REST API; it is not the
public vacancy presentation layer. Phase 1 adds the WordPress application
database, private-storage and admin foundation. The existing Next.js
application-submission route still uses Supabase until the Phase 2 migration is
complete. See URL Decision Register D-019.

## 1. Install the WordPress vacancy plugin

1. Upload the ready-to-install
   [`wordpress/apex-hr-vacancies.zip`](../wordpress/apex-hr-vacancies.zip) in
   WordPress under **Plugins → Add New Plugin → Upload Plugin**. To rebuild
   it, ZIP the `wordpress/apex-hr-vacancies/` folder so that it remains the
   top-level folder inside the archive.
2. Activate **Apex HR Vacancies**.
3. Confirm the WordPress REST API is available at
   `https://blog.apexhrllc.co.uk/wp-json/wp/v2/vacancies`.
4. Verify anonymous API requests return only published vacancies. Vacancy
   pages on the WordPress origin intentionally return 404, and vacancy posts
   are excluded from WordPress core and Yoast sitemaps.
5. Create a vacancy under **Vacancies → Add Vacancy**. Set its title, slug,
   summary, description, required details and featured image. Save as draft
   until approved; before publishing, set **Vacancy status** to **Open**.
6. To stop accepting applications, change the vacancy status to **Closed** or
   **Filled**, or unpublish the post. Only published, open, non-expired jobs
   appear in the public archive, detail sitemap and `JobPosting` schema.

Vacancy field definitions and their REST metadata names are in the plugin's
[README](../wordpress/apex-hr-vacancies/README.md). Do not put candidate
information, CVs or private notes in WordPress vacancy fields.

## 2. Configure WordPress application administration (Phase 1)

After activating or upgrading the plugin, WordPress creates or upgrades the
`{$wpdb->prefix}apex_hr_applications` table with `dbDelta()`. The schema version
is stored in the `apex_hr_applications_schema_version` option. The plugin does
not remove application records on deactivation or upgrade.

Configure private storage in `wp-config.php` using an absolute path outside
the public document root:

```php
define( 'APEX_HR_PRIVATE_CV_DIR', '/srv/apex-hr-private-cvs' );
```

If the constant is not set, the plugin attempts to create
`apex-hr-private-cvs` beside the public document root. A public, missing or
unwritable location is reported in the WordPress admin; CVs are never placed
in the Media Library. The plugin's **Vacancies → Application Settings** page
shows the table and storage status, the 5 MB limit and PDF/DOC/DOCX types.

The **Vacancies → Applications** screen is restricted to
`manage_apex_hr_applications`. Administrators receive that capability and
`download_apex_hr_cvs`; the future `submit_apex_hr_applications` capability is
defined but not automatically assigned. The notification recipient defaults
to `bilkis@apexhrllc.co.uk` and is configurable on the settings page. Phase 1
does not submit applications, upload or download CVs, or send email.

## 3. Configure the website

Set these variables in local `.env.local` and in the matching Vercel
deployment environment. Variable names are also listed in `.env.example`.
Never put secret values in source control.

| Variable | Purpose |
| --- | --- |
| `WORDPRESS_API_URL` | WordPress REST API base, e.g. `https://blog.apexhrllc.co.uk/wp-json/wp/v2` |
| `WORDPRESS_SITE_URL` | WordPress CMS origin, e.g. `https://blog.apexhrllc.co.uk` |
| `NEXT_PUBLIC_SITE_URL` | Public canonical origin for the Next.js deployment |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project API URL used by the current Next.js submission path |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only credential still used for current application persistence and private file storage |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public Cloudflare Turnstile widget key |
| `TURNSTILE_SECRET_KEY` | Server-only Turnstile verification secret |
| `RESEND_API_KEY` | Server-only Resend transactional email key |
| `TRANSACTIONAL_EMAIL_FROM` | Verified sender address for application messages |
| `INTERNAL_LEAD_NOTIFICATION_EMAIL` | Optional internal application notification recipient; falls back to the site contact email |

Do not prefix server-only credentials with `NEXT_PUBLIC_`. Configure the
production Vercel project and any Preview environments separately; preview
applications must use a Turnstile hostname configured for that deployment.

## 4. Keep the current Supabase submission path operational

Review and apply
[`supabase/migrations/20260903090000_job_applications.sql`](../supabase/migrations/20260903090000_job_applications.sql)
to the intended Supabase project if it has not already been applied. This
remains required by the existing Next.js application-submission route until
Phase 2 is implemented and the Next.js migration is complete. It creates
application and consent records, the rate-limit RPC, and the private
`apex-hr-candidate-documents` bucket. Deploy the matching
`SUPABASE_SERVICE_ROLE_KEY` only as a Vercel server-side environment variable.

The website validates uploads as PDF, DOC or DOCX, limits files to 5 MB,
stores them in the private bucket and marks them pending malware scanning.
Staff must follow the organisation's malware-scanning and retention procedures
before opening CVs. Do not enable public bucket access or use public CV URLs.
If an application persists with `notification_status = pending`, delivery must
be investigated and retried through an approved secure process; this release
does not include an automated retry worker.

## 5. Verify publication and migration boundaries

1. Publish a test vacancy with **Open** status and a future or empty closing
   date. Confirm it appears in `/jobs/`, its detail page renders at
   `/jobs/{slug}/`, and the sitemap index points to `/vacancy-sitemap.xml`.
2. Confirm the vacancy detail page has matching canonical metadata and
   `JobPosting` JSON-LD.
3. Set the vacancy to **Closed**, **Filled**, or an elapsed closing date.
   Confirm it disappears from the archive and vacancy sitemap, and its page
   no longer offers an application or `JobPosting` data.
4. Until Phase 2 is complete, verify any test application against the existing
   Supabase submission path and remove test personal data according to the
   approved retention process. The WordPress application table is an empty
   foundation in Phase 1; do not expect public submissions to appear there.
5. Confirm the WordPress front end and its sitemaps do not expose vacancy
   pages or duplicate canonical URLs.

Phase 2 will connect the Next.js submission route to WordPress, add secure CV
downloads and send configured notification email. Only after the Next.js
migration has been completed and verified should Supabase application code or
credentials be removed.
