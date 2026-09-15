import type { ContentFaqItem } from "@/types/content";
import { routes } from "@/config/routes";

/**
 * Original first-draft content for supporting/general-information and
 * conversion-landing pages. See src/content/services-data.ts for the
 * authoring rules this file also follows — no invented team members,
 * addresses, statistics or live vacancy/candidate-pool figures.
 */

export interface InfoPageSection {
  heading: string;
  body?: string;
  list?: string[];
}

export interface InfoPageContent {
  kicker: string;
  heading: string;
  lead: string;
  sections: InfoPageSection[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  faqs?: ContentFaqItem[];
}

export const aboutPageContent: InfoPageContent = {
  kicker: "About",
  heading: "About Apex HR",
  lead: "Apex HR is a London-based UK HR, recruitment and people-consulting partner, supporting employers across the full people lifecycle.",
  sections: [
    {
      heading: "What we do",
      body: "Apex HR combines outsourced HR support, recruitment and strategic workforce advisory in one partner, so employers don't have to coordinate multiple separate suppliers for related people needs. Alongside this employer-first focus, Apex HR maintains a separate, clearly signposted pathway for candidates.",
    },
    {
      heading: "How we work",
      body: "Apex HR's approach follows a consistent pattern across every engagement: understand the business and its people, diagnose the real issue, recommend a practical plan, implement it alongside your team, and measure the outcome.",
      list: ["Understand", "Diagnose", "Recommend", "Implement", "Measure"],
    },
    {
      heading: "Who we work with",
      body: "Apex HR supports employers across the UK, from startups building their first HR foundations through to established organisations with more complex workforce needs.",
    },
  ],
  primaryCta: { label: "Find Talent", href: routes.findTalent.path },
  secondaryCta: { label: "Contact Apex HR", href: routes.contact.path },
};

export const contactPageContent: InfoPageContent = {
  kicker: "Contact",
  heading: "Contact Apex HR",
  lead: "Whether you are hiring, navigating a people challenge or planning for growth, start with a straightforward conversation with an Apex HR adviser in London, UK.",
  sections: [
    {
      heading: "How to get in touch",
      body: "Call or email Apex HR directly, or share a few details through the enquiry form so your message reaches the right adviser.",
    },
    {
      heading: "What happens next",
      body: "After you get in touch, an Apex HR adviser reviews the details and follows up to discuss your needs and appropriate next steps.",
    },
  ],
  faqs: [
    {
      id: "what-to-include",
      question: "What information should I include?",
      answer: "A brief description of the role, people issue or business objective is enough to start. More detail can be discussed confidentially during the first conversation.",
    },
    {
      id: "sensitive-matter",
      question: "Can I discuss a sensitive employee matter?",
      answer: "Yes. You can keep the initial enquiry brief and ask for a confidential call with an appropriate HR adviser.",
    },
    {
      id: "projects-and-retainers",
      question: "Do you support one-off projects and ongoing retainers?",
      answer: "Yes. Support can be structured as a defined project, an interim or fractional assignment, or an ongoing retained partnership.",
    },
    {
      id: "where-we-operate",
      question: "Where does Apex HR provide support?",
      answer: "Apex HR supports UK employers and can also advise international organisations with UK workforce or market-entry needs.",
    },
  ],
  primaryCta: { label: "Find Talent", href: routes.findTalent.path },
};

export const forEmployersPageContent: InfoPageContent = {
  kicker: "Employers",
  heading: "HR and recruitment support for employers",
  lead: "Explore outsourced HR, recruitment and strategic people support for UK employers, with Apex HR helping you find the right service for your needs.",
  sections: [
    {
      heading: "Where to start",
      body: "Most employers come to Apex HR with one of three needs: recruiting talent, getting day-to-day HR support in place, or working through a specific people issue or strategic decision.",
      list: [
        "Recruit talent: permanent, contract or executive hiring",
        "Outsource HR: ongoing advisory, policies and compliance",
        "Resolve a people issue: investigations, mediation, redundancy support",
        "Improve organisational performance: structure, performance and reward",
        "Transform HR technology: HRIS, analytics and digital HR",
      ],
    },
    {
      heading: "How engagements work",
      body: "Engagement scope, from a single project to ongoing retained support, is agreed upfront based on what your business actually needs.",
    },
  ],
  primaryCta: { label: "Find Talent", href: routes.findTalent.path },
  secondaryCta: { label: "Explore HR Services", href: routes.services.path },
  faqs: [
    { id: "size", question: "Does Apex HR work with businesses of all sizes?", answer: "Support is scaled to the size and needs of your business, from early-stage startups to larger established employers." },
    { id: "combine", question: "Can we combine recruitment and HR support?", answer: "Yes. An engagement can combine recruitment delivery with onboarding, contracts, policies, reward advice or wider workforce support." },
    { id: "retained", question: "Do you offer ongoing retained support?", answer: "Yes. Retained HR support can provide an ongoing source of advice and delivery, with scope agreed around your organisation's priorities." },
  ],
};

export const forCandidatesPageContent: InfoPageContent = {
  kicker: "Candidates",
  heading: "Find your next role with Apex HR",
  lead: "Learn how Apex HR helps candidates explore opportunities when available, join the talent pool and understand the recruitment process.",
  sections: [
    {
      heading: "Ways to connect",
      list: [
        "Search current vacancies",
        "Upload your CV for future opportunities",
        "Join the Apex talent pool",
        "Explore candidate resources",
      ],
    },
    {
      heading: "What to expect",
      body: "If your details match a live vacancy or future opportunity, an Apex HR recruiter will be in touch. Apex HR does not guarantee a specific outcome or timescale for any application.",
    },
  ],
  faqs: [
    {
      id: "cost",
      question: "Does it cost anything to register with Apex HR?",
      answer: "No. Apex HR does not charge candidates to register, apply for roles or receive recruitment support.",
    },
    {
      id: "after-cv",
      question: "What happens after I submit my CV?",
      answer: "Your details are reviewed against current and future opportunities. A recruiter will contact you when there is a suitable match.",
    },
    {
      id: "shared-automatically",
      question: "Will my CV be sent to employers automatically?",
      answer: "No. Your profile is only introduced to an employer after the role has been discussed with you and you have agreed to proceed.",
    },
    {
      id: "not-actively-looking",
      question: "Can I register if I am not actively job hunting?",
      answer: "Yes. You can join the talent pool and indicate that you are open to hearing about selected future opportunities.",
    },
  ],
  primaryCta: { label: "Search Jobs", href: routes.jobs.path },
};

export const findTalentPageContent: InfoPageContent = {
  kicker: "Find Talent",
  heading: "Tell us about your hiring need",
  lead: "Share a few details about the role and an Apex HR advisor will follow up to discuss how we can help.",
  sections: [
    {
      heading: "What we'll ask",
      list: [
        "The role, location and employment type",
        "Seniority, timeline and any specific requirements",
        "Your company and the best way to reach you",
      ],
    },
    {
      heading: "What happens after you submit",
      body: "An Apex HR advisor reviews your enquiry and follows up to discuss the role and the right way to support your hiring need, whether that's recruitment, RPO or a related HR service.",
    },
  ],
  faqs: [
    { id: "timeline", question: "How quickly will someone respond?", answer: "An advisor follows up as soon as practical after reviewing your enquiry; specific response times are not guaranteed on this page." },
  ],
};

export const jobsPageContent: InfoPageContent = {
  kicker: "Jobs",
  heading: "Current vacancies",
  lead: "Search current vacancies handled by Apex HR.",
  sections: [
    {
      heading: "About this page",
      body: "The searchable jobs archive, including filtering by location, sector and role type, is being built out as the recruitment platform develops. No vacancies are fabricated or listed here until they are genuine, live roles.",
    },
  ],
  secondaryCta: { label: "Join the Talent Pool", href: routes.forCandidates.path },
};

export const talentPoolPageContent: InfoPageContent = {
  kicker: "Talent Pool",
  heading: "Join the Apex talent pool",
  lead: "Register your interest so Apex HR can contact you about relevant future opportunities.",
  sections: [
    {
      heading: "Why join",
      body: "Joining the talent pool means Apex HR can consider you for suitable roles as they arise, without needing to apply to each vacancy individually.",
    },
    {
      heading: "What we collect",
      body: "Registration will ask for your contact details, CV, skills and experience, and your location and role preferences, used only for recruitment purposes and handled in line with our privacy policy.",
    },
  ],
  faqs: [
    { id: "size", question: "How many candidates are currently in the talent pool?", answer: "Apex HR does not publish specific talent-pool numbers on this page." },
  ],
};
