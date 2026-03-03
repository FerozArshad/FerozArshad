import type { Metadata } from "next";
import { Syne, Space_Grotesk } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/PageTransition";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { CustomCursor } from "@/components/CustomCursor";

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
  title: "Feroz Arshad | Enterprise AI Automation & High-Conversion Web Architecture",
  description: "Expert Full-Stack Developer specializing in autonomous AI workflows (n8n), Next.js scalable SaaS architecture, and high-conversion E-commerce development. Driving $1M+ in client revenue.",
  keywords: ["AI Automation", "n8n", "Next.js", "Python FastApi", "E-Commerce", "SaaS Developer", "Feroz Arshad"],
  authors: [{ name: "Feroz Arshad" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${syne.variable} font-sans antialiased bg-black text-white selection:bg-primary selection:text-white relative min-h-screen overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Global Texture Noise */}
          <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]"></div>

          <CustomCursor />

          {/* Main Content */}
          <main className="w-full relative z-10">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <ThemeSwitcher />
        </ThemeProvider>
      </body>
    </html>
  );
}
