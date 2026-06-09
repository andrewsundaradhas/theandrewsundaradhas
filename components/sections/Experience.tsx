"use client";

import { EXPERIENCE } from "@/lib/constants";
import { BG, type StickerColor } from "@/lib/colors";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <section id="experience" className="w-full bg-lavender px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <SectionLabel color="electric">Experience</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display-text mt-8 text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.82]">
            Where I&apos;ve built
          </h2>
        </Reveal>

        <div className="relative mt-14 pl-8 md:pl-12">
          {/* vertical line */}
          <span
            aria-hidden="true"
            className="absolute left-[7px] top-2 h-full w-[2px] bg-carbon md:left-[11px]"
          />

          <div className="flex flex-col gap-10">
            {EXPERIENCE.map((exp, i) => (
              <Reveal key={exp.role} delay={i * 0.08} className="relative">
                {/* dot marker */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -left-8 top-6 h-4 w-4 rounded-full border-2 border-carbon md:-left-12",
                    BG[exp.color as StickerColor],
                  )}
                />
                <article className="rounded-[20px] border border-carbon bg-paper p-6 md:p-8">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-[22px] font-bold leading-tight md:text-[26px]">{exp.role}</h3>
                      <p className="mt-1 text-[15px] font-medium text-carbon/70">{exp.org}</p>
                    </div>
                    <span className="shrink-0 self-start rounded-full border border-carbon bg-paper px-4 py-2 text-[12px] font-bold tracking-[0.03em]">
                      {exp.period}
                    </span>
                  </div>

                  <span
                    className={cn(
                      "mt-4 inline-block rounded-full border border-carbon px-3 py-1.5 text-[12px] font-bold tracking-[0.03em]",
                      BG[exp.color as StickerColor],
                    )}
                  >
                    {exp.badge}
                  </span>

                  <ul className="mt-5 space-y-3">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-3 text-[15px] font-medium leading-[1.6] text-carbon/90">
                        <span
                          className={cn("mt-2 h-2 w-2 shrink-0 rounded-full border border-carbon", BG[exp.color as StickerColor])}
                          aria-hidden="true"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
