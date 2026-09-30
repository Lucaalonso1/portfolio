import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useTranslation } from "next-i18next";

function ManifestoWord({
  children,
  progress,
  index,
  total,
}: {
  children: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.72, 1]);

  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block">
      {children}
    </motion.span>
  );
}

export function Manifesto() {
  const { t } = useTranslation("common");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });
  const words = t("manifesto.text").split(" ");

  return (
    <section ref={ref} className="px-5 py-20 sm:px-6 sm:py-28 md:px-10 md:py-44">
      <p className="mx-auto max-w-4xl text-[clamp(1.45rem,5.5vw,3.15rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.65)]">
        {words.map((word, index) => (
          <ManifestoWord
            key={`${word}-${index}`}
            progress={scrollYProgress}
            index={index}
            total={words.length}
          >
            {word}
          </ManifestoWord>
        ))}
      </p>
    </section>
  );
}
