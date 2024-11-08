import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import MotionWrapper from "@/components/wrappers/MotionWrapper";
import Providers from "@/components/providers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PageProgressBar } from "@/components/PageProgressBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "dali electronic",
  description: "dali electronic is a company that sells electronic products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={` scroll-smooth`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <PageProgressBar>
          <Providers>
            <MotionWrapper>{children}</MotionWrapper>
          </Providers>
          <Toaster />
        </PageProgressBar>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
