import { useState, useEffect } from "react";

export function useWordVault() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);

  // 1. Initial hydration loop: Read cached tokens on browser window frame sync
  useEffect(() => {
    const cachedFavs = localStorage.getItem("izy_favs");
    const cachedHistory = localStorage.getItem("izy_history");
    if (cachedFavs) setFavorites(JSON.parse(cachedFavs));
    if (cachedHistory) setHistory(JSON.parse(cachedHistory));
  }, []);

  // 2. Add or remove a word from the bookmarks drawer array
  const toggleFavorite = (word: string) => {
    const updated = favorites.includes(word)
      ? favorites.filter((w) => w !== word)
      : [...favorites, word];
    setFavorites(updated);
    localStorage.setItem("izy_favs", JSON.stringify(updated));
  };

  // 3. Log a query keyword string to the recent history timeline array
  const logSearch = (query: string) => {
    if (!query.trim()) return;
    const filtered = history.filter((q) => q !== query);
    const updated = [query, ...filtered].slice(0, 10); // Caps lookups at 10 items max
    setHistory(updated);
    localStorage.setItem("izy_history", JSON.stringify(updated));
  };

  return { favorites, history, toggleFavorite, logSearch };
}
