import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { SITE } from "@/lib/site";
import { ImagePanel } from "./ImagePanel";
import { RotatingHeadline } from "./RotatingHeadline";
import japKnives from "@/img/hero/JapKnifes.jpg";
import vaerktoejPhoto from "@/img/hero/elizabeth-french-wmObLzO2g-s-unsplash.jpg";
import ctaShop from "@/img/hero/CTAShop.jpg";

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
    image: vaerktoejPhoto,
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
            <h1 className="mt-[24px] font-display text-[34px] uppercase leading-[1.12] text-ink md:text-[52px] xl:text-[60px]">
              <RotatingHeadline />
            </h1>
            <p className="mt-[24px] max-w-[52ch] text-[16px] leading-relaxed text-muted md:text-[18px]">
              Jeg er en lokal sliber i Sundby på Lolland. Jeg sliber alt fra knive, værktøj og
              haveredskaber. Alt bliver slebet i hånden og poleret op. Ring eller bestil direkte i{" "}
              <Link href="/bestil" className="font-medium text-accent underline-offset-2 hover:underline">
                webshoppen
              </Link>
              , så aftaler vi nærmere.
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
          {/* Selve panelet — foto (klippet til afrundet form) */}
          <div className="absolute inset-0 overflow-hidden rounded-[32px] bg-panel-2">
            <Image
              src={ctaShop}
              alt="Slibning hos Sundby Sliberi"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            {/* Let scrim så badge/piller er læsbare oven på fotoet */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20"
            />
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
              (stikker ud til venstre), pænt i hjørnet på mobil. Indkøbspose-ikon
              + fed tekst, så den tydeligt læser som "gå til webshop". */}
          <div className="absolute right-[16px] top-[16px] rounded-full bg-bg p-[8px] lg:right-auto lg:left-[-62px] lg:top-1/2 lg:-translate-y-1/2">
            <Link
              href="/bestil"
              aria-label="Bestil slibning online nu"
              className="flex h-[116px] w-[116px] flex-col items-center justify-center gap-[5px] rounded-full bg-apricot text-center text-ink transition-colors hover:bg-apricot-deep hover:text-white md:h-[136px] md:w-[136px]"
            >
              <svg viewBox="0 0 24 24" className="h-[24px] w-[24px] md:h-[26px] md:w-[26px]" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="M6 8h12l-1 11a2 2 0 0 1-2 1.8H9a2 2 0 0 1-2-1.8L6 8Z" strokeLinejoin="round" />
                <path d="M9 8a3 3 0 0 1 6 0" strokeLinecap="round" />
              </svg>
              <span className="font-display text-[19px] uppercase leading-none md:text-[22px]">
                Bestil nu
              </span>
              <span className="product-name text-[9px] leading-none opacity-80">
                Online →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
