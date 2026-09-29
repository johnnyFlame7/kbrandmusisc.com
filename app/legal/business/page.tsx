export const metadata = { title: "Business Information — KBRANDMUSIC" };

export default function BusinessPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-16">
      <h1 className="font-display text-4xl mb-8">Business Information</h1>
      <div className="text-neutral-300 leading-relaxed space-y-3 text-sm">
        <p className="text-muted italic mb-4">
          Fill in your real registered business details below. Many payment providers and some countries
          legally require this information to be published on a commercial website.
        </p>
        <p><strong className="text-fg">Legal Business Name:</strong> [ENTER LEGAL BUSINESS NAME]</p>
        <p><strong className="text-fg">Trading As:</strong> KBRANDMUSIC</p>
        <p><strong className="text-fg">Business Type:</strong> [ENTER — e.g. Sole Proprietor / LLC / Ltd]</p>
        <p><strong className="text-fg">Registration Number:</strong> [ENTER IF APPLICABLE]</p>
        <p><strong className="text-fg">Tax / VAT Number:</strong> [ENTER IF APPLICABLE]</p>
        <p><strong className="text-fg">Registered Address:</strong> [ENTER BUSINESS ADDRESS]</p>
        <p><strong className="text-fg">Contact Email:</strong> [ENTER CONTACT EMAIL]</p>
        <p><strong className="text-fg">Contact Phone:</strong> [ENTER PHONE, IF PUBLISHING ONE]</p>
      </div>
    </div>
  );
}
