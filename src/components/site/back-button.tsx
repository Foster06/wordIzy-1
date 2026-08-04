"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, CornerUpLeft } from "lucide-react";

interface ReturnButtonProps {
  /** Where to navigate to. On programmatic pages, this should be the hub page
   *  (e.g. /wordstarts, /wordends, /wordlists) so users always return to the
   *  hub — not to Google/wherever they came from. */
  href?: string;
  /** Label shown on the button. */
  label?: string;
  /** Visual variant — "link" is the compact inline style, "button" is a prominent pill. */
  variant?: "link" | "button";
  /** If true, use browser history.back() instead of a fixed href. Defaults to false
   *  so the button always goes to a known destination (better UX for SEO landing pages). */
  useHistoryBack?: boolean;
}

/**
 * "Return" button — navigates to a fixed `href` (default: "/") so users always
 * land on a known page. Set `useHistoryBack={true}` to use browser history.back()
 * instead (falls back to `href` if there's no history).
 */
export function ReturnButton({
  href = "/",
  label = "Return",
  variant = "link",
  useHistoryBack = false,
}: ReturnButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (useHistoryBack && typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(href);
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
