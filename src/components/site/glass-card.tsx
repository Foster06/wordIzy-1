"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  strong?: boolean;
  soft?: boolean;
  hover?: boolean;
  as?: "div" | "section" | "article";
}

/** Frosted glass container — the primary card style of the site. */
export function GlassCard({ children, className, strong, soft, hover, as = "div" }: GlassCardProps) {
  const Comp = as;
  return (
    <Comp
      className={cn(
        "rounded-2xl",
        strong ? "glass-strong" : soft ? "glass-soft" : "glass",
        hover && "glass-hover",
        className
      )}
    >
      {children}
    </Comp>
  );
}
