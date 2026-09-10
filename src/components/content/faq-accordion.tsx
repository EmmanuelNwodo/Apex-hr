"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/content/home";

interface FaqAccordionProps {
  items: FaqItem[];
  className?: string;
}

/**
 * Accessible FAQ accordion using native buttons with aria-expanded and
 * aria-controls (WAI-ARIA APG accordion pattern), per CLAUDE.md section 18
 * and DESIGN.md section 24. DESIGN.md section 15.4/17.10 requires the FAQ
 * to work without animation, so open/close is an instant visibility
 * change, not a transition.
 *
 * Only the first answer starts open, so the section reads as a genuine
 * accordion rather than a fully expanded static list — per explicit later
 * user instruction, which per CLAUDE.md section 3 takes priority over the
 * previous "every answer starts open" default. Keeping one answer open by
 * default (rather than all closed) still leaves some FAQ content reachable
 * in the server-rendered HTML if JavaScript fails, per CLAUDE.md section 15
 * "Keep essential content present in rendered HTML" — the remaining
 * answers are still present in the HTML source (so still crawlable), just
 * visually and programmatically hidden (`hidden` attribute) until a click.
 */
export function FaqAccordion({ items, className }: FaqAccordionProps) {
  const [openItems, setOpenItems] = React.useState<Set<string>>(
    () => new Set(items.length > 0 ? [items[0].id] : []),
  );

  function toggle(id: string) {
    setOpenItems((previous) => {
      const next = new Set(previous);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div
      className={cn(
        "flex flex-col divide-y divide-border-subtle border-t border-border-subtle",
        className,
      )}
    >
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        const panelId = `faq-panel-${item.id}`;
        const buttonId = `faq-button-${item.id}`;

        return (
          <div key={item.id} className="py-5">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-4 text-left text-body-lg font-semibold text-navy"
              >
                {item.question}
                {isOpen ? (
                  <Minus aria-hidden="true" className="h-5 w-5 shrink-0 text-gold-ink" />
                ) : (
                  <Plus aria-hidden="true" className="h-5 w-5 shrink-0 text-gold-ink" />
                )}
              </button>
            </h3>
            <p
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="mt-3 text-body text-text-secondary"
            >
              {item.answer}
            </p>
          </div>
        );
      })}
    </div>
  );
}
