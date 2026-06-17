import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { ReviewsSection } from "@/components/ReviewsSection";

export const metadata: Metadata = {
  title: "Sundby Sliberi – Professionel slibning af knive & værktøj i Nykøbing Falster",
  description:
    "Bestil professionel slibning af knive og værktøj hos Sundby Sliberi. Vi hjælper både private og professionelle i Sundby, Nykøbing Falster.",
};

/*
  INTERIM-FORSIDE.
  Indholdet er bevaret og wrappet i det nye bento-system (cream, Bebas/Montserrat,
  clay). Det detaljerede bento-layout (hero, sektioner) gentænkes i en SENERE omgang
  — denne version er bevidst enkel og bygger IKKE en ny hero.
  Sektioner markeret nedenfor bærer endnu et midlertidigt udtryk.
*/

const STEPS = [
  { n: "01", title: "Ring eller skriv", body: "Fortæl hvad du har, og hvornår du skal bruge det." },
  { n: "02", title: "Vi aftaler nærmere", body: "Pris og leveringsdag aftales, før du betaler noget." },
  { n: "03", title: "Skarpt til tiden", body: "Du får dine ting tilbage til den dag, vi har aftalt." },
];

export default function Home() {
  return (
    <main>
      {/* INTERIM hero — enkel wrap, ingen ny hero bygges nu */}
      <section className="border-b border-line bg-bg px-[20px] py-[56px] md:px-[32px] md:py-[88px]">
        <div className="mx-auto w-full max-w-[1200px]">
          <Image src={SITE.logo} alt="Sundby Sliberi" width={64} height={64} priority className="h-[56px] w-[56px]" />
          <p className="kicker mt-[24px] text-clay">Knivslibning i Sundby, Nykøbing F.</p>
          <h1 className="mt-[16px] max-w-[18ch] font-display text-[52px] leading-none text-ink md:text-[88px]">
            Skarpe knive, når du skal bruge dem
          </h1>
          <p className="mt-[20px] max-w-[58ch] text-[16px] leading-relaxed text-muted md:text-[18px]">
            Professionel slibning af knive og værktøj for private hjem og professionelle køkkener på
            Lolland-Falster.
          </p>
          <div className="mt-[28px] flex flex-wrap items-center gap-[12px]">
            <a
              href={SITE.phoneHref}
              className="rounded-full bg-clay px-[24px] py-[13px] text-[15px] font-medium text-white transition-colors hover:bg-[#946449]"
            >
              Ring {SITE.phoneDisplay}
            </a>
            <Link
              href="/bestil"
              className="rounded-full border border-line px-[24px] py-[13px] text-[15px] font-medium text-ink transition-colors hover:border-clay hover:text-clay"
            >
              Se webshop
            </Link>
          </div>
        </div>
      </section>

      {/* Sådan foregår det */}
      <section className="bg-bg px-[20px] py-[48px] md:px-[32px] md:py-[72px]">
        <div className="mx-auto w-full max-w-[1200px]">
          <p className="kicker text-clay">Sådan foregår det</p>
          <h2 className="mt-[10px] font-display text-[36px] text-ink md:text-[52px]">Tre skridt fra sløv til skarp</h2>
          <ol className="mt-[32px] grid gap-[28px] md:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.n} className="rounded-[6px] border border-line bg-surface p-[28px]">
                <span className="font-display text-[40px] text-clay">{s.n}</span>
                <h3 className="mt-[12px] text-[18px] font-medium text-ink">{s.title}</h3>
                <p className="mt-[8px] text-[15px] leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ReviewsSection />

      {/* Erhverv-teaser */}
      <section className="border-t border-line bg-surface-alt px-[20px] py-[48px] md:px-[32px] md:py-[72px]">
        <div className="mx-auto w-full max-w-[1200px]">
          <h2 className="max-w-[22ch] font-display text-[32px] text-ink md:text-[48px]">
            Dine kokke skal ikke bruge tid på sløve knive
          </h2>
          <p className="mt-[16px] max-w-[56ch] text-[16px] leading-relaxed text-muted">
            Restaurant, café eller kantine? Vi laver faste aftaler om slibning, så køkkenet altid har
            skarpe knive.
          </p>
          <Link
            href="/erhverv"
            className="mt-[24px] inline-flex text-[14px] font-medium text-clay transition-colors hover:text-[#946449]"
          >
            Få et tilbud →
          </Link>
        </div>
      </section>
    </main>
  );
}
