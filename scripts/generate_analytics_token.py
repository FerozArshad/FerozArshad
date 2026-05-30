#!/usr/bin/env python3
"""
Mint a refresh token for Google Analytics Data + Search Console.

Pre-requisites
--------------
1. Google Cloud project created.
2. APIs enabled:
   - Google Analytics Data API
   - Search Console API
3. OAuth consent screen status = **Production** (NOT Testing — Testing-mode
   tokens expire after 7 days).
4. OAuth client of type **Desktop** created in Credentials.
5. Download the client JSON and save it to:
       .mcp-credentials/oauth-client.json

Usage
-----
    pip install -r scripts/requirements.txt
    python scripts/generate_analytics_token.py

It will print a URL — open it in your browser logged into the right
Google account, click through consent, and the script prints the
refresh token. Paste it into Vercel as GOOGLE_REFRESH_TOKEN.

Output
------
Prints:
    GOOGLE_CLIENT_ID=...
    GOOGLE_CLIENT_SECRET=...
    GOOGLE_REFRESH_TOKEN=...
"""

import json
import sys
from pathlib import Path

from google_auth_oauthlib.flow import InstalledAppFlow

CLIENT_JSON = Path(__file__).resolve().parent.parent / ".mcp-credentials" / "oauth-client.json"

# Read-only scopes. Add adwords if you ever wire Google Ads.
SCOPES = [
    "https://www.googleapis.com/auth/analytics.readonly",
    "https://www.googleapis.com/auth/webmasters.readonly",
]


def main() -> None:
    if not CLIENT_JSON.exists():
        print(f"ERROR: OAuth client file not found at {CLIENT_JSON}", file=sys.stderr)
        print("Download it from Google Cloud Console → Credentials → "
              "your Desktop OAuth client → Download JSON.", file=sys.stderr)
        sys.exit(1)

    flow = InstalledAppFlow.from_client_secrets_file(str(CLIENT_JSON), SCOPES)

    # open_browser=False so the URL prints — paste it into the right Google account
    creds = flow.run_local_server(port=0, open_browser=False)

    if not creds.refresh_token:
        print("\nERROR: No refresh_token returned.", file=sys.stderr)
        print("Likely the app was previously authorized — revoke at "
              "https://myaccount.google.com/permissions and re-run.", file=sys.stderr)
        sys.exit(1)

    with open(CLIENT_JSON) as f:
        client = json.load(f)["installed"]

    print("\n" + "=" * 70)
    print("  SUCCESS — paste these into Vercel env (and the local .env):")
    print("=" * 70)
    print(f"GOOGLE_CLIENT_ID={client['client_id']}")
    print(f"GOOGLE_CLIENT_SECRET={client['client_secret']}")
    print(f"GOOGLE_REFRESH_TOKEN={creds.refresh_token}")
    print("=" * 70)
    print("\nScope granted to this token:")
    for s in SCOPES:
        print(f"  · {s}")
    print("\nNext step: also mint a SEPARATE token for Gmail with")
    print("  python scripts/generate_gmail_token.py")
    print("(the analytics token does NOT include gmail.send — by design).")


if __name__ == "__main__":
    main()
