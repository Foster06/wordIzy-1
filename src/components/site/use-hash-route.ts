"use client";

import { usePathname } from "next/navigation";

export function useHashRoute() {
  const pathname = usePathname();

  // Clean the path string to extract the route parameters safely
  // e.g., "/wordle" becomes ["wordle"], "/" becomes []
  const segments = pathname.split("/").filter(Boolean);
  const primarySegment = segments[0] || "home";
  const subSegment = segments[1] || "";

  // Format the route configuration object to match your legacy layout structures
  const route = {
    id: primarySegment,
    slug: subSegment,
    query: typeof window !== "undefined" ? window.location.search : "",
  };

  return { route };
}
