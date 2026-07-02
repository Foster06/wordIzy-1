"use client";

import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";
import type { Translation } from "@/components/i18n/translations";
import { cn } from "@/lib/utils";

interface ActionButtonsProps {
  /** primary action label */
  actionLabel: string;
  /** primary action icon */
  actionIcon?: LucideIcon;
  onAction: () => void;
  onClear: () => void;
  loading?: boolean;
  disabled?: boolean;
  clearLabel?: string;
  t: Translation;
  className?: string;
  /** make primary button full-width */
  fullWidth?: boolean;
}

/**
 * Standardized action + clear button pair.
 * Primary button matches the search bar height (h-12) with brand gradient.
 * Clear button is smaller (h-9) with glass styling.
 */
export function ActionButtons({
  actionLabel, actionIcon: Icon, onAction, onClear, loading, disabled, clearLabel, t, className, fullWidth,
}: ActionButtonsProps) {
  return (
    <div className={cn("flex flex-wrap items-stretch gap-3", className)}>
      <Button
        onClick={onAction}
        disabled={loading || disabled}
        className={cn(
          "h-12 gap-2 bg-gradient-to-r from-brand to-brand-soft text-background font-semibold hover:opacity-90 rounded-lg px-6 shadow-lg shadow-brand/20",
          fullWidth && "flex-1"
        )}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : Icon ? <Icon className="h-4 w-4" /> : null}
        {actionLabel}
      </Button>
      <Button
        onClick={onClear}
        variant="ghost"
        className="h-9 gap-1.5 self-center glass-soft rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 px-4"
      >
        <Trash2 className="h-3.5 w-3.5" />
        {clearLabel ?? t.common.clear}
      </Button>
    </div>
  );
}
