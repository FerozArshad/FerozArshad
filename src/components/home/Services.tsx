"use client";

import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { ThemedIcon } from "./icons";
import { services } from "@/data/home/services";
import { dict, type Lang } from "@/lib/home-i18n";

export default function Services({ lang }: { lang: Lang }) {
  const t = dict[lang];
  return (
    <section id="services" style={{ scrollMarginTop: 90 }}>
      <SectionHeader num="02." title={t.services} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 18 }}>
        {services[lang].map((svc, i) => (
          <Reveal
            key={svc.title}
            i={i % 4}
            className="trans card-hover-30"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 20,
              padding: 24,
            }}
          >
            <span
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "color-mix(in srgb, var(--accent) 8%, transparent)",
                border: "1px solid color-mix(in srgb, var(--accent) 25%, transparent)",
                color: "var(--accent-ink)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <ThemedIcon name={svc.icon} size={17} />
            </span>
            <div style={{ fontSize: 15.5, fontWeight: 500, marginBottom: 6 }}>{svc.title}</div>
            <div style={{ fontSize: 13.5, lineHeight: 1.55, color: "var(--muted)" }}>{svc.desc}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
