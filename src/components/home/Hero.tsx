"use client";

import Image from "next/image";
import { ArrowDown, FileText, Send } from "lucide-react";
import Reveal from "./Reveal";
import { FiverrIcon, GitHubIcon, LinkedInIcon, UpworkIcon } from "./icons";
import { dict, FIVERR_URL, UPWORK_URL, type Lang } from "@/lib/home-i18n";

const socialStyle: React.CSSProperties = {
  width: 46,
  height: 46,
  borderRadius: "50%",
  border: "1px solid var(--border2)",
  background: "var(--surface)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function Hero({ lang, openLead }: { lang: Lang; openLead: () => void }) {
  const t = dict[lang];
  return (
    <header
      id="top"
      className="hero"
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "110px 24px 70px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 0,
      }}
    >
      <Reveal now i={0}>
        <div
          style={{
            width: 172,
            height: 172,
            boxSizing: "border-box",
            borderRadius: "50%",
            border: "2px solid var(--accent)",
            boxShadow: "0 0 28px color-mix(in srgb, var(--accent) 35%, transparent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "ringPulse 3s ease-in-out infinite",
          }}
        >
          <div style={{ width: 156, height: 156, borderRadius: "50%", overflow: "hidden", display: "flex" }}>
            <Image
              src="/assets/feroz.jpg"
              alt="Feroz"
              width={156}
              height={156}
              priority
              style={{ width: 156, height: 156, objectFit: "cover" }}
            />
          </div>
        </div>
      </Reveal>
      <Reveal now i={1}>
        <span
          className="mono"
          style={{
            marginTop: 26,
            display: "inline-block",
            border: "1px solid color-mix(in srgb, var(--accent) 40%, transparent)",
            color: "var(--accent-ink)",
            borderRadius: 999,
            padding: "7px 16px",
            fontSize: 12.5,
            letterSpacing: "0.04em",
          }}
        >
          Full-Stack Developer &amp; AI Automation
        </span>
      </Reveal>
      <Reveal now i={2}>
        <p style={{ margin: "26px 0 0", color: "var(--muted)", fontSize: 16 }}>{t.greeting}</p>
      </Reveal>
      <Reveal now i={3}>
        <h1
          style={{
            margin: "6px 0 0",
            fontSize: "clamp(56px,9vw,92px)",
            fontWeight: 250,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
          }}
        >
          Feroz
        </h1>
      </Reveal>
      <Reveal now i={4}>
        <p
          style={{
            margin: "20px auto 0",
            maxWidth: 560,
            fontSize: 16.5,
            lineHeight: 1.65,
            color: "var(--text2)",
            textWrap: "pretty",
          }}
        >
          Full-stack developer with a focus on{" "}
          <span style={{ color: "var(--accent-ink)" }}>AI automation</span>,{" "}
          <span style={{ color: "var(--accent-ink)" }}>web scraping</span>, and building digital
          systems that generate real business impact.
        </p>
      </Reveal>
      <Reveal now i={5}>
        <div style={{ display: "flex", gap: 12, marginTop: 30, flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={openLead}
            className="trans btn-accent"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "var(--accent)",
              color: "#101010",
              border: "none",
              borderRadius: 999,
              padding: "14px 26px",
              fontSize: 15,
              fontWeight: 500,
              fontFamily: "var(--font-geist-sans), sans-serif",
              cursor: "pointer",
            }}
          >
            <Send size={16} strokeWidth={2} />
            Start a project
          </button>
          <a
            href="#projects"
            className="trans btn-outline"
            style={{
              display: "inline-flex",
              alignItems: "center",
              border: "1px solid var(--border2)",
              color: "var(--text2)",
              borderRadius: 999,
              padding: "14px 24px",
              fontSize: 15,
            }}
          >
            See my work
          </a>
        </div>
      </Reveal>
      <Reveal now i={6}>
        <div style={{ display: "flex", gap: 14, marginTop: 20 }}>
          <a
            href="/assets/Feroz-Arshad-Resume.pdf"
            target="_blank"
            aria-label="View resume"
            className="trans icon-round"
            style={socialStyle}
          >
            <FileText size={18} strokeWidth={1.8} />
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn" className="trans icon-round" style={socialStyle}>
            <LinkedInIcon size={18} />
          </a>
          <a href="https://github.com" aria-label="GitHub" className="trans icon-round" style={socialStyle}>
            <GitHubIcon size={18} />
          </a>
          <a
            href={UPWORK_URL}
            target="_blank"
            rel="noopener"
            aria-label="Upwork profile"
            className="trans icon-round"
            style={socialStyle}
          >
            <UpworkIcon size={18} />
          </a>
          <a
            href={FIVERR_URL}
            target="_blank"
            rel="noopener"
            aria-label="Fiverr profile"
            className="trans icon-round"
            style={socialStyle}
          >
            <FiverrIcon size={16} />
          </a>
        </div>
      </Reveal>
      <a
        href="#about"
        aria-label="Scroll to About"
        className="scroll-hint"
        style={{
          marginTop: 64,
          color: "var(--muted2)",
          animation: "floatY 2.2s ease-in-out infinite",
          display: "inline-flex",
        }}
      >
        <ArrowDown size={22} strokeWidth={1.6} />
      </a>
    </header>
  );
}
