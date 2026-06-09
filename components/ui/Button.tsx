import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "filled" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full border border-carbon px-5 py-3 text-[14px] font-bold tracking-[0.03em] transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0";

const variants: Record<Variant, string> = {
  filled: "bg-carbon text-paper hover:bg-[#1a1a1a]",
  ghost: "bg-paper text-carbon hover:bg-mist",
};

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

/** Pill CTA. Black-filled for primary, outlined-ghost for secondary. */
export function ButtonLink({
  href,
  external,
  variant = "filled",
  className,
  children,
}: CommonProps & { href: string; external?: boolean }) {
  const extraProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <Link href={href} className={cn(base, variants[variant], className)} {...extraProps}>
      {children}
    </Link>
  );
}
