"use client";

import { useState } from "react";
import { Twitter, Facebook, Globe, Link as LinkIcon, Check, Share2 } from "lucide-react";

interface ShareButtonsProps {
  url: string;
  title: string;
  /** Optional label text shown before the buttons. Defaults to "Share". */
  label?: string;
}

/**
 * Social sharing buttons — Twitter, Facebook, Reddit, + copy-link.
 * Uses platform-native share intent URLs (no JS SDKs, no tracking scripts).
 * Rendered on guide pages + the blitz game-over screen to encourage organic
 * sharing → those shares can lead to natural backlinks from forums, blogs,
 * and social media profiles.
 */
export function ShareButtons({ url, title, label = "Share" }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard?.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers — use a temporary textarea
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        /* clipboard not available — silently fail */
      }
      document.body.removeChild(textarea);
    }
  };

  // Try native Web Share API first (mobile only). Desktop browsers don't
  // support it, so we always render the platform buttons below.
  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        /* user dismissed — no action needed */
      }
    } else {
      handleCopyLink();
    }
  };

  const buttonClass =
    "inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium glass-soft border border-white/10 text-muted-foreground hover:text-brand hover:border-brand/30 transition-colors transition-transform hover:scale-105 active:scale-95 cursor-pointer";

  return (
    <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-white/5">
      <span className="text-xs text-muted-foreground flex items-center gap-1.5">
        <Share2 className="h-3.5 w-3.5" />
        {label}:
      </span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        aria-label="Share on Twitter"
      >
        <Twitter className="h-3.5 w-3.5" />
        Twitter
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        aria-label="Share on Facebook"
      >
        <Facebook className="h-3.5 w-3.5" />
        Facebook
      </a>
      <a
        href={`https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        aria-label="Share on Reddit"
      >
        <Globe className="h-3.5 w-3.5" />
        Reddit
      </a>
      {/* Native share (mobile) or copy link (desktop) */}
      <button
        type="button"
        onClick={handleNativeShare}
        className={buttonClass}
        aria-label="Share via native sheet or copy link"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-400" />
            Copied!
          </>
        ) : (
          <>
            <LinkIcon className="h-3.5 w-3.5" />
            Copy link
          </>
        )}
      </button>
    </div>
  );
}
