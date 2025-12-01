"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export function HeaderNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open]);

  return (
    <header className="relative border-b border-neutral-200 bg-white/90 backdrop-blur-sm sticky top-0 z-30">
      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-base md:text-lg font-semibold text-neutral-900 tracking-tight"
        >
          Sundby Sliberi
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-5 text-sm text-neutral-700">
          <Link
            href="/"
            className="inline-flex items-center rounded-full px-3 py-1.5 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
          >
            Forside
          </Link>
          <Link
            href="/bestil"
            className="inline-flex items-center justify-center rounded-full bg-neutral-900 text-white px-4 py-2 text-xs md:text-sm hover:bg-neutral-700 transition-colors"
          >
            Bestil slibning
          </Link>
          <Link
            href="/erhverv"
            className="inline-flex items-center rounded-full px-3 py-1.5 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
          >
            Erhverv
          </Link>
          <Link
            href="/knivslibning-nykoebing-falster"
            className="inline-flex items-center rounded-full px-3 py-1.5 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
          >
            Om os
          </Link>
        </nav>

        {/* Mobile burger */}
        <button
          type="button"
          aria-label="Åbn menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center rounded-full border border-neutral-300 text-neutral-800 h-9 w-9 hover:bg-neutral-100 transition-colors"
        >
          <span className="sr-only">Menu</span>
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden absolute inset-x-0 top-full border-t border-neutral-200 bg-white/98 shadow-lg">
          <nav className="w-full max-w-[90rem] mx-auto px-4 sm:px-8 py-4 flex flex-col gap-1.5 text-sm text-neutral-900">
            <p className="text-xs uppercase tracking-wide text-neutral-500 mb-1">
              Menu
            </p>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="inline-flex items-center rounded-xl px-3 py-2 hover:bg-neutral-100 transition-colors"
            >
              Forside
            </Link>
            <Link
              href="/bestil"
              onClick={() => setOpen(false)}
              className="inline-flex items-center rounded-xl px-3 py-2 hover:bg-neutral-100 transition-colors"
            >
              Bestil slibning
            </Link>
            <Link
              href="/erhverv"
              onClick={() => setOpen(false)}
              className="inline-flex items-center rounded-xl px-3 py-2 hover:bg-neutral-100 transition-colors"
            >
              Erhverv
            </Link>
            <Link
              href="/knivslibning-nykoebing-falster"
              onClick={() => setOpen(false)}
              className="inline-flex items-center rounded-xl px-3 py-2 hover:bg-neutral-100 transition-colors"
            >
              Om os
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}


