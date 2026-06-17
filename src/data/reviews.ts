/**
 * Google-anmeldelser.
 *
 * Udskift placeholder-anmeldelserne herunder med dine rigtige Google-anmeldelser,
 * og indsæt linket til din Google Business-profil i GOOGLE_REVIEW_URL.
 *
 * `stjerner` er 1–5. `dato` vises som den står (fx "marts 2026").
 */

export const GOOGLE_REVIEW_URL = "https://www.google.com/maps"; // ← INDSÆT din Google Business-profil-URL her

export type Review = {
  navn: string;
  stjerner: number;
  citat: string;
  dato: string;
};

export const REVIEWS: Review[] = [
  {
    navn: "Placeholder Kunde",
    stjerner: 5,
    citat:
      "Mine køkkenknive har aldrig været skarpere. Hurtig, lokal service og en rar snak i telefonen. Klar anbefaling.",
    dato: "marts 2026",
  },
  {
    navn: "Placeholder Kunde",
    stjerner: 5,
    citat:
      "Afleverede en kasse værktøj og fik det tilbage knivskarpt til den dag, vi havde aftalt. Dygtig håndværker.",
    dato: "februar 2026",
  },
  {
    navn: "Placeholder Kunde",
    stjerner: 5,
    citat:
      "Fik mine jagtknive slebet — perfekt resultat og fair pris. Dejligt at have en lokal sliber på Falster.",
    dato: "januar 2026",
  },
];

/** Gennemsnit + antal — bruges til AggregateRating JSON-LD og visning. */
export function reviewStats(reviews: Review[] = REVIEWS) {
  const count = reviews.length;
  const average =
    count === 0 ? 0 : reviews.reduce((sum, r) => sum + r.stjerner, 0) / count;
  return { count, average: Math.round(average * 10) / 10 };
}
