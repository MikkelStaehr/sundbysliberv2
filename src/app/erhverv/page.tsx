import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Roboto_Slab, Inter } from "next/font/google";

const robotoSlab = Roboto_Slab({ subsets: ["latin"], weight: ["400", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "Erhvervsaftaler – Restauranter, kantiner & virksomheder | Sundby Sliberi",
  description:
    "Samarbejd med Sundby Sliberi om faste slibeaftaler til restauranter, caféer, kantiner og andre professionelle køkkener på Lolland-Falster.",
};

export default function Erhverv() {
  return (
    <main
      className={`${inter.className} min-h-screen bg-[#F9F7F3] text-neutral-900 px-8 py-12 w-full max-w-[90rem] mx-auto flex flex-col items-center`}
    >
      <div className="w-full max-w-3xl mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-xs text-neutral-600 hover:text-neutral-900 hover:underline underline-offset-2"
        >
          ← Til forsiden
        </Link>
      </div>
      <section className="w-full max-w-3xl text-center flex-1 flex flex-col items-center justify-center">
        <Image
          src="/images/hero_rooster_icon.png"
          alt="Sundby Sliberi"
          width={120}
          height={120}
          className="mx-auto mb-6 drop-shadow-sm"
        />
        <h1 className={`${robotoSlab.className} text-3xl md:text-4xl mb-4 text-neutral-900`}>
          Erhvervsaftaler og faste samarbejder
        </h1>
        <p className="text-neutral-700 mb-4 max-w-2xl mx-auto">
          Har du restaurant, café, kantine eller andet professionelt køkken på Lolland-Falster, kan
          vi lave en fast aftale om slibning af dine knive og værktøj.
        </p>
        <p className="text-neutral-700 mb-6 max-w-2xl mx-auto">
          Vi tilbyder fleksible løsninger med faste afhentningsdage eller slibning efter behov, så
          køkkenet altid har skarpe redskaber – uden at du skal holde styr på det i hverdagen.
        </p>
        <div className="border border-neutral-200 bg-white rounded-2xl p-6 shadow-sm mb-8 text-left md:text-center">
          <h2 className={`${robotoSlab.className} text-xl text-neutral-900 mb-3`}>
            Lad os tage en uforpligtende snak
          </h2>
          <p className="text-sm text-neutral-700 mb-4">
            Skriv et par linjer om din virksomhed og dit behov, så vender vi retur og
            foreslår en løsning, der passer til jer.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:info@sundby-sliberi.dk?subject=Erhvervsaftale%20-%20Sundby%20Sliberi"
              className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 text-white px-6 py-3 text-sm hover:bg-neutral-700 transition-colors"
            >
              Skriv til os på mail
            </a>
            <a
              href="tel:+4531386119"
              className="inline-flex items-center justify-center rounded-2xl border border-neutral-300 text-neutral-800 px-6 py-3 text-sm hover:bg-neutral-100 transition-colors"
            >
              Ring på 31 38 61 19
            </a>
          </div>
        </div>
        <p className="text-xs text-neutral-600">
          Vi holder til i Sundby ved Nykøbing Falster og kører primært på Lolland-Falster og omegn.
          Har du ønsker uden for området, så skriv – så ser vi på det.
        </p>
      </section>
    </main>
  );
}


