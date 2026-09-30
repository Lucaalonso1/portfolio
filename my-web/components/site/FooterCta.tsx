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
      <motion.div style={{ y }} className="glass mx-auto max-w-6xl rounded-[24px] px-5 py-10 sm:rounded-[32px] sm:px-8 sm:py-12 md:px-12 md:py-16">
        <p className="text-sm font-medium text-white/60">{t("cta.kicker")}</p>
        <Link href="/contact" className="group mt-3 block">
          <h2 className="text-[clamp(2.4rem,8vw,6rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white transition-opacity group-hover:opacity-80">
            {t("cta.title")}
          </h2>
        </Link>
        <p className="mt-5 max-w-md text-base text-white/75 sm:mt-6 sm:text-lg">{t("cta.text")}</p>
        <Link
          href="/contact"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black sm:mt-8 sm:px-6"
        >
          {t("cta.button")}
          <ArrowUpRight className="h-4 w-4" />
        </Link>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/15 pt-6 text-sm text-white/65 sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
          <a href={`mailto:${LINKS.email}`} className="break-all transition-colors hover:text-white sm:break-normal">
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
