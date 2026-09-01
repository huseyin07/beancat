"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { tokenConfig } from "@/lib/config";
import { MarketStrip, ContractBar } from "./growth-sections";

const nav = [["Story", "#story"], ["Proof", "#proof"], ["Token", "#token"]];

type ActionLinkProps = { href: string; children: ReactNode; className?: string };
function ActionLink({ href, children, className = "" }: ActionLinkProps) {
  if (!href) return <span className={`${className} opacity-40`} aria-disabled="true">{children}</span>;
  return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}</a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="bc-header">
    <div className="bc-header-inner">
      <a href="#top" className="bc-brand"><span className="bc-mark">豆</span><span><strong>BEANCAT</strong><small>THE ARCHIVED CAT ON ARC</small></span></a>
      <nav className="bc-nav">{nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <div className="bc-header-actions">
        <ActionLink href={tokenConfig.xUrl} className="bc-social">X</ActionLink>
        <ActionLink href={tokenConfig.telegramUrl} className="bc-social">Telegram</ActionLink>
        <ActionLink href={tokenConfig.buyUrl} className="bc-buy">Buy 豆 <ArrowUpRight size={14}/></ActionLink>
      </div>
      <button className="bc-menu" aria-label="Toggle menu" onClick={() => setOpen(v => !v)}>{open ? <X/> : <Menu/>}</button>
    </div>
    <AnimatePresence>{open && <motion.div className="bc-mobile" initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}>{nav.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}<ActionLink href={tokenConfig.xUrl}>X ↗</ActionLink><ActionLink href={tokenConfig.telegramUrl}>Telegram ↗</ActionLink><ActionLink href={tokenConfig.buyUrl}>Buy 豆 ↗</ActionLink></motion.div>}</AnimatePresence>
  </header>;
}

function Hero() {
  return <section id="top" className="bc-hero">
    <div className="bc-grid-bg"/>
    <div className="bc-hero-inner">
      <motion.div className="bc-hero-copy" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.55}}>
        <div className="bc-overline"><span/>AN INTERNET ARTIFACT, REVIVED ON ARC</div>
        <h1><span>BEAN</span>CAT</h1>
        <p className="bc-hero-thesis">Years before today&apos;s Arc blockchain brand, the <strong>@arc</strong> handle was already online — with a cat avatar and the one-character name <strong>豆</strong>.</p>
        <p className="bc-hero-sub">Wayback Machine preserved it on <strong>23 August 2015</strong>. That forgotten snapshot became the lore behind BeanCat: a community meme revived on Arc, with the original public receipt still intact.</p>
        <div className="bc-hero-actions">
          <ActionLink href={tokenConfig.buyUrl} className="bc-primary">BUY 豆 <ArrowUpRight size={16}/></ActionLink>
          <ActionLink href={tokenConfig.archiveUrl} className="bc-outline">VIEW 2015 PROOF <ArrowUpRight size={15}/></ActionLink>
        </div>
        <div className="bc-community-links">
          <ActionLink href={tokenConfig.xUrl}>X / @BEANCATOG <ArrowUpRight size={13}/></ActionLink>
          <ActionLink href={tokenConfig.telegramUrl}>TELEGRAM <ArrowUpRight size={13}/></ActionLink>
        </div>
      </motion.div>

      <motion.div className="bc-hero-evidence" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.65,delay:.08}}>
        <div className="bc-evidence-top"><span>ORIGINAL PUBLIC RECEIPT</span><span>WAYBACK / 2015</span></div>
        <ActionLink href={tokenConfig.archiveUrl} className="bc-proof-frame">
          <img src="/archive-proof.png" alt="2015 Wayback capture of the historical @arc profile" draggable={false}/>
          <span className="bc-open-proof">OPEN ORIGINAL <ArrowUpRight size={13}/></span>
        </ActionLink>
        <div className="bc-evidence-bottom">
          <div><small>HANDLE</small><strong>@arc</strong></div>
          <div><small>NAME</small><strong>豆</strong></div>
          <div><small>AVATAR</small><strong>CAT</strong></div>
          <div><small>CAPTURED</small><strong>23.08.2015</strong></div>
        </div>
        <div className="bc-cat-seal"><img src="/mame-cat-original.png" alt="BeanCat"/><span>THE CAT<br/>IN THE RECEIPT</span></div>
      </motion.div>
    </div>
    <div className="bc-hero-statement"><span>THE NAME WAS THERE.</span><span>THE CAT WAS THERE.</span><strong>THE RECEIPT IS PUBLIC.</strong></div>
  </section>;
}

