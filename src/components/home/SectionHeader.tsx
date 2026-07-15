import Reveal from "./Reveal";

export default function SectionHeader({
  num,
  title,
  marginBottom = 32,
}: {
  num: string;
  title: string;
  marginBottom?: number;
}) {
  return (
    <Reveal style={{ display: "flex", alignItems: "center", gap: 16, marginBottom }}>
      <span
        className="mono"
        style={{
          border: "1px solid var(--border2)",
          background: "var(--surface)",
          borderRadius: 10,
          padding: "8px 12px",
          fontSize: 16,
          color: "var(--accent-ink)",
        }}
      >
        {num}
      </span>
      <h2 style={{ margin: 0, fontSize: 30, fontWeight: 400, letterSpacing: "-0.01em" }}>{title}</h2>
    </Reveal>
  );
}
