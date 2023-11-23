import { Section } from "deco/blocks/section.ts";
import { useId } from "$store/sdk/useId.ts";

import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Image from "apps/website/components/Image.tsx";

import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Image {
  image: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}

export interface Props {
  title: string;
  subtitle: string;
  images?: Image[];
  interval?: number;
  sections: Section[];
}

export default function Article(
  { sections, title, subtitle, images, interval }: Props,
) {
  const id = useId();

  return (
    <div class="flex flex-col items-center justify-center my-12 font-univers-next-pro-light w-full">
      <div class="flex justify-between max-w-[1250px] w-full mx-auto">
        <span class="w-full">{subtitle}</span>
        <h1 class="text-[32px] font-bold leading-[46px] w-full">{title}</h1>
      </div>

      <div id={id} class="flex items-center w-full h-full">
        <Slider class="carousel carousel-center sm:carousel-end gap-5 col-span-full row-start-2 row-end-5">
          {images?.map((item, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-[270px] sm:w-[390px] h-full"
            >
              <Image
                src={item.image}
                alt={item.alt}
                width={item.width || 390}
                height={item.height || 390}
              />
            </Slider.Item>
          ))}
        </Slider>

        <SliderJS
          rootId={id}
          scroll="smooth"
          infinite
          interval={interval && 1e3}
        />
      </div>

      <div class="flex flex-col w-full container">
        {sections.map((section, index) => {
          const { Component, props } = section;
          return <Component key={index} {...props} />;
        })}
      </div>
    </div>
  );
}
