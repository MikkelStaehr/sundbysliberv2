"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Roboto_Slab, Inter } from "next/font/google";
import Image from "next/image";
import { computeKnifeDiscount } from "@/lib/pricing";

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
  { id: "planeiron", name: "Fladt høvl blad", price: 80, category: "Værktøj", image: "/images/planeiron.png" },
  { id: "axe", name: "Økse", price: 120, category: "Værktøj", image: "/images/axe.png" },

  // Maskiner
  { id: "mower", name: "Plæneklipperklinge", price: 100, category: "Maskiner", image: "/images/icon_mowerblade.png" },
];

export default function Bestil() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const total = useMemo(() => cart.reduce((s, it) => s + it.price * it.qty, 0), [cart]);
  const { knifeCount, discountAmount, discountRate } = useMemo(
    () => computeKnifeDiscount(cart),
    [cart]
  );
  const totalAfterDiscount = total - discountAmount;
  // Persistens af kurv på tværs af sider
  const CART_KEY = "sliberi_cart_v1";

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      if (saved) {
        const parsed: CartItem[] = JSON.parse(saved);
        if (Array.isArray(parsed)) setCart(parsed);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart]);

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

  // Juster mængder i kurven
  const inc = (id: string) => {
    setCart((prev) => prev.map((c) => (c.id === id ? { ...c, qty: c.qty + 1 } : c)));
  };

  const dec = (id: string) => {
    setCart((prev) => prev
      .map((c) => (c.id === id ? { ...c, qty: c.qty - 1 } : c))
      .filter((c) => c.qty > 0));
  };

  // Fjern én vare helt fra kurven

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    try { localStorage.removeItem(CART_KEY); } catch {}
  };

  const groupedCatalog = CATALOG.reduce((acc, item) => {
    (acc[item.category] = acc[item.category] || []).push(item);
    return acc;
  }, {} as Record<string, Item[]>);

  return (
    <main className={`${inter.className} min-h-screen bg-[#F9F7F3] text-neutral-900 px-8 py-10 md:py-16 w-full max-w-[90rem] mx-auto grid md:grid-cols-[2fr_1fr] gap-12`}>
      <div className="md:col-span-2 mb-2">
        <Link
          href="/"
          className="inline-flex items-center text-xs text-neutral-600 hover:text-neutral-900 hover:underline underline-offset-2"
        >
          ← Til forsiden
        </Link>
      </div>
      <section className="w-full">
        <p className="text-[11px] uppercase tracking-wide text-neutral-500 mb-1">
          Trin 1 · Vælg slibning
        </p>
        <h1 className={`${robotoSlab.className} text-4xl mb-4 text-neutral-800`}>Vælg dine ydelser</h1>
        <p className="text-sm text-neutral-700 mb-6 max-w-2xl">
          Knive og værktøj er som udgangspunkt klar til afhentning{" "}
          <span className="font-semibold">dagen efter</span> du har afleveret. Ved{" "}
          <span className="font-semibold">ekspres slibning</span> er de typisk klar inden for{" "}
          <span className="font-semibold">1–2 timer</span>, efter vi har modtaget dem.
        </p>
        <div className="mb-6 max-w-2xl rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-xs sm:text-sm text-emerald-900">
          <div className="font-semibold mb-1">Rabat på knive</div>
          <p>
            <span className="font-semibold">+3 knive = 10% rabat</span>
            <br />
            <span className="font-semibold">+6 knive = 20% rabat</span>
          </p>
        </div>
        <p className="text-xs text-neutral-600 mb-6 max-w-2xl">
          Søger du en mere fast løsning til restaurant, café, kantine eller anden virksomhed?{" "}
          <Link href="/erhverv" className="underline-offset-2 hover:underline text-neutral-800">
            Læs om erhvervsaftaler hos Sundby Sliberi
          </Link>
          .
        </p>
        <p className="text-xs text-neutral-600 mb-6 max-w-2xl">
          Klik på de knive og det værktøj, du vil have slebet. Prisen er vejledende – den endelige pris
          bekræftes altid efter aftale, og du betaler først, når aftalen er godkendt.
        </p>
        {Object.entries(groupedCatalog).map(([category, items]) => (
          <div key={category} className="mb-6 rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <div className="w-full flex items-center justify-between px-5 py-3">
              <span className={`${robotoSlab.className} text-xl text-neutral-800`}>{category}</span>
            </div>
            <div className="px-5 pb-5">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((it) => (
                  <div
                    key={it.id}
                    className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md transition-all flex flex-col"
                  >
                    <div className="mb-3 mx-auto h-[140px] flex items-center justify-center">
                      <Image
                        src={it.image}
                        alt={it.name}
                        width={200}
                        height={140}
                        className="max-h-full w-auto object-contain"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className={`${robotoSlab.className} font-medium text-lg text-neutral-800 min-h-[3rem]`}>
                        {it.name}
                      </div>
                      <div className="mt-1 text-base font-semibold text-neutral-900">
                        {it.price} kr{" "}
                        <span className="font-normal text-[13px] text-neutral-600">pr. stk.</span>
                      </div>
                      {category === "Knive" && (
                        <div className="mt-1 text-[11px] text-emerald-700">
                          Tæller med til kniv-rabat
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => add(it)}
                      className="mt-4 bg-neutral-800 text-white px-4 py-2 rounded-xl text-sm hover:bg-neutral-700 transition-colors w-full"
                    >
                      + Læg i kurv
                    </button>
                  </div>
                ))}
              </div>
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
                  <div className="flex items-center justify-between gap-2">
                    <span>{c.name}</span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-neutral-300 rounded-md overflow-hidden">
                        <button onClick={() => dec(c.id)} className="px-2 py-0.5 hover:bg-neutral-100" aria-label="Minus">−</button>
                        <span className="px-2 tabular-nums">{c.qty}</span>
                        <button onClick={() => inc(c.id)} className="px-2 py-0.5 hover:bg-neutral-100" aria-label="Plus">+</button>
                      </div>
                      <span className="w-[60px] text-right tabular-nums">{c.price * c.qty} kr</span>
                      <button onClick={() => removeFromCart(c.id)} aria-label="Fjern" className="text-neutral-500 hover:text-neutral-800">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
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
            <div className="flex items-center justify-between mt-2 mb-2">
              <button onClick={clearCart} className="text-sm text-neutral-600 hover:text-neutral-800 hover:underline">Ryd kurv</button>
            </div>
            <div className="border-t pt-3 font-medium mb-2 text-neutral-800 space-y-1">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{total} kr</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-sm text-emerald-700">
                  <span>
                    Rabat på knive ({Math.round(discountRate * 100)}%
                    {knifeCount >= 6 ? ", 6+ knive" : ", 3+ knive"})
                  </span>
                  <span>-{discountAmount} kr</span>
                </div>
              )}
              <div className="flex justify-between text-base">
                <span>I alt</span>
                <span>{totalAfterDiscount} kr</span>
              </div>
            </div>
          </div>
        )}
        {cart.length === 0 ? (
          <button
            disabled
            className="block w-full text-center rounded-2xl bg-neutral-300 text-neutral-600 px-6 py-3 cursor-not-allowed"
            title="Vælg mindst én ydelse først"
          >
            Gå til aflevering
          </button>
        ) : (
          <Link href="/aflevering" className="block text-center rounded-2xl bg-neutral-900 text-white px-6 py-3 hover:bg-neutral-700 transition-colors">
            Gå til aflevering
          </Link>
        )}
      </aside>
    </main>
  );
}


