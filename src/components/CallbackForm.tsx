"use client";

import React, { useState } from "react";

interface FormState {
  name: string;
  phone: string;
  time: string;
}

const TIME_OPTIONS = [
  "Når som helst",
  "Formiddag (9 til 12)",
  "Eftermiddag (12 til 16)",
  "Sidst på dagen (efter 16)",
];

export function CallbackForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    time: TIME_OPTIONS[0],
  });
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setError("Udfyld venligst navn og telefonnummer.");
      return;
    }
    setIsSending(true);
    setError(null);
    try {
      const res = await fetch("/api/ring-op", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Der opstod en fejl.");
      }
      setSuccess(true);
      setForm({ name: "", phone: "", time: TIME_OPTIONS[0] });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Der opstod en fejl.");
    } finally {
      setIsSending(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-[16px] bg-surface px-[24px] py-[32px] text-center">
        <p className="font-display text-[24px] uppercase text-ink">Tak!</p>
        <p className="mt-[8px] text-[15px] leading-relaxed text-muted">
          Jeg ringer dig op hurtigst muligt, som regel samme dag.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-[12px]">
      <label className="block text-[13px] font-medium text-ink">
        Dit navn
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          required
          autoComplete="name"
          className="mt-[6px] w-full rounded-[12px] border border-line bg-surface px-[16px] py-[12px] text-[16px] text-ink outline-none transition-colors focus:border-accent"
        />
      </label>
      <label className="block text-[13px] font-medium text-ink">
        Telefonnummer
        <input
          name="phone"
          type="tel"
          inputMode="tel"
          value={form.phone}
          onChange={onChange}
          required
          autoComplete="tel"
          className="mt-[6px] w-full rounded-[12px] border border-line bg-surface px-[16px] py-[12px] text-[16px] text-ink outline-none transition-colors focus:border-accent"
        />
      </label>
      <label className="block text-[13px] font-medium text-ink">
        Hvornår passer det bedst?
        <select
          name="time"
          value={form.time}
          onChange={onChange}
          className="mt-[6px] w-full rounded-[12px] border border-line bg-surface px-[16px] py-[12px] text-[16px] text-ink outline-none transition-colors focus:border-accent"
        >
          {TIME_OPTIONS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>
      {error && <p className="text-[13px] text-apricot-deep">{error}</p>}
      <button
        type="submit"
        disabled={isSending}
        className="mt-[4px] inline-flex items-center justify-center rounded-full bg-accent px-[24px] py-[14px] text-[15px] font-medium text-white transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSending ? "Sender…" : "Ring mig op"}
      </button>
    </form>
  );
}
