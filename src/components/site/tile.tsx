"use client";

import { cn } from "@/lib/utils";

type TileSize = "xs" | "sm" | "md" | "lg";

const sizeMap: Record<TileSize, string> = {
  xs: "h-7 w-7 text-base rounded-md",
  sm: "h-9 w-9 text-lg rounded-md",
  md: "h-12 w-12 text-2xl rounded-lg",
  lg: "h-16 w-16 text-3xl rounded-lg",
};

interface TileProps {
  letter: string;
  value?: number;
  size?: TileSize;
  blank?: boolean;
  className?: string;
}

/** A single Scrabble-style tile: cream/tan with serif letter + subscript point value. */
export function Tile({ letter, value = 0, size = "md", blank = false, className }: TileProps) {
  const display = blank ? " " : (letter || " ").toUpperCase();
  return (
    <span
      className={cn("scrab-tile", sizeMap[size], blank && "scrab-tile-blank", className)}
      data-value={value > 0 ? value : ""}
      aria-label={`${letter || "blank"} ${value}`}
    >
      {display}
    </span>
  );
}

interface TileRackProps {
  letters: string;
  /** letter -> value map; if omitted, computed server-side isn't available here, so pass values */
  values?: Record<string, number>;
  size?: TileSize;
  className?: string;
}

/** A frosted rack displaying a sequence of letters as Scrabble tiles. */
export function TileRack({ letters, values, size = "md", className }: TileRackProps) {
  const chars = (letters || "").split("");
  return (
    <div
      className={cn(
        "flex flex-wrap items-end gap-1.5 p-3 rounded-xl glass-soft nice-scroll",
        className
      )}
      role="img"
      aria-label={`Tile rack: ${letters}`}
    >
      {chars.length === 0 ? (
        <span className="text-sm text-muted-foreground px-2 py-1">—</span>
      ) : (
        chars.map((ch, i) => {
          const isWildcard = ch === "?" || ch === "*";
          const letter = isWildcard ? "?" : ch;
          const val = isWildcard ? 0 : (values?.[ch.toUpperCase()] ?? 0);
          return <Tile key={`${i}-${ch}`} letter={letter} value={val} size={size} blank={isWildcard} />;
        })
      )}
    </div>
  );
}
