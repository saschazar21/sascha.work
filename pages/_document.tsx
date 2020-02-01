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
      <Html lang="en" data-amp-bind-class="lightswitch">
        <Head>
          <script
            async
            custom-element="amp-install-serviceworker"
            src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"
          />
          <script
            async
            custom-element="amp-bind"
            src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <amp-install-serviceworker
            src="/sw.js"
            data-iframe-src="https://sascha.work/serviceworker.html"
            layout="nodisplay"
          ></amp-install-serviceworker>
        </body>
      </Html>
    );
  }
}
