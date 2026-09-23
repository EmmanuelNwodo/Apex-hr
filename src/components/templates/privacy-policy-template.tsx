import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionKicker } from "@/components/ui/section-kicker";
import { RevealHeading } from "@/components/motion/reveal-heading";
import { FadeUp } from "@/components/motion/fade-up";
import type { RouteRecord } from "@/types/route";
import type { PolicyBlock, PolicyContact, PolicyList, PolicyParagraph, PolicySection } from "@/content/privacy-policy-data";

interface PrivacyPolicyTemplateProps {
  breadcrumbTrail: RouteRecord[];
  sections: PolicySection[];
  lead: string;
  lastUpdated: string;
}

function ParagraphBlock({ block }: { block: PolicyParagraph }) {
  return <p className="text-body text-text-secondary">{block.text}</p>;
}

function ListBlock({ block }: { block: PolicyList }) {
  return (
    <ul className="flex flex-col gap-2 text-body text-text-secondary">
      {block.items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-gold-ink" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ContactBlock({ block }: { block: PolicyContact }) {
  return (
    <div className="flex flex-col gap-1">
      {block.lines.map((line) => (
        <p key={`${line.label}-${line.value}`} className="text-body text-text-secondary">
          {line.label && <span className="font-semibold text-navy">{line.label}: </span>}
          {line.href ? (
            line.external ? (
              <a
                href={line.href}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-gold-ink underline-offset-4 hover:underline"
              >
                {line.value}
              </a>
            ) : (
              <Link href={line.href} className="break-all text-gold-ink underline-offset-4 hover:underline">
                {line.value}
              </Link>
            )
          ) : (
            <span className="break-all">{line.value}</span>
          )}
        </p>
      ))}
    </div>
  );
}

function PolicyBlockRenderer({ block }: { block: PolicyBlock }) {
  if (block.type === "paragraph") return <ParagraphBlock block={block} />;
  if (block.type === "list") return <ListBlock block={block} />;
  return <ContactBlock block={block} />;
}

/**
 * /privacy-policy/ page template, per the technical SEO renderability
 * remediation's explicit requirements: the complete policy text must exist
 * in the initial server-rendered HTML with no dependency on hydration, so
 * — unlike most other page templates in this project — the policy body
 * (the table of contents and all 22 sections) is deliberately plain,
 * unanimated semantic HTML with no motion wrapper of any kind. Only the
 * hero (kicker/H1/lead/"Last updated" line) reuses the same
 * RevealHeading/FadeUp entrance primitives every other page's hero uses —
 * both are proven SSR-safe (they render the complete content before
 * hydration and only defer the entrance *animation* itself), matching the
 * "Layered Rise and Reveal" system's established, audited-safe pattern.
 *
 * The hero uses the same smaller `text-h1` treatment InfoPageTemplate uses
 * (not the larger `text-display` navy full-bleed hero on About/Services/
 * For Employers), since a legal/reference page should read as
 * substantially less "marketing" than those commercial pages.
 *
 * Desktop: a sticky table-of-contents column beside the policy `<article>`.
 * Mobile/tablet: the two stack into a single column, with the table of
 * contents rendering first as a compact, non-sticky navigation block.
 */
export function PrivacyPolicyTemplate({ breadcrumbTrail, sections, lead, lastUpdated }: PrivacyPolicyTemplateProps) {
  return (
    <>
      <Section tone="page">
        <Breadcrumbs trail={breadcrumbTrail} />
        <RevealHeading className="mt-6 max-w-(--container-reading)">
          <SectionKicker>Legal &amp; Privacy</SectionKicker>
          <h1 className="mt-3 font-display text-h1 font-bold text-navy">Privacy Policy</h1>
        </RevealHeading>
        <FadeUp delay={0.15} className="mt-4 max-w-(--container-reading)">
          <p className="text-lead text-text-secondary">{lead}</p>
          <p className="mt-3 text-small font-semibold text-text-secondary">Last updated: {lastUpdated}</p>
        </FadeUp>
      </Section>

      <Section tone="card">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(220px,0.3fr)_1fr] lg:items-start lg:gap-14">
          <nav aria-label="Privacy Policy sections" className="lg:sticky lg:top-28">
            <p className="text-caption font-semibold uppercase tracking-[0.08em] text-text-secondary">On this page</p>
            <ol className="mt-4 flex max-h-72 flex-col gap-2 overflow-y-auto border-l border-border-subtle pl-4 text-small lg:max-h-[calc(100vh-10rem)]">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-text-secondary underline-offset-4 hover:text-navy hover:underline"
                  >
                    {section.number}. {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="max-w-(--container-reading)">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-heading`}
                className="scroll-mt-28 border-t border-border-subtle py-8 first:border-t-0 first:pt-0"
              >
                <h2 id={`${section.id}-heading`} className="font-display text-h3 font-bold text-navy">
                  {section.number}. {section.heading}
                </h2>
                {section.blocks && section.blocks.length > 0 && (
                  <div className="mt-4 flex flex-col gap-4">
                    {section.blocks.map((block, index) => (
                      <PolicyBlockRenderer key={index} block={block} />
                    ))}
                  </div>
                )}
                {section.subsections?.map((sub) => (
                  <div key={sub.id} id={sub.id} className="mt-6 scroll-mt-28">
                    <h3 className="font-display text-h4 font-bold text-navy">{sub.heading}</h3>
                    <div className="mt-3 flex flex-col gap-3">
                      {sub.blocks.map((block, index) => (
                        <PolicyBlockRenderer key={index} block={block} />
                      ))}
                    </div>
                  </div>
                ))}
                {section.trailingBlocks && section.trailingBlocks.length > 0 && (
                  <div className="mt-6 flex flex-col gap-4">
                    {section.trailingBlocks.map((block, index) => (
                      <PolicyBlockRenderer key={index} block={block} />
                    ))}
                  </div>
                )}
              </section>
            ))}
          </article>
        </div>
      </Section>
    </>
  );
}
