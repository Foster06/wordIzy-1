"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isWordListPage } from "@/lib/word-list-urls";

/**
 * Invisible component that fires a fire-and-forget request to the warmup
 * endpoint on mount. This primes the server-side dictionary cache so the
 * first real search is fast.
 *
 * SKIPPED on programmatic word-list pages: those pages are SSR'd, so the
 * dictionary is already loaded by the time the HTML is sent. Firing the
 * warmup request from the client would just waste bandwidth and contend
 * with the actual user interactions.
 */
export function DictionaryWarmer() {
  const pathname = usePathname();

  useEffect(() => {
    // Skip on word-list pages — server already loaded the dictionary for SSR.
    if (pathname) {
      const segs = pathname.split("/").filter(Boolean);
      const first = segs[0] || "";
      const second = segs[1] || "";
      if (isWordListPage(first)) return;
      if (first === "unscramble" && second && isWordListPage(second)) return;
    }

    try {
      void fetch("/api/warmup").catch(() => {
        /* fire-and-forget — ignore network errors */
      });
    } catch {
      /* ignore */
    }
  }, [pathname]);

  return null;
}
