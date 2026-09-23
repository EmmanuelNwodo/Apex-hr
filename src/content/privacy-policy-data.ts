/**
 * Structured content for /privacy-policy/, per the approved privacy-policy
 * brief. Kept as data (not hand-authored JSX) so the rendering template
 * (src/components/templates/privacy-policy-template.tsx) stays generic and
 * the policy text can be reviewed/updated without touching layout code —
 * the same "content in src/content/*.ts, rendered by a template" pattern
 * used everywhere else in this project.
 *
 * contentStatus: "ai-draft" / reviewStatus: "stakeholder-review-required"
 * (CLAUDE.md section 31) — this is genuinely legal content, so
 * `legalReviewRequired: true` is set on this page's manifest entry (see
 * src/content/manifest.ts). Section 16's ten per-right explanations are
 * original, standard summaries of the UK GDPR rights (no external
 * "approved draft" of that wording exists anywhere in this repository —
 * confirmed by a repository-wide search before writing this file) and, like
 * the rest of this page, are pending legal review before being treated as
 * final. No company registration number, registered legal entity name,
 * registered office, Data Protection Officer, ICO registration number, or
 * ICO contact address/telephone number is stated anywhere below, since none
 * of those exist in any authoritative source in this project — see the
 * implementation report for the full list of resulting placeholders.
 */

export interface PolicyParagraph {
  type: "paragraph";
  text: string;
}

export interface PolicyList {
  type: "list";
  items: string[];
}

export interface PolicyContactLine {
  label: string;
  value: string;
  /** If set, `value` renders as a link to this href. */
  href?: string;
  external?: boolean;
}

export interface PolicyContact {
  type: "contact";
  lines: PolicyContactLine[];
}

export type PolicyBlock = PolicyParagraph | PolicyList | PolicyContact;

export interface PolicySubsection {
  id: string;
  heading: string;
  blocks: PolicyBlock[];
}

export interface PolicySection {
  id: string;
  number: number;
  heading: string;
  blocks?: PolicyBlock[];
  subsections?: PolicySubsection[];
  /** Rendered after `subsections` — for closing text that applies to the whole section (e.g. Section 16's "these rights are not absolute" note). */
  trailingBlocks?: PolicyBlock[];
}

export const privacyPolicyLastUpdated = "22 September 2026";

export const privacyPolicyLead = "How Apex HR collects, uses, protects and manages personal information.";

function p(text: string): PolicyParagraph {
  return { type: "paragraph", text };
}

function list(items: string[]): PolicyList {
  return { type: "list", items };
}

