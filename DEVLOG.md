# Devlog

## 2026-06-17 — Forside: ring-op, step-redesign, Google-anmeldelser, font-test

### Tilføjet
- **"Ring mig op"-sektion** under hero-bento'en ([CallbackForm.tsx](src/components/CallbackForm.tsx) +
  [api/ring-op/route.ts](src/app/api/ring-op/route.ts)). Navn + telefon + valgfrit tidspunkt;
  sender mail via samme nodemailer-opsætning og env-variabler (`SMTP_*`, `ORDER_TO_EMAIL`) som
  erhvervs-formularen.
- **Auto-karrusel til anmeldelser** ([ReviewsCarousel.tsx](src/components/ReviewsCarousel.tsx)):
  uendelig, sømløs marquee (ren CSS, keyframe i [globals.css](src/app/globals.css)), pause på hover,
  ~3 kort ad gangen, fade-kanter, og `prefers-reduced-motion`-fallback til manuel scroll.
- **Intern font-testside** på `/fonts/` ([fonts/page.tsx](src/app/fonts/page.tsx)). `noindex`.
  Viser 6 forslag der er gratis til kommerciel brug (Bebas Neue, Anton, Oswald, Fraunces,
  Instrument Serif, Space Grotesk) + de lokale fonte i `src/fonts`.

### Ændret
- **Step-sektionen "Tre skridt fra sløv til skarp"** ([page.tsx](src/app/page.tsx)): tre lige store
  kort med hover-effekt — kortet løftes/skaleres, lægger sig over naboerne og skifter til oliven
  med hvid tekst (som at trække et kort ud af en stak). Tal-vandmærker gjort mørkere så de er
  synlige i hvile.
- **Rigtige Google-anmeldelser** lagt ind i [reviews.ts](src/data/reviews.ts) (André S., Nikolaj
  Andersen, Jonas Riis, Louise Rasmussen + Julie Andersen uden tekst). Anmeldelser uden tekst tæller
  med i gennemsnit/antal men vises ikke som kort. JSON-LD bruger nu de ægte anmeldelser.
- **Logoet/wordmark** prøvet med lokale fonte — aktuelt sat til `ciguatera.otf` via `.font-logo`
  ([Header.tsx](src/components/Header.tsx), [layout.tsx](src/app/layout.tsx)).

### Udestående / OBS
- **Licens på fonte:** `src/fonts/ciguatera.otf` kom uden licensfil, og `qugan/` er en demo
  (kun personligt brug). **Må ikke deployes til produktion** før licens er afklaret. Brug i stedet
  et af de gratis-til-kommerciel-forslag fra `/fonts/` til den rigtige side.
- **`GOOGLE_REVIEW_URL`** i [reviews.ts](src/data/reviews.ts) peger stadig på en placeholder —
  skal udskiftes med det rene Google Business-profil-link.
- **Font-testsiden** (`/fonts/`) er en intern test og bør fjernes igen når en font er valgt.
- Anmeldelsernes datoer er omregnet fra Googles relative tider ("6 months ago" osv.).
