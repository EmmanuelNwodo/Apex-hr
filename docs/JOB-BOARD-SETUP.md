# Job Board and application setup

The public Job Board and application form are served by the Next.js site.
WordPress owns published vacancy data and, from plugin version 1.2.0, private
application records and CV files. The authenticated application endpoint is
not a public submission route: browsers post only to the Next.js API, which
validates submissions and forwards them over HTTPS using a dedicated
WordPress Application Password.

Supabase application code, migrations, packages and environment-variable
support remain in the repository during this transition. The active
application-submission route no longer calls Supabase. Remove the retained
Supabase items only after end-to-end WordPress staging tests have passed and
the transition is explicitly approved.

## 1. Install or upgrade the WordPress plugin

1. Upload the ready-to-install
   [`wordpress/apex-hr-vacancies.zip`](../wordpress/apex-hr-vacancies.zip) in
   WordPress under **Plugins → Add New Plugin → Upload Plugin**. To rebuild it,
   ZIP the `wordpress/apex-hr-vacancies/` folder so it remains the top-level
   folder in the archive.
2. Activate or upgrade **Apex HR Vacancies** and confirm plugin version
   **1.2.0**.
3. Confirm the public vacancy feed remains available at
   `https://blog.apexhrllc.co.uk/wp-json/wp/v2/vacancies`. Anonymous requests
   must contain only published vacancies. WordPress vacancy pages and
   vacancy-sitemap entries remain disabled.
4. Create and publish vacancies under **Vacancies → Add Vacancy**. Set
   **Vacancy status** to **Open** before publishing. Only published, open,
   non-expired jobs appear on the public Job Board and vacancy sitemap.

Do not put candidate data or private notes in vacancy fields. The application
endpoint is separate and does not change public vacancy responses.

## 2. Configure private CV storage

Set `APEX_HR_PRIVATE_CV_DIR` in the WordPress `wp-config.php` to an absolute,
writable path outside the public document root, for example:

```php
define( 'APEX_HR_PRIVATE_CV_DIR', '/srv/apex-hr-private-cvs' );
```

The configured path is authoritative: an unsafe or unwritable path does not
fall back elsewhere. If it is not configured, the plugin attempts to create
`apex-hr-private-cvs` beside the public document root. Confirm the web-server
account can write there. On supported Unix hosts, the plugin enforces `0700`
directory and `0600` file permissions. CVs are never sent to the Media
Library, stored beneath `public/uploads`, or assigned a public URL.

The endpoint accepts PDF, DOC and DOCX files up to 5 MB, verifies detected
MIME type and file contents, and uses an unpredictable server-generated
filename. The sanitised original filename is retained only for authorised
administrative display and download.

## 3. Create the WordPress integration user

The plugin creates or upgrades the dedicated `apex_hr_application_submitter`
role with only:

- `read`
- `submit_apex_hr_applications`

It does not grant application management, CV download, post editing,
publishing, media upload or administrator capabilities. Administrators retain
the existing application-management and CV-download capabilities; the submit
capability is not automatically assigned to them.

1. In the WordPress dashboard, open **Users → Add New User**.
2. Create a unique integration account, use a strong generated username
   password, and assign **Apex HR Application Submitter** as its role. Do not
   use an administrator account for the Next.js connection.
3. Open the integration user's profile and under **Application Passwords**
   enter a descriptive name such as `Apex HR staging website`; select
   **Add New Application Password**.
4. Copy the generated password directly into the server-side deployment
   secret. It may be entered with or without the display spaces. Do not put it
   in source control, client-side variables, logs, tickets or repository
   documentation. Application Password authentication must use HTTPS.
5. Revoke the Application Password from the same profile if it is exposed,
   no longer needed, or after a rollback that disables the integration.

The REST endpoint is:

```text
POST https://<wordpress-host>/wp-json/apex-hr/v1/applications
```

It is registered on `rest_api_init`, requires WordPress authentication and the
`submit_apex_hr_applications` capability, accepts multipart form data and has
no anonymous, nonce-based or CORS authentication bypass. It exposes no
candidate-data GET endpoint.

## 4. Configure notifications and deployment variables

The internal notification recipient is configured in **Vacancies →
Application Settings** and defaults to `bilkis@apexhrllc.co.uk`. Configure
WordPress SMTP through the site's approved mail configuration for reliable
delivery. This plugin calls `wp_mail()`; it does not implement an external
SMTP provider. The CV is never attached. The candidate's validated email is
used as Reply-To. A mail failure leaves the application intact and records a
failed notification status without exposing mail diagnostics to the candidate.

Configure these server-side variables in local `.env.local` and the matching
Vercel environment. Set independent values for staging, preview and
production; never prefix credentials with `NEXT_PUBLIC_`.

