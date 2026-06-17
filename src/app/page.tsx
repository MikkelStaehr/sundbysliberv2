import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ReviewsSection } from "@/components/ReviewsSection";

export const metadata: Metadata = {
  title: "Sundby Sliberi – Professionel slibning af knive & værktøj i Nykøbing Falster",
  description:
    "Bestil professionel slibning af knive og værktøj hos Sundby Sliberi. Vi hjælper både private og professionelle i Sundby, Nykøbing Falster.",
};

const STEPS = [
  { n: "01", title: "Ring eller skriv", body: "Fortæl hvad du har, og hvornår du skal bruge det." },
  { n: "02", title: "Vi aftaler nærmere", body: "Pris og leveringsdag aftales, før du betaler noget." },
  { n: "03", title: "Skarpt til tiden", body: "Du får dine ting tilbage til den dag, vi har aftalt." },
];

export default function Home() {
  return (
    <main className="pb-[16px]">
      <Hero />

      {/* Sådan foregår det */}
      <section className="mx-auto w-full max-w-none px-[16px] py-[64px] md:px-[24px] lg:px-[44px] xl:px-[72px] md:py-[96px]">
        <p className="kicker text-accent">Sådan foregår det</p>
        <h2 className="mt-[12px] max-w-[16ch] font-display text-[36px] uppercase text-ink md:text-[56px]">
          Tre skridt fra sløv til skarp
        </h2>
        <ol className="mt-[40px] grid gap-[16px] md:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n} className="rounded-[16px] bg-panel p-[32px]">
              <span className="font-display text-[44px] text-accent">{s.n}</span>
              <h3 className="mt-[16px] text-[19px] font-semibold text-ink">{s.title}</h3>
              <p className="mt-[8px] text-[15px] leading-relaxed text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <ReviewsSection />

      {/* Erhverv-teaser — mørkt bento-panel for kontrast */}
      <section className="mx-auto w-full max-w-none px-[16px] py-[16px] md:px-[24px] lg:px-[44px] xl:px-[72px]">
        <div className="rounded-[24px] bg-ink px-[28px] py-[48px] md:px-[56px] md:py-[72px]">
          <h2 className="max-w-[22ch] font-display text-[32px] uppercase text-white md:text-[48px]">
            Dine kokke skal ikke bruge tid på sløve knive
          </h2>
          <p className="mt-[20px] max-w-[56ch] text-[16px] leading-relaxed text-white/70">
            Restaurant, café eller kantine? Vi laver faste aftaler om slibning, så køkkenet altid har
            skarpe knive — uden at du skal holde styr på det.
          </p>
          <Link
            href="/erhverv"
            className="mt-[32px] inline-flex rounded-full bg-accent px-[24px] py-[13px] text-[15px] font-medium text-white transition-colors hover:bg-accent-dark"
          >
            Få et tilbud →
          </Link>
        </div>
      </section>
    </main>
  );
}
