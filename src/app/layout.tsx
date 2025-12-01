import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "../components/Analytics";
import { CookieBanner } from "../components/CookieBanner";
import { Suspense } from "react";
import { HeaderNav } from "../components/HeaderNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sundby Sliberi – Slibning af knive og værktøj i Sundby, Nykøbing Falster",
  description:
    "Sundby Sliberi tilbyder professionel slibning af knive, værktøj og maskinklinger til både private og professionelle i Sundby, Nykøbing Falster. Aflever selv eller få afhentet lokalt – nem online bestilling.",
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
    "name": "Sundby Sliberi",
    "image": "https://sundby-sliberi.dk/images/hero_rooster_icon.png",
    "@id": "https://sundby-sliberi.dk/",
    "url": "https://sundby-sliberi.dk/",
    "telephone": "+45 31386119",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Hamborgskovvej 11",
      "addressLocality": "Sundby",
      "postalCode": "4800",
      "addressRegion": "Region Sjælland",
      "addressCountry": "DK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 54.764,
      "longitude": 11.866
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Nykøbing Falster og omegn"
    }
  };

  return (
    <html lang="da">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col bg-[#F9F7F3]">
          <HeaderNav />
          <div className="flex-1">{children}</div>
          <footer className="border-t border-neutral-200 bg-white text-neutral-700 text-sm">
            <div className="w-full max-w-[90rem] mx-auto px-8 py-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
              <div className="flex flex-col text-neutral-700 md:flex-1">
                <span className="font-semibold">Sundby Sliberi</span>
                <span>CVR: 46034759</span>
                <span>Hamborgskovvej 11</span>
                <span>4800, Sundby</span>
                <span>Nykøbing Falster</span>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-1 text-neutral-700 md:flex-1">
                <span className="uppercase text-xs tracking-wide text-neutral-500">Kontakt</span>
                <a
                  href="mailto:info@sundby-sliberi.dk"
                  className="underline-offset-2 hover:underline"
                >
                  info@sundby-sliberi.dk
                </a>
                <a
                  href="tel:+4531386119"
                  className="underline-offset-2 hover:underline"
                >
                  31 38 61 19
                </a>
                <Link
                  href="/privatliv"
                  className="mt-2 text-xs text-neutral-600 underline-offset-2 hover:underline"
                >
                  Privatliv & cookies
                </Link>
              </div>
              <div className="w-full md:w-auto md:max-w-xs lg:max-w-sm h-40 md:h-44 rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
                <iframe
                  title="Sundby Sliberi på Google Maps"
                  src="https://www.google.com/maps?q=Hamborgskovvej+11,+4800+Nyk%C3%B8bing+Falster&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </footer>
        </div>
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <CookieBanner />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </body>
    </html>
  );
}
