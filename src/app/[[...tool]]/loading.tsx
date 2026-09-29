// Loading skeleton shown during route transitions (e.g., when navigating
// from /blitz to /wordstarts). Provides instant feedback instead of a
// blank screen while the server renders the next page.
export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header skeleton */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-3 sm:px-6">
          <div className="flex h-16 items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-lg bg-white/5 animate-pulse" />
              <div className="h-5 w-24 rounded bg-white/5 animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-white/5 animate-pulse" />
              <div className="h-8 w-20 rounded-full bg-white/5 animate-pulse" />
              <div className="h-9 w-9 rounded-full bg-white/5 animate-pulse" />
            </div>
          </div>
        </div>
      </header>

      {/* Main content skeleton */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 py-6 sm:py-8">
        <div className="space-y-4">
          {/* Title skeleton */}
          <div className="space-y-2">
            <div className="h-8 w-3/4 rounded bg-white/5 animate-pulse" />
            <div className="h-4 w-1/2 rounded bg-white/5 animate-pulse" />
          </div>
          {/* Card skeleton */}
          <div className="h-48 w-full rounded-xl bg-white/5 animate-pulse" />
          {/* Grid skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="h-12 rounded-md bg-white/5 animate-pulse" style={{ animationDelay: `${i * 50}ms` }} />
            ))}
          </div>
        </div>
      </main>

      {/* Footer skeleton */}
      <footer className="mt-auto border-t border-white/5 bg-background/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
          <div className="h-4 w-32 rounded bg-white/5 animate-pulse" />
        </div>
      </footer>
    </div>
  );
}
