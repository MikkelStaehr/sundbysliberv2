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

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://sundby-sliberi.dk";
    const scheduleUrl = `${baseUrl}/planlaeg-aflevering?token=${encodeURIComponent(token)}`;

    if (order.form.email) {
      const text = `Hej ${order.form.name},

Tak for din bestilling hos Sundby Sliberi. Vi har nu gennemgået og godkendt din bestilling.

Næste skridt:
Vælg det tidspunkt, der passer dig bedst til aflevering – og eventuelt afhentning – via linket her:
${scheduleUrl}

Du vælger først et tidspunkt for aflevering (dato og klokkeslæt). Derefter kan du (valgfrit) vælge et tidspunkt for afhentning, som skal ligge mindst 24 timer efter aflevering.

Har du spørgsmål, er du altid velkommen til at svare på denne mail eller kontakte os på telefon.

Venlig hilsen
Sundby Sliberi
`;

      await transporter.sendMail({
        from: ORDER_FROM_EMAIL || SMTP_USER,
        to: order.form.email,
        subject: "Bekræftelse af bestilling – Sundby Sliberi",
        text,
      });
    }

    // Efter afsendelse sender vi brugeren tilbage til forsiden
    return NextResponse.redirect(new URL("/", req.url));
  } catch (err) {
    console.error("Fejl ved send-confirmation:", err);
    return NextResponse.redirect(new URL("/", req.url));
  }
}


