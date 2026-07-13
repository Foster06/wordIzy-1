"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Track page views on demand whenever a user clicks a new relative nav path
  useEffect(() => {
    if (!gaId || typeof window.gtag !== "function") return;

    const url = pathname + searchParams.toString();
    window.gtag("config", gaId, {
      page_path: url,
    });
  }, [pathname, searchParams, gaId]);

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
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

// Declare global window interface extensions to appease the TypeScript compiler rules
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
