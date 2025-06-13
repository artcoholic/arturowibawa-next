import React from "react";
import Script from "next/script";
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
        </Head>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="cac89657-8172-4522-b6e6-edbbd4b56774"
          strategy="beforeInteractive"
          data-domains="arturowibawa.com, www.arturowibawa.com"
        ></Script>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
