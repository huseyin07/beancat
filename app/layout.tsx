import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import { CursorGlow } from "@/components/cursor-glow";
import { ScrollProgress } from "@/components/scroll-progress";
import "./globals.css";
import "./growth.css";
import "./polish.css";
import "./cute.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://xn--mh3a.online"),
  title: "豆 — The OG BeanCat on Arc",
  description: "Archived in 2015. Revived on-chain. The public @arc receipt behind the OG BeanCat narrative on Arc.",
  applicationName: "豆",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "豆 — The OG BeanCat on Arc",
    description: "The name was there. The cat was there. The receipt is public.",
    url: "https://xn--mh3a.online",
    siteName: "豆",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "豆 — The OG BeanCat on Arc" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "豆 — The OG BeanCat on Arc",
    description: "Archived in 2015. Revived on-chain. Public receipt. OG lore.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${inter.variable} ${mono.variable}`}><CursorGlow/><ScrollProgress/>{children}</body></html>;
}
