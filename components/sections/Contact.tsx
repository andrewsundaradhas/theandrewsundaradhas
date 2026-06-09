"use client";

import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { CONTACT, PROFILE } from "@/lib/constants";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Ribbon } from "@/components/ui/Ribbon";
import { Sticker } from "@/components/ui/Sticker";
import { Rocket } from "lucide-react";
import { ContactForm } from "@/components/sections/ContactForm";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-lavender px-6 py-28 md:py-36"
    >
      <Ribbon className="absolute -left-28 bottom-0 w-[440px] opacity-70" rotate={-18} />
      <div className="absolute right-[10%] top-[18%] hidden md:block">
        <Sticker icon={Rocket} color="ember" rotate={14} size={72} />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[820px] flex-col items-center text-center">
        <Reveal>
          <SectionLabel color="electric">Contact</SectionLabel>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="display-text mt-8 text-[clamp(2.25rem,9vw,7rem)] leading-[0.8]">
            {CONTACT.headline}
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-7 max-w-xl text-pretty text-[16px] font-medium leading-[1.7] text-carbon/85 md:text-[18px]">
            {CONTACT.subtext}
          </p>
        </Reveal>

        <Reveal delay={0.16} className="mt-10 w-full">
          <ContactForm />
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-10 label-caps text-carbon/60">Or reach me directly</p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-carbon bg-carbon px-6 py-3.5 text-[14px] font-bold tracking-[0.03em] text-paper transition-transform duration-150 hover:-translate-y-0.5"
            >
              <Mail size={16} strokeWidth={2.5} />
              Email Me
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-carbon bg-paper px-6 py-3.5 text-[14px] font-bold tracking-[0.03em] transition-transform duration-150 hover:-translate-y-0.5 hover:bg-mist"
            >
              <Github size={16} strokeWidth={2.5} />
              GitHub
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-carbon bg-paper px-6 py-3.5 text-[14px] font-bold tracking-[0.03em] transition-transform duration-150 hover:-translate-y-0.5 hover:bg-mist"
            >
              <Linkedin size={16} strokeWidth={2.5} />
              LinkedIn
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-9 text-[13px] font-medium tracking-[0.02em] text-carbon/60">
            {CONTACT.footnote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
