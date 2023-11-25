import { Picture, Source } from "apps/website/components/Picture.tsx";
import Image from "apps/website/components/Image.tsx";

import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  subtitle?: string;
  title: string;
  description: string;
  benefits?: {
    info: string;
    hasImage: {
      mobile: {
        image: ImageWidget;
        width?: number;
        height?: number;
      };
      desktop: {
        image: ImageWidget;
        width?: number;
        height?: number;
      };
      description: string;
      preload?: boolean;
    };
  };
  asideImage: {
    image: ImageWidget;
    width?: number;
    height?: number;
    description: string;
    /**
     * @description lazy loading should be used when image has top priority
     */
    loading?: "lazy" | "eager";
  };
}

export default function SuggestionHero({
  title,
  description,
  subtitle,
  benefits,
  asideImage,
}: Props) {
  return (
    <section class="flex flex-col sm:flex-row w-full lg:w-[90%] h-full ml-auto font-univers-next-pro-light font-light my-4 md:my-8 gap-6 sm:gap-12">
      <div class="flex flex-col gap-2.5 items-start justify-center sm:max-w-[50%] lg:max-w-[620px] px-2 lg:px-0">
        <span class="text-sm leading-[18px] text-black/50">
          {subtitle ?? "conheça"}
        </span>
        <h1 class="text-4xl font-univers-next-pro-bold font-bold text-dark-gray">
          {title ?? "led solutions"}
        </h1>

        <p class="pt-2 text-black/50">{description ?? "lorem impsum"}</p>
        {benefits && (
          <>
            <span class="pb-3 text-black/50">
              {benefits.info ?? "principais benefícios do led:"}
            </span>

            <Picture preload={benefits.hasImage.preload}>
              <Source
                media="(max-width: 767px)"
                fetchPriority={benefits.hasImage.preload ? "high" : "auto"}
                src={benefits.hasImage.mobile.image}
                width={benefits.hasImage.mobile.width ?? 345}
                height={benefits.hasImage.mobile.height ?? 170}
              />
              <Source
                media="(min-width: 768px)"
                fetchPriority={benefits.hasImage.preload ? "high" : "auto"}
                src={benefits.hasImage.desktop.image}
                width={benefits.hasImage.desktop.width ?? 550}
                height={benefits.hasImage.desktop.height ?? 0}
              />
              <img
                class="object-cover w-full h-full"
                loading={benefits.hasImage.preload ? "eager" : "lazy"}
                src={benefits.hasImage.desktop.image}
                alt={benefits.hasImage.description}
              />
            </Picture>
          </>
        )}
      </div>

      {asideImage && (
        <aside class="w-full h-[80%] my-5">
          <Image
            src={asideImage.image}
            width={asideImage.width ?? 842}
            height={asideImage.height ?? 453}
            loading={asideImage.loading ?? "lazy"}
            alt={asideImage.description}
            class="object-cover w-full h-full"
          />
        </aside>
      )}
    </section>
  );
}
