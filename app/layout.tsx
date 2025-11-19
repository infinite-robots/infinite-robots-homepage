import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ResponsiveHeader } from "@/components/common/ResponsiveHeader";
import { SiteFooter } from "@/components/common/SiteFooter";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import type { Metadata, Viewport } from "next";
import { Nunito_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const themeInitScript = `(function () { try { var storageKey = "ir-theme"; var className = "dark"; var root = document.documentElement; var stored = window.localStorage.getItem(storageKey); var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches; var theme = stored === "light" || stored === "dark" ? stored : prefersDark ? "dark" : "light"; root.classList.toggle(className, theme === "dark"); root.dataset.theme = theme; root.style.colorScheme = theme; } catch (error) {} })();`;

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Infinite Robots - Better Websites That Perform",
  description:
    "Infinite Robots designs and builds high-performing websites, apps, and digital systems that help businesses grow with clarity and confidence.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon2.ico" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1120" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunitoSans.variable} suppressHydrationWarning>
      <body className="bg-white font-sans text-zinc-900 antialiased transition-colors duration-300 dark:bg-brand-surface dark:text-zinc-100">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <ResponsiveHeader />
            <div className="flex-1">{children}</div>
            <Analytics />
            <SpeedInsights />
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
