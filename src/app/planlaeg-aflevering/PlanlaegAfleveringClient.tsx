"use client";

import { Roboto_Slab, Inter } from "next/font/google";
import { useEffect, useState } from "react";

const robotoSlab = Roboto_Slab({ subsets: ["latin"], weight: ["400", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

type Props = {
  token: string;
};

export default function PlanlaegAfleveringClient({ token }: Props) {
  const [dropoff, setDropoff] = useState("");
  const [pickup, setPickup] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    setError(null);
    setSuccess(false);
  }, [dropoff, pickup]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!dropoff) {
      setError("Vælg venligst et tidspunkt for aflevering.");
      return;
    }

    const dropoffDate = NewDateWithLocal(dropoff);
    if (isNaN(dropoffDate.getTime())) {
      setError("Afleveringstidspunktet er ugyldigt.");
      return;
    }

    if (pickup) {
      const pickupDate = NewDateWithLocal(pickup);
      const minPickup = new Date(dropoffDate.getTime() + 24 * 60 * 60 * 1000);
      if (pickupDate.getTime() < minPickup.getTime()) {
        setError("Afhentningstidspunktet skal ligge mindst 24 timer efter aflevering.");
        return;
      }
    }

    try {
      setIsSending(true);
      const res = await fetch("/api/schedule-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          dropoff,
          pickup: pickup || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Noget gik galt. Prøv igen.");
      }

      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Noget gik galt. Prøv igen.");
      }
    } finally {
      setIsSending(false);
    }
  };

  if (!token) {
    return (
      <main
        className={`${inter.className} min-h-screen bg-[#F9F7F3] text-neutral-900 px-8 py-12 w-full max-w-[90rem] mx-auto flex items-center justify-center`}
      >
        <div className="max-w-lg rounded-2xl border border-neutral-200 bg-white shadow-sm px-8 py-10 text-center">
          <h1 className={`${robotoSlab.className} text-2xl text-neutral-900 mb-3`}>
            Linket er desværre udløbet eller ugyldigt
          </h1>
          <p className="text-sm text-neutral-700">
            Prøv at åbne det nyeste link, du har modtaget fra Sundby Sliberi, eller kontakt os, hvis
            problemet fortsætter.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      className={`${inter.className} min-h-screen bg-[#F9F7F3] text-neutral-900 px-8 py-12 w-full max-w-[90rem] mx-auto flex items-center justify-center`}
    >
      <div className="w-full max-w-xl rounded-2xl border border-neutral-200 bg-white shadow-sm px-8 py-10">
        <h1 className={`${robotoSlab.className} text-3xl text-neutral-900 mb-4`}>
          Vælg tidspunkt for aflevering
        </h1>
        <p className="text-sm text-neutral-700 mb-6">
          Vælg det tidspunkt, der passer dig bedst til aflevering af dine knive eller dit værktøj.
          Du kan også vælge et tidspunkt for afhentning – det skal ligge mindst 24 timer efter
          afleveringen.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-neutral-800 mb-1">
              Aflevering (dato og klokkeslæt)*
            </label>
            <input
              type="datetime-local"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              className="mt-1 w-full border border-neutral-300 rounded-xl px-3 py-2 bg-white text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-800 mb-1">
              Afhentning (valgfrit, min. 24 timer efter aflevering)
            </label>
            <input
              type="datetime-local"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="mt-1 w-full border border-neutral-300 rounded-xl px-3 py-2 bg-white text-sm"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && (
            <p className="text-sm text-emerald-700">
              Tak! Dine tider er sendt til Sundby Sliberi. Du hører fra os, hvis noget skal justeres.
            </p>
          )}
          <button
            type="submit"
            disabled={isSending}
            className="w-full inline-flex items-center justify-center rounded-2xl bg-neutral-900 text-white px-6 py-3 text-sm hover:bg-neutral-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSending ? "Sender..." : "Send tider til Sundby Sliberi"}
          </button>
        </form>
      </div>
    </main>
  );
}

function NewDateWithLocal(value: string): Date {
  // datetime-local giver en streng uden tidszone, fx "2025-12-01T10:00"
  // Vi tolker den som lokal tid i browserens tidszone.
  const [datePart, timePart] = value.split("T");
  if (!datePart || !timePart) return new Date(NaN);
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);
  return new Date(year, (month || 1) - 1, day || 1, hour || 0, minute || 0);
}


