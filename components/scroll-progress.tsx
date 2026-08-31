"use client";

import { useEffect, useState } from "react";

const steps = [
  ["ARCHIVE", "top"],
  ["STORY", "story"],
  ["PROOF", "proof"],
  ["TRAIL", "timeline"],
  ["ON-CHAIN", "token"],
] as const;

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("ARCHIVE");

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
      let current = "ARCHIVE";
      for (const [label, id] of steps) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * .42) current = label;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  return (
    <aside className="site-progress" aria-label="Page progress">
      <div className="site-progress-track"><span style={{ transform: `scaleY(${progress})` }}/></div>
      <div className="site-progress-labels">{steps.map(([label]) => <span key={label} className={active === label ? "is-active" : ""}>{label}</span>)}</div>
    </aside>
  );
}
