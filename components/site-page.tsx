"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { tokenConfig } from "@/lib/config";
import { MarketStrip, ContractBar } from "./growth-sections";

const nav = [["Proof", "#proof"], ["Token", "#token"], ["Community", "#community"]];

type ActionLinkProps = { href: string; children: ReactNode; className?: string };
function ActionLink({ href, children, className = "" }: ActionLinkProps) {
  if (!href) return <span className={`${className} opacity-40`} aria-disabled="true">{children}</span>;
  return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}</a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="bc-header">
    <div className="bc-header-inner">
      <a href="#top" className="bc-brand"><span className="bc-mark">豆</span><span><strong>BEANCAT</strong><small>THE INTERNET LEFT A RECEIPT</small></span></a>
      <nav className="bc-nav">{nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <div className="bc-header-actions">
        <ActionLink href={tokenConfig.xUrl} className="bc-header-social-button">X <ArrowUpRight size={13}/></ActionLink>
        <ActionLink href={tokenConfig.telegramUrl} className="bc-header-social-button">TG <ArrowUpRight size={13}/></ActionLink>
        <ActionLink href={tokenConfig.buyUrl} className="bc-buy">BUY 豆 <ArrowUpRight size={14}/></ActionLink>
      </div>
      <button className="bc-menu" aria-label="Toggle menu" onClick={() => setOpen(v => !v)}>{open ? <X/> : <Menu/>}</button>
    </div>
    <AnimatePresence>{open && <motion.div className="bc-mobile" initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}>{nav.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}<ActionLink href={tokenConfig.xUrl}>X ↗</ActionLink><ActionLink href={tokenConfig.telegramUrl}>Telegram ↗</ActionLink><ActionLink href={tokenConfig.buyUrl}>Buy 豆 ↗</ActionLink></motion.div>}</AnimatePresence>
  </header>;
}

function Hero() {
  return <section id="top" className="bc-hero meme-hero">
    <div className="bc-grid-bg"/>
    <div className="meme-orb meme-orb-a"/><div className="meme-orb meme-orb-b"/>
    <div className="bc-hero-inner">
      <motion.div className="bc-hero-copy" initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:.45}}>
        <div className="bc-overline"><span/>BEANCAT ON ARC</div>
        <p className="meme-punch">2015 CAT.<br/>2026 MEME.<br/><strong>STILL ONLINE.</strong></p>
        <p className="bc-hero-thesis">The old <strong>@arc</strong> profile had a cat avatar and the name <strong>豆</strong>. Wayback saved the receipt. The community turned the lore into a meme on Arc.</p>
        <div className="bc-hero-actions">
          <ActionLink href={tokenConfig.buyUrl} className="bc-primary">BUY 豆 <ArrowUpRight size={16}/></ActionLink>
          <ActionLink href={tokenConfig.archiveUrl} className="bc-outline">SEE THE RECEIPT <ArrowUpRight size={15}/></ActionLink>
        </div>
        <div className="bc-hero-socials">
          <ActionLink href={tokenConfig.xUrl} className="bc-hero-social-button">X / TWITTER <ArrowUpRight size={14}/></ActionLink>
          <ActionLink href={tokenConfig.telegramUrl} className="bc-hero-social-button">TELEGRAM <ArrowUpRight size={14}/></ActionLink>
        </div>
      </motion.div>

      <motion.div className="bc-hero-evidence meme-proof-card" initial={{opacity:0,rotate:1.2,y:12}} animate={{opacity:1,rotate:0,y:0}} transition={{duration:.5,delay:.04}}>
        <div className="bc-evidence-top"><span>THE RECEIPT</span><span>23.08.2015</span></div>
        <ActionLink href={tokenConfig.archiveUrl} className="bc-proof-frame">
          <img src="/archive-proof.png" alt="2015 Wayback capture of the historical @arc profile" draggable={false}/>
          <span className="bc-open-proof">OPEN ORIGINAL <ArrowUpRight size={13}/></span>
        </ActionLink>
        <div className="bc-evidence-bottom"><div><small>HANDLE</small><strong>@arc</strong></div><div><small>NAME</small><strong>豆</strong></div><div><small>AVATAR</small><strong>CAT</strong></div><div><small>YEAR</small><strong>2015</strong></div></div>
      </motion.div>
    </div>
    <div className="meme-ticker"><span>BEANCAT</span><span>豆</span><span>ARC</span><span>2015 RECEIPT</span><span>BEANCAT</span><span>豆</span><span>ARC</span></div>
  </section>;
}

