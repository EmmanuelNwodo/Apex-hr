"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavMenuProps {
  label: string;
  href: string;
  linkClassName?: string;
  activeClassName?: string;
  panelClassName?: string;
  children: React.ReactNode;
}

// Delay before closing on mouseleave, long enough for a diagonal cursor
// move from the trigger into the panel below it.
const CLOSE_DELAY_MS = 150;

/**
 * Hoverable desktop nav item with a dropdown panel (services/sectors mega
 * menu), per the request for the Services and Sectors nav items to reveal
 * their sub-items on hover. The trigger stays a real link to the section's
 * hub route — hovering/focusing it is a shortcut to the panel, not a
 * replacement for direct navigation. Opens on mouse hover AND on keyboard
 * focus (`onFocus` bubbles from any link inside), closes on mouseleave
 * (with a short delay), on blur to somewhere outside the menu, on Escape
 * (returning focus to the trigger) and on an outside click/tap — so this
 * is keyboard- and touch-operable, not hover-only, per DESIGN.md/CLAUDE.md
 * accessibility requirements. The panel unmounts entirely when closed, so
 * its links are never reachable by Tab while hidden.
 */
export function NavMenu({ label, href, linkClassName, activeClassName, panelClassName, children }: NavMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = useId();
  const pathname = usePathname();
  const isActive = href !== "/" && pathname.startsWith(href);

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const openMenu = () => {
    clearCloseTimeout();
    setOpen(true);
  };

  const scheduleClose = () => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!containerRef.current?.contains(event.relatedTarget as Node | null)) {
      setOpen(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      setOpen(false);
      containerRef.current?.querySelector("a")?.focus();
    }
  };

  useEffect(() => {
    if (!open) return;

    const handlePointerDownOutside = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node | null)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDownOutside);
    return () => document.removeEventListener("pointerdown", handlePointerDownOutside);
  }, [open]);

  useEffect(() => () => clearCloseTimeout(), []);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onFocus={openMenu}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <Link
        href={href}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={panelId}
        aria-current={isActive ? "page" : undefined}
        className={cn(linkClassName, isActive && (activeClassName ?? "underline"))}
      >
        {label}
      </Link>

      {open && (
        <div id={panelId} className="absolute left-0 top-full z-10 pt-3">
          <div
            className={cn(
              "rounded-md border border-border-subtle bg-surface-card p-6 shadow-(--shadow-modal)",
              panelClassName,
            )}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
