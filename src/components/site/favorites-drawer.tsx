"use client";

import { useState, useEffect } from "react";
import { X, Trash2, Copy, Check, Star } from "lucide-react";
import { useTheme } from "next-themes";
import { useWordVault } from "@/hooks/use-word-vault";
import { useLanguage } from "@/components/i18n/language-provider";

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FavoritesDrawer({ isOpen, onClose }: FavoritesDrawerProps) {
  const { favorites, toggleFavorite } = useWordVault();
  const [copiedWord, setCopiedWord] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const { t } = useLanguage();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // 🎯 HARD BALANCED ABSOLUTE SOLID THEME DEFINITIONS
  const containerBgColor = isDarkMode ? "#121214" : "#ffffff";
  const containerTextColor = isDarkMode ? "#ffffff" : "#111111";
  const itemRowBgColor = isDarkMode ? "#1e1e22" : "#f5f5f7";
  const itemBorderColor = isDarkMode ? "#2d2d34" : "#e5e5ea";
  const dividerLineColor = isDarkMode ? "#2d2d34" : "#e5e5ea";

  return (
    <div 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999,
        display: "flex",
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)", 
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
      }}
      role="dialog"
      aria-modal="true"
    >
      <div 
        style={{ position: "absolute", inset: 0, cursor: "pointer" }} 
        onClick={onClose} 
        aria-hidden="true" 
      />

      {/* OUTER BASE COVER CONTAINER PANEL (Zero margin, Zero padding gaps) */}
      <div 
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "380px",
          height: "100%",
          padding: "0px",
          margin: "0px",
          display: "flex",
          flexDirection: "column",
          zIndex: 1000000,
          backgroundColor: containerBgColor, // Locked opaque color 
          animation: "instantSlideIn 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes instantSlideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}} />

        {/* INNER SOLID FULL CONTENT CANVAS LAYER */}
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: containerBgColor, // Locked solid color override
            color: containerTextColor,
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            // flex-start (was space-between) — lets the footer sit right below
            // the word cards instead of being pinned to the bottom of the
            // drawer. With space-between, when the vault has only 1 saved
            // word, a huge empty gap appears between the word card and the
            // footer (the "gap between two bodies" the user reported). With
            // flex-start, content stacks naturally top-to-bottom and any
            // empty space lands at the bottom of the drawer (below the
            // footer), which is visually unobjectionable.
            justifyContent: "flex-start",
            boxShadow: "-10px 0 35px rgba(0,0,0,0.2)",
            borderLeft: `1px solid ${dividerLineColor}`,
          }}
        >
          <div style={{ backgroundColor: containerBgColor }} className="w-full flex flex-col">
            
            {/* Header Row Container — pb-3 mb-2 (was pb-4 mb-4 = 32px) tightens
                the vertical gap so the border-bottom feels attached to the
                content below instead of floating between two "bodies".
                Above-border padding 12px (pb-3) keeps the title breathing
                room; below-border margin 8px (mb-2) glues the border to the
                counts row + word cards below. */}
            <div
              style={{ borderBottom: `1px solid ${dividerLineColor}`, backgroundColor: containerBgColor }}
              className="flex items-center justify-between pb-3 mb-2"
            >
              <div style={{ backgroundColor: containerBgColor }} className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <h3 style={{ color: containerTextColor }} className="font-roboto-slab text-sm font-bold uppercase tracking-wider">
                  Your Saved Vault
                </h3>
              </div>
              <button 
                onClick={onClose}
                type="button"
                style={{ color: "text-neutral-400" }}
                className="p-1.5 rounded-lg transition-colors transition-transform cursor-pointer hover:opacity-70"
                aria-label="Close Vault"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Counts Area Panel — px-0 so the count + Copy-All link align
                exactly with the header row above and the word rows below.
                Previously px-1 which caused a 4px left-edge misalignment. */}
            <div style={{ backgroundColor: containerBgColor }} className="flex justify-between items-center text-xs text-neutral-400 mb-4 px-0">
              <span>{favorites?.length ?? 0} saved words</span>
              {favorites && favorites.length > 0 && (
                <button 
                  onClick={() => {
                    const textBlock = favorites.map((w: string) => w.toUpperCase()).join("\n");
                    navigator.clipboard?.writeText(textBlock);
                    alert(t.ui.allCopied);
                  }}
                  className="text-brand hover:underline cursor-pointer font-medium"
                >
                  Copy All Lines
                </button>
              )}
            </div>

            {/* Bookmarked Word rows container — pr-0 so word-row cards span the
                same width as the header + counts rows above. Previously pr-1
                which made the rows 4px narrower than the header (right-edge
                misalignment). The `nice-scroll` thin-scrollbar style means
                the scrollbar no longer needs a 4px gutter. */}
            <div style={{ backgroundColor: containerBgColor }} className="space-y-1.5 max-h-[75vh] overflow-y-auto pr-0 nice-scroll">
              {!favorites || favorites.length === 0 ? (
                <div 
                  style={{ 
                    border: `1px dashed ${dividerLineColor}`,
                    backgroundColor: isDarkMode ? "rgba(255,255,255,0.01)" : "rgba(0,0,0,0.01)"
                  }}
                  className="text-center py-16 text-xs text-neutral-400 italic rounded-xl p-6"
                >
                  Your word vault is empty.<br />Tap the star icon next to words in the tool results grid to save them here!
                </div>
              ) : (
                favorites.map((word: string) => (
                  <div 
                    key={word}
                    style={{
                      backgroundColor: itemRowBgColor, // Forces word background blocks to be solid
                      border: `1px solid ${itemBorderColor}`,
                      color: containerTextColor
                    }}
                    className="flex items-center justify-between p-2.5 rounded-lg transition-colors transition-transform"
                  >
                    <span className="font-mono text-sm font-semibold tracking-wide uppercase truncate">
                      {word}
                    </span>

                    <div className="flex items-center space-x-1 shrink-0">
                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(word.toUpperCase());
                          setCopiedWord(word);
                          setTimeout(() => setCopiedWord(null), 1500);
                        }}
                        type="button"
                        title="Copy Word"
                        className="p-1.5 rounded transition-colors cursor-pointer text-neutral-400 hover:opacity-70"
                      >
                        {copiedWord === word ? (
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                      <button
                        onClick={() => toggleFavorite(word)}
                        type="button"
                        title="Delete from Vault"
                        className="p-1.5 rounded transition-colors cursor-pointer text-neutral-400 hover:text-red-500"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer Area Row */}
          <div 
            style={{ borderTop: `1px solid ${dividerLineColor}`, backgroundColor: containerBgColor, color: "text-neutral-500" }}
            className="pt-4 text-[11px] text-center"
          >
            Words are safely saved on your current browser engine storage loop cleanly.
          </div>
        </div>

      </div>
    </div>
  );
}
