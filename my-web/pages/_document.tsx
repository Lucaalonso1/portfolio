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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
