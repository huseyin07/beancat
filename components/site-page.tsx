"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight, Check, Copy, Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { tokenConfig } from "@/lib/config";
import { Reveal } from "./reveal";

const nav = [
  ["Origin", "#origin"],
  ["Archive", "#archive"],
  ["On-chain", "#token"],
  ["Timeline", "#timeline"],
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
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-10">
        <a href="#top" className="group flex items-center gap-3" aria-label="Home">
          <span className="font-display text-4xl font-black leading-none transition-transform group-hover:-rotate-3">{tokenConfig.name}</span>
          <span className="font-mono text-[10px] tracking-[.28em] text-ink/55">OG ARC LORE</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {nav.map(([label, href]) => <a className="nav-link" href={href} key={href}>{label}</a>)}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          {tokenConfig.xUrl && <ActionLink href={tokenConfig.xUrl} className="button button-ghost">X</ActionLink>}
          <ActionLink href={tokenConfig.buyUrl} className="button button-dark">Buy <ArrowUpRight size={15} /></ActionLink>
        </div>
        <button className="grid size-11 place-items-center border border-ink/20 md:hidden" onClick={() => setOpen(v => !v)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && <motion.nav initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden border-t border-ink/10 bg-paper md:hidden">
          <div className="flex flex-col p-5">
            {nav.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="border-b border-ink/10 py-4 font-mono text-xs uppercase tracking-[.18em]">{label}</a>)}
            <ActionLink href={tokenConfig.buyUrl} className="button button-dark mt-5 justify-center">Buy <ArrowUpRight size={15} /></ActionLink>
          </div>
        </motion.nav>}
      </AnimatePresence>
    </header>
  );
}

function SectionLabel({ children, number }: { children: ReactNode; number: string }) {
  return <div className="mb-10 flex items-center justify-between border-b border-ink/20 pb-4 font-mono text-[10px] font-bold uppercase tracking-[.22em]"><span>{children}</span><span className="text-ink/40">{number} / 006</span></div>;
}

function CatPortrait({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`cat-card ${dark ? "cat-card-dark" : ""}`} aria-label="Archived cat portrait">
      <img
        src="/mame-cat-original.png"
        alt="Archived cat profile"
        className="cat-image"
        draggable={false}
      />
      <span className="absolute bottom-4 left-4 font-mono text-[8px] uppercase tracking-[.22em] opacity-45">CAT / ARCHIVE SUBJECT</span>
    </div>
  );
}

function ArchiveProfile() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .12 }} className="archive-profile">
      <div className="archive-browserbar"><div className="flex gap-1.5"><i/><i/><i/></div><span>WEB.ARCHIVE.ORG / 2015 SNAPSHOT</span></div>
      <div className="p-5 md:p-7">
        <div className="mb-5 flex items-center justify-between font-mono text-[8px] uppercase tracking-[.2em] text-ink/45"><span>Archived profile</span><span>23 AUG 2015</span></div>
        <CatPortrait />
        <div className="mt-6 flex items-end justify-between gap-5">
          <div><p className="font-mono text-[10px] text-ink/45">@arc</p><p className="mt-1 font-display text-5xl font-black">{tokenConfig.name}</p></div>
          <span className="archive-stamp">RECEIPT<br/>FOUND</span>
        </div>
        <p className="mt-5 border-t border-ink/15 pt-4 font-mono text-[8px] uppercase tracking-[.18em] text-ink/45">Joined May 2012 · archived before current Arc brand ownership</p>
      </div>
    </motion.div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden border-b border-ink/15 px-5 pb-16 pt-28 md:px-10 md:pt-32">
      <div className="hero-grid absolute inset-0 opacity-45" />
      <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 lg:min-h-[calc(100vh-11rem)] lg:grid-cols-[.9fr_1.1fr]">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
          <p className="eyebrow"><span className="status-dot"/>Arc internet lore / archive 2015</p>
          <h1 className="mt-7 text-[clamp(3.4rem,7vw,7.3rem)] font-black uppercase leading-[.86] tracking-[-.07em]">The cat that was already there.</h1>
          <p className="mt-7 max-w-xl text-lg font-semibold leading-8 tracking-[-.025em] md:text-xl">Before the current Arc identity took over @arc, the archived account carried a cat and the name {tokenConfig.name}.</p>
          <p className="mt-4 max-w-lg text-sm leading-7 text-ink/55">Years later, that exact name appeared on-chain as an earlier Arc meme coin. The story is the receipt.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ActionLink href={tokenConfig.archiveUrl} className="button button-dark receipt-link">View the archive <ArrowUpRight className="link-arrow" size={16}/></ActionLink>
            <ActionLink href={tokenConfig.buyUrl} className="button button-outline">Buy</ActionLink>
          </div>
          <div className="mt-8 flex gap-8 border-t border-ink/15 pt-5 font-mono text-[8px] uppercase tracking-[.18em] text-ink/45"><span>Snapshot / Aug 23 2015</span><span>Network / Arc</span></div>
        </motion.div>
        <ArchiveProfile />
      </div>
    </section>
  );
}

