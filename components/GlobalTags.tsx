import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  return (
    <Head>
      {/* Enable View Transitions API */}
      <meta name="view-transition" content="same-origin" />

      {/* Tailwind v3 CSS file */}
      <link href={asset("/styles.css")} rel="stylesheet" />

      <link
        as="font"
        rel="preload"
        type="font/woff2"
        href={asset("/fonts/UniversNextPro-Light.woff2")}
      />

      <link
        as="font"
        rel="preload"
        type="font/woff2"
        href={asset("/fonts/UniversNextPro-Regular.woff2")}
      />

      <link
        as="font"
        rel="preload"
        type="font/woff2"
        href={asset("/fonts/UniversNextPro-Bold.woff2")}
      />

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />
    </Head>
  );
}

export default GlobalTags;
