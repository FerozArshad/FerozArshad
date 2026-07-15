export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border-soft)", marginTop: 60 }}>
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "26px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/feroz-logo-white.png"
          alt="Storm Marketing Studio"
          style={{ height: 30, width: "auto", opacity: 0.85, filter: "var(--logo-filter)" }}
        />
        <span style={{ fontSize: 13, color: "var(--muted2)" }}>
          Feroz © 2026 · Storm Marketing Studio · Built with Next.js &amp; Tailwind.
        </span>
      </div>
    </footer>
  );
}
