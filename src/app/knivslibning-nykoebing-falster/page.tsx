import type { Metadata } from "next";
import Link from "next/link";
import { ImagePanel } from "@/components/ImagePanel";
import ctaShop from "@/img/hero/cta-shop.jpg";

export const metadata: Metadata = {
  title: "Knivslibning i Nykøbing Falster – Sundby Sliberi",
  description:
    "Knivslibning i Sundby, Nykøbing Falster. Få køkkenknive og værktøj slebet hos Sundby Sliberi – aflever lokalt og få dem skarpe igen.",
  openGraph: {
    title: "Knivslibning i Nykøbing Falster – Sundby Sliberi",
    description:
      "Lokal knivslibning i Sundby ved Nykøbing Falster. Få køkkenknive, værktøj og maskinklinger slebet nemt og professionelt.",
    url: "https://sundby-sliberi.dk/knivslibning-nykoebing-falster",
    siteName: "Sundby Sliberi",
    locale: "da_DK",
    type: "article",
  },
};

export default function KnivslibningNykoebingFalster() {
  return (
    <main className="mx-auto w-full max-w-[1280px] px-[20px] py-[48px] md:px-[32px] md:py-[72px]">
      <div className="grid gap-[32px] lg:grid-cols-2 lg:gap-[56px]">
        {/* Venstre: alt om mig */}
        <div>
          <p className="kicker text-accent">Om mig</p>
          <h1 className="mt-[14px] font-display text-[34px] uppercase leading-[1.05] text-ink md:text-[52px]">
            Knivslibning i Sundby, Nykøbing Falster
          </h1>
          <p className="mt-[20px] text-[16px] leading-relaxed text-muted md:text-[18px]">
            Jeg hedder Mikkel Stæhr, bor på Lolland og sliber knive, værktøj, haveredskaber og alt
            andet der skal gøres skarpt, ud af mit værksted i Sundby.
          </p>

          <h2 className="mt-[32px] text-[22px] font-semibold text-ink">Med samme respekt, hver gang</h2>
          <p className="mt-[12px] text-[16px] leading-relaxed text-muted">
            Alt bliver håndslebet og renoveret i hånden. Intet er overladt til tilfældighederne. Med
            rigelig erfaring og en stadig sult efter ny viden bliver hver opgave taget ordentligt hånd
            om.
          </p>
          <p className="mt-[12px] text-[16px] leading-relaxed text-muted">
            Det er lige meget, om kniven er fundet i en container eller har kostet flere tusinde
            kroner. Alt bliver renoveret, slebet og poleret op med samme respekt for materialet.
          </p>

          <h2 className="mt-[32px] text-[22px] font-semibold text-ink">Sådan bestiller du knivslibning</h2>
          <p className="mt-[12px] text-[16px] leading-relaxed text-muted">
            Bestillingen foregår online: vælg hvad du vil have slebet, og udfyld dine oplysninger. Når
            jeg har modtaget din bestilling, ringer jeg dig op og aftaler pris og leveringsdag.
          </p>
          <p className="mt-[12px] text-[16px] leading-relaxed text-muted">
            Jeg sliber blandt andet kokkeknive, urteknive, brødknive, økser, stemmejern,
            plæneklipperklinger og meget mere. Er du i tvivl, om jeg kan hjælpe med din skærekant, er
            du altid velkommen til at kontakte mig.
          </p>

          <div className="mt-[32px] flex flex-wrap gap-[12px]">
            <Link
              href="/bestil"
              className="inline-flex items-center justify-center rounded-full bg-accent px-[24px] py-[13px] text-[15px] font-medium text-white transition-colors hover:bg-accent-dark"
            >
              Bestil slibning
            </Link>
            <Link
              href="/priser"
              className="inline-flex items-center justify-center rounded-full border border-line px-[24px] py-[13px] text-[15px] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Se priser
            </Link>
          </div>
        </div>

        {/* Højre: billede (pladsholder = værkstedsfoto; byttes til cutout af Mikkel) */}
        <div className="lg:sticky lg:top-[96px] lg:self-start">
          <ImagePanel
            src={ctaShop}
            alt="Mikkel Stæhr i værkstedet hos Sundby Sliberi"
            priority
            rounded="rounded-bento"
            className="aspect-[4/5]"
          />
        </div>
      </div>
    </main>
  );
}
