"use client";

import { useWordVault } from "@/hooks/use-word-vault";

interface WordRowProps {
  word: string;
  score?: number;
}

export function WordRow({ word, score }: WordRowProps) {
  const { favorites, toggleFavorite } = useWordVault();
  const isFavorited = favorites.includes(word);

  return (
    <div className="flex items-center justify-between p-2.5 rounded-lg bg-background/40 hover:bg-background/80 border border-border/50 transition-colors transition-transform group">
      <div className="flex items-center space-x-3">
        {/* 🎯 THE FAVORITE TOGGLE BUTTON */}
        <button
          onClick={() => toggleFavorite(word)}
          type="button"
          aria-label={`Bookmark ${word}`}
          className={`text-sm transition-transform active:scale-95 cursor-pointer ${
            isFavorited 
              ? "text-amber-500 scale-110" 
              : "text-muted-foreground/40 group-hover:text-muted-foreground/70"
          }`}
        >
          {isFavorited ? "★" : "☆"}
        </button>
        
        {/* THE WORD DISPLAY */}
        <span className="font-mono text-sm font-semibold tracking-wide uppercase text-foreground">
          {word}
        </span>
      </div>

      {/* OPTIONAL POINT VALUE BADGE (For Scrabble/Wordfeud tools) */}
      {score !== undefined && (
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand/10 text-brand font-mono">
          {score} pts
        </span>
      )}
    </div>
  );
}
