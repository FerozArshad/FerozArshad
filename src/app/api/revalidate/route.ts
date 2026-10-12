import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import crypto from "node:crypto";
import { deriveKeys } from "@/lib/site-config";

export const dynamic = "force-dynamic";

/**
 * Called by the dashboard after it creates, edits or deletes an Insight, so the
 * change shows on the site immediately instead of after the 1-hour ISR window.
 *
 * Same signing scheme as the settings fetch (see lib/site-config.ts), keyed by
 * SITE_CONFIG_KEY. Headers: X-Site-Timestamp, X-Site-Nonce,
 * X-Site-Signature = hex HMAC-SHA256(signKey,
 *   `${ts}.${nonce}.POST./api/revalidate.${hex sha256(raw body)}`).
 * Body: { "slugs": ["slug-a", ...] } — /insights, /sitemap.xml and each
 * /insights/<slug> are revalidated. Nothing else can be targeted.
 */

const WINDOW_MS = 60_000;
const seen = new Map<string, number>();

function unauthorized() {
    return new NextResponse(null, { status: 401 });
}

export async function POST(req: Request) {
    const key = process.env.SITE_CONFIG_KEY;
    if (!key) return unauthorized();

    const ts = req.headers.get("x-site-timestamp") ?? "";
    const nonce = req.headers.get("x-site-nonce") ?? "";
    const sig = req.headers.get("x-site-signature") ?? "";
    if (!/^\d+$/.test(ts) || !/^[0-9a-f]{32}$/.test(nonce) || !/^[0-9a-f]{64}$/.test(sig)) {
        return unauthorized();
    }
    if (Math.abs(Date.now() - Number(ts)) > WINDOW_MS) return unauthorized();

    const now = Date.now();
    for (const [n, t] of seen) if (now - t > 2 * WINDOW_MS) seen.delete(n);
    if (seen.has(nonce)) return unauthorized();

    const raw = await req.text();
    if (raw.length > 10_000) return unauthorized();
    const bodyHash = crypto.createHash("sha256").update(raw).digest("hex");
    const expected = crypto
        .createHmac("sha256", deriveKeys(key).signKey)
        .update(`${ts}.${nonce}.POST./api/revalidate.${bodyHash}`)
        .digest();
    if (!crypto.timingSafeEqual(Buffer.from(sig, "hex"), expected)) return unauthorized();
    seen.set(nonce, now);

    let slugs: string[] = [];
    try {
        const body = JSON.parse(raw) as { slugs?: unknown };
        if (Array.isArray(body.slugs)) {
            slugs = body.slugs.filter(
                (s): s is string => typeof s === "string" && /^[a-z0-9-]{1,191}$/.test(s)
            ).slice(0, 50);
        }
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    revalidatePath("/insights");
    revalidatePath("/sitemap.xml");
    for (const slug of slugs) revalidatePath(`/insights/${slug}`);

    return NextResponse.json({ ok: true, revalidated: ["/insights", "/sitemap.xml", ...slugs.map((s) => `/insights/${s}`)] });
}
