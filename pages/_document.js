import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#52c41a" />
          <link rel="shortcut icon" href={"/images/favicon.ico"} />
          <meta name="propeller" content="19ef09e58ca9255de7af208b9019933f" />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href={"/images/apple-touch-icon.png"}
          />
        </Head>
        <body>
          <div id="page-transition"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
