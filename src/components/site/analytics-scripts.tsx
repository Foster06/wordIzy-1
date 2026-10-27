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

/**
 * Client-only component that renders third-party tracking/advertising scripts
 * that REQUIRE cookie consent (currently: AdSense). Gated because AdSense uses
 * cookies for ad personalization — GDPR Article 5 + ePrivacy Directive require
 * opt-in for non-essential cookies in the EU/EEA.
 *
 * NOTE: Ahrefs Web Analytics is NOT loaded here. Ahrefs is privacy-first
 * (no cookies, no PII — just pageview counts) so it loads UNCONDITIONALLY via
 * the inline loader snippet in `src/app/layout.tsx` <head>. This avoids
 * double-loading and ensures Ahrefs tracks every visit even before the user
 * has dismissed the cookie consent banner.
 *
 * If consent has not yet been given (null state — e.g. user just landed on
 * the site and the banner hasn't been dismissed), no scripts render. Once
 * the user clicks "Accept" in <CookieConsent />, the `useCookieConsent`
 * hook's storage-sync logic re-renders this component and the scripts
 * activate immediately without a page reload.
 *
 * Strictly-necessary scripts (the trusted-types policy, JSON-LD, Ahrefs,
 * Next.js hydration chunks) live in <head> directly in layout.tsx and are
 * NOT gated by this component — they are required for the site to function.
 */
export function AnalyticsScripts() {
  const consent = useCookieConsent();

  // Until the user has explicitly chosen, render nothing. This means a
  // brand-new visitor sees ZERO consent-gated trackers in their first paint,
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
    </>
  );
}
