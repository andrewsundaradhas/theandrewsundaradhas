/**
 * Static class maps so Tailwind's scanner picks up every sticker color.
 * Never build these strings dynamically (e.g. `bg-${color}`) — the JIT
 * compiler can't see those and they'd be purged.
 */

export type StickerColor =
  | "electric"
  | "mint"
  | "lavender"
  | "ember"
  | "sunburst"
  | "violet";

export const BG: Record<StickerColor, string> = {
  electric: "bg-electric",
  mint: "bg-mint",
  lavender: "bg-lavender",
  ember: "bg-ember",
  sunburst: "bg-sunburst",
  violet: "bg-violet",
};

export const TEXT_ON: Record<StickerColor, string> = {
  electric: "text-carbon",
  mint: "text-carbon",
  lavender: "text-carbon",
  ember: "text-paper",
  sunburst: "text-carbon",
  violet: "text-paper",
};

export const DOT: Record<StickerColor, string> = BG;

export const HEX: Record<StickerColor, string> = {
  electric: "#4da2ff",
  mint: "#55db9c",
  lavender: "#e9ccff",
  ember: "#fb4903",
  sunburst: "#ffd731",
  violet: "#5c4ade",
};
