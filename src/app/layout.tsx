import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import MotionWrapper from "@/components/wrappers/MotionWrapper";
import Providers from "@/components/providers";
// import { Roboto } from "next/font/google";
// export const inter = Roboto({
//   subsets: ["latin"],
//   weight: ["100", "300", "400", "500"],
// });

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <MotionWrapper>{children}</MotionWrapper>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
