export const metadata = { title: "Cookie Policy — KBRANDMUSIC" };

export default function CookiesPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-16">
      <h1 className="font-display text-4xl mb-2">Cookie Policy</h1>
      <p className="text-muted text-sm mb-8">Last updated: [ENTER DATE]</p>
      <div className="text-neutral-300 leading-relaxed space-y-5 text-sm">
        <p>
          This site uses cookies and similar local storage to keep items in your shopping cart and, if
          added later, to remember your admin login session. <em>Placeholder text — update this once you
          add any analytics or marketing cookies (e.g. Google Analytics, Meta Pixel), and add a cookie
          consent banner if required in your target markets (e.g. EU/UK).</em>
        </p>
        <h2 className="text-fg font-bold text-base mt-6">Essential Cookies</h2>
        <p>Used to keep your cart contents and admin session working. The site cannot function properly without these.</p>
        <h2 className="text-fg font-bold text-base mt-6">Analytics / Marketing Cookies</h2>
        <p>[ENTER — list any analytics or ad-tracking tools you add, e.g. Google Analytics, Meta Pixel, TikTok Pixel]</p>
        <h2 className="text-fg font-bold text-base mt-6">Managing Cookies</h2>
        <p>You can disable cookies in your browser settings, though this may affect cart functionality.</p>
      </div>
    </div>
  );
}
