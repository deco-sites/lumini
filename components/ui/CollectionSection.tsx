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
  }[];
}

export default function CollectionSection({ title, images }: Props) {
  const id = useId();

  return (
    <section
      id={id}
      class="w-full container max-w-[1230px] py-2 px-2 xl:px-0 flex flex-col gap-10 lg:mt-5"
    >
      <div class="flex justify-between w-full">
        <h1 class="text-[21px] lg:text-4xl font-univers-next-pro-regular">
          {title || ""}
        </h1>

        <div class="hidden lg:flex items-center gap-6">
          <div class="relative block">
            <Slider.PrevButton class="hover:cursor-pointer disabled:opacity-50">
              <Icon size={24} id="ChevronLeft" strokeWidth={0.8} />
            </Slider.PrevButton>
          </div>

          <div class="relative block">
            <Slider.NextButton class="rotate-180 hover:cursor-pointer disabled:opacity-50">
              <Icon size={24} id="ChevronLeft" strokeWidth={0.8} />
            </Slider.NextButton>
          </div>
        </div>
      </div>

      <div class="container max-w-[1230px] grid lg:grid-cols-[48px_1fr_48px]">
        <Slider class="lg:carousel lg:carousel-end lg:gap-2.5 lg:col-span-full lg:row-start-2 lg:row-end-5">
          {images?.map((item, index) => (
            <Slider.Item
              index={index}
              class="lg:carousel-item w-full lg:w-[400px] lg:h-full first:pt-0 pt-4 lg:pt-0"
            >
              <a href={item.link}>
                <Image
                  src={item.image}
                  width={item.width ?? 400}
                  height={item.height ?? 400}
                  alt={item.description}
                  loading="lazy"
                />
              </a>
            </Slider.Item>
          ))}
        </Slider>
      </div>

      <SliderJS rootId={id} infinite scroll="smooth" />
    </section>
  );
}
