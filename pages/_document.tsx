import React, { ReactElement } from 'react';
import Document, {
  DocumentInitialProps,
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components/macro';
import { RenderPageResult } from 'next/dist/next-server/lib/utils';

export default class WebsiteDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const { renderPage } = ctx || {};
    const sheet = new ServerStyleSheet();

    ctx.renderPage = (): RenderPageResult =>
      renderPage({
        enhanceApp: (App) => (props): ReactElement =>
          sheet.collectStyles(<App {...props} />),
      }) as RenderPageResult;

    try {
      const initialProps = await Document.getInitialProps(ctx);

      return Object.assign({}, initialProps, {
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      });
    } finally {
      sheet.seal();
    }
  }

  public render(): JSX.Element {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
