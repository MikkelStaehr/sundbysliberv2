import { NextRequest, NextResponse } from "next/server";
import { sendNotification } from "@/lib/email";

type ErhvervPayload = {
  name: string;
  company: string;
  cvr: string;
  email: string;
  phone: string;
  message: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ErhvervPayload;
    const { name, company, cvr, email, phone, message } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Navn og e-mail er påkrævet." }, { status: 400 });
    }

    const text = `Hej Sundby Sliberi,

Der er sendt en ny erhvervshenvendelse fra hjemmesiden.

Virksomhed: ${company || "-"}
CVR-nummer: ${cvr || "-"}
Kontaktperson: ${name}
Telefon: ${phone || "-"}
Email: ${email}

Besked:
${message || "-"}

Venlig hilsen
Sundby Sliberi website
`;

    const result = await sendNotification({
      subject: `Ny erhvervshenvendelse fra ${name} – Sundby Sliberi`,
      text,
      replyTo: email,
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Fejl ved erhverv-contact:", err);
    return NextResponse.json({ error: "Der opstod en fejl under afsendelse." }, { status: 500 });
  }
}
