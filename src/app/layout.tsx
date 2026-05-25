import type { Metadata } from "next";
import { Syne, Space_Grotesk } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/PageTransition";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { CustomCursor } from "@/components/CustomCursor";
import { GoogleAnalytics, GoogleTagManager, GTMNoScript } from "@/components/GoogleAnalytics";
import { PersonSchema, WebsiteSchema, ProfessionalServiceSchema } from "@/components/StructuredData";
import { SpeedInsights } from "@vercel/speed-insights/next";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://ferozarshad.com"),
  title: {
    default: "Feroz Arshad — Solo Engineer, Designer & Strategist for Founders",
    template: "%s · Feroz Arshad",
  },
  description:
    "A one-person practice that ships SaaS, AI automation and high-conversion commerce. Weekly Friday demos, outcome pricing, NDA + full IP transfer on every brief.",
  applicationName: "Feroz Arshad",
  keywords: [
    "solo engineer", "independent developer", "fractional CTO",
    "AI automation", "n8n consultant", "Next.js developer",
    "Python FastAPI", "headless commerce", "Shopify Hydrogen",
    "SaaS architecture", "high-conversion web design",
    "Feroz Arshad", "Karachi developer", "outcome-priced engagement",
    "OpenAI integration", "web scraping", "React engineer",
  ],
  authors: [{ name: "Feroz Arshad", url: "https://ferozarshad.com" }],
  creator: "Feroz Arshad",
  publisher: "Feroz Arshad",
  category: "technology",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ferozarshad.com",
    siteName: "Feroz Arshad",
    title: "Hire Feroz Arshad — Solo Engineer, Designer & Strategist",
    description:
      "Senior engineering, design & strategy in one head. Weekly Friday demos, outcome pricing, full IP transfer.",
    images: [{ url: "/logo-black.png", width: 1200, height: 630, alt: "Feroz Arshad" }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@ferozarshad",
    title: "Hire Feroz Arshad — Solo Engineer, Designer & Strategist",
    description:
      "One operator, no agency, no handoffs. Weekly Friday demos in your inbox.",
    images: ["/logo-black.png"],
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
    canonical: "https://ferozarshad.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PersonSchema />
        <WebsiteSchema />
        <ProfessionalServiceSchema />
        <GoogleTagManager />
      </head>
      <body className={`${spaceGrotesk.variable} ${syne.variable} font-sans antialiased bg-background text-foreground selection:bg-primary selection:text-white relative min-h-screen overflow-x-hidden transition-colors duration-300`}>
        <GTMNoScript />
        <GoogleAnalytics />

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Global Texture Noise (Hidden on mobile for pure performance) */}
          <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')] hidden md:block"></div>

          <CustomCursor />

          <main className="w-full relative z-10">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <ThemeSwitcher />
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
