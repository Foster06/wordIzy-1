"use client";

import { useEffect } from "react";

/**
 * Invisible component that fires a fire-and-forget request to the warmup
 * endpoint on mount. This primes the server-side dictionary cache so the
 * first real search is fast.
 */
export function DictionaryWarmer() {
  useEffect(() => {
    try {
      void fetch("/api/warmup").catch(() => {
        /* fire-and-forget — ignore network errors */
      });
    } catch {
      /* ignore */
    }
  }, []);

  return null;
}
