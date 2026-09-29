import Head from "next/head";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useCallback, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { SiteNav } from "@/components/site/SiteNav";
import { BootScreen, hasBooted } from "@/components/site/BootScreen";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Manifesto } from "@/components/site/Manifesto";
import { Work } from "@/components/site/Work";
import { About } from "@/components/site/About";
import { Skills } from "@/components/site/Skills";
import { TerminalBlock } from "@/components/site/TerminalBlock";
import { FooterCta } from "@/components/site/FooterCta";

export default function Home() {
  const { t } = useTranslation("common");
  useLanguage();
  const [ready, setReady] = useState(hasBooted);
  const finishBoot = useCallback(() => setReady(true), []);

  return (
    <>
      <Head>
        <title>{t("meta.title")}</title>
        <meta name="description" content={t("meta.description")} />
      </Head>
      <SiteNav revealed={ready} />
      <BootScreen onDone={finishBoot} />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <Manifesto />
        <Work />
        <About />
        <Skills />
        <TerminalBlock />
        <FooterCta />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "es", ["common"])),
    },
  };
};
