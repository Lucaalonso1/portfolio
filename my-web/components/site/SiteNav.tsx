import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import LanguageToggle from "@/components/LanguageToggle";
import { useSmoothScroll } from "@/components/site/SmoothScroll";

export function SiteNav({ revealed = true }: { revealed?: boolean }) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const lenis = useSmoothScroll();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const hiddenRef = useRef(false);

  const links = [
    { id: "work", label: t("navigation.projects") },
    { id: "about", label: t("navigation.about") },
    { id: "skills", label: t("navigation.skills") },
    { id: "terminal", label: t("navigation.terminal") },
  ];

  useEffect(() => {
    if (!lenis || !open) return;
    lenis.stop();
    return () => {
      lenis.start();
    };
  }, [open, lenis]);

  useEffect(() => {
    if (!lenis || !revealed) {
      hiddenRef.current = false;
      setHidden(false);
      lastY.current = lenis?.scroll ?? 0;
      return;
    }

    let accumulated = 0;
    const HIDE_AFTER = 4;
    const SHOW_AFTER = 4;

    const onScroll = () => {
      const y = lenis.scroll;
      const delta = y - lastY.current;
      lastY.current = y;

      if (open) {
        accumulated = 0;
        return;
      }

      // Always show near the top of the page
      if (y < 40) {
        accumulated = 0;
        if (hiddenRef.current) {
          hiddenRef.current = false;
          setHidden(false);
        }
        return;
      }

      // Ignore tiny floating-point noise
      if (Math.abs(delta) < 0.25) return;

      // Reset accumulator when direction flips
      if ((delta > 0 && accumulated < 0) || (delta < 0 && accumulated > 0)) {
        accumulated = 0;
      }
      accumulated += delta;

      if (accumulated > HIDE_AFTER && y > 48 && !hiddenRef.current) {
        hiddenRef.current = true;
        setHidden(true);
        accumulated = 0;
      } else if (accumulated < -SHOW_AFTER && hiddenRef.current) {
        hiddenRef.current = false;
        setHidden(false);
        accumulated = 0;
      }
    };

    lenis.on("scroll", onScroll);
    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis, open, revealed]);

  useEffect(() => {
    setOpen(false);
  }, [router.asPath]);

  const goTo = (id: string) => {
    setOpen(false);
    if (router.pathname !== "/") {
      void router.push(`/#${id}`);
      return;
    }

    const element = document.getElementById(id);
    if (element && lenis) {
      lenis.scrollTo(element, { duration: 1.25, force: true });
    } else {
      element?.scrollIntoView();
    }
    const path = router.asPath.split("#")[0];
    window.history.replaceState(null, "", `${path}#${id}`);
  };

  const goHome = () => {
    setOpen(false);
    if (router.pathname !== "/") {
      void router.push("/");
      return;
    }
    if (lenis) lenis.scrollTo(0, { duration: 1.15, force: true });
    else window.scrollTo({ top: 0 });
    window.history.replaceState(null, "", router.asPath.split("#")[0]);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:px-5 md:pt-4 ${
          !open && (!revealed || hidden) ? "-translate-y-[120%]" : "translate-y-0"
        }`}
      >
        <div className="glass mx-auto flex max-w-5xl items-center justify-between rounded-full px-4 py-2 md:px-5">
          <button
            type="button"
            onClick={goHome}
            className="text-sm font-semibold tracking-tight text-white"
          >
            Luca Alonso
          </button>

          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => goTo(link.id)}
                className="text-[13px] text-white/75 transition-colors hover:text-white"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <LanguageToggle />
            </div>
            <Link
              href="/contact"
              className="hidden rounded-full bg-white px-4 py-2 text-[13px] font-medium text-black transition-transform hover:scale-[1.03] sm:inline-flex"
            >
              {t("navigation.contact")}
            </Link>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white lg:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 h-px w-4 bg-white transition-transform ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-px w-4 bg-white transition-opacity ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-4 bg-white transition-transform ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[45] bg-[rgb(12,10,9)] px-5 pt-28 sm:px-6 lg:hidden"
          >
            <nav className="flex max-h-[calc(100svh-7.5rem)] flex-col gap-1 overflow-y-auto pb-10">
              {links.map((link, index) => (
                <motion.button
                  key={link.id}
                  type="button"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.4 }}
                  onClick={() => goTo(link.id)}
                  className="border-b border-white/15 py-4 text-left text-[2rem] font-semibold tracking-tight text-white sm:text-4xl"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="w-full sm:max-w-[14rem]">
                  <LanguageToggle isMobile />
                </div>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-medium text-black sm:w-auto"
                >
                  {t("navigation.contact")}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
