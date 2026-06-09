"use client";

import { STATS } from "@/lib/constants";
import { type StickerColor } from "@/lib/colors";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StatCard } from "@/components/ui/StatCard";
import { Reveal } from "@/components/ui/Reveal";
import { Ribbon } from "@/components/ui/Ribbon";

export function Stats() {
  return (
    <section id="stats" className="relative w-full overflow-hidden bg-sky px-6 py-24 md:py-32">
      <Ribbon className="absolute -right-28 top-10 w-[420px] opacity-70" rotate={20} />

      <div className="relative z-10 mx-auto max-w-[1200px]">
        <Reveal>
          <SectionLabel color="sunburst">Achievements</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display-text mt-8 text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.82]">
            Numbers that shipped
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              note={stat.note}
              color={stat.color as StickerColor}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
