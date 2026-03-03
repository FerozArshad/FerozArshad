import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/PageTransition";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Feroz Arshad | Enterprise AI Automation & High-Conversion Web Architecture",
  description: "Expert Full-Stack Developer specializing in autonomous AI workflows (n8n), Next.js scalable SaaS architecture, and high-conversion E-commerce development. Driving $1M+ in client revenue.",
  keywords: ["AI Automation", "n8n", "Next.js", "Python FastApi", "E-Commerce", "SaaS Developer", "Feroz Arshad"],
  authors: [{ name: "Feroz Arshad" }],
};

import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-black text-white selection:bg-primary selection:text-white relative min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Ambient background glow effect */}
          <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),rgba(0,0,0,0))]"></div>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
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
