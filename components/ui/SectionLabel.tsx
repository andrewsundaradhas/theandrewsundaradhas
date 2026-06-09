"use client";

import { motion } from "framer-motion";
import { BG, type StickerColor } from "@/lib/colors";
import { cn } from "@/lib/utils";

/** Uppercase eyebrow label rendered as a small black-outlined pill. */
export function SectionLabel({
  children,
  color = "electric",
  className,
}: {
  children: React.ReactNode;
  color?: StickerColor;
  className?: string;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className={cn(
        "label-caps inline-flex items-center gap-2 rounded-full border border-carbon px-4 py-2",
        BG[color],
        className,
      )}
    >
      <span className="inline-block h-2 w-2 rounded-full border border-carbon bg-paper" aria-hidden="true" />
      {children}
    </motion.span>
  );
}
