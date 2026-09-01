"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { tokenConfig } from "@/lib/config";
import { MarketStrip, ContractBar } from "./growth-sections";

const nav = [["LORE", "#lore"], ["RECEIPT", "#receipt"], ["TOKEN", "#token"]];

type ActionLinkProps = { href: string; children: ReactNode; className?: string };
function ActionLink({ href, children, className = "" }: ActionLinkProps) {
  if (!href) return <span className={`${className} opacity-40`} aria-disabled="true">{children}</span>;
  return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}</a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="meme-header">
    <div className="meme-header-inner">
      <a className="meme-brand" href="#top"><span className="meme-brand-kanji">豆</span><span>BEANCAT</span></a>
      <nav className="meme-nav">{nav.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav>
      <div className="meme-header-cta">
        <ActionLink href={tokenConfig.xUrl} className="meme-mini-link">X</ActionLink>
        <ActionLink href={tokenConfig.telegramUrl} className="meme-mini-link">TG</ActionLink>
        <ActionLink href={tokenConfig.buyUrl} className="meme-buy">BUY 豆 <ArrowUpRight size={15}/></ActionLink>
      </div>
      <button className="meme-menu" aria-label="Toggle menu" onClick={() => setOpen(v => !v)}>{open ? <X/> : <Menu/>}</button>
    </div>
    <AnimatePresence>{open && <motion.div className="meme-mobile" initial={{height:0, opacity:0}} animate={{height:"auto", opacity:1}} exit={{height:0, opacity:0}}>{nav.map(([label, href]) => <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>)}<ActionLink href={tokenConfig.buyUrl}>BUY 豆 ↗</ActionLink></motion.div>}</AnimatePresence>
  </header>;
}

function Hero() {
  return <section id="top" className="meme-hero">
    <div className="meme-hero-dots"/>
    <motion.div className="meme-scribble meme-scribble-one" animate={{rotate:[-5,2,-5]}} transition={{duration:5,repeat:Infinity}}>OG?</motion.div>
    <motion.div className="meme-scribble meme-scribble-two" animate={{y:[0,-8,0]}} transition={{duration:3.8,repeat:Infinity}}>2015!</motion.div>
    <div className="meme-hero-grid">
      <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.55}} className="meme-hero-copy">
        <div className="meme-pill">● THE CAT FROM THE OLD @ARC</div>
        <h1>BEAN<br/><span>CAT.</span></h1>
        <p className="meme-hero-line">THE INTERNET LEFT A RECEIPT.</p>
        <p className="meme-hero-text">A cat. The name <strong>豆</strong>. The old <strong>@arc</strong> handle. Archived in 2015 and now revived as a community meme on Arc.</p>
        <div className="meme-actions">
          <ActionLink href={tokenConfig.buyUrl} className="meme-primary">BUY THE CAT <ArrowUpRight size={17}/></ActionLink>
          <ActionLink href={tokenConfig.archiveUrl} className="meme-secondary">SEE THE RECEIPT</ActionLink>
        </div>
        <div className="meme-tiny-row"><span>NO ROADMAP</span><span>NO FAKE LORE</span><span>JUST RECEIPTS</span></div>
      </motion.div>

      <motion.div className="meme-cat-stage" initial={{opacity:0,scale:.94,rotate:2}} animate={{opacity:1,scale:1,rotate:-1}} transition={{duration:.65,delay:.08}}>
        <div className="meme-cat-shadow"/>
        <img src="/mame-cat-original.png" className="meme-main-cat" alt="BeanCat" draggable={false}/>
        <div className="meme-sticker meme-sticker-arc">ON ARC</div>
        <div className="meme-sticker meme-sticker-og">OG<br/>BEAN</div>
        <div className="meme-caption-card"><span>ARCHIVE SUBJECT</span><strong>豆 / BEANCAT</strong></div>
      </motion.div>
    </div>
    <div className="meme-marquee"><div>豆 • BEANCAT • OG LORE • 2015 RECEIPT • ON ARC • 豆 • BEANCAT • OG LORE • 2015 RECEIPT • ON ARC • </div></div>
  </section>;
}

