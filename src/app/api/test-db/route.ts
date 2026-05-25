import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "node:crypto";

export const dynamic = "force-dynamic";

/**
 * Diagnostic endpoint — gated by SEED_SECRET bearer token.
 *
 * Hardened:
 *  - Returns 410 Gone if SEED_SECRET is unset (the default safe state)
 *  - Reveals no DB URL, host, or stack trace; only ok/latency
 */
export async function GET(req: Request) {
    const secret = process.env.SEED_SECRET;
    if (!secret || secret.length < 32) {
        return NextResponse.json({ error: "Disabled" }, { status: 410 });
    }
    const auth = req.headers.get("authorization") ?? "";
    const provided = auth.startsWith("Bearer ") ? auth.slice(7) : "";
    if (
        !provided ||
        provided.length !== secret.length ||
        !crypto.timingSafeEqual(Buffer.from(provided), Buffer.from(secret))
    ) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const start = Date.now();
    try {
        await prisma.$queryRaw`SELECT 1`;
        return NextResponse.json({ ok: true, latencyMs: Date.now() - start });
    } catch (error) {
        console.error("[test-db]", error);
        // Do not echo internals; return generic failure
        return NextResponse.json({ ok: false }, { status: 500 });
    }
}
