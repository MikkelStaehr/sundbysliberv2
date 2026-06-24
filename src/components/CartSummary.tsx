"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useCart } from "@/lib/cart";

/*
  Kurv-opsummering. Ingen rabat/levering/ekspres-linjer — kun varer + total.
  - variant "cart": redigerbare mængder + CTA (brugt på /bestil trin 1)
  - variant "summary": skrivebeskyttet + vejledende note (brugt på /aflevering trin 2)
*/
export function CartSummary({
  variant,
  ctaHref,
  ctaLabel,
}: {
  variant: "cart" | "summary";
  ctaHref?: string;
  ctaLabel?: string;
}) {
  const { items, total, inc, dec, remove, clear } = useCart();
  const editable = variant === "cart";

  return (
    <div className="rounded-card border border-line bg-surface p-[24px]">
      <h2 className="font-display text-xl text-ink">Din kurv</h2>

      {items.length === 0 ? (
        <p className="mt-[16px] text-sm text-muted">Ingen varer endnu.</p>
      ) : (
        <>
          <ul className="mt-[16px] flex flex-col gap-[12px]">
            {items.map((it) => (
              <li key={it.id} className="flex items-center justify-between gap-[12px] text-sm">
                <span className="min-w-0 flex-1 text-ink">{it.navn}</span>
                {editable ? (
                  <span className="flex items-center gap-[10px]">
                    <span className="flex items-center rounded-card border border-line">
                      <button onClick={() => dec(it.id)} aria-label="Færre" className="px-[8px] py-[2px] text-muted hover:text-ink">
                        −
                      </button>
                      <span className="px-[8px] tabular-nums">{it.qty}</span>
                      <button onClick={() => inc(it.id)} aria-label="Flere" className="px-[8px] py-[2px] text-muted hover:text-ink">
                        +
                      </button>
                    </span>
                    <span className="w-[56px] text-right tabular-nums text-muted">{it.pris * it.qty} kr</span>
                    <button
                      onClick={() => remove(it.id)}
                      aria-label={`Fjern ${it.navn}`}
                      className="text-muted hover:text-accent"
                    >
                      <X className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                    </button>
                  </span>
                ) : (
                  <span className="shrink-0 text-muted tabular-nums">
                    {it.qty} × {it.pris} kr
                  </span>
                )}
              </li>
            ))}
          </ul>

          {editable && (
            <button
              onClick={clear}
              className="mt-[12px] text-xs text-muted underline-offset-2 hover:text-ink hover:underline"
            >
              Ryd kurv
            </button>
          )}

          <div className="mt-[16px] flex items-center justify-between border-t border-line pt-[16px] text-base">
            <span className="font-medium text-ink">I alt</span>
            <span className="font-medium tabular-nums text-ink">{total} kr</span>
          </div>

          {variant === "summary" && (
            <p className="mt-[10px] text-xs text-muted">
              Vejledende. Endelig pris bekræftes ved aftale.
            </p>
          )}
        </>
      )}

      {editable &&
        (items.length === 0 ? (
          <span
            className="mt-[20px] block cursor-not-allowed rounded-full border border-line bg-panel px-[20px] py-[12px] text-center text-sm text-muted"
            aria-disabled="true"
          >
            {ctaLabel ?? "Videre til bestilling"}
          </span>
        ) : (
          <Link
            href={ctaHref ?? "/aflevering"}
            className="mt-[20px] block rounded-full bg-accent px-[20px] py-[12px] text-center text-sm font-medium text-white transition-colors hover:bg-accent-dark"
          >
            {ctaLabel ?? "Videre til bestilling"}
          </Link>
        ))}
    </div>
  );
}
