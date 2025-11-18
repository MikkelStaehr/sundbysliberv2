import Link from "next/link";
import { Roboto_Slab, Inter } from "next/font/google";

const robotoSlab = Roboto_Slab({ subsets: ["latin"], weight: ["400", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function NotFound() {
  return (
    <main
      className={`${inter.className} min-h-screen bg-[#F9F7F3] text-neutral-900 px-8 py-12 w-full max-w-[90rem] mx-auto flex items-center justify-center`}
    >
      <section className="text-center max-w-md">
        <h1 className={`${robotoSlab.className} text-3xl mb-3`}>Siden blev ikke fundet</h1>
        <p className="text-sm text-neutral-700 mb-6">
          Den side, du leder efter, findes ikke. Måske er den flyttet, eller også er der sket en
          tastefejl i adressen.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 text-white px-6 py-3 text-sm hover:bg-neutral-700 transition-colors"
        >
          Gå til forsiden
        </Link>
      </section>
    </main>
  );
}


