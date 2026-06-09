"use client";

import { Users, Star } from "lucide-react";
import { LEADERSHIP } from "@/lib/constants";
import { BG, TEXT_ON, type StickerColor } from "@/lib/colors";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const ICONS = [Star, Users];

export function Leadership() {
  return (
    <section id="leadership" className="w-full bg-paper px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <SectionLabel color="violet">Leadership</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display-text mt-8 text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.82]">
            Leading people
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {LEADERSHIP.map((card, i) => {
            const color = card.color as StickerColor;
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={card.role} delay={i * 0.08}>
                <article className="flex h-full flex-col rounded-[40px] border border-carbon bg-paper p-7 md:p-9">
                  <div className="flex items-center gap-4">
                    <span
                      className={cn(
                        "flex h-14 w-14 shrink-0 items-center justify-center rounded-[16px] border border-carbon",
                        BG[color],
                        TEXT_ON[color],
                      )}
                    >
                      <Icon size={26} strokeWidth={2.5} />
                    </span>
                    <div>
                      <h3 className="text-[24px] font-bold leading-tight md:text-[28px]">{card.role}</h3>
                      {card.org && <p className="text-[15px] font-medium text-carbon/70">{card.org}</p>}
                    </div>
                  </div>

                  <ul className="mt-6 space-y-3.5">
                    {card.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-[15px] font-medium leading-[1.55] text-carbon/90">
                        <span className={cn("mt-2 h-2 w-2 shrink-0 rounded-full border border-carbon", BG[color])} aria-hidden="true" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
