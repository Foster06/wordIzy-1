// src/components/site/routes.ts
// Central route registry for the hash-based router. Keys are hash paths.

import type { LanguageCode } from "@/lib/languages";
import type { Translation } from "@/components/i18n/translations";

export type RouteId =
  | "home" | "scramble" | "wordle" | "quordle" | "anagram"
  | "random" | "wordfeud" | "dictionary" | "scrabble"
  | "wordlists" | "about" | "contact" | "privacy" | "sitemap";

export interface RouteDef {
  id: RouteId;
  hash: string;
  icon: string; // lucide icon name
  labelKey: keyof Translation["nav"];
  group: "tools" | "lists" | "info";
}

export const ROUTES: RouteDef[] = [
  { id: "home", hash: "/", icon: "Shuffle", labelKey: "unscrambler", group: "tools" },
  { id: "scramble", hash: "/scramble", icon: "RotateCw", labelKey: "scramble", group: "tools" },
  { id: "wordle", hash: "/wordle", icon: "Grid3x3", labelKey: "wordle", group: "tools" },
  { id: "quordle", hash: "/quordle", icon: "LayoutGrid", labelKey: "quordle", group: "tools" },
  { id: "anagram", hash: "/anagram", icon: "Repeat", labelKey: "anagram", group: "tools" },
  { id: "random", hash: "/random", icon: "Dices", labelKey: "random", group: "tools" },
  { id: "wordfeud", hash: "/wordfeud", icon: "Gamepad2", labelKey: "wordfeud", group: "tools" },
  { id: "dictionary", hash: "/dictionary", icon: "BookOpen", labelKey: "dictionary", group: "tools" },
  { id: "scrabble", hash: "/scrabble", icon: "Trophy", labelKey: "scrabble", group: "tools" },
  { id: "wordlists", hash: "/wordlists", icon: "List", labelKey: "wordlists", group: "lists" },
  { id: "about", hash: "/about", icon: "Info", labelKey: "about", group: "info" },
  { id: "contact", hash: "/contact", icon: "Mail", labelKey: "contact", group: "info" },
  { id: "privacy", hash: "/privacy", icon: "Shield", labelKey: "privacy", group: "info" },
  { id: "sitemap", hash: "/sitemap", icon: "Map", labelKey: "sitemap", group: "info" },
];

export const ROUTE_MAP: Record<string, RouteDef> = Object.fromEntries(
  ROUTES.map((r) => [r.hash, r])
);

export function routeFromHash(hash: string): RouteDef {
  // hash looks like "#/wordle" or "#/"
  const clean = hash.replace(/^#/, "") || "/";
  return ROUTE_MAP[clean] ?? ROUTES[0];
}

export function langParam(lang: LanguageCode): string {
  return `?lang=${lang}`;
}
