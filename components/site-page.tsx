"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { tokenConfig } from "@/lib/config";
import { MarketStrip, ContractBar } from "./growth-sections";

const nav = [["About", "#about"], ["Story", "#story"], ["Proof", "#proof"], ["Token", "#token"], ["Community", "#community"]];

type ActionLinkProps = { href: string; children: ReactNode; className?: string };
function ActionLink({ href, children, className = "" }: ActionLinkProps) {
  if (!href) return <span className={`${className} opacity-40`} aria-disabled="true">{children}</span>;
  return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}</a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="bc-header">
    <div className="bc-header-inner">
      <a href="#top" className="bc-brand"><span className="bc-mark">豆</span><span><strong>BEANCAT</strong><small>ARCHIVED 2015 · REVIVED ON ARC</small></span></a>
      <nav className="bc-nav">{nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <div className="bc-header-actions">
        <ActionLink href={tokenConfig.xUrl} className="bc-header-social-button">X / TWITTER <ArrowUpRight size={13}/></ActionLink>
        <ActionLink href={tokenConfig.telegramUrl} className="bc-header-social-button">TELEGRAM <ArrowUpRight size={13}/></ActionLink>
        <ActionLink href={tokenConfig.buyUrl} className="bc-buy">Buy 豆 <ArrowUpRight size={14}/></ActionLink>
      </div>
      <button className="bc-menu" aria-label="Toggle menu" onClick={() => setOpen(v => !v)}>{open ? <X/> : <Menu/>}</button>
    </div>
    <AnimatePresence>{open && <motion.div className="bc-mobile" initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}>{nav.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}<ActionLink href={tokenConfig.xUrl} className="bc-mobile-social">X / TWITTER ↗</ActionLink><ActionLink href={tokenConfig.telegramUrl} className="bc-mobile-social">TELEGRAM ↗</ActionLink><ActionLink href={tokenConfig.buyUrl}>Buy 豆 ↗</ActionLink></motion.div>}</AnimatePresence>
  </header>;
}

function Hero() {
  return <section id="top" className="bc-hero">
    <div className="bc-grid-bg"/>
    <div className="bc-hero-inner">
      <motion.div className="bc-hero-copy" initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:.5}}>
        <div className="bc-overline"><span/>BEANCAT · 豆 · ARC</div>
        <p className="bc-hero-kicker">A forgotten internet cat, preserved in 2015 and revived on Arc.</p>
        <p className="bc-hero-thesis">Before today&apos;s Arc blockchain brand, the historical <strong>@arc</strong> Twitter handle appeared with a cat avatar and the one-character display name <strong>豆</strong>.</p>
        <p className="bc-hero-sub">Wayback Machine captured that profile on <strong>23 August 2015</strong>. BeanCat is the community meme built around that public archive — not a fictional origin story.</p>
        <div className="bc-hero-actions">
          <ActionLink href={tokenConfig.buyUrl} className="bc-primary">BUY 豆 <ArrowUpRight size={16}/></ActionLink>
          <ActionLink href={tokenConfig.archiveUrl} className="bc-outline">VIEW ORIGINAL PROOF <ArrowUpRight size={15}/></ActionLink>
        </div>
        <div className="bc-hero-socials">
          <ActionLink href={tokenConfig.xUrl} className="bc-hero-social-button">X / TWITTER <ArrowUpRight size={14}/></ActionLink>
          <ActionLink href={tokenConfig.telegramUrl} className="bc-hero-social-button">TELEGRAM <ArrowUpRight size={14}/></ActionLink>
        </div>
      </motion.div>

      <motion.div className="bc-hero-evidence" initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:.55,delay:.05}}>
        <div className="bc-evidence-top"><span>2015 WAYBACK CAPTURE</span><span>PUBLIC SOURCE</span></div>
        <ActionLink href={tokenConfig.archiveUrl} className="bc-proof-frame">
          <img src="/archive-proof.png" alt="2015 Wayback capture of the historical @arc profile" draggable={false}/>
          <span className="bc-open-proof">OPEN ORIGINAL <ArrowUpRight size={13}/></span>
        </ActionLink>
        <div className="bc-evidence-bottom">
          <div><small>HANDLE</small><strong>@arc</strong></div>
          <div><small>NAME</small><strong>豆</strong></div>
          <div><small>AVATAR</small><strong>CAT</strong></div>
          <div><small>DATE</small><strong>23.08.2015</strong></div>
        </div>
      </motion.div>
    </div>
    <div className="bc-hero-statement"><span>ARCHIVED IN 2015</span><span>PUBLICLY VERIFIABLE</span><strong>REVIVED ON ARC</strong></div>
  </section>;
}

