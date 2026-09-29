import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { HashScroll } from "@/components/site/HashScroll";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const handleRouteChange = (url: string) => {
      if (url.includes("#")) return;
      window.scrollTo(0, 0);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  return (
    <div className="relative min-h-screen font-body text-[#f5f5f7]">
      <div className="wallpaper" aria-hidden />
      <SmoothScroll>
        <ScrollProgress />
        <HashScroll />
        <Component {...pageProps} />
      </SmoothScroll>
    </div>
  );
}

export default appWithTranslation(App);
