import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { getCssText } from "../config/stitches.config";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
          <script
            src="https://analytics.ahrefs.com/analytics.js"
            data-key="WnSL3GjTENjCF8x/+guH8A"
            async
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
