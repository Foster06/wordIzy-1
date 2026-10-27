"use client";

import { useCookieConsent } from "@/components/site/use-cookie-consent";

// Read once at module-eval — consistent across renders. Same gate logic as
// layout.tsx (rejects "XXXXXXXX" placeholder values so a fake publisher ID
// never accidentally ships).
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const ADSENSE_ENABLED =
  typeof ADSENSE_CLIENT === "string" &&
  ADSENSE_CLIENT.length > 0 &&
  !ADSENSE_CLIENT.includes("XXXXXXXX");

const AHREFS_ANALYTICS_KEY =
  process.env.NEXT_PUBLIC_AHREFS_ANALYTICS_KEY ?? "F87goBifqTaUBs3AbK3EWA";

/**
 * Client-only component that renders third-party tracking/advertising scripts
 * (AdSense + Ahrefs Web Analytics) ONLY after the user has accepted cookie
 * consent. Scripts are gated because:
 *
 *  - AdSense uses cookies for ad personalization (GDPR Article 5 + ePrivacy
 *    Directive require opt-in for non-essential cookies in the EU/EEA).
 *  - Ahrefs Web Analytics is privacy-first (no cookies, no PII, just
 *    pageview counts), but is gated anyway for consistency — the same
 *    consent token controls every analytics/tracking beacon site-wide.
 *
 * If consent has not yet been given (null state — e.g. user just landed on
 * the site and the banner hasn't been dismissed), no scripts render. Once
 * the user clicks "Accept" in <CookieConsent />, the `useCookieConsent`
 * hook's storage-sync logic re-renders this component and the scripts
 * activate immediately without a page reload.
 *
 * Strictly-necessary scripts (the trusted-types policy, JSON-LD, hydration
 * chunks) live in <head> directly in layout.tsx and are NOT gated by this
 * component — they are required for the site to function at all.
 */
export function AnalyticsScripts() {
  const consent = useCookieConsent();

  // Until the user has explicitly chosen, render nothing. This means a
  // brand-new visitor sees ZERO third-party trackers in their first paint,
  // matching the GDPR "prior consent" rule.
  if (consent !== "accepted") return null;

  return (
    <>
      {ADSENSE_ENABLED && ADSENSE_CLIENT && (
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
      )}
      {AHREFS_ANALYTICS_KEY && (
        <script
          async
          src="https://analytics.ahrefs.com/analytics.js"
          data-key={AHREFS_ANALYTICS_KEY}
        />
      )}
    </>
  );
}
