"use client";

import React, { Component, type ReactNode } from "react";
import { GlassCard } from "@/components/site/glass-card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
  /** Optional heading shown above the default message. */
  label?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Class-based React error boundary. Catches render errors anywhere in its
 * subtree and shows a frosted-glass fallback UI with a "Reload page" button.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error("[ErrorBoundary]", this.props.label ?? "view", error, info.componentStack);
  }

  handleReload = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  handleTryAgain = () => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (!this.state.hasError) return this.props.children;

    const { label } = this.props;
    const { error } = this.state;
    const showDetails = process.env.NODE_ENV !== "production";

    return (
      <div className="my-6 flex justify-center" role="alert" aria-live="assertive">
        <GlassCard strong className="max-w-md w-full p-6 sm:p-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300" aria-hidden>
            <AlertCircle className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-semibold text-foreground tracking-tight">
            {label ?? "Something went wrong"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            An unexpected error occurred while rendering this view. Try reloading the page.
          </p>
          {showDetails && error && (
            <pre aria-hidden className="mt-4 max-h-40 overflow-auto rounded-lg border border-white/10 bg-black/30 p-3 text-left text-[11px] text-rose-200/90 whitespace-pre-wrap break-words nice-scroll">
              {error.message}
              {error.stack ? `\n\n${error.stack}` : ""}
            </pre>
          )}
          <div className="mt-6 flex justify-center gap-2">
            <Button
              onClick={this.handleTryAgain}
              variant="ghost"
              className="glass-soft rounded-lg"
            >
              Try again
            </Button>
            <Button
              onClick={this.handleReload}
              className="gap-2 bg-gradient-to-r from-brand to-brand-soft text-background font-semibold rounded-lg"
            >
              Reload page
            </Button>
          </div>
        </GlassCard>
      </div>
    );
  }
}
