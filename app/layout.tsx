import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AuroraBackground } from "@/components/effects/AuroraBackground";
import { ParallaxRunes } from "@/components/effects/ParallaxRunes";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import Script from "next/script";
import ExitIntentPopup from "@/components/layout/ExitIntentPopup";

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
      <head>
        {/* Meta Pixel */}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}

        {/* Google Analytics 4 */}
        {process.env.NEXT_PUBLIC_GA4_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}');
              `}
            </Script>
          </>
        )}
      </head>
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
          <ExitIntentPopup />
        </AuroraBackground>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
