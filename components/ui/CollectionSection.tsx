import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

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
  return (
    <div class="w-full h-full flex items-center justify-center">
      <section class="max-w-full lg:max-w-[1250px] flex items-center justify-center m-5">
        <div class="w-full h-full flex flex-col items-center justify-center">
          <div class="w-full flex items-start justify-start my-5">
            <h1 class="text-[21px] lg:text-4xl font-univers-next-pro-bold">
              {title}
            </h1>
          </div>
          <div class="flex flex-col lg:flex-row gap-5">
            {images?.map((item) => (
              <a href={item.link} class="w-full h-full">
                <Image
                  src={item.image}
                  width={item.width ?? 615}
                  height={item.height ?? 637}
                  alt={item.description}
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
