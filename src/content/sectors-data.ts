import type { ContentFaqItem } from "@/types/content";

/**
 * Original first-draft sector content — see src/content/services-data.ts
 * for the authoring rules this file also follows. Slugs cross-checked
 * against src/config/sectors.ts and the Master Routes sheet (17
 * Confirmed/Corrected sectors). Deliberately uses "can support" language
 * throughout rather than claiming existing clients or placements in any
 * sector, per CLAUDE.md section 32 and this phase's sector-content rules.
 */

export interface SectorContent {
  slug: string;
  /** Short, sector-specific hero sub-headline. */
  tagline: string;
  metaDescription: string;
  overview: string;
  challenges: string[];
  recruitmentConsiderations: string;
  howApexHelps: string;
  relatedServiceSlugs: string[];
  relatedTalentRoleSlugs: string[];
  faqs: ContentFaqItem[];
}

export const sectorContent: SectorContent[] = [
  {
    slug: "startups-scale-ups",
    tagline: "People expertise built for fast-moving teams.",
    metaDescription: "Apex HR is a specialist HR company for startups and scale-ups in the UK, helping fast-moving, lean teams build practical HR foundations as they grow.",
    overview:
      "Startups and scale-ups grow fast and change direction often, which puts particular pressure on HR foundations and hiring speed.",
    challenges: [
      "Building HR foundations while resources are stretched thin",
      "Hiring quickly without compromising on fit",
      "Retaining early employees through periods of rapid change",
      "Scaling management capability as the team grows",
    ],
    recruitmentConsiderations:
      "Early hires often need to be generalists comfortable with ambiguity, and hiring speed matters — but so does getting the foundational team right, since early mistakes are costly to unwind.",
    howApexHelps:
      "Apex HR can support startups and scale-ups with right-sized HR foundations, fast and structured recruitment, and fractional HR leadership that flexes as the business grows.",
    relatedServiceSlugs: ["hr-support-for-small-businesses-and-startups", "fractional-hr-director-chief-people-officer", "permanent-recruitment"],
    relatedTalentRoleSlugs: ["chief-executives-senior-officials", "data-analysts", "it-business-analysts-architects-systems-designers"],
    faqs: [
      { id: "stage", question: "What stage of business does this suit?", answer: "Support can flex from very early-stage startups through to scale-ups managing rapid headcount growth." },
    ],
  },
  {
    slug: "professional-services",
    tagline: "People expertise for firms that compete on talent.",
    metaDescription: "Apex HR is a specialist HR company for professional services firms in the UK, supporting everything from HR foundations to leadership hiring.",
    overview:
      "Professional services firms compete on the quality of their people, making recruitment, development and retention central to the business itself.",
    challenges: [
      "Competing for skilled talent in a crowded market",
      "Consistent performance management across client-facing teams",
      "Succession planning for partner or senior leadership transitions",
      "Retaining talent through career progression pressure",
    ],
    recruitmentConsiderations:
      "Hiring in professional services often involves assessing technical expertise alongside client-facing skills, with reputation and trust being central to fit.",
    howApexHelps:
      "Apex HR can support professional services firms with recruitment, performance frameworks, succession planning and reward structures suited to a people-led business.",
    relatedServiceSlugs: ["executive-search", "succession-planning-and-talent-mapping", "performance-management"],
    relatedTalentRoleSlugs: ["consultancy-directors", "business-sales-executives", "financial-accounting-technicians"],
    faqs: [
      { id: "distinct", question: "Is this different from your IT/Technology sector support?", answer: "Yes — Professional Services and Technology are treated as distinct sectors with different workforce and recruitment dynamics." },
    ],
  },
  {
    slug: "health-care",
    tagline: "People expertise for complex workforce demands.",
    metaDescription: "Apex HR is a specialist HR company for healthcare organisations in the UK, supporting clinical and non-clinical workforce recruitment and management.",
    overview:
      "Healthcare employers manage complex workforce needs across clinical and non-clinical roles, often against significant recruitment and retention pressure.",
    challenges: [
      "Recruiting for hard-to-fill clinical and specialist roles",
      "Managing rota, absence and staffing pressures",
      "Supporting employee wellbeing in demanding roles",
      "Maintaining consistent HR practice across sites",
    ],
    recruitmentConsiderations:
      "Healthcare recruitment often requires navigating professional registration and qualification requirements alongside standard HR practice.",
    howApexHelps:
      "Apex HR can support healthcare organisations with recruitment, wellbeing strategy and HR compliance support, working alongside your clinical governance requirements.",
    relatedServiceSlugs: ["permanent-recruitment", "workplace-wellbeing-and-mental-health", "hr-compliance-audit"],
    relatedTalentRoleSlugs: ["healthcare-practice-managers", "generalist-medical-practitioners", "specialist-medical-practitioners", "occupational-therapists"],
    faqs: [
      { id: "clinical-governance", question: "Does Apex HR handle clinical governance or registration checks?", answer: "Apex HR supports HR and recruitment process; clinical governance and professional registration remain your organisation's responsibility, working with appropriate regulatory bodies." },
    ],
  },
  {
    slug: "life-sciences",
    tagline: "People expertise for scarce scientific talent.",
    metaDescription: "Apex HR is a specialist HR company for life sciences organisations in the UK, helping employers hire specialist scientific and technical talent.",
    overview:
      "Life sciences organisations often compete for a relatively small pool of specialist scientific and technical talent, making targeted recruitment and retention especially important.",
    challenges: [
      "Sourcing specialist scientific and technical skill sets",
      "Retaining talent in a competitive, mobile market",
      "Building HR processes that scale with R&D growth",
      "Managing international hiring for specialist roles",
    ],
    recruitmentConsiderations:
      "Recruitment often benefits from search-style approaches given the specialist and sometimes global nature of the talent pool.",
    howApexHelps:
      "Apex HR can support life sciences employers with specialist recruitment, workforce planning and HR foundations suited to research-led organisations.",
    relatedServiceSlugs: ["executive-search", "strategic-workforce-planning", "global-mobility-and-expatriate-hr-management"],
    relatedTalentRoleSlugs: ["clinical-psychologists", "medical-dental-technicians", "environment-professionals"],
    faqs: [
      { id: "specialist", question: "Can you recruit for very niche scientific roles?", answer: "Search approaches can be tailored to niche and specialist requirements, discussed as part of scoping the role." },
    ],
  },
  {
    slug: "technology",
    tagline: "People expertise for a fast-moving market.",
    metaDescription: "Apex HR is a specialist HR company for IT and technology employers in the UK, supporting the hiring and management of technical and digital talent.",
    overview:
      "Technology employers compete intensely for technical talent, and workforce practices often need to keep pace with fast-changing team structures and skill needs.",
    challenges: [
      "Competing for scarce technical and engineering talent",
      "Structuring pay and reward for competitive technical roles",
      "Scaling HR processes alongside rapid headcount growth",
      "Retaining technical staff through changing team structures",
    ],
    recruitmentConsiderations:
      "Technical hiring often needs assessment approaches suited to specific skill sets, alongside competitive, well-benchmarked reward.",
    howApexHelps:
      "Apex HR can support technology employers with recruitment, reward benchmarking and HR foundations built for fast-moving technical teams.",
    relatedServiceSlugs: ["permanent-recruitment", "salary-benchmarking", "hr-support-for-small-businesses-and-startups"],
    relatedTalentRoleSlugs: ["it-business-analysts-architects-systems-designers", "it-operations-technicians", "it-user-support-technicians", "data-analysts"],
    faqs: [
      { id: "it-not-professional", question: "Is this the same as Professional Services?", answer: "No — IT/Technology is treated as its own distinct sector, separate from Professional Services." },
    ],
  },
  {
    slug: "financial-services",
    tagline: "People expertise for a regulated world.",
    metaDescription: "Apex HR is a specialist HR company for financial services firms in the UK, helping employers navigate a regulated, competitive talent market.",
    overview:
      "Financial services employers operate in a regulated environment where recruitment, reward and conduct-related HR processes carry particular importance.",
    challenges: [
      "Recruiting for regulated and specialist roles",
      "Structuring reward within regulatory and market expectations",
      "Maintaining robust, well-documented HR processes",
      "Retaining talent in a competitive market",
    ],
    recruitmentConsiderations:
      "Recruitment often involves specific regulatory or professional qualification requirements that need to be factored into the process from the outset.",
    howApexHelps:
      "Apex HR can support financial services employers with recruitment, reward benchmarking and HR compliance support, alongside your regulatory and compliance functions.",
    relatedServiceSlugs: ["executive-search", "salary-benchmarking", "hr-compliance-audit"],
    relatedTalentRoleSlugs: ["brokers", "insurance-underwriters", "financial-accounting-technicians", "taxation-experts"],
    faqs: [
      { id: "regulatory", question: "Does Apex HR handle regulatory approvals for senior roles?", answer: "Apex HR supports HR and recruitment process; regulatory approvals and fitness-and-propriety assessments remain your organisation's responsibility." },
    ],
  },
  {
    slug: "accountants",
    tagline: "People expertise through seasonal demand.",
    metaDescription: "Apex HR is a specialist HR company for accountancy practices in the UK, supporting recruitment and workforce management for finance teams.",
    overview:
      "Accountancy practices depend on attracting and developing technically strong staff while managing seasonal workload pressures.",
    challenges: [
      "Recruiting qualified and part-qualified accountants",
      "Managing workload and wellbeing through busy periods",
      "Structuring clear progression and qualification support",
      "Retaining staff once they qualify",
    ],
    recruitmentConsiderations:
      "Recruitment often needs to account for qualification status, study support expectations and progression pathways that matter to candidates.",
    howApexHelps:
      "Apex HR can support accountancy practices with recruitment, reward benchmarking and wellbeing strategy suited to seasonal workload patterns.",
    relatedServiceSlugs: ["permanent-recruitment", "salary-benchmarking", "workplace-wellbeing-and-mental-health"],
    relatedTalentRoleSlugs: ["financial-accounting-technicians", "taxation-experts", "bookkeepers-payroll-wages-clerks"],
    faqs: [
      { id: "qualified", question: "Can you help recruit part-qualified staff?", answer: "Yes, recruitment support can cover part-qualified, qualified and senior accountancy roles." },
    ],
  },
  {
    slug: "architects",
    tagline: "People expertise for project-led studios.",
    metaDescription: "Apex HR is a specialist HR company for architecture practices in the UK, providing support from studio recruitment through to HR foundations.",
    overview:
      "Architecture practices often operate as close-knit studios where culture fit and design capability both matter significantly in hiring.",
    challenges: [
      "Recruiting for a mix of technical and creative skill sets",
      "Managing project-based workload pressures",
      "Building HR foundations in smaller practice environments",
      "Retaining talent through career progression stages",
    ],
    recruitmentConsiderations:
      "Hiring often balances portfolio and technical assessment with genuine studio and cultural fit.",
    howApexHelps:
      "Apex HR can support architecture practices with recruitment and HR foundations suited to studio-based, project-driven teams.",
    relatedServiceSlugs: ["permanent-recruitment", "hr-support-for-small-businesses-and-startups", "employee-handbooks-and-hr-policies"],
    relatedTalentRoleSlugs: ["cad-drawing-architectural-technicians", "estimators-valuers-assessors"],
    faqs: [
      { id: "small-practice", question: "Do you work with small practices as well as larger firms?", answer: "Yes, support scales from small studios through to larger multi-site practices." },
    ],
  },
  {
    slug: "care-homes",
    tagline: "People expertise for frontline care teams.",
    metaDescription: "Apex HR is a specialist HR company for care homes in the UK, supporting staffing, compliance and workforce wellbeing.",
    overview:
      "Care homes manage significant recruitment and retention pressure alongside regulatory and safeguarding obligations that shape everyday HR practice.",
    challenges: [
      "Recruiting and retaining care staff in a competitive market",
      "Maintaining robust, compliant HR and safeguarding processes",
      "Managing rota and staffing pressures",
      "Supporting staff wellbeing in demanding roles",
    ],
    recruitmentConsiderations:
      "Recruitment needs to account for right-to-work, DBS and other safeguarding checks alongside standard HR screening.",
    howApexHelps:
      "Apex HR can support care homes with recruitment, HR compliance and wellbeing strategy, working alongside your regulatory and safeguarding obligations.",
    relatedServiceSlugs: ["permanent-recruitment", "hr-compliance-audit", "workplace-wellbeing-and-mental-health"],
    relatedTalentRoleSlugs: ["care-managers-proprietors", "senior-care-workers", "houseparents-residential-wardens"],
    faqs: [
      { id: "cqc", question: "Does Apex HR handle CQC or regulatory compliance?", answer: "Apex HR supports HR process and recruitment; regulatory and CQC compliance obligations remain the responsibility of your organisation." },
    ],
  },
  {
    slug: "charity",
    tagline: "People expertise for purpose-driven organisations.",
    metaDescription: "Apex HR is a specialist HR company for charities and not-for-profit organisations in the UK, built for lean teams and tight budgets.",
    overview:
      "Charities often manage HR with limited dedicated resource, while needing to compete for talent against better-funded sectors.",
    challenges: [
      "Recruiting and retaining talent on constrained budgets",
      "Building HR foundations with limited dedicated resource",
      "Managing a mix of paid staff and volunteers",
      "Maintaining good governance around HR decisions",
    ],
    recruitmentConsiderations:
      "Mission alignment often matters as much as technical fit, and reward needs to be positioned carefully within budget constraints.",
    howApexHelps:
      "Apex HR can support charities with right-sized HR foundations, recruitment and reward advice that respects budget realities.",
    relatedServiceSlugs: ["hr-support-for-small-businesses-and-startups", "retained-hr-services", "salary-benchmarking"],
    relatedTalentRoleSlugs: ["office-managers", "market-research-interviewers", "careers-advisers-vocational-guidance"],
    faqs: [
      { id: "budget", question: "Do you offer flexible arrangements for charities?", answer: "Engagement scope and terms are discussed to fit the resources available to your organisation." },
    ],
  },
  {
    slug: "construction",
    tagline: "People expertise for site-based teams.",
    metaDescription: "Apex HR is a specialist HR company for construction and contracting businesses in the UK, supporting both site and office-based workforce needs.",
    overview:
      "Construction employers manage a mix of site-based and office-based workforce needs, often with project timelines driving hiring urgency.",
    challenges: [
      "Recruiting skilled trades and technical staff",
      "Managing health and safety-related HR processes",
      "Handling restructuring around project cycles",
      "Maintaining consistent HR practice across sites",
    ],
    recruitmentConsiderations:
      "Recruitment often spans skilled trades, technical and management roles, each with different sourcing approaches and timelines.",
    howApexHelps:
      "Apex HR can support construction businesses with recruitment, restructuring support and HR compliance across site-based teams.",
    relatedServiceSlugs: ["permanent-recruitment", "redundancy-and-restructuring-support", "hr-compliance-audit"],
    relatedTalentRoleSlugs: ["health-safety-managers-officers", "engineering-technicians", "floorers-wall-tilers", "estimators-valuers-assessors"],
    faqs: [
      { id: "cscs", question: "Do you check trade certifications like CSCS cards?", answer: "Recruitment process can incorporate relevant certification checks as agreed with you, though ultimate compliance responsibility sits with your organisation." },
    ],
  },
  {
    slug: "distribution",
    tagline: "People expertise for shift-based workforces.",
    metaDescription: "Apex HR is a specialist HR company for distribution and logistics employers in the UK, supporting warehouse and operational workforce needs.",
    overview:
      "Distribution and logistics employers often manage high-volume, shift-based workforces where recruitment speed and retention both matter.",
    challenges: [
      "High-volume recruitment for operational roles",
      "Managing shift patterns and workforce planning",
      "Retaining staff in physically demanding roles",
      "Maintaining consistent HR practice across sites",
    ],
    recruitmentConsiderations:
      "High-volume roles often benefit from a structured, scalable recruitment process rather than one-off hiring.",
    howApexHelps:
      "Apex HR can support distribution and logistics employers with high-volume recruitment, workforce planning and HR foundations across multiple sites.",
    relatedServiceSlugs: ["recruitment-process-outsourcing-rpo", "strategic-workforce-planning", "contract-staffing"],
    relatedTalentRoleSlugs: ["storage-warehousing-managers", "buyers-procurement-officers", "train-tram-drivers"],
    faqs: [
      { id: "volume", question: "Can you support high-volume seasonal hiring?", answer: "Yes, recruitment support can scale for seasonal or high-volume periods, discussed as part of planning." },
    ],
  },
  {
    slug: "education",
    tagline: "People expertise within safeguarding and governance.",
    metaDescription: "Apex HR is a specialist HR company for schools, colleges and education providers in the UK, supporting their HR and recruitment needs.",
    overview:
      "Education providers manage recruitment and HR within a framework of safeguarding, governance and often term-time-driven planning cycles.",
    challenges: [
      "Recruiting within safeguarding and governance requirements",
      "Managing HR processes around term-time cycles",
      "Supporting staff wellbeing in demanding roles",
      "Handling employee relations matters sensitively",
    ],
    recruitmentConsiderations:
      "Recruitment needs to account for safeguarding checks and, in many cases, specific qualification or registration requirements.",
    howApexHelps:
      "Apex HR can support education providers with recruitment, employee relations and wellbeing support, working alongside your safeguarding obligations.",
    relatedServiceSlugs: ["permanent-recruitment", "workplace-mediation-and-conflict-resolution", "workplace-wellbeing-and-mental-health"],
    relatedTalentRoleSlugs: ["education-advisers-school-inspectors", "early-education-childcare-practitioners", "careers-advisers-vocational-guidance"],
    faqs: [
      { id: "safeguarding", question: "Does Apex HR handle safeguarding checks?", answer: "Recruitment process can incorporate relevant checks as agreed, though safeguarding compliance responsibility remains with your organisation." },
    ],
  },
  {
    slug: "engineers",
    tagline: "People expertise for technical career pathways.",
    metaDescription: "Apex HR is a specialist HR company for engineering employers in the UK, helping them hire and manage technical and specialist talent.",
    overview:
      "Engineering employers often compete for specialist technical talent while managing structured, sometimes lengthy project and career pathways.",
    challenges: [
      "Sourcing specialist and chartered engineering talent",
      "Structuring competitive, well-benchmarked reward",
      "Building clear technical career progression",
      "Retaining talent through long project cycles",
    ],
    recruitmentConsiderations:
      "Recruitment often needs to assess specific technical disciplines and, where relevant, chartered or professional status.",
    howApexHelps:
      "Apex HR can support engineering employers with recruitment, reward benchmarking and career-framework design for technical teams.",
    relatedServiceSlugs: ["permanent-recruitment", "salary-benchmarking", "competency-frameworks"],
    relatedTalentRoleSlugs: ["engineering-technicians", "planning-process-production-technicians", "quality-assurance-technicians"],
    faqs: [
      { id: "chartered", question: "Can you recruit for chartered engineering roles?", answer: "Yes, recruitment can be scoped around specific technical disciplines and professional accreditation requirements." },
    ],
  },
  {
    slug: "leisure",
    tagline: "People expertise for seasonal, customer-facing teams.",
    metaDescription: "Apex HR is a specialist HR company for leisure and attractions businesses in the UK, supporting seasonal and operational workforce needs.",
    overview:
      "Leisure businesses often manage seasonal peaks, shift-based teams and a strong customer-facing culture that shapes hiring priorities.",
    challenges: [
      "Recruiting for seasonal and peak-period demand",
      "Retaining staff in customer-facing, often part-time roles",
      "Building consistent HR practice across sites",
      "Maintaining service culture through staff turnover",
    ],
    recruitmentConsiderations:
      "Recruitment often needs to move quickly ahead of seasonal peaks while still assessing customer-facing fit.",
    howApexHelps:
      "Apex HR can support leisure businesses with seasonal recruitment planning and HR foundations suited to shift-based, customer-facing teams.",
    relatedServiceSlugs: ["recruitment-process-outsourcing-rpo", "employee-experience-strategy", "hr-support-for-small-businesses-and-startups"],
    relatedTalentRoleSlugs: ["leisure-theme-park-attendants", "cleaning-housekeeping-managers-supervisors"],
    faqs: [
      { id: "seasonal", question: "Can you help with seasonal hiring surges?", answer: "Yes, recruitment planning can be built around known seasonal peaks in demand." },
    ],
  },
  {
    slug: "manufacturers",
    tagline: "People expertise for production workforces.",
    metaDescription: "Apex HR is a specialist HR company for manufacturers in the UK, supporting production, technical and operational workforce needs.",
    overview:
      "Manufacturers manage a mix of production, technical and management roles, often within tight margins where workforce efficiency matters.",
    challenges: [
      "Recruiting for production and technical roles",
      "Managing shift patterns and workforce planning",
      "Handling restructuring during demand fluctuations",
      "Building consistent HR practice across sites",
    ],
    recruitmentConsiderations:
      "Recruitment often spans production, technical and supervisory roles, each requiring different sourcing and assessment approaches.",
    howApexHelps:
      "Apex HR can support manufacturers with recruitment, workforce planning and restructuring support as demand changes.",
    relatedServiceSlugs: ["permanent-recruitment", "strategic-workforce-planning", "redundancy-and-restructuring-support"],
    relatedTalentRoleSlugs: ["metalworking-production-maintenance-fitters", "planning-process-production-technicians", "quality-assurance-technicians"],
    faqs: [
      { id: "shift", question: "Can you recruit across multiple shift patterns?", answer: "Yes, recruitment planning can account for multiple shift patterns and site locations." },
    ],
  },
  {
    slug: "hospitality",
    tagline: "People expertise for people-first hospitality teams.",
    metaDescription: "Apex HR is a specialist HR company for hospitality businesses in the UK, supporting front-of-house, kitchen and management recruitment.",
    overview:
      "Hospitality employers manage high staff turnover, seasonal demand and customer-facing culture, all of which shape recruitment and retention priorities.",
    challenges: [
      "Managing high turnover in front-line roles",
      "Recruiting quickly ahead of seasonal or peak demand",
      "Building consistent HR practice across sites",
      "Supporting managers with day-to-day people issues",
    ],
    recruitmentConsiderations:
      "Recruitment often needs to move quickly while still assessing genuine customer-service aptitude and fit with the team.",
    howApexHelps:
      "Apex HR can support hospitality businesses with recruitment, HR foundations and manager training suited to fast-moving, customer-facing teams.",
    relatedServiceSlugs: ["recruitment-process-outsourcing-rpo", "leadership-and-management-training", "employee-experience-strategy"],
    relatedTalentRoleSlugs: ["cleaning-housekeeping-managers-supervisors", "retail-cashiers-checkout-operators"],
    faqs: [
      { id: "turnover", question: "Can you help us reduce staff turnover?", answer: "Retention-focused work can be built into recruitment, onboarding and employee-experience support, though turnover has many causes worth reviewing together." },
    ],
  },
];
