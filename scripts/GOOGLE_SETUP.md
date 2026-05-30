# Google Cloud setup — ferozarshad.com

Exact click-by-click. Time: ~25 minutes.

You will end with **10 env vars** in Vercel (table at the bottom).

---

## ⚠️ The one thing that must be right

**OAuth consent screen MUST be in "Production" publishing status BEFORE you
mint refresh tokens.** Tokens minted while in "Testing" status expire after
**7 days** and the integration silently breaks (`invalid_grant`).

This is Step 3.8 below. Don't skip.

---

## Step 1 — Create the Cloud project

1. Open <https://console.cloud.google.com/>
2. Top bar → project dropdown → **NEW PROJECT**
3. Project name: `ferozarshad-com`
4. Location: leave as "No organization"
5. **CREATE**, wait ~30 seconds
6. Top bar → switch project to `ferozarshad-com`

## Step 2 — Enable 3 APIs

For EACH of these, paste the name in the top search bar → click the result
→ **ENABLE** button:

1. **Google Analytics Data API**
2. **Search Console API**
3. **Gmail API**

After all 3, sidebar → **APIs & Services** → **Enabled APIs & services** —
confirm all three are listed.

## Step 3 — OAuth consent screen → Production

1. Sidebar → **APIs & Services** → **OAuth consent screen**
2. User type: **External** → **CREATE**
3. App information:
   - App name: `ferozarshad.com`
   - User support email: `info@ferozarshad.com`
   - App logo: skip
   - App home page: `https://ferozarshad.com`
   - App privacy policy link: `https://ferozarshad.com` (use site root for now)
   - App terms of service link: `https://ferozarshad.com`
4. Authorized domains → **+ ADD DOMAIN** → `ferozarshad.com`
5. Developer contact: `info@ferozarshad.com`
6. **SAVE AND CONTINUE**
7. Scopes step → don't add anything → **SAVE AND CONTINUE**
8. Test users step → don't add anyone → **SAVE AND CONTINUE**
9. Summary → **BACK TO DASHBOARD**
10. **⚠️ THE CRITICAL STEP ⚠️**
    On the OAuth consent screen overview, find **Publishing status** showing
    "Testing" → click **PUBLISH APP** → confirm the dialog.

    Status should now read: **In production**.

11. About the "Google hasn't verified this app" warning you'll see during
    consent later: that's fine for your own-account use. The only scopes
    we'll request are `analytics.readonly`, `webmasters.readonly`,
    `gmail.send` — verification review only matters if other users go
    through consent. Only you will.

## Step 4 — Create the OAuth Desktop client

1. Sidebar → **APIs & Services** → **Credentials**
2. **+ CREATE CREDENTIALS** → **OAuth client ID**
3. Application type: **Desktop app** ← MUST be Desktop, not Web
4. Name: `ferozarshad-cli`
5. **CREATE**
6. A dialog shows `Client ID` and `Client Secret`. Click **DOWNLOAD JSON**.
7. Move the downloaded file to this exact path:
   ```
   C:\Users\feroz\Desktop\ferozarshad.com\.mcp-credentials\oauth-client.json
   ```
   The `.mcp-credentials/` folder is already gitignored. The JSON file never
   leaves your laptop.

## Step 5 — Install Python and dependencies

If Python isn't installed yet, install from <https://python.org> (3.9+).
Verify:

```powershell
python --version
# Python 3.x.x
```

Install dependencies for the token scripts:

```powershell
cd C:\Users\feroz\Desktop\ferozarshad.com
pip install -r scripts/requirements.txt
```

## Step 6 — Mint the Analytics + Search Console refresh token

```powershell
python scripts/generate_analytics_token.py
```

The script will print a URL like:
```
Please visit this URL to authorize this application: http://localhost:54321/...
```

**Open it in a browser** logged into the Google account that owns the GA4
property + Search Console property.

When you see "Google hasn't verified this app":
1. Click **Advanced**
2. Click **Go to ferozarshad.com (unsafe)**
3. Click **Allow** on the scopes prompt

