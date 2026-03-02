import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { name, email, projectType, message } = body;

        // Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required." },
                { status: 400 }
            );
        }

        // In production, you would replace this URL with your actual n8n Webhook URL.
        // Example: const N8N_WEBHOOK_URL = "https://n8n.ferozarshad.com/webhook/lead-capture";
        const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || "https://httpbin.org/post";

        // Forward the payload to the Automation pipeline
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                email,
                projectType,
                message,
                source: "Next.js Portfolio",
                timestamp: new Date().toISOString()
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to execute webhook: ${response.statusText}`);
        }

        return NextResponse.json({ success: true, message: "Lead captured successfully via n8n." });

    } catch (error) {
        console.error("Lead Capture Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
