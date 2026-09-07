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
  lead: "Apex HR is a UK HR, recruitment and people-consulting partner built to support employers across the full people lifecycle.",
  sections: [
    {
      heading: "What we do",
      body: "Apex HR combines outsourced HR support, recruitment and strategic workforce advisory in one partner, so employers don't have to coordinate multiple separate suppliers for related people needs.",
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
  lead: "Tell us about your hiring or HR need and an Apex HR advisor will get back to you.",
  sections: [
    {
      heading: "How to get in touch",
      body: "The fastest way to reach Apex HR is through the Find Talent form, which routes your enquiry to the right advisor. Verified direct contact details will be published here once confirmed.",
    },
    {
      heading: "What happens next",
      body: "After you submit an enquiry, an Apex HR advisor reviews the details and follows up to discuss your needs and appropriate next steps.",
    },
  ],
  primaryCta: { label: "Find Talent", href: routes.findTalent.path },
};

export const forEmployersPageContent: InfoPageContent = {
  kicker: "Employers",
  heading: "HR and recruitment support for employers",
  lead: "Apex HR supports employers with outsourced HR, recruitment and strategic people advisory, so you can focus on running the business.",
  sections: [
    {
      heading: "Where to start",
      body: "Most employers come to Apex HR with one of three needs: recruiting talent, getting day-to-day HR support in place, or working through a specific people issue or strategic decision.",
      list: [
        "Recruit talent — permanent, contract or executive hiring",
        "Outsource HR — ongoing advisory, policies and compliance",
        "Resolve a people issue — investigations, mediation, redundancy support",
        "Improve organisational performance — structure, performance and reward",
        "Transform HR technology — HRIS, analytics and digital HR",
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
  lead: "Search current vacancies, join the Apex talent pool, or explore resources to support your job search.",
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
      body: "An Apex HR advisor reviews your enquiry and follows up to discuss the role and the right way to support your hiring need — whether that's recruitment, RPO or a related HR service.",
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
