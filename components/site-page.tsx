"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight, Check, Copy, Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { tokenConfig } from "@/lib/config";
import { Reveal } from "./reveal";

const nav = [
  ["Story", "#story"],
  ["Proof", "#proof"],
  ["Timeline", "#timeline"],
  ["Token", "#token"],
];

type ActionLinkProps = { href: string; children: ReactNode; className?: string; disabledLabel?: string };

function ActionLink({ href, children, className = "", disabledLabel }: ActionLinkProps) {
  if (!href) return <span className={`${className} cursor-not-allowed opacity-40`} aria-disabled="true">{disabledLabel ?? children}</span>;
  return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}</a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1480px] items-center justify-between px-5 md:px-10">
        <a href="#top" className="group flex items-center gap-3" aria-label="Home">
          <span className="font-display text-4xl font-black leading-none transition-transform group-hover:-rotate-3">{tokenConfig.name}</span>
          <span className="font-mono text-[9px] font-bold uppercase tracking-[.24em] text-ink/45">Archive lore / Arc</span>
        </a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {nav.map(([label, href]) => <a className="nav-link" href={href} key={href}>{label}</a>)}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          {tokenConfig.xUrl && <ActionLink href={tokenConfig.xUrl} className="button button-ghost">X</ActionLink>}
          {tokenConfig.telegramUrl && <ActionLink href={tokenConfig.telegramUrl} className="button button-ghost">Telegram</ActionLink>}
          <ActionLink href={tokenConfig.buyUrl} className="button button-dark">Buy <ArrowUpRight size={15} /></ActionLink>
        </div>
        <button className="grid size-11 place-items-center border border-ink/20 md:hidden" onClick={() => setOpen(v => !v)} aria-label="Toggle menu" aria-expanded={open}>{open ? <X /> : <Menu />}</button>
      </div>
      <AnimatePresence>
        {open && <motion.nav initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden border-t border-ink/10 bg-paper md:hidden"><div className="flex flex-col p-5">{nav.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="border-b border-ink/10 py-4 font-mono text-xs uppercase tracking-[.18em]">{label}</a>)}{tokenConfig.telegramUrl && <ActionLink href={tokenConfig.telegramUrl} className="button button-outline mt-5 justify-center">Telegram</ActionLink>}<ActionLink href={tokenConfig.buyUrl} className="button button-dark mt-3 justify-center">Buy <ArrowUpRight size={15} /></ActionLink></div></motion.nav>}
      </AnimatePresence>
    </header>
  );
}

function SectionLabel({ children, number }: { children: ReactNode; number: string }) {
  return <div className="mb-10 flex items-center justify-between border-b border-ink/20 pb-4 font-mono text-[9px] font-bold uppercase tracking-[.22em]"><span>{children}</span><span className="text-ink/35">{number}</span></div>;
}

function CatPortrait({ dark = false }: { dark?: boolean }) {
  return <div className={`cat-card ${dark ? "cat-card-dark" : ""}`}><img src="/mame-cat-original.png" alt="Archived cat profile" className="cat-image" draggable={false}/><span className="absolute bottom-4 left-4 font-mono text-[8px] uppercase tracking-[.2em]">CAT / ARCHIVE SUBJECT</span></div>;
}

