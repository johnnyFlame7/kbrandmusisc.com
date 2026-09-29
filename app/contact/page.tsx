"use client";
import { useEffect, useState } from "react";

export default function Contact() {
  const [s, setS] = useState<any>(null);
  useEffect(() => { fetch("/api/settings").then((r) => r.json()).then(setS).catch(() => {}); }, []);

  return (
    <div className="max-w-6xl mx-auto px-5 py-12">
      <h1 className="font-display mb-8" style={{ fontSize: "clamp(34px,7vw,60px)" }}>Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <form onSubmit={(e) => { e.preventDefault(); alert("Message sent — we'll be in touch."); (e.target as HTMLFormElement).reset(); }}>
          <div className="mb-4"><label className="label">Name</label><input required className="input" /></div>
          <div className="mb-4"><label className="label">Email</label><input type="email" required className="input" /></div>
          <div className="mb-4"><label className="label">Message</label><textarea required rows={5} className="input" /></div>
          <button className="btn btn-solid" type="submit">Send Message</button>
        </form>
        <div className="text-muted leading-loose">
          <p><strong className="text-fg">Email</strong><br /><a href={`mailto:${s?.contactEmail}`} className="font-bold text-fg">{s?.contactEmail}</a></p>
          <p><strong className="text-fg">Instagram</strong><br /><a href={`https://instagram.com/${s?.instagram}`} target="_blank" className="font-bold text-fg">@{s?.instagram}</a></p>
        </div>
      </div>
    </div>
  );
}
