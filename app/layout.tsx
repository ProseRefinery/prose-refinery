import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AuroraBackground } from "@/components/effects/AuroraBackground";
import { ParallaxRunes } from "@/components/effects/ParallaxRunes";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://prose-refinery.com'),
  title: {
    default: "Prose Refinery | Precision Editorial for Speculative Fiction",
    template: "%s | Prose Refinery"
  },
  description: "Expert developmental editing for fantasy, sci-fi, and speculative fiction. We fix the structural cracks that make agents pass. Get your manuscript publication-ready.",
  keywords: ["fantasy editor", "sci-fi editor", "speculative fiction editor", "developmental editing", "manuscript evaluation", "novel editor", "book doctor", "fantasy writing coach"],
  authors: [{ name: "Prose Refinery" }],
  creator: "Prose Refinery",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://prose-refinery.com",
    siteName: "Prose Refinery",
    title: "Prose Refinery | Precision Editorial for Speculative Fiction",
    description: "Expert developmental editing for fantasy & sci-fi. We fix the structural cracks that make agents pass.",
    images: [{
      url: '/og-image.jpg', // We will need to create this later or use a generic one
      width: 1200,
      height: 630,
      alt: 'Prose Refinery Editorial'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: "Prose Refinery | Precision Editorial for Speculative Fiction",
    description: "Expert developmental editing for fantasy & sci-fi. We fix the structural cracks that make agents pass.",
    creator: "@proserefinery",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-[#05080f] text-slate-200`}
      >
        <AuroraBackground>
          <ParallaxRunes />
          <Nav />
          <main className="pt-16 min-h-screen">
            {children}
          </main>
          <Footer />
        </AuroraBackground>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
