// Type declaration for the global `window.umami` object injected by the
// Umami Cloud Analytics loader script (<script defer src="...cloud.umami.is/script.js">)
// mounted in src/app/layout.tsx <head>.
//
// Umami exposes two methods on `window.umami` once the loader script has
// executed:
//   - track(eventName, data?)      → fire a custom event with optional properties
//   - trackView(url, referrer?, websiteId?) → manually track a pageview
//                                    (we use auto pageview tracking, so this
//                                    is unused — declared for completeness)
//
// The object may be undefined if:
//   - The script hasn't loaded yet (defer is still downloading)
//   - The user has an ad-blocker that blocks cloud.umami.is
//   - The CSP blocked the script (shouldn't happen — script-src allowlists it)
// All callers MUST defensively check for `window.umami?.track` before invoking.
interface UmamiAnalytics {
  /** Fire a custom event with optional properties. */
  track: (eventName: string, data?: Record<string, unknown>) => void;
  /** Manually track a pageview (unused — we use auto pageview tracking). */
  trackView?: (
    url: string,
    referrer?: string,
    websiteId?: string,
  ) => void;
}

interface Window {
  umami?: UmamiAnalytics;
}
