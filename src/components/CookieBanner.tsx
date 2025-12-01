"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "analytics-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const existing = window.localStorage.getItem(CONSENT_KEY);
    if (!existing) {
      setVisible(true);
    }
  }, []);

  const setConsent = (value: "granted" | "denied") => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new Event("analytics-consent-changed"));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40">
      <div className="mx-auto mb-4 w-full max-w-[90rem] px-4 sm:px-8">
        <div className="rounded-2xl border border-neutral-200 bg-white/95 shadow-lg p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-neutral-800">
          <p className="leading-relaxed">
            Vi bruger cookies til anonym statistik (Google Analytics), så vi kan forbedre siden.
            Du kan acceptere eller afvise statistikcookies. Nødvendige cookies bruges kun til at få
            siden til at fungere. Læs mere i vores{" "}
            <a href="/privatliv" className="underline-offset-2 hover:underline">
              privatlivspolitik
            </a>
            .
          </p>
          <div className="flex items-center gap-2 justify-end">
            <button
              type="button"
              onClick={() => setConsent("denied")}
              className="rounded-xl border border-neutral-300 px-3 py-1.5 text-[11px] text-neutral-700 hover:bg-neutral-100"
            >
              Afvis
            </button>
            <button
              type="button"
              onClick={() => setConsent("granted")}
              className="rounded-xl bg-neutral-900 text-white px-3 py-1.5 text-[11px] hover:bg-neutral-700"
            >
              Accepter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


