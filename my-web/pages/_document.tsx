import { Html, Head, Main, NextScript } from "next/document";
import { DocumentProps } from 'next/document';

const config = {
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    localeDetection: false,
  },
};

interface MyDocumentProps extends DocumentProps {
  locale?: string;
}

export default function Document({ locale }: MyDocumentProps) {
  return (
    <Html lang={locale || config.i18n.defaultLocale}>
      <Head>
        <meta name="theme-color" content="#3a2a28" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
