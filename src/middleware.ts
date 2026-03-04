import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET || "super-secure-admin-secret-key-12345";
const key = new TextEncoder().encode(secretKey);

// ─── BLOCKED IPs (abusive bots / scrapers) ───
const BLOCKED_IPS = new Set([
    "185.177.72.52", // 1382 requests in 7 days
    "2400:adc7:2110:2f00:8c4f:f6b1:eb9b:8799", // newly identified heavy hammer
]);

export async function middleware(req: NextRequest) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
        || req.headers.get("x-real-ip")
        || "unknown";
    const path = req.nextUrl.pathname;

    // ─── 1. BLOCK KNOWN ABUSIVE IPs ───
    if (BLOCKED_IPS.has(ip)) {
        return new NextResponse("Forbidden", { status: 403 });
    }

    // ─── 2. ADMIN AUTH ───
    const isProtectedRoute = path.startsWith("/admin") && path !== "/admin/login";

    if (isProtectedRoute) {
        const session = req.cookies.get("admin_session")?.value;

        if (!session) {
            return NextResponse.redirect(new URL("/admin/login", req.url));
        }

        try {
            await jwtVerify(session, key, { algorithms: ["HS256"] });
        } catch (error) {
            return NextResponse.redirect(new URL("/admin/login", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    // Match all routes except internal Next.js static files and images
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};
