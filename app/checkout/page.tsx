"use client";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";

export default function Checkout() {
  const { items } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0);
  const shipping = subtotal > 100 ? 0 : 8;
  const total = subtotal + shipping;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const customer = {
      name: `${form.get("firstName")} ${form.get("lastName")}`,
      email: String(form.get("email")),
      address: String(form.get("address")),
      city: String(form.get("city")),
      postalCode: String(form.get("postalCode")),
      country: String(form.get("country")),
    };
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, customer }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return <div className="max-w-6xl mx-auto px-5 py-16 text-center text-muted">Your cart is empty.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-12">
      <h1 className="font-display mb-8" style={{ fontSize: "clamp(34px,7vw,60px)" }}>Checkout</h1>
      <div className="grid md:grid-cols-[1.5fr_1fr] gap-10 items-start">
        <form onSubmit={handleSubmit}>
          <h3 className="text-xs uppercase tracking-wide font-extrabold mb-3.5">Customer Information</h3>
          <div className="grid grid-cols-2 gap-3.5 mb-3.5">
            <div><label className="label">First Name</label><input name="firstName" required className="input" /></div>
            <div><label className="label">Last Name</label><input name="lastName" required className="input" /></div>
          </div>
          <div className="mb-4"><label className="label">Email</label><input name="email" type="email" required className="input" /></div>

          <h3 className="text-xs uppercase tracking-wide font-extrabold mb-3.5 mt-6">Shipping Address</h3>
          <div className="mb-3.5"><label className="label">Address</label><input name="address" required className="input" /></div>
          <div className="grid grid-cols-2 gap-3.5 mb-3.5">
            <div><label className="label">City</label><input name="city" required className="input" /></div>
            <div><label className="label">Postal Code</label><input name="postalCode" required className="input" /></div>
          </div>
          <div className="mb-4"><label className="label">Country</label><input name="country" required className="input" /></div>

          <div className="text-xs text-muted border border-dashed border-line p-3.5 mt-2">
            You'll enter card details securely on the next screen, hosted directly by Stripe. This site never sees or stores your card number.
          </div>
          {error && <div className="text-sm text-red-400 mt-3">{error}</div>}
          <button className="btn btn-solid w-full mt-5" type="submit" disabled={loading}>
            {loading ? "Redirecting to Stripe…" : `Continue to Payment — $${total.toFixed(2)}`}
          </button>
        </form>
        <div className="bg-card border border-line p-6">
          <h3 className="text-xs uppercase tracking-wide font-extrabold mb-3.5">Order Summary</h3>
          {items.map((c) => (
            <div key={c.productId + c.size} className="flex gap-2.5 text-sm py-2 border-b border-line">
              <img src={c.image} alt={c.name} className="w-11 h-14 object-cover" />
              <div><div className="font-bold">{c.name}</div><div className="text-muted">Size {c.size} × {c.qty}</div></div>
              <div className="ml-auto font-bold">${(c.price * c.qty).toFixed(2)}</div>
            </div>
          ))}
          <div className="flex justify-between text-sm text-neutral-300 mt-4 mb-2.5"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between text-sm text-neutral-300 mb-2.5"><span>Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
          <div className="flex justify-between text-lg font-extrabold pt-3.5 border-t border-line"><span>Total</span><span>${total.toFixed(2)}</span></div>
        </div>
      </div>
    </div>
  );
}
