import type { Metadata } from "next";
import Link from "next/link";
import { Roboto_Slab, Inter } from "next/font/google";

const robotoSlab = Roboto_Slab({ subsets: ["latin"], weight: ["400", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "Knivslibning i Nykøbing Falster – Sundby Sliberi",
  description:
    "Knivslibning i Sundby, Nykøbing Falster. Få køkkenknive og værktøj slebet hos Sundby Sliberi – aflever selv eller bestil lokal afhentning.",
};

export default function KnivslibningNykoebingFalster() {
  return (
    <main
      className={`${inter.className} min-h-screen bg-[#F9F7F3] text-neutral-900 px-8 py-12 w-full max-w-[90rem] mx-auto flex flex-col`}
    >
      <div className="w-full max-w-3xl mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-xs text-neutral-600 hover:text-neutral-900 hover:underline underline-offset-2"
        >
          ← Til forsiden
        </Link>
      </div>
      <section className="max-w-2xl mx-auto text-center flex-1 flex flex-col justify-center gap-7 md:gap-8">
        <h1 className={`${robotoSlab.className} text-3xl md:text-4xl text-neutral-900`}>
          Knivslibning i Sundby, Nykøbing Falster
        </h1>
        <p className="text-neutral-700 leading-relaxed text-left">
          Hos Sundby Sliberi tilbyder vi skarp og nænsom slibning af køkkenknive, værktøj og
          maskinklinger – lokalt i Sundby, Nykøbing Falster. Du kan både aflevere selv eller
          bestille afhentning, så du slipper for besværet. Med mange års erfaring i slibning får du
          et resultat, du kan stole på hver gang. Det skal være let og tilgængeligt for alle –
          uanset om du er amatør eller professionel.
        </p>
        <p className="text-neutral-700 leading-relaxed text-left">
          Bestillingen foregår online: vælg hvad du vil have slebet, udfyld dine oplysninger og
          vælg afleveringsform. Når vi har modtaget din bestilling, vender vi retur indenfor{" "}
          <span className="font-semibold">24 timer</span> med en bekræftelse og aftale om tid.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/bestil"
            className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 text-white px-6 py-3 text-sm hover:bg-neutral-700 transition-colors"
          >
            Se priser og bestil slibning
          </Link>
          <Link
            href="/aflevering"
            className="inline-flex items-center justify-center rounded-2xl border border-neutral-300 text-neutral-800 px-6 py-3 text-sm hover:bg-neutral-100 transition-colors"
          >
            Læs om aflevering og afhentning
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


