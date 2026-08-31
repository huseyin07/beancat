import type { Metadata } from "next";
import { Inter, Noto_Sans_JP, Space_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-mono", display: "swap" });
const noto = Noto_Sans_JP({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-noto-jp", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://mamearc.example"),
  title: "豆 — The Original Arc Cat",
  description: "Before the narrative was translated, the original name was already there. Discover the archived @arc lore behind 豆.",
  openGraph: {
    title: "豆 WAS HERE FIRST.",
    description: "The name before Arc. The coin before BEANCAT.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${mono.variable} ${noto.variable}`}>{children}</body>
    </html>
  );
}