export const privacyPolicySections: PolicySection[] = [
  {
    id: "introduction",
    number: 1,
    heading: "Introduction",
    blocks: [
      p(
        'Apex HR ("Apex HR", "we", "us" or "our") is committed to protecting your privacy and handling your personal data fairly, lawfully and transparently.',
      ),
      p("This Privacy Policy explains how we collect, use, store, share and protect personal information when you:"),
      list([
        "visit our website;",
        "contact us or submit an enquiry;",
        "enquire about or use our HR, recruitment or workforce services;",
        "apply for roles or provide information as a candidate;",
        "ask us to help find talent for your organisation;",
        "subscribe to our marketing communications or insights; or",
        "otherwise interact with Apex HR.",
      ]),
      { type: "contact", lines: [{ label: "Our website is", value: "https://www.apexhrllc.co.uk", href: "/" }] },
      p(
        'This policy has been prepared with regard to the principles of the UK General Data Protection Regulation ("UK GDPR"), the Data Protection Act 2018 and applicable UK privacy and electronic communications requirements.',
      ),
    ],
  },
  {
    id: "who-we-are",
    number: 2,
    heading: "Who we are",
    blocks: [
      p("Apex HR provides HR, recruitment, talent acquisition, people advisory and related workforce services."),
      p("For personal data for which Apex HR determines why and how it is processed, Apex HR acts as the data controller."),
      p("For privacy-related enquiries or requests concerning your personal data, please contact us at:"),
      {
        type: "contact",
        lines: [
          { label: "Email", value: "info@apexhrllc.com", href: "mailto:info@apexhrllc.com" },
          { label: "Website", value: "https://www.apexhrllc.co.uk", href: "/" },
        ],
      },
    ],
  },
  {
    id: "personal-data-we-collect",
    number: 3,
    heading: "The personal data we may collect",
    subsections: [
      {
        id: "website-visitors-and-enquiries",
        heading: "3.1 Website visitors and people making enquiries",
        blocks: [
          p("We may collect information such as:"),
          list([
            "your name;",
            "email address;",
            "telephone number;",
            "company or organisation;",
            "job title;",
            "information submitted through our contact forms;",
            "the content of correspondence with us;",
            "IP address and technical/device information; and",
            "information about how you use our website.",
          ]),
        ],
      },
      {
        id: "candidates-and-job-applicants",
        heading: "3.2 Candidates and job applicants",
        blocks: [
          p("Where you interact with Apex HR as a candidate, we may process information including:"),
          list([
            "your name and contact details;",
            "CV or résumé;",
            "employment and career history;",
            "education, qualifications and professional certifications;",
            "skills and professional experience;",
            "job preferences and availability;",
            "salary or remuneration expectations, where relevant;",
            "information you provide during recruitment communications;",
            "information relating to applications, interviews and assessments; and",
            "other information you voluntarily provide in connection with recruitment.",
          ]),
          p("Where permitted and necessary, recruitment activities may also involve more sensitive information."),
          p(
            "We will only process such information where there is an appropriate lawful basis and, where required, an additional condition permitting the processing of special-category data.",
          ),
        ],
      },
      {
        id: "employers-clients-and-prospective-clients",
        heading: "3.3 Employers, clients and prospective clients",
        blocks: [
          p("We may collect:"),
          list([
            "names;",
            "business contact information;",
            "job titles;",
            "company details;",
            "recruitment requirements;",
            "workforce and HR requirements;",
            "information supplied in enquiries or consultations;",
            "contractual and billing information where applicable; and",
            "correspondence and records relating to services provided.",
          ]),
        ],
      },
      {
        id: "information-collected-automatically",
        heading: "3.4 Information collected automatically",
        blocks: [
          p("When you use our website, certain technical information may be collected automatically, such as:"),
          list([
            "IP address;",
            "browser and device type;",
            "operating system;",
            "referring pages;",
            "pages visited;",
            "approximate location derived from technical information;",
            "date/time information; and",
            "cookie or similar technology information.",
          ]),
          p("Our use of cookies and similar technologies should also be explained in our Cookie Policy."),
        ],
      },
    ],
  },
  {
    id: "how-we-collect-personal-data",
    number: 4,
    heading: "How we collect personal data",
    blocks: [
      p("We may collect personal information:"),
      p(
        "Directly from you, for example when you complete a contact form, submit your CV, contact us by email, make a recruitment enquiry or communicate with our team.",
      ),
      p("From organisations, such as employers or clients engaging us in relation to recruitment or HR services."),
      p(
        "From publicly available and professional sources, where appropriate and lawful in connection with recruitment and professional services.",
      ),
      p("Automatically, through our website and relevant cookies or similar technologies."),
      p("From service providers and business partners, where they are permitted to provide the information to us."),
      p(
        "Where information is obtained from another source rather than directly from you, we will handle it in accordance with applicable data-protection requirements.",
      ),
    ],
  },
  {
    id: "how-we-use-your-personal-data",
    number: 5,
    heading: "How we use your personal data",
    blocks: [
      p("We may process personal data to:"),
      list([
        "respond to enquiries;",
        "provide HR and workforce advisory services;",
        "provide recruitment and talent-acquisition services;",
        "communicate with candidates;",
        "assess candidate suitability for relevant opportunities;",
        "introduce candidates to prospective employers where appropriate;",
        "communicate with employers and prospective clients;",
        "manage our business relationships;",
        "provide requested services;",
        "maintain records relating to our services;",
        "operate, secure and improve our website;",
        "analyse website usage;",
        "prevent fraud, misuse or security incidents;",
        "comply with legal and regulatory obligations;",
        "establish, exercise or defend legal claims; and",
        "send permitted marketing communications and insights.",
      ]),
      p("We aim to collect only personal data that is adequate, relevant and necessary for the purposes for which it is processed."),
    ],
  },
  {
    id: "lawful-bases-for-processing",
    number: 6,
    heading: "Our lawful bases for processing",
    blocks: [
      p("Under UK GDPR, we must have a lawful basis for processing personal data."),
      p("Depending upon the circumstances, we may rely upon:"),
    ],
    subsections: [
      {
        id: "consent",
        heading: "Consent",
        blocks: [
          p("Where you have given us clear permission to process your personal data for a particular purpose."),
          p("Where consent is our lawful basis, you may withdraw it at any time."),
        ],
      },
      {
        id: "contract",
        heading: "Contract",
        blocks: [
          p(
            "Where processing is necessary to perform a contract with you or to take steps at your request before entering into a contract.",
          ),
        ],
      },
      {
        id: "legal-obligation",
        heading: "Legal obligation",
        blocks: [p("Where processing is necessary for us to comply with an applicable legal obligation.")],
      },
      {
        id: "legitimate-interests",
        heading: "Legitimate interests",
        blocks: [
          p(
            "Where processing is necessary for our legitimate business interests or those of a third party and those interests are not overridden by your rights and freedoms.",
          ),
          p(
            "This may include legitimate interests in operating our business, responding to business enquiries, providing recruitment and HR services, maintaining business relationships, improving our services, and protecting our systems.",
          ),
        ],
      },
    ],
    trailingBlocks: [
      p("Where we process special-category personal data, we will also identify an appropriate additional condition under applicable data-protection law."),
    ],
  },
  {
    id: "recruitment-and-candidate-information",
    number: 7,
    heading: "Recruitment and candidate information",
    blocks: [
      p("Because recruitment and talent acquisition form part of Apex HR's services, candidate information requires particular care."),
      p("We may use candidate information to:"),
      list([
        "review qualifications, experience and suitability;",
        "communicate about potential opportunities;",
        "match candidates with relevant vacancies;",
        "manage applications;",
        "arrange recruitment discussions or interviews;",
        "provide recruitment services to clients; and",
        "maintain appropriate recruitment records.",
      ]),
      p("Where appropriate, candidate information may be shared with an employer or prospective employer in connection with a recruitment opportunity."),
      p("We will only share candidate information where we have an appropriate legal basis to do so."),
      p("Providing information to Apex HR does not guarantee employment, an interview, placement or selection for any role."),
    ],
  },
  {
    id: "automated-decision-making-and-profiling",
    number: 8,
    heading: "Automated decision-making and profiling",
    blocks: [
      p(
        "Apex HR does not intend to make decisions producing legal or similarly significant effects on individuals solely through automated processing unless this is lawfully implemented and appropriate safeguards are in place.",
      ),
      p(
        "If Apex HR introduces automated recruitment, candidate-screening or profiling technology that materially changes how personal data is processed, this Privacy Policy should be updated accordingly.",
      ),
    ],
  },
  {
    id: "sharing-your-personal-data",
    number: 9,
    heading: "Sharing your personal data",
    blocks: [
      p("We may share personal information where reasonably necessary with:"),
      list([
        "Apex HR personnel who require access for legitimate business purposes;",
        "employers and prospective employers in connection with recruitment activities;",
        "clients receiving our HR or recruitment services;",
        "website, hosting and technology providers;",
        "communications and email service providers;",
        "professional advisers such as lawyers, accountants and auditors;",
        "analytics and other approved service providers;",
        "regulators, law-enforcement bodies or public authorities where required by law; and",
        "other parties where you have authorised us or where sharing is otherwise lawful.",
      ]),
      p(
        "We expect third parties processing personal data on our behalf to apply appropriate safeguards and, where required, be subject to appropriate contractual data-protection obligations.",
      ),
      p("We do not sell personal data."),
    ],
  },
  {
    id: "international-transfers",
    number: 10,
    heading: "International transfers",
    blocks: [
      p("Some suppliers or technology services may process information outside the United Kingdom."),
      p("Where personal data is transferred internationally, Apex HR will take appropriate steps required by applicable data-protection law to protect that information."),
      p("Depending upon the destination and circumstances, safeguards may include:"),
      list([
        "UK adequacy regulations;",
        "an approved International Data Transfer Agreement (IDTA);",
        "the UK International Data Transfer Addendum; or",
        "another legally recognised safeguard.",
      ]),
    ],
  },
  {
    id: "how-long-we-keep-your-personal-data",
    number: 11,
    heading: "How long we keep your personal data",
    blocks: [
      p(
        "We will not retain personal information for longer than reasonably necessary for the purpose for which it was collected, including satisfying applicable legal, regulatory, contractual, accounting or reporting requirements.",
      ),
      p("Retention periods may differ depending upon:"),
      list([
        "the type of information;",
        "why it was collected;",
        "our relationship with you;",
        "applicable legal requirements;",
        "potential disputes or legal claims; and",
        "whether continued retention is reasonably necessary.",
      ]),
      p("When personal information is no longer required, we will take appropriate steps to delete, anonymise or securely dispose of it."),
    ],
  },
  {
    id: "how-we-protect-your-information",
    number: 12,
    heading: "How we protect your information",
    blocks: [
      p("Apex HR takes appropriate technical and organisational measures designed to protect personal data against:"),
      list(["unauthorised access;", "unlawful processing;", "accidental loss;", "destruction;", "alteration; and", "unauthorised disclosure."]),
      p("Access to personal information should be limited to people and service providers who have an appropriate business need for it."),
      p("However, no internet transmission or electronic storage system can be guaranteed to be completely secure."),
    ],
  },
  {
    id: "data-breaches",
    number: 13,
    heading: "Data breaches",
    blocks: [
      p("Where we become aware of a personal-data breach, we will investigate and take appropriate action in accordance with applicable law."),
      p("Where required, this may include notifying the Information Commissioner's Office and affected individuals."),
    ],
  },
  {
    id: "marketing-communications",
    number: 14,
    heading: "Marketing communications",
    blocks: [
      p("Where permitted, Apex HR may send information about our services, insights, events or other relevant communications."),
      p("Where consent is required, we will seek appropriate consent before sending marketing communications."),
      p("You may unsubscribe from marketing communications at any time by using the unsubscribe facility provided in the communication or by contacting us."),
      p(
        "Withdrawing marketing consent will not prevent us from sending non-marketing communications that are necessary in connection with an existing business relationship, enquiry or service.",
      ),
    ],
  },
  {
    id: "cookies",
    number: 15,
    heading: "Cookies",
    blocks: [
      p(
        "Our website may use cookies and similar technologies to operate the website, remember preferences, understand how visitors interact with the website and, where applicable, support analytics or marketing functionality.",
      ),
      p("Where required by law, non-essential cookies will only be used after obtaining appropriate consent."),
      p("More information about the cookies used on this website should be provided in our separate Cookie Policy."),
    ],
  },
  {
    id: "your-data-protection-rights",
    number: 16,
    heading: "Your data protection rights",
    blocks: [
      p("Depending upon the circumstances, UK data-protection law gives you rights concerning your personal data, including:"),
    ],
    subsections: [
      {
        id: "right-to-be-informed",
        heading: "Right to be informed",
        blocks: [p("To receive information about how your personal data is used.")],
      },
      {
        id: "right-of-access",
        heading: "Right of access",
        blocks: [p("To request access to personal information held about you.")],
      },
      {
        id: "right-to-rectification",
        heading: "Right to rectification",
        blocks: [p("To request correction of inaccurate or incomplete information.")],
      },
      {
        id: "right-to-erasure",
        heading: "Right to erasure",
        blocks: [p("To request deletion of your personal data in certain circumstances.")],
      },
      {
        id: "right-to-restrict-processing",
        heading: "Right to restrict processing",
        blocks: [p("To ask us to restrict how your information is processed in certain circumstances.")],
      },
      {
        id: "right-to-data-portability",
        heading: "Right to data portability",
        blocks: [p("To receive certain personal data in an appropriate machine-readable format.")],
      },
      {
        id: "right-to-object",
        heading: "Right to object",
        blocks: [p("To object to certain processing, including certain direct marketing.")],
      },
      {
        id: "rights-relating-to-automated-decision-making-and-profiling",
        heading: "Rights relating to automated decision-making and profiling",
        blocks: [p("Including protections relating to certain solely automated decisions.")],
      },
      {
        id: "right-to-withdraw-consent",
        heading: "Right to withdraw consent",
        blocks: [p("Where processing is based upon consent, without affecting processing carried out before withdrawal.")],
      },
      {
        id: "right-to-complain",
        heading: "Right to complain",
        blocks: [p("Including the right to raise concerns with the Information Commissioner's Office.")],
      },
    ],
    trailingBlocks: [p("These rights are not absolute and may be subject to legal exceptions.")],
  },
  {
    id: "how-to-exercise-your-rights",
    number: 17,
    heading: "How to exercise your rights",
    blocks: [
      p("To exercise a data-protection right or ask a question about how Apex HR handles your personal information, contact:"),
      { type: "contact", lines: [{ label: "Email", value: "info@apexhrllc.com", href: "mailto:info@apexhrllc.com" }] },
      p("Please provide enough information for us to understand your request and, where necessary, verify your identity."),
      p("We will respond in accordance with the timeframes required by applicable data-protection law."),
    ],
  },
  {
    id: "complaints",
    number: 18,
    heading: "Complaints",
    blocks: [
      p("If you have concerns about how we handle your personal data, please contact us first so that we can investigate your concern."),
      p("You also have the right to complain to the UK's data-protection regulator:"),
      {
        type: "contact",
        lines: [{ label: "Regulator", value: "Information Commissioner's Office (ICO)", href: "https://ico.org.uk/", external: true }],
      },
    ],
  },
  {
    id: "third-party-websites",
    number: 19,
    heading: "Third-party websites",
    blocks: [
      p("Our website may contain links to websites, platforms or services operated by third parties."),
      p(
        "Apex HR is not responsible for the privacy practices of third-party websites. We encourage you to review the privacy information provided by those organisations before supplying them with personal information.",
      ),
    ],
  },
  {
    id: "childrens-privacy",
    number: 20,
    heading: "Children's privacy",
    blocks: [
      p("Apex HR's website and services are primarily intended for employers, professionals, candidates and other users engaging with our HR and recruitment services."),
      p("We do not knowingly seek to collect personal data from children through the website except where there is an appropriate lawful reason and suitable safeguards."),
    ],
  },
  {
    id: "changes-to-this-privacy-policy",
    number: 21,
    heading: "Changes to this Privacy Policy",
    blocks: [
      p("We may update this Privacy Policy from time to time to reflect:"),
      list(["changes to our services;", "changes in how we process personal data;", "changes to our technology or suppliers; or", "changes in applicable law or regulatory guidance."]),
      p('When we make changes, we will update the "Last updated" date at the top of this page.'),
    ],
  },
  {
    id: "contact-us",
    number: 22,
    heading: "Contact us",
    blocks: [
      p("If you have questions about this Privacy Policy, how Apex HR processes personal data, or wish to exercise your data-protection rights, please contact:"),
      {
        type: "contact",
        lines: [
          { label: "", value: "Apex HR" },
          { label: "Email", value: "info@apexhrllc.com", href: "mailto:info@apexhrllc.com" },
          { label: "Website", value: "https://www.apexhrllc.co.uk", href: "/" },
        ],
      },
    ],
  },
];
