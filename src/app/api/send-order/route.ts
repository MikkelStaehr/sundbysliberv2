import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

type OrderPayload = {
  cart: CartItem[];
  cartTotal: number;
  delivery: "dropoff" | "pickup";
  pickupFee: number;
  express: boolean;
  expressFee: number;
  form: {
    name: string;
    phone: string;
    email: string;
    address: string;
    postalCode: string;
    city: string;
    notes: string;
  };
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as OrderPayload;

    const {
      cart,
      cartTotal,
      delivery,
      pickupFee,
      express,
      expressFee,
      form: { name, phone, email, address, postalCode, city, notes },
    } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Navn og telefon er påkrævet." },
        { status: 400 }
      );
    }

    const cartLines =
      cart.length > 0
        ? cart
            .map(
              (c) => `${c.name} × ${c.qty} = ${c.price * c.qty} kr`
            )
            .join("\n")
        : "-";

    const deliveryAmount = delivery === "pickup" ? pickupFee : 0;
    const expressAmount = express ? expressFee : 0;
    const total = cartTotal + deliveryAmount + expressAmount;

    const text = `Hej Sundby Sliberi,

Jeg vil gerne bestille slibning.

Varer:
${cartLines}

Kurv i alt: ${cartTotal} kr
Afhentningsgebyr: ${deliveryAmount ? deliveryAmount + " kr" : "0 kr"}
Ekspresgebyr: ${expressAmount ? expressAmount + " kr" : "0 kr"}
Total: ${total} kr

Aflevering: ${
      delivery === "dropoff"
        ? "Jeg afleverer selv"
        : "Jeg ønsker afhentning"
    }
Ekspres slibning: ${express ? "Ja" : "Nej"}

Navn: ${name}
Telefon: ${phone}
Email: ${email || "-"}
Adresse: ${address || "-"}
Postnr/By: ${postalCode || ""} ${city || ""}

Noter:
${notes || "-"}

Venlig hilsen
${name}
`;

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      ORDER_TO_EMAIL,
      ORDER_FROM_EMAIL,
    } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !ORDER_TO_EMAIL) {
      console.error("SMTP konfiguration mangler.");
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

    await transporter.sendMail({
      from: ORDER_FROM_EMAIL || SMTP_USER,
      to: ORDER_TO_EMAIL,
      subject: "Aflevering – Sundby Sliberi",
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Fejl ved send-order:", err);
    const message =
      err instanceof Error
        ? err.message
        : "Der opstod en ukendt fejl under afsendelse af e-mailen.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


