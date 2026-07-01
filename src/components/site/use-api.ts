"use client";

import { useCallback, useState } from "react";
import { useLanguage } from "@/components/i18n/language-provider";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/** Thin wrapper around fetch that appends ?lang=<current language>. */
export function useApi() {
  const { lang } = useLanguage();
  const [state, setState] = useState<FetchState<unknown>>({ data: null, loading: false, error: null });

  const get = useCallback(
    async <T,>(path: string, params?: Record<string, string | number | undefined>): Promise<T> => {
      const url = new URL(path, window.location.origin);
      url.searchParams.set("lang", lang);
      if (params) {
        for (const [k, v] of Object.entries(params)) {
          if (v !== undefined && v !== "" && v !== null) url.searchParams.set(k, String(v));
        }
      }
      setState({ data: null, loading: true, error: null });
      try {
        const res = await fetch(url.toString());
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        const json = (await res.json()) as T;
        setState({ data: json, loading: false, error: null });
        return json;
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Unknown error";
        setState({ data: null, loading: false, error: msg });
        throw e;
      }
    },
    [lang]
  );

  const post = useCallback(
    async <T,>(path: string, body: unknown): Promise<T> => {
      setState({ data: null, loading: true, error: null });
      try {
        const res = await fetch(path, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        const json = (await res.json()) as T;
        setState({ data: json, loading: false, error: null });
        return json;
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Unknown error";
        setState({ data: null, loading: false, error: msg });
        throw e;
      }
    },
    []
  );

  return { get, post, ...state };
}
