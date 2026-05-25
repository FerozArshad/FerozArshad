# Deployment & Security Checklist — ferozarshad.com

## Vercel setup (one-time)

1. **Connect repo**
   - Vercel → Add New → Project → import `FerozArshad/FerozArshad`
   - Framework preset: **Next.js** (auto-detected)
   - Root Directory: `./`
   - Production branch: **main**
   - Auto-deploy on push: **on** (default)

2. **Environment variables** (Settings → Environment Variables)

   | Key | Scope | Example |
   |---|---|---|
   | `DATABASE_URL` | Production · Preview | `mysql://u:pass@host:3306/db?connection_limit=2` |
   | `SMTP_HOST` | Production · Preview | `smtp.zoho.com` |
   | `SMTP_PORT` | Production · Preview | `465` |
   | `SMTP_SECURE` | Production · Preview | `true` |
   | `SMTP_USER` | Production · Preview | `info@ferozarshad.com` |
   | `SMTP_PASS` | Production · Preview | _(Zoho app password — NEVER the real one)_ |
   | `SMTP_TO` | Production · Preview | `info@ferozarshad.com` |
   | `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Production · Preview | `G-…` |
   | `NEXT_PUBLIC_GTM_ID` | Production · Preview | `GTM-…` |
   | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Production · Preview | optional |
   | `PRISMA_CLIENT_ENGINE_TYPE` | Production · Preview | `binary` |
   | `SEED_SECRET` | Production only · **secret** | 48+ random bytes, base64 — used ONCE to call /api/seed |
   | `SEED_ADMIN_EMAIL` | Production only · **secret** | for /api/seed |
   | `SEED_ADMIN_PASSWORD` | Production only · **secret** | for /api/seed |

3. **Domain**
   - Add `ferozarshad.com` and `www.ferozarshad.com`
   - Force HTTPS (default on Vercel)
   - HSTS preload is already set in `next.config.ts` (max-age 2y, includeSubDomains, preload)

4. **First-time admin bootstrap**
   - Set `SEED_SECRET`, `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD` on Vercel
   - Trigger:
     ```bash
     curl -X POST https://ferozarshad.com/api/seed \
       -H "Authorization: Bearer $SEED_SECRET"
     ```
   - **Immediately after**, delete `SEED_SECRET` from Vercel. The route then returns `410 Gone`.

## Security posture

### What's hardened
- **HTTP headers** (`next.config.ts`):
  - HSTS preload (`max-age=63072000; includeSubDomains; preload`)
  - X-Frame-Options SAMEORIGIN; DENY on `/admin`
  - X-Content-Type-Options nosniff
  - Referrer-Policy strict-origin-when-cross-origin
  - Permissions-Policy locking down camera/mic/geo/payment/sensors
  - Content-Security-Policy with GA/GTM allowlist
  - `/admin/*` adds X-Robots-Tag noindex + no-store cache
- **Contact form** (`/api/contact`):
  - Zod schema validation (length, type, email format)
  - HTML-escaped output in delivered emails (stored-XSS protection)
  - Subject-line stripped of CRLF (header-injection protection)
  - Honeypot field silently absorbs bots
  - In-memory sliding-window rate limit: **10 req/min per IP**
- **Seed route** (`/api/seed`):
  - 410 Gone when `SEED_SECRET` env is absent (default)
  - Bearer token check with constant-time compare
  - bcrypt cost 12
  - No hard-coded credentials in source
  - GET method explicitly disabled
- **Test-DB route** (`/api/test-db`):
  - Same 410 Gone + bearer token gate
  - Emits no DB URL, host, or stack on failure
- **Cookies**:
  - Session cookies set HttpOnly + Secure + SameSite=lax (admin login flow)
- **Search-engine visibility**:
  - `robots.ts` disallows `/admin/*`, `/api/*`, `/thank-you`
  - `noindex` on every `/admin/*` response

### Pre-flight checks before each push
- [ ] No new `console.log` of full request bodies
- [ ] No new env-var values committed (only references)
- [ ] `git diff` shows no `.env`, `.n8n-secrets.txt`, `*.key`
- [ ] All new API routes have rate-limit + Zod validation

### Local dev
```bash
cp .env.example .env   # fill in
npm install
npm run dev            # http://localhost:3000
```
