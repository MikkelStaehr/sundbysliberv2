"use client";

import { useState } from "react";
import { StepIndicator } from "./StepIndicator";
import { OrderForm } from "./OrderForm";
import { CartSummary } from "./CartSummary";

// Trin 2-3 i bestillingsflowet. Når formularen er sendt, rykker indikatoren til
// trin 3 (Bekræftelse) og kurv-opsummeringen skjules.
export function OrderFlow() {
  const [done, setDone] = useState(false);

  return (
    <>
      <StepIndicator step={done ? 3 : 2} />

      <div className={`mt-[24px] grid gap-[40px] ${done ? "" : "lg:grid-cols-[1fr_340px]"}`}>
        <OrderForm onDone={() => setDone(true)} />
        {!done && (
          <aside className="lg:sticky lg:top-[96px] lg:self-start">
            <CartSummary variant="summary" />
          </aside>
        )}
      </div>
    </>
  );
}
