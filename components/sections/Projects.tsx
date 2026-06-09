"use client";

import { motion } from "framer-motion";
import { Github, ArrowUpRight, Check } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/constants";
import { BG, type StickerColor } from "@/lib/colors";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

function TechRow({ tech }: { tech: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tech.map((t) => (
        <li
          key={t}
          className="rounded-full border border-carbon bg-paper px-3 py-1.5 font-mono text-[12px] leading-none"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function GithubLink({ href, name }: { href: string; name: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} on GitHub`}
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-carbon bg-paper transition-colors hover:bg-carbon hover:text-paper"
    >
      <Github size={18} strokeWidth={2.25} />
    </a>
  );
}

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const color = project.color as StickerColor;
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="grid grid-cols-1 gap-6 rounded-[40px] border border-carbon bg-paper p-6 md:grid-cols-5 md:p-10"
    >
      <div className="md:col-span-3">
        <span className={cn("label-caps inline-block rounded-full border border-carbon px-3 py-1.5", BG[color])}>
          Featured
        </span>
        <div className="mt-4 flex items-start justify-between gap-4">
          <h3 className="display-text text-[clamp(2rem,4.5vw,3.4rem)] leading-[0.85]">{project.name}</h3>
          {project.github && <GithubLink href={project.github} name={project.name} />}
        </div>
        <p className="mt-3 text-[17px] font-bold text-carbon md:text-[19px]">{project.tagline}</p>
        <p className="mt-4 text-[15px] font-medium leading-[1.65] text-carbon/80">{project.description}</p>
        <div className="mt-6">
          <TechRow tech={project.tech} />
        </div>
      </div>

      {project.highlights && (
        <div className={cn("rounded-[20px] border border-carbon p-5 md:col-span-2", BG[color])}>
          <p className="label-caps mb-3">Highlights</p>
          <ul className="space-y-3">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2.5 text-[14px] font-medium leading-[1.45]">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-carbon bg-paper">
                  <Check size={12} strokeWidth={3} />
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.article>
  );
}

function CompactCard({ project, index }: { project: Project; index: number }) {
  const color = project.color as StickerColor;
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="flex flex-col rounded-[20px] border border-carbon bg-paper p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <span className={cn("h-6 w-6 rounded-full border border-carbon", BG[color])} aria-hidden="true" />
        {project.github ? (
          <GithubLink href={project.github} name={project.name} />
        ) : (
          <ArrowUpRight size={20} strokeWidth={2.25} className="text-carbon/40" aria-hidden="true" />
        )}
      </div>
      <h3 className="mt-5 text-[24px] font-bold leading-tight">{project.name}</h3>
      <p className="mt-2 text-[15px] font-bold text-carbon/90">{project.tagline}</p>
      <p className="mt-3 flex-1 text-[14px] font-medium leading-[1.6] text-carbon/75">{project.description}</p>
      <div className="mt-5">
        <TechRow tech={project.tech} />
      </div>
    </motion.article>
  );
}

export function Projects() {
  const featured = PROJECTS.filter((p) => p.featured);
  const regular = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" className="w-full bg-paper px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <SectionLabel color="ember">Projects</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display-text mt-8 text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.82]">
            Things I&apos;ve shipped
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col gap-6">
          {featured.map((p, i) => (
            <FeaturedCard key={p.name} project={p} index={i} />
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {regular.map((p, i) => (
            <CompactCard key={p.name} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
