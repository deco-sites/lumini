import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

/**
 * @titleBy alt
 */
export interface Banner {
  /** @description desktop otimized image */
  desktop: {
    image: ImageWidget;
    width?: number;
    height?: number;
  };
  /** @description mobile otimized image */
  mobile: {
    image: ImageWidget;
    width?: number;
    height?: number;
  };
  /** @description Image's alt text */
  alt: string;
  /** @description Image's link */
  link?: string;
}

export interface Props {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

const DEFAULT_PROPS = {
  images: [],
  preload: true,
};

function BannerItem({ image, lcp }: { image: Banner; lcp?: boolean }) {
  const {
    alt,
    mobile,
    desktop,
    link,
  } = image;

  return (
    <a
      href={link || "#"}
      aria-label={alt || "banner"}
      class="relative lg:min-h-[83vh] lg:max-h-[83vh] overflow-y-hidden w-full"
    >
      <Picture preload={lcp}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile.image}
          width={mobile.width || 768}
          height={mobile.height || 972}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop.image}
          width={desktop.width || 1280}
          height={desktop.height || 514}
        />
        <img
          class="object-cover w-full h-full"
          loading={lcp ? "eager" : "lazy"}
          src={desktop.image}
          alt={alt}
        />
      </Picture>
    </a>
  );
}

function Dots({ images, interval = 0 }: Props) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }
          `,
        }}
      />
      <ul class="carousel justify-center col-span-full gap-4 z-10 row-start-4">
        {images?.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot index={index}>
              <div class="py-5">
                <div
                  class="w-2.5 h-2.5 rounded-full border border-black group-disabled:animate-progress bg-gradient-to-r from-black from-[length:var(--dot-progress)] to-transparent to-[length:var(--dot-progress)]"
                  style={{ animationDuration: `${interval}s` }}
                />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}

function Buttons() {
  return (
    <>
      <div class="flex items-center justify-center z-10 col-start-1 row-start-2 cursor-pointer">
        <Slider.PrevButton class="">
          <Icon
            class="text-black"
            size={28}
            id="ChevronLeft"
            strokeWidth={1}
          />
        </Slider.PrevButton>
      </div>
      <div class="flex items-center justify-center z-10 col-start-3 row-start-2 rotate-180 cursor-pointer">
        <Slider.NextButton class="">
          <Icon
            class="text-black"
            size={28}
            id="ChevronLeft"
            strokeWidth={1}
          />
        </Slider.NextButton>
      </div>
    </>
  );
}

function BannerCarousel(props: Props) {
  const { images, preload, interval } = { ...DEFAULT_PROPS, ...props };

  const id = useId();

  return (
    <div
      id={id}
      class="grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px]"
    >
      <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-6">
        {images?.map((image, index) => (
          <Slider.Item index={index} class="carousel-item w-full">
            <BannerItem image={image} lcp={index === 0 && preload} />
          </Slider.Item>
        ))}
      </Slider>

      {images && images.length > 1 && (
        <>
          <Buttons />

          <Dots images={images} interval={interval} />

          <SliderJS
            rootId={id}
            interval={interval && interval * 1e3}
            infinite
          />
        </>
      )}
    </div>
  );
}

export default BannerCarousel;
