"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";

type LogoSize = "sm" | "md" | "lg";
const sizeMap: Record<LogoSize, { box: string; img: number }> = {
  sm: { box: "h-8 w-8", img: 32 },
  md: { box: "h-9 w-9", img: 36 },
  lg: { box: "h-12 w-12", img: 48 },
};

export function Logo({ size = "md", className }: { size?: LogoSize; className?: string }) {
  const s = sizeMap[size];
  return (
    <span className={cn("relative inline-flex items-center justify-center", s.box, className)} aria-label="wordIzy logo">
      {/* next/image automatically serves WebP/AVIF to supporting browsers.
          The PNG fallback ensures compatibility with older browsers.
          priority=true for LCP (logo is in the header, above the fold). */}
      <Image
        src="/logo.png"
        alt="wordIzy logo"
        width={s.img}
        height={s.img}
        className="h-full w-full object-contain"
        priority
        sizes={`${s.img}px`}
      />
    </span>
  );
}
