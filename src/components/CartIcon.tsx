"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";

export function CartIcon() {
  const { count } = useCart();

  return (
    <Link
      href="/bestil"
      aria-label={`Kurv${count > 0 ? `, ${count} varer` : ""}`}
      className="relative inline-flex h-[40px] w-[40px] items-center justify-center text-ink transition-colors hover:text-clay"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-[22px] w-[22px]" aria-hidden="true">
        <path
          d="M3 4h2l2.2 11.2a1.5 1.5 0 0 0 1.5 1.2h8.1a1.5 1.5 0 0 0 1.5-1.2L21 7H6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9.5" cy="20" r="1.2" fill="currentColor" />
        <circle cx="17.5" cy="20" r="1.2" fill="currentColor" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-[2px] -top-[2px] inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-clay px-[5px] text-[11px] font-medium leading-none text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
