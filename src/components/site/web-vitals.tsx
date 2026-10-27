"use client";

import { useEffect } from "react";

const ENDPOINT = "/api/analytics";

/** Fire-and-forget beacon — keepalive so it survives pagehide even on mobile. */
function beacon(metric: string, value: number): void {
  if (typeof navigator === "undefined" || typeof fetch === "undefined") return;
  try {
    void fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "web-vital",
        metric,
        value: Math.round(value * 10000) / 10000, // trim to 4 dp
        ts: Date.now(),
      }),
      keepalive: true,
      credentials: "same-origin",
    }).catch(() => {
      /* swallow — web vitals are best-effort */
    });
  } catch {
    /* ignore */
  }
}

/**
 * Invisible component that observes Core Web Vitals (LCP, CLS, FID/INP) and
 * POSTs each measurement to /api/analytics (server-side log). Only runs in
 * production to avoid noise in dev. The endpoint accepts `{type:"web-vital"}`
 * beacons and returns ok without persisting them.
 */
export function WebVitals() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (typeof PerformanceObserver === "undefined") return;

    let clsValue = 0;

    // LCP — Largest Contentful Paint (single final value, beaconed once)
    try {
      const lcpObs = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1];
        if (last) {
          beacon("LCP", last.startTime);
        }
      });
      lcpObs.observe({ type: "largest-contentful-paint", buffered: true });
    } catch {
      /* some browsers don't support the entry type */
    }

    // CLS — Cumulative Layout Shift (running sum, beaconed per-entry)
    try {
      const clsObs = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as { hadRecentInput?: boolean }).hadRecentInput) {
            const value = (entry as { value?: number }).value ?? 0;
            clsValue += value;
            beacon("CLS", clsValue);
          }
        }
      });
      clsObs.observe({ type: "layout-shift", buffered: true });
    } catch {
      /* ignore */
    }

    // FID/INP — First Input Delay / Interaction-to-Next-Paint (legacy entry
    // type falls back gracefully; modern browsers report INP via "event")
    try {
      const fidObs = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const delay = (entry as { processingStart?: number; startTime?: number });
          const fid = (delay.processingStart ?? 0) - (delay.startTime ?? 0);
          beacon("FID", fid);
        }
      });
      fidObs.observe({ type: "first-input", buffered: true });
    } catch {
      /* ignore */
    }
  }, []);

  return null;
}
