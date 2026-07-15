"use client";

import { Monitor, Zap } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { ThemedIcon } from "./icons";
import { skills } from "@/data/home/skills";
import { dict, type Lang } from "@/lib/home-i18n";

const cardStyle: React.CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: 20,
  padding: 30,
};

const Accent = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "var(--accent-ink)" }}>{children}</span>
);

function MetaCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Reveal
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        padding: "22px 26px",
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}
    >
      <span
        style={{
          width: 42,
          height: 42,
          borderRadius: 12,
          border: "1px solid color-mix(in srgb, var(--accent) 30%, transparent)",
          color: "var(--accent-ink)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <div>
        <div
          className="mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.12em",
            color: "var(--muted2)",
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          {label}
        </div>
        <div style={{ fontSize: 16, fontWeight: 500 }}>{value}</div>
      </div>
    </Reveal>
  );
}

export default function About({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const doRows = [
    "Design and ship full-stack web apps, end to end.",
    "Automate lead generation with scraping + AI pipelines.",
    "Integrate LLMs and chatbots into real business workflows.",
    "Build fast, SEO-sound sites that convert.",
  ];
  return (
    <section id="about" style={{ scrollMarginTop: 90 }}>
      <SectionHeader num="01." title={t.about} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>
        <Reveal className="trans card-hover" style={cardStyle}>
          <h3 style={{ margin: "0 0 16px", fontSize: 19, fontWeight: 500 }}>Who is Feroz?</h3>
          <p style={{ margin: "0 0 14px", fontSize: 15, lineHeight: 1.7, color: "var(--text2)", textWrap: "pretty" }}>
            I’m a full-stack developer who started with <Accent>WordPress</Accent> and{" "}
            <Accent>SEO</Accent>, and grew into building complete digital systems with{" "}
            <Accent>Python</Accent>, <Accent>Next.js</Accent> and <Accent>React</Accent>.
          </p>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "var(--text2)", textWrap: "pretty" }}>
            Today my focus is <Accent>AI automation</Accent> — connecting scrapers, LLMs and
            workflows into systems that generate leads and save teams real hours every week.
          </p>
        </Reveal>
        <Reveal i={1} className="trans card-hover" style={cardStyle}>
          <h3 style={{ margin: "0 0 16px", fontSize: 19, fontWeight: 500 }}>What I do</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 15, lineHeight: 1.55, color: "var(--text2)" }}>
            {doRows.map((row) => (
              <div key={row} style={{ display: "flex", gap: 10 }}>
                <span style={{ color: "var(--accent-ink)" }}>→</span>
                <span>{row}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20, marginTop: 20 }}>
        <MetaCard icon={<Monitor size={18} strokeWidth={1.8} />} label="Building at" value="Storm Marketing Studio" />
        <MetaCard icon={<Zap size={18} strokeWidth={1.8} />} label="Focus" value="AI Automation & Lead Gen" />
      </div>
      <Reveal style={{ ...cardStyle, marginTop: 20 }}>
        <h3 style={{ margin: "0 0 20px", fontSize: 19, fontWeight: 500 }}>Technologies &amp; tools</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {skills.map((sk) => (
            <span
              key={sk.name}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                border: "1px solid var(--border)",
                background: "var(--surface2)",
                borderRadius: 999,
                padding: "8px 14px",
                fontSize: 13.5,
                color: "var(--text2)",
              }}
            >
              <span style={{ color: "var(--accent-ink)", display: "inline-flex" }}>
                <ThemedIcon name={sk.icon} size={15} />
              </span>
              {sk.name}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
