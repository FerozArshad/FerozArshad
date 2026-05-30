/**
 * Gmail-API lead-alert helper.
 *
 * Per Spenzio playbook (`01_GOOGLE_ANALYTICS_AND_SEARCH_CONSOLE.md`):
 *
 *  - Uses the SAME OAuth client (GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET)
 *    as analytics, but with a SEPARATE refresh token (GMAIL_REFRESH_TOKEN)
 *    scoped ONLY to `gmail.send`. Least-privilege: this token cannot
 *    read mail.
 *  - MIME assembled by hand and base64url-encoded (+ → -, / → _, strip =).
 *  - Strip \r\n from any header value derived from user input — header-injection
 *    guard. Without this, a malicious "name" can inject Bcc: or extra headers.
 *  - Send is non-fatal: wrap in try/catch in the API route; the lead must save
 *    to the DB even if the email fails.
 *
 * If any env var is missing, `notifyLead()` resolves to `{ ok: false, reason }`
 * without throwing. Same if Google returns 4xx/5xx. The caller logs but does
 * not fail.
 */

import { google } from "googleapis";

type NotifyInput = {
  name: string;
  email: string;
  service: string;
  message: string;
};

type NotifyResult = { ok: true } | { ok: false; reason: string };

const GMAIL_USER = process.env.GMAIL_USER || "";
const LEAD_NOTIFY_TO = process.env.LEAD_NOTIFY_TO || GMAIL_USER;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const GMAIL_REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN || "";

/**
 * Strip every CR/LF from a single-line header value. Anything else stays.
 * (RFC 5322: header field values may not contain unfolded CRLF.)
 */
function safeHeader(s: string): string {
  return String(s).replace(/[\r\n]+/g, " ").trim();
}

function htmlEscape(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** base64url (RFC 4648 §5) — Gmail API requires this encoding for the raw message. */
function toBase64Url(input: string): string {
  return Buffer.from(input, "utf-8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function buildMessage(input: NotifyInput): string {
  const from = `"ferozarshad.com" <${safeHeader(GMAIL_USER)}>`;
  const to = safeHeader(LEAD_NOTIFY_TO);
  const replyTo = safeHeader(input.email);
  const subject = safeHeader(`New lead — ${input.service} (${input.name})`);

  const nameEsc = htmlEscape(input.name);
  const emailEsc = htmlEscape(input.email);
  const serviceEsc = htmlEscape(input.service);
  const messageHtml = htmlEscape(input.message).replace(/\n/g, "<br>");

  // Multipart text+html so both Gmail and plain-text clients render cleanly.
  const boundary = "ferozarshad-lead-" + Date.now();
  const headers = [
    `From: ${from}`,
    `To: ${to}`,
    `Reply-To: ${replyTo}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ].join("\r\n");

  const textPart = [
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "",
    `New lead from ferozarshad.com`,
    "",
    `Name:    ${input.name}`,
    `Email:   ${input.email}`,
    `Service: ${input.service}`,
    "",
    `Message:`,
    input.message,
    "",
  ].join("\r\n");

  const htmlPart = [
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "",
    `<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0a0a0a;color:#ffffff;border:1px solid #262626;border-radius:12px;">`,
    `  <h2 style="color:#3b82f6;border-bottom:1px solid #262626;padding-bottom:10px;margin-top:0;">New lead 🚀</h2>`,
    `  <table style="width:100%;border-collapse:collapse;">`,
    `    <tr><td style="padding:8px 0;color:#a3a3a3;width:120px;">Name</td><td style="padding:8px 0;font-weight:600;">${nameEsc}</td></tr>`,
    `    <tr><td style="padding:8px 0;color:#a3a3a3;">Email</td><td style="padding:8px 0;"><a href="mailto:${emailEsc}" style="color:#3b82f6;">${emailEsc}</a></td></tr>`,
    `    <tr><td style="padding:8px 0;color:#a3a3a3;">Service</td><td style="padding:8px 0;font-weight:600;color:#3b82f6;">${serviceEsc}</td></tr>`,
    `  </table>`,
    `  <div style="background:#171717;padding:16px;border-radius:8px;margin-top:16px;">`,
    `    <p style="margin:0 0 8px;color:#a3a3a3;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Message</p>`,
    `    <p style="margin:0;color:#d4d4d4;line-height:1.7;">${messageHtml}</p>`,
    `  </div>`,
    `</div>`,
    "",
    `--${boundary}--`,
  ].join("\r\n");

  return [headers, "", textPart, htmlPart].join("\r\n");
}

/**
 * Send the lead alert. Never throws — returns a discriminated result so
 * the caller can log without breaking the lead-save path.
 */
export async function notifyLead(input: NotifyInput): Promise<NotifyResult> {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GMAIL_REFRESH_TOKEN) {
    return { ok: false, reason: "missing-env" };
  }
  if (!GMAIL_USER || !LEAD_NOTIFY_TO) {
    return { ok: false, reason: "missing-mailbox-config" };
  }

  try {
    const oauth2 = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);
    oauth2.setCredentials({ refresh_token: GMAIL_REFRESH_TOKEN });

    const gmail = google.gmail({ version: "v1", auth: oauth2 });
    const raw = toBase64Url(buildMessage(input));

    await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw },
    });

    return { ok: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { ok: false, reason: msg.slice(0, 200) };
  }
}
