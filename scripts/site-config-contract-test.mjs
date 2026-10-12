// Round-trip test of src/lib/site-config.ts against a reference server for the contract.
// Run: node scripts/site-config-contract-test.mjs file:///D:/ferozarshad.com/src/lib/site-config.ts
// handle() is the reference logic the dashboard route at /api/site-config/v1 must implement.
import http from "node:http";
import crypto from "node:crypto";

const KEY = crypto.randomBytes(32).toString("base64");
const PATH = "/api/site-config/v1";
const SETTINGS = { SMTP_HOST: "smtp.example.com", SMTP_PASS: "p@ss", JWT_SECRET: "x".repeat(48) };

// ---- reference server logic (what the dashboard route must do) ----
const hkdf = (info) => Buffer.from(crypto.hkdfSync("sha256", Buffer.from(KEY, "base64"), Buffer.alloc(0), info, 32));
const signKey = hkdf("site-config-sign"), encKey = hkdf("site-config-enc");
const seen = new Map();
function handle(headers, path) {
  const id = headers["x-site-id"], ts = headers["x-site-timestamp"], nonce = headers["x-site-nonce"], sig = headers["x-site-signature"];
  if (id !== "ferozarshad.com" || !ts || !nonce || !sig) return [401];
  if (Math.abs(Date.now() - Number(ts)) > 60_000) return [401];
  for (const [n, t] of seen) if (Date.now() - t > 120_000) seen.delete(n);
  if (seen.has(nonce)) return [401];
  const expected = crypto.createHmac("sha256", signKey).update(`${ts}.${nonce}.GET.${path}`).digest();
  const given = Buffer.from(sig, "hex");
  if (given.length !== expected.length || !crypto.timingSafeEqual(given, expected)) return [401];
  seen.set(nonce, Date.now());
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv("aes-256-gcm", encKey, iv);
  c.setAAD(Buffer.from(`${ts}.${nonce}`));
  const data = Buffer.concat([c.update(JSON.stringify(SETTINGS), "utf8"), c.final()]);
  return [200, { v: 1, iv: iv.toString("base64"), tag: c.getAuthTag().toString("base64"), data: data.toString("base64") }];
}
// --------------------------------------------------------------------

const server = http.createServer((req, res) => {
  const [status, body] = handle(req.headers, req.url);
  res.writeHead(status, { "Content-Type": "application/json", "Cache-Control": "no-store" });
  res.end(body ? JSON.stringify(body) : "");
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const url = `http://127.0.0.1:${server.address().port}${PATH}`;

process.env.SITE_CONFIG_URL = url;
process.env.SITE_CONFIG_KEY = KEY;
const mod = await import(process.argv[2]);
const got = await mod.getSettings(["SMTP_HOST", "SMTP_PASS", "JWT_SECRET", "GA_PROPERTY_ID"]);
const ok1 = got.SMTP_HOST === SETTINGS.SMTP_HOST && got.SMTP_PASS === SETTINGS.SMTP_PASS && got.JWT_SECRET === SETTINGS.JWT_SECRET && got.GA_PROPERTY_ID === "";
console.log("signed fetch + decrypt:", ok1 ? "PASS" : "FAIL " + JSON.stringify(got));

const bad = await fetch(url, { headers: { "X-Site-Id": "ferozarshad.com", "X-Site-Timestamp": String(Date.now()), "X-Site-Nonce": "ab", "X-Site-Signature": "00".repeat(32) } });
console.log("bad signature -> ", bad.status === 401 ? "PASS (401)" : "FAIL " + bad.status);
const stale = await fetch(url, { headers: { "X-Site-Id": "ferozarshad.com", "X-Site-Timestamp": String(Date.now() - 120_000), "X-Site-Nonce": "cd", "X-Site-Signature": "00".repeat(32) } });
console.log("stale timestamp -> ", stale.status === 401 ? "PASS (401)" : "FAIL " + stale.status);
server.close();
process.exit(ok1 && bad.status === 401 && stale.status === 401 ? 0 : 1);
