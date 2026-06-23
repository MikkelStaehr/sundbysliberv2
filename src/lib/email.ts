import { Resend } from "resend";

/*
  Fælles e-mail-afsendelse via Resend. Alle formularer (ring-op, erhverv,
  bestilling) går gennem denne, så der kun er ét sted at konfigurere.

  Miljøvariabler:
  - RESEND_API_KEY     din Resend-nøgle
  - CONTACT_EMAIL      modtager (din indbakke — hvor henvendelser lander)
  - RESEND_FROM_EMAIL  afsender, fx "Sundby Sliberi <kontakt@sundby-sliberi.dk>"
                       (kræver verificeret domæne i Resend; ellers bruges
                       onboarding@resend.dev som fallback)
*/

export type SendResult = { ok: true } | { ok: false; error: string };

export async function sendNotification({
  subject,
  text,
  replyTo,
}: {
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL || "Sundby Sliberi <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error("Resend ikke konfigureret: RESEND_API_KEY eller CONTACT_EMAIL mangler.");
    return { ok: false, error: "Serveren er ikke sat op til at sende mail endnu." };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: replyTo?.trim() || undefined,
      subject,
      text,
    });
    if (error) {
      console.error("Resend-fejl:", error);
      return { ok: false, error: "Beskeden kunne ikke sendes. Prøv igen eller ring til os." };
    }
    return { ok: true };
  } catch (err) {
    console.error("Uventet fejl ved e-mail-afsendelse:", err);
    return { ok: false, error: "Der opstod en fejl. Prøv igen eller ring til os." };
  }
}
