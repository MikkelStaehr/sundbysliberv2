"use client";

import Image from "next/image";
import { useState } from "react";
import type { Service, ServiceCategory } from "@/data/services";
import { useCart } from "@/lib/cart";

// Farvet thumbnail pr. kategori — giver liv uden at fylde.
const TINT: Record<ServiceCategory, string> = {
  knive: "bg-olive/25",
  vaerktoej: "bg-apricot/30",
  have: "bg-panel-2",
};

function Silhouette() {
  return (
    <svg viewBox="0 0 120 120" className="h-3/5 w-auto" aria-hidden="true">
      <path
        d="M18 84c20-6 30-20 46-40 8-10 16-18 30-22l8 8c-8 12-16 22-28 34C56 78 40 88 22 92l-4-8Z"
        fill="var(--color-placeholder)"
      />
    </svg>
  );
}

export function ProductRow({ service }: { service: Service }) {
  const { items, add, inc, dec } = useCart();
  const [imgError, setImgError] = useState(false);
  const inCart = items.find((it) => it.id === service.id);

  return (
    <div className="flex items-center gap-[12px] border-t border-line py-[12px] first:border-t-0 sm:gap-[16px]">
      {/* Thumbnail */}
      <div className={`flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-[14px] ${TINT[service.kategori]} p-[6px] sm:h-[84px] sm:w-[84px]`}>
        {service.image && !imgError ? (
          <Image
            src={service.image}
            alt={service.navn}
            width={80}
            height={80}
            onError={() => setImgError(true)}
            className="max-h-full w-auto object-contain"
          />
        ) : (
          <Silhouette />
        )}
      </div>

      {/* Navn + note */}
      <div className="min-w-0 flex-1">
        <p className="text-[16px] font-medium leading-tight text-ink">{service.navn}</p>
        {service.note && <p className="mt-[2px] text-[12px] leading-snug text-muted">{service.note}</p>}
      </div>

      {/* Pris */}
      <span className="shrink-0 text-[16px] font-semibold tabular-nums text-ink">{service.pris} kr</span>

      {/* Tilføj / stepper */}
      {inCart ? (
        <div className="flex shrink-0 items-center gap-[2px] rounded-full bg-panel p-[3px]">
          <button
            type="button"
            onClick={() => dec(service.id)}
            aria-label={`Færre ${service.navn}`}
            className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-full bg-surface text-[18px] text-ink transition-colors hover:text-accent"
          >
            −
          </button>
          <span className="w-[22px] text-center text-[15px] font-medium tabular-nums text-ink">{inCart.qty}</span>
          <button
            type="button"
            onClick={() => inc(service.id)}
            aria-label={`Flere ${service.navn}`}
            className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-full bg-surface text-[18px] text-ink transition-colors hover:text-accent"
          >
            +
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => add(service)}
          aria-label={`Tilføj ${service.navn} til kurv`}
          className="inline-flex shrink-0 items-center gap-[6px] rounded-full bg-accent px-[16px] py-[9px] text-[14px] font-medium text-white transition-colors hover:bg-accent-dark active:scale-95"
        >
          <span className="text-[17px] leading-none">+</span>
          <span className="hidden sm:inline">Tilføj</span>
        </button>
      )}
    </div>
  );
}
