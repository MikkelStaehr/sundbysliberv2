import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { parseOrderToken } from "@/lib/orderToken";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const token = formData.get("token");

    if (!token || typeof token !== "string") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const order = parseOrderToken(token);
    if (!order) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      ORDER_FROM_EMAIL,
      ORDER_TO_EMAIL,
    } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      console.error("SMTP konfiguration mangler til send-confirmation.");
      return NextResponse.redirect(new URL("/", req.url));
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

    const formatDate = (value?: string) => {
      if (!value) return "-";
      const d = new Date(value);
      if (isNaN(d.getTime())) return "-";
      return d.toLocaleString("da-DK", {
        timeZone: "Europe/Copenhagen",
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const dropoffText = formatDate(order.form.dropoffAt);
    const pickupText = formatDate(order.form.pickupAt);

    if (order.form.email) {
      const customerText = `Hej ${order.form.name},

Tak for din bestilling hos Sundby Sliberi. Vi har nu gennemgået og godkendt din bestilling.

Oversigt:
Aflevering: ${dropoffText}
Afhentning (valgfri): ${pickupText}

Har du spørgsmål eller ønsker til ændringer, er du altid velkommen til at svare på denne mail
eller kontakte os på telefon 31 38 61 19.

Venlig hilsen
Sundby Sliberi
`;

      await transporter.sendMail({
        from: ORDER_FROM_EMAIL || SMTP_USER,
        to: order.form.email,
        subject: "Bekræftelse af bestilling – Sundby Sliberi",
        text: customerText,
      });
    }

    if (ORDER_TO_EMAIL) {
      const encode = encodeURIComponent;
      const calendarTitle = encode("Slibning – Sundby Sliberi");
      const calendarDetails = encode(
        `Kunde: ${order.form.name}\nTelefon: ${order.form.phone}\nEmail: ${order.form.email || "-"}\n\nAflevering: ${dropoffText}\nAfhentning: ${pickupText}`
      );
      const calendarLocation = encode("Hamborgskovvej 11, 4800 Sundby, Nykøbing Falster");

      const toGoogleDate = (value?: string, fallbackHours = 0) => {
        const base = value ? new Date(value) : new Date(Date.now() + fallbackHours * 60 * 60 * 1000);
        if (isNaN(base.getTime())) return "";
        const pad = (n: number) => n.toString().padStart(2, "0");
        const year = base.getFullYear();
        const month = pad(base.getMonth() + 1);
        const day = pad(base.getDate());
        const hour = pad(base.getHours());
        const minute = pad(base.getMinutes());
        return `${year}${month}${day}T${hour}${minute}00`;
      };

      const startStr = toGoogleDate(order.form.dropoffAt);
      const endStr =
        toGoogleDate(order.form.pickupAt) ||
        toGoogleDate(order.form.dropoffAt, 1);

      const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calendarTitle}&details=${calendarDetails}&location=${calendarLocation}&dates=${startStr}/${endStr}&ctz=Europe/Copenhagen`;

      const internalText = `Hej Sundby Sliberi,

Bestillingen er nu godkendt, og kunden har valgt tidspunkter.

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
        subject: "Godkendt bestilling – tidsoversigt",
        text: internalText,
      });
    }

    // Efter afsendelse sender vi brugeren tilbage til forsiden
    return NextResponse.redirect(new URL("/", req.url));
  } catch (err) {
    console.error("Fejl ved send-confirmation:", err);
    return NextResponse.redirect(new URL("/", req.url));
  }
}


