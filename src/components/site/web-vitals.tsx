"use client";

import { useEffect } from "react";

/**
 * Invisible component that observes Core Web Vitals (LCP, CLS, FID) and
 * logs them to the console. Only runs in production to avoid noise in dev.
 */
export function WebVitals() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (typeof PerformanceObserver === "undefined") return;

    let lcpValue = 0;
    let clsValue = 0;

    // LCP — Largest Contentful Paint
    try {
      const lcpObs = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1];
        if (last) {
          lcpValue = last.startTime;
          console.log("[Web Vitals] LCP:", Math.round(lcpValue), "ms");
        }
      });
      lcpObs.observe({ type: "largest-contentful-paint", buffered: true });
    } catch {
      /* some browsers don't support the entry type */
    }

    // CLS — Cumulative Layout Shift
    try {
      const clsObs = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as { hadRecentInput?: boolean }).hadRecentInput) {
            const value = (entry as { value?: number }).value ?? 0;
            clsValue += value;
          }
        }
        console.log("[Web Vitals] CLS:", clsValue.toFixed(4));
      });
      clsObs.observe({ type: "layout-shift", buffered: true });
    } catch {
      /* ignore */
    }

    // FID — First Input Delay (legacy entry type; falls back gracefully)
    try {
      const fidObs = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const delay = (entry as { processingStart?: number; startTime?: number });
          const fid = (delay.processingStart ?? 0) - (delay.startTime ?? 0);
          console.log("[Web Vitals] FID:", Math.round(fid), "ms");
        }
      });
      fidObs.observe({ type: "first-input", buffered: true });
    } catch {
      /* ignore */
    }
  }, []);

  return null;
}
