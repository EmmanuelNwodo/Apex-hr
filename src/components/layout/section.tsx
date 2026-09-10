import * as React from "react";
import { cn } from "@/lib/utils";

const toneClasses = {
  page: "bg-surface-page text-text-primary",
  card: "bg-surface-card text-text-primary",
  warm: "bg-surface-warm text-text-primary",
  dark: "bg-surface-dark text-text-reversed",
} as const;

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: keyof typeof toneClasses;
  /** Set false when the section provides its own container (e.g. full-bleed media). */
  contained?: boolean;
  /**
   * `"auto"` (default, site-wide): no side padding from the `sm` breakpoint
   * up, only a small mobile gutter. `"always"`: keeps a real left/right
   * gutter at every breakpoint — used on the homepage per later explicit
   * user instruction, which narrowed the earlier "remove margin everywhere"
   * change back to just the homepage; every other page stays `"auto"`.
   */
  gutter?: "auto" | "always";
}

/**
 * Standard homepage/interior page section: applies a surface tone and
 * DESIGN.md section 8 vertical rhythm. By default, content spans the
 * section's full width with no side margin from `sm` up — only a small
 * mobile gutter, so text doesn't touch the phone screen edge — per earlier
 * explicit user instruction. Pass `gutter="always"` (used on the homepage)
 * to keep a real side gutter at every breakpoint instead. Neither mode
 * touches the page header/footer or the "cream page shell" outer wrapper
 * used by About/Employers/Candidates/Contact and the services/sectors hub
 * and template pages, since those aren't `<Section>` instances.
 */
export function Section({
  tone = "page",
  contained = true,
  gutter = "auto",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-16 md:py-20 lg:py-28",
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {contained ? (
        <div className={cn("w-full", gutter === "always" ? "px-(--page-gutter)" : "px-5 sm:px-0")}>
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}
