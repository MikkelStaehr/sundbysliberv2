"use server";

import { Resend } from "resend";

export type OrderLine = { navn: string; pris: number; qty: number };

export type OrderInput = {
  name: string;
  phone: string;
  email?: string;
  deadline?: string; // ISO-dato fra <input type="date">
  message?: string;
  company?: string; // honeypot — skal være tom
  items: OrderLine[];
  total: number;
};

export type OrderResult = { ok: true } | { ok: false; error: string };

function formatDeadline(value?: string): string {
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
    return { ok: false, error: "Telefonnummeret ser forkert ud — indtast mindst 8 cifre." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL || "Sundby Sliberi <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error("Resend ikke konfigureret: RESEND_API_KEY eller CONTACT_EMAIL mangler.");
    return { ok: false, error: "Serveren er ikke sat op til at sende mail endnu." };
  }

  const deadline = formatDeadline(input.deadline);
  const cartLines =
    input.items.length > 0
      ? input.items.map((it) => `  • ${it.navn} × ${it.qty} = ${it.pris * it.qty} kr`).join("\n")
      : "  (ingen varer valgt)";

  const text = `Skal bruges senest: ${deadline}

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

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: input.email?.trim() || undefined,
      subject: `Ny bestilling fra ${name}`,
      text,
    });
    if (error) {
      console.error("Resend-fejl:", error);
      return { ok: false, error: "Bestillingen kunne ikke sendes. Prøv igen eller ring til os." };
    }
    return { ok: true };
  } catch (err) {
    console.error("Uventet fejl i sendOrder:", err);
    return { ok: false, error: "Der opstod en fejl. Prøv igen eller ring til os." };
  }
}