function Story() {
  const items = [
    ["01", "THE HANDLE", "@arc existed years before the current Arc blockchain identity."],
    ["02", "THE ARCHIVE", "On 23 August 2015, Wayback captured the profile with a cat avatar and the display name 豆."],
    ["03", "THE REVIVAL", "The forgotten name and cat were later revived by the community as an on-chain meme on Arc."],
  ];
  return <section id="story" className="bc-story">
    <div className="bc-section-head"><span>01 / STORY</span><p>Three facts. No manufactured mythology.</p></div>
    <div className="bc-story-title"><p>BEFORE THE MEME,<br/>THERE WAS A RECEIPT.</p><span>BeanCat does not need a fictional origin story. The archive already gave it one.</span></div>
    <div className="bc-story-list">{items.map(([n,title,text]) => <article key={n}><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
  </section>;
}

function Proof() {
  return <section id="proof" className="bc-proof">
    <div className="bc-proof-inner">
      <div className="bc-proof-copy"><span className="bc-light-label">02 / THE PROOF</span><h2>DON&apos;T TRUST<br/>THE LORE.<br/><em>VERIFY IT.</em></h2><p>The archive is not a recreated screenshot or a community-made graphic. It links directly to a Wayback Machine capture of the historical Twitter profile.</p><ActionLink href={tokenConfig.archiveUrl} className="bc-proof-button">OPEN WAYBACK CAPTURE <ArrowUpRight size={16}/></ActionLink></div>
      <ActionLink href={tokenConfig.archiveUrl} className="bc-browser">
        <div className="bc-browser-bar"><i/><i/><i/><code>web.archive.org / twitter.com/arc / 20150823022308</code></div>
        <img src="/archive-proof.png" alt="Wayback Machine evidence" draggable={false}/>
        <div className="bc-browser-caption"><span>PUBLIC ARCHIVE</span><strong>@arc · 豆 · CAT · 2015</strong></div>
      </ActionLink>
    </div>
  </section>;
}

function Token() {
  const [copied,setCopied] = useState(false);
  async function copy(){if(!tokenConfig.contract)return;await navigator.clipboard.writeText(tokenConfig.contract);setCopied(true);window.setTimeout(()=>setCopied(false),1500)}
  return <section id="token" className="bc-token">
    <div className="bc-section-head"><span>03 / ON-CHAIN</span><p>The archived name, carried forward.</p></div>
    <div className="bc-token-card">
      <div className="bc-token-mark">豆</div>
      <div className="bc-token-info">
        <span className="bc-token-eyebrow">BEANCAT / ARC</span>
        <h2>THE INTERNET<br/>FORGOT.<br/><strong>THE CHAIN DIDN&apos;T.</strong></h2>
        <div className="bc-token-facts"><div><small>NETWORK</small><b>{tokenConfig.network}</b></div><div><small>TICKER</small><b>{tokenConfig.ticker}</b></div><div><small>STATUS</small><b>COMMUNITY REVIVAL</b></div></div>
        <div className="bc-token-actions"><ActionLink href={tokenConfig.buyUrl} className="bc-primary">BUY 豆 <ArrowUpRight size={16}/></ActionLink><button className="bc-outline" onClick={copy}>{copied?<Check size={15}/>:<Copy size={15}/>} {copied?"COPIED":"COPY CA"}</button><ActionLink href={tokenConfig.explorerUrl} className="bc-outline">ARC SCAN <ArrowUpRight size={14}/></ActionLink></div>
      </div>
    </div>
  </section>;
}

function Footer(){return <footer className="bc-footer"><div><a href="#top" className="bc-footer-brand">豆 / BEANCAT</a><p>Archived in 2015. Revived on Arc.</p></div><nav><ActionLink href={tokenConfig.xUrl}>X ↗</ActionLink><ActionLink href={tokenConfig.telegramUrl}>Telegram ↗</ActionLink><ActionLink href={tokenConfig.archiveUrl}>Archive ↗</ActionLink><ActionLink href={tokenConfig.explorerUrl}>Explorer ↗</ActionLink></nav><p className="bc-disclaimer">豆 is a community meme token and is not affiliated with Arc, Circle, or the previous owner of the historical @arc account. Nothing on this website constitutes financial advice.</p></footer>}

export function SitePage(){return <><Header/><main><Hero/><MarketStrip/><ContractBar/><Story/><Proof/><Token/></main><Footer/></>}
