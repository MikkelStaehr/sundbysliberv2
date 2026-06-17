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
      setForm({
        name: "",
        company: "",
        cvr: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Der opstod en fejl.");
      } else {
        setError("Der opstod en fejl.");
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mt-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="block text-xs text-neutral-800 text-left">
          Navn*
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            required
            className="mt-1 w-full border border-neutral-300 rounded-xl px-3 py-2 bg-white text-sm"
          />
        </label>
        <label className="block text-xs text-neutral-800 text-left">
          Virksomhedsnavn
          <input
            name="company"
            value={form.company}
            onChange={onChange}
            className="mt-1 w-full border border-neutral-300 rounded-xl px-3 py-2 bg-white text-sm"
          />
        </label>
        <label className="block text-xs text-neutral-800 text-left">
          CVR-nummer
          <input
            name="cvr"
            value={form.cvr}
            onChange={onChange}
            className="mt-1 w-full border border-neutral-300 rounded-xl px-3 py-2 bg-white text-sm"
          />
        </label>
        <label className="block text-xs text-neutral-800 text-left">
          E-mail*
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            required
            className="mt-1 w-full border border-neutral-300 rounded-xl px-3 py-2 bg-white text-sm"
          />
        </label>
        <label className="block text-xs text-neutral-800 text-left">
          Telefon
          <input
            name="phone"
            value={form.phone}
            onChange={onChange}
            className="mt-1 w-full border border-neutral-300 rounded-xl px-3 py-2 bg-white text-sm"
          />
        </label>
      </div>
      <label className="block text-xs text-neutral-800 text-left">
        Beskriv kort jeres behov
        <textarea
          name="message"
          value={form.message}
          onChange={onChange}
          className="mt-1 w-full border border-neutral-300 rounded-xl px-3 py-2 min-h-[100px] bg-white text-sm"
        />
      </label>
      {error && <p className="text-xs text-red-600">{error}</p>}
      {success && (
        <p className="text-xs text-emerald-700">
          Tak for din henvendelse. Vi vender retur hurtigst muligt.
        </p>
      )}
      <button
        type="submit"
        disabled={isSending}
        className="inline-flex items-center justify-center rounded-full bg-accent text-white px-6 py-3 text-sm transition-colors hover:bg-accent-dark disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSending ? "Sender..." : "Send henvendelse"}
      </button>
    </form>
  );
}


