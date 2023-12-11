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
    <section class="w-full h-full flex items-center justify-center mb-4 px-4 lg:px-0 font-univers-next-pro-regular">
      <div class="max-w-[1250px] h-full flex flex-col items-center justify-center mx-auto">
        <div class="w-full my-[68px] text-start">
          <p class="w-full text-[32px] font-normal">
            designers
          </p>
        </div>
        <div class="w-full h-full grid grid-cols-2 lg:grid-cols-4 items-center justify-center lg:justify-start gap-8">
          {cards?.map((card) => (
            <div class="flex flex-col w-full h-full">
              <a href={card.linkPage} class="w-full h-full">
                <Image
                  src={card.image.link}
                  height={287}
                  width={287}
                  alt={card.image.description}
                />
              </a>
              <h1 class="text-sm lg:text-[24px] mx-0 my-5">{card.name}</h1>
              <p class="text-xs sm:text-sm">{card.nationality}</p>
              <div class="flex items-center mt-2">
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
