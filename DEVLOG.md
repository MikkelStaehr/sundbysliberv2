# Devlog

## 2026-06-24 — Forklarende tekst til tidsrum-feltet

- [OrderForm](src/components/OrderForm.tsx): tilføjet hjælpetekst under Tidsrum-select:
  "Personligt: du afleverer i hånden mellem kl. 16 og 22. Dropoff: du lægger dem i kassen
  mellem kl. 8 og 16."

## 2026-06-24 — Tidsrum-felt ved siden af afleveringsdato

- [OrderForm](src/components/OrderForm.tsx): nyt "Tidsrum"-select ved siden af datofeltet
  (2-kolonne grid). To vinduer: **Personlig aflevering kl. 16-22** og **Dropoff-kasse kl. 08-16**.
- Valget sendes med i bestillingen ([order-action.ts](src/app/aflevering/order-action.ts)):
  ny "Tidsrum"-linje i notifikationsmailen. `onChange` udvidet til `HTMLSelectElement`.

## 2026-06-24 — Datovælger åbner ved klik i hele feltet

- [OrderForm](src/components/OrderForm.tsx): "Hvornår vil du aflevere dem?" (`type="date"`)
  åbner nu kalenderen ved klik/fokus hvor som helst i feltet via `showPicker()`, ikke kun
  når man rammer kalender-ikonet.

## 2026-06-24 — Låst typeskala + Fraunces som display-font (#1)

Verificeret med fuld `next build` (skala-tokens + Fraunces bekræftet i bygget CSS).

### Display-font
- Skiftet fra Merriweather (bog-serif) til **Fraunces** — en display-serif født til
  store grader. Variabel omdøbt `--font-archivo` → `--font-fraunces`, serif-fallback
  rettet (var "Arial Narrow"). [layout.tsx](src/app/layout.tsx), [globals.css](src/app/globals.css).

### Låst typeskala (#1)
- Defineret **9 skala-tokens** i [globals.css](src/app/globals.css):
  text-xs 13 / sm 15 / base 16 / lg 19 / xl 24 / 2xl 30 / 3xl 38 / 4xl 52 / 5xl 64.
- Migreret **alle ~27 arbitrære `text-[NNpx]`** til skala-utilities (kun det dekorative
  140px-tal beholdt). 9px-tekst er væk (min. er nu 13px).
- **Ensartet hierarki:** alle side-H1 → `text-3xl md:text-5xl` (38/64); alle sektions-H2
  → `text-2xl md:text-4xl` (30/52). Footer-sloganet bragt ned under hero (var sitets
  største typografi).
- **iOS-zoom fjernet:** OrderForm-inputs hævet 15→16px (matcher nu de øvrige formularer).
- Ryddet redundant breakpoint på header-logoet.

## 2026-06-24 — Designsystem strammet (radier, gutters, font-vægte)

