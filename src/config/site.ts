/**
 * Global site identity constants. Values here are drawn from CLAUDE.md
 * section 1 and section 15 (`siteSettings`). Do not add unverified claims,
 * statistics, addresses or social profile URLs — leave them empty until
 * confirmed.
 */
export const siteConfig = {
  name: "Apex HR",
  legalName: "Apex HR",
  /**
   * Reads `NEXT_PUBLIC_SITE_URL` (already set in .env.local and on Vercel,
   * per the WordPress/Insights integration decision recorded in
   * docs/URL-DECISION-REGISTER.md) so canonical/OG/sitemap URLs across the
   * whole site — not only WordPress article pages — resolve to the current
   * production domain. Falls back to the previous hard-coded domain when
   * the env var is unset OR set to an empty string (some platforms define
   * a variable with no value rather than omitting it entirely) — `||`
   * deliberately, not `??`, since `undefined ?? fallback` alone would leave
   * an empty string unfallen-back-to and `new URL(path, "")` throws,
   * breaking metadata generation for every page on the site.
   */
  productionUrl: (process.env.NEXT_PUBLIC_SITE_URL || "https://apexhrllc.com").replace(/\/+$/, ""),
  defaultLocale: "en-GB",
  titleTemplate: "%s | Apex HR",
  defaultTitle: "Apex HR — HR Company in the UK",
  defaultDescription:
    "Apex HR is a UK HR, recruitment and people-consulting partner for employers, offering outsourced HR, executive search and strategic workforce advisory.",
  /** Left empty until an approved social profile is confirmed. */
  socialProfiles: [] as string[],
  /** Confirmed via explicit user instruction — used by the floating contact button. */
  contactPhone: {
    display: "+44 7762 272692",
    tel: "+447762272692",
    whatsapp: "447762272692",
  },
  /** Confirmed via the approved contact-page reference design, at the real production domain — used by the contact page and site footer. */
  contactEmail: "info@apexhrllc.com",
};

export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.productionUrl).toString();
}
