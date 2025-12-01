import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sundby Sliberi – Professionel slibning af knive & værktøj i Nykøbing Falster",
  description:
    "Bestil professionel slibning af knive og værktøj hos Sundby Sliberi. Vi hjælper både private og professionelle i Sundby, Nykøbing Falster – aflever selv eller få afhentet.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F9F7F3] px-8 py-10 md:py-16 w-full max-w-[90rem] mx-auto flex flex-col items-center">
      <section className="flex flex-col items-center justify-center text-center flex-1 w-full">
        <Image
          src="/images/hero_rooster_icon.png"
          alt="Sundby Sliberi hero ikon"
          width={320}
          height={320}
          priority
          fetchPriority="high"
          className="mb-8 drop-shadow-sm"
        />
        <p className="text-[11px] uppercase tracking-wide text-neutral-500 mb-2">
          Lokal knivslibning på Lolland-Falster
        </p>
        <h1 className="text-4xl md:text-5xl mb-6 text-neutral-800 font-semibold">
          Sundby Sliberi
        </h1>
        <div className="w-full max-w-3xl mx-auto space-y-6 md:space-y-8">
          <p className="text-[15px] leading-relaxed text-neutral-700">
            Professionel slibning af knive og værktøj til både{" "}
            <span className="font-semibold">private</span> og{" "}
            <span className="font-semibold">professionelle</span>. Aflever selv, eller få afhentet – lokalt i
            Sundby, Nykøbing Falster.
          </p>
          <div className="space-y-3 text-xs text-neutral-600">
            <div className="flex items-center justify-center gap-2">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-neutral-300 text-[10px] text-neutral-600">
                ✓
              </span>
              <span>Fast svar indenfor 24 timer</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-neutral-300 text-[10px] text-neutral-600">
                ✓
              </span>
              <span>Ingen onlinebetaling – vi aftaler først, betaling bagefter</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-neutral-300 text-[10px] text-neutral-600">
                ✓
              </span>
              <span>Til både private hjem og professionelle køkkener</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/bestil"
              className="rounded-2xl bg-neutral-900 text-white px-6 py-3 hover:bg-neutral-700 transition-colors"
            >
              Bestil slibning
            </Link>
            <Link
              href="/erhverv"
              className="rounded-2xl border border-neutral-300 bg-white text-neutral-800 px-6 py-3 text-sm hover:bg-neutral-100 transition-colors"
            >
              Erhvervsaftaler
            </Link>
          </div>
          <div className="space-y-2 text-xs text-neutral-600 text-center">
            <p>Du betaler først, når vi har bekræftet aftalen.</p>
            <p>
              Driver du restaurant, café eller kantine?{" "}
              <Link href="/erhverv" className="underline-offset-2 hover:underline text-neutral-800">
                Læs om erhvervsaftaler her
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="w-full mt-10 md:mt-12 mb-4 max-w-4xl">
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm px-6 py-7">
          <p className="text-[11px] uppercase tracking-wide text-neutral-500 mb-1 text-center">
            Sådan foregår en bestilling
          </p>
          <h2 className="text-2xl text-neutral-900 mb-1 text-center font-semibold tracking-tight">
            Sådan foregår det
          </h2>
          <p className="text-sm text-neutral-600 mb-5 text-center">
            Tre enkle trin fra sløv til skarp.
          </p>
          <div className="grid gap-5 md:grid-cols-3 text-left text-sm text-neutral-800">
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
              <p className="text-neutral-600">Vi vender retur indenfor 24 timer.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
