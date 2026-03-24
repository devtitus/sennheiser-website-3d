import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sennheiser HD 559 — Open-Back Audiophile Headphones",
  description:
    "Experience precision-engineered open-back sound with the Sennheiser HD 559. Exceptional audiophile clarity, detachable boom microphone, and all-day comfort.",
  keywords: [
    "Sennheiser",
    "HD 559",
    "headphones",
    "open-back",
    "audiophile",
    "hi-fi",
    "gaming headset",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-[#050505] text-white/60">{children}</body>
    </html>
  );
}
