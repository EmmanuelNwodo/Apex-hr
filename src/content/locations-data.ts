import type { ContentFaqItem } from "@/types/content";

/**
 * Original first-draft location content. Per CLAUDE.md section 9 and this
 * phase's location rules: no physical office is claimed for any location
 * (no `office` reference exists), no local address or phone number is
 * invented, and each entry uses genuinely distinct regional/economic
 * context rather than swapping a city name into identical copy. Slugs and
 * spellings cross-checked against src/config sectors/locations and the
 * corrected canonical spellings (Nottingham, Worcester, Staffordshire).
 */

export interface LocationContent {
  slug: string;
  region: string;
  metaDescription: string;
  coverageStatement: string;
  localContext: string;
  relatedServiceSlugs: string[];
  relatedSectorSlugs: string[];
  faqs: ContentFaqItem[];
}

const noOfficeFaq: ContentFaqItem = {
  id: "office",
  question: "Does Apex HR have a physical office here?",
  answer: "Apex HR supports employers in this location remotely and, where useful, on-site: this page does not represent a confirmed local office.",
};

export const locationContent: LocationContent[] = [
  {
    slug: "london",
    region: "Greater London",
    metaDescription: "HR and recruitment support for employers in London, across financial, professional and technology sectors.",
    coverageStatement: "Apex HR can support employers hiring and managing people across London, including remote and hybrid teams based in the capital.",
    localContext:
      "London's labour market is large, competitive and fast-moving, with strong demand across financial services, professional services and technology. Employers here typically compete on both reward and employer brand to attract talent.",
    relatedServiceSlugs: ["executive-search-firm-in-the-uk", "salary-benchmarking-firm-in-the-uk", "employer-branding-and-employee-value-proposition-evp-firm-in-the-uk"],
    relatedSectorSlugs: ["hr-company-for-financial-services-in-the-uk", "hr-company-for-professional-services-in-the-uk", "hr-company-for-it-in-the-uk"],
    faqs: [noOfficeFaq],
  },
  {
    slug: "manchester",
    region: "North West England",
    metaDescription: "HR and recruitment support for employers in Manchester, covering technology, professional services and manufacturing.",
    coverageStatement: "Apex HR can support employers hiring and managing people across Manchester and the wider North West.",
    localContext:
      "Manchester has a strong and growing technology and digital sector alongside established professional services and manufacturing employers, creating varied recruitment demand across the city region.",
    relatedServiceSlugs: ["permanent-recruitment-firm-in-the-uk", "hris-implementation-firm-in-the-uk", "strategic-workforce-planning-firm-in-the-uk"],
    relatedSectorSlugs: ["hr-company-for-it-in-the-uk", "hr-company-for-professional-services-in-the-uk", "hr-company-for-manufacturers-in-the-uk"],
    faqs: [noOfficeFaq],
  },
  {
    slug: "birmingham",
    region: "West Midlands",
    metaDescription: "HR and recruitment support for employers in Birmingham, covering manufacturing, professional services and logistics.",
    coverageStatement: "Apex HR can support employers hiring and managing people across Birmingham and the wider West Midlands.",
    localContext:
      "Birmingham's economy spans manufacturing, professional services, logistics and a growing services sector, with strong transport links supporting regional and national hiring.",
    relatedServiceSlugs: ["permanent-recruitment-firm-in-the-uk", "hr-compliance-audit-firm-in-the-uk", "strategic-workforce-planning-firm-in-the-uk"],
    relatedSectorSlugs: ["hr-company-for-manufacturers-in-the-uk", "hr-company-for-distribution-in-the-uk", "hr-company-for-professional-services-in-the-uk"],
    faqs: [noOfficeFaq],
  },
  {
    slug: "leeds",
    region: "Yorkshire and the Humber",
    metaDescription: "HR and recruitment support for employers in Leeds, covering financial services, professional services and technology.",
    coverageStatement: "Apex HR can support employers hiring and managing people across Leeds and the wider Yorkshire region.",
    localContext:
      "Leeds has an established financial and professional services base alongside a growing digital and technology sector, with strong regional connectivity across Yorkshire.",
    relatedServiceSlugs: ["salary-benchmarking-firm-in-the-uk", "permanent-recruitment-firm-in-the-uk", "hris-implementation-firm-in-the-uk"],
    relatedSectorSlugs: ["hr-company-for-financial-services-in-the-uk", "hr-company-for-professional-services-in-the-uk", "hr-company-for-it-in-the-uk"],
    faqs: [noOfficeFaq],
  },
  {
    slug: "bristol",
    region: "South West England",
    metaDescription: "HR and recruitment support for employers in Bristol, covering technology, engineering and professional services.",
    coverageStatement: "Apex HR can support employers hiring and managing people across Bristol and the wider South West.",
    localContext:
      "Bristol has a strong technology, creative and engineering base, with competitive demand for digital and technical talent across the city.",
    relatedServiceSlugs: ["permanent-recruitment-firm-in-the-uk", "salary-benchmarking-firm-in-the-uk", "hr-support-for-small-businesses-and-startups-firm-in-the-uk"],
    relatedSectorSlugs: ["hr-company-for-it-in-the-uk", "hr-company-for-engineers-in-the-uk", "hr-company-for-professional-services-in-the-uk"],
    faqs: [noOfficeFaq],
  },
  {
    slug: "edinburgh",
    region: "Scotland",
    metaDescription: "HR and recruitment support for employers in Edinburgh, covering financial services and professional services.",
    coverageStatement: "Apex HR can support employers hiring and managing people across Edinburgh and the wider Scottish market.",
    localContext:
      "Edinburgh has a well-established financial and professional services sector, alongside a growing technology scene, with its own distinct employment-law and market context within Scotland.",
    relatedServiceSlugs: ["executive-search-firm-in-the-uk", "salary-benchmarking-firm-in-the-uk", "hr-compliance-audit-firm-in-the-uk"],
    relatedSectorSlugs: ["hr-company-for-financial-services-in-the-uk", "hr-company-for-professional-services-in-the-uk", "hr-company-for-it-in-the-uk"],
    faqs: [
      noOfficeFaq,
      { id: "scots-law", question: "Does Scottish employment practice differ?", answer: "Some employment-law and practical HR considerations differ in Scotland; specific legal questions should be confirmed with a qualified adviser familiar with the relevant jurisdiction." },
    ],
  },
  {
    slug: "glasgow",
    region: "Scotland",
    metaDescription: "HR and recruitment support for employers in Glasgow, covering manufacturing, professional services and technology.",
    coverageStatement: "Apex HR can support employers hiring and managing people across Glasgow and the wider West of Scotland.",
    localContext:
      "Glasgow combines a manufacturing and engineering heritage with a growing professional services and technology sector, supported by strong regional transport links.",
    relatedServiceSlugs: ["permanent-recruitment-firm-in-the-uk", "strategic-workforce-planning-firm-in-the-uk", "hr-compliance-audit-firm-in-the-uk"],
    relatedSectorSlugs: ["hr-company-for-manufacturers-in-the-uk", "hr-company-for-professional-services-in-the-uk", "hr-company-for-it-in-the-uk"],
    faqs: [noOfficeFaq],
  },
  {
    slug: "nottingham",
    region: "East Midlands",
    metaDescription: "HR and recruitment support for employers in Nottingham, covering life sciences, manufacturing and distribution.",
    coverageStatement: "Apex HR can support employers hiring and managing people across Nottingham and the wider East Midlands.",
    localContext:
      "Nottingham has a strong life sciences and healthcare research base alongside established manufacturing and distribution employers across the East Midlands.",
    relatedServiceSlugs: ["permanent-recruitment-firm-in-the-uk", "hr-compliance-audit-firm-in-the-uk", "strategic-workforce-planning-firm-in-the-uk"],
    relatedSectorSlugs: ["hr-company-for-life-sciences-in-the-uk", "hr-company-for-manufacturers-in-the-uk", "hr-company-for-distribution-in-the-uk"],
    faqs: [noOfficeFaq],
  },
  {
    slug: "newcastle",
    region: "North East England",
    metaDescription: "HR and recruitment support for employers in Newcastle, covering professional services, technology and manufacturing.",
    coverageStatement: "Apex HR can support employers hiring and managing people across Newcastle and the wider North East.",
    localContext:
      "Newcastle has a developing digital and technology sector alongside established professional services and manufacturing employers across the North East.",
    relatedServiceSlugs: ["permanent-recruitment-firm-in-the-uk", "hr-support-for-small-businesses-and-startups-firm-in-the-uk", "salary-benchmarking-firm-in-the-uk"],
    relatedSectorSlugs: ["hr-company-for-it-in-the-uk", "hr-company-for-professional-services-in-the-uk", "hr-company-for-manufacturers-in-the-uk"],
    faqs: [noOfficeFaq],
  },
  {
    slug: "warwickshire",
    region: "West Midlands",
    metaDescription: "HR and recruitment support for employers in Warwickshire, covering engineering, manufacturing and professional services.",
    coverageStatement: "Apex HR can support employers hiring and managing people across Warwickshire.",
    localContext:
      "Warwickshire's economy includes a strong engineering and advanced manufacturing base, alongside professional services supporting the wider West Midlands region.",
    relatedServiceSlugs: ["permanent-recruitment-firm-in-the-uk", "competency-frameworks-firm-in-the-uk", "strategic-workforce-planning-firm-in-the-uk"],
    relatedSectorSlugs: ["hr-company-for-engineers-in-the-uk", "hr-company-for-manufacturers-in-the-uk", "hr-company-for-professional-services-in-the-uk"],
    faqs: [noOfficeFaq],
  },
  {
    slug: "worcester",
    region: "West Midlands",
    metaDescription: "HR and recruitment support for employers in Worcester, covering manufacturing, professional services and construction.",
    coverageStatement: "Apex HR can support employers hiring and managing people across Worcester and the surrounding area.",
    localContext:
      "Worcester's economy includes a mix of manufacturing, professional services and construction employers, supported by good regional transport connections.",
    relatedServiceSlugs: ["permanent-recruitment-firm-in-the-uk", "hr-support-for-small-businesses-and-startups-firm-in-the-uk", "hr-compliance-audit-firm-in-the-uk"],
    relatedSectorSlugs: ["hr-company-for-manufacturers-in-the-uk", "hr-company-for-construction-in-the-uk", "hr-company-for-professional-services-in-the-uk"],
    faqs: [noOfficeFaq],
  },
  {
    slug: "yorkshire",
    region: "Yorkshire and the Humber",
    metaDescription: "HR and recruitment support for employers across Yorkshire, covering manufacturing, distribution and professional services.",
    coverageStatement: "Apex HR can support employers hiring and managing people across Yorkshire.",
    localContext:
      "Yorkshire covers a broad and varied economy, from manufacturing and distribution to financial and professional services concentrated around its major cities.",
    relatedServiceSlugs: ["permanent-recruitment-firm-in-the-uk", "strategic-workforce-planning-firm-in-the-uk", "salary-benchmarking-firm-in-the-uk"],
    relatedSectorSlugs: ["hr-company-for-manufacturers-in-the-uk", "hr-company-for-distribution-in-the-uk", "hr-company-for-professional-services-in-the-uk"],
    faqs: [noOfficeFaq],
  },
  {
    slug: "staffordshire",
    region: "West Midlands",
    metaDescription: "HR and recruitment support for employers in Staffordshire, covering manufacturing, logistics and construction.",
    coverageStatement: "Apex HR can support employers hiring and managing people across Staffordshire.",
    localContext:
      "Staffordshire has a strong manufacturing and logistics base, supported by its central location and transport connections across the wider Midlands.",
    relatedServiceSlugs: ["permanent-recruitment-firm-in-the-uk", "redundancy-and-restructuring-support-firm-in-the-uk", "hr-compliance-audit-firm-in-the-uk"],
    relatedSectorSlugs: ["hr-company-for-manufacturers-in-the-uk", "hr-company-for-distribution-in-the-uk", "hr-company-for-construction-in-the-uk"],
    faqs: [noOfficeFaq],
  },
  {
    slug: "liverpool",
    region: "North West England",
    metaDescription: "HR and recruitment support for employers in Liverpool, covering logistics, professional services and manufacturing.",
    coverageStatement: "Apex HR can support employers hiring and managing people across Liverpool and the wider Merseyside region.",
    localContext:
      "Liverpool's economy is shaped by its port and logistics heritage alongside growing professional and creative services sectors.",
    relatedServiceSlugs: ["permanent-recruitment-firm-in-the-uk", "recruitment-process-outsourcing-rpo-firm-in-the-uk", "hr-compliance-audit-firm-in-the-uk"],
    relatedSectorSlugs: ["hr-company-for-distribution-in-the-uk", "hr-company-for-professional-services-in-the-uk", "hr-company-for-manufacturers-in-the-uk"],
    faqs: [noOfficeFaq],
  },
  {
    slug: "oxford",
    region: "South East England",
    metaDescription: "HR and recruitment support for employers in Oxford, covering life sciences, technology and professional services.",
    coverageStatement: "Apex HR can support employers hiring and managing people across Oxford and the surrounding area.",
    localContext:
      "Oxford has a significant life sciences and research base alongside a growing technology sector, with strong competition for specialist scientific and technical talent.",
    relatedServiceSlugs: ["executive-search-firm-in-the-uk", "strategic-workforce-planning-firm-in-the-uk", "salary-benchmarking-firm-in-the-uk"],
    relatedSectorSlugs: ["hr-company-for-life-sciences-in-the-uk", "hr-company-for-it-in-the-uk", "hr-company-for-professional-services-in-the-uk"],
    faqs: [noOfficeFaq],
  },
  {
    slug: "leicester",
    region: "East Midlands",
    metaDescription: "HR and recruitment support for employers in Leicester, covering manufacturing, distribution and professional services.",
    coverageStatement: "Apex HR can support employers hiring and managing people across Leicester and the wider East Midlands.",
    localContext:
      "Leicester has a diverse economy spanning manufacturing, distribution and professional services, with a well-connected central location within the East Midlands.",
    relatedServiceSlugs: ["permanent-recruitment-firm-in-the-uk", "hr-compliance-audit-firm-in-the-uk", "strategic-workforce-planning-firm-in-the-uk"],
    relatedSectorSlugs: ["hr-company-for-manufacturers-in-the-uk", "hr-company-for-distribution-in-the-uk", "hr-company-for-professional-services-in-the-uk"],
    faqs: [noOfficeFaq],
  },
];
