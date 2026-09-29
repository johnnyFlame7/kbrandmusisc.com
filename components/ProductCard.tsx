"use client";
import Link from "next/link";
import { useCart } from "./CartProvider";

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  sizes: string;
  stock: boolean;
  tag: string | null;
};

export default function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  const sizes = p.sizes.split(",");

  return (
    <div className="bg-card border border-line hover:border-neutral-500 transition group">
      <Link href={`/product/${p.id}`}>
        <div className="aspect-[3/4] overflow-hidden bg-black relative">
          {p.tag === "new" && (
            <span className="absolute top-2 left-2 bg-fg text-bg text-[10px] font-extrabold px-2 py-1 uppercase z-10">New</span>
          )}
          <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
      </Link>
      <div className="p-3.5">
        <div className="text-[11px] uppercase tracking-wide text-muted">{p.category}</div>
        <Link href={`/product/${p.id}`}>
          <p className="font-bold text-sm mt-1 mb-1">{p.name}</p>
        </Link>
        <div className="text-[11px] text-muted">Sizes: {sizes.join(" / ")}</div>
        <div className="flex justify-between items-center mt-2.5">
          <span className="font-extrabold">${p.price.toFixed(2)}</span>
          <Link href={`/product/${p.id}`} className="text-[11px] uppercase font-bold border border-line px-2.5 py-2 hover:bg-fg hover:text-bg transition">
            Quick View
          </Link>
        </div>
        <button
          className="w-full mt-2 text-[11px] uppercase font-bold border border-line py-2 hover:bg-fg hover:text-bg transition"
          onClick={() => add({ productId: p.id, name: p.name, price: p.price, image: p.image, size: sizes[0], qty: 1 })}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
