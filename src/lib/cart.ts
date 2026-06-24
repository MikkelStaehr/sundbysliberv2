"use client";

import { useCallback, useEffect, useState } from "react";
import type { Service } from "@/data/services";

/*
  Kurv-mekanik samlet ét sted. Gemmer i localStorage (nøgle sliberi_cart_v2)
  og udsender et event ved hver ændring, så fx header-badgen kan opdatere live.
  Ingen rabatlogik.

  Nøglen er v2: en tidligere datamodel brugte v1 med andre feltnavne, så gamle
  kurve gav varer uden navn og "NaN"-pris. readCart() validerer desuden hver
  vare, så ugyldige/ufuldstændige poster aldrig kan rendere.
*/

export const CART_KEY = "sliberi_cart_v2";
export const CART_EVENT = "sliberi-cart-changed";

export type CartItem = {
  id: string;
  navn: string;
  pris: number;
  qty: number;
};

function isValidItem(it: unknown): it is CartItem {
  if (it === null || typeof it !== "object") return false;
  const o = it as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    o.id.length > 0 &&
    typeof o.navn === "string" &&
    o.navn.length > 0 &&
    typeof o.pris === "number" &&
    Number.isFinite(o.pris) &&
    typeof o.qty === "number" &&
    Number.isFinite(o.qty) &&
    o.qty > 0
  );
}

export function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Frasortér ugyldige poster, så en korrupt kurv aldrig viser tomme navne/NaN.
    return parsed.filter(isValidItem).map((it) => ({
      id: it.id,
      navn: it.navn,
      pris: it.pris,
      qty: it.qty,
    }));
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
