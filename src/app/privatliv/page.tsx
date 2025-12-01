import type { Metadata } from "next";
import Link from "next/link";

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

export default function Privatliv() {
  return (
    <main
      className="min-h-screen bg-[#F9F7F3] text-neutral-900 px-8 py-12 w-full max-w-[90rem] mx-auto flex flex-col"
    >
      <div className="w-full max-w-3xl mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 hover:underline underline-offset-2"
        >
          ← Til forsiden
        </Link>
      </div>
      <section className="max-w-3xl mx-auto flex-1 flex flex-col gap-6">
        <header className="mb-2">
          <h1 className="text-3xl md:text-4xl text-neutral-900 mb-3 font-semibold tracking-tight">
            Privatliv & cookies
          </h1>
          <p className="text-sm text-neutral-700 max-w-2xl">
            Her kan du læse, hvordan Sundby Sliberi behandler dine oplysninger, når du bruger
            hjemmesiden, bestiller slibning eller kontakter os.
          </p>
        </header>

        <section className="space-y-3 text-sm text-neutral-800">
          <h2 className="text-xl text-neutral-900 font-semibold tracking-tight">Dataansvarlig</h2>
          <p>
            Sundby Sliberi<br />
            CVR: 46034759<br />
            Hamborgskovvej 11<br />
            4800 Sundby, Nykøbing Falster<br />
            E-mail: <a href="mailto:info@sundby-sliberi.dk" className="underline-offset-2 hover:underline">info@sundby-sliberi.dk</a><br />
            Telefon: <a href="tel:+4531386119" className="underline-offset-2 hover:underline">31 38 61 19</a>
          </p>
        </section>

        <section className="space-y-3 text-sm text-neutral-800">
          <h2 className="text-xl text-neutral-900 font-semibold tracking-tight">Hvilke oplysninger vi behandler</h2>
          <p>
            Når du bestiller slibning eller kontakter os via formularerne på siden, behandler vi de
            oplysninger, du selv indtaster, f.eks. navn, kontaktoplysninger, adresse og besked.
          </p>
          <p>
            Oplysningerne bruges til at kunne kontakte dig, aftale aflevering/afhentning og
            gennemføre den aftale, du indgår med os. Vi gemmer primært oplysningerne i vores
            e-mailsystem og internt til opfølgning på din ordre eller henvendelse.
          </p>
        </section>

        <section className="space-y-3 text-sm text-neutral-800">
          <h2 className="text-xl text-neutral-900 font-semibold tracking-tight">Cookies og lokal lagring</h2>
          <p>
            På sundby-sliberi.dk bruges teknologier, der minder om cookies – blandt andet lokal
            lagring i din browser – til at få siden til at fungere og gøre oplevelsen bedre.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><span className="font-semibold">Nødvendige</span>: bruges bl.a. til at huske din kurv og dine kontaktoplysninger på afleverings-siden, så du ikke skal indtaste alt igen hver gang.</li>
            <li><span className="font-semibold">Statistik (valgfrit)</span>: hvis du accepterer cookies til statistik, bruger vi Google Analytics til anonymiseret besøgsstatistik, så vi kan forbedre siden.</li>
          </ul>
        <p className="text-sm text-neutral-600">
            Du kan til enhver tid ændre dit samtykke til statistikcookies ved at rydde cookies og
            lokal lagring i din browser eller justere dine browserindstillinger.
          </p>
        </section>

        <section className="space-y-3 text-sm text-neutral-800">
          <h2 className="text-xl text-neutral-900 font-semibold tracking-tight">Google Analytics</h2>
          <p>
            Vi bruger kun Google Analytics, hvis du har givet samtykke til statistikcookies i
            cookiebanneret. Data bruges udelukkende i anonymiseret form til at se, hvordan siden
            bliver brugt (f.eks. antal besøg, hvilke sider der besøges og teknisk information om
            enheder og browsere).
          </p>
          <p>
            Vi bruger ikke Google Analytics til at vise personaliserede annoncer, og vi forsøger
            kun at se overordnede mønstre for at forbedre indhold og brugeroplevelse.
          </p>
        </section>

        <section className="space-y-3 text-sm text-neutral-800">
          <h2 className="text-xl text-neutral-900 font-semibold tracking-tight">Dine rettigheder</h2>
          <p>
            Du kan til enhver tid kontakte os, hvis du vil høre, hvilke oplysninger vi har om dig,
            eller hvis du ønsker dem rettet eller slettet – i det omfang vi ikke er forpligtet til
            at gemme dem længere.
          </p>
          <p>
            Du kan også gøre indsigelse mod vores behandling af dine oplysninger eller trække et
            samtykke tilbage, hvis behandlingen bygger på samtykke.
          </p>
        </section>

        <section className="space-y-3 text-sm text-neutral-800 mb-8">
          <h2 className="text-xl text-neutral-900 font-semibold tracking-tight">Spørgsmål</h2>
          <p>
            Har du spørgsmål til, hvordan vi håndterer personoplysninger eller cookies, er du altid
            velkommen til at kontakte os på{" "}
            <a href="mailto:info@sundby-sliberi.dk" className="underline-offset-2 hover:underline">
              info@sundby-sliberi.dk
            </a>{" "}
            eller telefon{" "}
            <a href="tel:+4531386119" className="underline-offset-2 hover:underline">
              31 38 61 19
            </a>
            .
          </p>
        </section>
      </section>
    </main>
  );
}


