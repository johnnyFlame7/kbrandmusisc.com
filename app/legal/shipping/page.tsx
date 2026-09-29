"use client";
import { useEffect, useState } from "react";

export default function ShippingPage() {
  const [s, setS] = useState<any>(null);
  useEffect(() => { fetch("/api/settings").then((r) => r.json()).then(setS).catch(() => {}); }, []);
  return (
    <div className="max-w-3xl mx-auto px-5 py-16">
      <h1 className="font-display text-4xl mb-8">Shipping Policy</h1>
      <div className="text-neutral-300 leading-relaxed space-y-5 text-sm">
        <p>{s?.shippingText}</p>
        <p><em>Editable in the Owner Dashboard under Site Content. Replace with your real carrier, processing time, and rates once finalized — e.g. USPS, UPS, or a fulfilment partner.</em></p>
        <h2 className="text-fg font-bold text-base mt-6">Processing Time</h2>
        <p>[ENTER — e.g. Orders are processed within 1-3 business days]</p>
        <h2 className="text-fg font-bold text-base mt-6">International Shipping</h2>
        <p>[ENTER whether you ship internationally, and any customs/duty notes]</p>
      </div>
    </div>
  );
}
