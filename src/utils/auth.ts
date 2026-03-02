import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.JWT_SECRET || "super-secure-admin-secret-key-12345";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    try {
        const { payload } = await jwtVerify(input, key, {
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
