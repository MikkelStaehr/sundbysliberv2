"use client";

import React, { useState } from "react";

interface FormState {
  name: string;
  company: string;
  cvr: string;
  email: string;
  phone: string;
  message: string;
}

const inputClass =
  "mt-[6px] w-full rounded-[12px] border border-line bg-surface px-[12px] py-[10px] text-[16px] text-ink outline-none transition-colors focus:border-accent";

export function ErhvervForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    company: "",
    cvr: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setError("Udfyld venligst navn og e-mail.");
      return;
    }
    setIsSending(true);
    setError(null);
    try {
      const res = await fetch("/api/erhverv-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Der opstod en fejl.");
      }
      setSuccess(true);
      setForm({ name: "", company: "", cvr: "", email: "", phone: "", message: "" });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message || "Der opstod en fejl." : "Der opstod en fejl.");
    } finally {
      setIsSending(false);
    }
  };

  if (success) {
    return (
      <div className="mt-[16px] rounded-[12px] bg-panel px-[20px] py-[24px] text-center">
        <p className="font-display text-[22px] uppercase text-ink">Tak!</p>
        <p className="mt-[6px] text-[15px] leading-relaxed text-muted">
          Tak for din henvendelse — vi vender retur hurtigst muligt.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-[16px] flex flex-col gap-[14px] text-left">
      <div className="grid gap-[14px] sm:grid-cols-2">
        <label className="block text-[14px] text-ink">
          Navn*
          <input name="name" value={form.name} onChange={onChange} required autoComplete="name" className={inputClass} />
        </label>
        <label className="block text-[14px] text-ink">
          Virksomhedsnavn
          <input name="company" value={form.company} onChange={onChange} autoComplete="organization" className={inputClass} />
        </label>
        <label className="block text-[14px] text-ink">
          CVR-nummer
          <input name="cvr" value={form.cvr} onChange={onChange} inputMode="numeric" className={inputClass} />
        </label>
        <label className="block text-[14px] text-ink">
          E-mail*
          <input type="email" name="email" value={form.email} onChange={onChange} required autoComplete="email" className={inputClass} />
        </label>
        <label className="block text-[14px] text-ink sm:col-span-2">
          Telefon
          <input name="phone" value={form.phone} onChange={onChange} inputMode="tel" autoComplete="tel" className={inputClass} />
        </label>
      </div>
      <label className="block text-[14px] text-ink">
        Beskriv kort jeres behov
        <textarea name="message" value={form.message} onChange={onChange} rows={4} className={inputClass} />
      </label>
      {error && <p className="text-[14px] text-apricot-deep">{error}</p>}
      <button
        type="submit"
        disabled={isSending}
        className="inline-flex items-center justify-center self-start rounded-full bg-accent px-[24px] py-[13px] text-[15px] font-medium text-white transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSending ? "Sender…" : "Send henvendelse"}
      </button>
    </form>
  );
}
