"use client";

import { ABOUT_PARAGRAPHS } from "@/lib/constants";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Terminal } from "@/components/ui/Terminal";
import { Reveal } from "@/components/ui/Reveal";
import { TERMINAL_LINES } from "@/lib/constants";

export function About() {
  return (
    <section id="about" className="w-full bg-paper px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <SectionLabel color="lavender">About</SectionLabel>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — text */}
          <div>
            <Reveal>
              <h2 className="display-text mb-8 text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.85]">
                Builder. Shipper. Leader.
              </h2>
            </Reveal>
            <div className="space-y-5">
              {ABOUT_PARAGRAPHS.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="text-pretty text-[16px] font-medium leading-[1.7] text-carbon/90 md:text-[17px]">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right — terminal */}
          <Reveal delay={0.1} className="lg:sticky lg:top-32">
            <Terminal lines={TERMINAL_LINES} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
