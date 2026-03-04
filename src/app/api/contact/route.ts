import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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
        const { name, email, service, message } = body;

        if (!name || !email || !service || !message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // 1. Store the Lead in the Database via Prisma
        const { prisma } = await import('@/lib/prisma');
        await prisma.lead.create({
            data: {
                name,
                email,
                service,
                message
            }
        });

        // Zoho SMTP transporter
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

        return NextResponse.json({ message: "Message sent successfully" }, { status: 200 });

    } catch (error) {
        console.error("SMTP Error:", error);
        return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
    }
}
