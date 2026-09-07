"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps extends LinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  children: ReactNode;
  activeClassName?: string;
}

/**
 * Navigation link that marks itself `aria-current="page"` and applies an
 * active style when it matches the current route, per the phase 2 header
 * requirement for correct active/hover states. This is the narrowest
 * client boundary needed for that — SiteHeader itself stays a Server
 * Component.
 */
export function NavLink({ href, className, activeClassName, children, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const targetPath = typeof href === "string" ? href : href.pathname ?? "";
  const isActive = targetPath !== "/" && pathname.startsWith(targetPath);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(className, isActive && (activeClassName ?? "underline"))}
      {...props}
    >
      {children}
    </Link>
  );
}
