"use client";

import { useState, useEffect } from "react";
import { ALPHABET } from "@/components/site/word-bucket";
import type { LanguageCode } from "@/lib/languages";

/** Fetches which letters have words available for a given mode/length.
 *  Returns a Set of letters that have at least 1 word. */
export function useLetterAvailability(lang: LanguageCode, mode: "starts" | "ends", length?: number) {
  const [available, setAvailable] = useState<Set<string>>(new Set(ALPHABET));

  useEffect(() => {
    let cancelled = false;
    const url = new URL("/api/letter-counts", window.location.origin);
    url.searchParams.set("lang", lang);
    url.searchParams.set("mode", mode);
    if (length) url.searchParams.set("length", String(length));

    fetch(url.toString())
      .then((res) => res.json())
      .then((data: { counts: Record<string, number> }) => {
        if (cancelled) return;
        const set = new Set<string>();
        for (const letter of ALPHABET) {
          if ((data.counts[letter] ?? 0) > 0) set.add(letter);
        }
        setAvailable(set);
      })
      .catch(() => {
        // On error, assume all letters are available
      });

    return () => { cancelled = true; };
  }, [lang, mode, length]);

  return available;
}