function About() {
  return <section id="about" className="bc-about">
    <div className="bc-section-head"><span>01 / WHAT IS BEANCAT?</span><p>Archive lore turned into an Arc-native community meme.</p></div>
    <div className="bc-about-grid">
      <div className="bc-about-visual">
        <div className="bc-cat-card"><img src="/mame-cat-original.png" alt="BeanCat archive cat" draggable={false}/><div><small>ARCHIVED AVATAR</small><strong>THE CAT BEHIND THE LORE</strong></div></div>
      </div>
      <div className="bc-about-copy">
        <span className="bc-token-eyebrow">THE IDEA</span>
        <h2>ONE OLD PROFILE.<br/>ONE STRANGE NAME.<br/><strong>ONE MEME.</strong></h2>
        <p>BeanCat is built around a real internet artifact: an archived Twitter profile using the handle <strong>@arc</strong>, the display name <strong>豆</strong>, and a cat avatar. The archive existed long before today&apos;s Arc blockchain identity.</p>
        <p>The community revived that forgotten combination as a meme token on Arc. The archive is the source of the story; the current token is a separate community project.</p>
        <div className="bc-about-points"><div><small>SOURCE</small><b>WAYBACK MACHINE</b></div><div><small>CAPTURE</small><b>23 AUG 2015</b></div><div><small>REVIVAL</small><b>COMMUNITY / ARC</b></div></div>
      </div>
    </div>
    <div className="bc-context-note"><strong>IMPORTANT CONTEXT</strong><p>The historical @arc Twitter account shown in the archive is not the same thing as today&apos;s Arc blockchain project. BeanCat references the archived internet artifact and is not affiliated with Arc or Circle.</p></div>
  </section>;
}

