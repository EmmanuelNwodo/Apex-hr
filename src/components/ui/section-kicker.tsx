import { cn } from "@/lib/utils";

interface SectionKickerProps {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}

/**
 * Uppercase interface kicker label per DESIGN.md section 7.2, with a
 * short accent line — the site-wide kicker treatment used everywhere a
 * kicker appears, so it never needs to be added per call site.
 */
export function SectionKicker({ children, tone = "light", className }: SectionKickerProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span aria-hidden="true" className="h-px w-6 bg-gold" />
      <p
        className={cn(
          "text-small font-semibold uppercase tracking-[0.08em]",
          tone === "light" ? "text-text-accent-light" : "text-text-accent-dark",
        )}
      >
        {children}
      </p>
    </div>
  );
}
