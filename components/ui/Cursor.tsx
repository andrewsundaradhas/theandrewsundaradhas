"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom dot cursor (desktop, fine-pointer only). Scales up over interactive
 * elements. Hidden for touch and reduced-motion users.
 */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.4 });
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setActive(Boolean(el?.closest("a, button, [role='button'], input, textarea")));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ left: sx, top: sy }}
      className="pointer-events-none fixed z-[200] hidden -translate-x-1/2 -translate-y-1/2 lg:block"
    >
      <motion.div
        animate={{ scale: active ? 2.6 : 1, backgroundColor: active ? "#5c4ade" : "#000000" }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="h-3 w-3 rounded-full border border-carbon"
      />
    </motion.div>
  );
}
