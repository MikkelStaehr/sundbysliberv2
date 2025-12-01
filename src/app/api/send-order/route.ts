import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { computeKnifeDiscount, CartLikeItem } from "@/lib/pricing";
import { createOrderToken } from "@/lib/orderToken";

type CartItem = CartLikeItem & {
  name: string;
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
    dropoffAt?: string;
    pickupAt?: string | null;
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
      form: { name, phone, email, address, postalCode, city, notes, dropoffAt, pickupAt },
    } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Navn og telefon er påkrævet." },
        { status: 400 }
      );
    }

    // Valider tider her også
    if (!dropoffAt) {
      return NextResponse.json(
        { error: "Vælg venligst et tidspunkt for aflevering." },
        { status: 400 }
      );
    }

    const dropoffDate = new Date(dropoffAt);
    if (isNaN(dropoffDate.getTime())) {
      return NextResponse.json(
        { error: "Afleveringstidspunktet er ugyldigt." },
        { status: 400 }
      );
    }

    let pickupDate: Date | null = null;
    if (pickupAt) {
      pickupDate = new Date(pickupAt);
      if (isNaN(pickupDate.getTime())) {
        return NextResponse.json(
          { error: "Afhentningstidspunktet er ugyldigt." },
          { status: 400 }
        );
      }
      if (!express) {
        const minPickup = new Date(dropoffDate.getTime() + 24 * 60 * 60 * 1000);
        if (pickupDate.getTime() < minPickup.getTime()) {
          return NextResponse.json(
            { error: "Afhentningstidspunktet skal ligge mindst 24 timer efter aflevering, medmindre ekspres er valgt." },
            { status: 400 }
          );
        }
      }
    }

    const cartLines =
      cart.length > 0
        ? cart
            .map(
              (c) => `${c.name} × ${c.qty} = ${c.price * c.qty} kr`
            )
            .join("\n")
        : "-";

    const { discountAmount, discountRate, knifeCount } = computeKnifeDiscount(cart);
    const deliveryAmount = delivery === "pickup" ? pickupFee : 0;
    const expressAmount = express ? expressFee : 0;
    const cartTotalAfterDiscount = cartTotal - discountAmount;
    const total = cartTotalAfterDiscount + deliveryAmount + expressAmount;

    const orderForToken = {
      cart,
      cartTotal,
      delivery,
      pickupFee,
      express,
      expressFee,
      form: { name, phone, email, address, postalCode, city, notes, dropoffAt: dropoffAt || "", pickupAt: pickupAt || "" },
      createdAt: new Date().toISOString(),
    };

    const token = createOrderToken(orderForToken);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://sundby-sliberi.dk";
    const approveUrl = `${baseUrl}/godkend?token=${encodeURIComponent(token)}`;

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

    const text = `Hej Sundby Sliberi,

Jeg vil gerne bestille slibning.

Varer:
${cartLines}

Kurv i alt (før rabat): ${cartTotal} kr
Rabat på knive: ${discountAmount > 0 ? `-${discountAmount} kr (${Math.round(discountRate * 100)}% på ${knifeCount >= 6 ? "6+ knive" : "3+ knive"})` : "0 kr"}
Kurv i alt (efter rabat): ${cartTotalAfterDiscount} kr
Afhentningsgebyr: ${deliveryAmount ? deliveryAmount + " kr" : "0 kr"}
Ekspresgebyr: ${expressAmount ? expressAmount + " kr" : "0 kr"}
Total: ${total} kr

Afleveringstidspunkt:
${dropoffText}

Afhentningstidspunkt (valgfri):
${pickupText}

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

---

Godkendelse:
Du kan godkende bestillingen og sende en bekræftelse til kunden ved at åbne linket her:
${approveUrl}

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


