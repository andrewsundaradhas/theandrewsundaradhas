"use client";

import { SKILL_GROUPS } from "@/lib/constants";
import { BG, type StickerColor } from "@/lib/colors";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function Skills() {
  return (
    <section id="skills" className="w-full bg-lavender px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <SectionLabel color="mint">Skills</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display-text mt-8 text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.82]">
            The toolkit
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {SKILL_GROUPS.map((group, gi) => (
            <Reveal key={group.label} delay={gi * 0.05}>
              <div className="h-full rounded-[20px] border border-carbon bg-paper p-6">
                <div className="mb-5 flex items-center gap-2.5">
                  <span
                    className={cn("h-3.5 w-3.5 rounded-full border border-carbon", BG[group.color as StickerColor])}
                    aria-hidden="true"
                  />
                  <h3 className="text-[15px] font-bold uppercase tracking-[0.1em]">{group.label}</h3>
                </div>
                <ul className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill, i) => (
                    <Badge key={skill} color={group.color as StickerColor} index={i}>
                      {skill}
                    </Badge>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
