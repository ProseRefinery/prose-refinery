import type { Metadata } from "next";
import { Cinzel, Inter, Merriweather } from "next/font/google";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Children of Aiye — A YA Africanfuturist Fantasy",
  description: "When the gods return, Lagos becomes the battlefield. A YA Africanfuturist fantasy novel.",
  openGraph: {
    title: "Children of Aiye — A YA Africanfuturist Fantasy",
    description: "When the gods return, Lagos becomes the battlefield. A YA Africanfuturist fantasy novel.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Children of Aiye — A YA Africanfuturist Fantasy",
    description: "When the gods return, Lagos becomes the battlefield. A YA Africanfuturist fantasy novel.",
  },
};

export default function ChildrenOfAiyeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${cinzel.variable} ${inter.variable} ${merriweather.variable} min-h-screen bg-[#0a0a0a] text-[#f0f0f0]`}
    >
      {children}
    </div>
  );
}
