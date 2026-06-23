/**
 * Central kontakt- og virksomhedsinfo.
 * Ét sted at rette telefon, e-mail og adresse — bruges i header, footer,
 * CTA'er og JSON-LD.
 */
export const SITE = {
  name: "Sundby Sliberi",
  url: "https://sundby-sliberi.dk",
  phoneDisplay: "31 38 61 19",
  phoneHref: "tel:+4531386119",
  email: "info@sundby-sliberi.dk",
  cvr: "46034759",
  openingHours: "Hverdage 9 til 17",
  address: {
    street: "Hamborgskovvej 11",
    postalCode: "4800",
    city: "Nykøbing F.",
    locality: "Sundby",
  },
  logo: "/images/hero_rooster_icon.png",
} as const;
