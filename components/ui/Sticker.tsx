"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { BG, TEXT_ON, type StickerColor } from "@/lib/colors";
import { cn } from "@/lib/utils";

/**
 * Flat illustrated sticker — a brand-colored square with a hand-cut black
 * outline, holding a Lucide glyph. Floats and rotates like a pinned cut-out.
 */
export function Sticker({
  icon: Icon,
  color,
  rotate = 0,
  size = 64,
  className,
  delay = 0,
}: {
  icon: LucideIcon;
  color: StickerColor;
  rotate?: number;
  size?: number;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.4, rotate: rotate - 18 }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 220, damping: 14, delay }}
      whileHover={{ scale: 1.12, rotate: rotate + 6 }}
      style={{ width: size, height: size }}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-[16px] border border-carbon",
        BG[color],
        TEXT_ON[color],
        className,
      )}
    >
      <Icon strokeWidth={2.5} size={Math.round(size * 0.46)} />
    </motion.div>
  );
}
