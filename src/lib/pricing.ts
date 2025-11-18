export type CartLikeItem = {
  id: string;
  price: number;
  qty: number;
  category?: string;
};

export function computeKnifeDiscount(cart: CartLikeItem[]) {
  const KNIFE_CATEGORY = "Knive";

  let knifeCount = 0;
  let knifeSubtotal = 0;

  for (const item of cart) {
    if (item.category === KNIFE_CATEGORY) {
      knifeCount += item.qty;
      knifeSubtotal += item.price * item.qty;
    }
  }

  const discountRate = knifeCount >= 6 ? 0.2 : knifeCount >= 3 ? 0.1 : 0;
  const discountAmount = Math.round(knifeSubtotal * discountRate);

  return {
    knifeCount,
    knifeSubtotal,
    discountRate,
    discountAmount,
  };
}


