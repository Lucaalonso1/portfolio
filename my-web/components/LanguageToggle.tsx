"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

interface LanguageToggleProps {
  isLightHeader?: boolean;
  isMobile?: boolean;
}

const LANGUAGES = [
  { locale: "es", label: "Español", code: "ES" },
  { locale: "en", label: "English", code: "EN" },
] as const;

const LanguageToggle: React.FC<LanguageToggleProps> = ({
  isLightHeader = false,
  isMobile = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((lang) => lang.locale === router.locale) ?? LANGUAGES[0];

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const handleLanguageChange = (locale: string) => {
    localStorage.setItem("preferred-language", locale);
    router.push(router.asPath, router.asPath, { locale });
    setIsOpen(false);
  };

  const triggerClass = isMobile
    ? "w-full justify-between rounded-2xl border border-white/20 bg-white/[0.08] px-4 py-3 backdrop-blur-xl"
    : "rounded-full border border-white/20 bg-white/[0.08] px-3 py-1.5 backdrop-blur-xl hover:bg-white/[0.14]";

  return (
    <div ref={rootRef} className={`relative ${isMobile ? "w-full min-w-0" : ""}`}>
      <motion.button
        type="button"
        whileHover={{ scale: isMobile ? 1 : 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Language: ${current.label}`}
        className={`flex items-center gap-2 outline-none transition-colors duration-300 focus-visible:ring-1 focus-visible:ring-white/45 ${triggerClass} ${
          isLightHeader
            ? "border-black/10 bg-black/[0.04] text-black hover:bg-black/[0.08]"
            : "text-white"
        }`}
      >
        <span className="text-[12px] font-semibold tracking-[0.08em]">{current.code}</span>
        {isMobile && (
          <span className="min-w-0 flex-1 truncate text-left text-sm font-medium text-white/80">
            {current.label}
          </span>
        )}
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="h-3.5 w-3.5 shrink-0 opacity-70"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            role="listbox"
            aria-label="Select language"
            className={`absolute z-50 mt-2 overflow-hidden rounded-2xl border p-1 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl ${
              isMobile ? "left-0 right-0 w-full" : "right-0 w-[9.5rem]"
            } ${
              isLightHeader
                ? "border-black/10 bg-white/95 text-black"
                : "border-white/20 bg-[rgba(18,18,20,0.72)] text-white"
            }`}
          >
            {LANGUAGES.map((lang) => {
              const active = router.locale === lang.locale;

              let optionClass = "text-white/70 hover:bg-white/[0.08] hover:text-white";
              let badgeClass = "border border-white/20 bg-white/5 text-white/80";

              if (isLightHeader) {
                optionClass = active
                  ? "bg-black/[0.06] text-black"
                  : "text-black/70 hover:bg-black/[0.04]";
                badgeClass = active
                  ? "bg-black text-white"
                  : "border border-black/15 bg-black/[0.04] text-black/70";
              } else if (active) {
                optionClass = "bg-white/[0.14] text-white";
                badgeClass = "bg-white text-black";
              }

              return (
                <button
                  key={lang.locale}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => handleLanguageChange(lang.locale)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left outline-none transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-white/40 ${optionClass}`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold tracking-wide ${badgeClass}`}
                  >
                    {lang.code}
                  </span>
                  <span className="text-sm font-medium">{lang.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageToggle;
