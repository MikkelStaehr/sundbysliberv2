"use server";

import { sendNotification } from "@/lib/email";

export type OrderLine = { navn: string; pris: number; qty: number };

export type OrderInput = {
  name: string;
  phone: string;
  email?: string;
  dropoff?: string; // ISO-dato fra <input type="date"> — ønsket afleveringsdag
  message?: string;
  company?: string; // honeypot — skal være tom
  items: OrderLine[];
  total: number;
};

export type OrderResult = { ok: true } | { ok: false; error: string };

function formatDate(value?: string): string {
  if (!value) return "ikke angivet";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "ikke angivet";
  return d.toLocaleDateString("da-DK", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function sendOrder(input: OrderInput): Promise<OrderResult> {
  // Honeypot: udfyldt = bot. Returnér "ok" så botten ikke får feedback.
  if (input.company && input.company.trim() !== "") {
    return { ok: true };
  }

  const name = input.name?.trim();
  const phone = input.phone?.trim();

  if (!name || !phone) {
    return { ok: false, error: "Udfyld venligst navn og telefon." };
  }
  if (phone.replace(/\D/g, "").length < 8) {
    return { ok: false, error: "Telefonnummeret ser forkert ud. Indtast mindst 8 cifre." };
  }

  const dropoff = formatDate(input.dropoff);
  const cartLines =
    input.items.length > 0
      ? input.items.map((it) => `  • ${it.navn} × ${it.qty} = ${it.pris * it.qty} kr`).join("\n")
      : "  (ingen varer valgt)";

  const text = `Ønsket afleveringsdag: ${dropoff}

── Bestilling ──
${cartLines}

I alt (vejledende): ${input.total} kr

── Kunde ──
Navn:    ${name}
Telefon: ${phone}
E-mail:  ${input.email?.trim() || "-"}

── Besked ──
${input.message?.trim() || "-"}
`;

  return sendNotification({
    subject: `Ny bestilling fra ${name}`,
    text,
    replyTo: input.email,
  });
}
