import Link from "next/link";
import type { StaticImageData } from "next/image";
import { SITE } from "@/lib/site";
import { ImagePanel } from "./ImagePanel";
import japKnives from "@/img/hero/JapKnifes.jpg";
import workshop from "@/img/hero/Workshop.jpg";

/*
  Bento-hero — asymmetrisk med diagonale (vinklede) kanter via clip-path.
  Tre flader: grå overskriftspanel, oliven CTA-panel, og to foto-tiles.
  Abrikos bruges som pop-accent på den runde knap.
*/

// Diagonale clip-paths (skæve former i stedet for ens afrundede firkanter)
const CLIP_HEADLINE = "polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 44px))";
const CLIP_OLIVE = "polygon(0 44px, 100% 0, 100% 100%, 0 100%)";
const CLIP_TILE_L = "polygon(0 0, 100% 28px, 100% 100%, 0 100%)";
const CLIP_TILE_R = "polygon(0 28px, 100% 0, 100% 100%, 0 100%)";

type Tile = {
  label: string;
  href: string;
  image?: StaticImageData;
  alt?: string;
  grain?: boolean;
  clip: string;
};

const TILES: Tile[] = [
  {
    label: "Knive",
    href: "/bestil",
    image: japKnives,
    alt: "Japanske knive slebet hos Sundby Sliberi",
    grain: true, // rent foto — film-grain så den matcher Workshop
    clip: CLIP_TILE_L,
  },
  {
    label: "Værktøj",
    href: "/bestil",
    image: workshop,
    alt: "Værktøj på værkstedet hos Sundby Sliberi",
    clip: CLIP_TILE_R,
  },
];

export function Hero() {
  return (
    <section className="mx-auto w-full max-w-none px-[16px] pt-[16px] md:px-[24px] lg:px-[44px] xl:px-[72px] md:pt-[24px]">
      <div className="grid gap-[16px] lg:grid-cols-[1.12fr_0.88fr]">
        {/* Venstre kolonne */}
        <div className="flex flex-col gap-[16px]">
          {/* Overskriftspanel — grå, diagonal bund */}
          <div
            className="bg-panel px-[28px] py-[40px] pb-[64px] md:px-[44px] md:py-[56px] md:pb-[80px]"
            style={{ clipPath: CLIP_HEADLINE }}
          >
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

          {/* To kategori-tiles med modsatrettede diagonaler */}
          <div className="grid grid-cols-2 gap-[16px]">
            {TILES.map((tile) => (
              <Link key={tile.label} href={tile.href} className="group relative">
                <ImagePanel
                  src={tile.image}
                  alt={tile.alt ?? ""}
                  grain={tile.grain}
                  rounded="rounded-none"
                  style={{ clipPath: tile.clip }}
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

        {/* Højre: oliven CTA-panel, diagonal top */}
        <div
          className="relative min-h-[440px] overflow-hidden bg-olive lg:min-h-full"
          style={{ clipPath: CLIP_OLIVE }}
        >
          {/* Stor, tonal kniv-silhuet for tekstur */}
          <svg
            viewBox="0 0 200 200"
            className="pointer-events-none absolute -bottom-[10px] -left-[20px] h-3/4 w-auto opacity-15"
            aria-hidden="true"
          >
            <path
              d="M30 160c40-12 70-34 104-78 12-15 26-30 46-38l10 11c-12 18-26 34-50 60C190 100 80 150 40 168l-10-8Z"
              fill="#3f4a32"
            />
          </svg>

          {/* Rund primær-CTA — abrikos pop */}
          <Link
            href="/bestil"
            className="absolute right-[20px] top-[64px] inline-flex h-[108px] w-[108px] flex-col items-center justify-center rounded-full bg-apricot text-center text-ink transition-colors hover:bg-apricot-deep hover:text-white md:h-[128px] md:w-[128px]"
          >
            <span className="product-name text-[11px] leading-tight">Bestil</span>
            <span className="product-name text-[11px] leading-tight">nu →</span>
          </Link>

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
        </div>
      </div>
    </section>
  );
}
