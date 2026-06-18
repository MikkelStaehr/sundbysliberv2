"use client";

import { CATEGORY_LABELS, SERVICES, type ServiceCategory } from "@/data/services";
import { ProductTile } from "./ProductTile";

// Rækkefølge + farvet kategori-prik (visuel nøgle, gør det nemt at scanne)
const SECTIONS: { key: ServiceCategory; dot: string }[] = [
  { key: "knive", dot: "bg-accent" },
  { key: "vaerktoej", dot: "bg-apricot" },
  { key: "have", dot: "bg-ink" },
];

export function CatalogSections() {
  return (
    <div className="flex flex-col gap-[16px]">
      {SECTIONS.map(({ key, dot }) => {
        const items = SERVICES.filter((s) => s.kategori === key);
        if (items.length === 0) return null;
        return (
          <section key={key} className="rounded-[24px] bg-panel p-[16px] md:p-[24px]">
            <div className="flex items-center justify-between px-[4px]">
              <div className="flex items-center gap-[10px]">
                <span aria-hidden="true" className={`h-[12px] w-[12px] rounded-full ${dot}`} />
                <h2 className="font-display text-[28px] uppercase text-ink md:text-[34px]">
                  {CATEGORY_LABELS[key]}
                </h2>
              </div>
              <span className="text-[13px] text-muted">
                {items.length} {items.length === 1 ? "ydelse" : "ydelser"}
              </span>
            </div>

            <div className="mt-[16px] grid grid-cols-2 gap-[12px] sm:grid-cols-3 xl:grid-cols-4">
              {items.map((s) => (
                <ProductTile key={s.id} service={s} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
