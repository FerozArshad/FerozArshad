#!/usr/bin/env python3
"""
Mint a refresh token for the Gmail SEND scope only.

Why a separate token?  OAuth refresh tokens are bound at consent time to the
scopes the user approved. The analytics token from generate_analytics_token.py
does NOT include gmail.send — by design (least privilege). Gmail gets its own
token so we can rotate either independently.

Pre-requisites
--------------
Same as generate_analytics_token.py:
1. OAuth consent screen in Production.
2. OAuth client of type Desktop, JSON at .mcp-credentials/oauth-client.json.
3. Gmail API enabled.

Usage
-----
    python scripts/generate_gmail_token.py

Paste the printed value into Vercel as GMAIL_REFRESH_TOKEN.
"""

import sys
from pathlib import Path

from google_auth_oauthlib.flow import InstalledAppFlow

CLIENT_JSON = Path(__file__).resolve().parent.parent / ".mcp-credentials" / "oauth-client.json"

# gmail.send is the most restrictive Gmail scope — does NOT allow reading mail.
SCOPES = ["https://www.googleapis.com/auth/gmail.send"]


def main() -> None:
    if not CLIENT_JSON.exists():
        print(f"ERROR: OAuth client file not found at {CLIENT_JSON}", file=sys.stderr)
        sys.exit(1)

    flow = InstalledAppFlow.from_client_secrets_file(str(CLIENT_JSON), SCOPES)
    creds = flow.run_local_server(port=0, open_browser=False)

    if not creds.refresh_token:
        print("\nERROR: No refresh_token returned. Revoke at "
              "https://myaccount.google.com/permissions and re-run.", file=sys.stderr)
        sys.exit(1)

    print("\n" + "=" * 70)
    print("  SUCCESS — paste this into Vercel env (and the local .env):")
    print("=" * 70)
    print(f"GMAIL_REFRESH_TOKEN={creds.refresh_token}")
    print("=" * 70)
    print("\nScope granted: https://www.googleapis.com/auth/gmail.send")
    print("This token cannot read mail, only send it.")


if __name__ == "__main__":
    main()
