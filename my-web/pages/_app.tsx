import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Prevenir el comportamiento de scroll restoration del navegador
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Asegurar que siempre empecemos desde arriba en cambios de ruta
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return <Component {...pageProps} />;
}

export default appWithTranslation(App);
