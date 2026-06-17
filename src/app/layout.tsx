import type { Metadata } from "next";
import { Inter, Archivo } from "next/font/google";
import "./globals.css";
import { Analytics } from "../components/Analytics";
import { CookieBanner } from "../components/CookieBanner";
import { Suspense } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE } from "../lib/site";

// Archivo — display (store overskrifter, wordmark). Fed grotesk.
const archivo = Archivo({
  weight: ["700", "800"],
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

// Inter — al brødtekst, nav, labels, priser
const inter = Inter({
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sundby Sliberi – Slibning af knive og værktøj i Sundby, Nykøbing Falster",
  description:
    "Sundby Sliberi tilbyder professionel slibning af knive, værktøj og maskinklinger til både private og professionelle i Sundby, Nykøbing Falster. Aflever lokalt – nem online bestilling.",
  metadataBase: new URL("https://sundby-sliberi.dk"),
  icons: {
    icon: "/images/hero_rooster_icon.png",
  },
  openGraph: {
    title: "Sundby Sliberi – Slibning af knive og værktøj i Sundby, Nykøbing Falster",
    description:
      "Sundby Sliberi tilbyder professionel slibning af knive, værktøj og maskinklinger til både private og professionelle i Sundby, Nykøbing Falster.",
    url: "https://sundby-sliberi.dk",
    siteName: "Sundby Sliberi",
    locale: "da_DK",
    type: "website",
    images: [
      {
        url: "/images/hero_rooster_icon.png",
        width: 320,
        height: 320,
        alt: "Sundby Sliberi",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    image: `${SITE.url}/images/hero_rooster_icon.png`,
    "@id": `${SITE.url}/`,
    url: `${SITE.url}/`,
    telephone: "+4531386119",
    priceRange: "$$",
    vatID: `DK${SITE.cvr}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Hamborgskovvej 11",
      addressLocality: "Sundby",
      postalCode: "4800",
      addressRegion: "Region Sjælland",
      addressCountry: "DK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 54.764,
      longitude: 11.866,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Nykøbing Falster og omegn",
    },
  };

  return (
    <html lang="da">
      <body
        className={`${archivo.variable} ${inter.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col bg-bg">
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <SpeedInsights />
        <CookieBanner />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </body>
    </html>
  );
}
