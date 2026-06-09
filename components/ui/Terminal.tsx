"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface Line {
  cmd: string;
  out: string;
}

type Rendered = { type: "cmd" | "out"; text: string };

/**
 * Sticker-outlined terminal card with a sequential typewriter effect.
 * Plays once when scrolled into view; renders fully when reduced-motion is on.
 */
export function Terminal({ lines }: { lines: readonly Line[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  // Flatten into a typed sequence: prompt+cmd, then output.
  const sequence: Rendered[] = lines.flatMap((l) => [
    { type: "cmd" as const, text: l.cmd },
    { type: "out" as const, text: l.out },
  ]);

  const full = sequence.map((s) => s.text);
  const [done, setDone] = useState<string[]>([]);
  const [active, setActive] = useState("");
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDone(full);
      setStep(full.length);
      return;
    }
    if (step >= full.length) return;
    const target = full[step];
    let i = 0;
    const speed = sequence[step].type === "cmd" ? 38 : 18;
    const id = setInterval(() => {
      i += 1;
      setActive(target.slice(0, i));
      if (i >= target.length) {
        clearInterval(id);
        setDone((prev) => [...prev, target]);
        setActive("");
        // brief pause before next line
        setTimeout(() => setStep((s) => s + 1), 240);
      }
    }, speed);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, step, reduced]);

  const typingType = step < sequence.length ? sequence[step].type : "out";

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Terminal session: whoami returns andrew.sundaradhas; skills are Python, C++, PyTorch, ROS, Next.js; currently building DataPilot AI and WC2026 Predictor; open to internships and research roles; based in Chennai, India."
      className="w-full overflow-hidden rounded-[20px] border border-carbon bg-[#0d0d0d] font-mono text-[13px] leading-relaxed text-[#55db9c]"
    >
      <div className="flex items-center gap-2 border-b border-[#1f1f1f] bg-[#161616] px-4 py-3">
        <span className="h-3 w-3 rounded-full border border-carbon bg-ember" />
        <span className="h-3 w-3 rounded-full border border-carbon bg-sunburst" />
        <span className="h-3 w-3 rounded-full border border-carbon bg-mint" />
        <span className="ml-2 text-[11px] tracking-widest text-[#a1a1aa]">andrew@vit ~ %</span>
      </div>

      <div className="min-h-[260px] space-y-2 p-5">
        {done.map((text, i) => {
          const isCmd = sequence[i]?.type === "cmd";
          return (
            <div key={i} className="whitespace-pre-wrap break-words">
              {isCmd ? (
                <span>
                  <span className="text-[#4da2ff]">$ </span>
                  <span className="text-[#f5f5f5]">{text}</span>
                </span>
              ) : (
                <span className="text-[#55db9c]">{text}</span>
              )}
            </div>
          );
        })}

        {active && (
          <div className="whitespace-pre-wrap break-words">
            {typingType === "cmd" ? (
              <span>
                <span className="text-[#4da2ff]">$ </span>
                <span className="text-[#f5f5f5]">{active}</span>
              </span>
            ) : (
              <span className="text-[#55db9c]">{active}</span>
            )}
            <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-[#55db9c]" />
          </div>
        )}
      </div>
    </div>
  );
}
