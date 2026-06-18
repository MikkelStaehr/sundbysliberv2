import type { Metadata } from "next";
import Link from "next/link";

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
      <div className="mx-auto w-full max-w-[760px]">
        <p className="kicker text-accent">Om Sundby Sliberi</p>
        <h1 className="mt-[14px] font-display text-[36px] uppercase leading-[1.05] text-ink md:text-[52px]">
          Knivslibning i Sundby, Nykøbing Falster
        </h1>

        <div className="mt-[28px] rounded-[20px] border border-line bg-surface p-[24px] md:p-[36px]">
          <h2 className="text-[20px] font-semibold text-ink">Lokal knivslibning på Lolland-Falster</h2>
          <p className="mt-[12px] text-[16px] leading-relaxed text-muted">
            Hos Sundby Sliberi tilbyder vi skarp og nænsom slibning af køkkenknive, værktøj og
            maskinklinger – lokalt i Sundby, Nykøbing Falster. Du afleverer dine ting hos os, og med
            mange års erfaring i slibning får du et resultat, du kan stole på hver gang. Det skal være
            let og tilgængeligt for alle – uanset om du er amatør eller professionel.
          </p>

          <h2 className="mt-[28px] text-[20px] font-semibold text-ink">Sådan bestiller du knivslibning</h2>
          <p className="mt-[12px] text-[16px] leading-relaxed text-muted">
            Bestillingen foregår online: vælg hvad du vil have slebet, og udfyld dine oplysninger. Når
            vi har modtaget din bestilling, ringer vi dig op og aftaler pris og leveringsdag.
          </p>
        </div>

        <div className="mt-[24px] flex flex-wrap gap-[12px]">
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

        <p className="mt-[24px] text-[15px] leading-relaxed text-muted">
          Vi sliber blandt andet kokkeknive, urteknive, brødknive, økser, stemmejern,
          plæneklipperklinger og meget mere. Er du i tvivl, om vi kan hjælpe med din skærekant, er du
          altid velkommen til at kontakte os.
        </p>
      </div>
    </main>
  );
}
