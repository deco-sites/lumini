import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  return (
    <Head>
      {/* Enable View Transitions API */}
      <meta name="view-transition" content="same-origin" />

      {/* Tailwind v3 CSS file */}
      <link href={asset("/styles.css")} rel="stylesheet" />

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @font-face {
            font-family: 'UniversNextPro-Light';
            font-style: light;
            font-weight: 300;
            font-display: swap;
            src: url('${
            asset("/fonts/UniversNextPro-Light.woff2")
          }') format('woff2');
          }
          @font-face {
            font-family: 'UniversNextPro-Regular';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url('${
            asset("/fonts/UniversNextPro-Regular.woff2")
          }') format('woff2');
          }
          @font-face {
            font-family: 'UniversNextPro-Bold';
            font-style: bold;
            font-weight: 700;
            font-display: swap;
            src: url('${
            asset("/fonts/UniversNextPro-Bold.woff2")
          }') format('woff2');
          }
          `,
        }}
      />

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />
    </Head>
  );
}

export default GlobalTags;
