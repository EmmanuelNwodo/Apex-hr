import * as React from "react";
import { cn } from "@/lib/utils";

const maxWidthBySize = {
  reading: "max-w-[var(--container-reading)]",
  standard: "max-w-[var(--container-standard)]",
  wide: "max-w-[var(--container-wide)]",
  full: "max-w-none",
} as const;

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: keyof typeof maxWidthBySize;
}

/** Horizontally centred content container using DESIGN.md section 9.1 widths. */
export function Container({
  size = "standard",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-[var(--page-gutter)]",
        maxWidthBySize[size],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
