"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { PhoneCTA } from "./PhoneCTA";

const NAV = [
  { href: "/bestil", label: "Bestil" },
  { href: "/#priser", label: "Priser" },
  { href: "/erhverv", label: "Erhverv" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open]);

  return (
    <header className="sticky top-0 z-30 border-b border-paper-frame bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-[1144px] items-center justify-between px-[21px] py-[13px] md:px-[34px]">
        <Link href="/" className="flex items-center gap-[13px]">
          <Image
            src={SITE.logo}
            alt=""
            width={40}
            height={40}
            priority
            className="h-[40px] w-[40px]"
          />
          <span className="font-display text-[21px] leading-none text-ink">{SITE.name}</span>
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-[34px] md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[13px] uppercase tracking-[0.12em] text-text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <PhoneCTA variant="compact" />
        </nav>

        {/* Mobile burger */}
        <button
          type="button"
          aria-label={open ? "Luk menu" : "Åbn menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-[40px] w-[40px] items-center justify-center border border-paper-frame text-ink transition-colors hover:bg-paper-alt md:hidden"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="border-t border-paper-frame bg-paper md:hidden">
          <nav className="mx-auto flex w-full max-w-[1144px] flex-col gap-[8px] px-[21px] py-[21px]">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-mono text-[13px] uppercase tracking-[0.12em] text-ink py-[8px]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/knivslibning-nykoebing-falster"
              onClick={() => setOpen(false)}
              className="font-mono text-[13px] uppercase tracking-[0.12em] text-text-muted py-[8px]"
            >
              Om os
            </Link>
            <PhoneCTA variant="block" className="mt-[8px]" />
          </nav>
        </div>
      )}
    </header>
  );
}
