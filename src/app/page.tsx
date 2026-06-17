import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { PhoneCTA } from "@/components/PhoneCTA";
import { ValueBar } from "@/components/ValueBar";
import { ServiceSteps } from "@/components/ServiceSteps";
import { PriceCard, type PriceLine } from "@/components/PriceCard";
import { ReviewsSection } from "@/components/ReviewsSection";
import { CraftQuote } from "@/components/CraftQuote";

export const metadata: Metadata = {
  title: "Sundby Sliberi – Professionel slibning af knive & værktøj i Nykøbing Falster",
  description:
    "Bestil professionel slibning af knive og værktøj hos Sundby Sliberi. Vi hjælper både private og professionelle i Sundby, Nykøbing Falster – aflever selv eller få afhentet.",
};

/*
  PROVISORISKE PRISER — briefets forslag. Opdateres med de endelige priser fra repoet/dig.
  Fri tekst, ingen prislogik.
*/
const PRICE_KITCHEN: PriceLine[] = [
  { label: "Køkkenkniv", price: "50 kr" },
  { label: "Brødkniv (tandskær)", price: "75 kr" },
  { label: "Jagtkniv", price: "75 kr" },
  { label: "Restaurering", price: "efter tilstand" },
];

const PRICE_TOOLS: PriceLine[] = [
  { label: "Mejsel / stemmejern", price: "60 kr" },
  { label: "Økse", price: "125 kr" },
  { label: "Hækkesaks", price: "120 kr" },
  { label: "Spade / skovl", price: "95 kr" },
];

export default function Home() {
  return (
    <main>
      {/* ── Hero (mørk, klar til baggrundsvideo) ───────────────────────────── */}
      <section className="relative overflow-hidden bg-ink">
        {/*
          BAGGRUNDSVIDEO (senere): læg et <video> her med samme position som overlay.
          Eksempel:
            <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline poster="...">
              <source src="/video/hero.mp4" type="video/mp4" />
            </video>
          Det mørke overlay herunder sikrer læsbar tekst oven på videoen.
        */}
        <div className="absolute inset-0 bg-ink/70" aria-hidden="true" />

        <div className="relative mx-auto flex w-full max-w-[1144px] flex-col items-start px-[21px] py-[76px] md:px-[34px] md:py-[144px]">
          <Image
            src={SITE.logo}
            alt="Sundby Sliberi"
            width={72}
            height={72}
            priority
            fetchPriority="high"
            className="h-[56px] w-[56px] md:h-[72px] md:w-[72px]"
          />
          <p className="kicker mt-[34px] text-gold">Knivslibning i Sundby, Nykøbing F.</p>
          <h1 className="mt-[21px] max-w-[16ch] font-display text-[34px] leading-[1.05] text-cream md:text-[89px]">
            Skarpe knive, når du skal bruge dem
          </h1>
          <p className="mt-[21px] max-w-[52ch] text-[16px] leading-relaxed text-cream-soft md:text-[21px]">
            Professionel slibning af knive og værktøj for private hjem og professionelle køkkener på
            Lolland-Falster. Aflever selv eller få afhentet.
          </p>

          <div className="mt-[34px] flex flex-col items-start gap-[13px] sm:flex-row sm:items-center sm:gap-[21px]">
            <PhoneCTA variant="hero" />
            <Link
              href="/bestil"
              className="inline-flex items-center border border-cream-soft/40 px-[21px] py-[16px] font-mono text-[13px] uppercase tracking-[0.12em] text-cream transition-colors hover:border-cream hover:bg-white/5"
            >
              Send en forespørgsel
            </Link>
          </div>
        </div>
      </section>

      <ValueBar />
      <ServiceSteps />

      {/* ── Priser ─────────────────────────────────────────────────────────── */}
      <section id="priser" className="scroll-mt-[89px] bg-paper-alt px-[21px] py-[55px] md:px-[34px] md:py-[89px]">
        <div className="mx-auto w-full max-w-[1144px]">
          <p className="kicker text-rust">Priser</p>
          <h2 className="mt-[13px] font-display text-[34px] leading-tight text-ink md:text-[55px]">
            Hvad koster det
          </h2>

          <div className="mt-[34px] grid gap-[21px] md:grid-cols-2">
            <PriceCard title="Køkken &amp; jagt" lines={PRICE_KITCHEN} />
            <PriceCard title="Værktøj &amp; have" lines={PRICE_TOOLS} />
          </div>

          <p className="mt-[21px] font-mono text-[13px] text-text-muted">Alle priser inkl. moms.</p>
        </div>
      </section>

      <ReviewsSection />
      <CraftQuote />

      {/* ── Erhverv-teaser ─────────────────────────────────────────────────── */}
      <section className="bg-paper px-[21px] py-[55px] md:px-[34px] md:py-[89px]">
        <div className="mx-auto w-full max-w-[1144px]">
          <h2 className="max-w-[20ch] font-display text-[34px] leading-tight text-ink md:text-[55px]">
            Dine kokke skal ikke bruge tid på sløve knive
          </h2>
          <p className="mt-[21px] max-w-[56ch] text-[16px] leading-relaxed text-text-muted md:text-[21px]">
            Restaurant, café eller kantine? Vi laver faste aftaler om slibning, så køkkenet altid har
            skarpe knive — uden at du skal holde styr på det.
          </p>
          <Link
            href="/erhverv"
            className="mt-[34px] inline-flex items-center gap-[8px] font-mono text-[13px] uppercase tracking-[0.12em] text-rust transition-colors hover:text-rust-light"
          >
            Få et tilbud →
          </Link>
        </div>
      </section>
    </main>
  );
}
