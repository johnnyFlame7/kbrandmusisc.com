"use client";
import { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
  productId: number;
  name: string;
  price: number;
  image: string;
  size: string;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  add: (item: CartItem) => void;
  updateQty: (productId: number, size: string, qty: number) => void;
  remove: (productId: number, size: string) => void;
  clear: () => void;
  count: number;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const s = localStorage.getItem("kb_cart");
      if (s) setItems(JSON.parse(s));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem("kb_cart", JSON.stringify(items));
    } catch {}
  }, [items, loaded]);

  function add(item: CartItem) {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId && i.size === item.size);
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId && i.size === item.size ? { ...i, qty: i.qty + item.qty } : i
        );
      }
      return [...prev, item];
    });
  }
  function updateQty(productId: number, size: string, qty: number) {
    setItems((prev) => prev.map((i) => (i.productId === productId && i.size === size ? { ...i, qty: Math.max(1, qty) } : i)));
  }
  function remove(productId: number, size: string) {
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.size === size)));
  }
  function clear() {
    setItems([]);
  }
  const count = items.reduce((a, i) => a + i.qty, 0);

  return <Ctx.Provider value={{ items, add, updateQty, remove, clear, count }}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
