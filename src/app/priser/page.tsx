import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES, CATEGORY_LABELS, type ServiceCategory } from "@/data/services";

export const metadata: Metadata = {
  title: "Priser på slibning af knive & værktøj | Sundby Sliberi",
  description:
    "Se priser på slibning af knive, værktøj og haveredskaber hos Sundby Sliberi i Nykøbing Falster. Alle priser inkl. moms.",
  openGraph: {
    title: "Priser på slibning af knive & værktøj | Sundby Sliberi",
    description: "Priser på slibning af knive, værktøj og haveredskaber. Alle priser inkl. moms.",
    url: "https://sundby-sliberi.dk/priser",
    siteName: "Sundby Sliberi",
    locale: "da_DK",
    type: "article",
  },
};

const ORDER: ServiceCategory[] = ["knive", "vaerktoej", "have"];

export default function Priser() {
  return (
    <main className="mx-auto w-full max-w-[1200px] px-[20px] py-[48px] md:px-[32px] md:py-[64px]">
      <p className="kicker text-clay">Priser</p>
      <h1 className="mt-[10px] font-display text-[44px] text-ink md:text-[64px]">Hvad koster det</h1>
      <p className="mt-[12px] max-w-[60ch] text-[15px] leading-relaxed text-muted">
        Alle priser er inkl. moms. Den endelige pris bekræftes altid, før du betaler noget.
      </p>

      <div className="mt-[40px] grid gap-[28px] md:grid-cols-3">
        {ORDER.map((kategori) => {
          const items = SERVICES.filter((s) => s.kategori === kategori);
          return (
            <section key={kategori} className="rounded-[6px] border border-line bg-surface p-[28px]">
              <h2 className="font-display text-[26px] text-ink">{CATEGORY_LABELS[kategori]}</h2>
              <dl className="mt-[16px]">
                {items.map((s, i) => (
                  <div
                    key={s.id}
                    className={`flex items-baseline justify-between gap-[12px] py-[12px] ${
                      i > 0 ? "border-t border-line" : ""
                    }`}
                  >
                    <dt className="text-[15px] text-ink">{s.navn}</dt>
                    <dd className="shrink-0 text-[15px] text-muted tabular-nums">{s.pris} kr</dd>
                  </div>
                ))}
              </dl>
            </section>
          );
        })}
      </div>

      <div className="mt-[40px]">
        <Link
          href="/bestil"
          className="inline-flex rounded-full bg-clay px-[24px] py-[13px] text-[14px] font-medium text-white transition-colors hover:bg-[#946449]"
        >
          Bestil slibning
        </Link>
      </div>
    </main>
  );
}
