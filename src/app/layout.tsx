import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zaytoud - Pakistan's First Perfumed Hair Serum",
  description: "Discover Zaytoud, Pakistan's first premium perfumed hair serum with natural oils and therapeutic scents.",
  keywords: ["Zaytoud", "hair serum", "perfumed hair care", "natural oils", "Pakistan", "beauty", "hair care"],
  authors: [{ name: "Zaytoud Team" }],
  icons: {
    icon: "/images/logo.svg",
  },
  openGraph: {
    title: "Zaytoud",
    description: "Pakistan's first perfumed hair serum with natural oils and therapeutic scents",
    url: "https://zaytoud.com", // Replace with your actual URL
    siteName: "Zaytoud",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaytoud",
    description: "Pakistan's first perfumed hair serum with natural oils and therapeutic scents",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
