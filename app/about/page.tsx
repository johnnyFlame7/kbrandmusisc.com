"use client";
import { useEffect, useState } from "react";

export default function About() {
  const [s, setS] = useState<any>(null);
  useEffect(() => { fetch("/api/settings").then((r) => r.json()).then(setS).catch(() => {}); }, []);

  return (
    <div>
      <section className="grid md:grid-cols-2">
        {s?.aboutHeroImg && <img src={s.aboutHeroImg} alt="KBRANDMUSIC" className="w-full h-full object-cover min-h-[340px]" />}
        <div className="flex flex-col justify-center p-10">
          <span className="text-xs uppercase tracking-widest text-muted font-bold">Our Story</span>
          <h1 className="font-display my-3" style={{ fontSize: "clamp(32px,6vw,52px)" }}>WEAR THE SOUND</h1>
          <p className="text-neutral-300 leading-relaxed text-base">{s?.aboutText}</p>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-5 py-14">
        <div className="grid md:grid-cols-3 gap-5">
          <div className="border border-line p-6">
            <h4 className="text-sm uppercase tracking-wide mb-2.5">Sound-First Design</h4>
            <p className="text-muted text-sm leading-relaxed">Every drop is built around a feeling — the way a beat hits, the way a room moves.</p>
          </div>
          <div className="border border-line p-6">
            <h4 className="text-sm uppercase tracking-wide mb-2.5">Street Built</h4>
            <p className="text-muted text-sm leading-relaxed">Cut for real movement, real days, real cities. Made to be lived in.</p>
          </div>
          <div className="border border-line p-6">
            <h4 className="text-sm uppercase tracking-wide mb-2.5">One Signature Mark</h4>
            <p className="text-muted text-sm leading-relaxed">Every piece carries the KBRANDMUSIC mark — recognizable anywhere.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
