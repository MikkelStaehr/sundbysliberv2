"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Roboto_Slab, Inter } from "next/font/google";
import Image from "next/image";

const robotoSlab = Roboto_Slab({ subsets: ["latin"], weight: ["400", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

interface Item { id: string; name: string; price: number; category: string; image: string }
interface CartItem extends Item { qty: number }

const CATALOG: Item[] = [
  // Knive
  { id: "herbknife", name: "Urtekniv (under 10 cm)", price: 50, category: "Knive", image: "/images/herbknife.png" },
  { id: "midknife", name: "Universal Kniv (11–17 cm)", price: 50, category: "Knive", image: "/images/utilityknife.png" },
  { id: "chefsknife", name: "Kokke Kniv (over 18 cm)", price: 50, category: "Knive", image: "/images/chefsknife.png" },
  { id: "bread", name: "Brødkniv (takket)", price: 80, category: "Knive", image: "/images/breadknife.png" },
  { id: "santoku", name: "Santoku Kniv", price: 75, category: "Knive", image: "/images/santokuknife.png" },
  { id: "nakiri", name: "Nakiri Kniv", price: 75, category: "Knive", image: "/images/nakiriknife.png" },

  // Værktøj
  { id: "scissors", name: "Saks", price: 90, category: "Værktøj", image: "/images/scissors.png" },
  { id: "chisel", name: "Mejsel/Stemmejern", price: 50, category: "Værktøj", image: "/images/wood_chisel.png" },
  { id: "woodchisel", name: "Træmejsel", price: 50, category: "Værktøj", image: "/images/woodturning_tool.png" },
  { id: "axe", name: "Økse", price: 120, category: "Værktøj", image: "/images/axe.png" },

  // Maskiner
  { id: "mower", name: "Plæneklipperklinge", price: 100, category: "Maskiner", image: "/images/icon_mowerblade.png" },
];

export default function Bestil() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const total = useMemo(() => cart.reduce((s, it) => s + it.price * it.qty, 0), [cart]);

  const add = (item: Item) => {
    setCart((prev) => {
      const idx = prev.findIndex((p) => p.id === item.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const dec = (id: string) => {
    setCart((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      if (idx === -1) return prev;
      const copy = [...prev];
      const nextQty = copy[idx].qty - 1;
      if (nextQty <= 0) return copy.filter((c) => c.id !== id);
      copy[idx] = { ...copy[idx], qty: nextQty };
      return copy;
    });
  };

  const groupedCatalog = CATALOG.reduce((acc, item) => {
    (acc[item.category] = acc[item.category] || []).push(item);
    return acc;
  }, {} as Record<string, Item[]>);

  return (
    <main className={`${inter.className} min-h-screen bg-[#F9F7F3] text-neutral-900 px-8 py-12 w-full max-w-[90rem] mx-auto grid md:grid-cols-[2fr_1fr] gap-12`}>
      <section className="w-full">
        <h1 className={`${robotoSlab.className} text-4xl mb-10 text-neutral-800`}>Vælg dine ydelser</h1>
        {Object.entries(groupedCatalog).map(([category, items]) => (
          <div key={category} className="mb-12">
            <h2 className="font-semibold text-2xl mb-5 border-b-2 border-neutral-200 pb-2 text-neutral-700">{category}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((it) => (
                <div key={it.id} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md transition-all">
                  <Image src={it.image} alt={it.name} width={200} height={140} className="mb-3 mx-auto" />
                  <div className={`${robotoSlab.className} font-medium text-lg text-neutral-800`}>{it.name}</div>
                  <div className="text-sm text-neutral-600">{it.price} kr</div>
                  <div className="mt-4 flex gap-2">
                    <button onClick={() => add(it)} className="bg-neutral-800 text-white px-4 py-2 rounded-xl text-sm hover:bg-neutral-700 transition-colors">+ Læg i kurv</button>
                    <button onClick={() => dec(it.id)} className="border border-neutral-300 px-4 py-2 rounded-xl text-sm hover:bg-neutral-100 transition-colors">− Fjern</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <aside className="sticky top-10 self-start h-fit rounded-2xl border border-neutral-200 p-6 bg-white shadow-sm w-full">
        <h2 className={`${robotoSlab.className} text-2xl mb-4 text-neutral-800 flex items-center gap-3`}>
          <Image src="/images/icon_cart.png" alt="Kurv" width={32} height={32} />
          Din kurv
        </h2>
        {cart.length === 0 ? (
          <p className="text-neutral-600 text-sm mb-8">Ingen varer endnu.</p>
        ) : (
          <div>
            <ul className="space-y-2 mb-4">
              {cart.map((c) => (
                <li key={c.id} className="text-sm text-neutral-800">
                  <div className="flex justify-between">
                    <span>{c.name} × {c.qty}</span>
                    <span>{c.price * c.qty} kr</span>
                  </div>
                  {c.id === "bread" && (
                    <div className="mt-1 flex items-start gap-2 text-xs text-neutral-600">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden
                        className="mt-[1px] text-neutral-500 shrink-0"
                      >
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" />
                        <circle cx="12" cy="16" r="1.5" fill="currentColor" />
                      </svg>
                      <span>
                        Tænder rettes op, bladet bliver <span className="underline">ikke</span> slebet.
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex justify-between border-t pt-3 font-medium mb-4 text-neutral-800">
              <span>I alt</span>
              <span>{total} kr</span>
            </div>
          </div>
        )}
        <Link href="/aflevering" className="block text-center rounded-2xl bg-neutral-900 text-white px-6 py-3 hover:bg-neutral-700 transition-colors">
          Gå til aflevering
        </Link>
      </aside>
    </main>
  );
}


