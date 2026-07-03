"use client";

import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "wordizy-recent-searches";
const MAX_SEARCHES = 8;

export interface RecentSearch {
  query: string;
  route: string;
  timestamp: number;
}

export function useRecentSearches() {
  const [searches, setSearches] = useState<RecentSearch[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSearches(JSON.parse(saved));
      }
    } catch { /* ignore */ }
  }, []);

  const addSearch = useCallback((query: string, route: string) => {
    setSearches((prev) => {
      const filtered = prev.filter((s) => !(s.query === query && s.route === route));
      const next = [{ query, route, timestamp: Date.now() }, ...filtered].slice(0, MAX_SEARCHES);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const clearSearches = useCallback(() => {
    setSearches([]);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  }, []);

  return { searches, addSearch, clearSearches };
}
