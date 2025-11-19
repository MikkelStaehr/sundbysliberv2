import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "../components/Analytics";
import { CookieBanner } from "../components/CookieBanner";

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
          <header className="border-b border-neutral-200 bg-white/95">
            <div className="w-full max-w-[90rem] mx-auto px-8 py-3 flex items-center justify-between">
              <Link
                href="/"
                className="text-sm font-semibold text-neutral-900 tracking-tight"
              >
                Sundby Sliberi
              </Link>
              <nav className="flex items-center gap-4 text-xs text-neutral-700">
                <Link href="/" className="hover:text-neutral-900 transition-colors">
                  Forside
                </Link>
                <Link href="/bestil" className="hover:text-neutral-900 hover:underline underline-offset-2">
                  <span className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 text-white px-3 py-1.5 text-[11px] hover:bg-neutral-700 transition-colors">
                    Bestil slibning
                  </span>
                </Link>
                <Link href="/erhverv" className="hover:text-neutral-900 transition-colors">
                  Erhverv
                </Link>
                <Link
                  href="/knivslibning-nykoebing-falster"
                  className="hidden sm:inline hover:text-neutral-900 transition-colors"
                >
                  Om os
                </Link>
              </nav>
            </div>
          </header>
          <div className="flex-1">{children}</div>
          <footer className="border-t border-neutral-200 bg-white text-neutral-700 text-sm">
            <div className="w-full max-w-[90rem] mx-auto px-8 py-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="flex flex-col text-neutral-700">
                <span className="font-semibold">Sundby Sliberi</span>
                <span>CVR: 46034759</span>
                <span>Hamborgskovvej 11</span>
                <span>4800, Sundby</span>
                <span>Nykøbing Falster</span>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-1 text-neutral-700">
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
              </div>
            </div>
          </footer>
        </div>
        <Analytics />
        <CookieBanner />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </body>
    </html>
  );
}