function ProofStrip() {
  const items = [["HANDLE", "@arc"], ["ARCHIVE", "23 AUG 2015"], ["SUBJECT", "CAT PROFILE"], ["STATUS", "SOURCE MATERIAL PRESERVED"]];
  return <div className="bg-ink text-paper"><div className="mx-auto grid max-w-[1520px] sm:grid-cols-2 lg:grid-cols-4">{items.map(([label,value]) => <div className="proof-item" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></div>;
}

function Origin() {
  return (
    <section id="origin" className="section-shell">
      <SectionLabel number="001">Origin</SectionLabel>
      <div className="grid gap-14 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
        <Reveal><div className="lg:sticky lg:top-32"><p className="font-mono text-[9px] uppercase tracking-[.2em] text-seal">An old account. A cat. One character.</p><h2 className="heading-lg mt-5">The handle existed before the brand.</h2></div></Reveal>
        <Reveal>
          <div className="story-panel">
            <p>The @arc username existed long before today&apos;s Arc blockchain brand.</p>
            <p>An archived snapshot from August 23, 2015 shows a cat profile picture and the display name <strong>{tokenConfig.name}</strong>.</p>
            <p>The internet moved on.</p>
            <p className="story-hit">The lore didn&apos;t.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ArchiveEvidence() {
  return (
    <section id="archive" className="section-shell bg-[#e9e6dc]">
      <SectionLabel number="002">Archive record</SectionLabel>
      <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
        <Reveal className="archive-window">
          <div className="archive-browserbar"><div className="flex gap-1.5"><i/><i/><i/></div><span>CAPTURE / WEB ARCHIVE</span></div>
          <div className="grid gap-8 p-6 md:grid-cols-[220px_1fr] md:p-9">
            <CatPortrait />
            <div className="flex flex-col justify-between gap-8">
              <div><p className="font-mono text-[9px] font-bold uppercase tracking-[.2em] text-arc">Verified archive</p><h2 className="mt-5 text-5xl font-black tracking-[-.05em] md:text-7xl">@arc</h2><p className="mt-3 font-mono text-xs text-ink/45">PROFILE NAME / {tokenConfig.name}</p></div>
              <ActionLink href={tokenConfig.archiveUrl} className="receipt-link flex items-center justify-between border-t border-ink/20 pt-5 font-mono text-[9px] font-bold uppercase tracking-[.16em]">Open Wayback Machine <ArrowUpRight className="link-arrow" size={15}/></ActionLink>
            </div>
          </div>
        </Reveal>
        <Reveal className="evidence-notes" delay={.08}>
          <div><span>01 / HANDLE</span><strong>@arc</strong></div>
          <div><span>02 / PROFILE</span><strong>Cat avatar</strong></div>
          <div><span>03 / DATE</span><strong>23 Aug 2015</strong></div>
          <div><span>04 / CONTEXT</span><strong>Previous account, not the current Arc project</strong></div>
        </Reveal>
      </div>
    </section>
  );
}

const timeline = [
  ["2012", "@arc account existed"],
  ["2015", "Archived profile with cat avatar and the original display name"],
  ["ARC ERA", "The handle later becomes associated with the current Arc blockchain brand"],
  ["ON-CHAIN", "The original-name meme coin appears on Arc"],
  ["NOW", "The forgotten lore gets a community voice"],
];

function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 75%", "end 70%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  return (
    <section id="timeline" className="section-shell">
      <SectionLabel number="003">Artifact trail</SectionLabel>
      <div className="grid gap-14 lg:grid-cols-[.7fr_1fr]">
        <Reveal><div className="lg:sticky lg:top-32"><p className="font-mono text-[9px] uppercase tracking-[.2em] text-ink/40">Follow the handle ↓</p><h2 className="heading-lg mt-5 uppercase">History leaves a trail.</h2></div></Reveal>
        <div ref={timelineRef} className="relative border-l border-ink/15 pl-8 md:pl-14">
          <motion.div className="absolute -left-px top-0 h-full w-[2px] origin-top bg-arc" style={{ scaleY }}/>
          {timeline.map(([date,text], index) => <Reveal className="relative min-h-40 border-b border-ink/15 py-8 first:pt-0" delay={index*.04} key={date}>
            <span className="absolute -left-[2.25rem] top-9 size-2 rounded-full bg-arc ring-4 ring-paper md:-left-[3.75rem]"/>
            <p className="text-4xl font-black uppercase tracking-[-.05em]">{date}</p>
            <p className="mt-4 max-w-md text-sm leading-7 text-ink/60">{text}</p>
            {index < timeline.length - 1 && <ArrowDown className="mt-5 text-ink/20" size={16}/>} 
          </Reveal>)}
        </div>
      </div>
    </section>
  );
}

function MemeMoment() {
  return (
    <section className="meme-moment">
      <Reveal className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1fr_.7fr] lg:items-center">
        <div><p className="font-mono text-[9px] uppercase tracking-[.25em] text-paper/45">Internet memory / on-chain memory</p><p className="mt-8 text-[clamp(4rem,9vw,9rem)] font-black uppercase leading-[.82] tracking-[-.075em]">The internet forgot.<br/><span className="text-[#7da0ff]">The chain didn&apos;t.</span></p></div>
        <CatPortrait dark />
      </Reveal>
    </section>
  );
}

function Token() {
  const [copied, setCopied] = useState(false);
  const reducedMotion = useReducedMotion();
  async function copyContract() {
    if (!tokenConfig.contract) return;
    await navigator.clipboard.writeText(tokenConfig.contract);
    setCopied(true);
    window.setTimeout(() => setCopied(false), reducedMotion ? 500 : 1800);
  }
  const visibleContract = tokenConfig.contract ? `${tokenConfig.contract.slice(0,6)}...${tokenConfig.contract.slice(-4)}` : "COMING SOON";
  return (
    <section id="token" className="section-shell bg-paper">
      <SectionLabel number="004">On-chain record</SectionLabel>
      <div className="onchain-panel">
        <div className="onchain-head"><span>ARC / TOKEN RECORD</span><span className="flex items-center gap-2"><i className="status-dot"/>LIVE</span></div>
        <div className="grid lg:grid-cols-[.65fr_1.35fr]">
          <div className="border-b border-ink/15 p-7 lg:border-b-0 lg:border-r lg:p-10"><p className="font-display text-[8rem] font-black leading-none">{tokenConfig.name}</p><p className="mt-8 text-3xl font-black uppercase tracking-[-.04em]">Name intact.<br/>Record live.</p></div>
          <div className="p-7 lg:p-10">
            {[["Network", tokenConfig.network.toUpperCase()], ["Contract", visibleContract], ["Status", "LIVE"]].map(([key,value]) => <div className="grid grid-cols-[90px_1fr] border-b border-ink/15 py-5 md:grid-cols-[150px_1fr]" key={key}><span className="font-mono text-[8px] uppercase tracking-[.2em] text-ink/40">{key}</span><strong className="break-all font-mono text-sm">{value}</strong></div>)}
            <div className="mt-7 flex flex-wrap gap-3"><button disabled={!tokenConfig.contract} onClick={copyContract} className="button button-dark disabled:opacity-40">{copied ? <Check size={15}/> : <Copy size={15}/>} {copied ? "Copied" : "Copy CA"}</button><ActionLink href={tokenConfig.explorerUrl} className="button button-outline">Arc explorer <ArrowUpRight size={14}/></ActionLink><ActionLink href={tokenConfig.buyUrl} className="button button-outline">Buy</ActionLink></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const footerLinks = [["X", tokenConfig.xUrl], ["Explorer", tokenConfig.explorerUrl], ["Archive", tokenConfig.archiveUrl], ["Buy", tokenConfig.buyUrl]].filter(([,href]) => Boolean(href));
  return <footer className="bg-ink px-5 py-14 text-paper md:px-10"><div className="mx-auto max-w-[1440px]">
    <div className="grid gap-10 border-b border-paper/15 pb-12 md:grid-cols-[1fr_auto]"><div><span className="font-display text-7xl font-black">{tokenConfig.name}</span><p className="mt-6 max-w-md text-sm leading-7 text-paper/45">Archived lore. On-chain history. Community preserved.</p></div><nav className="grid grid-cols-2 gap-x-12 gap-y-5 font-mono text-[9px] uppercase tracking-[.18em]">{footerLinks.map(([label,href]) => <ActionLink key={label} href={href} className="hover:text-[#759cff]">{label} ↗</ActionLink>)}</nav></div>
    <div className="mt-8 flex flex-col gap-4 font-mono text-[8px] uppercase leading-5 tracking-[.12em] text-paper/35 md:flex-row md:justify-between"><p className="max-w-3xl">{tokenConfig.name} is a community meme token and is not affiliated with Arc, Circle, or the previous owner of the @arc account.</p><p>Nothing on this website constitutes financial advice.</p></div>
  </div></footer>;
}

export function SitePage() {
  return <><Header/><main><Hero/><ProofStrip/><Origin/><ArchiveEvidence/><Timeline/><MemeMoment/><Token/></main><Footer/></>;
}
