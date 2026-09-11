"use client";

import { useEffect, useState } from "react";

/**
 * True only once React has actually hydrated on the client. Every
 * entrance-animation primitive in this folder (Entrance, StaggerContainer,
 * StaggerItem) uses this to render fully-visible, unanimated markup for
 * the server-rendered HTML and the very first client paint, and only
 * switches to the animated `motion.*` element (with its `initial="hidden"`
 * starting state) once this flips true.
 *
 * Without this gate, Motion's `initial` prop would be present as inline
 * `opacity:0`/`transform` styling in the raw SSR HTML — invisible to any
 * visitor whose JavaScript is slow, blocked or fails, and indistinguishable
 * in that state from actually-missing content. Content must remain visible
 * before, during and immediately after hydration; only the animation
 * itself is deferred, never the content.
 */
export function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
}
