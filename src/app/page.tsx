import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Roboto_Slab, Inter } from "next/font/google";

const robotoSlab = Roboto_Slab({ subsets: ["latin"], weight: ["400", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "Sundby Sliberi – Professionel slibning af knive & værktøj i Nykøbing Falster",
  description:
    "Bestil professionel slibning af knive og værktøj hos Sundby Sliberi. Vi hjælper både private og professionelle i Sundby, Nykøbing Falster – aflever selv eller få afhentet.",
};

export default function Home() {
  return (
    <main className={`${inter.className} min-h-screen bg-[#F9F7F3] px-8 py-12 w-full max-w-[90rem] mx-auto flex flex-col items-center`}>
      <section className="flex flex-col items-center justify-center text-center flex-1">
        <Image
          src="/images/hero_rooster_icon.png"
          alt="Sundby Sliberi hero ikon"
          width={320}
          height={320}
          priority
          fetchPriority="high"
          quality={70}
          className="mb-8 drop-shadow-sm"
        />
        <h1 className={`${robotoSlab.className} text-4xl md:text-5xl mb-4 text-neutral-800`}>Sundby Sliberi</h1>
        <p className="max-w-xl text-neutral-700 mb-8">
          Professionel slibning af knive og værktøj til både{" "}
          <span className="font-semibold">private</span> og{" "}
          <span className="font-semibold">professionelle</span>. Aflever selv, eller få afhentet – lokalt i
          Sundby, Nykøbing Falster.
        </p>
        <Link href="/bestil" className="rounded-2xl bg-neutral-900 text-white px-6 py-3 hover:bg-neutral-700 transition-colors">
          Bestil slibning
        </Link>
      </section>

      <section className="w-full mt-12 mb-4 max-w-4xl">
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm px-6 py-7">
          <h2 className={`${robotoSlab.className} text-2xl text-neutral-900 mb-1 text-center`}>Sådan foregår det</h2>
          <p className="text-sm text-neutral-600 mb-5 text-center">
            Tre enkle trin fra sløv til skarp.
          </p>
          <div className="grid gap-4 md:grid-cols-3 text-left text-sm text-neutral-800">
            <div className="flex flex-col gap-1">
              <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-neutral-900 text-white text-xs font-semibold mb-1">
                1
              </div>
              <div className="font-semibold">Vælg slibning</div>
              <p className="text-neutral-600">Læg knive og værktøj i kurven.</p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-neutral-900 text-white text-xs font-semibold mb-1">
                2
              </div>
              <div className="font-semibold">Udfyld oplysninger</div>
              <p className="text-neutral-600">Vælg aflevering/afhentning – og evt. ekspres.</p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-neutral-900 text-white text-xs font-semibold mb-1">
                3
              </div>
              <div className="font-semibold">Vi aftaler nærmere</div>
              <p className="text-neutral-600">Mikkel vender retur indenfor 24 timer.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
