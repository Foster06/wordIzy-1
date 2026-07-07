"use client";

import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/site/glass-card";
import { useHashRoute } from "./use-hash-route";

const STORAGE_KEY = "wordizy-cookie-consent";
const SHOW_DELAY_MS = 1500;

type StoredValue = "accepted" | "declined";

/**
 * Cookie consent banner. Shows after a 1.5s delay on the first visit only.
 * Accept/Decline both persist the choice to localStorage and hide the banner.
 */
export function CookieConsent() {
  const { navigate } = useHashRoute();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "accepted" || stored === "declined") return;
    } catch {
      /* localStorage may be unavailable — fall through to show banner */
    }
    timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  const decide = (value: StoredValue) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  const dismiss = () => setVisible(false);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-3 sm:px-6 sm:pb-6 pointer-events-none">
      <GlassCard
        strong
        className="pointer-events-auto mx-auto max-w-3xl p-4 sm:p-5 shadow-2xl"
      >
        <div className="flex items-start gap-3">
          <div className="hidden sm:flex shrink-0 h-10 w-10 items-center justify-center rounded-lg bg-brand/15 border border-brand/30 text-brand">
            <Cookie className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-foreground leading-snug">
              We use cookies to improve your experience and serve anonymised ads.
              See our{" "}
              <button
                onClick={() => {
                  dismiss();
                  navigate("/privacy");
                }}
                className="text-brand hover:underline font-medium"
              >
                Privacy Policy
              </button>{" "}
              for details.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                onClick={() => decide("accepted")}
                className="gap-2 bg-gradient-to-r from-brand to-brand-soft text-background font-semibold rounded-lg"
                size="sm"
              >
                Accept
              </Button>
              <Button
                onClick={() => decide("declined")}
                variant="ghost"
                size="sm"
                className="glass-soft rounded-lg"
              >
                Decline
              </Button>
            </div>
          </div>
          <Button
            onClick={dismiss}
            variant="ghost"
            size="icon"
            className="shrink-0 h-8 w-8 glass-soft rounded-md"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}
