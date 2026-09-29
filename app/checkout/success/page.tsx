"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function Success({ searchParams }: { searchParams: { order?: string } }) {
  const { clear } = useCart();
  useEffect(() => { clear(); }, []);
  return (
    <div className="max-w-2xl mx-auto px-5 py-24 text-center">
      <h1 className="font-display text-4xl mb-4">Order Confirmed</h1>
      <p className="text-muted mb-2">Thank you — your KBRANDMUSIC order{searchParams.order ? ` #${searchParams.order}` : ""} has been placed.</p>
      <p className="text-muted mb-8">A confirmation has been sent to your email.</p>
      <Link href="/shop" className="btn btn-solid">Continue Shopping</Link>
    </div>
  );
}
