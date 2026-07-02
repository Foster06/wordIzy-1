"use client";

import { GlassCard } from "./glass-card";
import type { ReactNode } from "react";

interface PageHeaderProps {
  badge?: string;
  title: ReactNode;
  subtitle?: string;
  icon?: ReactNode;
}

/** Hero header used at the top of each tool page. */
export function PageHeader({ badge, title, subtitle, icon }: PageHeaderProps) {
  return (
    <GlassCard strong className="relative overflow-hidden p-6 sm:p-8">
      <div className="absolute -top-16 -right-10 h-48 w-48 rounded-full bg-brand/10 blur-3xl pointer-events-none" />
      <div className="relative flex items-start gap-4">
        {icon && (
          <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-xl glass-soft text-brand glow-accent">
            {icon}
          </div>
        )}
        <div className="flex-1">
          {badge && (
            <span className="inline-block mb-2 rounded-full bg-brand/10 border border-brand/30 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-brand">
              {badge}
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
