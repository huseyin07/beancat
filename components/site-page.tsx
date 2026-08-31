"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Check, Copy, Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { tokenConfig } from "@/lib/config";
import { Reveal } from "./reveal";

const nav = [
  ["Origin", "#origin"],
  ["Receipts", "#receipts"],
  ["Timeline", "#timeline"],
  ["Token", "#token"],
];

type ActionLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  disabledLabel?: string;
};

function ActionLink({ href, children, className = "", disabledLabel }: ActionLinkProps) {
  if (!href) {
    return (
      <span className={`${className} cursor-not-allowed opacity-40`} aria-disabled="true" title="Link coming soon">
        {disabledLabel ?? children}
      </span>
    );
  }

  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
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
        <a href="#top" className="group flex items-center gap-3" aria-label="Mame home">
          <span className="font-display text-4xl font-black leading-none transition-transform group-hover:-rotate-3">{tokenConfig.name}</span>
          <span className="font-mono text-[10px] tracking-[.28em] text-ink/55">MAME</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {nav.map(([label, href]) => <a className="nav-link" href={href} key={href}>{label}</a>)}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          {tokenConfig.xUrl && <ActionLink href={tokenConfig.xUrl} className="button button-ghost">X</ActionLink>}
          <ActionLink href={tokenConfig.buyUrl} className="button button-dark">Buy {tokenConfig.ticker} <ArrowUpRight size={15} /></ActionLink>
        </div>
        <button className="grid size-11 place-items-center border border-ink/20 md:hidden" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav id="mobile-navigation" initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden border-t border-ink/10 bg-paper md:hidden">
            <div className="flex flex-col p-5">
              {nav.map(([label, href]) => <a className="border-b border-ink/10 py-4 font-mono text-xs uppercase tracking-[.18em]" href={href} key={href} onClick={() => setOpen(false)}>{label}</a>)}
              <ActionLink href={tokenConfig.buyUrl} className="button button-dark mt-5 justify-center">Buy {tokenConfig.ticker} <ArrowUpRight size={15} /></ActionLink>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function SectionLabel({ children, number }: { children: ReactNode; number: string }) {
  return (
    <div className="mb-10 flex items-center justify-between border-b border-ink/20 pb-4 font-mono text-[10px] font-bold uppercase tracking-[.22em]">
      <span>{children}</span><span className="text-ink/40">{number} / 007</span>
    </div>
  );
}

function HeroMark() {
  const reducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 90, damping: 22 });
  const y = useSpring(mouseY, { stiffness: 90, damping: 22 });

  function move(event: MouseEvent<HTMLDivElement>) {
    if (reducedMotion || window.innerWidth < 1024) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    mouseX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 8);
    mouseY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 8);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.1 }}
      className="hero-mark-wrap"
      onMouseMove={move}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
    >
      <motion.div style={{ x, y }} className="hero-mark" aria-label={tokenConfig.name}>{tokenConfig.name}</motion.div>
      <span className="seal absolute bottom-[10%] right-[7%]">原<br />名</span>
      <span className="absolute left-0 top-3 font-mono text-[8px] uppercase tracking-[.2em] text-ink/40">Index / 001</span>
    </motion.div>
  );
}

