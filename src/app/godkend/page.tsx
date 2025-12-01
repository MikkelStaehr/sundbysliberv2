import { Roboto_Slab, Inter } from "next/font/google";
import { parseOrderToken } from "@/lib/orderToken";
import { redirect } from "next/navigation";

const robotoSlab = Roboto_Slab({ subsets: ["latin"], weight: ["400", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

type Props = {
  searchParams: {
    token?: string;
  };
};

export default function GodkendBestilling({ searchParams }: Props) {
  const token = searchParams.token;

  if (!token) {
    redirect("/");
  }

  const order = parseOrderToken(token);

  if (!order) {
    return (
      <main
        className={`${inter.className} min-h-screen bg-[#F9F7F3] text-neutral-900 px-8 py-12 w-full max-w-[90rem] mx-auto flex items-center justify-center`}
      >
        <div className="max-w-lg rounded-2xl border border-neutral-200 bg-white shadow-sm px-8 py-10 text-center">
          <h1 className={`${robotoSlab.className} text-2xl text-neutral-900 mb-3`}>
            Linket er desværre udløbet eller ugyldigt
          </h1>
          <p className="text-sm text-neutral-700">
            Tjek om du har åbnet det nyeste godkendelseslink fra den seneste bestillingsmail.
          </p>
        </div>
      </main>
    );
  }

  const { cart, cartTotal, delivery, pickupFee, express, expressFee, form } = order;

  const deliveryAmount = delivery === "pickup" ? pickupFee : 0;
  const expressAmount = express ? expressFee : 0;
  const subtotalAfterFees = cartTotal + deliveryAmount + expressAmount;

  return (
    <main
      className={`${inter.className} min-h-screen bg-[#F9F7F3] text-neutral-900 px-8 py-12 w-full max-w-[90rem] mx-auto flex items-center justify-center`}
    >
      <div className="w-full max-w-2xl rounded-2xl border border-neutral-200 bg-white shadow-sm px-8 py-10">
        <h1 className={`${robotoSlab.className} text-3xl text-neutral-900 mb-4`}>
          Godkend bestilling
        </h1>
        <p className="text-sm text-neutral-700 mb-6">
          Her kan du godkende bestillingen og sende en bekræftelsesmail til kunden med link til
          valg af tidspunkt for aflevering og evt. afhentning.
        </p>

        <section className="mb-6">
          <h2 className={`${robotoSlab.className} text-lg text-neutral-900 mb-2`}>Kunde</h2>
          <dl className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-1 text-sm text-neutral-800">
            <dt className="text-neutral-500">Navn</dt>
            <dd>{form.name}</dd>
            <dt className="text-neutral-500">Telefon</dt>
            <dd>{form.phone}</dd>
            <dt className="text-neutral-500">E-mail</dt>
            <dd>{form.email || "-"}</dd>
            {(form.address || form.postalCode || form.city) && (
              <>
                <dt className="text-neutral-500">Adresse</dt>
                <dd>
                  {form.address || "-"}
                  {(form.postalCode || form.city) && (
                    <>
                      <br />
                      {form.postalCode} {form.city}
                    </>
                  )}
                </dd>
              </>
            )}
          </dl>
        </section>

        <section className="mb-6">
          <h2 className={`${robotoSlab.className} text-lg text-neutral-900 mb-2`}>Tidspunkter</h2>
          {form.dropoffAt ? (
            <dl className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-1 text-sm text-neutral-800">
              <dt className="text-neutral-500">Aflevering</dt>
              <dd>
                {new Date(form.dropoffAt).toLocaleString("da-DK", {
                  timeZone: "Europe/Copenhagen",
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </dd>
              <dt className="text-neutral-500">Afhentning</dt>
              <dd>
                {form.pickupAt
                  ? new Date(form.pickupAt).toLocaleString("da-DK", {
                      timeZone: "Europe/Copenhagen",
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Ingen valgt"}
              </dd>
            </dl>
          ) : (
            <p className="text-sm text-neutral-700">
              Der er ikke valgt tidspunkter endnu. Aftal tid direkte med kunden.
            </p>
          )}
        </section>

        <section className="mb-6">
          <h2 className={`${robotoSlab.className} text-lg text-neutral-900 mb-2`}>Indhold</h2>
          {cart.length === 0 ? (
            <p className="text-sm text-neutral-700">Ingen varer registreret i bestillingen.</p>
          ) : (
            <ul className="space-y-1 text-sm text-neutral-800">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between gap-3">
                  <span>
                    {item.name} × {item.qty}
                  </span>
                  <span className="tabular-nums">{item.price * item.qty} kr</span>
                </li>
              ))}
            </ul>
          )}
          <div className="border-t border-neutral-200 mt-3 pt-3 text-sm text-neutral-800 space-y-1">
            <div className="flex justify-between">
              <span>Kurv i alt</span>
              <span className="tabular-nums">{cartTotal} kr</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Afhentningsgebyr</span>
              <span className="tabular-nums">{deliveryAmount ? `${deliveryAmount} kr` : "0 kr"}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Ekspres</span>
              <span className="tabular-nums">{expressAmount ? `${expressAmount} kr` : "0 kr"}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>I alt (ekskl. evt. rabat)</span>
              <span className="tabular-nums">{subtotalAfterFees} kr</span>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <h2 className={`${robotoSlab.className} text-lg text-neutral-900 mb-2`}>Næste skridt</h2>
          <p className="text-sm text-neutral-700 mb-3">
            Når du godkender bestillingen, sender vi en bekræftelsesmail til kunden med en kvittering
            for bestillingen og de valgte tidspunkter. Du modtager samtidig en mail med et forslag til
            en Google Kalender-aftale.
          </p>
        </section>

        <form
          action={`/api/send-confirmation`}
          method="post"
          className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between"
        >
          <input type="hidden" name="token" value={token} />
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 text-white px-6 py-3 text-sm hover:bg-neutral-700 transition-colors"
          >
            Godkend bestilling og send bekræftelse
          </button>
          <p className="text-xs text-neutral-500">
            Sørg for at oplysningerne ser rigtige ud, inden du godkender.
          </p>
        </form>
      </div>
    </main>
  );
}


