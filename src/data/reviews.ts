/**
 * Google-anmeldelser — rigtige anmeldelser kopieret fra Google Business-profilen.
 *
 * `stjerner` er 1–5. `dato` vises som den står (fx "marts 2026").
 * `citat` er valgfri: anmeldelser uden tekst (kun en stjerne-bedømmelse) tæller
 * med i gennemsnit/antal, men vises ikke som citat-kort.
 *
 * Datoerne er omregnet fra Googles relative tidsangivelser ("6 months ago" osv.)
 * pr. juni 2026 — ret dem hvis du vil have eksakte måneder.
 */

export const GOOGLE_REVIEW_URL = "https://www.google.com/maps"; // ← INDSÆT din Google Business-profil-URL her

export type Review = {
  navn: string;
  stjerner: number;
  citat?: string;
  dato: string;
};

export const REVIEWS: Review[] = [
  {
    navn: "André S.",
    stjerner: 5,
    citat:
      "Kan kun anbefale Sundby Sliberi for at slibe mine knive. Alle mine knive er blevet perfekt slebet og skærer uden problemer. Selv min brødkniv kan skære igen. Super flot arbejde og god service.",
    dato: "maj 2026",
  },
  {
    navn: "Nikolaj Andersen",
    stjerner: 5,
    citat:
      "Efter 4 år trængte mine Yaxell tsuchimon knive til en kærlig hånd. Faldt over Sundby Sliberi, en lille lokal knivsliber. Stor ros for hans arbejde, de er slebet til perfektion! Kan klart anbefales!",
    dato: "december 2025",
  },
  {
    navn: "Jonas Riis",
    stjerner: 5,
    citat:
      "Meget omhyggelig og grundig behandling af japanske kokkeknive som havde set bedre dage, men som var så gode som nye efter slibning. Mikkel går op i håndværket!",
    dato: "december 2025",
  },
  {
    navn: "Louise Rasmussen",
    stjerner: 5,
    citat: "Sundby Sliberi sørger for at mine knive altid er skarpe!",
    dato: "marts 2026",
  },
  {
    // Kun stjerne-bedømmelse uden tekst — tæller med i gennemsnit/antal,
    // men vises ikke som citat-kort.
    navn: "Julie Andersen",
    stjerner: 5,
    dato: "december 2025",
  },
];

/** Anmeldelser med tekst — bruges til citat-kortene. */
export const REVIEWS_WITH_TEXT = REVIEWS.filter((r) => r.citat);

/** Gennemsnit + antal — bruges til AggregateRating JSON-LD og visning. */
export function reviewStats(reviews: Review[] = REVIEWS) {
  const count = reviews.length;
  const average =
    count === 0 ? 0 : reviews.reduce((sum, r) => sum + r.stjerner, 0) / count;
  return { count, average: Math.round(average * 10) / 10 };
}
