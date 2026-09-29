"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard, { Product } from "@/components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch("/api/products").then((r) => r.json()).then(setProducts).catch(() => {});
    fetch("/api/settings").then((r) => r.json()).then(setSettings).catch(() => {});
  }, []);

  const featured = products.filter((p) => p.tag === "featured");
  const fresh = products.filter((p) => p.tag === "new");

  return (
    <div>
      <div className="relative min-h-[88vh] flex items-end bg-black">
        {settings?.heroImg && (
          <img src={settings.heroImg} alt="KBRANDMUSIC hero" className="absolute inset-0 w-full h-full object-cover object-top opacity-55" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-bg" />
        <div className="relative z-10 max-w-6xl mx-auto px-5 pb-14 pt-16 w-full">
          <h1 className="font-display leading-none mb-3" style={{ fontSize: "clamp(48px,13vw,120px)" }}>
            {(settings?.heroTitle || "KBRAND\\nMUSIC").split("\\n").map((l: string, i: number) => (
              <span key={i} className="block">{l}</span>
            ))}
          </h1>
          <p className="text-muted uppercase tracking-widest text-sm mb-6">{settings?.heroTagline}</p>
          <div className="flex gap-3 flex-wrap">
            <Link href="/shop" className="btn btn-solid">Shop Now</Link>
            <Link href="/shop" className="btn btn-outline">Explore Collection</Link>
          </div>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="flex justify-between items-baseline mb-7 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-muted font-bold">Selected</span>
            <h2 className="text-3xl md:text-4xl font-display mt-1">Featured Products</h2>
          </div>
          <Link href="/shop" className="text-xs font-bold uppercase border-b border-fg">View All →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featured.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 pb-16">
        <div className="mb-7">
          <span className="text-xs uppercase tracking-widest text-muted font-bold">Just Dropped</span>
          <h2 className="text-3xl md:text-4xl font-display mt-1">New Collection</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {fresh.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {settings?.storyImg && <img src={settings.storyImg} alt="Brand story" className="w-full aspect-[4/5] object-cover" />}
          <div>
            <span className="text-xs uppercase tracking-widest text-muted font-bold">Our Story</span>
            <h2 className="font-display mt-2 mb-4" style={{ fontSize: "clamp(30px,6vw,52px)" }}>MUSIC. IDENTITY.<br />STREETWEAR.</h2>
            <p className="text-neutral-300 leading-relaxed">{settings?.storyText}</p>
            <Link href="/about" className="btn btn-outline mt-5 inline-flex">Read Our Story</Link>
          </div>
        </div>
      </section>

      {settings?.promoImg && (
        <div className="relative min-h-[55vh] flex items-center justify-center text-center bg-black">
          <img src={settings.promoImg} alt="Promo" className="absolute inset-0 w-full h-full object-cover object-top opacity-40" />
          <div className="relative z-10 px-5">
            <span className="text-xs uppercase tracking-widest text-muted font-bold">Signature Mark</span>
            <h2 className="font-display my-4" style={{ fontSize: "clamp(32px,7vw,64px)" }}>BUILT FOR THE CULTURE</h2>
            <Link href="/shop" className="btn btn-solid">Shop The Look</Link>
          </div>
        </div>
      )}

      <div className="bg-bg2 border-y border-line">
        <div className="max-w-6xl mx-auto px-5 py-14 flex flex-col items-center text-center gap-4">
          <h3 className="font-display text-3xl">Join The Movement</h3>
          <p className="text-muted">Sign up for drops, restocks and exclusive KBRANDMUSIC access.</p>
          <form
            className="flex w-full max-w-md"
            onSubmit={(e) => { e.preventDefault(); alert("Subscribed! Welcome to KBRANDMUSIC."); (e.target as HTMLFormElement).reset(); }}
          >
            <input type="email" required placeholder="Your email" className="flex-1 bg-transparent border border-line border-r-0 px-4 py-3.5 text-sm focus:outline-none" />
            <button className="btn btn-solid" type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  );
}
