"use client";

import type { Metadata } from "next";
import React, { useEffect, useMemo, useState } from "react";
import { Roboto_Slab, Inter } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { computeKnifeDiscount } from "@/lib/pricing";

const robotoSlab = Roboto_Slab({ subsets: ["latin"], weight: ["400", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "Aflevering & afhentning – Sundby Sliberi",
  description:
    "Udfyld dine oplysninger og vælg afleveringsform eller lokal afhentning hos Sundby Sliberi i Sundby, Nykøbing Falster.",
};

export default function Aflevering() {
  const router = useRouter();
  const PICKUP_FEE = 299;
  const EXPRESS_FEE = 300;
  const CART_KEY = "sliberi_cart_v1";
  const FORM_KEY = "sliberi_form_v1";
  const [cart, setCart] = useState<{ id: string; name: string; price: number; qty: number; category?: string }[]>([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    postalCode: "",
    city: "",
    notes: "",
    delivery: "dropoff" as "dropoff" | "pickup",
    express: false,
  });
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [addressQuery, setAddressQuery] = useState("");
  const [addressSuggestions, setAddressSuggestions] = useState<
    { tekst: string; adresse?: { vejnavn: string; husnr: string; postnr: string; postnrnavn: string } }[]
  >([]);
  const [isAddressLoading, setIsAddressLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, address: value }));
    setAddressQuery(value);
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

  // Gem og hent kundeoplysninger lokalt, så faste kunder slipper for at indtaste alt igen
  useEffect(() => {
    try {
      const savedForm = localStorage.getItem(FORM_KEY);
      if (savedForm) {
        const parsed = JSON.parse(savedForm) as typeof form;
        setForm((prev) => ({
          ...prev,
          ...parsed,
        }));
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(FORM_KEY, JSON.stringify(form));
    } catch {}
  }, [form]);

  // DAWA adresse-autocomplete
  useEffect(() => {
    const q = addressQuery.trim();
    if (q.length < 3) {
      setAddressSuggestions([]);
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      try {
        setIsAddressLoading(true);
        // DAWA / Dataforsyningen autocomplete endpoint for danske adresser
        const res = await fetch(
          `https://api.dataforsyningen.dk/adresser/autocomplete?q=${encodeURIComponent(q)}&per_side=5`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Kunne ikke hente adresseforslag.");
        const data = (await res.json()) as {
          tekst: string;
          adresse?: { vejnavn: string; husnr: string; postnr: string; postnrnavn: string };
        }[];
        setAddressSuggestions(data);
      } catch (err) {
        if (!(err instanceof DOMException && err.name === "AbortError")) {
          // Hvis der er fejl, viser vi bare ingen forslag – formen virker stadig uden autocomplete
          setAddressSuggestions([]);
        }
      } finally {
        setIsAddressLoading(false);
      }
    }, 250); // lille debounce for at undgå for mange kald

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [addressQuery]);

  const cartTotal = useMemo(() => cart.reduce((s, c) => s + c.price * c.qty, 0), [cart]);
  const { knifeCount, discountAmount, discountRate } = useMemo(
    () => computeKnifeDiscount(cart),
    [cart]
  );
  const cartTotalAfterDiscount = cartTotal - discountAmount;
  const deliveryFee = form.delivery === "pickup" ? PICKUP_FEE : 0;
  const expressFee = form.express ? EXPRESS_FEE : 0;
  const totalWithFees = cartTotalAfterDiscount + deliveryFee + expressFee;

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

  const sendOrder = async () => {
    if (isSending) return;
    setIsSending(true);
    setSendError(null);
    try {
      const res = await fetch("/api/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart,
          cartTotal,
          delivery: form.delivery,
          pickupFee: PICKUP_FEE,
          express: form.express,
          expressFee: EXPRESS_FEE,
          form,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Der opstod en fejl.");
      }
      // Nulstil kurv, så den ikke hænger ved til næste bestilling
      saveCart([]);
      setIsConfirmOpen(false);
      // Send brugeren til en takke-side
      router.push("/tak");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSendError(err.message || "Der opstod en fejl under afsendelse.");
      } else {
        setSendError("Der opstod en fejl under afsendelse.");
      }
    } finally {
      setIsSending(false);
    }
  };

  const hasItemsInCart = cart.length > 0;

  return (
    <main className={`${inter.className} min-h-screen bg-[#F9F7F3] text-neutral-900 px-8 py-12 w-full max-w-[90rem] mx-auto`}>
      <header className="max-w-4xl mx-auto text-center mb-10">
        <h1 className={`${robotoSlab.className} text-4xl text-neutral-800`}>Aflevering / afhentning</h1>
        <p className="text-neutral-700 mt-2">Vælg afleveringsform og udfyld dine oplysninger – vi tager os af resten.</p>
      </header>

      {!hasItemsInCart && (
        <section className="max-w-3xl mx-auto mb-10">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm text-center">
            <h2 className={`${robotoSlab.className} text-2xl text-neutral-900 mb-2`}>
              Din kurv er tom
            </h2>
            <p className="text-sm text-neutral-700 mb-4">
              For at aflevere eller bestille afhentning skal du først vælge, hvad du vil have slebet på siden{" "}
              <span className="font-medium">Bestil</span>.
            </p>
            <button
              type="button"
              onClick={() => router.push("/bestil")}
              className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 text-white px-6 py-3 text-sm hover:bg-neutral-700 transition-colors"
            >
              Gå til Bestil
            </button>
          </div>
        </section>
      )}

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
              <label className="block text-sm text-neutral-800 sm:col-span-2 relative">
                Adresse
                <input
                  name="address"
                  value={form.address}
                  onChange={onAddressChange}
                  className="mt-1 w-full border border-neutral-300 rounded-xl px-3 py-2 bg-white"
                  placeholder="Vej og nr."
                  autoComplete="street-address"
                />
                {(addressSuggestions.length > 0 || isAddressLoading) && form.address && (
                  <div className="absolute z-20 mt-1 w-full max-h-60 overflow-auto rounded-xl border border-neutral-200 bg-white shadow-lg text-xs">
                    {isAddressLoading && (
                      <div className="px-3 py-2 text-neutral-500">Søger adresser…</div>
                    )}
                    {!isAddressLoading &&
                      addressSuggestions.map((s) => (
                        <button
                          key={s.tekst}
                          type="button"
                          className="w-full text-left px-3 py-2 hover:bg-neutral-100"
                          onClick={() => {
                            const addr = s.adresse;
                            setForm((f) => ({
                              ...f,
                              address: addr ? `${addr.vejnavn} ${addr.husnr}` : s.tekst,
                              postalCode: addr?.postnr ?? f.postalCode,
                              city: addr?.postnrnavn ?? f.city,
                            }));
                            setAddressSuggestions([]);
                          }}
                        >
                          {s.tekst}
                        </button>
                      ))}
                  </div>
                )}
              </label>
              <label className="block text-sm text-neutral-800">Postnr.
                <input name="postalCode" value={form.postalCode} onChange={onChange} className="mt-1 w-full border border-neutral-300 rounded-xl px-3 py-2 bg-white" placeholder="4800" />
              </label>
              <label className="block text-sm text-neutral-800">By
                <input name="city" value={form.city} onChange={onChange} className="mt-1 w-full border border-neutral-300 rounded-xl px-3 py-2 bg-white" placeholder="Sundby, Nykøbing Falster" />
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
            <div className="border border-dashed border-neutral-200 rounded-xl p-3 mt-2 flex items-start gap-3 bg-neutral-50">
              <input
                id="express"
                type="checkbox"
                checked={form.express}
                onChange={(e) => setForm((f) => ({ ...f, express: e.target.checked }))}
                className="mt-1 h-4 w-4 rounded border-neutral-400 text-neutral-900"
              />
              <label htmlFor="express" className="text-sm text-left cursor-pointer select-none">
                <span className="font-medium text-neutral-900">Ekspres slibning (+{EXPRESS_FEE} kr)</span>
                <span className="block text-neutral-600">
                  Vi prioriterer din ordre ekstra højt og aftaler hurtigst mulige aflevering/afhentning.
                </span>
              </label>
            </div>
            <label className="block text-sm text-neutral-800">Noter
              <textarea name="notes" value={form.notes} onChange={onChange} className="mt-1 w-full border border-neutral-300 rounded-xl px-3 py-2 min-h-[100px] bg-white" />
            </label>
            <button type="submit" className="w-full bg-neutral-900 text-white rounded-2xl px-6 py-3 hover:bg-neutral-700 transition-colors">Gennemse og godkend</button>
            {sendError && (
              <p className="text-sm text-red-600 mt-1">
                {sendError} Du kan også skrive direkte til{" "}
                <span className="underline underline-offset-2">info@sundby-sliberi.dk</span> eller ringe på{" "}
                <span className="underline underline-offset-2">31 38 61 19</span>.
              </p>
            )}
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
                              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
            <li className="flex justify-between text-neutral-600"><span>Afhentningsgebyr</span><span>{deliveryFee ? `${deliveryFee} kr` : "0 kr"}</span></li>
            <li className="flex justify-between text-neutral-600"><span>Ekspres slibning</span><span>{expressFee ? `${expressFee} kr` : "0 kr"}</span></li>
          </ul>
          <div className="border-t border-neutral-200 pt-3 mt-3 text-neutral-900 font-medium space-y-1">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{cartTotal} kr</span>
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
            <div className="flex justify-between">
              <span>Total</span>
              <span>{totalWithFees} kr</span>
            </div>
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
              <div className="flex justify-between text-neutral-600"><span>Afhentningsgebyr</span><span>{deliveryFee ? `${deliveryFee} kr` : '0 kr'}</span></div>
              <div className="flex justify-between text-neutral-600"><span>Ekspres slibning</span><span>{expressFee ? `${expressFee} kr` : '0 kr'}</span></div>
              {form.notes && <div><span className="block text-neutral-600">Noter</span><p className="text-neutral-800 mt-1 whitespace-pre-wrap">{form.notes}</p></div>}
              <div className="border-t border-neutral-200 pt-3 mt-2 text-neutral-900 font-medium space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{cartTotal} kr</span>
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
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>{totalWithFees} kr</span>
                </div>
              </div>
            </div>
            <div className="mt-5 flex gap-3 justify-end">
              <button onClick={() => setIsConfirmOpen(false)} className="rounded-xl border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100">Annuller</button>
              <button
                onClick={sendOrder}
                disabled={isSending}
                className="rounded-xl bg-neutral-900 text-white px-4 py-2 text-sm hover:bg-neutral-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSending ? "Sender..." : "Godkend og send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}


