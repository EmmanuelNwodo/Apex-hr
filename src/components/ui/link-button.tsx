import * as React from "react";
import Link, { type LinkProps } from "next/link";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface LinkButtonProps
  extends LinkProps,
    VariantProps<typeof buttonVariants>,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {}

/** Renders a Next.js Link styled as a button, for CTAs that navigate. */
const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, variant, surface, size, ...props }, ref) => {
    return (
      <Link
        className={cn(buttonVariants({ variant, surface, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
LinkButton.displayName = "LinkButton";

export { LinkButton };
