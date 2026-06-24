"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { sendOrder } from "@/app/aflevering/order-action";
import { SITE } from "@/lib/site";

const inputClass =
  "mt-[6px] w-full rounded-input border border-line bg-surface px-[12px] py-[10px] text-base text-ink placeholder:text-muted";

// Afleverings-tidsrum som valgkort. Dropoff øverst (dag), personligt nederst (aften).
const TIDSRUM = [
  { value: "Dropoff-kasse (kl. 08-16)", title: "Dropoff-kasse", time: "kl. 08–16", desc: "Læg dem i kassen" },
  { value: "Personlig aflevering (kl. 16-22)", title: "Personligt", time: "kl. 16–22", desc: "Aflever i hånden" },
];

export function OrderForm({ onDone }: { onDone?: () => void }) {
  const { items, total, clear } = useCart();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    dropoff: "",
    tidsrum: "",
    message: "",
    company: "", // honeypot
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.phone.trim()) {
      setError("Udfyld venligst navn og telefon.");
      return;
    }

    setSending(true);
    const res = await sendOrder({
      name: form.name,
      phone: form.phone,
      email: form.email,
      dropoff: form.dropoff,
      tidsrum: form.tidsrum,
      message: form.message,
      company: form.company,
      items: items.map((it) => ({ navn: it.navn, pris: it.pris, qty: it.qty })),
      total,
    });
    setSending(false);

    if (res.ok) {
      clear();
      setDone(true);
      onDone?.();
    } else {
      setError(res.error);
    }
  };

  if (done) {
    return (
      <div className="rounded-card border border-line bg-surface p-[28px]">
        <h2 className="font-display text-2xl text-ink">Tak for din bestilling</h2>
        <p className="mt-[12px] text-sm leading-relaxed text-ink">
          Jeg kontakter dig hurtigst muligt, så vi kan aftale nærmere.
        </p>
        <div className="mt-[24px] flex flex-wrap gap-[12px]">
          <Link
            href="/"
            className="rounded-full bg-accent px-[20px] py-[11px] text-sm font-medium text-white transition-colors hover:bg-accent-dark"
          >
            Til forsiden
          </Link>
          <a
            href={SITE.phoneHref}
            className="rounded-full border border-line px-[20px] py-[11px] text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Ring {SITE.phoneDisplay}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-card border border-line bg-surface p-[28px]">
      <h1 className="font-display text-3xl text-ink md:text-4xl">Dine oplysninger</h1>
      <p className="mt-[10px] text-sm leading-relaxed text-muted">
        Udfyld dine oplysninger, så kontakter jeg dig og aftaler pris og dag.
      </p>

      <div className="mt-[24px] flex flex-col gap-[16px]">
        <label className="block text-sm text-ink">
          Navn*
          <input name="name" value={form.name} onChange={onChange} required autoComplete="name" className={inputClass} />
        </label>
        <label className="block text-sm text-ink">
          Telefon*
          <input
            name="phone"
            value={form.phone}
            onChange={onChange}
            required
            inputMode="tel"
            autoComplete="tel"
            className={inputClass}
          />
        </label>
        <label className="block text-sm text-ink">
          E-mail (valgfri)
          <input type="email" name="email" value={form.email} onChange={onChange} autoComplete="email" className={inputClass} />
        </label>
        <div className="grid gap-[16px] sm:grid-cols-2">
          <label className="block text-sm text-ink">
            Hvornår vil du aflevere dem? (valgfri)
            <input
              type="date"
              name="dropoff"
              value={form.dropoff}
              onChange={onChange}
              // Åbn kalenderen ved klik/fokus hvor som helst i feltet, ikke kun på ikonet
              onClick={(e) => e.currentTarget.showPicker?.()}
              onFocus={(e) => e.currentTarget.showPicker?.()}
              className={inputClass}
            />
          </label>
          <fieldset className="min-w-0">
            <legend className="text-sm text-ink">Tidsrum (valgfri)</legend>
            <div className="mt-[6px] flex flex-col gap-[8px]">
              {TIDSRUM.map((o) => {
                const selected = form.tidsrum === o.value;
                return (
                  <label
                    key={o.value}
                    className={`flex cursor-pointer items-center gap-[12px] rounded-input border px-[14px] py-[10px] transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent ${
                      selected ? "border-accent bg-accent/5" : "border-line hover:border-accent/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="tidsrum"
                      value={o.value}
                      checked={selected}
                      onChange={onChange}
                      className="sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border ${
                        selected ? "border-accent" : "border-line"
                      }`}
                    >
                      {selected && <span className="h-[9px] w-[9px] rounded-full bg-accent" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-[8px]">
                        <span className="text-sm font-medium text-ink">{o.title}</span>
                        <span className="text-xs tabular-nums text-muted">{o.time}</span>
                      </span>
                      <span className="block text-xs text-muted">{o.desc}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        </div>
        <label className="block text-sm text-ink">
          Besked (valgfri)
          <textarea name="message" value={form.message} onChange={onChange} rows={4} className={inputClass} />
        </label>

        {/* Honeypot — skjult for mennesker, fanger bots */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label>
            Virksomhed
            <input name="company" value={form.company} onChange={onChange} tabIndex={-1} autoComplete="off" />
          </label>
        </div>
      </div>

      {error && <p className="mt-[16px] text-sm text-accent">{error}</p>}

      <button
        type="submit"
        disabled={sending}
        className="mt-[24px] w-full rounded-full bg-accent px-[20px] py-[13px] text-sm font-medium text-white transition-colors hover:bg-accent-dark disabled:opacity-60"
      >
        {sending ? "Sender…" : "Send bestilling"}
      </button>

      <p className="mt-[14px] text-xs leading-relaxed text-muted">
        Ingen onlinebetaling. Vi aftaler pris og leveringsdag, før du betaler noget.
      </p>
    </form>
  );
}
