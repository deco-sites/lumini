import Icon from "$store/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";

import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  categories: Array<{
    image: ImageWidget;
    description: string;
    link: string;
    width?: number;
    height?: number;
  }>;
  preload?: boolean;
}

function CategoriesShelf({
  categories,
  preload = false,
}: Props) {
  const id = useId();

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div class="w-full container pt-8 pb-8 flex flex-col gap-12 lg:gap-16 lg:pt-10 lg:pb-20">
      <div
        id={id}
        class="container max-w-[1200px] grid grid-cols-[48px_1fr_48px] px-0 sm:px-5"
      >
        <Slider class="carousel carousel-center sm:carousel-end gap-[13px] col-span-full row-start-2 row-end-5">
          {categories?.map((category, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-[130px] h-[160px] sm:w-[180px] sm:h-[222px] first:pl-4 last:pr-4 sm:first:pl-1 sm:last:pr-1"
            >
              <a href={category.link}>
                <Image
                  src={category.image}
                  width={category.width ?? 180}
                  height={category.height ?? 222}
                  loading={preload ? "eager" : "lazy"}
                  alt={category.description}
                />
              </a>
            </Slider.Item>
          ))}
        </Slider>

        <>
          <div class="hidden relative sm:block z-10 col-start-1 row-start-3 -translate-y-3">
            <Slider.PrevButton class="absolute right-[100%] rotate-180 lg:right-[135%]">
              <Icon size={28} id="ChevronRight" strokeWidth={1} />
            </Slider.PrevButton>
          </div>
          <div class="hidden relative sm:block z-10 col-start-3 row-start-3 -translate-y-3">
            <Slider.NextButton class="absolute left-[100%] lg:left-[135%]">
              <Icon size={28} id="ChevronRight" strokeWidth={1} />
            </Slider.NextButton>
          </div>
        </>
        <SliderJS rootId={id} infinite scroll="smooth" />
      </div>
    </div>
  );
}

export default CategoriesShelf;
