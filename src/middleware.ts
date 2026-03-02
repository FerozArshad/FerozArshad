import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET || "super-secure-admin-secret-key-12345";
const key = new TextEncoder().encode(secretKey);

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
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
    matcher: ["/admin/:path*"],
};
