import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, UserRound } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Section } from "@/components/layout/section";
import { SectionKicker } from "@/components/ui/section-kicker";
import { Card } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/link-button";
import { RevealHeading } from "@/components/motion/reveal-heading";
import { FadeUp } from "@/components/motion/fade-up";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { routes } from "@/config/routes";
import type { RouteRecord } from "@/types/route";
import { INSIGHT_IMAGE_PLACEHOLDER, type Article } from "@/lib/wordpress";

interface ArticlePageTemplateProps {
  article: Article;
  breadcrumbTrail: RouteRecord[];
  relatedArticles: Article[];
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(date);
}

/**
 * Root-level WordPress article page (`/[slug]/`), per DESIGN.md section
 * 18.6 "Insight article": a reading-first layout (title, summary,
 * author/dates up front, ~680-760px body column, related content and CTA
 * only after the substantive article), rather than the wider two-column
 * marketing hero used by service/sector/location pages — an article is
 * read, not sold. Uses the same site-wide "Layered Rise and Reveal"
 * on-scroll entrance system as every other template.
 */
export function ArticlePageTemplate({ article, breadcrumbTrail, relatedArticles }: ArticlePageTemplateProps) {
  const primaryCategory = article.categories[0];
  const publishedLabel = formatDate(article.publishedAt);
  const wasUpdated = article.modifiedAt && article.modifiedAt !== article.publishedAt;
  const updatedLabel = wasUpdated ? formatDate(article.modifiedAt) : null;

  return (
    <div className="bg-surface-page">
      <header className="bg-navy px-5 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-20">
        <div className="mx-auto max-w-[var(--container-reading)]">
          <Breadcrumbs trail={breadcrumbTrail} tone="dark" />
          <RevealHeading className="mt-6">
            {primaryCategory && <SectionKicker tone="dark">{primaryCategory.name}</SectionKicker>}
            <h1 className="mt-4 font-display text-display font-bold text-white">{article.title}</h1>
          </RevealHeading>
          <FadeUp delay={0.15} className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-small text-white/70">
            {article.author && (
              <span className="inline-flex items-center gap-2">
                <UserRound aria-hidden="true" className="h-4 w-4" />
                {article.author.name}
              </span>
            )}
            {publishedLabel && (
              <span className="inline-flex items-center gap-2">
                <CalendarDays aria-hidden="true" className="h-4 w-4" />
                <time dateTime={article.publishedAt}>{publishedLabel}</time>
              </span>
            )}
            {updatedLabel && <span>Updated {updatedLabel}</span>}
          </FadeUp>
        </div>
      </header>

      <div className="relative aspect-21/9 w-full overflow-hidden bg-surface-warm">
        <Image
          src={article.featuredImage?.url ?? INSIGHT_IMAGE_PLACEHOLDER}
          alt={article.featuredImage?.alt ?? ""}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      </div>

      <Section tone="page">
        <div className="mx-auto max-w-[var(--container-reading)]">
          {article.excerpt && (
            <p className="text-lead text-text-secondary">{article.excerpt}</p>
          )}
          <div
            className="wp-content mt-8"
            // Content has already been sanitised server-side (allow-listed
            // tags/attributes only, scripts/handlers/unsafe protocols
            // stripped) — see src/lib/wordpress/sanitize.ts.
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />
        </div>
      </Section>

      {relatedArticles.length > 0 && (
        <Section tone="card">
          <RevealHeading>
            <SectionKicker>More insights</SectionKicker>
            <h2 className="mt-4 max-w-xl font-display text-h1 font-bold text-navy">
              Related reading
            </h2>
          </RevealHeading>
          <StaggerContainer className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedArticles.map((related) => (
              <StaggerItem key={related.id}>
                <Card className="flex h-full flex-col p-6 hover:border-navy">
                  {related.categories[0] && (
                    <p className="text-small font-semibold uppercase tracking-[0.08em] text-gold-ink">
                      {related.categories[0].name}
                    </p>
                  )}
                  <h3 className="mt-3 font-display text-h4 font-bold text-navy">
                    <Link href={`/${related.slug}/`} className="hover:underline">
                      {related.title}
                    </Link>
                  </h3>
                  {related.excerpt && (
                    <p className="mt-2 text-body text-text-secondary">{related.excerpt}</p>
                  )}
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Section>
      )}

      <div className="flex flex-col gap-6 bg-gold p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10 lg:p-14">
        <RevealHeading>
          <h3 className="font-display text-h2 font-bold text-navy">
            Talk to Apex HR about your workforce
          </h3>
          <p className="mt-2 max-w-md text-body text-navy/80">
            Whether this raised a question or a decision you&apos;re facing, an adviser can help
            you think it through.
          </p>
        </RevealHeading>
        <FadeUp delay={0.15} className="shrink-0">
          <LinkButton
            href={routes.contact.path}
            variant="primary"
            surface="light"
            data-analytics-id="article-cta-contact"
          >
            Speak to an adviser
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </LinkButton>
        </FadeUp>
      </div>
    </div>
  );
}
