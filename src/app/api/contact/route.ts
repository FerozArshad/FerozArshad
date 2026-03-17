import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const leadSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    email: z.string().email("Invalid email").max(150),
    service: z.string().max(100),
    message: z.string().min(5, "Message must be at least 5 characters").max(3000),
    botcheck: z.string().max(100).optional() // Honeypot
});

// In-Memory Rate Limiter (serverless-safe, resets per cold start)
const requests = new Map();

function rateLimit(ip: string) {
    const now = Date.now();
    const window = 60000; // 1 minute

    if (!requests.has(ip)) requests.set(ip, []);
    const timestamps = requests.get(ip).filter((t: number) => now - t < window);
    timestamps.push(now);
    requests.set(ip, timestamps);

    return timestamps.length < 20; // Max 20 requests/min per IP
}

export async function POST(req: Request) {
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

        // 2. Transmit via Zoho SMTP
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

            await transporter.sendMail({
                from: `"ferozarshad.com" <${process.env.SMTP_USER}>`,
                to: process.env.SMTP_TO || 'info@ferozarshad.com',
                replyTo: email,
                subject: `New Lead: ${service} inquiry from ${name}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0a0a0a; color: #ffffff; border: 1px solid #262626; border-radius: 12px;">
                        <h2 style="color: #3b82f6; border-bottom: 1px solid #262626; padding-bottom: 10px; margin-top: 0;">New Portfolio Lead 🚀</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr><td style="padding: 8px 0; color: #a3a3a3; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
                            <tr><td style="padding: 8px 0; color: #a3a3a3;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #3b82f6;">${email}</a></td></tr>
                            <tr><td style="padding: 8px 0; color: #a3a3a3;">Service</td><td style="padding: 8px 0; font-weight: 600; color: #3b82f6;">${service}</td></tr>
                        </table>
                        <div style="background: #171717; padding: 16px; border-radius: 8px; margin-top: 16px;">
                            <p style="margin: 0 0 8px; color: #a3a3a3; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
                            <p style="margin: 0; color: #d4d4d4; line-height: 1.7;">${message.replace(/\n/g, '<br>')}</p>
                        </div>
                    </div>
                `,
            });
            console.log(`[API/Contact] SMTP email transmitted successfully for: ${email}`);
        } catch (smtpError: any) {
            console.error("[API/Contact] SMTP ERROR (Non-Blocking):", smtpError.message || smtpError);
            console.error("The Lead was saved to the DB, but the admin email notification failed to send. Check Zoho SMTP credentials.");
            // We intentionally do NOT return a 500 here because the Lead was successfully captured by the DB.
            // Returning 200 ensures the user perfectly enters the /thank-you funnel.
        }

        return NextResponse.json({ message: "Lead captured successfully" }, { status: 200 });

    } catch (error: any) {
        console.error("[API/Contact] CRITICAL FAILURE:", error.message || error);
        return NextResponse.json({ error: "Critical Pipeline Failure", details: error.message || "Unknown fatal error" }, { status: 500 });
    }
}
