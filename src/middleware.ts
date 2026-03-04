import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET || "super-secure-admin-secret-key-12345";
const key = new TextEncoder().encode(secretKey);

// ─── BLOCKED IPs (abusive bots / scrapers) ───
const BLOCKED_IPS = new Set([
    "185.177.72.52", // 1382 requests in 7 days — aggressive scraper
]);

// ─── IN-MEMORY RATE LIMITER ───
// Tracks requests per IP in a sliding window
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute window
const RATE_LIMIT_MAX = 60;        // Max 60 requests per minute per IP

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now > entry.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return false;
    }

    entry.count++;
    if (entry.count > RATE_LIMIT_MAX) {
        return true;
    }
    return false;
}

// Clean up stale entries every 5 minutes to prevent memory leak
setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of rateLimitMap) {
        if (now > entry.resetTime) {
            rateLimitMap.delete(ip);
        }
    }
}, 300_000);

export async function middleware(req: NextRequest) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
        || req.headers.get("x-real-ip")
        || "unknown";
    const path = req.nextUrl.pathname;

    // ─── 1. BLOCK KNOWN ABUSIVE IPs ───
    if (BLOCKED_IPS.has(ip)) {
        return new NextResponse("Forbidden", { status: 403 });
    }

    // ─── 2. RATE LIMIT ALL REQUESTS ───
    if (isRateLimited(ip)) {
        return new NextResponse("Too Many Requests", {
            status: 429,
            headers: { "Retry-After": "60" },
        });
    }

    // ─── 3. ADD CACHING HEADERS FOR STATIC PAGES ───
    const response = NextResponse.next();

    // Cache static pages aggressively at CDN/browser level
    if (!path.startsWith("/admin") && !path.startsWith("/api")) {
        response.headers.set(
            "Cache-Control",
            "public, s-maxage=3600, stale-while-revalidate=86400"
        );
    }

    // Cache static assets for 1 year
    if (path.match(/\.(js|css|png|jpg|jpeg|webp|svg|ico|woff|woff2)$/)) {
        response.headers.set(
            "Cache-Control",
            "public, max-age=31536000, immutable"
        );
    }

    // ─── 4. ADMIN AUTH (existing logic) ───
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

    return response;
}

export const config = {
    // Match ALL routes (for rate limiting + caching + admin auth)
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};
