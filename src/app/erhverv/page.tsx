import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { ErhvervForm } from "./ErhvervForm";
import { ImagePanel } from "@/components/ImagePanel";
import { SITE } from "@/lib/site";
import erhvervPhoto from "@/img/prokitchenerhverv/prokitchen2.jpg";

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
    <main className="mx-auto w-full max-w-[1280px] px-[20px] py-[48px] md:px-[32px] md:py-[72px]">
      {/* Intro: info venstre, foto højre (sticky) */}
      <div className="grid gap-[32px] lg:grid-cols-2 lg:gap-[56px]">
        <div>
          <p className="kicker text-accent">Erhverv</p>
          <h1 className="mt-[14px] font-display text-3xl uppercase leading-[1.05] text-ink md:text-5xl">
            Skarpe knive, uden besvær
          </h1>
          <p className="mt-[20px] text-base leading-relaxed text-muted md:text-lg">
            Har du restaurant, café, kantine eller andet professionelt køkken på Lolland-Falster,
            laver jeg en fast aftale om slibning af dine knive, køkkenredskaber og håndværktøj, så
            både køkken og værksted altid har skarpe redskaber.
          </p>

          <ul className="mt-[28px] flex flex-col">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-center gap-[14px] border-t border-line py-[16px] first:border-t-0">
                <span aria-hidden="true" className="inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-accent text-white">
                  <Check className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
                </span>
                <span className="text-base text-ink">{b}</span>
              </li>
            ))}
          </ul>

          <Link
            href="#kontakt"
            className="mt-[28px] inline-flex self-start rounded-full bg-accent px-[24px] py-[13px] text-sm font-medium text-white transition-colors hover:bg-accent-dark"
          >
            Få et tilbud
          </Link>
        </div>

        <div className="lg:sticky lg:top-[96px] lg:self-start">
          <ImagePanel
            src={erhvervPhoto}
            alt="Professionelt køkken på Lolland-Falster"
            priority
            rounded="rounded-bento"
            className="aspect-[4/5]"
          />
        </div>
      </div>

      {/* Kontakt */}
      <section id="kontakt" className="mt-[56px] scroll-mt-[100px] md:mt-[80px]">
        <h2 className="font-display text-2xl uppercase text-ink md:text-3xl">
          Lad os tage en snak
        </h2>
        <p className="mt-[12px] max-w-[60ch] text-base leading-relaxed text-muted">
          Udfyld formularen, så vender jeg retur og foreslår en løsning, der passer til jer. Eller
          ring direkte på{" "}
          <a href={SITE.phoneHref} className="font-medium text-accent underline-offset-2 hover:underline">
            {SITE.phoneDisplay}
          </a>{" "}
          · {SITE.openingHours}.
        </p>

        <div className="mt-[24px] max-w-[820px]">
          <ErhvervForm />
        </div>

        <p className="mt-[24px] max-w-[60ch] text-sm leading-relaxed text-muted">
          Jeg holder til i Sundby ved Nykøbing Falster og kører primært på Lolland-Falster og omegn.
          Har du ønsker uden for området, så skriv, så ser vi på det.
        </p>
      </section>
    </main>
  );
}
