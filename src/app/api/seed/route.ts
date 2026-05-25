import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";

export const dynamic = "force-dynamic";

/**
 * Bootstraps the first admin user.
 *
 * Hardened:
 *  - Requires a Bearer token matching SEED_SECRET (set in Vercel envs, rotated after first use)
 *  - 410 Gone if SEED_SECRET is unset (so the route is dead by default in prod)
 *  - Admin email + password supplied via env vars (SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD)
 *    instead of hard-coded strings, so this file contains no plaintext credentials
 *  - Refuses to re-create an existing admin
 *  - Constant-time token compare to avoid timing leaks
 */
export async function POST(req: Request) {
    const secret = process.env.SEED_SECRET;
    if (!secret || secret.length < 32) {
        return NextResponse.json({ error: "Seed disabled" }, { status: 410 });
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

    const email = (process.env.SEED_ADMIN_EMAIL || "").trim().toLowerCase();
    const password = process.env.SEED_ADMIN_PASSWORD || "";
    if (!email || !password || password.length < 12) {
        return NextResponse.json(
            { error: "SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD must be set (min 12 chars)" },
            { status: 400 }
        );
    }

    try {
        const existingAdmin = await prisma.user.findUnique({ where: { email } });
        if (existingAdmin) {
            return NextResponse.json({ error: "Admin already exists" }, { status: 409 });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const admin = await prisma.user.create({
            data: { name: process.env.SEED_ADMIN_NAME ?? "Feroz Arshad", email, password: hashedPassword },
        });
        return NextResponse.json({ ok: true, email: admin.email });
    } catch (error) {
        console.error("[seed] failure", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// GET disabled: seeding is a write op and shouldn't be GET-able.
export function GET() {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
