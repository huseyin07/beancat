"use client";

import { ArrowUpRight, Check, Copy, RefreshCw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { tokenConfig } from "@/lib/config";
import { Reveal } from "./reveal";

type MarketData = { price: number | null; marketCap: number | null; liquidity: number | null; holders: number | null; source?: string };
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
  const [updatedAt, setUpdatedAt] = useState("");

  async function load() {
    setLoading(true);
    try {
      const response = await fetch(`/api/market?t=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) throw new Error("Market unavailable");
      const json = await response.json();
      setData({
        price: typeof json.price === "number" ? json.price : null,
        marketCap: typeof json.marketCap === "number" ? json.marketCap : null,
        liquidity: typeof json.liquidity === "number" ? json.liquidity : null,
        holders: typeof json.holders === "number" ? json.holders : null,
        source: typeof json.source === "string" ? json.source : "Arcscan",
      });
      const sourceTime = json.updatedAt ? new Date(json.updatedAt) : new Date();
      setUpdatedAt(sourceTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    } catch { setData(emptyMarket); setUpdatedAt(""); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); const timer = window.setInterval(load, 60_000); return () => window.clearInterval(timer); }, []);

  const cells = [["PRICE", money(data.price, true)], ["MCAP", money(data.marketCap)], ["LIQ", money(data.liquidity)], ["HOLDERS", data.holders === null ? "—" : Math.round(data.holders).toLocaleString()]];
  return <section className="market-line" aria-label="Live market data"><div className="market-line-inner"><div className="market-line-status"><i/><span>{loading ? "SYNCING" : "LIVE"}</span></div>{cells.map(([label,value]) => <div className="market-line-cell" key={label}><span>{label}</span><strong>{value}</strong></div>)}<div className="market-line-meta"><span>{updatedAt ? `UPDATED ${updatedAt}` : "DATA UNAVAILABLE"}</span><button onClick={load} aria-label="Refresh market data"><RefreshCw size={12} className={loading ? "animate-spin" : ""}/></button><a href={tokenConfig.explorerUrl} target="_blank" rel="noopener noreferrer">ARC SCAN <ArrowUpRight size={11}/></a></div></div></section>;
}

export function ContractBar() {
  const [copied,setCopied]=useState(false);
  async function copy(){await navigator.clipboard.writeText(tokenConfig.contract);setCopied(true);window.setTimeout(()=>setCopied(false),1500);}
  return <section className="contract-quickbar contract-quickbar-sticky"><div className="contract-quickbar-inner"><span className="contract-network">ARC / CONTRACT</span><code>{tokenConfig.contract}</code><button onClick={copy}>{copied?<Check size={14}/>:<Copy size={14}/>} {copied?"COPIED":"COPY CA"}</button></div></section>;
}

export function ArchiveNow() {
  return <section className="section-shell archive-now-editorial"><div className="mini-section-label"><span>ARCHIVE / NOW</span><span>ONE PUBLIC TRAIL</span></div><Reveal className="archive-now-editorial-grid"><div className="archive-now-year"><span>2015</span><small>WAYBACK</small></div><div className="archive-now-copy"><p className="archive-now-kicker">THE ARCHIVED ACCOUNT</p><h2>@arc / CAT / 豆</h2><p>A public capture preserved the handle, the cat avatar, and the one-character display name years before the current Arc blockchain brand.</p><a href={tokenConfig.archiveUrl} target="_blank" rel="noopener noreferrer">VIEW RECEIPT <ArrowUpRight size={14}/></a></div><div className="archive-now-divider"/><div className="archive-now-year archive-now-year-now"><span>NOW</span><small>ON ARC</small></div><div className="archive-now-copy"><p className="archive-now-kicker">THE ON-CHAIN CHAPTER</p><h2>COMMUNITY / ARC</h2><p>The archived name became a community meme narrative on Arc without changing what the original receipt actually shows.</p><a href={tokenConfig.explorerUrl} target="_blank" rel="noopener noreferrer">VIEW ON-CHAIN <ArrowUpRight size={14}/></a></div></Reveal></section>;
}

export function CommunityRevival() {
  return <section className="revival-editorial"><Reveal className="revival-editorial-inner"><div><p className="revival-label">COMMUNITY REVIVAL / CTO</p><h2>THE LORE WAS<br/>ALREADY THERE.</h2></div><div className="revival-editorial-copy"><p>The community did not invent the archive. It found it, preserved it, and carried the original-name narrative forward on Arc.</p><div className="revival-editorial-meta"><span>PUBLIC ARCHIVE</span><span>COMMUNITY LED</span><span>ON ARC</span></div></div></Reveal></section>;
}

export function ShareCTA() {
  const [copied,setCopied]=useState(false);
  const xIntent=useMemo(()=>{const text="The name was there. The cat was there. The receipt is public.\n\nOG 豆 on Arc.\n\n豆.online";return `https://x.com/intent/post?text=${encodeURIComponent(text)}`;},[]);
  async function copy(){await navigator.clipboard.writeText(tokenConfig.contract);setCopied(true);window.setTimeout(()=>setCopied(false),1500);}
  return <section className="share-cta"><div className="share-cta-grid"/><Reveal className="relative mx-auto max-w-[1440px]"><p className="share-kicker">COMMUNITY SIGNAL</p><h2>KEEP THE OG<br/><span>VISIBLE.</span></h2><p className="share-copy">The archive is public. The contract is public. Help the original narrative stay impossible to miss.</p><div className="share-actions"><a className="button button-dark" href={xIntent} target="_blank" rel="noopener noreferrer">SHARE ON X <ArrowUpRight size={15}/></a><a className="button button-outline" href={tokenConfig.telegramUrl} target="_blank" rel="noopener noreferrer">JOIN TELEGRAM <ArrowUpRight size={15}/></a><button className="button button-outline" onClick={copy}>{copied?<Check size={15}/>:<Copy size={15}/>} {copied?"COPIED":"COPY CA"}</button></div></Reveal></section>;
}
