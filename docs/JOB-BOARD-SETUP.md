# Job Board setup

The public Job Board is rendered by the Next.js site at `/jobs/`. WordPress
stores vacancy records and serves them through its REST API; it is not the
public vacancy presentation layer. Supabase stores applications and private CV
files. See URL Decision Register D-019.

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

## 2. Configure the website

Set these variables in local `.env.local` and in the matching Vercel
deployment environment. Variable names are also listed in `.env.example`.
Never put secret values in source control.

| Variable | Purpose |
| --- | --- |
| `WORDPRESS_API_URL` | WordPress REST API base, e.g. `https://blog.apexhrllc.co.uk/wp-json/wp/v2` |
| `WORDPRESS_SITE_URL` | WordPress CMS origin, e.g. `https://blog.apexhrllc.co.uk` |
| `NEXT_PUBLIC_SITE_URL` | Public canonical origin for the Next.js deployment |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project API URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only credential for application persistence and private file storage |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public Cloudflare Turnstile widget key |
| `TURNSTILE_SECRET_KEY` | Server-only Turnstile verification secret |
| `RESEND_API_KEY` | Server-only Resend transactional email key |
| `TRANSACTIONAL_EMAIL_FROM` | Verified sender address for application messages |
| `INTERNAL_LEAD_NOTIFICATION_EMAIL` | Optional internal application notification recipient; falls back to the site contact email |

Do not prefix server-only credentials with `NEXT_PUBLIC_`. Configure the
production Vercel project and any Preview environments separately; preview
applications must use a Turnstile hostname configured for that deployment.

## 3. Apply the Supabase migration

Review and apply
[`supabase/migrations/20260903090000_job_applications.sql`](../supabase/migrations/20260903090000_job_applications.sql)
to the intended Supabase project. It creates application and consent records,
the rate-limit RPC, and the private `apex-hr-candidate-documents` bucket.
Deploy the matching `SUPABASE_SERVICE_ROLE_KEY` only as a Vercel server-side
environment variable.

The website validates uploads as PDF, DOC or DOCX, limits files to 5 MB,
stores them in the private bucket and marks them pending malware scanning.
Staff must follow the organisation's malware-scanning and retention procedures
before opening CVs. Do not enable public bucket access or use public CV URLs.
If an application persists with `notification_status = pending`, delivery must
be investigated and retried through an approved secure process; this release
does not include an automated retry worker.

## 4. Verify publication

1. Publish a test vacancy with **Open** status and a future or empty closing
   date. Confirm it appears in `/jobs/`, its detail page renders at
   `/jobs/{slug}/`, and the sitemap index points to `/vacancy-sitemap.xml`.
2. Confirm the vacancy detail page has matching canonical metadata and
   `JobPosting` JSON-LD.
3. Set the vacancy to **Closed**, **Filled**, or an elapsed closing date.
   Confirm it disappears from the archive and vacancy sitemap, and its page
   no longer offers an application or `JobPosting` data.
4. Submit a test application using the configured Turnstile widget. Confirm
   the database row, consent record, private CV object and notification status
   are correct. Remove test personal data according to the approved retention
   process.
5. Confirm the WordPress front end and its sitemaps do not expose vacancy
   pages or duplicate canonical URLs.
