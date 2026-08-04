"use client";

import type { RouteDef } from "./routes";

/**
 * Per-route SEO is owned by the Next.js metadata API (`generateMetadata` in
 * `app/[[...tool]]/page.tsx`). This component is intentionally a no-op so the
 * SSR title/description remains authoritative (no hydration mismatch, no title
 * flicker, no duplicate source-of-truth). Kept as a placeholder so existing
 * call sites in `MainToolView` do not need to change.
 */
export function RouteSeo(_props: { route: RouteDef }) {
  return null;
}
