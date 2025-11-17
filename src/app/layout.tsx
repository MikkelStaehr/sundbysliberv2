import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sundby Sliberi – Slibning af knive og værktøj",
  description:
    "Professionel slibning af knive, værktøj og maskinklinger i Sundby, Nykøbing Falster. Aflever selv eller få hentet lokalt – nem online bestilling.",
  icons: {
    icon: "/images/hero_rooster_icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col bg-[#F9F7F3]">
          <div className="flex-1">{children}</div>
          <footer className="border-t border-neutral-200 bg-white text-neutral-700 text-sm">
            <div className="w-full max-w-[90rem] mx-auto px-8 py-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="flex flex-col text-neutral-700">
                <span className="font-semibold">Sundby Sliberi</span>
                <span>CVR: 99999999</span>
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
      </body>
    </html>
  );
}
