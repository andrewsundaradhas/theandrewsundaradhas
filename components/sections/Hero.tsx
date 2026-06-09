"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, Rocket, Coins, Wallet, CheckCheck } from "lucide-react";
import { HERO } from "@/lib/constants";
import { Ribbon } from "@/components/ui/Ribbon";
import { Sticker } from "@/components/ui/Sticker";

const WORDS = HERO.headline.split(" ");

export function Hero() {
  const reduced = useReducedMotion();

  let charIndex = 0;

  return (
    <section
      id="hero"
      className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-sky px-6 pb-24 pt-44"
    >
      {/* Decorative ribbons behind the type */}
      <Ribbon className="absolute -left-24 top-24 w-[460px] opacity-90 md:w-[620px]" rotate={-12} />
      <Ribbon className="absolute -right-32 bottom-10 w-[420px] opacity-80 md:w-[560px]" rotate={18} />

      {/* Floating stickers */}
      <div className="absolute left-[6%] top-[26%] hidden md:block">
        <Sticker icon={Rocket} color="ember" rotate={-14} size={76} delay={0.2} />
      </div>
      <div className="absolute right-[8%] top-[22%] hidden md:block">
        <Sticker icon={Coins} color="sunburst" rotate={12} size={70} delay={0.32} />
      </div>
      <div className="absolute bottom-[20%] left-[12%] hidden lg:block">
        <Sticker icon={Wallet} color="violet" rotate={-8} size={66} delay={0.44} />
      </div>
      <div className="absolute bottom-[26%] right-[12%] hidden lg:block">
        <Sticker icon={CheckCheck} color="mint" rotate={10} size={64} delay={0.56} />
      </div>

      <div className="relative z-10 flex w-full max-w-[1100px] flex-col items-center text-center">
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="label-caps mb-7 inline-flex items-center gap-2 rounded-full border border-carbon bg-paper px-4 py-2"
        >
          <span className="h-2 w-2 rounded-full border border-carbon bg-mint" aria-hidden="true" />
          {HERO.eyebrow}
        </motion.span>

        {/* Headline — character reveal */}
        <h1 className="display-text text-balance text-[clamp(1.9rem,9.5vw,9rem)] text-carbon">
          <span className="sr-only">{HERO.headline}</span>
          {WORDS.map((word, w) => (
            <span key={w} className="block" aria-hidden="true">
              {word.split("").map((char) => {
                const i = charIndex++;
                return (
                  <motion.span
                    key={i}
                    initial={reduced ? false : { opacity: 0, y: "0.4em", rotate: -6 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ delay: 0.15 + i * 0.04, type: "spring", stiffness: 300, damping: 20 }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-8 max-w-2xl text-pretty text-[16px] font-medium leading-[1.7] text-carbon md:text-[18px]"
        >
          {HERO.subheading}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-carbon bg-carbon px-6 py-3.5 text-[14px] font-bold tracking-[0.03em] text-paper transition-transform duration-150 hover:-translate-y-0.5"
          >
            View My Work
            <ArrowRight size={16} strokeWidth={2.5} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-carbon bg-paper px-6 py-3.5 text-[14px] font-bold tracking-[0.03em] text-carbon transition-transform duration-150 hover:-translate-y-0.5 hover:bg-mist"
          >
            Get In Touch
          </a>
        </motion.div>

        {/* Quick stats */}
        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-14 grid w-full max-w-2xl grid-cols-3 gap-3"
        >
          {HERO.stats.map((stat) => (
            <li
              key={stat.label}
              className="flex flex-col items-center gap-1 rounded-[20px] border border-carbon bg-paper px-3 py-5"
            >
              <span className="display-text whitespace-nowrap text-3xl sm:text-4xl">{stat.value}</span>
              <span className="text-[11px] font-bold uppercase leading-tight tracking-[0.08em] text-carbon/70">
                {stat.label}
              </span>
            </li>
          ))}
        </motion.ul>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.span
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-carbon bg-paper"
        >
          <ChevronDown size={20} strokeWidth={2.5} />
        </motion.span>
      </motion.a>
    </section>
  );
}