function Hero() {
  return (
    <>
      <section id="top" className="relative min-h-screen overflow-hidden border-b border-ink/15 px-5 pb-14 pt-28 md:px-10 md:pb-20 md:pt-32">
        <div className="hero-grid absolute inset-0 opacity-50" />
        <div className="relative mx-auto grid max-w-[1440px] items-center gap-8 lg:min-h-[calc(100vh-13rem)] lg:grid-cols-[.82fr_1.18fr]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="z-10 lg:py-10">
            <p className="eyebrow"><span className="status-dot" />Archived internet lore / Arc</p>
            <h1 className="mt-7 text-[clamp(3.65rem,7vw,7.8rem)] font-black uppercase leading-[.84] tracking-[-.07em]">{tokenConfig.name}<br />was here first.</h1>
            <div className="mt-8 max-w-xl border-l border-ink/25 pl-5">
              <p className="text-xl font-semibold leading-snug tracking-[-.025em] md:text-2xl">The original name behind the old @arc account.</p>
              <p className="mt-4 text-sm leading-7 text-ink/60 md:text-base">The first Arc meme coin to preserve that name exactly as it appeared.</p>
            </div>
            <div className="mt-8 grid max-w-lg grid-cols-2 border border-ink/20 font-mono text-[9px] uppercase tracking-[.15em]">
              <span className="p-4"><i className="mb-2 block not-italic text-ink/35">Original</i><strong className="font-display text-2xl text-ink">{tokenConfig.name}</strong></span>
              <span className="border-l border-ink/20 p-4 text-ink/50"><i className="mb-2 block not-italic text-ink/35">Translated later</i>BEANCAT</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ActionLink href={tokenConfig.archiveUrl} className="button button-dark receipt-link">View 2015 receipt <ArrowUpRight className="link-arrow" size={16} /></ActionLink>
              <ActionLink href={tokenConfig.buyUrl} className="button button-outline">Buy {tokenConfig.ticker}</ActionLink>
            </div>
            <p className="mt-7 font-mono text-[9px] uppercase tracking-[.2em] text-ink/40">Snapshot: Aug 23 2015</p>
          </motion.div>
          <HeroMark />
        </div>
      </section>
      <ProofStrip />
    </>
  );
}

function ProofStrip() {
  const items = [
    ["Archive", "@arc"], ["Name", tokenConfig.name], ["Archive", "Aug 2015"], ["Chain", `Original name preserved on ${tokenConfig.network}`],
  ];
  return (
    <div className="bg-ink text-paper">
      <div className="mx-auto grid max-w-[1520px] sm:grid-cols-2 lg:grid-cols-[.65fr_.5fr_.75fr_2fr]">
        {items.map(([label, value], index) => (
          <div className="proof-item" key={`${label}-${value}`}>
            <span>{label}</span><strong className={value === tokenConfig.name ? "font-display text-2xl" : ""}>{value}</strong>{index < items.length - 1 && <ArrowUpRight className="hidden text-paper/25 lg:block" size={14} />}
          </div>
        ))}
      </div>
    </div>
  );
}

