"use client";

import Image from "next/image";
import { useState } from "react";
import type { Service } from "@/data/services";

function PlaceholderSilhouette() {
  // Simpel grå silhuet indtil rigtige fotos lægges ind.
  return (
    <svg viewBox="0 0 120 120" className="h-full w-auto" aria-hidden="true">
      <path
        d="M18 84c20-6 30-20 46-40 8-10 16-18 30-22l8 8c-8 12-16 22-28 34C56 78 40 88 22 92l-4-8Z"
        fill="var(--color-placeholder)"
      />
    </svg>
  );
}

export function ProductCard({ service, onAdd }: { service: Service; onAdd: (s: Service) => void }) {
  const [imgError, setImgError] = useState(false);
  const showImage = service.image && !imgError;

  return (
    <div className="flex flex-col">
      <div className="relative flex aspect-square items-center justify-center rounded-[6px] border border-line bg-surface p-[24px]">
        {showImage ? (
          <Image
            src={service.image as string}
            alt={service.navn}
            width={200}
            height={200}
            className="max-h-full w-auto object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <PlaceholderSilhouette />
        )}

        <button
          type="button"
          onClick={() => onAdd(service)}
          aria-label={`Læg ${service.navn} i kurv`}
          className="absolute bottom-[12px] right-[12px] inline-flex h-[36px] w-[36px] items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:bg-clay hover:text-white hover:border-clay active:scale-95"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="mt-[14px] flex items-baseline justify-between gap-[12px]">
        <span className="product-name text-ink">{service.navn}</span>
        <span className="shrink-0 text-[15px] text-muted tabular-nums">{service.pris} kr</span>
      </div>
      {service.note && <p className="mt-[6px] text-[13px] leading-snug text-muted">{service.note}</p>}
    </div>
  );
}
