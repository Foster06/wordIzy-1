"use client";

import { GlassCard } from "./glass-card";
import type { ReactNode } from "react";

interface PageHeaderProps {
  badge?: string;
  title: ReactNode;
  subtitle?: string;
  icon?: ReactNode;
}

/** Hero header — centered, Bree Serif title with brand gradient on remaining words
 *  (matches the home "Word Unscrambler" style). */
export function PageHeader({ badge, title, subtitle, icon }: PageHeaderProps) {
  const titleText = typeof title === "string" ? title : "";
  const parts = titleText.split(" ");
  const firstWord = parts[0] || titleText;
  const restWords = parts.slice(1).join(" ");
  const renderTitle = titleText ? (
    <>
      {firstWord} {restWords && <span className="text-gradient-brand">{restWords}</span>}
    </>
  ) : title;

  return (
    <GlassCard strong className="relative overflow-hidden p-6 sm:p-8 text-center">
      <div className="absolute -top-16 -right-10 h-48 w-48 rounded-full bg-brand/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-brand-soft/10 blur-3xl pointer-events-none" />
      <div className="relative flex flex-col items-center">
        {icon && (
          <div className="mb-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl glass-soft text-brand glow-accent">
            {icon}
          </div>
        )}
        {badge && (
          <span className="inline-block mb-3 rounded-full bg-brand/10 border border-brand/30 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-brand font-inter">
            {badge}
          </span>
        )}
        <h1 className="page-title tracking-tight">
          {renderTitle}
        </h1>
        {subtitle && (
          <p className="page-subtitle mt-3 text-muted-foreground max-w-3xl">
            {subtitle}
          </p>
        )}
      </div>
    </GlassCard>
  );
}
