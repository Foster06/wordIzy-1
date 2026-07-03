"use client";

import { Loader2, Eraser } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";
import type { Translation } from "@/components/i18n/translations";
import { cn } from "@/lib/utils";

interface ActionButtonsProps {
  actionLabel: string;
  actionIcon?: LucideIcon;
  onAction: () => void;
  onClear: () => void;
  loading?: boolean;
  disabled?: boolean;
  clearLabel?: string;
  t: Translation;
  className?: string;
  fullWidth?: boolean;
}

/**
 * Standardized action + clear button pair.
 * Primary button: 70% width, h-12 (matches search bar), amber gradient.
 * Clear button: 30% width, h-12, eraser icon, glass styling.
 */
export function ActionButtons({
  actionLabel, actionIcon: Icon, onAction, onClear, loading, disabled, clearLabel, t, className, fullWidth: _fullWidth,
}: ActionButtonsProps) {
  return (
    <div className={cn("flex items-stretch gap-3 w-full", className)}>
      <Button
        onClick={onAction}
        disabled={loading || disabled}
        className="h-12 gap-2 bg-gradient-to-r from-brand to-brand-soft text-background font-semibold hover:opacity-90 rounded-lg px-6 shadow-lg shadow-brand/20 flex-[7] min-w-0"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : Icon ? <Icon className="h-4 w-4" /> : null}
        <span className="truncate">{actionLabel}</span>
      </Button>
      <Button
        onClick={onClear}
        variant="ghost"
        className="h-12 gap-1.5 glass-soft rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 px-4 flex-[3] min-w-0"
      >
        <Eraser className="h-4 w-4 shrink-0" />
        <span className="truncate">{clearLabel ?? t.common.clear}</span>
      </Button>
    </div>
  );
}
