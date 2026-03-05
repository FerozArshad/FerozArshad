"use client";

import Script from "next/script";

const GA_MEASUREMENT_ID = "G-QPD8JM6CKH";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-PDLJ9DB4";

export const GoogleAnalytics = () => {
    if (!GA_MEASUREMENT_ID) return null;

    return (
        <>
            {/* Google Analytics (GA4) */}
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
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
            {/* Google Tag Manager */}
            <Script id="google-tag-manager" strategy="afterInteractive">
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

// Helper to fire custom events (for form submissions, button clicks, etc.)
export const trackEvent = (eventName: string, params?: Record<string, string | number | boolean>) => {
    if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).gtag) {
        ((window as unknown as Record<string, unknown>).gtag as (...args: unknown[]) => void)("event", eventName, params);
    }
};
