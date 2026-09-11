import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CircleCheck,
  Mail,
  MapPin,
  MessagesSquare,
  Phone,
} from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionKicker } from "@/components/ui/section-kicker";
import { LinkButton } from "@/components/ui/link-button";
import { RevealHeading } from "@/components/motion/reveal-heading";
import { FadeUp } from "@/components/motion/fade-up";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { ContactEnquiryForm } from "@/components/content/contact-enquiry-form";
import { contactPageContent } from "@/content/supporting-pages-data";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbJsonLd, getContactPageJsonLd, getFaqPageJsonLd, toJsonLdScript } from "@/lib/seo/structured-data";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";

export const metadata = buildMetadata({
  title: "Contact",
  description: contactPageContent.lead,
  path: routes.contact.path,
  index: routes.contact.readyToIndex,
});

const nextSteps = [
  { title: "We review your enquiry", detail: "Your message is routed to the adviser best placed to understand your need." },
  { title: "We arrange a conversation", detail: "We clarify the situation, desired outcome and any immediate priorities." },
  { title: "We recommend the next step", detail: "You receive a practical route forward, with scope and expectations made clear." },
];

const enquiryReasons = [
  "One clear point of contact",
  "Practical, confidential guidance",
  "No-obligation initial discussion",
];

/**
 * Contact page, restructured per the approved reference layout: a dark
 * hero with direct call/email links, an adaptive enquiry form (see
 * ContactEnquiryForm), a "what happens next" strip, a two-column
 * alternative-routes section (candidate hub plus direct contact repeat),
 * an FAQ section and a closing CTA — inside the same rounded cream page
 * shell used across the site's other rebuilt pages. Unlike the reference,
 * the form does not claim to submit to a live backend, since no
 * CRM/email-sending integration exists yet in this codebase (CLAUDE.md
 * section 13); see the doc comment on ContactEnquiryForm.
 *
 * Every section below uses the site-wide "Layered Rise and Reveal"
 * on-scroll entrance system (src/components/motion/*): headings rise via
 * RevealHeading, supporting copy via FadeUp, and card/list groups stagger
 * via StaggerContainer/StaggerItem. The enquiry form itself reveals its
 * own fields progressively (see ContactEnquiryForm). Nothing here changes
 * layout, copy, colour or functionality — only how each block enters as a
 * visitor scrolls to it.
 */