function Lore() {
  return <section id="lore" className="meme-lore">
    <div className="meme-section-tag">01 / THE LORE</div>
    <div className="meme-lore-grid">
      <div className="meme-lore-big"><span>BEFORE<br/>THE TOKEN,</span><strong>THERE<br/>WAS A CAT.</strong></div>
      <div className="meme-lore-cards">
        <article><b>2012</b><h3>@arc existed.</h3><p>The handle existed years before today&apos;s Arc blockchain identity.</p></article>
        <article className="tilt-left"><b>2015</b><h3>豆 got archived.</h3><p>Wayback captured the old @arc profile with the cat avatar and the one-character name 豆.</p></article>
        <article className="tilt-right"><b>NOW</b><h3>The cat is on-chain.</h3><p>The community picked up the forgotten internet artifact and turned it into Arc-native meme lore.</p></article>
      </div>
    </div>
  </section>;
}

function Receipt() {
  return <section id="receipt" className="meme-receipt">
    <div className="meme-section-tag light">02 / RECEIPT OR IT DIDN&apos;T HAPPEN</div>
    <div className="meme-receipt-grid">
      <div className="meme-receipt-copy"><p className="meme-kicker">WAYBACK MACHINE / 23 AUG 2015</p><h2>THE<br/>RECEIPT.</h2><p>This is the whole joke and the whole point: the public archive already showed <strong>@arc</strong>, a cat avatar and the name <strong>豆</strong>.</p><ActionLink href={tokenConfig.archiveUrl} className="meme-receipt-button">OPEN ORIGINAL ARCHIVE <ArrowUpRight size={16}/></ActionLink></div>
      <ActionLink href={tokenConfig.archiveUrl} className="meme-browser-window">
        <div className="meme-browser-top"><span/><span/><span/><code>web.archive.org / twitter.com/arc</code></div>
        <img src="/archive-proof.png" alt="Archived @arc profile receipt" draggable={false}/>
        <div className="meme-browser-note">YES, THAT CAT. YES, THAT 豆.</div>
      </ActionLink>
    </div>
  </section>;
}

function Token() {
  const [copied, setCopied] = useState(false);
  async function copyContract() {
    if (!tokenConfig.contract) return;
    await navigator.clipboard.writeText(tokenConfig.contract);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }
  return <section id="token" className="meme-token">
    <div className="meme-section-tag">03 / GET THE BEAN</div>
    <div className="meme-token-box">
      <div className="meme-token-symbol">豆</div>
      <div className="meme-token-copy"><p>THE OG BEANCAT ON ARC</p><h2>ONE CAT.<br/>ONE RECEIPT.<br/>ONE BEAN.</h2><div className="meme-token-meta"><span>NETWORK <b>{tokenConfig.network}</b></span><span>TICKER <b>{tokenConfig.ticker}</b></span><span>STATUS <b>COMMUNITY REVIVAL</b></span></div><div className="meme-token-actions"><ActionLink href={tokenConfig.buyUrl} className="meme-primary">BUY 豆 <ArrowUpRight size={17}/></ActionLink><button onClick={copyContract} className="meme-secondary">{copied ? <Check size={16}/> : <Copy size={16}/>} {copied ? "COPIED" : "COPY CA"}</button><ActionLink href={tokenConfig.explorerUrl} className="meme-secondary">ARC SCAN ↗</ActionLink></div></div>
    </div>
  </section>;
}

function Footer() {
  return <footer className="meme-footer"><div className="meme-footer-title">BEAN<span>CAT</span>豆</div><div className="meme-footer-row"><p>ARCHIVED 2015. REVIVED ON ARC.</p><div><ActionLink href={tokenConfig.xUrl}>X ↗</ActionLink><ActionLink href={tokenConfig.telegramUrl}>TELEGRAM ↗</ActionLink><ActionLink href={tokenConfig.archiveUrl}>ARCHIVE ↗</ActionLink></div></div><p className="meme-disclaimer">豆 is a community meme token and is not affiliated with Arc, Circle, or the previous owner of the historical @arc account. Nothing here is financial advice.</p></footer>;
}

export function SitePage() {
  return <><Header/><main><Hero/><MarketStrip/><ContractBar/><Lore/><Receipt/><Token/></main><Footer/></>;
}
