"use client";

import { useEffect, useState } from "react";
import { routeFromHash, type RouteDef } from "./routes";

/** Hash-based router hook. Returns the current route and a navigate function.
 *
 * SSR-safety: the initial state is always "#/" (the home route) so the
 * server-rendered HTML matches the first client render — no hydration mismatch.
 * After hydration, a useEffect syncs with the actual URL hash so the correct
 * view appears immediately.
 */
export function useHashRoute(): { route: RouteDef; navigate: (hash: string) => void } {
  // Always start with "#/" — matches the server render exactly.
  // Never read window.location.hash during initial state — iOS Safari
  // hydrates differently and this causes a mismatch.
  const [hash, setHash] = useState<string>("#/");

  // After hydration, sync with the real URL hash + listen for changes.
  useEffect(() => {
    // Sync initial hash (e.g. "#/contact") right after mount.
    const actual = window.location.hash || "#/";
    if (actual !== hash) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHash(actual);
    }

    const onHashChange = () => {
      setHash(window.location.hash || "#/");
      // scroll to top on navigation
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [hash]);

  const navigate = (h: string) => {
    const full = h.startsWith("#") ? h : `#${h}`;
    if (window.location.hash === full) {
      // force re-scroll even if same
      window.scrollTo(0, 0);
    } else {
      window.location.hash = full;
      window.scrollTo(0, 0);
    }
  };

  return { route: routeFromHash(hash), navigate };
}
