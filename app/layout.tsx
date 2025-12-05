import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
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
  title: {
    default: "Prose Refinery | Precision Editorial for Speculative Fiction",
    template: "%s | Prose Refinery"
  },
  description: "Expert developmental editing for fantasy, sci-fi, and speculative fiction. Transform your manuscript into a publication-ready work with our 7-pillar methodology.",
  keywords: ["book editor", "manuscript editing", "fantasy editor", "sci-fi editor", "developmental editing", "speculative fiction"],
  authors: [{ name: "Prose Refinery" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Prose Refinery",
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
      </body>
    </html>
  );
}
