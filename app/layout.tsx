import { ResponsiveHeader } from "@/components/common/ResponsiveHeader";
import { SiteFooter } from "@/components/common/SiteFooter";
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Infinite Robots | Better Websites That Perform",
  description:
    "Infinite Robots designs and builds high-performing websites, apps, and digital systems that help businesses grow with clarity and confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunitoSans.variable} bg-white text-zinc-900 antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <ResponsiveHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
