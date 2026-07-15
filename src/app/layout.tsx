import type { Metadata } from "next";
import { Syne, Space_Grotesk, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/PageTransition";
import { ThemeProvider } from "@/components/theme-provider";
import { ChromeGate } from "@/components/ChromeGate";
import { GoogleAnalytics, GoogleTagManager, GTMNoScript } from "@/components/GoogleAnalytics";
import { PersonSchema, WebsiteSchema, ProfessionalServiceSchema } from "@/components/StructuredData";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_LOCALE, SITE_LANG, DEFAULT_OG_IMAGE } from "@/lib/site-data";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Home (new design) typography — variable axis covers the 250-weight display.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: "variable",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: "variable",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Feroz Arshad — Solo Engineer, Designer & Strategist for Founders",
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "solo engineer", "independent developer", "fractional CTO",
    "AI automation", "n8n consultant", "Next.js developer",
    "Python FastAPI", "headless commerce", "Shopify Hydrogen",
    "SaaS architecture", "high-conversion web design",
    "Feroz Arshad", "Karachi developer", "outcome-priced engagement",
    "OpenAI integration", "web scraping", "React engineer",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Hire Feroz Arshad — Solo Engineer, Designer & Strategist",
    description:
      "Senior engineering, design & strategy in one head. Weekly Friday demos, outcome pricing, full IP transfer.",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@ferozarshad",
    title: "Hire Feroz Arshad — Solo Engineer, Designer & Strategist",
    description:
      "One operator, no agency, no handoffs. Weekly Friday demos in your inbox.",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": SITE_URL,
      "x-default": SITE_URL,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={SITE_LANG} suppressHydrationWarning>
      <head>
        {/* Prefetch DNS for tracking origin — saves a handshake when the
            lazy-loaded GA / GTM scripts kick in late in the page lifecycle. */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <PersonSchema />
        <WebsiteSchema />
        <ProfessionalServiceSchema />
        <GoogleTagManager />
      </head>
      <body className={`${spaceGrotesk.variable} ${syne.variable} ${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground selection:bg-primary selection:text-white relative min-h-screen overflow-x-hidden transition-colors duration-300`}>
        <GTMNoScript />
        <GoogleAnalytics />

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Global Texture Noise (Hidden on mobile for pure performance) */}
          <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')] hidden md:block"></div>

          <ChromeGate />

          <main className="w-full relative z-10">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
