"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Inbox as InboxIcon, Lock, RefreshCw, Trash2, Check, CheckCheck,
  Mail, Clock, Globe, ChevronLeft, AlertCircle, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlassCard } from "@/components/site/glass-card";
import { PageHeader } from "@/components/site/page-header";
import { useLanguage } from "@/components/i18n/language-provider";
import { useRouter } from "next/navigation";
import { useHashRoute } from "@/components/site/use-hash-route";
import { toast } from "sonner";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  locale: string;
  handled: boolean;
  createdAt: string;
  ip: string | null;
};

type ApiResponse =
  | { ok: true; count: number; unread: number; items: Message[] }
  | { ok: false; error: string };

const STORAGE_KEY = "wordizy-inbox-key";

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString(undefined, {
      year: "numeric", month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export function InboxView() {
  const { t } = useLanguage();
  const router = useRouter();
  const navigate = (href: string) => router.push(href);
  const [key, setKey] = useState<string>("");
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [unread, setUnread] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [actioningId, setActioningId] = useState<string | null>(null);

  // Restore saved key on mount — validate it before unlocking
  useEffect(() => {
    let cancelled = false;
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      // Validate the saved key before unlocking
      fetch(`/api/contact?key=${encodeURIComponent(saved)}`)
        .then((r) => r.json())
        .then((data: ApiResponse) => {
          if (cancelled) return;
          if (data.ok) {
            setKey(saved);
            setMessages(data.items);
            setUnread(data.unread);
            setUnlocked(true);
          } else {
            // Saved key is invalid — discard it
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

  const load = useCallback(async (password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/contact?key=${encodeURIComponent(password)}`);
      const data: ApiResponse = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.ok === false ? data.error : "Failed to load");
      }
      setMessages(data.items);
      setUnread(data.unread);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load inbox");
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
      const res = await fetch(`/api/contact?key=${encodeURIComponent(key.trim())}`);
      const data: ApiResponse = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.ok === false ? data.error : "Failed to authenticate");
      }
      // Password is valid — persist + unlock
      try {
        sessionStorage.setItem(STORAGE_KEY, key.trim());
      } catch {
        /* ignore */
      }
      setMessages(data.items);
      setUnread(data.unread);
      setUnlocked(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
      // Clear the bad password so the user can retype
      setKey("");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleHandled = async (msg: Message) => {
    setActioningId(msg.id);
    try {
      const res = await fetch(`/api/contact?key=${encodeURIComponent(key)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: msg.id, handled: !msg.handled }),
      });
      if (!res.ok) throw new Error("Update failed");
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, handled: !m.handled } : m))
      );
      setUnread((u) => u + (msg.handled ? 1 : -1));
      toast.success(msg.handled ? "Marked as unread" : "Marked as read");
    } catch {
      toast.error("Could not update message");
    } finally {
      setActioningId(null);
    }
  };

  const handleDelete = async (msg: Message) => {
    if (!confirm(`Delete message from ${msg.name}? This cannot be undone.`)) return;
    setActioningId(msg.id);
    try {
      const res = await fetch(
        `/api/contact?key=${encodeURIComponent(key)}&id=${encodeURIComponent(msg.id)}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Delete failed");
      setMessages((prev) => prev.filter((m) => m.id !== msg.id));
      if (!msg.handled) setUnread((u) => Math.max(0, u - 1));
      toast.success("Message deleted");
    } catch {
      toast.error("Could not delete message");
    } finally {
      setActioningId(null);
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
    setMessages([]);
    setUnread(0);
  };

  // --- Password gate -------------------------------------------------------
  if (!unlocked) {
    return (
      <>
        <PageHeader
          badge={t.nav.inbox}
          title="Owner Inbox"
          subtitle="Enter the admin password to view contact form submissions."
          icon={<InboxIcon className="h-6 w-6" />}
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
                <Label htmlFor="admin-key" className="text-xs text-muted-foreground">Admin password</Label>
                <Input
                  id="admin-key"
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

  // --- Inbox list ----------------------------------------------------------
  return (
    <>
      <PageHeader
        badge={t.nav.inbox}
        title="Owner Inbox"
        subtitle={`${messages.length} message${messages.length === 1 ? "" : "s"} · ${unread} unread`}
        icon={<InboxIcon className="h-6 w-6" />}
      />
      <div className="mt-6 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="ghost"
            onClick={() => load(key)}
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
            onClick={() => navigate("/contact")}
            className="glass-soft rounded-lg gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Contact form
          </Button>
        </div>

        {loading && messages.length === 0 ? (
          <GlassCard className="p-8 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-brand" />
          </GlassCard>
        ) : messages.length === 0 ? (
          <GlassCard className="p-8 text-center">
            <InboxIcon className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-sm text-muted-foreground">No messages yet. Submissions from the contact form will appear here.</p>
          </GlassCard>
        ) : (
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            {messages.map((msg) => {
              const expanded = expandedId === msg.id;
              return (
                <GlassCard
                  key={msg.id}
                  className={`p-4 transition-all ${msg.handled ? "opacity-60" : "border-brand/30"}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        {!msg.handled && (
                          <span className="inline-block h-2 w-2 rounded-full bg-brand shrink-0" title="Unread" />
                        )}
                        <span className="font-semibold text-sm text-foreground truncate">{msg.name}</span>
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-xs text-brand hover:underline truncate flex items-center gap-1"
                        >
                          <Mail className="h-3 w-3" />
                          {msg.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDate(msg.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          {msg.locale}
                        </span>
                        {msg.ip && (
                          <span className="text-muted-foreground/60">{msg.ip}</span>
                        )}
                      </div>
                      <p className={`text-sm text-muted-foreground whitespace-pre-wrap ${expanded ? "" : "line-clamp-2"}`}>
                        {msg.message}
                      </p>
                      {msg.message.length > 120 && (
                        <button
                          onClick={() => setExpandedId(expanded ? null : msg.id)}
                          className="text-xs text-brand hover:underline mt-1"
                        >
                          {expanded ? "Show less" : "Show more"}
                        </button>
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5 shrink-0">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleToggleHandled(msg)}
                        disabled={actioningId === msg.id}
                        className="glass-soft rounded-md h-8 w-8 p-0"
                        title={msg.handled ? "Mark as unread" : "Mark as read"}
                      >
                        {msg.handled ? <CheckCheck className="h-4 w-4 text-emerald-400" /> : <Check className="h-4 w-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(msg)}
                        disabled={actioningId === msg.id}
                        className="glass-soft rounded-md h-8 w-8 p-0 hover:text-rose-400"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
