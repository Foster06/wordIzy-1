"use client";

import { useEffect, useState } from "react";

export type ConsentState = "accepted" | "declined" | null;

const STORAGE_KEY = "wordizy-cookie-consent";

/**
 * Read cookie-consent state from localStorage (client-only).
 *
 * Returns `null` until the client has mounted and read the value — components
 * consuming this should not render consent-gated third-party scripts until
 * the value becomes `"accepted"` (for tracking/ads) or `"declined"` (for
 * strictly-necessary scripts only).
 *
 * Storage schema: `localStorage["wordizy-cookie-consent"]` is the string
 * "accepted" or "declined" (the same key written by <CookieConsent />).
 */
export function useCookieConsent(): ConsentState {
  const [state, setState] = useState<ConsentState>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "accepted" || stored === "declined") {
        setState(stored);
      } else {
        setState(null);
      }
    } catch {
      // localStorage may be unavailable (private browsing, sandboxed iframes)
      // — default to "no consent yet" so scripts stay gated.
      setState(null);
    }
  }, []);

  // Re-read consent whenever the window regains focus (lets a user accept
  // cookies in another tab and have the third-party scripts activate in this
  // tab on focus).
  useEffect(() => {
    const onFocus = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === "accepted" || stored === "declined") {
          setState(stored);
        }
      } catch {
        /* ignore */
      }
    };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  return state;
}