export default function ContactPage() {
  const jsonLd = [
    getContactPageJsonLd(routes.contact.path),
    getBreadcrumbJsonLd(routes.home.label, [routes.contact]),
  ];

  return (
    <div className="bg-surface-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLdScript(jsonLd) }}
      />
      <header className="grid grid-cols-1 overflow-hidden bg-navy lg:grid-cols-[1.06fr_0.94fr]">
            <div className="flex flex-col justify-center gap-6 p-8 sm:p-10 lg:p-16">
              <Breadcrumbs trail={[routes.contact]} tone="dark" />
              <RevealHeading>
                <SectionKicker tone="dark">Contact Apex HR</SectionKicker>
                <h1 className="mt-4 max-w-xl font-display text-display font-bold text-white">
                  Let&apos;s talk about what your people <span className="text-gold">need next</span>.
                </h1>
              </RevealHeading>
              <FadeUp delay={0.15} className="flex flex-col gap-6">
                <p className="max-w-lg text-lead text-white/70">{contactPageContent.lead}</p>
                <div className="flex flex-wrap items-center gap-4">
                  <LinkButton href="#contact-form-area" variant="primary" surface="dark">
                    Start an enquiry
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </LinkButton>
                  <LinkButton href={routes.findTalent.path} variant="secondary" surface="dark">
                    Use the Find Talent form
                  </LinkButton>
                </div>
              </FadeUp>
            </div>

            <StaggerContainer className="flex flex-col justify-center gap-4 border-t border-white/10 p-10 lg:border-t-0 lg:border-l lg:p-14">
              <StaggerItem>
                <a
                  href={`tel:${siteConfig.contactPhone.tel}`}
                  className="group flex items-center gap-4 rounded-md border border-white/15 bg-white/8 p-5 transition-colors duration-(--duration-fast) hover:bg-white/12"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/20 text-gold">
                    <Phone aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-small text-white/60">Call us</span>
                    <span className="block text-body-lg font-bold text-white">{siteConfig.contactPhone.display}</span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-white/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </StaggerItem>
              <StaggerItem>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="group flex items-center gap-4 rounded-md border border-white/15 bg-white/8 p-5 transition-colors duration-(--duration-fast) hover:bg-white/12"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/20 text-gold">
                    <Mail aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-small text-white/60">Email us</span>
                    <span className="block text-body-lg font-bold text-white">{siteConfig.contactEmail}</span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-white/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </StaggerItem>
              <StaggerItem>
                <div className="flex items-center gap-4 rounded-md border border-white/15 bg-white/8 p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/20 text-gold">
                    <MapPin aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-small text-white/60">Based in</span>
                    <span className="block text-body-lg font-bold text-white">London, United Kingdom</span>
                  </span>
                </div>
              </StaggerItem>
              <p className="text-small text-white/50">Enquiries are directed to the most relevant Apex HR adviser.</p>
            </StaggerContainer>
          </header>

          <section id="contact-form-area" className="grid grid-cols-1 gap-10 p-8 sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:p-14">
            <div>
              <RevealHeading>
                <SectionKicker tone="light">Tell us what you need</SectionKicker>
                <h2 className="mt-4 max-w-md font-display text-h1 font-bold text-navy">
                  Start with the right conversation
                </h2>
              </RevealHeading>
              <FadeUp delay={0.15}>
                <p className="mt-4 text-body text-text-secondary">
                  Choose the reason for your enquiry and share a little context, and the form
                  adapts so your message reaches the right person.
                </p>
              </FadeUp>
              <StaggerContainer>
                <ul className="mt-8 flex flex-col gap-3">
                  {enquiryReasons.map((reason) => (
                    <StaggerItem key={reason} as="li" className="flex items-center gap-3 text-body text-navy">
                      <CircleCheck aria-hidden="true" className="h-5 w-5 shrink-0 text-gold-ink" />
                      {reason}
                    </StaggerItem>
                  ))}
                </ul>
              </StaggerContainer>
            </div>

            <ContactEnquiryForm />
          </section>

          <section className="bg-navy p-8 sm:p-10 lg:p-14">
            <RevealHeading className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
              <div>
                <SectionKicker tone="dark">What happens next</SectionKicker>
                <h2 className="mt-4 max-w-lg font-display text-h1 font-bold text-white">
                  Simple from the first message
                </h2>
              </div>
              <p className="text-body text-white/70">
                A clear three-step journey means every enquiry reaches a real person and leads
                to a useful next step.
              </p>
            </RevealHeading>

            <StaggerContainer className="mt-10 grid grid-cols-1 gap-8 border-t border-white/20 pt-8 sm:grid-cols-3">
              {nextSteps.map((step, index) => (
                <StaggerItem key={step.title}>
                  <span className="font-display text-small text-gold">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-display text-h4 font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-body text-white/70">{step.detail}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>

          <StaggerContainer
            as="section"
            aria-label="Alternative contact routes"
            className="grid grid-cols-1 gap-px overflow-hidden border-b border-border-subtle bg-border-subtle sm:grid-cols-2"
          >
            <StaggerItem className="flex flex-col gap-4 bg-surface-card p-8 sm:p-10">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-success/10 text-success">
                <BriefcaseBusiness aria-hidden="true" className="h-6 w-6" />
              </span>
              <h2 className="font-display text-h3 font-bold text-navy">
                Looking for your next opportunity?
              </h2>
              <p className="text-body text-text-secondary">
                Candidate enquiries, CV registration and future vacancies have a dedicated
                route so you can get the right support faster.
              </p>
              <Link
                href={routes.forCandidates.path}
                className="mt-auto inline-flex w-fit items-center gap-2 text-caption font-bold uppercase tracking-widest text-gold-ink"
              >
                Visit the candidate hub
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </StaggerItem>

            <StaggerItem className="flex flex-col gap-4 bg-surface-card p-8 sm:p-10">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-success/10 text-success">
                <MessagesSquare aria-hidden="true" className="h-6 w-6" />
              </span>
              <h2 className="font-display text-h3 font-bold text-navy">Prefer to speak directly?</h2>
              <p className="text-body text-text-secondary">
                Call Apex HR on <strong className="text-navy">{siteConfig.contactPhone.display}</strong> or
                email <strong className="text-navy">{siteConfig.contactEmail}</strong> to begin the
                conversation.
              </p>
              <a
                href={`tel:${siteConfig.contactPhone.tel}`}
                className="mt-auto inline-flex w-fit items-center gap-2 text-caption font-bold uppercase tracking-widest text-gold-ink"
              >
                Call Apex HR
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </StaggerItem>
          </StaggerContainer>

          {contactPageContent.faqs && contactPageContent.faqs.length > 0 && (
            <section className="grid grid-cols-1 gap-12 p-8 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:p-14">
              <RevealHeading>
                <SectionKicker tone="light">Common questions</SectionKicker>
                <h2 className="mt-4 font-display text-h2 font-bold text-navy">Before you get in touch</h2>
              </RevealHeading>
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: toJsonLdScript(getFaqPageJsonLd({ faqs: contactPageContent.faqs })) }}
              />
              <FaqAccordion items={contactPageContent.faqs} />
            </section>
          )}

      <div className="flex flex-col gap-6 bg-gold p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10 lg:p-14">
        <RevealHeading>
          <h3 className="font-display text-h2 font-bold text-navy">Ready to start the conversation?</h3>
          <p className="mt-2 max-w-md text-body text-navy/80">
            Share a few details and an Apex HR adviser will follow up to discuss the right
            next step.
          </p>
        </RevealHeading>
        <FadeUp delay={0.15} className="shrink-0">
          <LinkButton href="#contact-form-area" variant="primary" surface="light">
            Start an enquiry
          </LinkButton>
        </FadeUp>
      </div>
    </div>
  );
}
