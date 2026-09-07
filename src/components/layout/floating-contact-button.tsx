"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";
import { siteConfig } from "@/config/site";

// Delay before closing on mouseleave, long enough for the cursor to
// travel from the button up into the popover above it.
const CLOSE_DELAY_MS = 200;

/**
 * Site-wide floating contact button (bottom-right, every page — rendered
 * once from the root layout). Reveals two real, direct contact routes for
 * the confirmed number in siteConfig.contactPhone: WhatsApp (wa.me
 * click-to-chat) and a phone call (tel: link).
 *
 * Opens on mouse hover (with a short close delay so moving the cursor
 * into the popover doesn't dismiss it) in addition to the existing click
 * toggle — hover is purely additive for mouse users, so keyboard (Tab +
 * Enter/Space) and touch (tap) behaviour is unchanged. Also closes on
 * Escape or an outside click/tap. Placed at a lower z-index than the
 * mobile menu overlay/drawer, so it's naturally covered (not reachable by
 * mouse or keyboard) whenever that drawer is open.
 *
 * The gold ring keeps the button visible against any page background —
 * several pages in this project use full-bleed navy sections, and a
 * plain navy button would otherwise blend into them.
 */
export function FloatingContactButton() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node | null)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => () => clearCloseTimeout(), []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-3"
    >
      {open && (
        <div className="flex flex-col gap-1 rounded-md border border-border-subtle bg-surface-card p-2 shadow-(--shadow-modal)">
          <a
            href={`https://wa.me/${siteConfig.contactPhone.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex min-h-11 items-center gap-3 rounded-md px-3 py-2 text-body font-semibold text-navy hover:bg-surface-warm"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-success/10 text-success">
              <MessageCircle aria-hidden="true" className="h-5 w-5" />
            </span>
            WhatsApp us
          </a>
          <a
            href={`tel:${siteConfig.contactPhone.tel}`}
            onClick={() => setOpen(false)}
            className="flex min-h-11 items-center gap-3 rounded-md px-3 py-2 text-body font-semibold text-navy hover:bg-surface-warm"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold/20 text-gold-ink">
              <Phone aria-hidden="true" className="h-5 w-5" />
            </span>
            Call {siteConfig.contactPhone.display}
          </a>
        </div>
      )}

      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={open ? "Close contact options" : "Contact Apex HR"}
        onClick={() => setOpen((value) => !value)}
        className="grid h-18 w-18 shrink-0 place-items-center rounded-full border-2 border-gold bg-navy text-white shadow-(--shadow-modal) transition-transform duration-(--duration-fast) hover:scale-105"
      >
        {open ? (
          <X aria-hidden="true" className="h-8 w-8" />
        ) : (
          <MessageCircle aria-hidden="true" className="h-8 w-8" />
        )}
      </button>
    </div>
  );
}
