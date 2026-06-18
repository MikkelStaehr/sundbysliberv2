"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";

/*
  Fast kurv-bar nederst på mobil (skjult på desktop, hvor kurv-panelet står i
  siden). Viser altid antal + total + "Videre". Tap på baren folder en liste ud
  med varerne, så kunden har fuldt overblik uden at forlade siden.
*/
export function MobileCartBar() {
  const { items, count, total, inc, dec, remove, clear } = useCart();
  const [open, setOpen] = useState(false);

  if (count === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
      {/* Udfoldet varekurv */}
      {open && (
        <div className="mx-[12px] mb-[8px] max-h-[55vh] overflow-y-auto rounded-[20px] border border-line bg-surface p-[16px]">
          <div className="flex items-center justify-between">
            <span className="font-display text-[20px] uppercase text-ink">Din kurv</span>
            <button onClick={clear} className="text-[13px] text-muted underline-offset-2 hover:text-ink hover:underline">
              Ryd
            </button>
          </div>
          <ul className="mt-[12px] flex flex-col gap-[10px]">
            {items.map((it) => (
              <li key={it.id} className="flex items-center justify-between gap-[10px] text-[15px]">
                <span className="min-w-0 flex-1 text-ink">{it.navn}</span>
                <span className="flex items-center rounded-full bg-panel p-[2px]">
                  <button onClick={() => dec(it.id)} aria-label="Færre" className="h-[30px] w-[30px] rounded-full bg-surface text-[18px] text-ink">−</button>
                  <span className="px-[10px] tabular-nums">{it.qty}</span>
                  <button onClick={() => inc(it.id)} aria-label="Flere" className="h-[30px] w-[30px] rounded-full bg-surface text-[18px] text-ink">+</button>
                </span>
                <span className="w-[56px] shrink-0 text-right tabular-nums text-muted">{it.pris * it.qty} kr</span>
                <button onClick={() => remove(it.id)} aria-label={`Fjern ${it.navn}`} className="text-muted hover:text-accent">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Selve baren */}
      <div className="flex items-center gap-[12px] border-t border-line bg-bg/95 px-[16px] py-[12px] backdrop-blur-sm">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex flex-1 items-center gap-[8px] text-left"
        >
          <span className="inline-flex h-[26px] min-w-[26px] items-center justify-center rounded-full bg-accent px-[7px] text-[13px] font-medium text-white">
            {count}
          </span>
          <span className="text-[15px] font-medium text-ink">{total} kr</span>
          <svg viewBox="0 0 24 24" className={`h-[16px] w-[16px] text-muted transition-transform ${open ? "rotate-180" : ""}`} fill="none" aria-hidden="true">
            <path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <Link
          href="/aflevering"
          className="inline-flex items-center rounded-full bg-accent px-[24px] py-[12px] text-[15px] font-medium text-white transition-colors hover:bg-accent-dark"
        >
          Videre →
        </Link>
      </div>
    </div>
  );
}
