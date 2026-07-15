"use client";

import { Moon, Sun } from "lucide-react";
import { dict, type Lang } from "@/lib/home-i18n";

export default function Nav({
  lang,
  setLang,
  isDark,
  toggleTheme,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  isDark: boolean;
  toggleTheme: () => void;
}) {
  const t = dict[lang];
  const segStyle = (active: boolean): React.CSSProperties => ({
    border: "none",
    cursor: "pointer",
    borderRadius: 999,
    padding: "5px 12px",
    fontSize: 12,
    fontFamily: "var(--font-geist-mono), monospace",
    background: active ? "var(--accent)" : "transparent",
    color: active ? "#0d0d0d" : "var(--muted2)",
  });

  return (
    <nav
      aria-label="Main"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(8px)",
        background: "var(--navbg)",
        borderBottom: "1px solid var(--border-soft)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "10px 24px",
          minHeight: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px 18px",
          flexWrap: "wrap",
        }}
      >
        <a href="#top" aria-label="Feroz — home" style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/feroz-logo-white.png"
            alt="Storm Marketing Studio — Feroz"
            style={{ height: 38, width: "auto", display: "block", filter: "var(--logo-filter)" }}
          />
        </a>
        <div
          className="nav-links"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {t.nav.map((nl) => (
            <a
              key={nl.href}
              href={nl.href}
              className="navlink"
              style={{ fontSize: 14, color: "var(--text2)", letterSpacing: "0.02em" }}
            >
              {nl.label}
            </a>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark / light mode"
            className="trans theme-btn"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1px solid var(--border2)",
              background: "transparent",
              color: "var(--text2)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
            }}
          >
            {isDark ? (
              <Moon size={16} strokeWidth={1.8} />
            ) : (
              <Sun size={16} strokeWidth={1.8} />
            )}
          </button>
          <div
            role="group"
            aria-label="Language"
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid var(--border2)",
              borderRadius: 999,
              padding: 3,
              gap: 2,
            }}
          >
            <button onClick={() => setLang("en")} aria-label="English" style={segStyle(lang === "en")}>
              EN
            </button>
            <button onClick={() => setLang("es")} aria-label="Español" style={segStyle(lang === "es")}>
              ES
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
