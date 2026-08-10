"use client";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/i18n/language-provider";

interface AdSlotProps {
  /** ad format hint */
  format?: "horizontal" | "vertical" | "square" | "responsive";
  className?: string;
  label?: string;
}

/**
 * Google AdSense placeholder slot. Renders a labelled responsive box; in
 * production the <ins class="adsbygoogle"> markup would be injected here.
 */
export function AdSlot({ format = "responsive", className, label }: AdSlotProps) {
  const { t } = useLanguage();
  const heightClass =
    format === "horizontal"
      ? "min-h-[90px] md:min-h-[100px]"
      : format === "vertical"
        ? "min-h-[300px]"
        : format === "square"
          ? "min-h-[250px]"
          : "min-h-[110px]";

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
      {/* In production: <ins className="adsbygoogle" style={{display:'block'}} data-ad-client="ca-pub-xxx" data-ad-slot="xxx" data-ad-format="auto" /> */}
    </div>
  );
}
