import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSmoothScroll } from "@/components/site/SmoothScroll";

export function HashScroll() {
  const lenis = useSmoothScroll();
  const router = useRouter();

  useEffect(() => {
    if (!lenis) return;

    const scrollToHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;

      window.setTimeout(() => {
        const element = document.getElementById(hash);
        if (!element) return;
        lenis.resize();
        lenis.scrollTo(element, { duration: 1.15, force: true });
      }, 120);
    };

    scrollToHash();
    router.events.on("routeChangeComplete", scrollToHash);
    return () => {
      router.events.off("routeChangeComplete", scrollToHash);
    };
  }, [lenis, router.events]);

  return null;
}
