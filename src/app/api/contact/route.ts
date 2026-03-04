import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// In-Memory Rate Limiter to stop bots from crashing Node on Hostinger
const requests = new Map();

function rateLimit(ip: string) {
    const now = Date.now();
    const window = 60000; // 1 minute window

    if (!requests.has(ip)) {
        requests.set(ip, []);
    }

    const timestamps = requests.get(ip).filter((t: number) => now - t < window);
    timestamps.push(now);
    requests.set(ip, timestamps);

    return timestamps.length < 20; // Max 20 requests per minute per IP
}

export async function POST(req: Request) {
    // 1. Enforce Rate Limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (ip !== "unknown" && !rateLimit(ip)) {
        return NextResponse.json({ error: "Too many requests. Please wait a minute." }, { status: 429 });
    }

    try {
        const body = await req.json();
        const { name, email, service, message } = body;

        // Basic validation
        if (!name || !email || !service || !message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Configure Nodemailer Transporter
        // The user will need to supply these ENV variables in Hostinger
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.hostinger.com',
            port: parseInt(process.env.SMTP_PORT || '465'),
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER, // e.g., contact@ferozarshad.com
                pass: process.env.SMTP_PASS, // email password
            },
        });

        // Email Format
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: process.env.SMTP_USER, // Send to yourself
            replyTo: email,
            subject: `New Lead: ${service} inquiry from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-w-2xl mx-auto p-6 bg-[#0a0a0a] text-white border border-[#262626] rounded-xl">
                    <h2 style="color: #3b82f6; border-bottom: 1px solid #262626; padding-bottom: 10px;">New Portfolio Lead Received</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Target Service:</strong> ${service}</p>
                    <div style="background-color: #171717; padding: 15px; border-radius: 8px; margin-top: 20px;">
                        <h4 style="margin-top: 0; color: #a3a3a3;">Message:</h4>
                        <p style="color: #d4d4d4; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
                    </div>
                </div>
            `,
        };

        // Send Email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
