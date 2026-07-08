"use client";

import { cn } from "@/lib/utils";

type LogoSize = "sm" | "md" | "lg";

const sizeMap: Record<LogoSize, { box: string }> = {
  sm: { box: "h-8 w-8" },
  md: { box: "h-9 w-9" },
  lg: { box: "h-12 w-12" },
};

/** wordIzy logo — a flat 2D amber square with a bold white "W" in Roboto Slab. */
export function Logo({ size = "md", className }: { size?: LogoSize; className?: string }) {
  const s = sizeMap[size];
  return (
    <span
      className={cn("relative inline-flex items-center justify-center rounded-md", s.box, className)}
      style={{ backgroundColor: "#f59e0b" }}
      aria-label="wordIzy logo"
    >
      <span
        className="font-bold leading-none select-none text-white"
        style={{ fontFamily: "var(--font-roboto-slab), Georgia, serif", fontSize: "0.85em", fontWeight: 700, letterSpacing: "-0.02em" }}
      >
        WI
      </span>
    </span>
  );
}
