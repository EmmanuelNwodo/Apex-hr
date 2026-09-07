"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { candidateCta, primaryCta, primaryNavigation, utilityNavigation } from "@/config/navigation";
import { getServicesByCategory, serviceCategories } from "@/config/services";
import { sectors } from "@/config/sectors";
import { routes } from "@/config/routes";
import { LinkButton } from "@/components/ui/link-button";
import { cn } from "@/lib/utils";

/**
 * Expandable Services/Sectors row for the mobile drawer — the touch/small-
 * viewport equivalent of the desktop hover mega menu (NavMenu): a
 * disclosure button reveals the same categories/sub-items, plus a "View
 * all" link matching the desktop panel's footer link.
 */
function MobileNavDisclosure({
  label,
  hubHref,
  hubLabel,
  expanded,
  onToggle,
  children,
}: {
  label: string;
  hubHref: string;
  hubLabel: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-border-subtle">
      <button
        type="button"
        aria-expanded={expanded}
        onClick={onToggle}
        className="flex min-h-[var(--target-min-size)] w-full items-center justify-between text-body-lg font-semibold text-navy"
      >
        {label}
        <ChevronDown
          aria-hidden="true"
          className={cn("h-5 w-5 shrink-0 text-text-secondary transition-transform", expanded && "rotate-180")}
        />
      </button>
      {expanded && (
        <div className="flex flex-col gap-4 pb-4">
          {children}
          <Link href={hubHref} className="text-body font-semibold text-navy underline-offset-4 hover:underline">
            {hubLabel}
          </Link>
        </div>
      )}
    </div>
  );
}

/**
 * Accessible mobile navigation drawer. Radix Dialog provides focus
 * trapping while open and restores focus to the trigger button on close,
 * per DESIGN.md section 12.4.
 */
export function MobileMenu() {
  const [open, setOpen] = React.useState(false);
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  const closeMenu = () => {
    setOpen(false);
    setExpandedId(null);
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setExpandedId(null);
      }}
    >
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-navy xl:hidden"
        >
          <Menu aria-hidden="true" className="h-6 w-6" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="mobile-menu-overlay fixed inset-0 z-40 bg-navy/40" />
        <Dialog.Content className="mobile-menu-content fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-sm flex-col overflow-y-auto bg-surface-page px-6 py-5 shadow-[var(--shadow-modal)]">
          <div className="flex items-center justify-between">
            <Dialog.Title className="font-display text-h4 font-bold text-navy">
              Menu
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md text-navy"
              >
                <X aria-hidden="true" className="h-6 w-6" />
              </button>
            </Dialog.Close>
          </div>

          <nav aria-label="Primary" className="mt-8 flex flex-1 flex-col gap-1">
            {primaryNavigation.map((item) => {
              if (item.route.id === "services") {
                return (
                  <MobileNavDisclosure
                    key={item.route.id}
                    label={item.route.label}
                    hubHref={routes.services.path}
                    hubLabel="View all services"
                    expanded={expandedId === "services"}
                    onToggle={() => setExpandedId(expandedId === "services" ? null : "services")}
                  >
                    {serviceCategories.map((category) => (
                      <div key={category.slug}>
                        <Link
                          href={`/services/${category.slug}/`}
                          onClick={closeMenu}
                          className="text-body font-semibold text-navy underline-offset-4 hover:underline"
                        >
                          {category.title}
                        </Link>
                        <ul className="mt-2 flex flex-col gap-2">
                          {getServicesByCategory(category.slug).map((service) => (
                            <li key={service.slug}>
                              <Link
                                href={`/services/${service.slug}/`}
                                onClick={closeMenu}
                                className="text-body text-text-secondary underline-offset-4 hover:text-navy hover:underline"
                              >
                                {service.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </MobileNavDisclosure>
                );
              }

              if (item.route.id === "sectors") {
                return (
                  <MobileNavDisclosure
                    key={item.route.id}
                    label={item.route.label}
                    hubHref={routes.sectors.path}
                    hubLabel="View all sectors"
                    expanded={expandedId === "sectors"}
                    onToggle={() => setExpandedId(expandedId === "sectors" ? null : "sectors")}
                  >
                    <ul className="flex flex-col gap-2">
                      {sectors.map((sector) => (
                        <li key={sector.slug}>
                          <Link
                            href={`/sector/${sector.slug}/`}
                            onClick={closeMenu}
                            className="text-body text-text-secondary underline-offset-4 hover:text-navy hover:underline"
                          >
                            {sector.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </MobileNavDisclosure>
                );
              }

              return (
                <Link
                  key={item.route.id}
                  href={item.route.path}
                  onClick={closeMenu}
                  className="flex min-h-[var(--target-min-size)] items-center border-b border-border-subtle text-body-lg font-semibold text-navy"
                >
                  {item.route.label}
                </Link>
              );
            })}
            {utilityNavigation.map((item) => (
              <Link
                key={item.route.id}
                href={item.route.path}
                onClick={closeMenu}
                className="flex min-h-[var(--target-min-size)] items-center text-body text-text-secondary"
              >
                {item.route.label}
              </Link>
            ))}
          </nav>

          <div className="mt-6 flex flex-col gap-3 border-t border-border-subtle pt-6">
            <LinkButton
              href={candidateCta.route.path}
              onClick={closeMenu}
              variant="secondary"
              surface="light"
              className="w-full"
              data-analytics-id={candidateCta.analyticsId}
            >
              {candidateCta.label}
            </LinkButton>
            <LinkButton
              href={primaryCta.route.path}
              onClick={closeMenu}
              variant="primary"
              surface="light"
              className="w-full"
              data-analytics-id={primaryCta.analyticsId}
            >
              {primaryCta.label}
            </LinkButton>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
