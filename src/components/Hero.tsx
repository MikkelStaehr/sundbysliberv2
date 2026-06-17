import Link from "next/link";
import { SITE } from "@/lib/site";
import { ImagePanel } from "./ImagePanel";

/*
  Bento-hero. Venstre: stor overskriftspanel + to kategori-tiles.
  Højre: foto-panel med rund "BESTIL NU"-knap og pille-genveje.
  Foto-paneler er pladsholdere nu — giv ImagePanel en `src` når fotos er klar.
*/

const TILES = [
  { label: "Knive", tag: "#KØKKEN", href: "/bestil" },
  { label: "Værktøj", tag: "#VÆRKSTED", href: "/bestil" },
];

export function Hero() {
  return (
    <section className="mx-auto w-full max-w-none px-[16px] pt-[16px] md:px-[24px] lg:px-[44px] xl:px-[72px] md:pt-[24px]">
      <div className="grid gap-[16px] lg:grid-cols-2">
        {/* Venstre kolonne */}
        <div className="flex flex-col gap-[16px]">
          <div className="rounded-[24px] bg-panel px-[28px] py-[40px] md:px-[44px] md:py-[56px]">
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

          {/* To kategori-tiles */}
          <div className="grid grid-cols-2 gap-[16px]">
            {TILES.map((tile) => (
              <Link key={tile.label} href={tile.href} className="group relative">
                <ImagePanel rounded="rounded-[16px]" className="aspect-[4/5] sm:aspect-square lg:aspect-[4/3]">
                  <div className="absolute inset-0 flex flex-col justify-end p-[20px]">
                    <span className="product-name text-muted">{tile.tag}</span>
                    <span className="font-display text-[28px] uppercase text-ink transition-colors group-hover:text-accent md:text-[34px]">
                      {tile.label}
                    </span>
                  </div>
                </ImagePanel>
              </Link>
            ))}
          </div>
        </div>

        {/* Højre: foto-panel */}
        <ImagePanel
          priority
          className="relative min-h-[420px] lg:min-h-full"
          alt="Slibning hos Sundby Sliberi"
        >
          {/* Rund primær-CTA */}
          <Link
            href="/bestil"
            className="absolute right-[20px] top-[20px] inline-flex h-[104px] w-[104px] flex-col items-center justify-center rounded-full bg-accent text-center text-white transition-colors hover:bg-accent-dark md:h-[124px] md:w-[124px]"
          >
            <span className="product-name text-[11px] leading-tight">Bestil</span>
            <span className="product-name text-[11px] leading-tight">nu →</span>
          </Link>

          {/* Pille-genveje nederst */}
          <div className="absolute inset-x-[20px] bottom-[20px] flex flex-wrap gap-[10px]">
            <Link
              href="/priser"
              className="inline-flex items-center rounded-full bg-surface px-[20px] py-[12px] text-[14px] font-medium text-ink transition-colors hover:bg-panel"
            >
              Se priser
            </Link>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-[8px] rounded-full bg-ink px-[20px] py-[12px] text-[14px] font-medium text-white transition-colors hover:bg-accent"
            >
              Ring {SITE.phoneDisplay}
            </a>
          </div>
        </ImagePanel>
      </div>
    </section>
  );
}
