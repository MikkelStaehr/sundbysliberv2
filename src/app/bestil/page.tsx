import type { Metadata } from "next";
import { CatalogGrid } from "@/components/CatalogGrid";
import { CartSummary } from "@/components/CartSummary";

export const metadata: Metadata = {
  title: "Bestil slibning – Knive & værktøj | Sundby Sliberi",
  description:
    "Vælg knive, værktøj og haveredskaber til slibning hos Sundby Sliberi. Se priser, læg i kurv og send din bestilling – vi ringer dig op og aftaler pris og dag.",
};

export default function Bestil() {
  return (
    <main className="mx-auto w-full max-w-[1200px] px-[20px] py-[48px] md:px-[32px] md:py-[64px]">
      <p className="kicker text-clay">Webshop</p>
      <h1 className="mt-[10px] font-display text-[44px] text-ink md:text-[64px]">Vælg dine ydelser</h1>
      <p className="mt-[12px] max-w-[60ch] text-[15px] leading-relaxed text-muted">
        Læg de knive og det værktøj, du vil have slebet, i kurven. Prisen er vejledende — vi aftaler
        det endelige, før du betaler noget.
      </p>

      <div className="mt-[40px] grid gap-[40px] lg:grid-cols-[1fr_340px]">
        <CatalogGrid />
        <aside className="lg:sticky lg:top-[96px] lg:self-start">
          <CartSummary variant="cart" ctaHref="/aflevering" ctaLabel="Videre til bestilling" />
        </aside>
      </div>
    </main>
  );
}
