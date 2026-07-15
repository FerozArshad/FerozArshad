"use client";

import { useEffect, useRef } from "react";

const FONT_SIZE = 14;
const CHARS = "01アイウエオカキクケコサシスセソ<>{}[]/=+*;";

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const fit = () => {
      cv.width = window.innerWidth;
      cv.height = window.innerHeight;
    };
    fit();
    window.addEventListener("resize", fit);

    const drops: number[] = [];
    const timer = setInterval(() => {
      if (document.hidden) return;
      const cols = Math.floor(cv.width / FONT_SIZE);
      while (drops.length < cols) drops.push(Math.floor(Math.random() * -60));
      // Tokens are scoped to the .fz wrapper, so read them off the canvas itself.
      const css = getComputedStyle(cv);
      const bg = (css.getPropertyValue("--bg") || "#0d0d0d").trim();
      const ac = (css.getPropertyValue("--accent") || "#4ADE80").trim();
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.globalAlpha = 1;
      ctx.fillStyle = ac;
      ctx.font = `${FONT_SIZE}px monospace`;
      for (let i = 0; i < cols; i++) {
        ctx.fillText(
          CHARS[Math.floor(Math.random() * CHARS.length)],
          i * FONT_SIZE,
          drops[i] * FONT_SIZE
        );
        drops[i] =
          drops[i] * FONT_SIZE > cv.height && Math.random() > 0.975
            ? 0
            : drops[i] + 1;
      }
    }, 100);

    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", fit);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        // This layer doubles as the page background: the .fz wrapper stays
        // transparent so this fixed z:-1 layer isn't painted over by it.
        backgroundColor: "var(--bg)",
        backgroundImage:
          "radial-gradient(700px 480px at 12% 8%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 70%), radial-gradient(800px 560px at 88% 55%, color-mix(in srgb, var(--accent) 8%, transparent), transparent 70%), radial-gradient(600px 400px at 40% 100%, color-mix(in srgb, var(--accent) 6%, transparent), transparent 70%)",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 }}
      />
    </div>
  );
}
