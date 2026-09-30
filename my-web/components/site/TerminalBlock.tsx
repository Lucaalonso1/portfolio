import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import InteractiveTerminal from "@/components/InteractiveTerminal";

export function TerminalBlock() {
  const { t } = useTranslation("common");

  return (
    <section id="terminal" className="px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-8 text-center"
        >
          <p className="text-sm font-medium text-white/60">Terminal</p>
          <h2 className="mt-3 text-[2rem] font-semibold tracking-[-0.03em] sm:text-4xl md:text-6xl">
            {t("terminal.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl px-1 text-sm text-white/70 sm:text-base">{t("terminal.subtitle")}</p>
        </motion.div>
        <InteractiveTerminal />
      </div>
    </section>
  );
}
