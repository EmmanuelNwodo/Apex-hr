import * as React from "react";
import { cn } from "@/lib/utils";

/** Base bordered card surface used by SectorCard, InsightCard, ExpertCard. */
export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "border border-border-subtle bg-surface-card transition-colors duration-[var(--duration-fast)]",
        className,
      )}
      {...props}
    />
  );
}
