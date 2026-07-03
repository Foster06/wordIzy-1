// src/components/site/routes.ts
// Central route registry for the hash-based router.

import type { LanguageCode } from "@/lib/languages";
import type { Translation } from "@/components/i18n/translations";

export type RouteId =
  | "home" | "scramble" | "anagram" | "wordle" | "quordle" | "scrabble"
  | "random" | "wordfeud" | "dictionary" | "wordlists" | "wordstarts" | "wordends"
  | "about" | "contact" | "privacy" | "sitemap";

export type RouteGroup = "solvers" | "tools" | "site";
export type DesktopNavSlot = "inline" | "tools" | "wordlab" | "site";

export interface RouteDef {
  id: RouteId;
  hash: string;
  icon: string;
  labelKey: keyof Translation["nav"];
  group: RouteGroup;
  desktop: DesktopNavSlot;
}

export const ROUTES: RouteDef[] = [
  // Inline (desktop navbar)
  { id: "home", hash: "/", icon: "Shuffle", labelKey: "unscrambler", group: "solvers", desktop: "inline" },
  { id: "scramble", hash: "/scramble", icon: "RotateCw", labelKey: "scramble", group: "solvers", desktop: "inline" },
  { id: "anagram", hash: "/anagram", icon: "Repeat", labelKey: "anagram", group: "solvers", desktop: "inline" },
  { id: "scrabble", hash: "/scrabble", icon: "Trophy", labelKey: "scrabble", group: "solvers", desktop: "inline" },
  { id: "wordle", hash: "/wordle", icon: "Grid3x3", labelKey: "wordle", group: "solvers", desktop: "inline" },
  { id: "dictionary", hash: "/dictionary", icon: "BookOpen", labelKey: "dictionary", group: "tools", desktop: "inline" },
  // Tools dropdown
  { id: "random", hash: "/random", icon: "Dices", labelKey: "random", group: "tools", desktop: "tools" },
  { id: "wordfeud", hash: "/wordfeud", icon: "Gamepad2", labelKey: "wordfeud", group: "tools", desktop: "tools" },
  { id: "quordle", hash: "/quordle", icon: "LayoutGrid", labelKey: "quordle", group: "solvers", desktop: "tools" },
  // Word Lab dropdown
  { id: "wordlists", hash: "/wordlists", icon: "List", labelKey: "wordlists", group: "tools", desktop: "wordlab" },
  { id: "wordstarts", hash: "/wordstarts", icon: "ArrowDownToLine", labelKey: "wordstarts", group: "tools", desktop: "wordlab" },
  { id: "wordends", hash: "/wordends", icon: "ArrowUpFromLine", labelKey: "wordends", group: "tools", desktop: "wordlab" },
  // Site
  { id: "about", hash: "/about", icon: "Info", labelKey: "about", group: "site", desktop: "site" },
  { id: "contact", hash: "/contact", icon: "Mail", labelKey: "contact", group: "site", desktop: "site" },
  { id: "privacy", hash: "/privacy", icon: "Shield", labelKey: "privacy", group: "site", desktop: "site" },
  { id: "sitemap", hash: "/sitemap", icon: "Map", labelKey: "sitemap", group: "site", desktop: "site" },
];

export const ROUTE_MAP: Record<string, RouteDef> = Object.fromEntries(
  ROUTES.map((r) => [r.hash, r])
);

export const GROUP_ORDER: RouteGroup[] = ["solvers", "tools", "site"];
export const GROUP_LABELS: Record<RouteGroup, "solvers" | "tools" | "site"> = {
  solvers: "solvers", tools: "tools", site: "site",
};

export const DESKTOP_DROPDOWNS: { slot: "tools" | "wordlab"; labelKey: "tools" | "wordlab" }[] = [
  { slot: "tools", labelKey: "tools" },
  { slot: "wordlab", labelKey: "wordlab" },
];

export function routeFromHash(hash: string): RouteDef {
  const clean = hash.replace(/^#/, "") || "/";
  return ROUTE_MAP[clean] ?? ROUTES[0];
}

export function langParam(lang: LanguageCode): string {
  return `?lang=${lang}`;
}
