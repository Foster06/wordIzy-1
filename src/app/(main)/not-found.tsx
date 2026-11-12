"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 space-y-4">
      <h1 className="text-4xl font-extrabold tracking-tight text-brand">404</h1>
      <h2 className="text-xl font-bold text-foreground">Page Not Found</h2>
      <p className="text-muted-foreground text-xs max-w-sm leading-relaxed">
        The word tool or page directory you are looking for has been moved or does not exist.
      </p>
      <Link 
        href="/" 
        className="btn-amber-flow px-4 py-2 text-xs text-white font-medium rounded-lg transition-transform hover:brightness-110 block cursor-pointer"
      >
        Return to Word Tools
      </Link>
    </div>
  );
}
