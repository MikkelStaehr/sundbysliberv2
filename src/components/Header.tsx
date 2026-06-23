"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { SITE } from "@/lib/site";
import { CartIcon } from "./CartIcon";

const NAV = [
  { href: "/bestil", label: "Webshop" },
  { href: "/knivslibning-nykoebing-falster", label: "Om" },
  { href: "/erhverv", label: "Erhverv" },
];

function PhoneLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={SITE.phoneHref}
      className={`inline-flex items-center gap-[8px] text-ink transition-colors hover:text-accent ${className}`}
    >
      <Phone className="h-[18px] w-[18px]" strokeWidth={1.6} aria-hidden="true" />
      <span className="text-[15px] font-medium tabular-nums">{SITE.phoneDisplay}</span>
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open]);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-none items-center justify-between px-[20px] py-[16px] md:px-[32px] lg:px-[48px] xl:px-[72px]">
        <Link href="/" aria-label={`${SITE.name} – forside`} className="inline-flex">
          <span className="bg-ink px-[14px] py-[7px] font-logo text-[22px] leading-none text-bg md:px-[16px] md:py-[8px] md:text-[26px]">
            {SITE.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-[28px] md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="kicker text-[12px] text-ink/80 transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-[16px]">
          <PhoneLink className="hidden sm:inline-flex" />
          <CartIcon />
          <button
            type="button"
            aria-label={open ? "Luk menu" : "Åbn menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-[40px] w-[40px] items-center justify-center text-ink md:hidden"
          >
            {open ? (
              <X className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="border-t border-line bg-bg md:hidden">
          <nav className="mx-auto flex w-full max-w-none flex-col gap-[4px] px-[20px] py-[16px]">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="kicker py-[10px] text-[13px] text-ink"
              >
                {item.label}
              </Link>
            ))}
            <PhoneLink className="pt-[12px]" />
          </nav>
        </div>
      )}
    </header>
  );
}
