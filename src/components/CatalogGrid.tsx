"use client";

import { useEffect, useMemo, useState } from "react";
import { SERVICES, type Service, type ServiceCategory } from "@/data/services";
import { useCart } from "@/lib/cart";
import { ProductCard } from "./ProductCard";

type Filter = "alle" | ServiceCategory;
type Sort = "lav" | "hoej";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "alle", label: "Alle" },
  { key: "knive", label: "Knive" },
  { key: "vaerktoej", label: "Værktøj" },
  { key: "have", label: "Have" },
];

export function CatalogGrid() {
  const { add } = useCart();
  const [filter, setFilter] = useState<Filter>("alle");
  const [sort, setSort] = useState<Sort>("lav");
  const [toast, setToast] = useState<string | null>(null);

  const visible = useMemo(() => {
    const list = filter === "alle" ? SERVICES : SERVICES.filter((s) => s.kategori === filter);
    return [...list].sort((a, b) => (sort === "lav" ? a.pris - b.pris : b.pris - a.pris));
  }, [filter, sort]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const handleAdd = (s: Service) => {
    add(s);
    setToast(`${s.navn} lagt i kurv`);
  };

  return (
    <div>
      {/* Filter + sortér */}
      <div className="flex flex-col gap-[16px] border-b border-line pb-[16px] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-[20px]">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
              className={`kicker pb-[4px] text-[12px] transition-colors ${
                filter === f.key
                  ? "border-b-2 border-clay text-ink"
                  : "border-b-2 border-transparent text-muted hover:text-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-[8px] text-[13px] text-muted">
          <span className="kicker text-[11px]">Sortér</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-[6px] border border-line bg-surface px-[10px] py-[6px] text-[14px] text-ink"
          >
            <option value="lav">Pris lav → høj</option>
            <option value="hoej">Pris høj → lav</option>
          </select>
        </label>
      </div>

      {/* Grid */}
      <div className="mt-[28px] grid grid-cols-1 gap-[28px] sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((s) => (
          <ProductCard key={s.id} service={s} onAdd={handleAdd} />
        ))}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-[20px] left-1/2 z-50 -translate-x-1/2 animate-[fadeInUp_0.3s_ease-out]">
          <div className="flex items-center gap-[10px] rounded-[6px] border border-line bg-ink px-[16px] py-[12px] text-[14px] text-white">
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden="true">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}
