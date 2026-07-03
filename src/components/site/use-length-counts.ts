"use client";

import { useState, useEffect } from "react";
import type { LanguageCode } from "@/lib/languages";

/** Fetches word counts per length (2-7) for a given language, mode, and optional letter.
 *  Returns Record<string, number> mapping length -> count. */
export function useLengthCounts(lang: LanguageCode, mode: "starts" | "ends", letter?: string) {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;
    const url = new URL("/api/length-counts", window.location.origin);
    url.searchParams.set("lang", lang);
    url.searchParams.set("mode", mode);
    if (letter) url.searchParams.set("letter", letter);

    fetch(url.toString())
      .then((res) => res.json())
      .then((data: { counts: Record<string, number> }) => {
        if (cancelled) return;
        setCounts(data.counts);
      })
      .catch(() => {});

    return () => { cancelled = true; };
  }, [lang, mode, letter]);

  return counts;
}
