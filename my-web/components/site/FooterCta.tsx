import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "next-i18next";
import { ArrowUpRight } from "lucide-react";
import { LINKS } from "@/components/site/links";

export function FooterCta() {
  const { t } = useTranslation("common");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [70, 0]);

  return (
    <footer ref={ref} className="px-4 pb-8 pt-16 md:px-8 md:pt-20">
      <motion.div style={{ y }} className="glass mx-auto max-w-6xl rounded-[32px] px-8 py-12 md:px-12 md:py-16">
        <p className="text-sm font-medium text-white/60">{t("cta.kicker")}</p>
        <Link href="/contact" className="group mt-3 block">
          <h2 className="text-[clamp(3rem,8vw,6rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white transition-opacity group-hover:opacity-80">
            {t("cta.title")}
          </h2>
        </Link>
        <p className="mt-6 max-w-md text-lg text-white/75">{t("cta.text")}</p>
        <Link
          href="/contact"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black"
        >
          {t("cta.button")}
          <ArrowUpRight className="h-4 w-4" />
        </Link>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-6 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <a href={`mailto:${LINKS.email}`} className="transition-colors hover:text-white">
            {LINKS.email}
          </a>
          <div className="flex gap-6">
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
              GitHub
            </a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
              LinkedIn
            </a>
          </div>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </motion.div>
    </footer>
  );
}
