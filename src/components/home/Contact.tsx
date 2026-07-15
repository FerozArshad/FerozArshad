"use client";

import { FileText, Mail, Send } from "lucide-react";
import Reveal from "./Reveal";
import { FiverrIcon, GitHubIcon, LinkedInIcon, UpworkIcon } from "./icons";
import { dict, EMAIL, FIVERR_URL, UPWORK_URL, type Lang } from "@/lib/home-i18n";

const socialStyle: React.CSSProperties = {
  width: 42,
  height: 42,
  borderRadius: "50%",
  border: "1px solid var(--border2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "var(--text2)",
};

export default function Contact({ lang, openLead }: { lang: Lang; openLead: () => void }) {
  const t = dict[lang];
  return (
    <section id="contact" style={{ scrollMarginTop: 90, textAlign: "center", padding: "30px 0 10px" }}>
      <Reveal>
        <p
          className="mono"
          style={{
            margin: 0,
            fontSize: 12,
            letterSpacing: "0.14em",
            color: "var(--accent-ink)",
            textTransform: "uppercase",
          }}
        >
          Contact
        </p>
      </Reveal>
      <Reveal i={1}>
        <h2
          style={{
            margin: "14px auto 0",
            maxWidth: 520,
            fontSize: "clamp(28px,4vw,38px)",
            fontWeight: 300,
            lineHeight: 1.25,
            textWrap: "pretty",
          }}
        >
          {t.contactTitle}
        </h2>
      </Reveal>
      <Reveal i={2}>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 28, gap: 12, flexWrap: "wrap" }}>
          <a
            href={`mailto:${EMAIL}`}
            className="trans btn-email"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "var(--accent)",
              color: "#0d0d0d",
              borderRadius: 999,
              padding: "14px 28px",
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            <Mail size={17} strokeWidth={1.8} />
            {EMAIL}
          </a>
          <button
            onClick={openLead}
            className="trans btn-accent-outline"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "transparent",
              border: "1px solid color-mix(in srgb, var(--accent) 50%, transparent)",
              color: "var(--accent-ink)",
              borderRadius: 999,
              padding: "14px 24px",
              fontSize: 15,
              fontFamily: "var(--font-geist-sans), sans-serif",
              cursor: "pointer",
            }}
          >
            <Send size={16} strokeWidth={2} />
            Start a project
          </button>
        </div>
      </Reveal>
      <Reveal i={3}>
        <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 26 }}>
          <a
            href="/assets/Feroz-Arshad-Resume.pdf"
            target="_blank"
            aria-label="View resume"
            className="trans icon-round-static"
            style={socialStyle}
          >
            <FileText size={16} strokeWidth={1.8} />
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn" className="trans icon-round-static" style={socialStyle}>
            <LinkedInIcon size={16} />
          </a>
          <a href="https://github.com" aria-label="GitHub" className="trans icon-round-static" style={socialStyle}>
            <GitHubIcon size={16} />
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
    </section>
  );
}
