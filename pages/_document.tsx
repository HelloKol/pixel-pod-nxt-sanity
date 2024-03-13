import { Html, Head, Main, NextScript } from "next/document";
import { GoogleTagManager } from "@next/third-parties/google";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <GoogleTagManager gtmId="GTM-MFR4X6H6" />
      </body>
    </Html>
  );
}
