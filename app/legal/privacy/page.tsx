export const metadata = { title: "Privacy Policy — KBRANDMUSIC" };

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-16">
      <h1 className="font-display text-4xl mb-2">Privacy Policy</h1>
      <p className="text-muted text-sm mb-8">Last updated: [ENTER DATE]</p>
      <div className="text-neutral-300 leading-relaxed space-y-5 text-sm">
        <p>
          This Privacy Policy explains how <strong>KBRANDMUSIC</strong> ("we", "us", "our") collects, uses
          and protects information about you when you visit or make a purchase on this website.
          <em> This is placeholder text — replace it with a policy reviewed for your country's privacy laws
          (e.g. GDPR if you sell to the EU/UK, CCPA if you sell to California) before going live.</em>
        </p>
        <h2 className="text-fg font-bold text-base mt-6">Information We Collect</h2>
        <p>Name, email address, shipping address, order history, and payment confirmation (card details are handled directly by our payment provider — Stripe/PayPal — and are never stored on our servers).</p>
        <h2 className="text-fg font-bold text-base mt-6">How We Use It</h2>
        <p>To process orders, communicate with you about your purchase, and — if you opt in — send marketing emails about new drops.</p>
        <h2 className="text-fg font-bold text-base mt-6">Third Parties</h2>
        <p>We share order data with our payment processor (Stripe/PayPal) and shipping carriers only as needed to fulfil your order.</p>
        <h2 className="text-fg font-bold text-base mt-6">Your Rights</h2>
        <p>You may request access to, correction of, or deletion of your personal data by contacting us at [ENTER CONTACT EMAIL].</p>
        <h2 className="text-fg font-bold text-base mt-6">Contact</h2>
        <p>[ENTER BUSINESS NAME]<br />[ENTER BUSINESS ADDRESS]<br />[ENTER CONTACT EMAIL]</p>
      </div>
    </div>
  );
}
