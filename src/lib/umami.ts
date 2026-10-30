// Umami Cloud Analytics — client-side event tracking helper.
//
// The Umami loader script (mounted in src/app/layout.tsx <head>) exposes a
// global `window.umami.track(eventName, data?)` method once it has loaded.
// This helper wraps it with:
//   - SSR safety (typeof window check → no-op on server)
//   - Defensiveness (no-op if window.umami is undefined — happens when the
//     defer script hasn't loaded yet, the user has an ad-blocker, or the
//     CSP blocked the script)
//   - try/catch so analytics NEVER breaks user-facing functionality
//
// Usage:
//   import { trackUmamiEvent } from "@/lib/umami";
//   <Link onClick={() => trackUmamiEvent("play_blitz_cta_click", { location: "homepage_featured_card" })} />

/** Safely fire a custom Umami event. No-op if Umami isn't loaded. */
export function trackUmamiEvent(
  eventName: string,
  properties?: Record<string, unknown>,
): void {
  // SSR guard — window doesn't exist during server rendering
  if (typeof window === "undefined") return;

  // Defensive: umami may be undefined if the script hasn't loaded yet or
  // was blocked (ad-blocker, CSP violation, network failure)
  if (typeof window.umami?.track !== "function") return;

  try {
    window.umami.track(eventName, properties);
  } catch (err) {
    // Silent fail — analytics should never break UX.
    // Log to console.warn so devs can debug if needed, but don't throw.
    if (process.env.NODE_ENV === "development") {
      console.warn("[umami] track() failed:", err);
    }
  }
}
