"use client";

import { ArrowRight, ArrowUpRight, Check, Copy, RefreshCw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { tokenConfig } from "@/lib/config";
import { Reveal } from "./reveal";

type MarketData = {
  price: number | null;
  marketCap: number | null;
  liquidity: number | null;
  holders: number | null;
};

const emptyMarket: MarketData = { price: null, marketCap: null, liquidity: null, holders: null };

function money(value: number | null, price = false) {
  if (value === null) return "—";
  if (price) {
    if (value < 0.001) return `$${value.toFixed(6)}`;
    if (value < 1) return `$${value.toFixed(4)}`;
    return `$${value.toFixed(2)}`;
  }
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
}

export function MarketStrip() {
  const [data, setData] = useState<MarketData>(emptyMarket);
  const [loading, setLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState<string>("");

  async function load() {
    setLoading(true);
    try {
      const response = await fetch(`/api/market?t=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) throw new Error("Market proxy unavailable");
      const json = await response.json();
      setData({
        price: typeof json.price === "number" ? json.price : null,
        marketCap: typeof json.marketCap === "number" ? json.marketCap : null,
        liquidity: typeof json.liquidity === "number" ? json.liquidity : null,
        holders: typeof json.holders === "number" ? json.holders : null,
      });
      const sourceTime = json.updatedAt ? new Date(json.updatedAt) : new Date();
      setUpdatedAt(sourceTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    } catch {
      setData(emptyMarket);
      setUpdatedAt("");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const timer = window.setInterval(load, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const cells = [
    ["PRICE", money(data.price, true)],
    ["MARKET CAP", money(data.marketCap)],
    ["LIQUIDITY", money(data.liquidity)],
    ["HOLDERS", data.holders === null ? "—" : Math.round(data.holders).toLocaleString()],
  ];

  return (
    <section className="market-strip" aria-label="Live market data">
      <div className="market-strip-inner">
        <div className="market-live-label"><i/><span>ARC MARKET</span><small>{loading ? "SYNCING" : updatedAt ? `UPDATED ${updatedAt}` : "DATA UNAVAILABLE"}</small></div>
        <div className="market-cells">{cells.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
        <div className="market-actions"><button onClick={load} aria-label="Refresh market data"><RefreshCw size={13} className={loading ? "animate-spin" : ""}/></button><a href={tokenConfig.buyUrl} target="_blank" rel="noopener noreferrer">LIVE MARKET <ArrowUpRight size={13}/></a></div>
      </div>
    </section>
  );
}

export function ContractBar() {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(tokenConfig.contract);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }
  return (
    <section className="contract-quickbar">
      <div className="contract-quickbar-inner">
        <span className="contract-network">ARC / CONTRACT</span>
        <code>{tokenConfig.contract}</code>
        <button onClick={copy}>{copied ? <Check size={14}/> : <Copy size={14}/>} {copied ? "COPIED" : "COPY CA"}</button>
      </div>
    </section>
  );
}

export function ArchiveNow() {
  return (
    <section className="section-shell archive-now-section">
      <div className="mini-section-label"><span>ARCHIVE / NOW</span><span>THE STORY IN ONE FRAME</span></div>
      <Reveal className="archive-now-grid">
        <div className="era-card era-card-past">
          <div className="era-top"><span>2015</span><small>WEB ARCHIVE</small></div>
          <div className="era-main"><span>@arc</span><strong>豆</strong><p>CAT PROFILE</p></div>
          <a href={tokenConfig.archiveUrl} target="_blank" rel="noopener noreferrer">VIEW RECEIPT <ArrowUpRight size={14}/></a>
        </div>
        <div className="era-bridge"><span>THEN</span><ArrowRight/><strong>NOW</strong></div>
        <div className="era-card era-card-now">
          <div className="era-top"><span>NOW</span><small>ARC NETWORK</small></div>
          <div className="era-main"><span>Arc</span><strong>豆</strong><p>ON-CHAIN</p></div>
          <a href={tokenConfig.explorerUrl} target="_blank" rel="noopener noreferrer">VIEW ON-CHAIN <ArrowUpRight size={14}/></a>
        </div>
      </Reveal>
      <Reveal className="archive-now-thesis"><span>SAME NAME.</span><span>SAME LORE.</span><strong>NEW CHAPTER.</strong></Reveal>
    </section>
  );
}

export function CommunityRevival() {
  return (
    <section className="revival-section">
      <div className="revival-grid"/>
      <Reveal className="relative mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
        <div><p className="revival-label">COMMUNITY REVIVAL / CTO</p><h2>THE OG DIDN&apos;T DISAPPEAR.<br/><span>IT GOT A COMMUNITY.</span></h2></div>
        <div className="revival-copy"><p>The original-name 豆 had the archive story, but no active community pushing it forward. The community is bringing that OG narrative back into view — preserving the receipt, the cat and the on-chain token without rewriting the history.</p><div className="revival-facts"><span>ARCHIVE PRESERVED</span><span>COMMUNITY LED</span><span>ON ARC</span></div></div>
      </Reveal>
    </section>
  );
}

export function ShareCTA() {
  const xIntent = useMemo(() => {
    const text = "The name was there. The cat was there. The receipt is public.\n\nOG 豆 on Arc.\n\n豆.online";
    return `https://x.com/intent/post?text=${encodeURIComponent(text)}`;
  }, []);

  return (
    <section className="share-cta">
      <div className="share-cta-grid"/>
      <Reveal className="relative mx-auto max-w-[1440px]">
        <p className="share-kicker">COMMUNITY SIGNAL</p>
        <h2>KEEP THE OG<br/><span>VISIBLE.</span></h2>
        <p className="share-copy">The archive is public. The contract is public. Help the original narrative stay impossible to miss.</p>
        <div className="share-actions"><a className="button button-dark" href={xIntent} target="_blank" rel="noopener noreferrer">SHARE ON X <ArrowUpRight size={15}/></a><a className="button button-outline" href={tokenConfig.telegramUrl} target="_blank" rel="noopener noreferrer">JOIN TELEGRAM <ArrowUpRight size={15}/></a></div>
      </Reveal>
    </section>
  );
}
