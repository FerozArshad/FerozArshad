"use client";

import Script from "next/script";

// Public — fine to inline. Per Spenzio playbook (`01_GOOGLE_ANALYTICS_AND_SEARCH_CONSOLE.md`):
//   "Measurement ID goes inline in the script — no env var needed (it's public)."
const GA_MEASUREMENT_ID = "G-QPD8JM6CKH";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-PDLJ9DB4";

/**
 * GA4 tag.
 *
 * `strategy="lazyOnload"` per the playbook — NOT `afterInteractive`.
 * afterInteractive was hurting LCP on the homepage. lazyOnload defers GA
 * until the page is fully loaded so the user-visible paint isn't blocked.
 */
export const GoogleAnalytics = () => {
    if (!GA_MEASUREMENT_ID) return null;

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                strategy="lazyOnload"
            />
            <Script id="google-analytics" strategy="lazyOnload">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_MEASUREMENT_ID}', {
                        page_path: window.location.pathname,
                    });
                `}
            </Script>
        </>
    );
};

export const GoogleTagManager = () => {
    if (!GTM_ID) return null;

    return (
        <>
            <Script id="google-tag-manager" strategy="lazyOnload">
                {`
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','${GTM_ID}');
                `}
            </Script>
        </>
    );
};

export const GTMNoScript = () => {
    if (!GTM_ID) return null;

    return (
        <noscript>
            <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
            />
        </noscript>
    );
};

/**
 * Fire a custom GA4 event. The canonical lead-conversion event name is
 * `generate_lead` (used as a Key Event in the GA4 console).
 *
 * Wrapped in try/catch per the playbook: if the gtag script failed to load
 * (adblock, network blip, slow lazyOnload), a throw inside this helper
 * would prevent the form's success UI from rendering.
 */
type EventParams = Record<string, string | number | boolean>;

export const trackEvent = (eventName: string, params?: EventParams) => {
    try {
        if (typeof window === "undefined") return;
        const w = window as unknown as { gtag?: (...args: unknown[]) => void };
        if (typeof w.gtag === "function") {
            w.gtag("event", eventName, params);
        }
    } catch (err) {
        // Analytics must never break the user-facing flow. Swallow silently.
        if (typeof console !== "undefined") {
            console.warn("[analytics] trackEvent failed:", err);
        }
    }
};