Efter en kritisk design-gennemgang. Fokus på systemiske, lav-risiko-fixes;
typeskala (#1) og valg af display-font tages som separat diskussion bagefter.
Verificeret med fuld `next build` (radius-utilities bekræftet i bygget CSS).

### Radius-system (#2)
- Strammet til **3 tokens**: `rounded-bento` (24px), `rounded-card` (16px),
  `rounded-input` (12px) + `rounded-full` (piller). Defineret i [globals.css](src/app/globals.css).
- Migreret **alle ~6 forskellige hårdkodede radier** (12/14/16/20/24/32px) til tokens
  på tværs af 17 filer. De gamle `--radius-*`-tokens var defineret men ubrugte.
- Hero-panelerne gik fra 32px → 24px, så de nu **matcher** forsidens øvrige bento-sektioner.
- Input-felter ensrettet til `rounded-input` (var 16px i OrderForm, 12px i ErhvervForm).

### Gutters (#3)
- Hero + forsidens tre sektioner gik fra `px-16/24/44` til `px-20/32/48` ([Hero](src/components/Hero.tsx),
  [page](src/app/page.tsx)), så indholdskanten nu **flugter** med header, footer og de øvrige sider.

### Fonte (#4)
- Merriweather trimmet fra 4 vægte (400/700/800/900) til kun **800**, som er den eneste
  `.font-display` bruger. Sparer 3 ubrugte serif-vægte i download ([layout.tsx](src/app/layout.tsx)).

### Dokumentation (#6)
- Rettet den vildledende header-kommentar i [globals.css](src/app/globals.css) (beskrev
  "hvid baggrund / stålblå accent / ingen gradients" — alt forkert) + tilføjet radius-token-guide.

### Udestående (separat diskussion)
- #1 Typeskala: ~27 forskellige px-størrelser, H1 varierer pr. side, footer-slogan (72px)
  større end hero, 9px-tekst, inputs <16px (iOS-zoom).
- Valg af display-font: Merriweather er en bog-serif brugt som versal display.

## 2026-06-24 — Stor oprydning før go-live (ubrugt kode, billeder, deps)

Gennemgang af hele projektet for død/ubrugt kode, spredte billeder og skrald.
Verificeret med `tsc --noEmit`, `eslint` og fuld `next build` (alle grønne).

### Slettet (ubrugt/skrald)
- npm: `nodemailer` + `@types/nodemailer` + `src/types/nodemailer.d.ts` (vi bruger Resend).
- `getService()` / `servicesByCategory()` i [services.ts](src/data/services.ts) (aldrig kaldt).
- ~48 ubrugte Outfit-font-varianter (OTF/WEB/eot/woff) — kun `Outfit-Variable.ttf`
  (+ `License/OFL.txt`) beholdt.
- 13 orphan-billeder: `icon_cart/dropoff/knives/sharpening/sms/tools.png`,
  `paper_texture.jpg`, `chainsaw_chain.png`, og Next-standard `*.svg`.
- Skrald i roden: `dummy`, `dummy2`, `.htaccess` (Apache, ignoreres på Vercel),
  `package-lock-gfd-…json` (677 KB backup).
- Intern font-testside `/app/fonts` (noindex, ikke linket; fonte er for længst valgt).
- Forældreløs `/tak`-side + fjernet fra [sitemap.ts](src/app/sitemap.ts) (kvittering
  vises inline i bestillingsflowet, så siden var død).

### Billeder samlet i src/img
- Alle produkt-thumbnails flyttet fra `public/images/` til `src/img/products/` og
  loades nu via **statiske imports** i [services.ts](src/data/services.ts)
  (Next-optimering på alle billeder, ét sted). `Service.image` er nu `StaticImageData`.
- Kun `hero_rooster_icon.png` bliver i `public/images/` (favicon/OG/JSON-LD kræver
  en stabil offentlig URL).

### Bugfix
- **Case-mismatch på CTA-billede:** importerne brugte `CTAShop.jpg`, filen på disk var
  `CTAshop.jpg`. Virkede på Windows (case-insensitiv) men er skrøbeligt på Linux.
  Omdøbt til entydigt `cta-shop.jpg` og imports rettet ([Hero.tsx](src/components/Hero.tsx),
  [Om-siden](src/app/knivslibning-nykoebing-falster/page.tsx)).

### Småt
- Un-eksporteret interne `cartCount`/`cartTotal` i [cart.ts](src/lib/cart.ts).
- Fjernet ubrugt `REVIEWS`-import i [ReviewsSection.tsx](src/components/ReviewsSection.tsx).

## 2026-06-24 — Fjernet em-dashes i synlig tekst

- `/bestil` intro ([bestil/page.tsx](src/app/bestil/page.tsx)): "kurven — alt" → to sætninger.
- Brødkniv-note ([services.ts](src/data/services.ts)): "rettes op — bladet" → punktum.
- Fejlbesked ved telefon ([order-action.ts](src/app/aflevering/order-action.ts)): em-dash → punktum.
- Tak-side ([tak/page.tsx](src/app/tak/page.tsx)): "Tak — jeg ringer" → "Tak. Jeg ringer".
- Kurv-note ([CartSummary.tsx](src/components/CartSummary.tsx)): "Vejledende — endelig" → punktum.
- Resterende em-dashes ligger kun i kode-kommentarer (usynlige) og er bevidst urørt.

## 2026-06-24 — Telefon i topnav: kun ikon på mobil

### Header ([Header.tsx](src/components/Header.tsx))
- **Mobil:** telefonnummeret var cramped/brækkede i topnav. Viser nu kun telefon-ikonet
  på mobil; tryk åbner opkald (`tel:`-linket). Nummeret vises igen fra `md` og op.
- Tilføjet `aria-label` (tilgængelighed for ikon-only) og `whitespace-nowrap` så nummeret
  aldrig brækker når det vises.

## 2026-06-24 — Mobil hero-rækkefølge + kurv-bug (NaN)

### Hero ([Hero.tsx](src/components/Hero.tsx))
- **Mobil-rækkefølge ændret:** tekstboksen med de skiftende overskrifter ligger nu
  *under* hero-billederne på mobil (rækkefølge: kategori-tiles → stort billede →
  overskriftspanel). Desktop-bento'en er uændret. Løst med `display:contents` på
  venstre kolonne + `order`-utilities, så de tre blokke kan ordnes på mobil uden at
  røre grid-layoutet på `lg`.

### Kurv ([cart.ts](src/lib/cart.ts))
- **Bugfix: kurven "huskede" spøgelses-varer med tomt navn og "NaN"-pris.** Årsag:
  localStorage-nøglen `sliberi_cart_v1` blev genbrugt fra en ældre datamodel med andre
  feltnavne → `pris` blev `undefined` → `NaN`.
- **Fix:** nøglen bumpet til `sliberi_cart_v2` (gamle ugyldige kurve forsvinder), og
  `readCart()` validerer nu hver vare (`isValidItem`) og frasorterer poster der mangler
  gyldigt id/navn/pris/qty. NaN/tomme navne kan ikke længere rendere.

## 2026-06-24 — Footer-kort, proces-tekst og mobil-finpudsning før go-live

### Footer ([Footer.tsx](src/components/Footer.tsx))
- **Google Maps-kort** ved siden af adressen — lille, klikbart, ingen API-nøgle
  (`output=embed`, lazy-loadet). Linker til Maps-profilen i ny fane. Bevidst valgt
  frem for "Locator Plus"-komponenten (kræver betalt API-nøgle + er overkill for ét sted).
- **Mobil:** kortet er nu fuld bredde under adressen (160px højt) i stedet for cramped
  ved siden af; kompakt 150×120 ved siden af adressen fra `sm` og op.
- **CVR** flyttet op i adresseblokken og fjernet fra bundlinjen (stod før to steder).

### Forside ([page.tsx](src/app/page.tsx))
- Proces-trin omskrevet til personlig tone:
  - Trin 02: "Jeg kontakter dig straks efter din bestilling, og vi aftaler nærmere."
  - Trin 03: "Du afhenter dine knive og betaler."

### Anmeldelser ([reviews.ts](src/data/reviews.ts))
- `GOOGLE_REVIEW_URL` sat til den rigtige Google Maps-profil
  (`maps.app.goo.gl/oVe1hXYYYvapZYEHA`) — placeholderen fra 06-17 er nu løst.

### Mobil-fixes
- **Header-logo** ([Header.tsx](src/components/Header.tsx)): `whitespace-nowrap` +
  mindre skrift på mobil (22px → 26px `sm` → 32px desktop), så "Sundby Sliberi" bliver
  én linje i en stram kasse i stedet for at wrappe til to linjer.
- **Trin-indikator** ([StepIndicator.tsx](src/components/StepIndicator.tsx)): viser kun
  cifre + den aktive etiket på mobil (én ren linje); fulde tekster fra `sm` og op.
  Fjernet den grimme ombrydning.

### Deploy
- Vercel kobles om fra det gamle placeholder-repo (`SundbySliberi`) til `sundbysliberv2`.
  Domænet `sundby-sliberi.dk` bliver hængende på projektet → serverer v2 efter første
  deploy. Ingen DNS-ændring.

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

## 2026-06-18 — Indhold/tekst der mangler (kom tilbage til)

> Designet/rammerne står — der mangler "kød på" i form af rigtig tekst. Masser at skrive.

- **Personlig historie om ejeren.** Siderne er pt. upersonlige. Skriv om hvem der står bag,
  hvorfor han sliber, og hans tilgang/håndværk — det skaber tillid. Oplagt på
  [Om-siden](src/app/knivslibning-nykoebing-falster/page.tsx) og evt. en sektion på forsiden.
- **Erhverv ([/erhverv](src/app/erhverv/page.tsx)):** mere uddybende tekst — fordele, proces,
  hvordan en fast aftale fungerer i praksis, evt. kundetyper/eksempler.
- **Generelt:** flere sider/sektioner har tynd/kort tekst og føles tomme. Skal fyldes ud.

## 2026-06-18 — Designsystem rullet ud på resten af sitet

Designretningen er låst: **støvet pastel (oliven + abrikos + grå), bento, runde/
nestende former, rolig liste-æstetik.** Fonte: Archivo (display) + Inter (brød).

### Webshop (`/bestil`)

- Gentænkt et par gange (fliser → store fliser m. cirkler → endelig **vertikale
  liste-rækker**, som er den valgte retning). Hver vare = én række: farvet
  thumbnail + navn + pris + Tilføj/stepper, i hvide kategori-kort (Knive/Værktøj/
  Have) med farvet kategori-prik.
- Altid-synlig kurv: desktop = panel i siden ([CartSummary.tsx](src/components/CartSummary.tsx)),
  mobil = fast [MobileCartBar.tsx](src/components/MobileCartBar.tsx) (antal+total+Videre, foldbar).
- Trin-indikator (1 Vælg ydelser · 2 Dine oplysninger) på både `/bestil` og `/aflevering`.
- Slettet ubrugte `CatalogGrid`, `ProductCard`, `ProductTile`. Aktive:
  [CatalogSections.tsx](src/components/CatalogSections.tsx) + [ProductRow.tsx](src/components/ProductRow.tsx).

### Interim-sider redesignet til nyt system

- `/erhverv`, `/knivslibning-nykoebing-falster` (Om), `/privatliv` ud af gammel
  neutral palette → tokens/bento. ErhvervForm fik designsystem-inputs.
- **Fuld bredde, ikke smal midterkolonne** (Om + erhverv). Erhverv-layout:
  hero (tekst+foto) + nederste række **50/50** = fordele + "ring direkte"-kort
  (venstre) | kontaktformular (højre). 50/50 i begge rækker, så den lodrette søm
  flugter. `/privatliv` beholder bevidst smallere læsekolonne (lang legal-tekst).

### OBS / udestående

- `/priser` mangler stadig at få liste-rækker + fuld bredde som webshoppen.
- OneDrive låser `.next` under `next dev`/`build` (EINVAL/EBUSY). Løsning:
  `Remove-Item -Recurse -Force .next` før build, eller flyt repo ud af OneDrive.
