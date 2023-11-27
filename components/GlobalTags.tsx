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
        type="font/ttf"
        href={asset("/fonts/UniversNextPro-Light.ttf")}
      />

      <link
        as="font"
        rel="preload"
        type="font/ttf"
        href={asset("/fonts/UniversNextPro-Regular.ttf")}
      />

      <link
        as="font"
        rel="preload"
        type="font/ttf"
        href={asset("/fonts/UniversNextPro-Bold.ttf")}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @font-face {
            font-family: 'UniversNextPro-Light';
            font-style: light;
            font-weight: 300;
            font-display: swap;
            src: url('${("/fonts/UniversNextPro-Light.ttf")}') format('truetype');
          }
          @font-face {
            font-family: 'UniversNextPro-Regular';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url('${("/fonts/UniversNextPro-Regular.ttf")}') format('truetype');
          }
          @font-face {
            font-family: 'UniversNextPro-Bold';
            font-style: bold;
            font-weight: 700;
            font-display: swap;
            src: url('${("/fonts/UniversNextPro-Bold.ttf")}') format('truetype');
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
