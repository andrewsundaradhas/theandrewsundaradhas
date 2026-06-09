"use client";

import { motion } from "framer-motion";
import { BG, type StickerColor } from "@/lib/colors";
import { cn } from "@/lib/utils";

/**
 * Tech-stack pill. Mono label, black hand-cut outline, sticker-colored dot.
 * Stagger-pops into view when its grid scrolls in.
 */
export function Badge({
  children,
  color = "electric",
  index = 0,
  className,
}: {
  children: React.ReactNode;
  color?: StickerColor;
  index?: number;
  className?: string;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, scale: 0.7, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 320, damping: 18, delay: index * 0.03 }}
      whileHover={{ y: -3 }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-carbon bg-paper px-3.5 py-2",
        className,
      )}
    >
      <span className={cn("h-2 w-2 shrink-0 rounded-full border border-carbon", BG[color])} aria-hidden="true" />
      <span className="font-mono text-[13px] leading-none tracking-tight">{children}</span>
    </motion.li>
  );
}
