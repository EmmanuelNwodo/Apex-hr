import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  surface?: "light" | "dark";
  className?: string;
}

/**
 * TEMPORARY text-based brand mark.
 *
 * brand-assets/Apex_HR_Brand_Style_Guide.pptx contains no embedded logo
 * image (the wordmark is drawn with native PowerPoint shapes, not an
 * exportable asset), so no SVG/PNG lockup is available to use here. Replace
 * this component with the approved logo asset — see DESIGN.md section 5 and
 * section 30 — once SVG primary, reversed and monogram files are supplied.
 * Do not redraw or approximate the real logo; this is plain text only.
 */
export function Logo({ surface = "light", className }: LogoProps) {
  return (
    <Link href="/" className={cn("inline-flex flex-col", className)}>
      <span
        className={cn(
          "inline-flex items-baseline gap-1.5 font-display text-h4 font-bold tracking-tight",
          surface === "light" ? "text-navy" : "text-white",
        )}
      >
        Apex
        <span className={surface === "light" ? "text-gold-ink" : "text-gold"}>HR</span>
      </span>
      <span
        className={cn(
          "text-caption font-semibold uppercase tracking-widest",
          surface === "light" ? "text-slate" : "text-white/70",
        )}
      >
        Global People Partner
      </span>
    </Link>
  );
}
