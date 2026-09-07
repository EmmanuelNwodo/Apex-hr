import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { routes } from "@/config/routes";
import type { RouteRecord } from "@/types/route";
import { cn } from "@/lib/utils";

interface BreadcrumbsProps {
  /** Trail excluding Home, which is always prepended. */
  trail: RouteRecord[];
  /** `"dark"` for a breadcrumb placed on a dark/navy background. */
  tone?: "light" | "dark";
}

/** Visible breadcrumb trail per DESIGN.md section 18.1 and CLAUDE.md section 9. */
export function Breadcrumbs({ trail, tone = "light" }: BreadcrumbsProps) {
  const items = [routes.home, ...trail];

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("text-small", tone === "light" ? "text-text-secondary" : "text-white/55")}
    >
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.id} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
              )}
              {isLast ? (
                <span
                  aria-current="page"
                  className={cn("font-semibold", tone === "light" ? "text-text-primary" : "text-gold")}
                >
                  {item.label}
                </span>
              ) : (
                <Link href={item.path} className="underline-offset-2 hover:underline">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
