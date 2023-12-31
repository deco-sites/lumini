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
      class="w-full container max-w-[1230px] py-2 px-2 xl:px-0 flex flex-col gap-6 lg:mt-5"
    >
      <div class="flex items-center justify-between w-full max-h-[60px]">
        <h1 class="text-[21px] lg:text-[37px] lg:leading-[56px] text-darkslategray font-univers-next-pro-regular">
          {title || ""}
        </h1>

        <div class="hidden lg:flex items-center gap-6">
          <div class="relative flex">
            <Slider.PrevButton class="hover:cursor-pointer disabled:opacity-50">
              <Icon size={24} id="ChevronLeft" strokeWidth={0.8} />
            </Slider.PrevButton>
          </div>

          <div class="relative flex">
            <Slider.NextButton class="rotate-180 hover:cursor-pointer disabled:opacity-50">
              <Icon size={24} id="ChevronLeft" strokeWidth={0.8} />
            </Slider.NextButton>
          </div>
        </div>
      </div>

      <div class="container max-w-[1230px] grid sm:grid-cols-[48px_1fr_48px]">
        <Slider class="sm:carousel sm:carousel-end sm:gap-[0.8rem] sm:col-span-full sm:row-start-2 sm:row-end-5">
          {images?.map((item, index) => (
            <Slider.Item
              index={index}
              class="sm:carousel-item w-full sm:w-[32.3%] xl:w-[400px] sm:h-full first:pt-0 pt-4 sm:pt-0"
            >
              <a href={item.link} class="w-full h-full">
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
