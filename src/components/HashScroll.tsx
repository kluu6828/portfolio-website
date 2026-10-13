"use client";

import { useEffect } from "react";

function scrollToHash() {
  const id = window.location.hash.slice(1);
  if (!id) return;

  const el = document.getElementById(id);
  if (!el) return;

  // Wait one frame so layout (images/fonts) has settled after navigation.
  requestAnimationFrame(() => {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

export function HashScroll() {
  useEffect(() => {
    scrollToHash();

    // Retry shortly after mount for late layout shifts / hydration.
    const retry = window.setTimeout(scrollToHash, 100);

    window.addEventListener("hashchange", scrollToHash);
    return () => {
      window.clearTimeout(retry);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return null;
}
