"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Base sticker card: hand-cut black outline, soft 20px+ radius, no shadow
 * (elevation comes from color + outline, per the design system). Lifts on hover.
 */
export function Card({
  children,
  className,
  elevated = false,
  interactive = true,
}: {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
  interactive?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
      whileHover={interactive ? { y: -6 } : undefined}
      className={cn(
        "border border-carbon bg-paper",
        elevated ? "rounded-[40px]" : "rounded-[20px]",
        "p-6",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
