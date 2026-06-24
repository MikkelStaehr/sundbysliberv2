"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-[8px] rounded-full border border-line px-[20px] py-[12px] text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent print:hidden"
    >
      <Printer className="h-[18px] w-[18px]" strokeWidth={1.7} aria-hidden="true" />
      Print / gem som PDF
    </button>
  );
}
