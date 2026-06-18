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

// INTERIM: indhold bevaret, wrappet i nyt bento-system. Detaljeret bento-redesign følger senere.
export default function KnivslibningNykoebingFalster() {
  return (
    <main
      className="min-h-screen bg-bg text-neutral-900 px-[20px] py-[48px] md:px-[32px] lg:px-[48px] xl:px-[72px] md:py-[64px] w-full max-w-none mx-auto flex flex-col"
    >
      <div className="w-full max-w-3xl mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 hover:underline underline-offset-2"
        >
          ← Til forsiden
        </Link>
      </div>
      <section className="max-w-2xl mx-auto text-center flex-1 flex flex-col justify-center gap-7 md:gap-8">
        <h1 className="text-3xl md:text-4xl text-neutral-900 font-semibold tracking-tight">
          Knivslibning i Sundby, Nykøbing Falster
        </h1>
        <div className="space-y-5 text-left">
          <h2 className="text-xl md:text-2xl text-neutral-900 font-semibold tracking-tight">
            Lokal knivslibning på Lolland-Falster
          </h2>
          <p className="text-neutral-700 leading-relaxed">
            Hos Sundby Sliberi tilbyder vi skarp og nænsom slibning af køkkenknive, værktøj og
            maskinklinger – lokalt i Sundby, Nykøbing Falster. Du afleverer dine ting hos os, og med
            mange års erfaring i slibning får du et resultat, du kan stole på hver gang. Det skal være
            let og tilgængeligt for alle – uanset om du er amatør eller professionel.
          </p>
          <h2 className="text-xl md:text-2xl text-neutral-900 font-semibold tracking-tight">
            Sådan bestiller du knivslibning
          </h2>
          <p className="text-neutral-700 leading-relaxed">
            Bestillingen foregår online: vælg hvad du vil have slebet, og udfyld dine oplysninger. Når
            vi har modtaget din bestilling, ringer vi dig op og aftaler pris og leveringsdag.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/bestil"
            className="inline-flex items-center justify-center rounded-full bg-accent text-white px-6 py-3 text-sm transition-colors hover:bg-accent-dark"
          >
            Bestil slibning
          </Link>
          <Link
            href="/priser"
            className="inline-flex items-center justify-center rounded-full border border-line text-ink px-6 py-3 text-sm transition-colors hover:border-accent hover:text-accent"
          >
            Se priser
          </Link>
        </div>
        <p className="text-sm text-neutral-600 leading-relaxed text-left">
          Vi sliber blandt andet kokkeknive, urteknive, brødknive, økser, stemmejern, plæneklipperklinger
          og meget mere. Er du i tvivl, om vi kan hjælpe med din skærekant, er du altid velkommen til
          at kontakte os.
        </p>
      </section>
    </main>
  );
}


