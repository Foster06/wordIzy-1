// src/components/site/routes.ts
// Central route registry for clean path-based routing.

import type { LanguageCode } from "@/lib/languages";
import type { Translation } from "@/components/i18n/translations";

export type RouteId =

  | "home" | "scramble" | "anagram" | "wordle" | "quordle" | "scrabble"
  | "random" | "wordfeud" | "dictionary" | "wordlists" | "wordstarts" | "wordends"
  | "about" | "contact" | "privacy" | "sitemap" | "inbox" | "dashboard"
  | "blitz"; // 🎯 ADDED: Type protection for the new game engine

export type RouteGroup = "solvers" | "tools" | "site";
export type DesktopNavSlot = "inline" | "tools" | "wordlab" | "site";

export interface RouteDef {
  id: RouteId;
  hash: string; // Kept as 'hash' to prevent breaking type properties elsewhere in the app
  icon: string;
  labelKey: keyof Translation["nav"];
  group: RouteGroup;
  desktop: DesktopNavSlot;
  /** Hidden routes are routable but not shown in nav/footer. */
  hidden?: boolean;
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
  
  // 🎯 ADDED: Places the game right inside your visible Tools section dropdown and footer columns
  { id: "blitz", hash: "/blitz", icon: "Zap", labelKey: "blitz", group: "tools", desktop: "tools", hidden: true }, // Hidden from nav but still routable. Can be accessed via /blitz or via the "Play Now" button in the Unscrambler tool.

  // Word Lab dropdown
  { id: "wordlists", hash: "/wordlists", icon: "List", labelKey: "wordlists", group: "tools", desktop: "wordlab" },
  { id: "wordstarts", hash: "/wordstarts", icon: "ArrowDownToLine", labelKey: "wordstarts", group: "tools", desktop: "wordlab" },
  { id: "wordends", hash: "/wordends", icon: "ArrowUpFromLine", labelKey: "wordends", group: "tools", desktop: "wordlab" },
  
  // Site
  { id: "about", hash: "/about", icon: "Info", labelKey: "about", group: "site", desktop: "site" },
  { id: "contact", hash: "/contact", icon: "Mail", labelKey: "contact", group: "site", desktop: "site" },
  { id: "privacy", hash: "/privacy", icon: "Shield", labelKey: "privacy", group: "site", desktop: "site" },
  { id: "sitemap", hash: "/sitemap", icon: "Map", labelKey: "sitemap", group: "site", desktop: "site" },
  
  // Hidden — owner-only inbox for contact form submissions. Access via /inbox
  { id: "inbox", hash: "/inbox", icon: "Inbox", labelKey: "inbox", group: "site", desktop: "site", hidden: true },
  // Hidden — owner-only analytics dashboard. Access via /dashboard
  { id: "dashboard", hash: "/dashboard", icon: "BarChart3", labelKey: "dashboard", group: "site", desktop: "site", hidden: true },
];

export const ROUTE_MAP: Record<string, RouteDef> = Object.fromEntries(
  ROUTES.map((r) => [r.id, r])
);

export const GROUP_ORDER: RouteGroup[] = ["solvers", "tools", "site"];
export const GROUP_LABELS: Record<RouteGroup, "solvers" | "tools" | "site"> = {
  solvers: "solvers", tools: "tools", site: "site",
};

export const DESKTOP_DROPDOWNS: { slot: "tools" | "wordlab" | "site"; labelKey: "tools" | "wordlab" | "more" }[] = [
  { slot: "tools", labelKey: "tools" },
  { slot: "wordlab", labelKey: "wordlab" },
  { slot: "site", labelKey: "more" },
];

export function routeFromHash(hash: string): RouteDef {
  const clean = hash.replace(/^\//, "").replace(/^#/, "") || "home";
  return ROUTE_MAP[clean] ?? ROUTES[0];
}

export function langParam(lang: LanguageCode): string {
  return `?lang=${lang}`;
}
