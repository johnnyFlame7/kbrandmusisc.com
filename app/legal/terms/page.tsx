export const metadata = { title: "Terms & Conditions — KBRANDMUSIC" };

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-16">
      <h1 className="font-display text-4xl mb-2">Terms & Conditions</h1>
      <p className="text-muted text-sm mb-8">Last updated: [ENTER DATE]</p>
      <div className="text-neutral-300 leading-relaxed space-y-5 text-sm">
        <p>
          These Terms & Conditions govern your use of the KBRANDMUSIC website and any purchases made
          through it. <em>This is placeholder text — have it reviewed by a lawyer for your jurisdiction
          before this site goes live and starts taking real orders.</em>
        </p>
        <h2 className="text-fg font-bold text-base mt-6">Orders & Payment</h2>
        <p>All prices are listed in [ENTER CURRENCY]. Payment is processed securely by [Stripe/PayPal] at checkout. Orders are confirmed once payment is received.</p>
        <h2 className="text-fg font-bold text-base mt-6">Product Availability</h2>
        <p>All products are subject to availability. We reserve the right to cancel and refund an order if an item is unexpectedly out of stock.</p>
        <h2 className="text-fg font-bold text-base mt-6">Intellectual Property</h2>
        <p>The KBRANDMUSIC name, logo, and all product designs are the property of [ENTER BUSINESS/OWNER NAME] and may not be reproduced without permission.</p>
        <h2 className="text-fg font-bold text-base mt-6">Governing Law</h2>
        <p>These terms are governed by the laws of [ENTER COUNTRY/STATE].</p>
        <h2 className="text-fg font-bold text-base mt-6">Contact</h2>
        <p>[ENTER BUSINESS NAME]<br />[ENTER CONTACT EMAIL]</p>
      </div>
    </div>
  );
}
