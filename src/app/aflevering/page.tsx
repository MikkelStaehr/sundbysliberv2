"use client";

import React, { useState } from "react";
import { Roboto_Slab, Inter } from "next/font/google";
import Image from "next/image";

const robotoSlab = Roboto_Slab({ subsets: ["latin"], weight: ["400", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function Aflevering() {
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

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return alert("Udfyld venligst navn og telefon.");

    const to = "info@sundbysliberi.dk";
    const subject = encodeURIComponent("Aflevering – Sundby Sliberi");
    const bodyRaw = `Hej Sundby Sliberi,\n\nJeg vil gerne aflevere mine ting til slibning.\n\nNavn: ${form.name}\nTelefon: ${form.phone}\nEmail: ${form.email}\nAdresse: ${form.address}\nPostnr/By: ${form.postalCode} ${form.city}\n\nAflevering: ${form.delivery === "dropoff" ? "Jeg afleverer selv" : "Jeg ønsker afhentning"}\n\nNoter:\n${form.notes || "-"}\n\nVenlig hilsen\n${form.name}`;

    window.location.href = `mailto:${to}?subject=${subject}&body=${encodeURIComponent(bodyRaw)}`;
  };

  return (
    <main className={`${inter.className} min-h-screen bg-[#F9F7F3] text-neutral-900 px-8 py-12 w-full max-w-[90rem] mx-auto`}>
      <header className="max-w-4xl mx-auto text-center mb-10">
        <h1 className={`${robotoSlab.className} text-4xl text-neutral-800`}>Aflevering / afhentning</h1>
        <p className="text-neutral-700 mt-2">Vælg afleveringsform og udfyld dine oplysninger – vi tager os af resten.</p>
      </header>

      <div className="max-w-lg mx-auto">
        {/* Kundeoplysninger (centreret) */}
        <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm w-full">
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
            <button type="submit" className="w-full bg-neutral-900 text-white rounded-2xl px-6 py-3 hover:bg-neutral-700 transition-colors">Send bestilling via mail</button>
          </form>
        </section>
      </div>
    </main>
  );
}


