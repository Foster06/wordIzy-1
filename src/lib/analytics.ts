"use client";

/** Fire-and-forget analytics tracking. Non-blocking, never throws.
 *  Only tracks the query string, route, language, and result count —
 *  no personal data, no user ID, no IP. */
export function trackSearch(opts: {
  query: string;
  route: string;
  lang: string;
  resultCount: number;
}): void {
  try {
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(opts),
      // Use keepalive so the request completes even if the page navigates
      keepalive: true,
    }).catch(() => {
      /* ignore — analytics is best-effort */
    });
  } catch {
    /* ignore */
  }
}