function Story() {
  const items = [
    ["01", "THE HANDLE", "@arc existed years before the current Arc blockchain identity."],
    ["02", "THE ARCHIVE", "On 23 August 2015, Wayback captured the profile with a cat avatar and the display name 豆."],
    ["03", "THE REVIVAL", "The forgotten name and cat were later revived by the community as an on-chain meme on Arc."],
  ];
  return <section id="story" className="bc-story">
    <div className="bc-section-head"><span>02 / STORY</span><p>Three facts. No manufactured mythology.</p></div>
    <div className="bc-story-title"><p>BEFORE THE MEME,<br/>THERE WAS A RECEIPT.</p><span>BeanCat does not need a fictional origin story. The archive already gave it one.</span></div>
    <div className="bc-story-list">{items.map(([n,title,text]) => <article key={n}><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
  </section>;
}

function Proof() {
  return <section id="proof" className="bc-proof">
    <div className="bc-proof-inner">
      <div className="bc-proof-copy"><span className="bc-light-label">03 / THE PROOF</span><h2>VERIFY THE<br/>ORIGINAL<br/><em>ARCHIVE.</em></h2><p>The evidence links directly to a Wayback Machine capture of the historical Twitter profile. Anyone can open the source and check it.</p><ActionLink href={tokenConfig.archiveUrl} className="bc-proof-button">OPEN WAYBACK CAPTURE <ArrowUpRight size={16}/></ActionLink></div>
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
    <div className="bc-section-head"><span>04 / ON-CHAIN</span><p>The archived name, carried forward.</p></div>
    <div className="bc-token-panel">
      <div className="bc-token-main">
        <span className="bc-token-eyebrow">BEANCAT / ARC</span>
        <h2>ARCHIVE LORE.<br/><strong>ON-CHAIN.</strong></h2>
        <p className="bc-token-description">BeanCat carries the archived identity into a community meme on Arc. The story is public, the contract is verifiable, and the source remains open for anyone to check.</p>
        <div className="bc-token-actions"><ActionLink href={tokenConfig.buyUrl} className="bc-primary">BUY 豆 <ArrowUpRight size={16}/></ActionLink><button className="bc-outline" onClick={copy}>{copied?<Check size={15}/>:<Copy size={15}/>} {copied?"COPIED":"COPY CA"}</button><ActionLink href={tokenConfig.explorerUrl} className="bc-outline">ARC SCAN <ArrowUpRight size={14}/></ActionLink></div>
      </div>
      <div className="bc-token-side">
        <div className="bc-token-identity"><span>BEANCAT</span><small>COMMUNITY MEME ON ARC</small></div>
        <div className="bc-token-facts"><div><small>NETWORK</small><b>{tokenConfig.network}</b></div><div><small>TICKER</small><b>{tokenConfig.ticker}</b></div><div><small>STATUS</small><b>COMMUNITY REVIVAL</b></div></div>
        <div className="bc-contract-card"><small>CONTRACT ADDRESS</small><code>{tokenConfig.contract}</code><button onClick={copy}>{copied?<Check size={14}/>:<Copy size={14}/>} {copied?"COPIED":"COPY"}</button></div>
      </div>
    </div>
  </section>;
}

function Community() {
  return <section id="community" className="bc-community">
    <div className="bc-community-inner">
      <span className="bc-light-label">05 / COMMUNITY</span>
      <div className="bc-community-grid">
        <div><h2>THE ARCHIVE<br/>IS OLD.<br/><strong>THE MEME IS ALIVE.</strong></h2></div>
        <div className="bc-community-copy"><p>Follow the story, share the receipt, make the memes, and watch what the community builds around BeanCat on Arc.</p><div className="bc-community-actions"><ActionLink href={tokenConfig.xUrl} className="bc-community-button">FOLLOW ON X <ArrowUpRight size={15}/></ActionLink><ActionLink href={tokenConfig.telegramUrl} className="bc-community-button">JOIN TELEGRAM <ArrowUpRight size={15}/></ActionLink><ActionLink href={tokenConfig.buyUrl} className="bc-community-buy">BUY 豆 <ArrowUpRight size={15}/></ActionLink></div></div>
      </div>
      <div className="bc-community-receipt"><span>2015</span><span>@arc</span><span>豆</span><span>CAT</span><strong>→ ARC</strong></div>
    </div>
  </section>;
}

function Footer(){return <footer className="bc-footer"><div><a href="#top" className="bc-footer-brand">豆 / BEANCAT</a><p>Archived in 2015. Revived on Arc.</p></div><nav><ActionLink href={tokenConfig.xUrl}>X ↗</ActionLink><ActionLink href={tokenConfig.telegramUrl}>Telegram ↗</ActionLink><ActionLink href={tokenConfig.archiveUrl}>Archive ↗</ActionLink><ActionLink href={tokenConfig.explorerUrl}>Explorer ↗</ActionLink></nav><p className="bc-disclaimer">豆 is a community meme token and is not affiliated with Arc, Circle, or the previous owner of the historical @arc account. Nothing on this website constitutes financial advice.</p></footer>}

export function SitePage(){return <><Header/><main><Hero/><MarketStrip/><ContractBar/><About/><Story/><Proof/><Token/><Community/></main><Footer/></>}
