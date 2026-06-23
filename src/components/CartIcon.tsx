"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";

export function CartIcon() {
  const { count } = useCart();

  return (
    <Link
      href="/bestil"
      aria-label={`Kurv${count > 0 ? `, ${count} varer` : ""}`}
      className="relative inline-flex h-[40px] w-[40px] items-center justify-center text-ink transition-colors hover:text-accent"
    >
      <ShoppingCart className="h-[22px] w-[22px]" strokeWidth={1.6} aria-hidden="true" />
      {count > 0 && (
        <span className="absolute -right-[2px] -top-[2px] inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-[5px] text-[11px] font-medium leading-none text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
