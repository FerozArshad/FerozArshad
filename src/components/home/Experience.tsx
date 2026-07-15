"use client";

import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { experience } from "@/data/home/experience";
import { dict, type Lang } from "@/lib/home-i18n";

export default function Experience({ lang }: { lang: Lang }) {
  const t = dict[lang];
  return (
    <section id="experience" style={{ scrollMarginTop: 90 }}>
      <SectionHeader num="03." title={t.experience} marginBottom={40} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 44,
          borderLeft: "1px solid var(--border)",
          marginLeft: 6,
          paddingLeft: 0,
        }}
      >
        {experience.map((entry) => (
          <Reveal key={entry.role} style={{ position: "relative", paddingLeft: 34 }}>
            <span
              style={{
                position: "absolute",
                left: -6,
                top: 6,
                width: 11,
                height: 11,
                borderRadius: "50%",
                ...(entry.active
                  ? {
                      background: "var(--accent)",
                      boxShadow: "0 0 12px color-mix(in srgb, var(--accent) 60%, transparent)",
                    }
                  : { background: "var(--dot)", border: "1px solid var(--border2)" }),
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <div>
                <div style={{ fontSize: 18, fontWeight: 500 }}>{entry.role}</div>
                <div
                  style={{
                    fontSize: 14,
                    color: entry.active ? "var(--accent-ink)" : "var(--muted2)",
                    marginTop: 3,
                  }}
                >
                  {entry.org}
                </div>
              </div>
              <span
                className="mono"
                style={{
                  border: "1px solid var(--border2)",
                  borderRadius: 999,
                  padding: "6px 14px",
                  fontSize: 12,
                  color: "var(--text2)",
                  whiteSpace: "nowrap",
                }}
              >
                {entry.date}
              </span>
            </div>
            <p
              style={{
                margin: "12px 0 0",
                maxWidth: 640,
                fontSize: 14.5,
                lineHeight: 1.7,
                color: "var(--muted)",
                textWrap: "pretty",
              }}
            >
              {entry.desc.map((seg, i) =>
                seg.accent ? (
                  <span key={i} style={{ color: "var(--accent-ink)" }}>
                    {seg.text}
                  </span>
                ) : (
                  <span key={i}>{seg.text}</span>
                )
              )}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