function MemeBreak() {
  return <section className="meme-break">
    <div className="meme-break-inner">
      <img src="/mame-cat-original.png" alt="BeanCat"/>
      <div><span>NO ROADMAP. NO TED TALK.</span><strong>JUST A CAT WITH RECEIPTS.</strong></div>
      <ActionLink href={tokenConfig.xUrl} className="meme-break-link">MEMES ON X <ArrowUpRight size={15}/></ActionLink>
    </div>
  </section>;
}

function Proof() {
  return <section id="proof" className="bc-proof meme-proof">
    <div className="bc-proof-inner">
      <div className="bc-proof-copy"><span className="bc-light-label">THE PROOF</span><h2>THE LORE<br/>HAS A<br/><em>LINK.</em></h2><p>Open the original Wayback capture. That&apos;s it. No essay needed.</p><ActionLink href={tokenConfig.archiveUrl} className="bc-proof-button">OPEN WAYBACK <ArrowUpRight size={16}/></ActionLink></div>
      <ActionLink href={tokenConfig.archiveUrl} className="bc-browser"><div className="bc-browser-bar"><i/><i/><i/><code>web.archive.org / twitter.com/arc / 20150823022308</code></div><img src="/archive-proof.png" alt="Wayback Machine evidence" draggable={false}/><div className="bc-browser-caption"><span>PUBLIC ARCHIVE</span><strong>@arc · 豆 · CAT · 2015</strong></div></ActionLink>
    </div>
  </section>;
}

function Token() {
  const [copied,setCopied] = useState(false);
  async function copy(){if(!tokenConfig.contract)return;await navigator.clipboard.writeText(tokenConfig.contract);setCopied(true);window.setTimeout(()=>setCopied(false),1500)}
  return <section id="token" className="bc-token meme-token">
    <div className="bc-section-head"><span>THE TOKEN</span><p>Simple. On Arc. Community meme.</p></div>
    <div className="meme-token-card">
      <div className="meme-token-copy"><span>BEANCAT / ARC</span><h2>BUY THE MEME.<br/><strong>KEEP THE RECEIPT.</strong></h2><p>Community meme token inspired by the archived cat behind the old @arc profile.</p><div className="bc-token-actions"><ActionLink href={tokenConfig.buyUrl} className="bc-primary">BUY 豆 <ArrowUpRight size={16}/></ActionLink><button className="bc-outline" onClick={copy}>{copied?<Check size={15}/>:<Copy size={15}/>} {copied?"COPIED":"COPY CA"}</button><ActionLink href={tokenConfig.explorerUrl} className="bc-outline">ARC SCAN <ArrowUpRight size={14}/></ActionLink></div></div>
      <div className="meme-token-meta"><div><small>NETWORK</small><strong>{tokenConfig.network}</strong></div><div><small>TICKER</small><strong>{tokenConfig.ticker}</strong></div><div><small>CONTRACT</small><code>{tokenConfig.contract}</code></div></div>
    </div>
  </section>;
}

function Community() {
  return <section id="community" className="bc-community meme-community"><div className="bc-community-inner"><span className="bc-light-label">COMMUNITY</span><div className="meme-community-grid"><div><h2>POST MEMES.<br/>DROP RECEIPTS.<br/><strong>STAY WEIRD.</strong></h2></div><div className="bc-community-copy"><p>BeanCat lives where meme coins should live: on the timeline and in the chat.</p><div className="bc-community-actions"><ActionLink href={tokenConfig.xUrl} className="bc-community-button">FOLLOW X <ArrowUpRight size={15}/></ActionLink><ActionLink href={tokenConfig.telegramUrl} className="bc-community-button">JOIN TG <ArrowUpRight size={15}/></ActionLink><ActionLink href={tokenConfig.buyUrl} className="bc-community-buy">BUY 豆 <ArrowUpRight size={15}/></ActionLink></div></div></div></div></section>;
}

function Footer(){return <footer className="bc-footer"><div><a href="#top" className="bc-footer-brand">豆 / BEANCAT</a><p>Archived in 2015. Meme&apos;d on Arc.</p></div><nav><ActionLink href={tokenConfig.xUrl}>X ↗</ActionLink><ActionLink href={tokenConfig.telegramUrl}>Telegram ↗</ActionLink><ActionLink href={tokenConfig.archiveUrl}>Archive ↗</ActionLink><ActionLink href={tokenConfig.explorerUrl}>Explorer ↗</ActionLink></nav><p className="bc-disclaimer">豆 is a community meme token and is not affiliated with Arc, Circle, or the previous owner of the historical @arc account. Nothing on this website constitutes financial advice.</p></footer>}

export function SitePage(){return <><Header/><main><Hero/><MarketStrip/><ContractBar/><MemeBreak/><Proof/><Token/><Community/></main><Footer/></>}
