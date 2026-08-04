"use client";

import { useCallback, useEffect, useState } from "react";
import {
  LayoutDashboard, Lock, RefreshCw, ChevronLeft, Loader2,
  AlertCircle, TrendingUp, Globe, Search, BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlassCard } from "@/components/site/glass-card";
import { PageHeader } from "@/components/site/page-header";
import { useLanguage } from "@/components/i18n/language-provider";
import { useRouter } from "next/navigation";
import { useHashRoute } from "@/components/site/use-hash-route";

type TopQuery = { query: string; count: number };
type TopRoute = { route: string; count: number };
type TopLang = { lang: string; count: number };

type AnalyticsData = {
  days: number;
  total: number;
  topQueries: TopQuery[];
  topRoutes: TopRoute[];
  topLangs: TopLang[];
  zeroResults: TopQuery[];
};

type ApiResponse =
  | ({ ok: true } & AnalyticsData)
  | { ok: false; error: string };

const STORAGE_KEY = "wordizy-dashboard-key";
const TIME_RANGES: { label: string; days: number }[] = [
  { label: "24h", days: 1 },
  { label: "7d", days: 7 },
  { label: "30d", days: 30 },
];

export function DashboardView() {
  const { t } = useLanguage();
  const router = useRouter();
  const navigate = (href: string) => router.push(href);
  const [key, setKey] = useState<string>("");
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [days, setDays] = useState<number>(7);

  // Restore saved key on mount — validate it before unlocking
  useEffect(() => {
    let cancelled = false;
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      fetch(`/api/analytics?key=${encodeURIComponent(saved)}&days=7`)
        .then((r) => r.json())
        .then((res: ApiResponse) => {
          if (cancelled) return;
          if (res.ok) {
            setKey(saved);
            setData(res);
            setUnlocked(true);
          } else {
            try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
          }
        })
        .catch(() => {
          /* network error — leave locked */
        });
    } catch {
      /* ignore */
    }
    return () => { cancelled = true; };
  }, []);

  const load = useCallback(async (password: string, rangeDays: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/analytics?key=${encodeURIComponent(password)}&days=${rangeDays}`
      );
      const json: ApiResponse = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.ok === false ? json.error : "Failed to load");
      }
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!key.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/analytics?key=${encodeURIComponent(key.trim())}&days=${days}`
      );
      const json: ApiResponse = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.ok === false ? json.error : "Failed to authenticate");
      }
      try {
        sessionStorage.setItem(STORAGE_KEY, key.trim());
      } catch {
        /* ignore */
      }
      setData(json);
      setUnlocked(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
      setKey("");
    } finally {
      setLoading(false);
    }
  };

  const handleRangeChange = (nextDays: number) => {
    setDays(nextDays);
    if (unlocked && key) {
      void load(key, nextDays);
    }
  };

  const handleLock = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setKey("");
    setUnlocked(false);
    setData(null);
  };

  // --- Password gate -------------------------------------------------------
  if (!unlocked) {
    return (
      <>
        <PageHeader
          badge={t.nav.dashboard}
          title="Analytics Dashboard"
          subtitle="Enter the admin password to view anonymous search analytics."
          icon={<LayoutDashboard className="h-6 w-6" />}
        />
        <div className="mt-6 max-w-md">
          <GlassCard strong className="p-6">
            <form onSubmit={handleUnlock} className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/15 border border-brand/30">
                  <Lock className="h-5 w-5 text-brand" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-foreground">Authentication required</h2>
                  <p className="text-xs text-muted-foreground">This area is for the site owner only.</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="dashboard-key" className="text-xs text-muted-foreground">Admin password</Label>
                <Input
                  id="dashboard-key"
                  type="password"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  required
                  autoFocus
                  className="glass-soft border-white/10 search-amber"
                  placeholder="Enter password"
                />
              </div>
              {error && (
                <div className="flex items-center gap-2 rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-xs text-rose-300">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="gap-2 bg-gradient-to-r from-brand to-brand-soft text-background font-semibold rounded-lg"
                >
                  <Lock className="h-4 w-4" />
                  Unlock
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => navigate("/contact")}
                  className="glass-soft rounded-lg"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              </div>
              <p className="text-[11px] text-muted-foreground pt-2 border-t border-white/5">
                Default password is <code className="px-1 py-0.5 rounded bg-white/10 text-brand">wordizy-admin</code>.
                Change it by setting the <code className="px-1 py-0.5 rounded bg-white/10">ADMIN_PASSWORD</code> environment variable.
              </p>
            </form>
          </GlassCard>
        </div>
      </>
    );
  }

  // --- Dashboard -----------------------------------------------------------
  const topQuery = data?.topQueries[0];
  const topRoute = data?.topRoutes[0];
  const topLang = data?.topLangs[0];
  const maxQueryCount = data?.topQueries.reduce((m, q) => Math.max(m, q.count), 0) ?? 0;

  return (
    <>
      <PageHeader
        badge={t.nav.dashboard}
        title="Analytics Dashboard"
        subtitle={data ? `${data.total.toLocaleString()} searches in the last ${data.days} day${data.days === 1 ? "" : "s"}` : "Loading…"}
        icon={<LayoutDashboard className="h-6 w-6" />}
      />

      <div className="mt-6 space-y-4">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="ghost"
            onClick={() => load(key, days)}
            disabled={loading}
            className="glass-soft rounded-lg gap-2"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Refresh
          </Button>
          <Button
            variant="ghost"
            onClick={handleLock}
            className="glass-soft rounded-lg gap-2"
          >
            <Lock className="h-4 w-4" />
            Lock
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate("/inbox")}
            className="glass-soft rounded-lg gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Inbox
          </Button>

          <div className="ml-auto flex items-center gap-1 glass-soft rounded-lg p-1">
            {TIME_RANGES.map((r) => (
              <button
                key={r.days}
                onClick={() => handleRangeChange(r.days)}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                  days === r.days
                    ? "bg-brand/20 text-brand"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {loading && !data ? (
          <GlassCard className="p-8 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-brand" />
          </GlassCard>
        ) : error ? (
          <GlassCard className="p-6 flex items-center gap-2 text-rose-300 border-rose-500/40">
            <AlertCircle className="h-4 w-4" />
            {error}
          </GlassCard>
        ) : data ? (
          <>
            {/* Summary cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <SummaryCard
                icon={<Search className="h-4 w-4" />}
                label="Total searches"
                value={data.total.toLocaleString()}
              />
              <SummaryCard
                icon={<TrendingUp className="h-4 w-4" />}
                label="Top query"
                value={topQuery?.query ?? "—"}
                hint={topQuery ? `${topQuery.count}×` : undefined}
              />
              <SummaryCard
                icon={<BarChart3 className="h-4 w-4" />}
                label="Top tool"
                value={topRoute?.route ?? "—"}
                hint={topRoute ? `${topRoute.count}×` : undefined}
              />
              <SummaryCard
                icon={<Globe className="h-4 w-4" />}
                label="Top language"
                value={topLang?.lang ?? "—"}
                hint={topLang ? `${topLang.count}×` : undefined}
              />
            </div>

            {/* Top queries bar chart */}
            <GlassCard className="p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-brand" />
                Top search queries
              </h3>
              {data.topQueries.length === 0 ? (
                <p className="text-sm text-muted-foreground">No searches in this range.</p>
              ) : (
                <div className="space-y-2">
                  {data.topQueries.slice(0, 12).map((q) => (
                    <div key={q.query} className="flex items-center gap-3">
                      <span className="text-xs font-medium text-foreground/90 w-28 truncate shrink-0" title={q.query}>
                        {q.query}
                      </span>
                      <div className="flex-1 h-5 rounded-md bg-white/5 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-brand to-brand-soft rounded-md transition-all"
                          style={{ width: `${maxQueryCount ? (q.count / maxQueryCount) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="text-xs tabular-nums text-muted-foreground w-10 text-right shrink-0">
                        {q.count}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>

            {/* Tables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <GlassCard className="p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-brand" />
                  Top routes
                </h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                      <th className="pb-2 font-medium">Route</th>
                      <th className="pb-2 font-medium text-right">Searches</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.topRoutes.length === 0 ? (
                      <tr><td colSpan={2} className="text-muted-foreground py-2">No data</td></tr>
                    ) : (
                      data.topRoutes.map((r) => (
                        <tr key={r.route} className="border-t border-white/5">
                          <td className="py-1.5 text-foreground/90 font-mono text-xs">{r.route}</td>
                          <td className="py-1.5 text-right tabular-nums text-muted-foreground">{r.count}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </GlassCard>

              <GlassCard className="p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Globe className="h-4 w-4 text-brand" />
                  Top languages
                </h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                      <th className="pb-2 font-medium">Language</th>
                      <th className="pb-2 font-medium text-right">Searches</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.topLangs.length === 0 ? (
                      <tr><td colSpan={2} className="text-muted-foreground py-2">No data</td></tr>
                    ) : (
                      data.topLangs.map((l) => (
                        <tr key={l.lang} className="border-t border-white/5">
                          <td className="py-1.5 text-foreground/90 font-mono text-xs uppercase">{l.lang}</td>
                          <td className="py-1.5 text-right tabular-nums text-muted-foreground">{l.count}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </GlassCard>
            </div>

            {/* Zero-result searches */}
            <GlassCard className="p-5">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-400" />
                Zero-result searches
              </h3>
              {data.zeroResults.length === 0 ? (
                <p className="text-sm text-muted-foreground">No zero-result searches in this range.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {data.zeroResults.map((q) => (
                    <span
                      key={q.query}
                      className="inline-flex items-center gap-1.5 rounded-md border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs text-amber-200 font-mono"
                      title={`${q.count}× returned no results`}
                    >
                      {q.query}
                      <span className="text-amber-400/70 tabular-nums">{q.count}</span>
                    </span>
                  ))}
                </div>
              )}
            </GlassCard>
          </>
        ) : null}

        {error && !loading && (
          <GlassCard className="p-3 flex items-center gap-2 text-xs text-rose-300 border-rose-500/40">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => load(key, days)}
              className="ml-auto glass-soft rounded-md"
            >
              Retry
            </Button>
          </GlassCard>
        )}
      </div>
    </>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <GlassCard className="p-4">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
        <span className="text-brand">{icon}</span>
        {label}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-lg font-semibold text-foreground truncate" title={value}>
          {value}
        </span>
        {hint && (
          <span className="text-xs tabular-nums text-muted-foreground shrink-0">{hint}</span>
        )}
      </div>
    </GlassCard>
  );
}
