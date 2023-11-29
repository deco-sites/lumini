import Image from "apps/website/components/Image.tsx";

import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  subtitle?: string;
  title: string;
  description: string;
  benefits?: {
    info: string;
    images: {
      url: ImageWidget;
      description: string;
      width?: number;
      height?: number;
    }[];
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
    <section class="flex flex-col items-center justify-center sm:flex-row w-full h-full ml-auto lg:ml-0 font-univers-next-pro-light font-light my-4 md:my-8 gap-6 sm:gap-12">
      <div class="flex flex-col gap-2.5 items-start justify-center sm:max-w-[50%] lg:max-w-[620px] px-2 xl:px-0">
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

            <div class="flex flex-col lg:flex-row gap-1 items-start lg:items-center">
              {benefits?.images?.map((item) => (
                <Image
                  src={item.url}
                  alt={item.description}
                  width={item.width || 120}
                  height={item.height || 60}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {asideImage && (
        <aside class="max-w-[940px] w-full h-[80%] my-5">
          <Image
            src={asideImage.image}
            width={asideImage.width ?? 842}
            height={asideImage.height ?? 453}
            loading={asideImage.loading ?? "lazy"}
            alt={asideImage.description}
            class="object-cover w-full h-full lg:ml-[152px]"
          />
        </aside>
      )}
    </section>
  );
}
