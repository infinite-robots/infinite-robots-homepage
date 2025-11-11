import { Analytics } from "@vercel/analytics/next";
import { ResponsiveHeader } from "@/components/common/ResponsiveHeader";
import { SiteFooter } from "@/components/common/SiteFooter";
import type { Metadata, Viewport } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

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
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunitoSans.variable}>
      <body className="bg-white font-sans text-zinc-900 antialiased">
        <div className="flex min-h-screen flex-col">
          <ResponsiveHeader />
          <div className="flex-1">{children}</div>
          <Analytics />
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
