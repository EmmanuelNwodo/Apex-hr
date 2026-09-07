import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button primitive implementing DESIGN.md section 14 (sizing, variants,
 * states). `surface` selects the light- or dark-background treatment —
 * Warm Gold is never used as a filled background with white text.
 */
const buttonVariants = cva(
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-md px-6 font-body text-body font-semibold transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "",
        secondary: "border bg-transparent",
        tertiary: "h-auto bg-transparent px-0 underline underline-offset-4 hover:no-underline",
        destructive: "border border-error bg-transparent text-error hover:bg-error/5",
      },
      surface: {
        light: "",
        dark: "",
      },
      size: {
        default: "h-12 min-w-[var(--target-min-size)]",
        compact: "h-11 min-w-[var(--target-min-size)] px-5 text-small",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        surface: "light",
        class: "bg-navy text-white hover:bg-navy/90",
      },
      {
        variant: "primary",
        surface: "dark",
        class: "bg-cream text-navy hover:bg-white",
      },
      {
        variant: "secondary",
        surface: "light",
        class: "border-navy text-navy hover:bg-navy/5",
      },
      {
        variant: "secondary",
        surface: "dark",
        class: "border-gold text-gold hover:bg-white/5",
      },
      {
        variant: "tertiary",
        surface: "light",
        class: "text-navy",
      },
      {
        variant: "tertiary",
        surface: "dark",
        class: "text-gold",
      },
    ],
    defaultVariants: {
      variant: "primary",
      surface: "light",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, surface, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, surface, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
