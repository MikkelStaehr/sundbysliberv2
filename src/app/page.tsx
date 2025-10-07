import Link from "next/link";
import Image from "next/image";
import { Roboto_Slab, Inter } from "next/font/google";

const robotoSlab = Roboto_Slab({ subsets: ["latin"], weight: ["400", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function Home() {
  return (
    <main className={`${inter.className} min-h-screen bg-[#F9F7F3] px-8 py-12 w-full max-w-[90rem] mx-auto flex flex-col items-center justify-center text-center`}>
      <Image
        src="/images/hero_rooster_icon.png"
        alt="Sundby Sliberi hero ikon"
        width={320}
        height={320}
        priority
        className="mb-8 drop-shadow-sm"
      />
      <h1 className={`${robotoSlab.className} text-4xl md:text-5xl mb-4 text-neutral-800`}>Sundby Sliberi</h1>
      <p className="max-w-xl text-neutral-700 mb-8">
        Professionel slibning af knive og værktøj. Aflever selv, eller få afhentet – lokalt i Sundby.
      </p>
      <Link href="/bestil" className="rounded-2xl bg-neutral-900 text-white px-6 py-3 hover:bg-neutral-700 transition-colors">
        Bestil slibning
      </Link>
    </main>
  );
}
