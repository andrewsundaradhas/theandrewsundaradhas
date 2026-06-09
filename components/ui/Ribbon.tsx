import { cn } from "@/lib/utils";

/**
 * Signature inflatable blue ribbon motif. Flat electric-blue fill with a
 * black hand-cut outline and an SVG grain overlay (texture, not a gradient —
 * gradients are banned by the design system). Purely decorative.
 */
export function Ribbon({
  className,
  rotate = 0,
  float = true,
}: {
  className?: string;
  rotate?: number;
  float?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 600 300"
      aria-hidden="true"
      focusable="false"
      style={{ ["--ribbon-rot" as string]: `${rotate}deg`, transform: `rotate(${rotate}deg)` }}
      className={cn("pointer-events-none select-none", float && "animate-ribbon", className)}
    >
      <defs>
        <filter id="ribbonGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.12 0" result="grain" />
          <feComposite in="grain" in2="SourceGraphic" operator="in" result="masked" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="masked" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M40 180 C 40 80, 180 60, 240 130 S 420 240, 500 150 C 560 90, 560 220, 500 240 S 300 250, 230 200 S 80 250, 60 220 Z"
        fill="#4da2ff"
        stroke="#000000"
        strokeWidth="6"
        filter="url(#ribbonGrain)"
      />
      {/* inner highlight band for inflated feel (flat, not a gradient) */}
      <path
        d="M120 150 C 180 110, 260 150, 320 160"
        fill="none"
        stroke="#7fbcff"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}
