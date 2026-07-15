"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { projects } from "@/data/home/projects";
import { dict, UPWORK_URL, type Lang } from "@/lib/home-i18n";

export default function Projects({ lang }: { lang: Lang }) {
  const t = dict[lang];
  return (
    <section id="projects" style={{ scrollMarginTop: 90 }}>
      <SectionHeader num="04." title={t.projects} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
        {projects.map((p, i) => (
          <Reveal key={p.title} i={i % 3}>
            <a
              href={p.href}
              target="_blank"
              rel="noopener"
              className="trans card-hover-35"
              style={{
                display: "block",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 20,
                overflow: "hidden",
                color: "var(--text)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 14px",
                  borderBottom: "1px solid var(--border)",
                  background: "var(--surface2)",
                }}
              >
                <div style={{ display: "flex", gap: 6 }}>
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--dot)" }}
                    />
                  ))}
                </div>
                <div
                  className="mono"
                  style={{
                    flex: 1,
                    background: "var(--surface3)",
                    borderRadius: 7,
                    padding: "5px 11px",
                    fontSize: 12,
                    color: "var(--muted)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {p.url}
                </div>
              </div>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16/10",
                  overflow: "hidden",
                  background: "var(--surface2)",
                }}
              >
                <Image
                  src={p.image}
                  alt={`${p.title} — screenshot`}
                  fill
                  sizes="(max-width: 760px) 100vw, 350px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: "18px 20px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <div style={{ fontSize: 17, fontWeight: 500 }}>{p.title}</div>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      border: "1px solid var(--border2)",
                      color: "var(--text)",
                      flexShrink: 0,
                    }}
                  >
                    <ArrowUpRight size={14} strokeWidth={2.2} />
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 9 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: p.dotColor }} />
                  <span style={{ fontSize: 13, color: "var(--muted)" }}>{p.category}</span>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
      <Reveal style={{ display: "flex", justifyContent: "center", marginTop: 36 }}>
        <a
          href={UPWORK_URL}
          target="_blank"
          rel="noopener"
          className="trans btn-accent-outline"
          style={{
            border: "1px solid color-mix(in srgb, var(--accent) 50%, transparent)",
            color: "var(--accent-ink)",
            borderRadius: 999,
            padding: "12px 28px",
            fontSize: 14,
          }}
        >
          {t.viewAllProjects}
        </a>
      </Reveal>
    </section>
  );
}
