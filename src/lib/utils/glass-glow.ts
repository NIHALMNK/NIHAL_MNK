import type * as React from "react";

/**
 * High-performance pointer tracking for glass surfaces and cards.
 * Sets CSS custom properties directly on the element DOM style without triggering React re-renders.
 */
export function onGlassMouseMove(e: React.MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
  e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
}
