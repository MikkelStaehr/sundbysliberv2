import type { Metadata } from "next";
import { CatalogSections } from "@/components/CatalogSections";
import { CartSummary } from "@/components/CartSummary";
import { MobileCartBar } from "@/components/MobileCartBar";
import { StepIndicator } from "@/components/StepIndicator";

export const metadata: Metadata = {
  title: "Bestil slibning – Knive & værktøj | Sundby Sliberi",
  description:
    "Vælg knive, værktøj og haveredskaber til slibning hos Sundby Sliberi. Se priser, læg i kurv og send din bestilling – vi ringer dig op og aftaler pris og dag.",
};

export default function Bestil() {
  return (
    <main className="mx-auto w-full max-w-none px-[20px] pt-[40px] pb-[112px] md:px-[32px] lg:px-[48px] xl:px-[72px] md:pt-[56px] lg:pb-[64px]">
      {/* Trin-indikator — kunden ved hvor i forløbet de er */}
      <StepIndicator step={1} />

      <h1 className="mt-[14px] font-display text-3xl uppercase text-ink md:text-5xl">
        Vælg dine ydelser
      </h1>
      <p className="mt-[12px] max-w-[60ch] text-base leading-relaxed text-muted">
        Læg det du vil have slebet i kurven. Alt er samlet efter type herunder. Prisen er
        vejledende; vi aftaler det endelige, før du betaler noget.
      </p>

      <div className="mt-[32px] grid gap-[24px] lg:grid-cols-[1fr_360px]">
        <CatalogSections />

        {/* Desktop: fast kurv-panel i siden */}
        <aside className="hidden lg:block">
          <div className="lg:sticky lg:top-[96px]">
            <CartSummary variant="cart" ctaHref="/aflevering" ctaLabel="Videre til bestilling" />
          </div>
        </aside>
      </div>

      {/* Mobil: fast kurv-bar nederst */}
      <MobileCartBar />
    </main>
  );
}
