import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

type CallbackPayload = {
  name: string;
  phone: string;
  time: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CallbackPayload;
    const { name, phone, time } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Navn og telefonnummer er påkrævet." },
        { status: 400 }
      );
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
      console.error("SMTP konfiguration mangler til ring-op.");
      return NextResponse.json(
        { error: "Server opsætning til e-mail mangler." },
        { status: 500 }
      );
    }

    const text = `Hej Sundby Sliberi,

En kunde ønsker at blive ringet op.

Navn: ${name}
Telefon: ${phone}
Foretrukket tidspunkt: ${time || "Når som helst"}

Venlig hilsen
Sundby Sliberi website
`;

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: ORDER_FROM_EMAIL || SMTP_USER,
      to: ORDER_TO_EMAIL,
      subject: `Ring-op ønske fra ${name} – Sundby Sliberi`,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Fejl ved ring-op:", err);
    const message =
      err instanceof Error
        ? err.message
        : "Der opstod en ukendt fejl under afsendelse af e-mailen.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
