import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";

function ProfileOrb({ className }: { className: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-full bg-[#efecea] shadow-[0_20px_50px_rgba(0,0,0,0.35)] ring-1 ring-white/55 ${className}`}
    >
      <img
        src="/portrait.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[center_16%]"
      />
    </div>
  );
}

export function Hero({ ready }: { ready: boolean }) {
  const { t } = useTranslation("common");

  return (
    <section className="flex min-h-screen items-center px-6 pb-16 pt-28">
      <motion.div
        initial={false}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.85, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto w-full max-w-3xl text-center"
      >
        <ProfileOrb className="mx-auto h-16 w-16 md:h-[4.5rem] md:w-[4.5rem]" />
        <p className="mt-6 text-sm font-medium text-white/90 [text-shadow:0_2px_16px_rgba(0,0,0,0.55)]">
          {t("hero.greeting")}
        </p>
        <h1 className="mt-2 text-[clamp(2.6rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-white [text-shadow:0_8px_32px_rgba(0,0,0,0.55)]">
          {t("hero.name")}
        </h1>
        <p className="mt-3 text-lg text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.55)] md:text-xl">
          {t("hero.role")}
          <span className="text-white/70"> · </span>
          {t("hero.place")}
        </p>
        <p className="mx-auto mt-6 max-w-xl text-[17px] leading-[1.65] text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.65)] md:text-[1.2rem]">
          {t("hero.description")}
        </p>
      </motion.div>
    </section>
  );
}
