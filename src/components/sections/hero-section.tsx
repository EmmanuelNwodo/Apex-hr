import Link from "next/link";
import { MapPin, Target, UsersRound } from "lucide-react";
import { SectionKicker } from "@/components/ui/section-kicker";
import { LinkButton } from "@/components/ui/link-button";
import { HeroVideo } from "@/components/motion/hero-video";
import { TypewriterLoop } from "@/components/motion/typewriter-loop";
import { WorkplaceFactCard } from "@/components/content/workplace-fact-card";
import { hero, heroTrustIndicators, workplaceFacts } from "@/content/home";

const trustIcons = [MapPin, UsersRound, Target];

/**
 * Employer-focused hero, per DESIGN.md 17.1 and CLAUDE.md section 11 —
 * redesigned per later explicit user instruction into a full-width,
 * full-bleed background-video hero (previously a two-column grid with the
 * video in its own right-hand panel). The approved brand hero video plays
 * behind everything (muted, looping, per DESIGN.md 19.4/21.4 — see
 * HeroVideo for the reduced-motion behaviour, preserved unchanged), with a
 * left-to-right dark gradient over it so the content stays readable while
 * the people in the video remain visible on the right. `object-position`
 * is tuned per breakpoint (not one universal value) because the video's
 * own 1.59:1 source aspect ratio is narrower than most desktop hero
 * containers — at wide/short desktop aspect ratios `object-cover` already
 * shows the video's full width with no horizontal crop at all, so the
 * position value mostly matters at the narrower/taller aspect ratios
 * (mobile, some tablet sizes) where real horizontal cropping occurs.
 *
 * PROTECTED: the animated H1 is `<TypewriterLoop text={hero.heading} />`
 * inside an `<h1 aria-label={hero.heading}>` — the exact pairing already
 * used before this redesign. TypewriterLoop's own file
 * (src/components/motion/typewriter-loop.tsx) is not touched at all, and
 * this call site changes only surrounding presentation classes (colour,
 * size, positioning), never the component's props, text, or defaults
 * (typing/deleting speed, five-second hold, cursor/fade behaviour, reduced-
 * motion handling all come from that file's own default prop values,
 * unchanged and not overridden here).
 *
 * Layering (bottom to top): HeroVideo (full-bleed, absolute, z-0) ->
 * gradient overlays (absolute, z-1) -> content column + trust row
 * (relative, z-10) -> pause/play control + workplace-fact card (absolute,
 * z-20, so they always paint above the full-bleed content column even
 * though it comes later in DOM order). `isolate` on the section keeps this
 * stacking local so it can never interfere with unrelated page content
 * behind/after it.
 */
export function HeroSection() {
  return (
    <section className="relative isolate min-h-[clamp(760px,88svh,92svh)] overflow-hidden bg-navy">
      <HeroVideo
        src="/videos/apex-hr-hero-video.mp4"
        className="absolute inset-0 z-0 h-full w-full object-cover object-[70%_center] sm:object-[66%_center] md:object-[62%_center] lg:object-[58%_center] xl:object-[55%_center]"
        controlClassName="absolute bottom-32 right-4 z-20 sm:right-6 lg:right-10 lg:bottom-116"
      />

      {/*
       * Auto-rotating workplace-fact card, overlapping the video's lower-right
       * corner. Shown from `lg` up only: below that, the card's own width
       * (near-full-viewport on phones, ~640-768px still not much narrower)
       * was measured overlapping the primary CTA, paragraph or trust-indicator
       * row — content readability takes priority over this decorative
       * embellishment on smaller viewports, matching the trust row's own
       * `sm:flex` cutoff. Repositioned (no negative bleed, generous bottom
       * clearance) so it stays fully inside the now-edge-to-edge hero and
       * clear of the site-wide floating contact button fixed at the
       * viewport's own bottom-right corner — the hero's min-height is only a
       * floor, so on shorter laptop viewports (e.g. 1366x768) actual
       * rendered height (and therefore this card's real distance from the
       * viewport's own bottom edge) can be less than the floor alone would
       * suggest.
       */}
      <WorkplaceFactCard
        facts={workplaceFacts}
        className="hidden lg:block lg:right-10 lg:bottom-56 lg:z-20"
      />

      {/* Dark left-to-right gradient: strong text contrast on the left, fading to a clear view of the people on the right. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-1 bg-linear-to-r from-navy/95 via-navy/75 to-navy/10"
      />
      {/* Subtle bottom gradient so the trust-indicator row stays readable over any part of the video. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-1 h-32 bg-linear-to-t from-navy/70 to-transparent sm:h-40"
      />

      <div className="relative z-10 flex min-h-[clamp(760px,88svh,92svh)] flex-col justify-center px-(--page-gutter) py-16 md:py-20 lg:py-24">
        <div className="max-w-160">
          <SectionKicker tone="dark">{hero.kicker}</SectionKicker>
          <h1
            className="mt-5 max-w-2xl font-display text-display font-bold text-white"
            aria-label={hero.heading}
          >
            <TypewriterLoop text={hero.heading} />
          </h1>
          <p className="mt-6 max-w-[45ch] text-lead text-white/80">{hero.description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <LinkButton
              href={hero.primaryCta.href}
              variant="primary"
              surface="dark"
              className="bg-gold text-navy hover:bg-gold/90"
              data-analytics-id={hero.primaryCta.analyticsId}
            >
              {hero.primaryCta.label}
            </LinkButton>
            <LinkButton
              href={hero.secondaryCta.href}
              variant="secondary"
              surface="dark"
              className="border-white/60 text-white hover:bg-white/10"
              data-analytics-id={hero.secondaryCta.analyticsId}
            >
              {hero.secondaryCta.label}
            </LinkButton>
          </div>
          <p className="mt-6 text-small text-white/70">
            Hiring for yourself?{" "}
            <Link
              href={hero.candidateLink.href}
              data-analytics-id={hero.candidateLink.analyticsId}
              className="font-semibold text-white underline-offset-4 hover:underline"
            >
              {hero.candidateLink.label}
            </Link>
          </p>
        </div>

        <div className="mt-12 hidden flex-wrap items-center gap-x-5 gap-y-3 sm:flex lg:mt-16">
          {heroTrustIndicators.map((item, index) => {
            const Icon = trustIcons[index];
            return (
              <div key={item} className="flex items-center gap-5">
                {index > 0 && <span aria-hidden="true" className="h-4 w-px bg-white/25" />}
                <span className="flex items-center gap-2 text-small text-white/80">
                  {Icon && <Icon aria-hidden="true" className="h-4 w-4 text-gold" />}
                  {item}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
