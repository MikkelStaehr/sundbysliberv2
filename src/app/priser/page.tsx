import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SERVICES, CATEGORY_LABELS, type ServiceCategory } from "@/data/services";
import { PrintButton } from "@/components/PrintButton";
import { SITE } from "@/lib/site";

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

// Samme farve-nøgle som webshoppen
const SECTIONS: { key: ServiceCategory; dot: string; tint: string }[] = [
  { key: "knive", dot: "bg-accent", tint: "bg-olive/25" },
  { key: "vaerktoej", dot: "bg-apricot", tint: "bg-apricot/30" },
  { key: "have", dot: "bg-ink", tint: "bg-panel-2" },
];

export default function Priser() {
  return (
    <main className="mx-auto w-full max-w-none px-[20px] py-[48px] md:px-[32px] lg:px-[48px] xl:px-[72px] md:py-[64px]">
      <p className="kicker text-accent">Prisblad</p>
      <h1 className="mt-[10px] font-display text-3xl uppercase text-ink md:text-5xl">Hvad koster det</h1>
      <p className="mt-[12px] max-w-[60ch] text-base leading-relaxed text-muted">
        Alle priser er inkl. moms. Den endelige pris bekræftes altid, før du betaler noget.
      </p>
      <div className="mt-[20px]">
        <PrintButton />
      </div>

      <div className="mt-[32px] grid gap-[16px] sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map(({ key, dot, tint }) => {
          const items = SERVICES.filter((s) => s.kategori === key);
          if (items.length === 0) return null;
          return (
            <section key={key} className="rounded-bento border border-line bg-surface p-[16px] md:p-[24px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[10px]">
                  <span aria-hidden="true" className={`h-[12px] w-[12px] rounded-full ${dot}`} />
                  <h2 className="font-display text-xl uppercase text-ink md:text-2xl">
                    {CATEGORY_LABELS[key]}
                  </h2>
                </div>
                <span className="text-xs text-muted">
                  {items.length} {items.length === 1 ? "ydelse" : "ydelser"}
                </span>
              </div>

              <div className="mt-[8px] flex flex-col">
                {items.map((s) => (
                  <div key={s.id} className="flex items-center gap-[14px] border-t border-line py-[12px] first:border-t-0">
                    <div className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-input ${tint} p-[7px]`}>
                      {s.image ? (
                        <Image src={s.image} alt={s.navn} width={72} height={72} className="max-h-full w-auto object-contain" />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-base font-medium leading-tight text-ink">{s.navn}</p>
                      {s.note && <p className="mt-[2px] text-xs leading-snug text-muted">{s.note}</p>}
                    </div>
                    <span className="shrink-0 text-base font-semibold tabular-nums text-ink">{s.pris} kr</span>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-[32px] print:hidden">
        <Link
          href="/bestil"
          className="inline-flex rounded-full bg-accent px-[24px] py-[13px] text-sm font-medium text-white transition-colors hover:bg-accent-dark"
        >
          Bestil slibning
        </Link>
      </div>

      {/* Kun ved print: kontakt + moms, så et udprintet/PDF-prisblad kan stå alene */}
      <div className="mt-[24px] hidden border-t border-line pt-[16px] text-xs text-ink print:block">
        Sundby Sliberi · {SITE.address.street}, {SITE.address.postalCode} {SITE.address.city} ·{" "}
        {SITE.phoneDisplay} · {SITE.email} · Alle priser inkl. moms.
      </div>
    </main>
  );
}
