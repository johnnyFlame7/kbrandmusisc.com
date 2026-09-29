"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { Product } from "@/components/ProductCard";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [p, setP] = useState<Product | null>(null);
  const [settings, setSettings] = useState<any>(null);
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const { add } = useCart();
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/products`).then((r) => r.json()).then((all: Product[]) => {
      const found = all.find((x) => x.id === Number(params.id));
      setP(found || null);
      if (found) setSize(found.sizes.split(",")[0]);
    });
    fetch("/api/settings").then((r) => r.json()).then(setSettings).catch(() => {});
  }, [params.id]);

  if (!p) return <div className="max-w-6xl mx-auto px-5 py-16 text-muted">Loading...</div>;
  const sizes = p.sizes.split(",");

  function handleAdd() {
    add({ productId: p!.id, name: p!.name, price: p!.price, image: p!.image, size, qty });
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <div className="text-sm text-muted mb-6">
        <Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / <span>{p.name}</span>
      </div>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="aspect-[3/4] overflow-hidden bg-black">
          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide text-muted font-bold">{p.category}</div>
          <h1 className="font-display my-2" style={{ fontSize: "clamp(28px,4vw,40px)" }}>{p.name}</h1>
          <div className="text-2xl font-extrabold mb-4">${p.price.toFixed(2)}</div>
          <p className="text-neutral-300 leading-relaxed mb-6">{p.description}</p>

          <div className="label">Size</div>
          <div className="flex gap-2 flex-wrap mb-6">
            {sizes.map((s) => (
              <button key={s} onClick={() => setSize(s)} className={`w-12 h-11 border text-sm font-semibold ${s === size ? "bg-fg text-bg border-fg" : "border-line"}`}>
                {s}
              </button>
            ))}
          </div>

          <div className="label">Quantity</div>
          <div className="flex items-center border border-line w-fit mb-6">
            <button className="w-10 h-10 text-lg" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
            <span className="w-11 text-center font-bold">{qty}</span>
            <button className="w-10 h-10 text-lg" onClick={() => setQty((q) => q + 1)}>+</button>
          </div>

          <div className="flex gap-2.5 flex-wrap mb-8">
            <button className="btn btn-outline flex-1 min-w-[160px]" onClick={handleAdd}>Add to Cart</button>
            <button className="btn btn-solid flex-1 min-w-[160px]" onClick={() => { handleAdd(); router.push("/cart"); }}>Buy Now</button>
          </div>

          <div className="border-t border-line">
            <details className="border-b border-line py-4" open>
              <summary className="font-bold text-xs uppercase tracking-wide cursor-pointer">Product Details</summary>
              <p className="text-muted text-sm mt-3 leading-relaxed">Premium cotton construction, signature KBRANDMUSIC front print, relaxed streetwear fit.</p>
            </details>
            <details className="border-b border-line py-4">
              <summary className="font-bold text-xs uppercase tracking-wide cursor-pointer">Shipping</summary>
              <p className="text-muted text-sm mt-3 leading-relaxed">{settings?.shippingText}</p>
            </details>
            <details className="border-b border-line py-4">
              <summary className="font-bold text-xs uppercase tracking-wide cursor-pointer">Returns</summary>
              <p className="text-muted text-sm mt-3 leading-relaxed">{settings?.returnsText}</p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
