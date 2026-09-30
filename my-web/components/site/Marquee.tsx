const ITEMS = [
  "React",
  "Next.js",
  "TypeScript",
  "Python",
  "Node.js",
  "Tailwind",
  "MongoDB",
  "Framer Motion",
  "Figma",
];

/** Enough repeats so one half always fills wide viewports (no empty gap). */
const SET_REPEATS = 4;

function MarqueeSet({ ariaHidden = false }: { ariaHidden?: boolean }) {
  const items = Array.from({ length: SET_REPEATS }, () => ITEMS).flat();

  return (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={ariaHidden || undefined}
    >
      {items.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className="flex items-center text-[13px] font-medium tracking-wide text-white/75"
        >
          <span className="px-5 whitespace-nowrap">{item}</span>
          <span className="text-white/35">·</span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-white/15 bg-black/20 py-3 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-black/35 to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-black/35 to-transparent sm:w-16" />
      <div className="animate-marquee flex w-max items-center">
        <MarqueeSet />
        <MarqueeSet ariaHidden />
      </div>
    </div>
  );
}
