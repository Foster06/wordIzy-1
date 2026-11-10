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
  /** Optional id — useful for anchor scroll targets. */
  id?: string;
}

/** Frosted glass container — the primary card style of the site. */
export function GlassCard({ children, className, strong, soft, hover, as = "div", id }: GlassCardProps) {
  const Comp = as;
  return (
    <Comp
      id={id}
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
