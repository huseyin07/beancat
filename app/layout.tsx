import type { Metadata } from "next";
import { Inter, Noto_Sans_JP, Space_Mono } from "next/font/google";
import { ScrollProgress } from "@/components/scroll-progress";
import "./globals.css";
import "./growth.css";
import "./polish.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-mono", display: "swap" });
const noto = Noto_Sans_JP({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-noto-jp", display: "swap" });

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
  },
  twitter: {
    card: "summary_large_image",
    title: "豆 — The OG BeanCat on Arc",
    description: "Archived in 2015. Revived on-chain. Public receipt. OG lore.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${mono.variable} ${noto.variable}`}><ScrollProgress/>{children}</body>
    </html>
  );
}
