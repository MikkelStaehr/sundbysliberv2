import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { parseOrderToken } from "@/lib/orderToken";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      token?: string;
      dropoff?: string;
      pickup?: string | null;
    };

    const { token, dropoff, pickup } = body;

    if (!token || !dropoff) {
      return NextResponse.json({ error: "Manglende data." }, { status: 400 });
    }

    const order = parseOrderToken(token);
    if (!order) {
      return NextResponse.json({ error: "Linket er udløbet eller ugyldigt." }, { status: 400 });
    }

    const dropoffDate = new Date(dropoff);
    if (isNaN(dropoffDate.getTime())) {
      return NextResponse.json({ error: "Afleveringstidspunktet er ugyldigt." }, { status: 400 });
    }

    let pickupDate: Date | null = null;
    if (pickup) {
      pickupDate = new Date(pickup);
      if (isNaN(pickupDate.getTime())) {
        return NextResponse.json({ error: "Afhentningstidspunktet er ugyldigt." }, { status: 400 });
      }
      const minPickup = new Date(dropoffDate.getTime() + 24 * 60 * 60 * 1000);
      if (pickupDate.getTime() < minPickup.getTime()) {
        return NextResponse.json(
          { error: "Afhentningstidspunktet skal ligge mindst 24 timer efter aflevering." },
          { status: 400 }
        );
      }
    }

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      ORDER_TO_EMAIL,
      ORDER_FROM_EMAIL,
    } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !ORDER_TO_EMAIL) {
      console.error("SMTP konfiguration mangler til schedule-order.");
      return NextResponse.json(
        { error: "Server opsætning til e-mail mangler." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const formatDate = (d: Date) =>
      d.toLocaleString("da-DK", {
        timeZone: "Europe/Copenhagen",
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

    const dropoffText = formatDate(dropoffDate);
    const pickupText = pickupDate ? formatDate(pickupDate) : "-";

    // Google Kalender link (skabelon) – kan tilpasses efter behov
    const encode = encodeURIComponent;
    const calendarTitle = encode("Slibning – Sundby Sliberi");
    const calendarDetails = encode(
      `Kunde: ${order.form.name}\nTelefon: ${order.form.phone}\nEmail: ${order.form.email || "-"}\n\nAflevering: ${dropoffText}\nAfhentning: ${pickupText}`
    );
    const calendarLocation = encode("Hamborgskovvej 11, 4800 Sundby, Nykøbing Falster");

    const toGoogleDate = (d: Date) => {
      // YYYYMMDDTHHMMSS format i lokal tid (uden Z), Google bruger ctz-parameter til tidszone
      const pad = (n: number) => n.toString().padStart(2, "0");
      const year = d.getFullYear();
      const month = pad(d.getMonth() + 1);
      const day = pad(d.getDate());
      const hour = pad(d.getHours());
      const minute = pad(d.getMinutes());
      return `${year}${month}${day}T${hour}${minute}00`;
    };

    const startStr = toGoogleDate(dropoffDate);
    const endBase = pickupDate ?? new Date(dropoffDate.getTime() + 60 * 60 * 1000);
    const endStr = toGoogleDate(endBase);

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calendarTitle}&details=${calendarDetails}&location=${calendarLocation}&dates=${startStr}/${endStr}&ctz=Europe/Copenhagen`;

    const text = `Hej Sundby Sliberi,

Kunden har nu valgt tider for aflevering og evt. afhentning.

Kunde:
Navn: ${order.form.name}
Telefon: ${order.form.phone}
Email: ${order.form.email || "-"}

Aflevering:
${dropoffText}

Afhentning (valgfri):
${pickupText}

Forslag til Google Kalender-aftale:
${googleCalendarUrl}

Venlig hilsen
Sundby Sliberi website
`;

    await transporter.sendMail({
      from: ORDER_FROM_EMAIL || SMTP_USER,
      to: ORDER_TO_EMAIL,
      subject: "Tidsvalg for bestilling – Sundby Sliberi",
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Fejl ved schedule-order:", err);
    const message =
      err instanceof Error
        ? err.message
        : "Der opstod en ukendt fejl under håndtering af tidsvalg.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


