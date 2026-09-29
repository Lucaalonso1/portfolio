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

export function Marquee() {
  const loop = [...ITEMS, ...ITEMS];

  return (
    <div className="overflow-hidden border-y border-white/15 bg-black/20 py-3 backdrop-blur-xl">
      <div className="animate-marquee flex w-max items-center">
        {loop.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center text-[13px] font-medium tracking-wide text-white/75"
          >
            <span className="px-5">{item}</span>
            <span className="text-white/35">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
