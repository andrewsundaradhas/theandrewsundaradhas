import { MARQUEE_ITEMS } from "@/lib/constants";

/** Full-bleed scrolling announcement strip. Black band, white mono caps. */
export function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="fixed inset-x-0 top-0 z-50 overflow-hidden border-b border-carbon bg-carbon">
      <div className="flex w-max animate-marquee whitespace-nowrap py-2.5">
        {[0, 1].map((dup) => (
          <ul key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
            {items.map((item, i) => (
              <li
                key={`${dup}-${i}`}
                className="flex items-center text-[12px] font-bold uppercase tracking-[0.18em] text-paper"
              >
                <span className="px-6">{item}</span>
                <span className="text-electric" aria-hidden="true">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
