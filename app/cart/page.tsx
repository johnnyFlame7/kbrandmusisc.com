"use client";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function Cart() {
  const { items, updateQty, remove } = useCart();
  const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0);
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 8;
  const total = subtotal + shipping;

  return (
    <div className="max-w-6xl mx-auto px-5 py-12">
      <h1 className="font-display mb-8" style={{ fontSize: "clamp(34px,7vw,60px)" }}>Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-center py-16 text-muted">
          <p>Your cart is empty.</p>
          <Link href="/shop" className="btn btn-solid mt-4 inline-flex">Shop Now</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-[1.6fr_1fr] gap-9 items-start">
          <div>
            {items.map((c) => (
              <div key={c.productId + c.size} className="grid grid-cols-[88px_1fr_auto] gap-4 items-center py-4 border-b border-line">
                <img src={c.image} alt={c.name} className="w-[88px] h-[110px] object-cover" />
                <div>
                  <p className="font-bold text-sm">{c.name}</p>
                  <div className="text-muted text-xs">Size: {c.size} · ${c.price.toFixed(2)}</div>
                  <div className="flex items-center border border-line w-fit mt-2">
                    <button className="w-7 h-7" onClick={() => updateQty(c.productId, c.size, c.qty - 1)}>−</button>
                    <span className="w-7 text-center text-sm">{c.qty}</span>
                    <button className="w-7 h-7" onClick={() => updateQty(c.productId, c.size, c.qty + 1)}>+</button>
                  </div>
                  <button className="text-muted text-xs underline mt-2" onClick={() => remove(c.productId, c.size)}>Remove</button>
                </div>
                <div className="font-extrabold">${(c.price * c.qty).toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className="bg-card border border-line p-6">
            <div className="flex justify-between text-sm text-neutral-300 mb-3"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-sm text-neutral-300 mb-3"><span>Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
            <div className="flex justify-between text-lg font-extrabold pt-3.5 border-t border-line mb-5"><span>Total</span><span>${total.toFixed(2)}</span></div>
            <Link href="/checkout" className="btn btn-solid w-full">Checkout</Link>
          </div>
        </div>
      )}
    </div>
  );
}
