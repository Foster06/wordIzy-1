"use client";

import { GlassCard } from "./glass-card";

/** Skeleton placeholder that mimics the word result grid layout.
 *  Shows a card header + 4-column grid of pulsing word cells. */
export function ResultSkeleton({ rows = 4 }: { rows?: number }) {
  const cells = Array.from({ length: rows * 4 });
  return (
    <GlassCard className="p-4 sm:p-5 result-card">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-3 gap-2">
        <div className="flex items-center gap-2">
          <div className="skeleton h-5 w-5 rounded" />
          <div className="skeleton h-4 w-20 rounded" />
        </div>
        <div className="skeleton h-4 w-16 rounded" />
      </div>
      {/* Grid skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 justify-items-center">
        {cells.map((_, i) => (
          <div
            key={i}
            className="skeleton h-7 w-full rounded-md"
            style={{ animationDelay: `${(i % 8) * 60}ms` }}
          />
        ))}
      </div>
    </GlassCard>
  );
}