function Hero() {
  return (
    <section id="top" className="hero-shell hero-shell-og">
      <div className="hero-grid absolute inset-0 opacity-45"/>
      <div className="hero-orbit hero-orbit-one"/><div className="hero-orbit hero-orbit-two"/>
      <div className="relative mx-auto grid max-w-[1480px] items-center gap-14 lg:min-h-[calc(100vh-7rem)] lg:grid-cols-[.92fr_1.08fr]">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
          <div className="eyebrow"><span className="status-dot"/>OG BeanCat narrative / Arc</div>
          <h1 className="hero-title hero-title-og mt-7">The OG BeanCat<br/><span>on Arc.</span></h1>
          <p className="hero-kicker mt-6">Archived in 2015. Revived on-chain.</p>
          <p className="mt-5 max-w-xl text-base font-semibold leading-7 tracking-[-.02em] text-ink/60 md:text-lg">An old <strong>@arc</strong> profile was captured by Wayback Machine with a cat avatar and the display name <strong>豆</strong>. Today, that forgotten piece of internet history is the lore behind the OG BeanCat narrative on Arc.</p>
          <div className="hero-proof-tags mt-7"><span>2015 ARCHIVE</span><span>@arc</span><span>豆</span></div>
          <div className="mt-8 flex flex-wrap gap-3"><ActionLink href={tokenConfig.archiveUrl} className="button button-dark receipt-link">View proof <ArrowUpRight className="link-arrow" size={16}/></ActionLink><ActionLink href={tokenConfig.buyUrl} className="button button-outline">Buy 豆</ActionLink>{tokenConfig.xUrl && <ActionLink href={tokenConfig.xUrl} className="button button-ghost hero-social">X</ActionLink>}{tokenConfig.telegramUrl && <ActionLink href={tokenConfig.telegramUrl} className="button button-ghost hero-social">Telegram</ActionLink>}</div>
          <p className="mt-7 max-w-xl font-mono text-[8px] uppercase leading-5 tracking-[.15em] text-ink/35">The archive predates today&apos;s Arc blockchain project. The historical @arc account was unrelated to the modern network.</p>
        </motion.div>

        <Reveal className="relative hero-dossier-wrap">
          <div className="hero-dossier">
            <div className="hero-dossier-head"><div><span>ARCHIVE DOSSIER</span><strong>CASE / @arc / 2015</strong></div><span className="archive-stamp hero-stamp">ARCHIVED<br/>2015</span></div>
            <div className="hero-dossier-image">
              <ActionLink href={tokenConfig.archiveUrl} className="block"><img src="/archive-proof.png" alt="2015 Wayback capture of the old @arc profile" draggable={false}/></ActionLink>
              <div className="hero-cat-inset"><img src="/mame-cat-original.png" alt="Archived cat avatar" draggable={false}/><span>CAT / SOURCE</span></div>
            </div>
            <div className="hero-dossier-ledger"><div><span>HANDLE</span><strong>@arc</strong></div><div><span>DISPLAY NAME</span><strong>豆</strong></div><div><span>PROFILE</span><strong>CAT</strong></div><div><span>RECEIPT</span><strong>PUBLIC</strong></div></div>
            <ActionLink href={tokenConfig.archiveUrl} className="hero-dossier-source receipt-link"><span>OPEN ORIGINAL WAYBACK CAPTURE</span><ArrowUpRight className="link-arrow" size={15}/></ActionLink>
          </div>
          <div className="hero-file-note">PUBLIC RECEIPT<br/><span>23 AUG 2015 · 02:23:08 UTC</span></div>
        </Reveal>
      </div>
      <div className="hero-thesis"><span>THE NAME WAS THERE.</span><span>THE CAT WAS THERE.</span><strong>THE RECEIPT IS PUBLIC.</strong></div>
    </section>
  );
}

