"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { FiverrIcon, UpworkIcon } from "./icons";
import { fiverrReviews, upworkReviews, type Review } from "@/data/home/reviews";
import { dict, FIVERR_URL, UPWORK_URL, type Lang } from "@/lib/home-i18n";

const FIVERR_GREEN = "#1DBF73";
const UPWORK_GREEN = "#14A800";

function ReviewCard({ review, verifyHref, verifyColor }: { review: Review; verifyHref: string; verifyColor: string }) {
  return (
    <div
      style={{
        width: 340,
        flexShrink: 0,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 13,
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <span style={{ color: "var(--accent-ink)", fontSize: 14, letterSpacing: 2 }}>★★★★★</span>
        <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>
          {review.tag}
        </span>
      </div>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--text2)", flex: 1 }}>{review.quote}</p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          borderTop: "1px solid var(--border-soft)",
          paddingTop: 13,
        }}
      >
        <span
          className="mono"
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "var(--surface2)",
            border: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            color: "var(--accent-ink)",
          }}
        >
          {review.initial}
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 500 }}>{review.name}</div>
          <div style={{ fontSize: 11.5, color: "var(--muted)" }}>{review.meta}</div>
        </div>
        <a
          href={verifyHref}
          target="_blank"
          rel="noopener"
          aria-label="Verify this review"
          className="mono verify-link"
          style={{ fontSize: 11, color: verifyColor }}
        >
          verified ↗
        </a>
      </div>
    </div>
  );
}

function Marquee({ reviews, duration, verifyHref, verifyColor }: { reviews: Review[]; duration: string; verifyHref: string; verifyColor: string }) {
  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      <div className="marquee-track" style={{ animationDuration: duration }}>
        {[...reviews, ...reviews].map((r, i) => (
          <ReviewCard key={i} review={r} verifyHref={verifyHref} verifyColor={verifyColor} />
        ))}
      </div>
    </div>
  );
}

export default function Reviews({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const [tab, setTab] = useState<"fiverr" | "upwork">("fiverr");
  const ft = tab === "fiverr";

  const tabStyle = (active: boolean): React.CSSProperties => ({
    cursor: "pointer",
    borderRadius: 999,
    padding: "10px 22px",
    fontSize: 14,
    fontFamily: "var(--font-geist-sans), sans-serif",
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: active ? "var(--accent)" : "transparent",
    color: active ? "#101010" : "var(--muted)",
    border: `1px solid ${active ? "var(--accent)" : "var(--border2)"}`,
    transition: "background .25s ease, color .25s ease, border-color .25s ease",
  });

  return (
    <section id="reviews" style={{ scrollMarginTop: 90 }}>
      <SectionHeader num="05." title={t.reviews} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: 20,
          marginBottom: 20,
        }}
      >
        <Reveal>
          <a
            href={FIVERR_URL}
            target="_blank"
            rel="noopener"
            className="trans proof-card"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 20,
              padding: "22px 26px",
              color: "var(--text)",
            }}
          >
            <span
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "rgba(29,191,115,0.12)",
                color: FIVERR_GREEN,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <FiverrIcon size={20} />
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 22, fontWeight: 600 }}>5.0</span>
                <span style={{ color: "var(--accent-ink)", fontSize: 14, letterSpacing: 2 }}>★★★★★</span>
                <span style={{ fontSize: 14, color: "var(--muted)" }}>174 reviews</span>
              </div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 3 }}>
                Level 2 Seller on Fiverr · verify on profile ↗
              </div>
            </div>
          </a>
        </Reveal>
        <Reveal i={1}>
          <a
            href={UPWORK_URL}
            target="_blank"
            rel="noopener"
            className="trans proof-card"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 20,
              padding: "22px 26px",
              color: "var(--text)",
            }}
          >
            <span
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "rgba(20,168,0,0.12)",
                color: UPWORK_GREEN,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <UpworkIcon size={22} />
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 500 }}>Upwork work history</div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 3 }}>
                Verified contracts &amp; feedback · view profile ↗
              </div>
            </div>
          </a>
        </Reveal>
      </div>
      <Reveal style={{ display: "flex", gap: 10, marginBottom: 24 }}>
        <button onClick={() => setTab("fiverr")} style={tabStyle(ft)}>
          Fiverr · 174 reviews
        </button>
        <button onClick={() => setTab("upwork")} style={tabStyle(!ft)}>
          Upwork · 5.0 ★
        </button>
      </Reveal>
      {ft ? (
        <>
          <Marquee reviews={fiverrReviews} duration="50s" verifyHref={FIVERR_URL} verifyColor={FIVERR_GREEN} />
          <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
            <a
              href={FIVERR_URL}
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
              Read all 174 reviews on Fiverr
            </a>
          </div>
        </>
      ) : (
        <>
          <Marquee reviews={upworkReviews} duration="60s" verifyHref={UPWORK_URL} verifyColor={UPWORK_GREEN} />
          <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
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
              View verified work history on Upwork
            </a>
          </div>
        </>
      )}
    </section>
  );
}
