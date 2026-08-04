"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, CornerUpLeft } from "lucide-react";

interface ReturnButtonProps {
  /** Where to navigate to if there's no browser history (e.g. user landed directly). */
  fallbackHref?: string;
  /** Label shown on the button. */
  label?: string;
  /** Visual variant — "link" is the compact inline style, "button" is a prominent pill. */
  variant?: "link" | "button";
}

/**
 * "Return" button — uses browser history.back() so users go back to wherever
 * they came from (homepage, another hub, a programmatic page, etc.). Falls back
 * to `fallbackHref` if there's no previous history entry (direct landing / new tab).
 */
export function ReturnButton({
  fallbackHref = "/",
  label = "Return",
  variant = "link",
}: ReturnButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  if (variant === "button") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass-soft text-sm font-medium text-foreground hover:text-brand hover:bg-brand/10 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
        aria-label={label}
      >
        <CornerUpLeft className="h-4 w-4" />
        {label}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2 -mt-2">
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-brand transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 rounded px-1 py-0.5"
        aria-label={label}
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {label}
      </button>
    </div>
  );
}
