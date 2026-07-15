"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "01<>{}[]/=+*$#;";

/**
 * Accent dot (instant) + four-corner bracket reticle (lerp follow, gentle sway).
 * Brackets snap around hovered links/buttons; click squeezes the reticle.
 * Moving over non-interactive areas spawns a fading mono glyph trail.
 * Pointer-fine devices only; respects prefers-reduced-motion.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  // Glyphs must live inside the .fz scope so var(--accent) resolves.
  const glyphLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const dot = dotRef.current;
    const frame = frameRef.current;
    if (!dot || !frame) return;

    let mx = -100,
      my = -100,
      seen = false,
      down = false;
    let hot: Element | null = null;
    let cx = -100,
      cy = -100,
      cw = 36,
      ch = 36,
      t = 0;
    let lastGlyph = 0,
      gx = 0,
      gy = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      seen = true;
      const target = e.target as Element | null;
      hot = target?.closest?.('a,button,[role="button"]') ?? null;
      const now = performance.now();
      if (!hot && now - lastGlyph > 120 && Math.abs(mx - gx) + Math.abs(my - gy) > 26) {
        lastGlyph = now;
        gx = mx;
        gy = my;
        const s = document.createElement("span");
        s.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        s.style.cssText = `position:fixed;left:${mx + 10}px;top:${my + 8}px;z-index:9998;pointer-events:none;font:11px var(--font-geist-mono),monospace;color:var(--accent);opacity:.85;transition:opacity .7s ease, transform .7s ease`;
        (glyphLayerRef.current ?? document.body).appendChild(s);
        requestAnimationFrame(() => {
          s.style.opacity = "0";
          s.style.transform = `translateY(18px) rotate(${Math.random() * 50 - 25}deg)`;
        });
        setTimeout(() => s.remove(), 730);
      }
    };
    const onDown = () => (down = true);
    const onUp = () => (down = false);

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("pointerup", onUp);

    const tick = () => {
      t += 0.02;
      let tx: number, ty: number, tw: number, th: number, rot: number;
      if (hot && hot.isConnected) {
        const r = hot.getBoundingClientRect();
        tx = r.left - 5;
        ty = r.top - 5;
        tw = r.width + 10;
        th = r.height + 10;
        rot = 0;
      } else {
        const s = down ? 20 : 34;
        tx = mx - s / 2;
        ty = my - s / 2;
        tw = s;
        th = s;
        rot = Math.sin(t) * 10;
      }
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      cw += (tw - cw) * 0.22;
      ch += (th - ch) * 0.22;
      if (seen) {
        dot.style.opacity = "1";
        frame.style.opacity = "1";
      }
      dot.style.transform = `translate(${mx - 3}px,${my - 3}px)`;
      frame.style.width = `${cw}px`;
      frame.style.height = `${ch}px`;
      frame.style.transform = `translate(${cx}px,${cy}px) rotate(${rot}deg)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
    };
  }, []);

  const corner = (pos: React.CSSProperties): React.CSSProperties => ({
    position: "absolute",
    width: 9,
    height: 9,
    ...pos,
  });

  return (
    <>
      <div
        ref={glyphLayerRef}
        aria-hidden="true"
        style={{ position: "fixed", inset: 0, zIndex: 9998, pointerEvents: "none" }}
      />
      <div
        ref={frameRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 36,
          height: 36,
          zIndex: 9999,
          pointerEvents: "none",
          transform: "translate(-100px,-100px)",
          opacity: 0,
        }}
      >
        <span
          style={corner({
            left: 0,
            top: 0,
            borderTop: "1.5px solid var(--accent)",
            borderLeft: "1.5px solid var(--accent)",
            borderTopLeftRadius: 5,
          })}
        />
        <span
          style={corner({
            right: 0,
            top: 0,
            borderTop: "1.5px solid var(--accent)",
            borderRight: "1.5px solid var(--accent)",
            borderTopRightRadius: 5,
          })}
        />
        <span
          style={corner({
            left: 0,
            bottom: 0,
            borderBottom: "1.5px solid var(--accent)",
            borderLeft: "1.5px solid var(--accent)",
            borderBottomLeftRadius: 5,
          })}
        />
        <span
          style={corner({
            right: 0,
            bottom: 0,
            borderBottom: "1.5px solid var(--accent)",
            borderRight: "1.5px solid var(--accent)",
            borderBottomRightRadius: 5,
          })}
        />
      </div>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--accent)",
          zIndex: 9999,
          pointerEvents: "none",
          transform: "translate(-100px,-100px)",
          opacity: 0,
        }}
      />
    </>
  );
}
