import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionKicker } from "@/components/ui/section-kicker";
import { SectionHeading } from "@/components/ui/section-heading";
import { LinkButton } from "@/components/ui/link-button";
import { FaqWithContactForm } from "@/components/content/faq-with-contact-form";
import { RevealHeading } from "@/components/motion/reveal-heading";
import { FadeUp } from "@/components/motion/fade-up";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import type { RouteRecord } from "@/types/route";
import type { InfoPageContent } from "@/content/supporting-pages-data";

interface InfoPageTemplateProps {
  breadcrumbTrail: RouteRecord[];
  content: InfoPageContent;
}

/**
 * One flexible template shared by every general-information and
 * conversion-landing page (About, Contact, For Employers, For Candidates,
 * Find Talent, Jobs, Talent Pool) — these pages share the same hero +
 * sections + optional FAQ + CTA structure, so a single template renders
 * them all rather than several near-identical components, per DESIGN.md
 * section 27 "Do not create a unique ... component for every page."
 *
 * Every section uses the site-wide "Layered Rise and Reveal" on-scroll
 * entrance system (src/components/motion/*): headings rise via
 * RevealHeading, supporting copy via FadeUp, and list items stagger via
 * StaggerContainer/StaggerItem. Nothing here changes layout, copy, colour
 * or functionality — only how each block enters as a visitor scrolls to
 * it.
 */
export function InfoPageTemplate({ breadcrumbTrail, content }: InfoPageTemplateProps) {
  return (
    <>
      <Section tone="page">
        <Breadcrumbs trail={breadcrumbTrail} />
        <RevealHeading className="mt-6 max-w-(--container-reading)">
          <SectionKicker>{content.kicker}</SectionKicker>
          <h1 className="mt-3 font-display text-h1 font-bold text-navy">{content.heading}</h1>
          <p className="mt-4 text-lead text-text-secondary">{content.lead}</p>
        </RevealHeading>
        {(content.primaryCta || content.secondaryCta) && (
          <FadeUp delay={0.15} className="mt-8 flex flex-wrap gap-4">
            {content.primaryCta && (
              <LinkButton href={content.primaryCta.href} variant="primary" surface="light">
                {content.primaryCta.label}
              </LinkButton>
            )}
            {content.secondaryCta && (
              <LinkButton href={content.secondaryCta.href} variant="secondary" surface="light">
                {content.secondaryCta.label}
              </LinkButton>
            )}
          </FadeUp>
        )}
      </Section>

      {content.sections.map((section, index) => (
        <Section key={section.heading} tone={index % 2 === 0 ? "card" : "page"}>
          <RevealHeading>
            <SectionHeading title={section.heading} />
          </RevealHeading>
          {section.body && (
            <FadeUp delay={0.15}>
              <p className="mt-4 text-body-lg text-text-secondary">{section.body}</p>
            </FadeUp>
          )}
          {section.list && (
            <StaggerContainer>
              <ul className="mt-4 flex flex-col gap-2">
                {section.list.map((item) => (
                  <StaggerItem key={item} as="li" className="text-body text-text-secondary">
                    {item}
                  </StaggerItem>
                ))}
              </ul>
            </StaggerContainer>
          )}
        </Section>
      ))}

      {content.faqs && content.faqs.length > 0 && (
        <Section tone="card">
          <RevealHeading>
            <SectionHeading title="Frequently asked questions" />
          </RevealHeading>
          <div className="mt-8">
            <FaqWithContactForm items={content.faqs} />
          </div>
        </Section>
      )}
    </>
  );
}
