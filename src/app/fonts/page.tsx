import type { Metadata } from "next";
import type { CSSProperties } from "react";
import localFont from "next/font/local";
import { Fraunces } from "next/font/google";

/*
  Intern font-testside (/fonts). noindex.
  Sammenligner kandidater (Fraunces, Outfit, …) i logo-varianter, ægte vægte
  og en "cut-out i sort kasse"-behandling. Tilføj nye fonte i CANDIDATES.
*/

export const metadata: Metadata = {
  title: "Font-test – Sundby Sliberi",
  robots: { index: false, follow: false },
};

const fraunces = Fraunces({
  weight: ["400", "500", "600", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

// Outfit (Fontshare) — variabel font med ægte vægte; gratis til kommerciel brug.
const outfit = localFont({ src: "../../fonts/Outfit_Complete/Fonts/TTF/Outfit-Variable.ttf", display: "swap" });

// Logo-varianter: størrelse, bogstavafstand, caps/ikke-caps.
const LOGO_VARIANTS: { label: string; text: string; style: CSSProperties }[] = [
  { label: "Mixed case · normal · 64px", text: "Sundby Sliberi", style: { fontSize: 64 } },
  { label: "Versaler · normal · 52px", text: "SUNDBY SLIBERI", style: { fontSize: 52 } },
  { label: "Versaler · spærret 0.18em · 40px", text: "SUNDBY SLIBERI", style: { fontSize: 40, letterSpacing: "0.18em" } },
  { label: "Versaler · tæt −0.03em · 56px", text: "SUNDBY SLIBERI", style: { fontSize: 56, letterSpacing: "-0.03em" } },
  { label: "Små bogstaver · 60px", text: "sundby sliberi", style: { fontSize: 60 } },
  { label: "Header-størrelse · 36px", text: "Sundby Sliberi", style: { fontSize: 36 } },
  { label: "Stort + let spærret 0.01em · 80px", text: "Sundby Sliberi", style: { fontSize: 80, letterSpacing: "0.01em" } },
];

// Cut-out (sort kasse, bogstaver i baggrundsfarven = "skåret ud").
const CUTOUTS: { text: string; style: CSSProperties }[] = [
  { text: "Sundby Sliberi", style: { fontSize: 48, fontWeight: 700 } },
  { text: "SUNDBY SLIBERI", style: { fontSize: 40, fontWeight: 700, letterSpacing: "0.04em" } },
  { text: "Sundby Sliberi", style: { fontSize: 30, fontWeight: 600 } },
];

type Candidate = {
  navn: string;
  className: string;
  licens: string;
  weights: { label: string; weight: number }[];
};

const CANDIDATES: Candidate[] = [
  {
    navn: "Fraunces",
    className: fraunces.className,
    licens: "Gratis – kommerciel OK",
    weights: [
      { label: "Regular · 400", weight: 400 },
      { label: "Medium · 500", weight: 500 },
      { label: "Semibold · 600", weight: 600 },
      { label: "Bold · 700", weight: 700 },
      { label: "Black · 900", weight: 900 },
    ],
  },
  {
    navn: "Outfit",
    className: outfit.className,
    licens: "Gratis – kommerciel OK (Fontshare)",
    weights: [
      { label: "Light · 300", weight: 300 },
      { label: "Regular · 400", weight: 400 },
      { label: "Medium · 500", weight: 500 },
      { label: "Semibold · 600", weight: 600 },
      { label: "Bold · 700", weight: 700 },
      { label: "Extrabold · 800", weight: 800 },
    ],
  },
];

function CutoutRow({ className }: { className: string }) {
  return (
    <div className="mt-[20px] flex flex-wrap items-center gap-[16px]">
      {CUTOUTS.map((c, i) => (
        <div key={i} className="inline-flex bg-ink px-[28px] py-[18px]">
          <span className={`${className} leading-none text-bg`} style={c.style}>
            {c.text}
          </span>
        </div>
      ))}
    </div>
  );
}

function CandidateBlock({ c }: { c: Candidate }) {
  return (
    <div className="grid gap-[16px]">
      {/* Cut-out på sidens baggrund */}
      <CutoutRow className={c.className} />

      {/* Størrelse / afstand / caps */}
      <section className="rounded-[24px] bg-panel p-[28px] md:p-[40px]">
        <div className="flex flex-wrap items-baseline justify-between gap-[8px] border-b border-line pb-[16px]">
          <h3 className="text-[15px] font-semibold text-ink">{c.navn} · størrelse · afstand · caps</h3>
          <span className="product-name text-[11px] text-apricot-deep">{c.licens}</span>
        </div>
        <div className="mt-[24px] grid gap-[20px]">
          {LOGO_VARIANTS.map((v, i) => (
            <div key={i} className="overflow-hidden border-b border-line/60 pb-[16px] last:border-0">
              <p className="product-name text-[10px] text-muted">{v.label}</p>
              <p className={`${c.className} mt-[8px] leading-tight text-ink`} style={v.style}>
                {v.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Ægte vægte */}
      <section className="rounded-[24px] bg-panel p-[28px] md:p-[40px]">
        <div className="flex flex-wrap items-baseline justify-between gap-[8px] border-b border-line pb-[16px]">
          <h3 className="text-[15px] font-semibold text-ink">{c.navn} · ægte vægte</h3>
          <span className="product-name text-[11px] text-apricot-deep">Variabel font</span>
        </div>
        <div className="mt-[24px] grid gap-[16px]">
          {c.weights.map((w) => (
            <div key={w.weight} className="overflow-hidden border-b border-line/60 pb-[14px] last:border-0">
              <p className="product-name text-[10px] text-muted">{w.label}</p>
              <p className={`${c.className} mt-[6px] text-ink`} style={{ fontSize: 52, fontWeight: w.weight }}>
                Sundby Sliberi
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function FontTestPage() {
  return (
    <main className="mx-auto w-full max-w-none px-[16px] py-[48px] md:px-[24px] lg:px-[44px] xl:px-[72px] md:py-[72px]">
      <p className="kicker text-accent">Intern test</p>
      <h1 className="mt-[12px] font-display text-[40px] uppercase text-ink md:text-[56px]">Font-test</h1>
      <p className="mt-[16px] max-w-[60ch] text-[16px] leading-relaxed text-muted">
        Kandidater (alle gratis til kommerciel brug) i logo-varianter, ægte vægte og cut-out.
        Siden er <code className="text-ink">noindex</code>.
      </p>

      {CANDIDATES.map((c) => (
        <div key={c.navn}>
          <h2 className="mt-[48px] font-display text-[28px] uppercase text-ink">{c.navn}</h2>
          <div className="mt-[20px]">
            <CandidateBlock c={c} />
          </div>
        </div>
      ))}
    </main>
  );
}
