import type { Metadata } from "next";
import Link from "next/link";
import { OrderForm } from "@/components/OrderForm";
import { CartSummary } from "@/components/CartSummary";

export const metadata: Metadata = {
  title: "Bestilling – dine oplysninger | Sundby Sliberi",
  description:
    "Udfyld dine oplysninger, så ringer vi dig op og aftaler pris og dag. Ingen onlinebetaling.",
};

export default function Aflevering() {
  return (
    <main className="mx-auto w-full max-w-none px-[20px] py-[48px] md:px-[32px] lg:px-[48px] xl:px-[72px] md:py-[64px]">
      {/* Trin-indikator — nu på trin 2 (trin 1 er klikbar tilbage til webshop) */}
      <div className="flex items-center gap-[10px]">
        <Link href="/bestil" className="kicker text-muted transition-colors hover:text-ink">
          1 · Vælg ydelser
        </Link>
        <span aria-hidden="true" className="h-[1px] w-[28px] bg-line" />
        <span className="kicker text-accent">2 · Dine oplysninger</span>
      </div>

      <div className="mt-[24px] grid gap-[40px] lg:grid-cols-[1fr_340px]">
        <OrderForm />
        <aside className="lg:sticky lg:top-[96px] lg:self-start">
          <CartSummary variant="summary" />
        </aside>
      </div>
    </main>
  );
}
