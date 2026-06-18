import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import proKitchen from "@/img/prokitchenerhverv/istockphoto-2150321519-1024x1024.jpg";
import { Hero } from "@/components/Hero";
import { ReviewsSection } from "@/components/ReviewsSection";
import { CallbackForm } from "@/components/CallbackForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sundby Sliberi – Professionel slibning af knive & værktøj i Nykøbing Falster",
  description:
    "Bestil professionel slibning af knive og værktøj hos Sundby Sliberi. Vi hjælper både private og professionelle i Sundby, Nykøbing Falster.",
};

const STEPS = [
  { n: "01", title: "Ring eller skriv", body: "Fortæl hvad du har, og hvornår du skal bruge det." },
  { n: "02", title: "Vi aftaler nærmere", body: "Pris og leveringsdag aftales, før du betaler noget." },
  { n: "03", title: "Skarpt til tiden", body: "Du får dine ting tilbage til den dag, vi har aftalt." },
] as const;

export default function Home() {
  return (
    <main className="pb-[16px]">
      <Hero />

      {/* Ring mig op — mange kunder vil hellere ringes op end at udfylde en bestilling */}
      <section className="mx-auto w-full max-w-none px-[16px] pt-[16px] md:px-[24px] lg:px-[44px] xl:px-[72px]">
        <div className="grid items-stretch gap-[16px] rounded-[24px] bg-panel p-[24px] md:p-[40px] lg:grid-cols-[1.1fr_0.9fr] lg:gap-[40px]">
          {/* Venstre: invitation + ring-selv */}
          <div className="flex flex-col justify-center">
            <p className="kicker text-accent">Skal vi ringe dig op?</p>
            <h2 className="mt-[12px] max-w-[18ch] font-display text-[32px] uppercase text-ink md:text-[44px]">
              Vi ringer dig op — gratis og uforpligtende
            </h2>
            <p className="mt-[16px] max-w-[48ch] text-[16px] leading-relaxed text-muted">
              Skriv dit nummer, så ringer vi dig op og finder ud af det hele over
              telefonen — hvad du har, hvad det koster, og hvornår du kan få det
              tilbage.
            </p>
            <p className="mt-[24px] text-[15px] text-muted">
              Vil du hellere ringe selv?{" "}
              <a
                href={SITE.phoneHref}
                className="font-medium text-accent underline-offset-2 hover:underline"
              >
                {SITE.phoneDisplay}
              </a>{" "}
              · {SITE.openingHours}
            </p>
          </div>

          {/* Højre: formularkort */}
          <div className="rounded-[16px] bg-bg p-[24px] md:p-[32px]">
            <CallbackForm />
          </div>
        </div>
      </section>

      {/* Sådan foregår det — asymmetrisk bento: ét stort panel (trin 1) +
          to mindre tiles (trin 2-3), med farvevariation for fremdrift. */}
      <section className="mx-auto w-full max-w-none px-[16px] py-[64px] md:px-[24px] lg:px-[44px] xl:px-[72px] md:py-[96px]">
        <p className="kicker text-accent">Sådan foregår det</p>
        <h2 className="mt-[12px] max-w-[16ch] font-display text-[36px] uppercase text-ink md:text-[56px]">
          Tre skridt fra sløv til skarp
        </h2>

        {/* Lige store kort. På hover løftes og skaleres det enkelte kort op
            (over naboerne via z-10) og skifter til oliven — som at trække et
            kort ud af stakken. Al tekst er altid synlig; effekten er kun et lag. */}
        <ol className="mt-[40px] grid gap-[16px] md:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n} className="relative">
              <div className="group relative h-full overflow-hidden rounded-[24px] bg-panel p-[32px] transition-all duration-300 ease-out hover:z-10 hover:-translate-y-[6px] hover:scale-[1.03] hover:bg-accent hover:shadow-[0_24px_48px_-20px_rgba(51,53,47,0.4)] md:p-[40px]">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-[8px] -top-[20px] font-display text-[140px] leading-none text-ink/[0.14] transition-colors duration-300 group-hover:text-white/[0.16]"
                >
                  {s.n}
                </span>
                <span className="relative product-name text-[12px] text-accent transition-colors duration-300 group-hover:text-apricot">
                  Trin {s.n}
                </span>
                <h3 className="relative mt-[14px] font-display text-[26px] uppercase text-ink transition-colors duration-300 group-hover:text-white">
                  {s.title}
                </h3>
                <p className="relative mt-[10px] text-[15px] leading-relaxed text-muted transition-colors duration-300 group-hover:text-white/85">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <ReviewsSection />

      {/* Erhverv-teaser — mørkt bento-panel for kontrast */}
      <section className="mx-auto w-full max-w-none px-[16px] py-[16px] md:px-[24px] lg:px-[44px] xl:px-[72px]">
        <div className="relative overflow-hidden rounded-[24px] bg-ink px-[28px] py-[48px] md:px-[56px] md:py-[72px]">
          {/* Foto til højre — fader ud mod teksten via gradient. Kun fra md+. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] md:block">
            <Image
              src={proKitchen}
              alt=""
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 62vw, 45vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/5" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/30" />
          </div>

          <div className="relative z-10">
            <h2 className="max-w-[22ch] font-display text-[32px] uppercase text-white md:text-[48px]">
              Dine kokke skal ikke bruge tid på sløve knive
            </h2>
            <p className="mt-[20px] max-w-[56ch] text-[16px] leading-relaxed text-white/70">
              Restaurant, café eller kantine? Vi laver faste aftaler om slibning, så køkkenet altid har
              skarpe knive — uden at du skal holde styr på det.
            </p>
            <Link
              href="/erhverv/#kontakt"
              className="mt-[32px] inline-flex rounded-full bg-accent px-[24px] py-[13px] text-[15px] font-medium text-white transition-colors hover:bg-accent-dark"
            >
              Lad os tage en snak →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
