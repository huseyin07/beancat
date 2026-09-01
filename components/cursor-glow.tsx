"use client";

import { useEffect } from "react";

export function CursorGlow() {
  useEffect(() => {
    const root = document.documentElement;
    const onMove = (event: PointerEvent) => {
      root.style.setProperty("--mouse-x", `${event.clientX}px`);
      root.style.setProperty("--mouse-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return <div className="cursor-glow" aria-hidden="true" />;
}
