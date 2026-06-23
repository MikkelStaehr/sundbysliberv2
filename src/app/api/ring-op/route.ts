import { NextRequest, NextResponse } from "next/server";
import { sendNotification } from "@/lib/email";

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
      return NextResponse.json({ error: "Navn og telefonnummer er påkrævet." }, { status: 400 });
    }

    const text = `Hej Sundby Sliberi,

En kunde ønsker at blive ringet op.

Navn: ${name}
Telefon: ${phone}
Foretrukket tidspunkt: ${time || "Når som helst"}

Venlig hilsen
Sundby Sliberi website
`;

    const result = await sendNotification({
      subject: `Ring-op ønske fra ${name} – Sundby Sliberi`,
      text,
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Fejl ved ring-op:", err);
    return NextResponse.json({ error: "Der opstod en fejl under afsendelse." }, { status: 500 });
  }
}
