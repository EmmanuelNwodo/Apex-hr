/**
 * Global site identity constants. Values here are drawn from CLAUDE.md
 * section 1 and section 15 (`siteSettings`). Do not add unverified claims,
 * statistics, addresses or social profile URLs — leave them empty until
 * confirmed.
 */
export const siteConfig = {
  name: "Apex HR",
  legalName: "Apex HR",
  productionUrl: "https://apexhrllc.com",
  defaultLocale: "en-GB",
  titleTemplate: "%s | Apex HR",
  defaultTitle: "Apex HR — HR Company in the UK",
  defaultDescription:
    "Apex HR is a UK HR, recruitment and people-consulting partner for employers, offering outsourced HR, executive search and strategic workforce advisory.",
  /** Left empty until an approved social profile is confirmed. */
  socialProfiles: [] as string[],
};

export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.productionUrl).toString();
}
