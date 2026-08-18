/**
 * Self-evicting in-memory rate limiter.
 *
 * Why: a plain `Map<string, {count; firstAt}>` grows forever because entries
 * are never removed. This implementation:
 *   - Buckets each key into a sliding window of `windowMs`.
 *   - Auto-evicts expired entries on every check (so the Map cannot leak).
 *   - Periodically sweeps (every `windowMs`) as a backstop.
 *
 * Not suitable for multi-instance serverless deploys (each instance has its
 * own Map). For production multi-instance, swap in Upstash Redis or similar.
 */

interface Bucket {
  count: number;
  firstAt: number;
}

export class RateLimiter {
  private hits = new Map<string, Bucket>();
  private readonly windowMs: number;
  private readonly max: number;
  private sweepTimer: ReturnType<typeof setInterval> | null = null;

  constructor(max: number, windowMs: number) {
    this.max = max;
    this.windowMs = windowMs;
  }

  /** Returns true if the key has exceeded the limit. Side-effect: evicts expired. */
  hit(key: string): boolean {
    const now = Date.now();
    const entry = this.hits.get(key);
    if (!entry || now - entry.firstAt > this.windowMs) {
      this.hits.set(key, { count: 1, firstAt: now });
      this.maybeStartSweep();
      return false;
    }
    entry.count += 1;
    return entry.count > this.max;
  }

  /** Evict expired entries. Called on every hit and periodically. */
  private sweep(): void {
    const now = Date.now();
    for (const [key, entry] of this.hits) {
      if (now - entry.firstAt > this.windowMs) {
        this.hits.delete(key);
      }
    }
  }

  private maybeStartSweep(): void {
    if (this.sweepTimer) return;
    this.sweepTimer = setInterval(() => this.sweep(), this.windowMs);
    // Don't keep the process alive just for the timer.
    if (this.sweepTimer && typeof this.sweepTimer.unref === "function") {
      this.sweepTimer.unref();
    }
  }
}

/** Extract the client IP from a Next.js request, falling back to "unknown". */
export function getClientIp(req: Request): string {
  const headers = req.headers;
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  const real = headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

// Shared instances — keyed by use case so unrelated routes don't share buckets.
export const solverLimiter = new RateLimiter(120, 60 * 1000); // 120/min per IP
export const heavyLimiter = new RateLimiter(30, 60 * 1000); // 30/min per IP (define/synonyms)
export const contactLimiter = new RateLimiter(5, 60 * 60 * 1000); // 5/hr per IP
export const wordlistsLimiter = new RateLimiter(1000, 60 * 1000); // 1000/min per IP
