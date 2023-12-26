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
      <div class="flex flex-col lg:flex-row justify-between max-w-[1250px] w-full mx-auto px-4 lg:px-0">
        <span class="w-full text-lg lg:text-[32px]">{subtitle}</span>
        <h1 class="text-lg lg:text-[32px] font-bold lg:leading-[46px] w-full">
          {title}
        </h1>
      </div>

      <div id={id} class="flex items-center w-full h-full mt-6">
        <Slider class="carousel carousel-center sm:carousel-end gap-5 col-span-full row-start-2 row-end-5">
          {images?.map((item, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-[270px] sm:w-[390px] md:w-[460px] lg:w-[500px] h-full"
            >
              <Image
                src={item.image}
                alt={item.alt}
                width={item.width || 500}
                height={item.height || 500}
              />
            </Slider.Item>
          ))}
        </Slider>

        <SliderJS
          rootId={id}
          scroll="smooth"
          infinite
          interval={interval && interval * 1e3}
        />
      </div>

      <div class="flex flex-col w-full items-center justify-center container lg:max-w-[50%]">
        {sections.map((section, index) => {
          const { Component, props } = section;
          return <Component key={index} {...props} />;
        })}
      </div>
    </div>
  );
}
