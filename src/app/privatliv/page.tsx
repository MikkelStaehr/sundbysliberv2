import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privatliv & cookies – Sundby Sliberi",
  description:
    "Læs hvordan Sundby Sliberi håndterer personoplysninger, cookies og statistik på sundby-sliberi.dk.",
  openGraph: {
    title: "Privatliv & cookies – Sundby Sliberi",
    description:
      "Information om behandling af personoplysninger, brug af cookies og statistik hos Sundby Sliberi.",
    url: "https://sundby-sliberi.dk/privatliv",
    siteName: "Sundby Sliberi",
    locale: "da_DK",
    type: "article",
  },
};

const linkClass = "text-accent underline-offset-2 hover:underline";

export default function Privatliv() {
  return (
    <main className="mx-auto w-full max-w-none px-[20px] py-[48px] md:px-[32px] lg:px-[48px] xl:px-[72px] md:py-[64px]">
      <div className="mx-auto w-full max-w-[760px]">
        <p className="kicker text-accent">Privatliv</p>
        <h1 className="mt-[14px] font-display text-[36px] uppercase leading-[1.05] text-ink md:text-[52px]">
          Privatliv &amp; cookies
        </h1>
        <p className="mt-[16px] text-[16px] leading-relaxed text-muted">
          Her kan du læse, hvordan Sundby Sliberi behandler dine oplysninger, når du bruger
          hjemmesiden, bestiller slibning eller kontakter os.
        </p>

        <div className="mt-[28px] flex flex-col gap-[28px] rounded-[20px] border border-line bg-surface p-[24px] text-[15px] leading-relaxed text-muted md:p-[36px]">
          <section>
            <h2 className="text-[19px] font-semibold text-ink">Dataansvarlig</h2>
            <p className="mt-[10px]">
              Sundby Sliberi<br />
              CVR: {SITE.cvr}<br />
              Hamborgskovvej 11<br />
              4800 Sundby, Nykøbing Falster<br />
              E-mail: <a href={`mailto:${SITE.email}`} className={linkClass}>{SITE.email}</a><br />
              Telefon: <a href={SITE.phoneHref} className={linkClass}>{SITE.phoneDisplay}</a>
            </p>
          </section>

          <section>
            <h2 className="text-[19px] font-semibold text-ink">Hvilke oplysninger vi behandler</h2>
            <p className="mt-[10px]">
              Når du bestiller slibning eller kontakter os via formularerne på siden, behandler vi de
              oplysninger, du selv indtaster, f.eks. navn, kontaktoplysninger, adresse og besked.
            </p>
            <p className="mt-[10px]">
              Oplysningerne bruges til at kunne kontakte dig, aftale aflevering og gennemføre den
              aftale, du indgår med os. Vi gemmer primært oplysningerne i vores e-mailsystem og
              internt til opfølgning på din ordre eller henvendelse.
            </p>
          </section>

          <section>
            <h2 className="text-[19px] font-semibold text-ink">Cookies og lokal lagring</h2>
            <p className="mt-[10px]">
              På sundby-sliberi.dk bruges teknologier, der minder om cookies – blandt andet lokal
              lagring i din browser – til at få siden til at fungere og gøre oplevelsen bedre.
            </p>
            <ul className="mt-[10px] list-disc space-y-[6px] pl-[20px]">
              <li>
                <span className="font-medium text-ink">Nødvendige</span>: bruges bl.a. til at huske din
                kurv og dine kontaktoplysninger på afleverings-siden, så du ikke skal indtaste alt igen
                hver gang.
              </li>
              <li>
                <span className="font-medium text-ink">Statistik (valgfrit)</span>: hvis du accepterer
                cookies til statistik, bruger vi Google Analytics til anonymiseret besøgsstatistik, så
                vi kan forbedre siden.
              </li>
            </ul>
            <p className="mt-[10px]">
              Du kan til enhver tid ændre dit samtykke til statistikcookies ved at rydde cookies og
              lokal lagring i din browser eller justere dine browserindstillinger.
            </p>
          </section>

          <section>
            <h2 className="text-[19px] font-semibold text-ink">Google Analytics</h2>
            <p className="mt-[10px]">
              Vi bruger kun Google Analytics, hvis du har givet samtykke til statistikcookies i
              cookiebanneret. Data bruges udelukkende i anonymiseret form til at se, hvordan siden
              bliver brugt (f.eks. antal besøg, hvilke sider der besøges og teknisk information om
              enheder og browsere).
            </p>
            <p className="mt-[10px]">
              Vi bruger ikke Google Analytics til at vise personaliserede annoncer, og vi forsøger kun
              at se overordnede mønstre for at forbedre indhold og brugeroplevelse.
            </p>
          </section>

          <section>
            <h2 className="text-[19px] font-semibold text-ink">Dine rettigheder</h2>
            <p className="mt-[10px]">
              Du kan til enhver tid kontakte os, hvis du vil høre, hvilke oplysninger vi har om dig,
              eller hvis du ønsker dem rettet eller slettet – i det omfang vi ikke er forpligtet til at
              gemme dem længere.
            </p>
            <p className="mt-[10px]">
              Du kan også gøre indsigelse mod vores behandling af dine oplysninger eller trække et
              samtykke tilbage, hvis behandlingen bygger på samtykke.
            </p>
          </section>

          <section>
            <h2 className="text-[19px] font-semibold text-ink">Spørgsmål</h2>
            <p className="mt-[10px]">
              Har du spørgsmål til, hvordan vi håndterer personoplysninger eller cookies, er du altid
              velkommen til at kontakte os på{" "}
              <a href={`mailto:${SITE.email}`} className={linkClass}>{SITE.email}</a> eller telefon{" "}
              <a href={SITE.phoneHref} className={linkClass}>{SITE.phoneDisplay}</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
