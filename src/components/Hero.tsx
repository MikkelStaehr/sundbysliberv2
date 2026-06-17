import Link from "next/link";
import type { StaticImageData } from "next/image";
import { SITE } from "@/lib/site";
import { ImagePanel } from "./ImagePanel";
import japKnives from "@/img/hero/JapKnifes.jpg";
import workshop from "@/img/hero/Workshop.jpg";

/*
  Bento-hero — bløde, afrundede paneler der nester ind i hinanden.
  "Ind og ud af hinanden" laves med cirkulære elementer, der lægger sig i
  kanten af et panel omgivet af en baggrundsfarvet "halo" (ringen carver et
  konkavt hak, så panelet ser ud til at bue rundt om cirklen).
*/

type Tile = { label: string; href: string; image?: StaticImageData; alt?: string; grain?: boolean };

const TILES: Tile[] = [
  {
    label: "Knive",
    href: "/bestil",
    image: japKnives,
    alt: "Japanske knive slebet hos Sundby Sliberi",
    grain: true,
  },
  {
    label: "Værktøj",
    href: "/bestil",
    image: workshop,
    alt: "Værktøj på værkstedet hos Sundby Sliberi",
  },
];

export function Hero() {
  return (
    <section className="mx-auto w-full max-w-none px-[16px] pt-[16px] md:px-[24px] lg:px-[44px] xl:px-[72px] md:pt-[24px]">
      <div className="relative grid gap-[16px] lg:grid-cols-[1.1fr_0.9fr]">
        {/* Venstre kolonne */}
        <div className="flex flex-col gap-[16px]">
          {/* Overskriftspanel */}
          <div className="rounded-[32px] bg-panel px-[28px] py-[40px] md:px-[48px] md:py-[60px]">
            <div className="flex items-center gap-[12px]">
              <p className="kicker text-accent">Knivslibning · Nykøbing F.</p>
              <span aria-hidden="true" className="h-[1px] flex-1 bg-line" />
            </div>
            <h1 className="mt-[20px] font-display text-[56px] uppercase text-ink md:text-[88px] xl:text-[104px]">
              Fra sløv
              <br />
              til skarp
            </h1>
            <p className="mt-[24px] max-w-[46ch] text-[16px] leading-relaxed text-muted md:text-[18px]">
              Professionel slibning af knive og værktøj i Nykøbing Falster. Aflever lokalt — så gør vi
              dem skarpe igen, til den dag vi aftaler.
            </p>
          </div>

          {/* To foto-tiles */}
          <div className="grid grid-cols-2 gap-[16px]">
            {TILES.map((tile) => (
              <Link key={tile.label} href={tile.href} className="group relative">
                <ImagePanel
                  src={tile.image}
                  alt={tile.alt ?? ""}
                  grain={tile.grain}
                  rounded="rounded-[24px]"
                  className="aspect-[4/5] sm:aspect-square lg:aspect-[4/3]"
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/65 to-transparent"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-[20px]">
                    <span className="font-display text-[28px] uppercase text-white transition-colors group-hover:text-apricot md:text-[34px]">
                      {tile.label}
                    </span>
                  </div>
                </ImagePanel>
              </Link>
            ))}
          </div>
        </div>

        {/* Højre: oliven CTA-panel. Container er IKKE klippet, så den runde
            CTA kan stikke ud i sømmen og carve et konkavt hak i begge paneler. */}
        <div className="relative min-h-[460px] lg:min-h-full">
          {/* Selve panelet (klippet, så silhuetten holdes inde) */}
          <div className="absolute inset-0 overflow-hidden rounded-[32px] bg-olive">
            <svg
              viewBox="0 0 200 200"
              className="pointer-events-none absolute -bottom-[10px] -left-[16px] h-3/4 w-auto opacity-15"
              aria-hidden="true"
            >
              <path
                d="M30 160c40-12 70-34 104-78 12-15 26-30 46-38l10 11c-12 18-26 34-50 60C190 100 80 150 40 168l-10-8Z"
                fill="#3f4a32"
              />
            </svg>
          </div>

          {/* Anmeldelses-badge nestet i et hjørne (halo carver hakket) */}
          <div className="absolute left-[16px] top-[16px] rounded-full bg-bg p-[6px] lg:left-auto lg:right-[20px]">
            <div className="flex h-[72px] w-[72px] flex-col items-center justify-center rounded-full bg-surface text-center md:h-[84px] md:w-[84px]">
              <span className="font-display text-[20px] text-ink md:text-[24px]">5,0</span>
              <span className="product-name text-[9px] text-muted">★ Google</span>
            </div>
          </div>

          {/* Pille-genveje nederst */}
          <div className="absolute inset-x-[20px] bottom-[20px] flex flex-wrap gap-[10px]">
            <Link
              href="/priser"
              className="inline-flex items-center rounded-full bg-surface px-[20px] py-[12px] text-[14px] font-medium text-ink transition-colors hover:bg-bg"
            >
              Se priser
            </Link>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-[8px] rounded-full bg-ink px-[20px] py-[12px] text-[14px] font-medium text-white transition-colors hover:bg-accent-dark"
            >
              Ring {SITE.phoneDisplay}
            </a>
          </div>

          {/* Rund "Bestil nu"-CTA: nester i sømmen mellem panelerne på desktop
              (stikker ud til venstre), pænt i hjørnet på mobil. */}
          <div className="absolute right-[16px] top-[16px] rounded-full bg-bg p-[8px] lg:right-auto lg:left-[-58px] lg:top-1/2 lg:-translate-y-1/2">
            <Link
              href="/bestil"
              className="flex h-[104px] w-[104px] flex-col items-center justify-center rounded-full bg-apricot text-center text-ink transition-colors hover:bg-apricot-deep hover:text-white md:h-[124px] md:w-[124px]"
            >
              <span className="product-name text-[11px] leading-tight">Bestil</span>
              <span className="product-name text-[11px] leading-tight">nu →</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
