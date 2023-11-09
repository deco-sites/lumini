import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  cards: {
    image: {
      link: ImageWidget;
      description: string;
    };
    name: string;
    linkPage: string;
    nationality: string;
  }[];
}

export default function Designers({ cards }: Props) {
  return (
    <section class="w-full h-full flex items-center justify-center">
      <div class="max-w-[1250px] h-full flex flex-col items-center justify-center mx-auto">
        <div class="w-full my-[56px] text-center xl:text-start">
          <p class="w-full text-[32px]">
            designers
          </p>
        </div>
        <div class="w-full h-full flex flex-wrap items-center justify-center gap-8">
          {cards?.map((card) => (
            <div class="flex flex-col">
              <a href={card.linkPage}>
                <Image
                  src={card.image.link}
                  height={287}
                  width={287}
                  alt={card.image.description}
                />
              </a>
              <h1 class="text-[24px] mx-0 my-1">{card.name}</h1>
              <p class="font-extralight">{card.nationality}</p>
              <div class="flex flex-row mt-2">
                <a href={card.linkPage}>
                  <p class="text-sm underline">conheça o trabalho</p>
                </a>
                <div class="text-[17px] font-extralight pl-2">+</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
