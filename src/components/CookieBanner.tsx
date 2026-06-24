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
    <div className="fixed inset-x-0 bottom-0 z-50 print-hide">
      <div className="mx-auto mb-[16px] w-full max-w-[1200px] px-[16px] sm:px-[24px]">
        <div className="flex flex-col gap-[12px] rounded-card border border-line bg-surface p-[16px] text-[13px] leading-relaxed text-muted sm:flex-row sm:items-center sm:justify-between sm:p-[20px]">
          <p>
            Jeg bruger cookies til anonym statistik (Google Analytics), så jeg kan forbedre siden.
            Nødvendige cookies bruges kun til at få siden til at fungere. Læs mere i{" "}
            <a href="/privatliv" className="text-accent underline-offset-2 hover:underline">
              privatlivspolitikken
            </a>
            .
          </p>
          <div className="flex items-center justify-end gap-[8px]">
            <button
              type="button"
              onClick={() => setConsent("denied")}
              className="rounded-full border border-line px-[18px] py-[9px] text-[14px] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Afvis
            </button>
            <button
              type="button"
              onClick={() => setConsent("granted")}
              className="rounded-full bg-accent px-[18px] py-[9px] text-[14px] font-medium text-white transition-colors hover:bg-accent-dark"
            >
              Accepter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


