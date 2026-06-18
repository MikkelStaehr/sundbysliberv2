"use client";

import Image from "next/image";
import { useState } from "react";
import type { Service } from "@/data/services";
import { useCart } from "@/lib/cart";

function Silhouette() {
  return (
    <svg viewBox="0 0 120 120" className="h-2/3 w-auto" aria-hidden="true">
      <path
        d="M18 84c20-6 30-20 46-40 8-10 16-18 30-22l8 8c-8 12-16 22-28 34C56 78 40 88 22 92l-4-8Z"
        fill="var(--color-placeholder)"
      />
    </svg>
  );
}

export function ProductTile({ service }: { service: Service }) {
  const { items, add, inc, dec } = useCart();
  const [imgError, setImgError] = useState(false);
  const inCart = items.find((it) => it.id === service.id);
  const showImg = service.image && !imgError;

  return (
    <div className="flex flex-col rounded-[16px] border border-line bg-surface p-[12px]">
      {/* Foto (produkt-cutout → object-contain, ikke beskåret) */}
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[10px] bg-panel p-[12px]">
        {showImg ? (
          <Image
            src={service.image as string}
            alt={service.navn}
            width={220}
            height={165}
            onError={() => setImgError(true)}
            className="max-h-full w-auto object-contain"
          />
        ) : (
          <Silhouette />
        )}
      </div>

      {/* Navn + pris (læsbart, normal case) */}
      <div className="mt-[12px] flex items-baseline justify-between gap-[8px]">
        <span className="text-[16px] font-medium leading-tight text-ink">{service.navn}</span>
        <span className="shrink-0 text-[16px] font-semibold tabular-nums text-ink">{service.pris} kr</span>
      </div>
      {service.note && <p className="mt-[4px] text-[13px] leading-snug text-muted">{service.note}</p>}

      {/* Tilføj / antals-stepper */}
      <div className="mt-[12px]">
        {inCart ? (
          <div className="flex items-center justify-between rounded-full bg-panel p-[4px]">
            <button
              type="button"
              onClick={() => dec(service.id)}
              aria-label={`Færre ${service.navn}`}
              className="inline-flex h-[36px] w-[36px] items-center justify-center rounded-full bg-surface text-[20px] text-ink transition-colors hover:text-accent"
            >
              −
            </button>
            <span className="text-[15px] font-medium tabular-nums text-ink">{inCart.qty} i kurv</span>
            <button
              type="button"
              onClick={() => inc(service.id)}
              aria-label={`Flere ${service.navn}`}
              className="inline-flex h-[36px] w-[36px] items-center justify-center rounded-full bg-surface text-[20px] text-ink transition-colors hover:text-accent"
            >
              +
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => add(service)}
            className="inline-flex w-full items-center justify-center gap-[6px] rounded-full bg-accent py-[12px] text-[15px] font-medium text-white transition-colors hover:bg-accent-dark active:scale-[0.98]"
          >
            + Tilføj
          </button>
        )}
      </div>
    </div>
  );
}
