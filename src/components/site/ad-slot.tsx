"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/i18n/language-provider";

interface AdSlotProps {
  /** ad format hint (also controls min-height of the placeholder box) */
  format?: "horizontal" | "vertical" | "square" | "responsive";
  className?: string;
  label?: string;
  /**
   * AdSense slot ID (the `data-ad-slot` value from your AdSense dashboard).
   * If omitted OR no AdSense client is configured via env, the slot renders
   * a labelled placeholder box (useful in dev and pre-monetization deploys).
   */
  slotId?: string;
}

// Read once at module eval — same as layout.tsx gate, so behavior stays
// consistent across the tree. `XXXX` placeholder values are rejected so
// accidental commits of a fake publisher ID don't break the page.
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const ADSENSE_ENABLED =
  typeof ADSENSE_CLIENT === "string" &&
  ADSENSE_CLIENT.length > 0 &&
  !ADSENSE_CLIENT.includes("XXXXXXXX");

// Augment Window so TS allows the standard AdSense push pattern.
declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Google AdSense slot. Renders a real `<ins class="adsbygoogle">` element and
 * pushes it to the AdSense queue when (1) `NEXT_PUBLIC_ADSENSE_CLIENT` is set
 * AND (2) a `slotId` was provided. Otherwise renders a labelled placeholder
 * box so layout does not collapse in dev / pre-monetization.
 */
export function AdSlot({ format = "responsive", className, label, slotId }: AdSlotProps) {
  const { t } = useLanguage();
  const insRef = useRef<HTMLModElement | null>(null);
  const canServeRealAd = ADSENSE_ENABLED && Boolean(slotId);

  const heightClass =
    format === "horizontal"
      ? "min-h-[90px] md:min-h-[100px]"
      : format === "vertical"
        ? "min-h-[300px]"
        : format === "square"
          ? "min-h-[250px]"
          : "min-h-[110px]";

  // Push the <ins> into the AdSense queue after mount. Guarded with a ref so
  // Strict Mode's double-mount in dev can't double-push the same slot.
  useEffect(() => {
    if (!canServeRealAd || !insRef.current) return;
    if (insRef.current.dataset.adsbyPushed === "1") return;
    insRef.current.dataset.adsbyPushed = "1";
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* AdSense not yet loaded — will retry on next navigation */
    }
  }, [canServeRealAd]);

  if (canServeRealAd && ADSENSE_CLIENT) {
    return (
      <div
        className={cn("w-full", heightClass, className)}
        aria-label="Advertisement"
        role="complementary"
      >
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "100%" }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full rounded-xl border border-dashed border-white/10 bg-white/[0.02] flex items-center justify-center text-center px-4 py-6 nice-scroll",
        heightClass,
        className
      )}
      aria-label="Advertisement"
      role="complementary"
    >
      <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70">
        {label ?? t.ui.advertisement}
      </div>
    </div>
  );
}
