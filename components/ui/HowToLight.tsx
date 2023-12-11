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
      class="w-full container max-w-[1230px] py-2 px-2 xl:px-0 flex flex-col gap-10"
    >
      <div class="flex justify-between w-full">
        <h1 class="text-[21px] lg:text-[37px] lg:leading-[56px] text-darkslategray font-univers-next-pro-regular">
          {title || ""}
        </h1>

        <div class="flex items-center gap-6">
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

      <div class="container max-w-[1230px] grid grid-cols-[48px_1fr_48px]">
        <Slider class="carousel carousel-center sm:carousel-end gap-[0.8rem] col-span-full row-start-2 row-end-5">
          {images?.map((item, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-full sm:w-[32.3%] xl:w-[400px] h-full"
            >
              <a href={item.link} class="w-full h-full">
                <Image
                  src={item.image}
                  width={item.width ?? 400}
                  height={item.height ?? 400}
                  alt={item.description}
                  loading="lazy"
                />

                <div>
                  <p class="text-xs font-medium my-1">{item.title}</p>
                  <p class="text-xl font-extralight mb-1">{item.subTitle}</p>
                </div>
              </a>
            </Slider.Item>
          ))}
        </Slider>
      </div>

      <SliderJS rootId={id} infinite scroll="smooth" />
    </section>
  );
}
