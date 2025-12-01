"use client";

import Link from "next/link";

export default function TakSide() {
  return (
    <main
      className="min-h-screen bg-[#F9F7F3] text-neutral-900 px-8 py-12 w-full max-w-[60rem] mx-auto flex flex-col"
    >
      <div className="w-full mb-4">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 hover:underline underline-offset-2"
        >
          ← Til forsiden
        </Link>
      </div>
      <section className="w-full flex-1 flex items-center">
        <div className="w-full rounded-2xl border border-neutral-200 bg-white shadow-sm px-8 py-10 text-center">
          <h1 className="text-4xl text-neutral-900 mb-4 font-semibold tracking-tight">
            Tak for din bestilling
          </h1>
        <p className="text-base text-neutral-700 max-w-xl mx-auto mb-6">
            Din bestilling er nu sendt til Sundby Sliberi. Indenfor{" "}
            <span className="font-semibold">24 timer</span> modtager du en
            bekræftelsesmail med en endelig kvittering for din ordre – inklusive dine valgte
            tidspunkter for aflevering og eventuel afhentning.
          </p>
          <p className="text-sm text-neutral-600 max-w-xl mx-auto mb-10">
            Skulle du have yderligere spørgsmål eller ændringer til bestillingen,
            er du altid velkommen til at svare på bekræftelsesmailen, når du
            modtager den – eller kontakte os direkte på{" "}
            <span className="font-medium">info@sundby-sliberi.dk</span> eller
            telefon <span className="font-medium">31 38 61 19</span>. Tjek også
            gerne din spam-mappe, hvis du ikke kan se vores bekræftelse. Vi
            bruger kun dine oplysninger til at håndtere din bestilling – læs
            mere i vores{" "}
            <Link
              href="/privatliv"
              className="underline-offset-2 hover:underline"
            >
              privatlivs- og cookiepolitik
            </Link>
            .
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 text-white px-6 py-3 text-sm hover:bg-neutral-700 transition-colors"
            >
              Til forsiden
            </Link>
            <Link
              href="/bestil"
              className="inline-flex items-center justify-center rounded-2xl border border-neutral-300 text-neutral-800 px-6 py-3 text-sm hover:bg-neutral-100 transition-colors"
            >
              Lav en ny bestilling
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}


