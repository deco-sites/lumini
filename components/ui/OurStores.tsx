import Icon from "$store/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import { HTMLWidget } from "apps/admin/widgets.ts";

export interface Props {
  title: HTMLWidget;
  cards?: {
    image: {
      linkImage: ImageWidget;
      descriptionImage: string;
    };
    city?: HTMLWidget;
    description?: HTMLWidget;
    titleButton?: string;
    linkButton?: string;
  }[];
}

export default function OurStores({ title, cards }: Props) {
  return (
    <section class="w-full h-full flex items-center justify-center my-2">
      <div class="max-w-[1536px] h-full flex flex-col items-start justify-start mx-auto mt-4">
        <div class="w-full h-full my-4">
          <p
            dangerouslySetInnerHTML={{ __html: title ?? "" }}
            class="text-[40px] text-[#3f3f40] my-4"
          />
        </div>
        <div class="w-full h-full flex flex-wrap items-center justify-start gap-4">
          {cards?.map((card) => (
            <div class="max-w-[450px] w-full h-full flex flex-col">
              <div class="w-full h-full">
                <Image
                  src={card.image.linkImage}
                  width={376}
                  height={238}
                  alt={card.image.descriptionImage}
                />
              </div>
              <div class="my-2">
                <p
                  dangerouslySetInnerHTML={{ __html: card.city ?? "" }}
                  class="text-2xl font-semibold my-2"
                />

                <p
                  dangerouslySetInnerHTML={{ __html: card.description ?? "" }}
                  class="text-base my-2"
                />
              </div>
              <a href={card.linkButton} class="w-full flex items-center">
                <button class="flex items-center bg-transparent hover:bg-[#1d1d1b] text-[#1d1d1b] font-semibold hover:text-white py-2 px-4 border border-[#1d1d1b] hover:border-transparent my-4">
                  {card.titleButton ?? "ver no mapa"}
                  <Icon
                    class="text-black"
                    size={28}
                    id="ChevronRight"
                    strokeWidth={1}
                  />
                </button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
