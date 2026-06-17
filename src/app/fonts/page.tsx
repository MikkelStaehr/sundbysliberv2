import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  Bebas_Neue,
  Anton,
  Oswald,
  Fraunces,
  Instrument_Serif,
  Space_Grotesk,
} from "next/font/google";
import { SITE } from "@/lib/site";

/*
  Intern font-testside (/fonts). Øverst: forslag der er GRATIS til kommerciel
  brug (Google Fonts) — dem kan vi faktisk bruge. Nederst: de lokale demo-fonte
  fra src/fonts (kun personligt brug, kan ikke deployes). noindex.
*/

export const metadata: Metadata = {
  title: "Font-test – Sundby Sliberi",
  robots: { index: false, follow: false },
};

// ── Forslag: gratis til kommerciel brug (Google Fonts) ──────────────────────
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], display: "swap" });
const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap" });
const oswald = Oswald({ weight: ["500", "700"], subsets: ["latin"], display: "swap" });
const fraunces = Fraunces({ weight: ["600", "700"], subsets: ["latin"], display: "swap" });
const instrument = Instrument_Serif({ weight: "400", subsets: ["latin"], display: "swap" });
const spaceGrotesk = Space_Grotesk({ weight: ["500", "700"], subsets: ["latin"], display: "swap" });

// ── Lokale fonte fra src/fonts ──────────────────────────────────────────────
const ciguatera = localFont({ src: "../../fonts/ciguatera.otf", display: "swap" });
const qugan = localFont({ src: "../../fonts/qugan/Qugan-Regular.otf", display: "swap" });

type FontSample = { navn: string; stil: string; className: string; licens: string };

const FORSLAG: FontSample[] = [
  { navn: "Bebas Neue", stil: "Høj, kondenseret, industriel", className: bebas.className, licens: "Gratis – kommerciel OK" },
  { navn: "Anton", stil: "Tung kondenseret, slagkraftig", className: anton.className, licens: "Gratis – kommerciel OK" },
  { navn: "Oswald", stil: "Kondenseret grotesk, robust", className: oswald.className, licens: "Gratis – kommerciel OK" },
  { navn: "Fraunces", stil: "Varm håndværks-serif", className: fraunces.className, licens: "Gratis – kommerciel OK" },
  { navn: "Instrument Serif", stil: "Elegant redaktionel serif", className: instrument.className, licens: "Gratis – kommerciel OK" },
  { navn: "Space Grotesk", stil: "Moderne teknisk grotesk", className: spaceGrotesk.className, licens: "Gratis – kommerciel OK" },
];

const DEMO: FontSample[] = [
  { navn: "Ciguatera", stil: "src/fonts/ciguatera.otf · bruges på logoet nu", className: ciguatera.className, licens: "Ingen licensfil – tjek før brug" },
  { navn: "Qugan", stil: "src/fonts/qugan/", className: qugan.className, licens: "Demo – kun personligt brug" },
];

function FontRow({ f }: { f: FontSample }) {
  return (
    <section className="rounded-[24px] bg-panel p-[28px] md:p-[40px]">
      <div className="flex flex-wrap items-baseline justify-between gap-[8px] border-b border-line pb-[16px]">
        <h3 className="text-[15px] font-semibold text-ink">{f.navn}</h3>
        <span className="product-name text-[11px] text-apricot-deep">{f.licens}</span>
      </div>
      <p className="mt-[6px] text-[12px] text-muted">{f.stil}</p>

      <div className={f.className}>
        <p className="mt-[24px] text-[48px] leading-tight text-ink md:text-[72px]">{SITE.name}</p>
        <p className="mt-[16px] text-[28px] uppercase leading-tight text-ink md:text-[40px]">
          Fra sløv til skarp
        </p>
        <p className="mt-[16px] text-[20px] leading-relaxed text-ink/80">
          Quizdeltagerne spiste jordbær med fløde. — æøå ÆØÅ
        </p>
        <p className="mt-[12px] text-[22px] text-ink/80">0123456789 · {SITE.phoneDisplay}</p>
      </div>
    </section>
  );
}

export default function FontTestPage() {
  return (
    <main className="mx-auto w-full max-w-none px-[16px] py-[48px] md:px-[24px] lg:px-[44px] xl:px-[72px] md:py-[72px]">
      <p className="kicker text-accent">Intern test</p>
      <h1 className="mt-[12px] font-display text-[40px] uppercase text-ink md:text-[56px]">Font-test</h1>
      <p className="mt-[16px] max-w-[60ch] text-[16px] leading-relaxed text-muted">
        Øverst: forslag der er gratis til kommerciel brug, så de faktisk kan bruges på siden.
        Nederst: de lokale demo-fonte (kun personligt brug). Siden er <code className="text-ink">noindex</code>.
      </p>

      <h2 className="mt-[48px] font-display text-[24px] uppercase text-ink">Forslag · gratis til kommerciel brug</h2>
      <div className="mt-[20px] grid gap-[16px]">
        {FORSLAG.map((f) => (
          <FontRow key={f.navn} f={f} />
        ))}
      </div>

      <h2 className="mt-[56px] font-display text-[24px] uppercase text-ink">Lokale fonte i src/fonts</h2>
      <div className="mt-[20px] grid gap-[16px]">
        {DEMO.map((f) => (
          <FontRow key={f.navn} f={f} />
        ))}
      </div>
    </main>
  );
}
