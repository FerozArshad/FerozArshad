import crypto from "node:crypto";

/**
 * Runtime settings for ferozarshad.com, held in the dashboard
 * (dashboard.ferozarshad.com → Settings → Website) instead of Vercel env:
 * SMTP for lead alerts, plus the optional Gmail-API alert.
 *
 * Vercel only holds the bootstrap values: DATABASE_URL, SITE_CONFIG_URL and
 * SITE_CONFIG_KEY. Everything else is fetched from SITE_CONFIG_URL with a
 * signed request and an encrypted response:
 *
 *  - SITE_CONFIG_KEY (32 random bytes, base64) is shared with the dashboard.
 *    HKDF-SHA256 derives a signing key and an encryption key from it.
 *  - Request: X-Site-Id, X-Site-Timestamp (unix ms), X-Site-Nonce (hex),
 *    X-Site-Signature = HMAC-SHA256(signKey, `${ts}.${nonce}.GET.${path}`).
 *  - Response: { v: 1, iv, tag, data } — AES-256-GCM over the JSON settings,
 *    AAD = `${ts}.${nonce}`, so a captured response can't be replayed.
 *
 * Values are cached in memory per instance for CACHE_MS. If the dashboard is
 * unreachable, the last good values are kept; with none, process.env is the
 * fallback (useful for local dev). Server-only: never import from a client
 * component.
 */

const SITE_ID = "ferozarshad.com";
const CACHE_MS = 5 * 60 * 1000;
const TIMEOUT_MS = 5000;

export type SettingKey =
    | "SMTP_HOST"
    | "SMTP_PORT"
    | "SMTP_SECURE"
    | "SMTP_USER"
    | "SMTP_PASS"
    | "SMTP_TO"
    | "GOOGLE_CLIENT_ID"
    | "GOOGLE_CLIENT_SECRET"
    | "GMAIL_USER"
    | "GMAIL_REFRESH_TOKEN"
    | "LEAD_NOTIFY_TO";

type Settings = Partial<Record<SettingKey, string>>;

let cache: { at: number; values: Settings } | null = null;
let inflight: Promise<Settings> | null = null;

/** Signing + encryption keys derived from SITE_CONFIG_KEY (shared with the dashboard). */
export function deriveKeys(raw: string) {
    const ikm = Buffer.from(raw, "base64");
    const derive = (info: string) =>
        Buffer.from(crypto.hkdfSync("sha256", ikm, Buffer.alloc(0), info, 32));
    return { signKey: derive("site-config-sign"), encKey: derive("site-config-enc") };
}

async function fetchSettings(): Promise<Settings> {
    const url = process.env.SITE_CONFIG_URL;
    const key = process.env.SITE_CONFIG_KEY;
    if (!url || !key) throw new Error("SITE_CONFIG_URL / SITE_CONFIG_KEY not set");

    const { signKey, encKey } = deriveKeys(key);
    const ts = String(Date.now());
    const nonce = crypto.randomBytes(16).toString("hex");
    const path = new URL(url).pathname;
    const signature = crypto
        .createHmac("sha256", signKey)
        .update(`${ts}.${nonce}.GET.${path}`)
        .digest("hex");

    const res = await fetch(url, {
        method: "GET",
        cache: "no-store",
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: {
            "X-Site-Id": SITE_ID,
            "X-Site-Timestamp": ts,
            "X-Site-Nonce": nonce,
            "X-Site-Signature": signature,
        },
    });
    if (!res.ok) throw new Error(`settings fetch failed: HTTP ${res.status}`);

    const body = (await res.json()) as { v: number; iv: string; tag: string; data: string };
    if (body.v !== 1) throw new Error(`unsupported settings version ${body.v}`);

    const decipher = crypto.createDecipheriv("aes-256-gcm", encKey, Buffer.from(body.iv, "base64"));
    decipher.setAAD(Buffer.from(`${ts}.${nonce}`));
    decipher.setAuthTag(Buffer.from(body.tag, "base64"));
    const plain = Buffer.concat([
        decipher.update(Buffer.from(body.data, "base64")),
        decipher.final(),
    ]).toString("utf8");
    return JSON.parse(plain) as Settings;
}

async function loadSettings(): Promise<Settings> {
    if (cache && Date.now() - cache.at < CACHE_MS) return cache.values;
    if (!inflight) {
        inflight = fetchSettings()
            .then((values) => {
                cache = { at: Date.now(), values };
                return values;
            })
            .catch((err) => {
                console.warn("[site-config]", err instanceof Error ? err.message : err);
                // Keep serving the last good values; retry after the next window.
                if (cache) {
                    cache.at = Date.now();
                    return cache.values;
                }
                return {};
            })
            .finally(() => {
                inflight = null;
            });
    }
    return inflight;
}

/** One setting, or "" when it isn't set anywhere. */
export async function getSetting(name: SettingKey): Promise<string> {
    const values = await loadSettings();
    return values[name] || process.env[name] || "";
}

/** Several settings in one call. */
export async function getSettings<K extends SettingKey>(names: K[]): Promise<Record<K, string>> {
    const values = await loadSettings();
    return Object.fromEntries(
        names.map((n) => [n, values[n] || process.env[n] || ""])
    ) as Record<K, string>;
}
