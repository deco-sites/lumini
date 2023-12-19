import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Image from "apps/website/components/Image.tsx";
import { useId } from "$store/sdk/useId.ts";

import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  title: string;
  awards: Array<{
    image: ImageWidget;
    description: string;
    width?: number;
    height?: number;
  }>;
  interval?: number;
}

export default function Awards({ title, awards, interval }: Props) {
  const id = useId();

  return (
    <section class="flex flex-col gap-6 w-full h-full px-4 lg:px-0 mt-5 mb-5 lg:mb-36 lg:mt-12">
      <div class="lg:container lg:max-w-[1250px]">
        <h1 class="text-[32px]">{title}</h1>
      </div>

      <div id={id} class="grid grid-cols-[48px_1fr_48px] h-full">
        <Slider class="carousel carousel-center sm:carousel-end gap-6 col-span-full row-start-2 row-end-5 h-full py-4">
          {awards?.map((award, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-[215px] h-[116px]"
            >
              <div class="flex items-center justify-center w-full h-full py-1.5 shadow-xl rounded-md">
                <img
                  src={award.image}
                  width={award.width ?? 127}
                  height={award.height ?? 86}
                  loading="lazy"
                  alt={award.description}
                />
              </div>
            </Slider.Item>
          ))}
        </Slider>
      </div>

      <SliderJS
        rootId={id}
        infinite
        interval={interval && interval * 1e3}
        scroll="smooth"
      />
    </section>
  );
}
