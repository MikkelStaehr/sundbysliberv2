"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Roboto_Slab, Inter } from "next/font/google";
import Image from "next/image";

const robotoSlab = Roboto_Slab({ subsets: ["latin"], weight: ["400", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function Aflevering() {
  const PICKUP_FEE = 299;
  const CART_KEY = "sliberi_cart_v1";
  const [cart, setCart] = useState<{ id: string; name: string; price: number; qty: number }[]>([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    postalCode: "",
    city: "",
    notes: "",
    delivery: "dropoff" as "dropoff" | "pickup",
  });
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setCart(parsed);
      }
    } catch {}
  }, []);

  const cartTotal = useMemo(() => cart.reduce((s, c) => s + c.price * c.qty, 0), [cart]);

  const saveCart = (next: typeof cart) => {
    setCart(next);
    try { localStorage.setItem(CART_KEY, JSON.stringify(next)); } catch {}
  };

  const inc = (id: string) => {
    saveCart(cart.map((c) => (c.id === id ? { ...c, qty: c.qty + 1 } : c)));
  };

  const dec = (id: string) => {
    const next = cart.map((c) => (c.id === id ? { ...c, qty: c.qty - 1 } : c)).filter((c) => c.qty > 0);
    saveCart(next);
  };

  const remove = (id: string) => saveCart(cart.filter((c) => c.id !== id));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return alert("Udfyld venligst navn og telefon.");
    setIsConfirmOpen(true);
  };

  const sendOrder = () => {
    const to = "info@sundbysliberi.dk";
    const subject = encodeURIComponent("Aflevering – Sundby Sliberi");
    const deliveryFee = form.delivery === "pickup" ? PICKUP_FEE : 0;
    const cartLines = cart.map((c) => `${c.name} × ${c.qty} = ${c.price * c.qty} kr`).join("\\n");
    const bodyRaw = `Hej Sundby Sliberi,\n\nJeg vil gerne bestille slibning.\n\nVarer:\n${cartLines || '-'}\n\nKurv i alt: ${cartTotal} kr\nAfhentningsgebyr: ${deliveryFee} kr\nTotal: ${cartTotal + deliveryFee} kr\n\nAflevering: ${form.delivery === "dropoff" ? "Jeg afleverer selv" : "Jeg ønsker afhentning"}\n\nNavn: ${form.name}\nTelefon: ${form.phone}\nEmail: ${form.email}\nAdresse: ${form.address}\nPostnr/By: ${form.postalCode} ${form.city}\n\nNoter:\n${form.notes || "-"}\n\nVenlig hilsen\n${form.name}`;
    const body = encodeURIComponent(bodyRaw);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };

  return (
    <main className={`${inter.className} min-h-screen bg-[#F9F7F3] text-neutral-900 px-8 py-12 w-full max-w-[90rem] mx-auto`}>
      <header className="max-w-4xl mx-auto text-center mb-10">
        <h1 className={`${robotoSlab.className} text-4xl text-neutral-800`}>Aflevering / afhentning</h1>
        <p className="text-neutral-700 mt-2">Vælg afleveringsform og udfyld dine oplysninger – vi tager os af resten.</p>
      </header>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Kundeoplysninger (centreret) */}
        <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm w-full max-w-lg">
          <h2 className={`${robotoSlab.className} text-3xl text-neutral-800 mb-5`}>Dine oplysninger</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block text-sm text-neutral-800">Navn*
                <input name="name" value={form.name} onChange={onChange} className="mt-1 w-full border border-neutral-300 rounded-xl px-3 py-2 bg-white" required />
              </label>
              <label className="block text-sm text-neutral-800">Telefon*
                <input name="phone" value={form.phone} onChange={onChange} className="mt-1 w-full border border-neutral-300 rounded-xl px-3 py-2 bg-white" required />
              </label>
              <label className="block text-sm text-neutral-800">Email
                <input type="email" name="email" value={form.email} onChange={onChange} className="mt-1 w-full border border-neutral-300 rounded-xl px-3 py-2 bg-white" />
              </label>
              <label className="block text-sm text-neutral-800 sm:col-span-2">Adresse
                <input name="address" value={form.address} onChange={onChange} className="mt-1 w-full border border-neutral-300 rounded-xl px-3 py-2 bg-white" placeholder="Vej og nr." />
              </label>
              <label className="block text-sm text-neutral-800">Postnr.
                <input name="postalCode" value={form.postalCode} onChange={onChange} className="mt-1 w-full border border-neutral-300 rounded-xl px-3 py-2 bg-white" placeholder="1234" />
              </label>
              <label className="block text-sm text-neutral-800">By
                <input name="city" value={form.city} onChange={onChange} className="mt-1 w-full border border-neutral-300 rounded-xl px-3 py-2 bg-white" placeholder="København S" />
              </label>
            </div>
            <div className="border-t border-neutral-200 pt-4">
              <h3 className={`${robotoSlab.className} text-xl text-neutral-800 mb-3`}>Levering</h3>
              <div className="grid grid-cols-1 gap-3">
                <label className={`cursor-pointer rounded-xl border ${form.delivery === 'dropoff' ? 'ring-2 ring-neutral-900' : 'border-neutral-300'} p-3 flex gap-2 items-center`}>
                  <input type="radio" name="delivery" value="dropoff" checked={form.delivery==='dropoff'} onChange={() => setForm((f)=>({...f,delivery:'dropoff'}))} className="sr-only" />
                  <Image src="/images/icon_dropoff.png" alt="Aflever selv" width={28} height={28} />
                  <div>
                    <div className="text-neutral-900 font-medium text-[15px]">Jeg afleverer selv</div>
                    <div className="text-neutral-600 text-sm">Aftal tid og aflever i butik/ved dør</div>
                  </div>
                </label>
                <label className={`cursor-pointer rounded-xl border ${form.delivery === 'pickup' ? 'ring-2 ring-neutral-900' : 'border-neutral-300'} p-3 flex gap-2 items-center`}>
                  <input type="radio" name="delivery" value="pickup" checked={form.delivery==='pickup'} onChange={() => setForm((f)=>({...f,delivery:'pickup'}))} className="sr-only" />
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M3 7h11v7h-1.5a2.5 2.5 0 1 0 0 5H16a2.5 2.5 0 1 0 4.9-.5H22v-6l-3-3h-3V7H3z" stroke="#262626" strokeWidth="1.5" fill="none"/>
                  </svg>
                  <div>
                    <div className="text-neutral-900 font-medium text-[15px]">Jeg ønsker afhentning</div>
                    <div className="text-neutral-600 text-sm">Vi henter lokalt efter aftale</div>
                  </div>
                </label>
              </div>
            </div>
            <label className="block text-sm text-neutral-800">Noter
              <textarea name="notes" value={form.notes} onChange={onChange} className="mt-1 w-full border border-neutral-300 rounded-xl px-3 py-2 min-h-[100px] bg-white" />
            </label>
            <button type="submit" className="w-full bg-neutral-900 text-white rounded-2xl px-6 py-3 hover:bg-neutral-700 transition-colors">Gennemse og godkend</button>
          </form>
        </section>

        {/* Opsummering */}
        <aside className="h-fit rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sticky top-10">
          <h2 className={`${robotoSlab.className} text-2xl text-neutral-800 mb-4`}>Opsummering</h2>
          <ul className="text-sm text-neutral-800 space-y-2">
            <li>
              <div className="font-medium mb-1">Kurv</div>
              {cart.length === 0 ? (
                <p className="text-neutral-600 text-xs">Ingen varer (tilføjes på siden Bestil).</p>
              ) : (
                <ul className="space-y-2 text-xs">
                  {cart.map((c) => (
                    <li key={c.id}>
                      <div className="flex items-center justify-between gap-2">
                        <span>{c.name}</span>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-neutral-300 rounded-md overflow-hidden">
                            <button onClick={() => dec(c.id)} className="px-2 py-0.5 hover:bg-neutral-100" aria-label="Minus">−</button>
                            <span className="px-2 tabular-nums">{c.qty}</span>
                            <button onClick={() => inc(c.id)} className="px-2 py-0.5 hover:bg-neutral-100" aria-label="Plus">+</button>
                          </div>
                          <span className="w-[60px] text-right tabular-nums">{c.price * c.qty} kr</span>
                          <button onClick={() => remove(c.id)} aria-label="Fjern" className="text-neutral-500 hover:text-neutral-800">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li className="flex justify-between"><span>Levering</span><span>{form.delivery === "pickup" ? "Afhentning" : "Afleverer selv"}</span></li>
            <li className="flex justify-between text-neutral-600"><span>Afhentningsgebyr</span><span>{form.delivery === "pickup" ? `${PICKUP_FEE} kr` : "0 kr"}</span></li>
          </ul>
          <div className="flex justify-between border-t border-neutral-200 pt-3 mt-3 text-neutral-900 font-medium">
            <span>Total</span>
            <span>{cartTotal + (form.delivery === "pickup" ? PICKUP_FEE : 0)} kr</span>
          </div>
          {form.delivery === "pickup" && (
            <p className="text-xs text-neutral-600 mt-3">Gebyret dækker lokal afhentning og aflevering.</p>
          )}
        </aside>
      </div>

      {isConfirmOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setIsConfirmOpen(false)}>
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className={`${robotoSlab.className} text-2xl text-neutral-900 mb-4`}>Bekræft bestilling</h3>
            <div className="space-y-2 text-sm text-neutral-800">
              <div className="flex justify-between"><span>Navn</span><span>{form.name}</span></div>
              <div className="flex justify-between"><span>Telefon</span><span>{form.phone}</span></div>
              {form.email && <div className="flex justify-between"><span>Email</span><span>{form.email}</span></div>}
              {(form.address || form.postalCode || form.city) && (
                <div className="flex justify-between"><span>Adresse</span><span>{`${form.address}${form.address ? ', ' : ''}${form.postalCode} ${form.city}`}</span></div>
              )}
              <div className="flex justify-between"><span>Levering</span><span>{form.delivery === 'pickup' ? 'Afhentning' : 'Afleverer selv'}</span></div>
              <div className="flex justify-between text-neutral-600"><span>Afhentningsgebyr</span><span>{form.delivery === 'pickup' ? `${PICKUP_FEE} kr` : '0 kr'}</span></div>
              {form.notes && <div><span className="block text-neutral-600">Noter</span><p className="text-neutral-800 mt-1 whitespace-pre-wrap">{form.notes}</p></div>}
              <div className="flex justify-between border-t border-neutral-200 pt-3 mt-2 text-neutral-900 font-medium"><span>Total</span><span>{form.delivery === 'pickup' ? `${PICKUP_FEE} kr` : '0 kr'}</span></div>
            </div>
            <div className="mt-5 flex gap-3 justify-end">
              <button onClick={() => setIsConfirmOpen(false)} className="rounded-xl border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100">Annuller</button>
              <button onClick={sendOrder} className="rounded-xl bg-neutral-900 text-white px-4 py-2 text-sm hover:bg-neutral-700">Godkend og send</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}


