import type { Metadata } from "next";
import Link from "next/link";
import { ErhvervForm } from "./ErhvervForm";
import { ImagePanel } from "@/components/ImagePanel";
import erhvervPhoto from "@/img/prokitchenerhverv/istockphoto-2150321519-1024x1024.jpg";

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

const BENEFITS = [
  "Faste slibedage eller slibning efter behov",
  "Slibning af køkkenknive, køkkenredskaber og håndværktøj",
  "Lokalt samarbejde på Lolland-Falster",
];

export default function Erhverv() {
  return (
    <main className="mx-auto w-full max-w-none px-[20px] py-[48px] md:px-[32px] lg:px-[48px] xl:px-[72px] md:py-[64px]">
      <div className="w-full max-w-none">
        {/* Bento-hero */}
        <div className="grid gap-[16px] lg:grid-cols-2">
          <div className="flex flex-col justify-center rounded-[24px] bg-panel p-[28px] md:p-[44px]">
            <p className="kicker text-accent">Erhverv</p>
            <h1 className="mt-[14px] font-display text-[36px] uppercase leading-[1.05] text-ink md:text-[52px]">
              Skarpe knive,
              <br />
              uden besvær
            </h1>
            <p className="mt-[20px] text-[16px] leading-relaxed text-muted">
              Har du restaurant, café, kantine eller andet professionelt køkken på Lolland-Falster,
              laver vi en fast aftale om slibning af dine knive, køkkenredskaber og håndværktøj — så
              både køkken og værksted altid har skarpe redskaber.
            </p>
            <Link
              href="#kontakt"
              className="mt-[28px] inline-flex self-start rounded-full bg-accent px-[24px] py-[13px] text-[15px] font-medium text-white transition-colors hover:bg-accent-dark"
            >
              Få et uforpligtende tilbud
            </Link>
          </div>

          <ImagePanel
            src={erhvervPhoto}
            alt="Professionelt køkken"
            priority
            rounded="rounded-[24px]"
            className="min-h-[280px] lg:min-h-full"
          />
        </div>

        {/* Fordele — ren liste */}
        <div className="mt-[16px] rounded-[20px] border border-line bg-surface p-[24px] md:p-[32px]">
          <p className="kicker text-muted">Sådan hjælper vi jer</p>
          <ul className="mt-[12px] flex flex-col">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-center gap-[14px] border-t border-line py-[16px] first:border-t-0">
                <span aria-hidden="true" className="inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-accent text-white">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-[16px] text-ink">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Kontakt */}
        <div id="kontakt" className="mt-[16px] scroll-mt-[100px] rounded-[20px] border border-line bg-surface p-[24px] md:p-[32px]">
          <h2 className="font-display text-[26px] uppercase text-ink md:text-[32px]">
            Lad os tage en uforpligtende snak
          </h2>
          <p className="mt-[10px] text-[15px] leading-relaxed text-muted">
            Udfyld formularen, så vender vi retur og foreslår en løsning, der passer til jer.
          </p>
          <ErhvervForm />
        </div>

        <p className="mt-[20px] text-[14px] leading-relaxed text-muted">
          Vi holder til i Sundby ved Nykøbing Falster og kører primært på Lolland-Falster og omegn.
          Har du ønsker uden for området, så skriv — så ser vi på det.
        </p>
      </div>
    </main>
  );
}
