"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { BG, TEXT_ON, type StickerColor } from "@/lib/colors";
import { cn } from "@/lib/utils";

/** Whole-number targets count as integers; decimal targets keep one decimal. */
function format(current: number, target: number): string {
  return Number.isInteger(target) ? Math.round(current).toString() : current.toFixed(1);
}

/** Animated stat card — number counts up when it scrolls into view. */
export function StatCard({
  value,
  suffix,
  label,
  note,
  color,
  index = 0,
}: {
  value: number;
  suffix: string;
  label: string;
  note: string;
  color: StickerColor;
  index?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const duration = 1400;
    let raf = 0;
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      const progress = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduced]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className={cn(
        "flex flex-col gap-2 rounded-[20px] border border-carbon p-6",
        BG[color],
        TEXT_ON[color],
      )}
    >
      <span className="display-text whitespace-nowrap text-5xl sm:text-6xl tabular-nums">
        {format(display, value)}
        <span>{suffix}</span>
      </span>
      <span className="text-[15px] font-bold leading-tight">{label}</span>
      <span className="text-[12px] font-medium opacity-80">{note}</span>
    </motion.div>
  );
}
