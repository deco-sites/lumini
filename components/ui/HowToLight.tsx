import { ImageWidget } from "apps/admin/widgets.ts";
import { useId } from "$store/sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";

export interface Props {
  title: string;
  images: {
    image: ImageWidget;
    link: string;
    description: string;
    width?: number;
    height?: number; 
    title?: string; 
    subTitle?: string; 
  }[];
}

export default function CollectionSection({ title, images }: Props) {
  const id = useId();

  return (
    <section
      id={id}
      class="w-full container max-w-[1230px] py-2 flex flex-col gap-10"
    >
      <div class="flex justify-between w-full px-6 lg:px-0">
        <h1 class="text-[21px] lg:text-4xl font-univers-next-pro-bold">
          {title || ""}
        </h1>

        <div class="flex gap-6">
          <div class="relative block">
            <Slider.PrevButton class="hover:cursor-pointer disabled:opacity-50">
              <Icon size={24} id="ChevronLeft" strokeWidth={3} />
            </Slider.PrevButton>
          </div>

          <div class="relative block">
            <Slider.NextButton class="rotate-180 hover:cursor-pointer disabled:opacity-50">
              <Icon size={24} id="ChevronLeft" strokeWidth={3} />
            </Slider.NextButton>
          </div>
        </div>
      </div>

      <div class="container max-w-[1230px] grid grid-cols-[48px_1fr_48px]">
        <Slider class="carousel carousel-center sm:carousel-end gap-6 col-span-full row-start-2 row-end-5">
          {images?.map((item, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-[270px] md:w-[400px] lg:max-h-[520px] first:pl-6 sm:first:pl-0 last:pr-6 sm:last:pr-0"
            >
              <a href={item.link}>
                <Image
                  src={item.image}
                  width={item.width ?? 400}
                  height={item.height ?? 400}
                  alt={item.description}
                  loading="lazy"
                />

                <div>
                    <p class="text-xs font-medium mt-1 mb-1">{item.title}</p>
                    <p class="text-xl font-extralight mb-1">{item.subTitle}</p>
                </div>
              </a>
            </Slider.Item>
          ))}
        </Slider>
      </div>

      <SliderJS rootId={id} />
    </section>
  );
}