| Variable | Purpose |
| --- | --- |
| `WORDPRESS_APPLICATIONS_API_URL` | Full HTTPS endpoint URL, e.g. `https://blog.apexhrllc.co.uk/wp-json/apex-hr/v1/applications` |
| `WORDPRESS_APPLICATIONS_USERNAME` | Dedicated WordPress integration username |
| `WORDPRESS_APPLICATIONS_APP_PASSWORD` | WordPress Application Password for that user; keep only in deployment secrets |
| `NEXT_PUBLIC_SITE_URL` | Public site origin used to verify Turnstile and construct source-page attribution |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public Cloudflare Turnstile widget key |
| `TURNSTILE_SECRET_KEY` | Server-only Turnstile verification secret |

The Next.js API validates the existing form schema and CV, verifies Turnstile
server-side, and forwards the multipart application with an idempotency UUID.
The browser never receives the WordPress username or Application Password.
Safe candidate-facing errors are returned for validation, authentication,
timeout and upstream failures; sensitive WordPress response bodies are not
forwarded or logged.

## 5. Secure application management and CV downloads

The WordPress custom table is `{$wpdb->prefix}apex_hr_applications`. Schema
upgrades use `dbDelta()` and preserve existing records. Applications are
created with a public UUID, an idempotency key, authoritative vacancy
information, UTC consent/submission timestamps, source/UTM attribution,
`New` application status and `pending` notification status. Candidate IP
addresses are not stored.

An administrator with `manage_apex_hr_applications` can view applications.
CV downloads additionally require `download_apex_hr_cvs` and an
application-specific nonce. Downloads are streamed as attachments after the
stored random filename is resolved inside the configured private directory.
No permanent download URL or filesystem path is exposed in the application
screen or public API.

## 6. Staging end-to-end test procedure

Use a non-production WordPress site, a non-production Vercel deployment and a
separate private directory. Do not test by submitting candidate information
to the live WordPress installation.

1. Install/upgrade plugin 1.2.0 on staging. In **Vacancies → Application
   Settings**, confirm the table and private directory are available. Confirm
   the directory is outside the public webroot and writable by the web-server
   account.
2. Configure WordPress SMTP to a controlled staging inbox. Confirm the saved
   notification recipient is correct for the staging test.
3. Create a staging-only integration user with the
   **Apex HR Application Submitter** role. Confirm it has only `read` and
   `submit_apex_hr_applications`, and cannot manage applications, download
   CVs, edit/publish posts or upload media. Generate a dedicated Application
   Password over HTTPS.
4. Configure the staging Vercel variables listed above with the staging API
   endpoint, user, password, Turnstile keys and staging site origin. Verify
   the password is absent from browser bundles and client-visible environment
   output.
5. Publish a staging vacancy with **Open** status and a future or empty
   closing date. Confirm it appears on `/jobs/`, its detail page works, and
   its existing `JobPosting` data and vacancy sitemap entry are unchanged.
6. Submit a valid test application with a synthetic CV. Confirm a single
   record appears in WordPress with a UUID, authoritative vacancy values,
   `New` status, consent version/time, attribution and notification status.
   Confirm the CV is outside the public webroot, not in the Media Library and
   not reachable by a public URL. Confirm the internal plain-text notification
   arrives without an attachment and the candidate-facing success state
   appears.
7. Retry the same request with the same idempotency key. Confirm the existing
   UUID is returned, no second application or CV file is created, and no
   duplicate email is sent.
8. Confirm the application details screen is available only to an authorised
   administrator. Test a valid nonce download and verify it streams the
   original filename as an attachment. Verify missing/invalid nonce, no
   capability, missing file and path traversal attempts do not disclose a
   filesystem path or file.
9. Submit invalid or oversized files, missing consent, invalid LinkedIn,
   failed Turnstile, and applications against draft, closed, filled,
   expired and slug/ID-mismatched vacancies. Each must fail safely with no
   incomplete application or orphan CV.
10. Temporarily use an invalid WordPress credential and an unavailable
    endpoint. Confirm the candidate receives only a safe error and logs do
    not contain credentials, CV contents or the full candidate payload.
    Separately simulate WordPress mail failure; the application must remain
    stored with a failed notification status.
11. Re-run the Job Board, vacancy detail, filtering, sitemap and structured
    data tests to confirm vacancy publishing behaviour remains intact.
12. Remove staging test personal data and files according to the approved
    retention process after capturing non-sensitive test evidence.

Do not remove Supabase application code, migrations, packages or environment
support until this staging procedure has passed and the WordPress workflow is
approved for the next release.

## 7. Rollback

If the WordPress submission path is not ready or fails staging:

1. Disable the Next.js change by rolling the staging/production site back to
   its last known-good deployment that still uses the Supabase application
   route. Do not delete or reset Supabase data or migrations.
2. Revoke the integration user's WordPress Application Password. If the
   integration user is no longer needed, disable it through WordPress user
   management.
3. Keep the WordPress plugin and application table in place. Do not delete
   stored applications or private CVs as part of rollback; preserve them for
   authorised review and follow retention policy.
4. Remove the WordPress application credentials from the affected Vercel
   environment. Do not remove Supabase environment variables until the
   previous submission flow is confirmed operational.
5. Investigate notification/storage issues in staging before re-enabling the
   Next.js integration. Do not modify vacancy endpoints or content as a
   workaround.
