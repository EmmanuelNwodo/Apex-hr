import { SectionKicker } from "@/components/ui/section-kicker";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** `"h1"` renders a larger, hero-scale title in a narrower column. */
  size?: "h1" | "h2";
}

/** Kicker + heading + optional supporting statement, per DESIGN.md section 10. */
export function SectionHeading({
  kicker,
  title,
  description,
  tone = "light",
  align = "left",
  as: Heading = "h2",
  className,
  size = "h2",
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", className)}>
      {kicker && (
        <SectionKicker tone={tone} className={align === "center" ? "justify-center" : undefined}>
          {kicker}
        </SectionKicker>
      )}
      <Heading
        className={cn(
          "mt-3 font-display font-bold",
          size === "h1" ? "max-w-2xl text-h1" : "text-h2",
          align === "center" && size === "h1" && "mx-auto",
          tone === "light" ? "text-navy" : "text-white",
        )}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-[60ch] text-body-lg",
            align === "center" && "mx-auto",
            tone === "light" ? "text-text-secondary" : "text-white/80",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
