import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { getSetting } from "@/lib/site-config";

// No fallback: without a real secret, sessions can't be signed or verified.
async function signingKey(): Promise<Uint8Array> {
    const secret = await getSetting("JWT_SECRET");
    if (secret.length < 32) throw new Error("JWT_SECRET is not set (min 32 chars)");
    return new TextEncoder().encode(secret);
}

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(await signingKey());
}

export async function decrypt(input: string): Promise<any> {
    try {
        const { payload } = await jwtVerify(input, await signingKey(), {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error) {
        return null;
    }
}

export async function getSession() {
    const session = (await cookies()).get("admin_session")?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function createSession(userId: string) {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    const session = await encrypt({ userId, expires });
    (await cookies()).set("admin_session", session, { expires, httpOnly: true, secure: true, sameSite: "strict" });
}

export async function clearSession() {
    (await cookies()).delete("admin_session");
}
