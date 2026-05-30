import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { isAllowedOrigin } from '@/lib/site-data';

const leadSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    email: z.string().email("Invalid email").max(150),
    service: z.string().max(100),
    message: z.string().min(5, "Message must be at least 5 characters").max(3000),
    botcheck: z.string().max(100).optional() // Honeypot
});

// HTML-escape user input before interpolating into the email body. Prevents
// stored-XSS when the operator opens the lead in a webmail client that renders
// HTML aggressively, and stops link/script injection through name/message/etc.
function escapeHtml(s: string): string {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// In-Memory Rate Limiter (serverless-safe, resets per cold start)
const requests = new Map();

function rateLimit(ip: string) {
    const now = Date.now();
    const window = 60000; // 1 minute

    if (!requests.has(ip)) requests.set(ip, []);
    const timestamps = requests.get(ip).filter((t: number) => now - t < window);
    timestamps.push(now);
    requests.set(ip, timestamps);

    return timestamps.length < 10; // Max 10 requests/min per IP
}

// Periodic cleanup so the in-memory map doesn't grow unbounded across warm invocations.
if (typeof setInterval !== "undefined") {
    setInterval(() => {
        const now = Date.now();
        const cutoff = 60_000 * 5;
        for (const [ip, timestamps] of requests) {
            const fresh = (timestamps as number[]).filter((t) => now - t < cutoff);
            if (fresh.length === 0) requests.delete(ip);
            else requests.set(ip, fresh);
        }
    }, 5 * 60_000).unref?.();
}

export async function POST(req: Request) {
    // ─── Origin allowlist (CSRF defense) ────────────────────────────────────
    // Browser POSTs send an Origin header; same-site fetches from our front-end
    // will match the canonical hosts. Anyone scripting from a third-party
    // origin gets rejected here before any handler logic runs. Server-side
    // requests (curl, n8n, etc.) typically omit Origin entirely; we still
    // accept those because the rate limiter and honeypot guard them.
    //
    // Per Spenzio playbook: hardcode the prod hosts via lib/site-data —
    // process.env.NEXT_PUBLIC_* drifts on Vercel build/run boundaries.
    const origin = req.headers.get("origin");
    if (origin && !isAllowedOrigin(origin)) {
        console.warn(`[API/Contact] BLOCKED origin: ${origin}`);
        return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
    }

    // Rate limit check
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (ip !== "unknown" && !rateLimit(ip)) {
        return NextResponse.json({ error: "Too many requests. Please wait a minute." }, { status: 429 });
    }

    try {
        const body = await req.json();
        
        // Strict Validation & Sanitization
        const result = leadSchema.safeParse(body);
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            const errorMessages = Object.entries(fieldErrors).map(([field, msgs]) => `${field}: ${msgs?.join(', ')}`).join(' | ');
            return NextResponse.json({ error: "Validation failed", details: errorMessages }, { status: 400 });
        }

        const { name, email, service, message, botcheck } = result.data;

        // HONEYPOT: If bots fill out the hidden field, silently reject but return 200
        if (botcheck) {
            console.warn(`[API/Contact] SPAM BLOCKED: Honeypot tripped by IP ${ip}`);
            return NextResponse.json({ message: "Lead captured successfully" }, { status: 200 }); // Trick the bot
        }

        // 1. Store the Lead in the Database via Prisma
        try {
            const { prisma } = await import('@/lib/prisma');
            await prisma.lead.create({
                data: {
                    name,
                    email,
                    service,
                    message
                }
            });
            console.log(`[API/Contact] Lead saved to database successfully for: ${email}`);
        } catch (dbError: any) {
            console.error("[API/Contact] DATABASE ERROR:", dbError.message || dbError);
            return NextResponse.json({ error: "Database storage failed", details: dbError.message || "Unknown DB error" }, { status: 500 });
        }

        // 1b. Gmail API alert (NON-FATAL — must not block the lead-save path).
        //     Uses GOOGLE_CLIENT_ID/SECRET + GMAIL_REFRESH_TOKEN (gmail.send only).
        //     If the env isn't fully set, notifyLead() returns { ok: false } and
        //     the SMTP fallback below still runs.
        try {
            const { notifyLead } = await import('@/lib/gmail');
            const r = await notifyLead({ name, email, service, message });
            if (r.ok) {
                console.log(`[API/Contact] Gmail-API alert sent for: ${email}`);
            } else {
                console.warn(`[API/Contact] Gmail-API alert skipped (${r.reason})`);
            }
        } catch (gmailErr: any) {
            console.warn("[API/Contact] Gmail-API alert errored:", gmailErr?.message || gmailErr);
        }

        // 2. Transmit via Zoho SMTP (Background Process / Non-Blocking)
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST || 'smtp.zoho.com',
                port: parseInt(process.env.SMTP_PORT || '465'),
                secure: process.env.SMTP_SECURE === 'true', // true for port 465
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            });

            // Fire and Forget (Do not await) to ensure millisecond frontend UI response
            const eName = escapeHtml(name);
            const eEmail = escapeHtml(email);
            const eService = escapeHtml(service);
            const eMessage = escapeHtml(message).replace(/\n/g, '<br>');

            transporter.sendMail({
                from: `"ferozarshad.com" <${process.env.SMTP_USER}>`,
                to: process.env.SMTP_TO || 'info@ferozarshad.com',
                replyTo: email,
                subject: `New Lead: ${service.replace(/[\r\n]/g, ' ').slice(0, 80)} inquiry from ${name.replace(/[\r\n]/g, ' ').slice(0, 60)}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0a0a0a; color: #ffffff; border: 1px solid #262626; border-radius: 12px;">
                        <h2 style="color: #3b82f6; border-bottom: 1px solid #262626; padding-bottom: 10px; margin-top: 0;">New Portfolio Lead 🚀</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr><td style="padding: 8px 0; color: #a3a3a3; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${eName}</td></tr>
                            <tr><td style="padding: 8px 0; color: #a3a3a3;">Email</td><td style="padding: 8px 0;"><a href="mailto:${eEmail}" style="color: #3b82f6;">${eEmail}</a></td></tr>
                            <tr><td style="padding: 8px 0; color: #a3a3a3;">Service</td><td style="padding: 8px 0; font-weight: 600; color: #3b82f6;">${eService}</td></tr>
                        </table>
                        <div style="background: #171717; padding: 16px; border-radius: 8px; margin-top: 16px;">
                            <p style="margin: 0 0 8px; color: #a3a3a3; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
                            <p style="margin: 0; color: #d4d4d4; line-height: 1.7;">${eMessage}</p>
                        </div>
                    </div>
                `,
            }).catch(smtpError => {
                 console.error("[API/Contact] SMTP ERROR (Background):", smtpError.message || smtpError);
            });
            console.log(`[API/Contact] SMTP email transmission triggered successfully for: ${email}`);
        } catch (smtpError: any) {
            console.error("[API/Contact] SMTP INIT ERROR:", smtpError.message || smtpError);
        }

        return NextResponse.json({ message: "Lead captured successfully" }, { status: 200 });

    } catch (error: any) {
        console.error("[API/Contact] CRITICAL FAILURE:", error.message || error);
        return NextResponse.json({ error: "Critical Pipeline Failure", details: error.message || "Unknown fatal error" }, { status: 500 });
    }
}
