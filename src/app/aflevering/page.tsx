import type { Metadata } from "next";
import { OrderFlow } from "@/components/OrderFlow";

export const metadata: Metadata = {
  title: "Bestilling – dine oplysninger | Sundby Sliberi",
  description:
    "Udfyld dine oplysninger, så ringer jeg dig op og aftaler pris og dag. Ingen onlinebetaling.",
};

export default function Aflevering() {
  return (
    <main className="mx-auto w-full max-w-none px-[20px] py-[48px] md:px-[32px] lg:px-[48px] xl:px-[72px] md:py-[64px]">
      <OrderFlow />
    </main>
  );
}
