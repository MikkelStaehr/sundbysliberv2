import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ErhvervForm } from "./ErhvervForm";

export const metadata: Metadata = {
  title: "Erhvervsaftaler – Restauranter, kantiner & virksomheder | Sundby Sliberi",
  description:
    "Samarbejd med Sundby Sliberi om faste slibeaftaler til restauranter, caféer, kantiner og andre professionelle køkkener på Lolland-Falster.",
  openGraph: {
    title: "Erhvervsaftaler – Restauranter, kantiner & virksomheder | Sundby Sliberi",
    description:
      "Faste slibeaftaler til restauranter, caféer, kantiner og andre professionelle køkkener på Lolland-Falster.",
    url: "https://sundby-sliberi.dk/erhverv",
    siteName: "Sundby Sliberi",
    locale: "da_DK",
    type: "article",
  },
};

// INTERIM: indhold bevaret, wrappet i nyt bento-system. Detaljeret bento-redesign følger senere.
export default function Erhverv() {
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
      <section className="w-full max-w-4xl mx-auto text-center flex-1 flex flex-col items-center justify-center gap-7 md:gap-8">
        <Image
          src="/images/hero_rooster_icon.png"
          alt="Sundby Sliberi"
          width={120}
          height={120}
          className="mx-auto mb-6 drop-shadow-sm"
        />
        <h1 className="text-3xl md:text-4xl text-neutral-900 font-semibold tracking-tight">
          Erhvervsaftaler og faste samarbejder
        </h1>
        <p className="text-neutral-700 leading-relaxed max-w-3xl mx-auto text-left">
          Har du restaurant, café, kantine eller andet professionelt køkken på Lolland-Falster, kan
          vi lave en fast aftale om slibning af dine knive, køkkenredskaber og håndværktøj.
        </p>
        <p className="text-neutral-700 leading-relaxed max-w-3xl mx-auto text-left">
          Vi tilbyder fleksible løsninger med faste slibedage eller slibning efter behov, så
          både køkken og værksted altid har skarpe redskaber – uden at du skal holde styr på det i
          hverdagen.
        </p>
        <ul className="text-sm text-neutral-800 max-w-3xl mx-auto space-y-3 text-left leading-relaxed">
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-neutral-300 text-[10px] text-neutral-600">
              ✓
            </span>
            <span>Faste slibedage eller slibning efter behov</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-neutral-300 text-[10px] text-neutral-600">
              ✓
            </span>
            <span>Slibning af køkkenknive, køkkenredskaber og håndværktøj</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-neutral-300 text-[10px] text-neutral-600">
              ✓
            </span>
            <span>Lokalt samarbejde på Lolland-Falster</span>
          </li>
        </ul>
        <div id="kontakt" className="scroll-mt-[100px] border border-neutral-200 bg-white rounded-2xl p-7 md:p-8 shadow-sm text-left max-w-3xl mx-auto">
          <h2 className="text-xl text-neutral-900 mb-3 font-semibold tracking-tight">
            Lad os tage en uforpligtende snak
          </h2>
          <p className="text-sm text-neutral-700 leading-relaxed mb-3">
            Udfyld formularen herunder, så vender vi retur og foreslår en løsning, der passer til jer.
          </p>
          <ErhvervForm />
        </div>
        <p className="text-sm text-neutral-600 leading-relaxed max-w-3xl mx-auto">
          Vi holder til i Sundby ved Nykøbing Falster og kører primært på Lolland-Falster og omegn.
          Har du ønsker uden for området, så skriv – så ser vi på det.
        </p>
      </section>
    </main>
  );
}


