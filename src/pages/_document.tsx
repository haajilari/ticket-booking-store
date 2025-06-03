// src/pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" dir="ltr">
      {" "}
      {/* Set language and direction for the entire document */}
      <Head>
        {/* Link to the manifest file */}
        <link rel="manifest" href="/manifest.json" />
        {/* Theme color for the browser address bar */}
        <meta name="theme-color" content="#007bff" />{" "}
        {/* Must match the theme_color in the manifest */}
        {/* Meta tags required for PWA on iOS (Apple) */}
        <meta name="apple-mobile-web-app-capable" content="yes" />{" "}
        {/* Enable web app mode */}
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />{" "}
        {/* Status bar style */}
        <meta name="apple-mobile-web-app-title" content="TicketReserve" />{" "}
        {/* Name displayed under the icon on iOS */}
        {/* Links to Apple touch icons (optional, but recommended) */}
        {/* Different sizes for various iOS devices */}
        {/* <link rel="apple-touch-icon" href="/icons/apple-touch-icon-180x180.png" sizes="180x180" /> */}
        {/* <link rel="apple-touch-icon" href="/icons/apple-touch-icon-152x152.png" sizes="152x152" /> */}
        {/* <link rel="apple-touch-icon" href="/icons/apple-touch-icon-167x167.png" sizes="167x167" /> */}
        {/* Fonts (if using a custom font, preload it here) */}
        {/* Example: <link rel="preload" href="/fonts/Vazirmatn-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
