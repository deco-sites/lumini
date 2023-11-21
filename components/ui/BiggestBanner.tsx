import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

/**
 * @titleBy alt
 */
export interface Banner {
  /** @description desktop otimized image */
  desktop: {
    image: ImageWidget;
    width: number;
    height: number;
  };
  /** @description mobile otimized image */
  mobile: {
    image: ImageWidget;
    width: number;
    height: number;
  };
  /** @description Image's alt text */
  alt: string;
}

export interface Props {
  image: Banner;
  preload?: boolean;
}

function BannerItem({ image, lcp }: { image: Banner; lcp?: boolean }) {
  const {
    alt,
    mobile,
    desktop,
  } = image;

  return (
    <div class="relative overflow-y-hidden w-full">
      <Picture preload={lcp}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile.image}
          width={mobile.width ?? 1280}
          height={mobile.height ?? 514}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop.image}
          width={desktop.width ?? 1280}
          height={desktop.height ?? 514}
        />
        <img
          class="object-cover w-full h-full"
          loading={lcp ? "eager" : "lazy"}
          src={desktop.image}
          alt={alt}
        />
      </Picture>
    </div>
  );
}

function BiggestBanner({ image, preload }: Props) {
  return (
    <section class="h-full w-full">
      <BannerItem image={image} lcp={preload} />
    </section>
  );
}

export default BiggestBanner;
