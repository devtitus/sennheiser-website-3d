import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jsonLd = {
  "@context": "https://schema.org/",
  "@type": "Product",
  name: "Sennheiser HD 559",
  image: "https://sennheiser.melwyn.co.in/hero/ezgif-frame-001.jpg",
  description: "Experience precision-engineered open-back sound with the Sennheiser HD 559. Exceptional audiophile clarity, detachable boom microphone, and all-day comfort.",
  brand: {
    "@type": "Brand",
    name: "Sennheiser"
  },
  offers: {
    "@type": "Offer",
    url: "https://sennheiser.melwyn.co.in",
    priceCurrency: "USD",
    price: "199.00",
    availability: "https://schema.org/InStock"
  }
};

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
  openGraph: {
    title: "Sennheiser HD 559 — Open-Back Audiophile Headphones",
    description: "Experience precision-engineered open-back sound with the Sennheiser HD 559. Exceptional audiophile clarity, detachable boom microphone, and all-day comfort.",
    url: "https://sennheiser.melwyn.co.in",
    siteName: "Sennheiser",
    images: [
      {
        url: "/hero/ezgif-frame-001.jpg",
        width: 1920,
        height: 1080,
        alt: "Sennheiser HD 559 Open-Back Audiophile Headphones",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sennheiser HD 559 — Open-Back Audiophile Headphones",
    description: "Experience precision-engineered open-back sound with the Sennheiser HD 559.",
    images: ["/hero/ezgif-frame-001.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://sennheiser.melwyn.co.in",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-black text-[#a1a1a6]">{children}</body>
    </html>
  );
}
