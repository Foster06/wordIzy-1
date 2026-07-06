"use client";

import { useEffect, useState } from "react";

/** Returns `false` on the server and the first client render, then `true`
 *  after mount. Used to gate Radix UI components (DropdownMenu, Collapsible,
 *  Accordion) that auto-generate `id` attributes via React's `useId` —
 *  which can differ between server and client, causing hydration mismatch. */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  return mounted;
}
