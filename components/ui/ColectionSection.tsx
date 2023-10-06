import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  title: string;
  images: {
    link: ImageWidget;
    description: string;
  }[];
}

export default function ColectionSection({ title, images }: Props) {
  return (
    <div class="w-full h-full flex items-center justify-center">
      <section class="max-w-full lg:max-w-[1536px] flex items-center justify-center m-5">
        <div class="w-full h-full flex flex-col items-center justify-center">
          <div class="w-full flex items-start justify-start my-5">
            <h1 class="text-4xl font-normal">
              {title}
            </h1>
          </div>
          <div class="flex flex-col lg:flex-row gap-5">
          {images.map((item) => (
              <Image
                src={item.link}
                width={615}
                height={637}
                alt={item.description}
                loading="lazy"
              />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