function Origin() {
  return (
    <section id="origin" className="section-shell">
      <SectionLabel number="001">The origin</SectionLabel>
      <div className="grid gap-16 lg:grid-cols-[.85fr_1.15fr] lg:gap-24">
        <Reveal>
          <p className="font-mono text-[9px] uppercase tracking-[.2em] text-seal">Owner history matters.</p>
          <h2 className="heading-lg mt-5">The handle existed before the brand.</h2>
        </Reveal>
        <div>
          <Reveal>
            <div className="max-w-2xl space-y-5 text-base leading-8 text-ink/65 md:text-lg">
              <p>Before the current Arc brand used the @arc handle, the handle appeared in an archived profile named <strong className="text-ink">{tokenConfig.name}</strong>.</p>
              <p>The August 23, 2015 snapshot shows a cat profile picture. It does not show the current Arc blockchain project.</p>
              <p className="font-semibold text-ink">The receipt exists.</p>
            </div>
          </Reveal>
          <Reveal className="archive-window mt-14" delay={0.1}>
            <div className="flex items-center justify-between border-b border-ink/15 px-5 py-4"><div className="flex gap-1.5"><i /><i /><i /></div><span className="font-mono text-[8px] tracking-[.16em] text-ink/45">WEB.ARCHIVE.ORG / SNAPSHOT</span></div>
            <div className="grid gap-8 p-6 md:grid-cols-[120px_1fr] md:p-9">
              <div className="grid aspect-square place-items-center bg-ink font-display text-6xl font-black text-paper">{tokenConfig.name}</div>
              <div><p className="font-mono text-[9px] font-bold tracking-[.2em] text-arc">WAYBACK MACHINE · AUGUST 23, 2015</p><p className="mt-5 text-sm text-ink/45">@arc</p><p className="font-display text-5xl font-black">{tokenConfig.name}</p><p className="mt-4 font-mono text-[9px] tracking-[.16em] text-ink/50">JOINED MAY 2012</p></div>
            </div>
            <ActionLink href={tokenConfig.archiveUrl} className="receipt-link flex items-center justify-between border-t border-ink/15 px-6 py-5 font-mono text-[9px] font-bold uppercase tracking-[.17em] transition-colors hover:bg-ink hover:text-paper">View original archive <ArrowUpRight className="link-arrow" size={15} /></ActionLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Receipts() {
  return (
    <section id="receipts" className="section-shell border-t border-ink/15">
      <SectionLabel number="002">The receipts</SectionLabel>
      <Reveal><h2 className="heading-lg max-w-5xl uppercase">Don&apos;t trust the lore.<br /><span className="text-arc">Verify it.</span></h2></Reveal>
      <div className="mt-16 grid gap-4 lg:grid-cols-3">
        <Reveal className="evidence-card group" delay={0.05}>
          <span className="evidence-number">001 / The archive</span>
          <div><p className="text-5xl font-black tracking-[-.05em]">@arc</p><p className="font-display text-[8rem] font-black leading-none">{tokenConfig.name}</p><p className="font-mono text-[10px] tracking-[.18em] text-ink/45">AUG 23 2015</p></div>
          <p className="max-w-sm text-sm leading-7 text-ink/60">The archived @arc profile used the display name {tokenConfig.name}.</p>
          <ActionLink href={tokenConfig.archiveUrl} className="receipt-link flex items-center justify-between border-t border-ink/20 pt-5 font-mono text-[9px] font-bold uppercase tracking-[.15em]">Open Wayback Machine <ArrowUpRight className="link-arrow" size={14} /></ActionLink>
        </Reveal>
        <Reveal className="evidence-card group bg-ink text-paper" delay={0.1}>
          <span className="evidence-number text-paper/45">002 / The name</span>
          <div className="relative"><p className="font-display text-[clamp(10rem,22vw,18rem)] font-black leading-[.7]">{tokenConfig.name}</p><span className="seal mt-10 border-[#d46150] text-[#d46150]">源<br />名</span></div>
          <p className="max-w-sm text-sm leading-7 text-paper/60">No English rewrite. No new mascot name. The original name was preserved exactly.</p>
          <span className="border-t border-paper/20 pt-5 font-mono text-[9px] font-bold uppercase tracking-[.18em]">Source name</span>
        </Reveal>
        <Reveal className="evidence-card group" delay={0.15}>
          <span className="evidence-number">003 / The chain</span>
          <div><p className="text-[clamp(4.5rem,9vw,8rem)] font-black leading-none tracking-[-.07em]">FIRST</p><p className="mt-5 font-display text-6xl font-black text-arc">{tokenConfig.name}</p></div>
          <p className="max-w-sm text-sm leading-7 text-ink/60">The earlier Arc meme coin carrying the original {tokenConfig.name} identity.</p>
          <span className="border-t border-ink/20 pt-5 font-mono text-[9px] uppercase tracking-[.18em] text-ink/45">Before BEANCAT</span>
        </Reveal>
      </div>
    </section>
  );
}

function Comparison() {
  const columns = [
    { title: tokenConfig.name, badge: "Source", items: ["Original archived name", "Japanese name preserved", "Earlier coin"], source: true },
    { title: "BEANCAT", badge: "Translation", items: ["English interpretation", "Readable translation of the cat / bean lore", "Later coin"], source: false },
  ];
  return (
    <section className="section-shell bg-[#e9e6dc]">
      <SectionLabel number="003">Source vs translation</SectionLabel>
      <div className="grid border-l border-t border-ink/20 md:grid-cols-2">
        {columns.map((column, index) => (
          <Reveal className={`comparison-card ${column.source ? "bg-paper" : ""}`} delay={index * 0.08} key={column.title}>
            <span className={`badge ${column.source ? "bg-seal text-paper" : "border border-ink/25 text-ink/45"}`}>{column.badge}</span>
            <h2 className={column.source ? "font-display text-[clamp(9rem,24vw,18rem)] font-black leading-[.75]" : "text-[clamp(3rem,7vw,6rem)] font-black tracking-[-.06em] text-ink/55"}>{column.title}</h2>
            <ul className="mt-12 border-t border-ink/15">{column.items.map(item => <li className="border-b border-ink/15 py-4 text-sm text-ink/60" key={item}>{item}</li>)}</ul>
          </Reveal>
        ))}
      </div>
      <Reveal><p className="mt-16 max-w-6xl text-[clamp(2.8rem,6.5vw,6.7rem)] font-black uppercase leading-[.9] tracking-[-.065em]">The translation got the attention.<br /><span className="text-arc">The source was still here.</span></p></Reveal>
    </section>
  );
}

const timeline = [
  ["2012", "@arc account existed"],
  ["2015", `Archived as ${tokenConfig.name}`],
  ["Arc", "The handle later becomes associated with the Arc blockchain brand"],
  [tokenConfig.name, `The original-name meme coin appears on ${tokenConfig.network}`],
  ["BEANCAT", "The lore receives an English meme identity"],
  ["Now", "The source gets its voice back"],
];

function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 75%", "end 70%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  return (
    <section id="timeline" className="section-shell">
      <SectionLabel number="004">Artifact index</SectionLabel>
      <div className="grid gap-14 lg:grid-cols-[.7fr_1fr]">
        <Reveal><div className="lg:sticky lg:top-32"><p className="font-mono text-[9px] uppercase tracking-[.2em] text-ink/40">Follow the handle ↓</p><h2 className="heading-lg mt-5 uppercase">History leaves a trail.</h2></div></Reveal>
        <div ref={timelineRef} className="relative border-l border-ink/15 pl-8 md:pl-14">
          <motion.div className="absolute -left-px top-0 h-full w-[2px] origin-top bg-arc" style={{ scaleY }} />
          {timeline.map(([date, text], index) => (
            <Reveal className="relative min-h-40 border-b border-ink/15 py-8 first:pt-0" delay={index * 0.04} key={date}>
              <span className="absolute -left-[2.25rem] top-9 size-2 rounded-full bg-arc ring-4 ring-paper md:-left-[3.75rem]" />
              <p className={`font-black uppercase tracking-[-.05em] ${date === tokenConfig.name ? "font-display text-6xl text-arc" : "text-4xl"}`}>{date}</p>
              <p className="mt-4 max-w-md text-sm leading-7 text-ink/60">{text}</p>
              {index < timeline.length - 1 && <ArrowDown className="mt-5 text-ink/20" size={16} />}
            </Reveal>
          ))}
        </div>
      </div>
      <p className="mt-20 border-t border-ink/20 pt-7 text-right text-[clamp(2.6rem,6vw,6rem)] font-black uppercase leading-none tracking-[-.06em]">Return to the original.</p>
    </section>
  );
}

function MameMoment() {
  return (
    <section className="mame-moment">
      <Reveal className="relative mx-auto max-w-[1440px]">
        <p className="font-mono text-[9px] uppercase tracking-[.3em] text-paper/45">{tokenConfig.name} / Mame</p>
        <p className="mt-16 text-[clamp(3.6rem,10vw,10.5rem)] font-black uppercase leading-[.82] tracking-[-.075em]">Before it was<br />a meme,<br /><span className="text-[#7da0ff]">it was Mame.</span></p>
        <p className="mt-16 font-mono text-[9px] tracking-[.18em] text-paper/45">豆 can be read as “mame” in Japanese.</p>
        <span className="absolute right-0 top-0 hidden font-display text-[15rem] font-black leading-none text-paper/[.025] md:block">豆</span>
      </Reveal>
    </section>
  );
}

function Token() {
  const [copied, setCopied] = useState(false);
  async function copyContract() {
    if (!tokenConfig.contract) return;
    await navigator.clipboard.writeText(tokenConfig.contract);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  const visibleContract = tokenConfig.contract
    ? `${tokenConfig.contract.slice(0, 6)}...${tokenConfig.contract.slice(-4)}`
    : "COMING_SOON";
  const details = [["Name", tokenConfig.name], ["Ticker", tokenConfig.ticker], ["Network", tokenConfig.network.toUpperCase()], ["Contract", visibleContract]];
  return (
    <section id="token" className="section-shell bg-paper">
      <SectionLabel number="005">The token</SectionLabel>
      <div className="grid gap-14 lg:grid-cols-[.55fr_1fr]">
        <div><p className="font-display text-[10rem] font-black leading-[.7]">{tokenConfig.name}</p><h2 className="mt-12 text-4xl font-black uppercase tracking-[-.05em]">Name intact.</h2></div>
        <div className="border-t border-ink">
          {details.map(([key, value]) => <div className="grid grid-cols-[95px_1fr] border-b border-ink/20 py-6 md:grid-cols-[180px_1fr]" key={key}><span className="font-mono text-[9px] uppercase tracking-[.2em] text-ink/45">{key}</span><strong className={key === "Name" ? "font-display text-4xl" : "break-all font-mono text-sm"}>{value}</strong></div>)}
          <div className="mt-7 flex flex-wrap gap-3">
            <button disabled={!tokenConfig.contract} onClick={copyContract} className="button button-dark disabled:cursor-not-allowed disabled:opacity-40">{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? "Copied" : "Copy contract"}</button>
            <ActionLink href={tokenConfig.buyUrl} className="button button-outline">Buy {tokenConfig.ticker}</ActionLink>
            <ActionLink href={tokenConfig.explorerUrl} className="button button-outline">Arc explorer <ArrowUpRight size={14} /></ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const communityUrl = tokenConfig.telegramUrl || tokenConfig.xUrl;
  const footerLinks = [["X", tokenConfig.xUrl], ["Explorer", tokenConfig.explorerUrl], ["Archive", tokenConfig.archiveUrl], ["Buy", tokenConfig.buyUrl]].filter(([, href]) => Boolean(href));
  return (
    <>
      <section className="bg-arc px-5 py-24 text-paper md:px-10 md:py-36">
        <Reveal className="mx-auto max-w-[1440px]"><p className="font-mono text-[9px] uppercase tracking-[.25em] text-paper/65">Source material preserved</p><h2 className="mt-7 max-w-5xl text-[clamp(3.3rem,8vw,8rem)] font-black uppercase leading-[.86] tracking-[-.065em]">The original gets its voice back.</h2><div className="mt-12 flex flex-col justify-between gap-8 md:flex-row md:items-end"><p className="text-lg leading-8 text-paper/75">You found the translation.<br />Now find the source.</p><div className="flex flex-wrap gap-3"><ActionLink href={communityUrl} className="button bg-paper text-ink hover:bg-ink hover:text-paper">Join {tokenConfig.name} <ArrowUpRight size={15} /></ActionLink><ActionLink href={tokenConfig.buyUrl} className="button border border-paper/50 hover:bg-paper hover:text-ink">Buy {tokenConfig.ticker}</ActionLink></div></div></Reveal>
      </section>
      <footer className="bg-ink px-5 py-14 text-paper md:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-10 border-b border-paper/15 pb-12 md:grid-cols-[1fr_auto]"><div><span className="font-display text-7xl font-black">{tokenConfig.name}</span><p className="mt-6 max-w-md text-sm leading-7 text-paper/45">The original name. The archived handle. The receipt.</p></div><nav className="grid grid-cols-2 gap-x-12 gap-y-5 font-mono text-[9px] uppercase tracking-[.18em]" aria-label="Footer">{footerLinks.map(([label, href]) => <ActionLink href={href} key={label} className="hover:text-[#759cff]">{label} ↗</ActionLink>)}</nav></div>
          <div className="mt-8 flex flex-col gap-4 font-mono text-[8px] uppercase leading-5 tracking-[.12em] text-paper/35 md:flex-row md:justify-between"><p className="max-w-3xl">{tokenConfig.name} is a community meme token and is not affiliated with Arc, Circle, or the previous owner of the @arc account.</p><p>Nothing on this website constitutes financial advice.</p></div>
        </div>
      </footer>
    </>
  );
}

export function SitePage() {
  return (
    <>
      <Header />
      <main><Hero /><Origin /><Receipts /><Comparison /><Timeline /><MameMoment /><Token /><Footer /></main>
      <aside className="fixed bottom-8 right-4 z-40 hidden font-mono text-[8px] uppercase tracking-[.25em] text-ink/35 [writing-mode:vertical-rl] xl:block">Archive / Arc / {tokenConfig.name}</aside>
    </>
  );
}
