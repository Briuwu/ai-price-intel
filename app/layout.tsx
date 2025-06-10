import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { URLStoreProvider } from "@/providers/url-store-provider";
import { ScrapedDataStoreProvider } from "@/providers/scraped-data-store-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PriceIntel – AI-Powered Competitor Price Tracker",
  description:
    "Track competitor prices on e-commerce platforms. Analyze the market. Price smarter with AI-powered pricing recommendations.",
  keywords: [
    "ecommerce",
    "pricing tool",
    "AI pricing",
    "e-commerce price tracker",
    "competitor pricing SaaS",
  ],
  authors: [
    { name: "Brian Millonte", url: "https://priceintel-ai.vercel.app" },
  ],
  // openGraph: {
  //   title: "PriceIntel – Smarter Pricing for eCommerce",
  //   description:
  //     "Automatically track competitor pricing on e-commerce platforms. AI suggests optimal pricing based on real-time data.",
  //   url: "https://priceintel-ai.vercel.app",
  //   siteName: "PriceIntel",
  //   images: [
  //     {
  //       url: "https://priceintel-ai.vercel.app/og-image.jpg",
  //       width: 1200,
  //       height: 630,
  //       alt: "PriceIntel dashboard preview",
  //     },
  //   ],
  //   type: "website",
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "PriceIntel – AI-Powered Competitor Price Tracking",
  //   description:
  //     "Automatically track Lazada and Shopee competitor prices, analyze the market, and price with confidence.",
  //   images: ["https://priceintel-ai.vercel.app/og-image.jpg"],
  // },
  metadataBase: new URL("https://priceintel-ai.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <URLStoreProvider>
          <ScrapedDataStoreProvider>
            {children}
            <Toaster richColors />
          </ScrapedDataStoreProvider>
        </URLStoreProvider>
      </body>
    </html>
  );
}
