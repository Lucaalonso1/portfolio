import { Html, Head, Main, NextScript } from "next/document";
import { DocumentProps } from 'next/document';
const config = require('../next-i18next.config');

interface MyDocumentProps extends DocumentProps {
  locale?: string;
}

export default function Document({ locale }: MyDocumentProps) {
  return (
    <Html lang={locale || config.i18n.defaultLocale}>
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
