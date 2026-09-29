"use client";
import { useEffect, useState } from "react";

export default function ReturnsPage() {
  const [s, setS] = useState<any>(null);
  useEffect(() => { fetch("/api/settings").then((r) => r.json()).then(setS).catch(() => {}); }, []);
  return (
    <div className="max-w-3xl mx-auto px-5 py-16">
      <h1 className="font-display text-4xl mb-8">Returns & Refunds Policy</h1>
      <div className="text-neutral-300 leading-relaxed space-y-5 text-sm">
        <p>{s?.returnsText}</p>
        <p><em>Editable in the Owner Dashboard under Site Content.</em></p>
        <h2 className="text-fg font-bold text-base mt-6">How to Start a Return</h2>
        <p>[ENTER — e.g. Email {"{contact email}"} with your order number to request a return]</p>
        <h2 className="text-fg font-bold text-base mt-6">Refund Timing</h2>
        <p>[ENTER — e.g. Refunds are issued to your original payment method within 5-10 business days of us receiving the item]</p>
      </div>
    </div>
  );
}
