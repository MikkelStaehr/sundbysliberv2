"use client";

import { Roboto_Slab, Inter } from "next/font/google";
import Link from "next/link";

const robotoSlab = Roboto_Slab({ subsets: ["latin"], weight: ["400", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function TakSide() {
  return (
    <main
      className={`${inter.className} min-h-screen bg-[#F9F7F3] text-neutral-900 px-8 py-12 w-full max-w-[60rem] mx-auto flex items-center`}
    >
      <section className="w-full rounded-2xl border border-neutral-200 bg-white shadow-sm px-8 py-10 text-center">
        <h1 className={`${robotoSlab.className} text-4xl text-neutral-900 mb-4`}>
          Tak for din bestilling
        </h1>
        <p className="text-[15px] text-neutral-700 max-w-xl mx-auto mb-6">
          Din bestilling er nu sendt til Sundby Sliberi. Mikkel vender retur
          indenfor <span className="font-semibold">24 timer</span> med en
          bekræftelse af aftalen og de praktiske detaljer.
        </p>
        <p className="text-sm text-neutral-600 max-w-xl mx-auto mb-10">
          Skulle du have yderligere spørgsmål eller ændringer til bestillingen,
          er du altid velkommen til at svare på bekræftelsesmailen, når du
          modtager den – eller kontakte os direkte på{" "}
          <span className="font-medium">info@sundby-sliberi.dk</span> eller
          telefon <span className="font-medium">31 38 61 19</span>.
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
      </section>
    </main>
  );
}


