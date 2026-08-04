"use client";

import { useEffect } from "react";

/**
 * Detects when the site language changes (via the wordizy-lang cookie set by
 * LanguageProvider) and reloads the page so the SSR guide content is fetched
 * in the new language.
 */
export function LanguageReload() {
  useEffect(() => {
    // Check the current language from localStorage (set by LanguageProvider)
    const getCurrentLang = () => {
      try {
        return localStorage.getItem("wordizy-lang") || "en";
      } catch {
        return "en";
      }
    };

    const initialLang = getCurrentLang();

    // Set a cookie so the server can read it on the next request
    try {
      document.cookie = `wordizy-lang=${initialLang};path=/;max-age=31536000`;
    } catch {
      /* ignore */
    }

    // Listen for language changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "wordizy-lang") {
        // Set cookie + reload
        try {
          document.cookie = `wordizy-lang=${e.newValue};path=/;max-age=31536000`;
        } catch {
          /* ignore */
        }
        window.location.reload();
      }
    };

    // Also poll periodically — LanguageProvider updates localStorage without
    // firing a storage event in the same tab.
    const interval = setInterval(() => {
      const currentLang = getCurrentLang();
      if (currentLang !== initialLang) {
        try {
          document.cookie = `wordizy-lang=${currentLang};path=/;max-age=31536000`;
        } catch {
          /* ignore */
        }
        window.location.reload();
      }
    }, 1000);

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return null;
}
