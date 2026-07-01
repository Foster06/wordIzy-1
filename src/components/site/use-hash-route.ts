"use client";

import { useEffect, useState } from "react";
import { routeFromHash, type RouteDef } from "./routes";

/** Hash-based router hook. Returns the current route and a navigate function. */
export function useHashRoute(): { route: RouteDef; navigate: (hash: string) => void } {
  const [hash, setHash] = useState<string>(() =>
    typeof window === "undefined" ? "#/" : window.location.hash || "#/"
  );

  useEffect(() => {
    const onHashChange = () => {
      setHash(window.location.hash || "#/");
      // scroll to top on navigation
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = (h: string) => {
    const full = h.startsWith("#") ? h : `#${h}`;
    if (window.location.hash === full) {
      // force re-scroll even if same
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.location.hash = full;
    }
  };

  return { route: routeFromHash(hash), navigate };
}
