"use client"; // 🎯 FIX: Explicit client directive forces Turbopack compilation layout boundary rules

import React, { createContext, useContext, useState, useEffect } from "react";

interface WordVaultContextType {
  favorites: string[];
  history: string[];
  toggleFavorite: (word: string) => void;
  logSearch: (query: string) => void;
  reloadFavorites: () => void;
}

const WordVaultContext = createContext<WordVaultContextType | undefined>(undefined);

export function WordVaultProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);

  const reloadFavorites = () => {
    if (typeof window === "undefined") return;
    const cachedFavs = localStorage.getItem("izy_word_vault");
    const cachedHistory = localStorage.getItem("izy_history");

    if (cachedFavs) {
      try {
        const parsed = JSON.parse(cachedFavs);
        if (JSON.stringify(favorites) !== JSON.stringify(parsed)) {
          setFavorites(parsed);
        }
      } catch (e) {
        console.error("Failed parsing favorites cache");
      }
    } else if (favorites.length > 0) {
      setFavorites([]);
    }

    if (cachedHistory) {
      try {
        const parsed = JSON.parse(cachedHistory);
        if (JSON.stringify(history) !== JSON.stringify(parsed)) {
          setHistory(parsed);
        }
      } catch (e) {
        console.error("Failed parsing history cache");
      }
    }
  };

  useEffect(() => {
    reloadFavorites();

    const handleGlobalSyncSignal = () => reloadFavorites();
    window.addEventListener("wordVaultUpdated", handleGlobalSyncSignal);
    window.addEventListener("storage", handleGlobalSyncSignal);

    return () => {
      window.removeEventListener("wordVaultUpdated", handleGlobalSyncSignal);
      window.removeEventListener("storage", handleGlobalSyncSignal);
    };
  }, [favorites, history]);

  const toggleFavorite = (word: string) => {
    const cleanWord = word.trim().toUpperCase();
    if (!cleanWord) return;

    const updated = favorites.includes(cleanWord)
      ? favorites.filter((w) => w !== cleanWord)
      : [...favorites, cleanWord];

    setFavorites(updated);
    localStorage.setItem("izy_word_vault", JSON.stringify(updated));
    window.dispatchEvent(new Event("wordVaultUpdated"));
  };

  const logSearch = (query: string) => {
    const cleanQuery = query.trim().toUpperCase();
    if (!cleanQuery) return;

    const filtered = history.filter((q) => q !== cleanQuery);
    const updated = [cleanQuery, ...filtered].slice(0, 10);

    setHistory(updated);
    localStorage.setItem("izy_history", JSON.stringify(updated));
  };

  return (
    <WordVaultContext.Provider value={{ favorites, history, toggleFavorite, logSearch, reloadFavorites }}>
      {children}
    </WordVaultContext.Provider>
  );
}

export function useWordVault() {
  const context = useContext(WordVaultContext);
  if (context === undefined) {
    return {
      favorites: [],
      history: [],
      toggleFavorite: () => {},
      logSearch: () => {},
      reloadFavorites: () => {}
    };
  }
  return context;
}
