import Link from "next/link";
import { cn } from "@/lib/utils";

export interface CrawlableLinkListItem {
  label: string;
  href: string;
}

interface CrawlableLinkListProps {
  items: CrawlableLinkListItem[];
  caption?: string;
  tone?: "light" | "dark";
  className?: string;
}

/**
 * Compact, always-server-rendered companion link list: a real `<a href>`
 * for every item, styled to match the pill links already used inside the
 * site's interactive "explorer" widgets (ServiceFamilyNavigator,
 * EmployerNeedsExplorer, CategoryServiceExplorer). Exists purely so every
 * destination one of those JS-driven pickers exposes only for its
 * currently-active item is *also* reachable as a real link in the initial
 * server-rendered HTML and without JavaScript — see the technical SEO
 * renderability audit's remediation (docs reference: SectionFamilyNavigator
 * / SectorServiceExplorer / EmployerNeedsExplorer / EmployerChallengeNavigator
 * findings). Deliberately does not repeat each item's description — only
 * the interactive widget shows that — so this never becomes a large,
 * visually duplicated content block.
 *
 * Never a client component: a plain, static link list has nothing to
 * hydrate, and keeping it a server component guarantees it can never
 * itself become JS-dependent.
 */
export function CrawlableLinkList({ items, caption, tone = "light", className }: CrawlableLinkListProps) {
  if (items.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {caption && (
        <span
          className={cn(
            "mr-1 text-caption font-semibold uppercase tracking-[0.08em]",
            tone === "dark" ? "text-white/55" : "text-text-secondary",
          )}
        >
          {caption}
        </span>
      )}
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "rounded-full border px-4 py-2 text-small underline-offset-4 transition-colors duration-(--duration-fast)",
            tone === "dark"
              ? "border-white/20 bg-white/5 text-white/80 hover:border-white hover:text-white hover:underline"
              : "border-border-subtle bg-surface-page text-navy hover:border-navy hover:underline",
          )}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
