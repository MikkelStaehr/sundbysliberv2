import type { Metadata } from "next";
import Link from "next/link";
import { ImagePanel } from "@/components/ImagePanel";
import ctaShop from "@/img/hero/CTAShop.jpg";

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
    <main className="mx-auto w-full max-w-none px-[20px] py-[48px] md:px-[32px] lg:px-[48px] xl:px-[72px] md:py-[64px]">
      {/* Bento-hero — fylder bredden */}
      <div className="grid gap-[16px] lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-center rounded-[24px] bg-panel p-[28px] md:p-[48px]">
          <p className="kicker text-accent">Om mig</p>
          <h1 className="mt-[14px] font-display text-[36px] uppercase leading-[1.05] text-ink md:text-[56px]">
            Knivslibning i Sundby, Nykøbing Falster
          </h1>
          <p className="mt-[20px] max-w-[52ch] text-[16px] leading-relaxed text-muted md:text-[18px]">
            Jeg hedder Mikkel Stæhr, bor på Lolland og sliber knive, værktøj, haveredskaber og alt
            andet der skal gøres skarpt, ud af mit værksted i Sundby.
          </p>
          <div className="mt-[28px] flex flex-wrap gap-[12px]">
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

        <ImagePanel
          src={ctaShop}
          alt="Slibning hos Sundby Sliberi"
          priority
          rounded="rounded-[24px]"
          className="min-h-[280px] lg:min-h-full"
        />
      </div>

      {/* Indhold — to brede kort */}
      <div className="mt-[16px] grid gap-[16px] md:grid-cols-2">
        <section className="rounded-[20px] border border-line bg-surface p-[24px] md:p-[36px]">
          <h2 className="text-[22px] font-semibold text-ink">Med samme respekt, hver gang</h2>
          <p className="mt-[14px] text-[16px] leading-relaxed text-muted">
            Alt bliver håndslebet og renoveret i hånden. Intet er overladt til tilfældighederne. Med
            rigelig erfaring og en stadig sult efter ny viden bliver hver opgave taget ordentligt hånd
            om.
          </p>
          <p className="mt-[14px] text-[16px] leading-relaxed text-muted">
            Det er lige meget, om kniven er fundet i en container eller har kostet flere tusinde
            kroner. Alt bliver renoveret, slebet og poleret op med samme respekt for materialet.
          </p>
        </section>

        <section className="rounded-[20px] border border-line bg-surface p-[24px] md:p-[36px]">
          <h2 className="text-[22px] font-semibold text-ink">Sådan bestiller du knivslibning</h2>
          <p className="mt-[14px] text-[16px] leading-relaxed text-muted">
            Bestillingen foregår online: vælg hvad du vil have slebet, og udfyld dine oplysninger. Når
            jeg har modtaget din bestilling, ringer jeg dig op og aftaler pris og leveringsdag.
          </p>
          <p className="mt-[14px] text-[16px] leading-relaxed text-muted">
            Jeg sliber blandt andet kokkeknive, urteknive, brødknive, økser, stemmejern,
            plæneklipperklinger og meget mere. Er du i tvivl, om jeg kan hjælpe med din skærekant, er
            du altid velkommen til at kontakte mig.
          </p>
        </section>
      </div>
    </main>
  );
}
