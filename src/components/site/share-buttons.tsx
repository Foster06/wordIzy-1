"use client";

import { Twitter, Facebook, Linkedin, Link2, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ShareButtonsProps {
  /** The title to pre-fill in social posts */
  title?: string;
  /** The URL to share (defaults to current page URL) */
  url?: string;
  className?: string;
}

/**
 * Social media sharing buttons — Twitter/X, Facebook, LinkedIn, and copy link.
 * Uses the current page URL and title for pre-filled share content.
 */
export function ShareButtons({ title, url, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  // Build the share URL from the current browser location
  const shareUrl = url ?? (typeof window !== "undefined" ? window.location.href : "https://wordizy.com");
  const shareTitle = title ?? "wordIzy — Free Word Unscrambler & Anagram Solver";
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(shareTitle);

  const shareLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "hover:text-sky-400 hover:border-sky-400/40",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:text-blue-500 hover:border-blue-500/40",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:text-blue-600 hover:border-blue-600/40",
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="text-xs text-muted-foreground/60 mr-1">Share:</span>
      {shareLinks.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${link.name}`}
            title={`Share on ${link.name}`}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg glass-soft border border-white/10 text-muted-foreground transition-all hover:scale-105",
              link.color
            )}
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
      <button
        onClick={handleCopy}
        aria-label="Copy link"
        title="Copy link"
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-lg glass-soft border border-white/10 text-muted-foreground transition-all hover:scale-105",
          copied
            ? "text-emerald-400 border-emerald-400/40"
            : "hover:text-brand hover:border-brand/40"
        )}
      >
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  );
}
