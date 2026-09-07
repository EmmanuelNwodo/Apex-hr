import * as React from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";

const toneClasses = {
  page: "bg-surface-page text-text-primary",
  card: "bg-surface-card text-text-primary",
  warm: "bg-surface-warm text-text-primary",
  dark: "bg-surface-dark text-text-reversed",
} as const;

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: keyof typeof toneClasses;
  containerSize?: React.ComponentProps<typeof Container>["size"];
  /** Set false when the section provides its own container (e.g. full-bleed media). */
  contained?: boolean;
}

/**
 * Standard homepage/interior page section: applies a surface tone and
 * DESIGN.md section 8 vertical rhythm, and wraps content in a Container
 * unless `contained` is false.
 */
export function Section({
  tone = "page",
  containerSize = "standard",
  contained = true,
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
      {contained ? <Container size={containerSize}>{children}</Container> : children}
    </section>
  );
}
