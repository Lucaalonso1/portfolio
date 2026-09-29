import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { useSmoothScroll } from "@/components/site/SmoothScroll";

let booted = false;

export function hasBooted() {
  return booted;
}

function ProfileOrb({ className }: { className: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-full bg-[#efecea] shadow-[0_28px_70px_rgba(0,0,0,0.4)] ring-1 ring-white/55 ${className}`}
    >
      <img
        src="/portrait.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[center_16%]"
      />
    </div>
  );
}

export function BootScreen({ onDone }: { onDone: () => void }) {
  const { t } = useTranslation("common");
  const lenis = useSmoothScroll();
  const [phase, setPhase] = useState<"run" | "leave" | "gone">(() => (booted ? "gone" : "run"));

  useEffect(() => {
    if (booted) {
      onDone();
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      booted = true;
      onDone();
      setPhase("gone");
      return;
    }

    const leaveTimer = window.setTimeout(() => setPhase("leave"), 2500);
    const doneTimer = window.setTimeout(() => {
      booted = true;
      onDone();
    }, 2620);
    const hideTimer = window.setTimeout(() => setPhase("gone"), 3280);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(doneTimer);
      window.clearTimeout(hideTimer);
    };
  }, [onDone]);

  useEffect(() => {
    if (phase === "gone") return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    lenis?.stop();

    return () => {
      root.style.overflow = previous;
      lenis?.start();
    };
  }, [lenis, phase]);

  if (phase === "gone") return null;

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center px-6"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "leave" ? 0 : 1, scale: phase === "leave" ? 1.03 : 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      role="status"
      aria-live="polite"
      aria-label={t("hero.name")}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <ProfileOrb className="h-36 w-36 sm:h-40 sm:w-40 md:h-[10.5rem] md:w-[10.5rem]" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 text-[clamp(2.5rem,5vw,3.6rem)] font-semibold tracking-[-0.03em] text-white [text-shadow:0_8px_32px_rgba(0,0,0,0.5)]"
      >
        {t("hero.name")}
      </motion.p>
      <div className="mt-8 h-1 w-44 overflow-hidden rounded-full bg-white/25 shadow-[0_1px_8px_rgba(0,0,0,0.25)] sm:w-52">
        <motion.div
          className="h-full origin-left rounded-full bg-white"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2.15, delay: 0.25, ease: [0.45, 0, 0.2, 1] }}
        />
      </div>
    </motion.div>
  );
}
