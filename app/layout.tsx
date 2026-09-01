import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import { CursorGlow } from "@/components/cursor-glow";
import { ScrollProgress } from "@/components/scroll-progress";
import "./globals.css";
import "./growth.css";
import "./polish.css";
import "./cute.css";
import "./editorial.css";
import "./meme.css";
import "./balance.css";
import "./completion.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://xn--mh3a.online"),
  title: "豆 — BeanCat on Arc",
  description: "The cat from the old @arc. Archived in 2015. Revived as a community meme on Arc.",
  applicationName: "豆",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "豆 — BeanCat on Arc",
    description: "A cat. The name 豆. The old @arc. The internet left a receipt.",
    url: "https://xn--mh3a.online",
    siteName: "豆",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "豆 — BeanCat on Arc" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "豆 — BeanCat on Arc",
    description: "The internet left a receipt. BeanCat on Arc.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${inter.variable} ${mono.variable}`}><CursorGlow/><ScrollProgress/>{children}</body></html>;
}
