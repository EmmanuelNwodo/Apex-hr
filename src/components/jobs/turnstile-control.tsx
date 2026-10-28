"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback": () => void;
          "error-callback": () => void;
          "refresh-expired": "auto";
        },
      ) => string;
      remove: (widgetId: string) => void;
    };
  }
}

interface TurnstileControlProps {
  siteKey: string;
  onVerify: (token: string) => void;
}

export function TurnstileControl({ siteKey, onVerify }: TurnstileControlProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const renderWidget = useCallback(() => {
    const container = containerRef.current;
    if (!siteKey || !container || !window.turnstile || widgetIdRef.current) return;

    widgetIdRef.current = window.turnstile.render(container, {
      sitekey: siteKey,
      callback: onVerify,
      "expired-callback": () => onVerify(""),
      "error-callback": () => onVerify(""),
      "refresh-expired": "auto",
    });
  }, [onVerify, siteKey]);

  useEffect(() => () => {
    if (widgetIdRef.current && window.turnstile) window.turnstile.remove(widgetIdRef.current);
    widgetIdRef.current = null;
  }, []);

  if (!siteKey) {
    return <p className="text-small text-text-secondary" role="status">Secure application verification is not configured yet.</p>;
  }

  return (
    <div>
      <p className="mb-2 text-small font-semibold text-navy">Security check</p>
      <div ref={containerRef} />
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={renderWidget}
      />
    </div>
  );
}
