"use client";

import { useCallback, useEffect, useState } from "react";
import type { Service } from "@/data/services";

/*
  Kurv-mekanik samlet ét sted. Bevarer den eksisterende localStorage-tilgang
  (nøgle sliberi_cart_v1) og udsender et event ved hver ændring, så fx
  header-badgen kan opdatere live. Ingen rabatlogik.
*/

export const CART_KEY = "sliberi_cart_v1";
export const CART_EVENT = "sliberi-cart-changed";

export type CartItem = {
  id: string;
  navn: string;
  pris: number;
  qty: number;
};

export function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    return [];
  }
}

function persist(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {
    /* localStorage utilgængelig — ignorér */
  }
  window.dispatchEvent(new Event(CART_EVENT));
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, it) => sum + it.qty, 0);
}

export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, it) => sum + it.pris * it.qty, 0);
}

/** Reaktiv kurv til client-komponenter. */
export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(readCart());
    const sync = () => setItems(readCart());
    window.addEventListener(CART_EVENT, sync);
    window.addEventListener("storage", sync); // andre faner
    return () => {
      window.removeEventListener(CART_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const add = useCallback((service: Pick<Service, "id" | "navn" | "pris">) => {
    const next = readCart();
    const idx = next.findIndex((it) => it.id === service.id);
    if (idx >= 0) {
      next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
    } else {
      next.push({ id: service.id, navn: service.navn, pris: service.pris, qty: 1 });
    }
    persist(next);
  }, []);

  const inc = useCallback((id: string) => {
    persist(readCart().map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it)));
  }, []);

  const dec = useCallback((id: string) => {
    persist(
      readCart()
        .map((it) => (it.id === id ? { ...it, qty: it.qty - 1 } : it))
        .filter((it) => it.qty > 0)
    );
  }, []);

  const remove = useCallback((id: string) => {
    persist(readCart().filter((it) => it.id !== id));
  }, []);

  const clear = useCallback(() => persist([]), []);

  return {
    items,
    count: cartCount(items),
    total: cartTotal(items),
    add,
    inc,
    dec,
    remove,
    clear,
  };
}