function ProofStrip() {
  const items = [["01 / HANDLE", "@arc"], ["02 / NAME", "豆"], ["03 / SUBJECT", "CAT AVATAR"], ["04 / SOURCE", "WAYBACK MACHINE"]];
  return <div className="bg-ink text-paper"><div className="mx-auto grid max-w-[1520px] sm:grid-cols-2 lg:grid-cols-4">{items.map(([label,value]) => <div className="proof-item" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></div>;
}

function Story() {
  const chapters = [
    ["01", "The handle", "Long before the current Arc blockchain brand, @arc was simply a Twitter handle owned by someone else."],
    ["02", "The archive", "On 23 August 2015, Wayback Machine captured that account with a cat avatar and the display name 豆."],
    ["03", "The coincidence", "The @arc handle later became associated with today’s Arc brand. The old snapshot remained buried in the archive."],
    ["04", "The meme", "Years later, 豆 appeared on Arc as a meme coin carrying that forgotten name and cat lore into an on-chain culture."],
    ["05", "The revival", "The original-name 豆 is now being revived by its community instead of letting the archive story disappear again."],
  ];
  return (
    <section id="story" className="section-shell story-bg">
      <SectionLabel number="01 / STORY">The story in plain English</SectionLabel>
      <div className="grid gap-14 lg:grid-cols-[.78fr_1.22fr] lg:gap-20">
        <Reveal><div className="lg:sticky lg:top-32"><p className="font-mono text-[9px] font-bold uppercase tracking-[.2em] text-seal">No invented mythology</p><h2 className="heading-lg mt-5">A forgotten account became a meme story.</h2><p className="mt-6 max-w-md text-sm leading-7 text-ink/55">The important part is not that Arc existed in 2015 — it didn&apos;t. The important part is that the handle <strong>@arc</strong> has a public archived history, and that history contains <strong>豆</strong>.</p></div></Reveal>
        <div className="chapter-stack">{chapters.map(([n,title,text],i)=><Reveal key={n} delay={i*.04} className="chapter-card"><div className="chapter-number">{n}</div><div><p className="chapter-title">{title}</p><p className="chapter-text">{text}</p></div>{i < chapters.length-1 && <ArrowDown className="chapter-arrow" size={18}/>}</Reveal>)}</div>
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section id="proof" className="section-shell bg-[#e9e6dc]">
      <SectionLabel number="02 / PROOF">The receipt</SectionLabel>
      <div className="grid gap-8 lg:grid-cols-[1.4fr_.6fr]">
        <Reveal className="archive-window">
          <div className="archive-browserbar"><div className="flex gap-1.5"><i/><i/><i/></div><span>CAPTURE / WEB ARCHIVE</span></div>
          <ActionLink href={tokenConfig.archiveUrl} className="group block bg-[#d6d1c5] p-4 md:p-6"><img src="/archive-proof.png" alt="Wayback Machine capture of the old @arc account" className="block h-auto w-full border border-ink/15 bg-white transition-transform duration-500 group-hover:scale-[1.003]" draggable={false}/></ActionLink>
          <div className="flex flex-col gap-4 border-t border-ink/15 p-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-mono text-[8px] font-bold uppercase tracking-[.2em] text-arc">Public source</p><p className="mt-2 text-sm font-semibold">Snapshot timestamp: 23 Aug 2015 · 02:23:08 UTC</p></div><ActionLink href={tokenConfig.archiveUrl} className="button button-dark shrink-0">Open original <ArrowUpRight size={15}/></ActionLink></div>
        </Reveal>
        <Reveal className="proof-ledger" delay={.08}>
          <div className="proof-ledger-head">What the archive shows</div>
          <div><span>HANDLE</span><strong>@arc</strong><small>The historical account handle.</small></div>
          <div><span>DISPLAY NAME</span><strong>豆</strong><small>The one-character profile name shown in the capture.</small></div>
          <div><span>PROFILE</span><strong>Cat avatar</strong><small>The visual subject tied to the archived identity.</small></div>
          <div><span>CONTEXT</span><strong>Pre-current Arc</strong><small>An unrelated earlier account, not today&apos;s Arc blockchain project.</small></div>
        </Reveal>
      </div>
      <Reveal className="mt-12 grid gap-8 border border-ink/20 bg-paper p-6 shadow-[10px_10px_0_rgba(17,19,18,.08)] md:grid-cols-[230px_1fr] md:p-8">
        <CatPortrait />
        <div className="flex flex-col justify-center"><p className="font-mono text-[9px] font-bold uppercase tracking-[.2em] text-seal">The visual clue</p><h3 className="mt-4 text-4xl font-black tracking-[-.05em] md:text-6xl">The cat was already there.</h3><p className="mt-5 max-w-2xl text-sm leading-7 text-ink/55">The cat is not a random mascot added later. It comes directly from the archived profile that carried the name 豆. That is why the cat and the character belong together in this lore.</p></div>
      </Reveal>
    </section>
  );
}

const timeline = [
  ["2012", "@arc account existed", "The handle existed years before the current Arc blockchain identity."],
  ["2015", "Wayback captures 豆", "The archived profile shows the cat avatar and the display name 豆."],
  ["LATER", "The handle changes hands", "@arc eventually becomes associated with the modern Arc brand."],
  ["ON-CHAIN", "豆 appears on Arc", "The forgotten name becomes an on-chain meme narrative."],
  ["NOW", "The archive is revived", "The community gives the original-name 豆 a voice again."],
];

function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 80%", "end 70%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  return (
    <section id="timeline" className="section-shell bg-[#ece8de]">
      <SectionLabel number="03 / TIMELINE">Artifact trail</SectionLabel>
      <div className="grid gap-14 lg:grid-cols-[.72fr_1fr] lg:gap-20">
        <Reveal><div className="lg:sticky lg:top-32"><p className="font-mono text-[9px] font-bold uppercase tracking-[.2em] text-ink/40">Follow the handle ↓</p><h2 className="heading-lg mt-5 uppercase">History leaves a trail.</h2><p className="mt-6 max-w-md text-sm leading-7 text-ink/55">The story is stronger when the order is obvious. Handle first. Archive second. Modern Arc later. Meme coin after that.</p></div></Reveal>
        <div ref={timelineRef} className="relative border-l border-ink/15 pl-8 md:pl-14"><motion.div className="absolute -left-px top-0 h-full w-[3px] origin-top bg-arc" style={{ scaleY }}/>{timeline.map(([date,title,text], index) => <Reveal className="timeline-card" delay={index*.04} key={date}><span className="timeline-dot"/><div className="timeline-date">{date}</div><h3>{title}</h3><p>{text}</p>{index < timeline.length - 1 && <ArrowDown className="mt-6 text-ink/20" size={17}/>}</Reveal>)}</div>
      </div>
    </section>
  );
}

function MemeMoment() {
  return <section className="meme-moment"><div className="meme-grid absolute inset-0"/><Reveal className="relative mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1.15fr_.65fr] lg:items-center"><div><p className="font-mono text-[9px] uppercase tracking-[.25em] text-paper/40">Internet memory / on-chain memory</p><p className="mt-8 text-[clamp(4rem,9vw,9rem)] font-black uppercase leading-[.82] tracking-[-.075em]">The internet forgot.<br/><span>The chain didn&apos;t.</span></p><div className="mt-10 flex flex-wrap gap-3 font-mono text-[8px] font-bold uppercase tracking-[.18em]"><span className="meme-tag">2015 / ARCHIVED</span><span className="meme-tag">NOW / ON-CHAIN</span></div></div><div className="relative"><CatPortrait dark/><div className="meme-caption">ARCHIVE SUBJECT / PRESERVED</div></div></Reveal></section>;
}

function Token() {
  const [copied, setCopied] = useState(false);
  const reducedMotion = useReducedMotion();
  async function copyContract() { if (!tokenConfig.contract) return; await navigator.clipboard.writeText(tokenConfig.contract); setCopied(true); window.setTimeout(() => setCopied(false), reducedMotion ? 500 : 1800); }
  const visibleContract = tokenConfig.contract ? `${tokenConfig.contract.slice(0,8)}...${tokenConfig.contract.slice(-6)}` : "COMING SOON";
  return <section id="token" className="section-shell"><SectionLabel number="04 / TOKEN">On-chain record</SectionLabel><Reveal className="onchain-panel"><div className="onchain-head"><span>ARC / TOKEN RECORD</span><span className="flex items-center gap-2"><i className="status-dot"/>LIVE</span></div><div className="grid lg:grid-cols-[.7fr_1.3fr]"><div className="token-symbol-panel"><span className="font-mono text-[8px] font-bold uppercase tracking-[.2em] text-ink/35">Original-name meme</span><p className="font-display text-[10rem] font-black leading-none">{tokenConfig.name}</p><p className="mt-6 text-3xl font-black uppercase tracking-[-.04em]">Archive lore.<br/>On-chain record.</p></div><div className="p-7 lg:p-10">{[["Network", tokenConfig.network.toUpperCase()], ["Contract", visibleContract], ["Status", "COMMUNITY REVIVAL"]].map(([key,value]) => <div className="token-row" key={key}><span>{key}</span><strong>{value}</strong></div>)}<div className="mt-8 flex flex-wrap gap-3"><button disabled={!tokenConfig.contract} onClick={copyContract} className="button button-dark disabled:opacity-40">{copied ? <Check size={15}/> : <Copy size={15}/>} {copied ? "Copied" : "Copy CA"}</button><ActionLink href={tokenConfig.explorerUrl} className="button button-outline">Arc explorer <ArrowUpRight size={14}/></ActionLink><ActionLink href={tokenConfig.buyUrl} className="button button-outline">Buy 豆</ActionLink></div></div></div></Reveal></section>;
}

function Footer() {
  const footerLinks = [["X", tokenConfig.xUrl], ["Telegram", tokenConfig.telegramUrl], ["Explorer", tokenConfig.explorerUrl], ["Archive", tokenConfig.archiveUrl], ["Buy", tokenConfig.buyUrl]].filter(([,href]) => Boolean(href));
  return <footer className="bg-ink px-5 py-14 text-paper md:px-10"><div className="mx-auto max-w-[1440px]"><div className="grid gap-10 border-b border-paper/15 pb-12 md:grid-cols-[1fr_auto]"><div><span className="font-display text-7xl font-black">{tokenConfig.name}</span><p className="mt-5 max-w-md text-sm leading-7 text-paper/45">An archived name. A cat. A public receipt. A community bringing the lore back on Arc.</p></div><nav className="grid grid-cols-2 gap-x-12 gap-y-5 font-mono text-[9px] uppercase tracking-[.18em]">{footerLinks.map(([label,href]) => <ActionLink key={label} href={href} className="hover:text-[#8eabff]">{label} ↗</ActionLink>)}</nav></div><div className="mt-8 flex flex-col gap-4 font-mono text-[8px] uppercase leading-5 tracking-[.12em] text-paper/35 md:flex-row md:justify-between"><p className="max-w-3xl">{tokenConfig.name} is a community meme token and is not affiliated with Arc, Circle, or the previous owner of the historical @arc account.</p><p>Nothing on this website constitutes financial advice.</p></div></div></footer>;
}

export function SitePage() { return <><Header/><main><Hero/><ProofStrip/><Story/><Proof/><Timeline/><MemeMoment/><Token/></main><Footer/></>; }
