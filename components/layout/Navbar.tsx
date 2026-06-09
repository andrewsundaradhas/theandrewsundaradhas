"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, ArrowUpRight } from "lucide-react";
import { NAV_LINKS, PROFILE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section highlight via IntersectionObserver.
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-[42px] z-40 px-4">
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto flex max-w-[1200px] items-center justify-between gap-3 rounded-full border border-carbon px-3 py-2 transition-colors duration-300",
          scrolled ? "bg-paper/80 backdrop-blur-md" : "bg-paper/60 backdrop-blur-sm",
        )}
      >
        {/* Logo monogram */}
        <Link
          href="#hero"
          aria-label="Andrew Sundaradhas — home"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-carbon bg-electric font-display text-[15px] text-carbon"
        >
          AS
        </Link>

        {/* Center links (desktop) */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active === link.href ? "true" : undefined}
                className={cn(
                  "rounded-full border px-4 py-2 text-[13px] font-bold tracking-[0.03em] transition-colors",
                  active === link.href
                    ? "border-carbon bg-carbon text-paper"
                    : "border-transparent text-carbon hover:border-carbon hover:bg-mist",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions (desktop) */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href={PROFILE.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-carbon bg-paper px-4 py-2.5 text-[13px] font-bold tracking-[0.03em] transition-colors hover:bg-mist"
          >
            <Download size={15} strokeWidth={2.5} />
            Resume
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-carbon bg-carbon px-4 py-2.5 text-[13px] font-bold tracking-[0.03em] text-paper transition-colors hover:bg-[#1a1a1a]"
          >
            Hire Me
            <ArrowUpRight size={15} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-carbon bg-paper md:hidden"
        >
          {open ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="mx-auto mt-3 max-w-[1200px] rounded-[20px] border border-carbon bg-paper p-3 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-full px-4 py-3 text-[15px] font-bold tracking-[0.03em]",
                      active === link.href ? "bg-carbon text-paper" : "hover:bg-mist",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex flex-col gap-2 border-t border-carbon pt-3">
              <Link
                href={PROFILE.resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-carbon bg-paper px-4 py-3 text-[14px] font-bold tracking-[0.03em]"
              >
                <Download size={16} strokeWidth={2.5} />
                Download Resume
              </Link>
              <Link
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-carbon bg-carbon px-4 py-3 text-[14px] font-bold tracking-[0.03em] text-paper"
              >
                Hire Me
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
