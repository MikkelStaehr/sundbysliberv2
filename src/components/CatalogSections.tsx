"use client";

import { CATEGORY_LABELS, SERVICES, type ServiceCategory } from "@/data/services";
import { ProductRow } from "./ProductRow";

// Rækkefølge + farvet kategori-prik (visuel nøgle)
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
          <section key={key} className="rounded-bento border border-line bg-surface p-[16px] md:p-[24px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[10px]">
                <span aria-hidden="true" className={`h-[12px] w-[12px] rounded-full ${dot}`} />
                <h2 className="font-display text-[26px] uppercase text-ink md:text-[30px]">
                  {CATEGORY_LABELS[key]}
                </h2>
              </div>
              <span className="text-[13px] text-muted">
                {items.length} {items.length === 1 ? "ydelse" : "ydelser"}
              </span>
            </div>

            {/* Ren vertikal liste — én vare pr. linje, stablet ovenfra og ned */}
            <div className="mt-[8px] flex flex-col">
              {items.map((s) => (
                <ProductRow key={s.id} service={s} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
