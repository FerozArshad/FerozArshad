"use client";

import { useRef, useState } from "react";
import { Check, ChevronDown, Send } from "lucide-react";
import { WhatsAppIcon } from "./icons";
import { EMAIL, WHATSAPP_URL } from "@/lib/home-i18n";

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-geist-mono), monospace",
  fontSize: 10.5,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: 6,
};

const chevronStyle: React.CSSProperties = {
  position: "absolute",
  right: 14,
  top: "50%",
  transform: "translateY(-50%)",
  pointerEvents: "none",
  color: "var(--muted)",
};

const fieldIn = (delay: number): React.CSSProperties => ({
  animation: "fieldIn .45s ease both",
  animationDelay: `${delay}s`,
});

export default function LeadModal({ close }: { close: () => void }) {
  const [sent, setSent] = useState<false | "email" | "wa">(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);
  const budgetRef = useRef<HTMLSelectElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);
  const botRef = useRef<HTMLInputElement>(null);

  const gatherLead = () => {
    const name = nameRef.current?.value.trim() ?? "";
    const email = emailRef.current?.value.trim() ?? "";
    if (!name || !email) return null;
    const phone = phoneRef.current?.value.trim() ?? "";
    const service = serviceRef.current?.value ?? "";
    const budget = budgetRef.current?.value ?? "";
    const details = msgRef.current?.value ?? "";
    const message = `${details}${phone ? `\n\nPhone/WhatsApp: ${phone}` : ""}\nBudget: ${budget}`;
    const waBody = encodeURIComponent(
      `Hi Feroz,\n\nName: ${name}\nEmail: ${email}${phone ? `\nPhone: ${phone}` : ""}\nService: ${service}\nBudget: ${budget}\n\n${details}`
    );
    return { name, email, service, message, waBody };
  };

  // "Send via email" POSTs to the site's hardened contact API
  // (honeypot + Zod validation + rate limiting, SMTP decoupled).
  const submitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const d = gatherLead();
    if (!d || sending) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: d.name,
          email: d.email,
          service: d.service,
          message: d.message.length < 5 ? `${d.message}\n(No details provided)` : d.message,
          botcheck: botRef.current?.value ?? "",
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }
      setSent("email");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const submitWhatsApp = () => {
    if (formRef.current && !formRef.current.reportValidity()) return;
    const d = gatherLead();
    if (!d) return;
    window.open(`${WHATSAPP_URL}?text=${d.waBody}`, "_blank");
    setSent("wa");
  };

  return (
    <div
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Start a project"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(8px)",
        animation: "fadeIn .25s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(500px,100%)",
          maxHeight: "88vh",
          overflow: "auto",
          background: "var(--surface)",
          border: "1px solid var(--border2)",
          borderRadius: 24,
          padding: 30,
          boxSizing: "border-box",
          animation: "modalIn .4s cubic-bezier(.2,1.1,.3,1)",
        }}
      >
        {!sent ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 12,
                marginBottom: 6,
              }}
            >
              <h3 style={{ margin: 0, fontSize: 22, fontWeight: 500 }}>Let’s build something great</h3>
              <button
                onClick={close}
                aria-label="Close form"
                style={{
                  border: "1px solid var(--border2)",
                  background: "transparent",
                  color: "var(--muted)",
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  cursor: "pointer",
                  fontSize: 14,
                  lineHeight: 1,
                  flexShrink: 0,
                }}
              >
                ✕
              </button>
            </div>
            <p style={{ margin: "0 0 20px", fontSize: 13.5, color: "var(--muted)" }}>
              Tell me about your project — I reply within 24 hours.
            </p>
            <form
              ref={formRef}
              onSubmit={submitEmail}
              style={{ display: "flex", flexDirection: "column", gap: 14 }}
            >
              {/* Honeypot — hidden from humans, checked by /api/contact */}
              <input
                ref={botRef}
                type="text"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }}
              />
              <div style={fieldIn(0.05)}>
                <label style={labelStyle}>Your name</label>
                <input ref={nameRef} type="text" required placeholder="Jane Smith" className="field" />
              </div>
              <div style={fieldIn(0.1)}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input ref={emailRef} type="email" required placeholder="jane@company.com" className="field" />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone / WhatsApp</label>
                    <input ref={phoneRef} type="tel" placeholder="+1 (555) 000-0000" className="field" />
                  </div>
                </div>
              </div>
              <div style={fieldIn(0.15)}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Service</label>
                    <span style={{ position: "relative", display: "block" }}>
                      <select
                        ref={serviceRef}
                        className="field"
                        style={{ appearance: "none", WebkitAppearance: "none", paddingRight: 40 }}
                      >
                        <option>WordPress / CMS</option>
                        <option>SEO</option>
                        <option>Python backend</option>
                        <option>AI automation</option>
                        <option>Next.js application</option>
                        <option>Web scraping</option>
                        <option>Something else</option>
                      </select>
                      <ChevronDown size={12} strokeWidth={2} aria-hidden="true" style={chevronStyle} />
                    </span>
                  </div>
                  <div>
                    <label style={labelStyle}>Budget</label>
                    <span style={{ position: "relative", display: "block" }}>
                      <select
                        ref={budgetRef}
                        className="field"
                        style={{ appearance: "none", WebkitAppearance: "none", paddingRight: 40 }}
                      >
                        <option>Under $500</option>
                        <option>$500 – $2,000</option>
                        <option>$2,000 – $5,000</option>
                        <option>$5,000+</option>
                        <option>Not sure yet</option>
                      </select>
                      <ChevronDown size={12} strokeWidth={2} aria-hidden="true" style={chevronStyle} />
                    </span>
                  </div>
                </div>
              </div>
              <div style={fieldIn(0.2)}>
                <label style={labelStyle}>Project details</label>
                <textarea
                  ref={msgRef}
                  rows={4}
                  placeholder="What are you building, and what does success look like?"
                  className="field"
                  style={{ resize: "vertical" }}
                />
              </div>
              <div style={fieldIn(0.25)}>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button
                    type="submit"
                    disabled={sending}
                    className="trans btn-modal-accent"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      flex: 1,
                      minWidth: 180,
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
                    {sending ? "Sending…" : "Send via email"}
                  </button>
                  <button
                    type="button"
                    onClick={submitWhatsApp}
                    className="btn-wa"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      flex: 1,
                      minWidth: 180,
                      background: "#25D366",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: 999,
                      padding: "14px 22px",
                      fontSize: 15,
                      fontWeight: 500,
                      fontFamily: "var(--font-geist-sans), sans-serif",
                      cursor: "pointer",
                      transition: "transform .25s ease, box-shadow .25s ease",
                    }}
                  >
                    <WhatsAppIcon size={16} />
                    WhatsApp
                  </button>
                </div>
                {error && (
                  <p style={{ margin: "10px 0 0", textAlign: "center", fontSize: 12.5, color: "#e5484d" }}>
                    {error}
                  </p>
                )}
                <p style={{ margin: "10px 0 0", textAlign: "center", fontSize: 12, color: "var(--muted)" }}>
                  Prefer email? Write to {EMAIL}
                </p>
              </div>
            </form>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "16px 4px" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "color-mix(in srgb, var(--accent) 15%, transparent)",
                border: "2px solid var(--accent)",
                color: "var(--accent-ink)",
                animation: "popCheck .5s cubic-bezier(.2,1.4,.4,1) both",
              }}
            >
              <Check size={32} strokeWidth={2.4} />
            </span>
            <h3 style={{ margin: "18px 0 8px", fontSize: 22, fontWeight: 500 }}>
              {sent === "email" ? "Message sent!" : "One step left!"}
            </h3>
            <p style={{ margin: "0 0 22px", fontSize: 14, lineHeight: 1.6, color: "var(--muted)" }}>
              {sent === "email"
                ? "Thanks for reaching out — I’ll get back to you within 24 hours."
                : "Your message draft just opened — hit send and I’ll get back to you within 24 hours."}
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener"
                className="trans wa-chip"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#25D366",
                  color: "#ffffff",
                  borderRadius: 999,
                  padding: "12px 22px",
                  fontSize: 14,
                }}
              >
                Chat on WhatsApp instead
              </a>
              <button
                onClick={close}
                style={{
                  border: "1px solid var(--border2)",
                  background: "transparent",
                  color: "var(--text2)",
                  borderRadius: 999,
                  padding: "12px 22px",
                  fontSize: 14,
                  fontFamily: "var(--font-geist-sans), sans-serif",
                  cursor: "pointer",
                }}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
