import crypto from "crypto";

type OrderForm = {
  name: string;
  phone: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
  notes: string;
  dropoffAt: string;
  pickupAt: string;
};

type OrderForToken = {
  cart: {
    id: string;
    name: string;
    qty: number;
    price: number;
    category?: string;
  }[];
  cartTotal: number;
  delivery: "dropoff" | "pickup";
  pickupFee: number;
  express: boolean;
  expressFee: number;
  form: OrderForm;
  createdAt: string;
};

const TOKEN_SECRET = process.env.ORDER_TOKEN_SECRET;

function getSecret() {
  if (!TOKEN_SECRET) {
    throw new Error("ORDER_TOKEN_SECRET mangler i miljøvariablerne.");
  }
  return TOKEN_SECRET;
}

export function createOrderToken(order: OrderForToken): string {
  const secret = getSecret();
  const payload = JSON.stringify(order);
  const payloadBase64 = Buffer.from(payload, "utf8").toString("base64url");
  const sig = crypto.createHmac("sha256", secret).update(payloadBase64).digest("base64url");
  return `${payloadBase64}.${sig}`;
}

export function parseOrderToken(token: string): OrderForToken | null {
  try {
    const secret = getSecret();
    const [payloadBase64, sig] = token.split(".");
    if (!payloadBase64 || !sig) return null;
    const expectedSig = crypto.createHmac("sha256", secret).update(payloadBase64).digest("base64url");
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig))) {
      return null;
    }
    const json = Buffer.from(payloadBase64, "base64url").toString("utf8");
    return JSON.parse(json) as OrderForToken;
  } catch {
    return null;
  }
}