The script then prints:
```
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REFRESH_TOKEN=...
```

**Save all three to your password manager** AND paste them into Vercel
(Step 10).

## Step 7 — Mint the Gmail-send refresh token (separate)

```powershell
python scripts/generate_gmail_token.py
```

Same flow. Prints:
```
GMAIL_REFRESH_TOKEN=...
```

This token can ONLY send mail — cannot read or search the inbox.

## Step 8 — Gather GA4 IDs

1. <https://analytics.google.com/>
2. Pick the ferozarshad.com property
3. Bottom-left gear → **Admin**
4. Under **Property** → **Property details**
5. Top-right corner → copy **PROPERTY ID** (just digits, e.g. `412345678`)
6. Your env value is the digits **prefixed with `properties/`**:
   `properties/412345678`

For the public Measurement ID:
1. Admin → **Data Streams** → click your Web stream
2. Copy **MEASUREMENT ID** (looks like `G-XXXXXXXXX`)

## Step 9 — Search Console URL + verification token

1. <https://search.google.com/search-console>
2. Note the property type in the left dropdown:
   - **Domain property** → env value: `sc-domain:ferozarshad.com`
   - **URL prefix property** → env value: `https://ferozarshad.com/`
     (include trailing slash if that's how it's registered)

For the verification token (only needed for the meta-tag method; skip if
your property is already verified via DNS or the existing Google site
verification meta is in place):

1. Search Console → **Settings** → **Ownership verification**
2. **HTML tag** method → expand it
3. Copy ONLY the value inside `content="..."` — not the full `<meta>` tag
4. Paste it as `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel

## Step 10 — Paste env vars into Vercel

Project: ferozarshad.com → Settings → Environment Variables → Production + Preview.

| Variable | Sensitive | From | Example |
|---|---|---|---|
| `GOOGLE_CLIENT_ID` | yes | Step 6 | `12345-abc.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | YES | Step 6 | `GOCSPX-...` |
| `GOOGLE_REFRESH_TOKEN` | YES | Step 6 | `1//04abc...` |
| `GMAIL_REFRESH_TOKEN` | YES | Step 7 | `1//04def...` |
| `GA_PROPERTY_ID` | no | Step 8 | `properties/412345678` |
| `GSC_SITE_URL` | no | Step 9 | `sc-domain:ferozarshad.com` |
| `GMAIL_USER` | no | your sender mailbox | `info@ferozarshad.com` |
| `LEAD_NOTIFY_TO` | no | where leads land | `info@ferozarshad.com` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | no | Step 8 | `G-QPD8JM6CKH` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | no | Step 9 | `abc123def456...` |

Mark the YES-sensitive rows as **Sensitive** in the Vercel UI (the eye icon).
That hides them from logs and `vercel env pull`.

## Step 11 — Tell me you're done

Ping me with "google done" and I'll execute tasks #6, #8, #9:
- GA4 lazyOnload + `generate_lead` event in the contact form
- `/admin/analytics` page (real GA4 + Search Console KPIs)
- Gmail-API `notifyLead()` helper in `/api/contact`

## If something goes wrong

| Symptom | Fix |
|---|---|
| Token script prints "No refresh_token returned" | App was previously authorized. Visit <https://myaccount.google.com/permissions>, find `ferozarshad-cli`, remove access, re-run the script. |
| `Access denied` when opening the consent URL | OAuth consent screen still in Testing. Go back to Step 3.10 and publish to Production. |
| Token works for 7 days then breaks | Token was minted while app was still in Testing. Re-run the script after confirming OAuth screen is Published. |
| Wrong Google account during consent | The consent URL opened the wrong account in your browser. Sign out → use the incognito flow with the right account → re-run the script. |
| Python isn't installed | <https://python.org> → check "Add to PATH" during install → restart PowerShell. |

## Rotating tokens later

Just re-run the script. The new refresh token replaces the old one — paste
it into Vercel, redeploy, done.
