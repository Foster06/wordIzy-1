"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

export function GoogleAnalytics() {
  const pathname = usePathname();
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // 🎯 THE PERFECT COMPILER BYPASS: Track page views using raw browser window objects
  // This isolates parameter calculations from Next.js hooks so the static build never fails!
  useEffect(() => {
    if (!gaId || typeof window === "undefined" || typeof window.gtag !== "function") return;

    // Build the clean trackable URL address manually using native browser strings
    const currentUrl = window.location.pathname + window.location.search;

    window.gtag("config", gaId, {
      page_path: currentUrl,
    });
  }, [pathname, gaId]);

  if (!gaId) return null;

  return (
    <>
      {/* Load Google's tag manager script asynchronously */}
      <Script
        strategy="afterInteractive"
        src={`https://googletagmanager.com{gaId}`}
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname + window.location.search,
            });
          `,
        }}
      />
    </>
  );
}

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
