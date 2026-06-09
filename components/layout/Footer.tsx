import Link from "next/link";
import { Github, Linkedin } from "@/components/ui/BrandIcons";
import { PROFILE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-carbon bg-carbon text-paper">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-6 px-6 py-12 md:flex-row md:justify-between">
        <p className="text-center text-[14px] font-medium md:text-left">
          {PROFILE.name} · Built with Next.js &amp; Tailwind
        </p>

        <div className="flex items-center gap-3">
          <Link
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-paper transition-colors hover:bg-paper hover:text-carbon"
          >
            <Github size={18} strokeWidth={2.25} />
          </Link>
          <Link
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-paper transition-colors hover:bg-paper hover:text-carbon"
          >
            <Linkedin size={18} strokeWidth={2.25} />
          </Link>
        </div>
      </div>
      <div className="border-t border-[#2a2a2a] py-5 text-center text-[12px] font-medium tracking-[0.03em] text-[#a1a1aa]">
        © 2025 {PROFILE.name}
      </div>
    </footer>
  );
}
