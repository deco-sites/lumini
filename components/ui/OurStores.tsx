import Icon from "$store/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import { HTMLWidget } from "apps/admin/widgets.ts";
import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";

export interface FilterProps {
  cities?: string[];
  onFilterChange: (selectedCity: string) => void;
}

const Filter: FunctionalComponent<FilterProps> = (
  { cities, onFilterChange },
) => {
  const [selectedCity, setSelectedCity] = useState<string | undefined>(
    undefined,
  );

  if (!cities || cities.length === 0) return null;

  const uniqueCities = Array.from(new Set(cities));

  const handleChange = (event: h.JSX.TargetedEvent<HTMLSelectElement>) => {
    setSelectedCity(event.currentTarget.value);
    onFilterChange(event.currentTarget.value);
  };

  return (
    <select
      value={selectedCity || "filtrar por"}
      onChange={handleChange}
      class="select select-bordered w-full max-w-xs"
    >
      <option disabled value="filtrar por">filtrar por</option>
      {uniqueCities.map((item) => <option key={item}>{item}</option>)}
      <option value={""}>remover filtros</option>
    </select>
  );
};

export interface Props {
  title: string;
  cards?: {
    image: {
      linkImage: ImageWidget;
      descriptionImage: string;
    };
    city?: string;
    description?: HTMLWidget;
    titleButton?: string;
    linkButton?: string;
    imageIcon: {
      linkIcon: ImageWidget;
      descriptionIcon?: string;
    };
  }[];
}

const OurStores: FunctionalComponent<Props> = ({ title, cards }) => {
  const uniqueCities = (cards?.map((item) => item.city) ?? []).filter(
    Boolean,
  ) as string[];
  const [filteredCards, setFilteredCards] = useState<Props["cards"]>(
    cards ?? [],
  );

  const handleFilterChange = (selectedCity: string) => {
    setFilteredCards(
      selectedCity
        ? cards?.filter((card) => card.city === selectedCity) ?? []
        : cards ?? [],
    );
  };

  return (
    <section class="w-full h-full flex items-center justify-center my-4 px-4 xl:px-0">
      <div class="max-w-[1536px] h-full flex flex-col items-start justify-start mx-auto mt-4">
        <div class="flex flex-col md:flex-row items-center justify-between w-full h-full my-4">
          <p class="text-xl lg:text-[40px] text-[#3f3f40] my-4 leading-[60px]">
            {title}
          </p>

          <Filter cities={uniqueCities} onFilterChange={handleFilterChange} />
        </div>
        <div class="w-full h-full grid sm:grid-cols-2 md:grid-cols-3 items-center justify-center md:justify-start gap-4">
          {filteredCards?.map((card) => (
            <div class="max-w-[450px] w-full h-full flex flex-col">
              <div class="w-full h-full">
                <Image
                  src={card.image.linkImage}
                  width={376}
                  height={238}
                  alt={card.image.descriptionImage}
                />
              </div>
              <div class="my-2 py-2">
                <span class="my-2 text-2xl leading-7 text-[#3f3f40] font-univers-next-pro-bold">
                  {card.city}
                </span>

                <p
                  dangerouslySetInnerHTML={{ __html: card.description ?? "" }}
                  class="my-2 pt-2"
                />
              </div>
              <a
                href={card.linkButton}
                class="w-full flex items-center group max-w-[175px] h-[40px]"
              >
                <div class="flex items-center bg-transparent h-[40px] group-hover:bg-[#1d1d1b] text-[14px] leading-[14px] text-[#1d1d1b] group-hover:text-white py-2 px-4 border border-[#1d1d1b] group-hover:border-transparent my-4">
                  {card.titleButton ?? "ver no mapa"}
                  <Image
                    class="group-hover:mix-blend-lighten ml-3"
                    src={card.imageIcon.linkIcon}
                    width={20}
                    height={14}
                    alt={card.imageIcon.descriptionIcon}
                  />
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurStores;
