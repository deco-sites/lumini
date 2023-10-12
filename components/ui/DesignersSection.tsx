import Image from "apps/website/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";

import type { ImageWidget } from "apps/admin/widgets.ts";

export interface IDesignersCard {
  hasImage: {
    image: ImageWidget;
    description: string;
    loading?: "lazy" | "eager";
  };
  name: string;
  country?: string;
  link: string;
}

export interface Props {
  title: string;
  description?: string;
  hasButton?: {
    link: string;
    title: string;
  };
  designers?: IDesignersCard[];
}

function DesignersCard({ name, country, link, hasImage }: IDesignersCard) {
  return (
    <div class="flex flex-col first:border-l border-r last:border-none border-black px-5 h-[400px] gap-0.5">
      <a class="w-[238px] h-[280px]">
        <Image
          src={hasImage.image}
          width={238}
          height={280}
          loading={hasImage.loading ?? "lazy"}
          alt={hasImage.description}
          class="object-cover w-full h-full"
        />
      </a>

      <div class="flex flex-col gap-1">
        <h1 class="text-lg font-univers-next-pro-bold font-bold text-dark-gray leading-5">
          {name ?? "lorem impsum"}
        </h1>

        {country && <span class="text-xs">{country}</span>}

        <div class="flex items-center gap-2">
          <a href={link} class="underline pt-1.5 text-sm">conheça o trabalho</a>
          <Icon
            id="Plus"
            loading="lazy"
            size={12}
            strokeWidth={2}
            fill="none"
            class="mt-1"
          />
        </div>
      </div>
    </div>
  );
}

export default function DesignersSection(
  { title, description, hasButton, designers }: Props,
) {
  return (
    <section class="flex flex-col sm:flex-row w-full lg:w-[90%] h-full ml-auto font-univers-next-pro-light font-light my-6 md:my-14 gap-6 sm:gap-12">
      <div class="flex flex-col gap-2.5 items-start justify-center sm:max-w-[50%] lg:min-w-[500px] lg:max-w-full px-2 lg:px-0">
        <h1 class="text-4xl font-univers-next-pro-bold font-bold text-dark-gray">
          {title ?? "designers"}
        </h1>

        <p class="pt-2.5 lg:max-w-[314px]">{description ?? "lorem impsum"}</p>

        {hasButton && (
          <a
            href={hasButton.link ?? "/designers"}
            class="flex items-center justify-center py-2.5 mt-0.5 border border-dark-gray hover:bg-dark-gray hover:text-white w-full lg:w-[65%] text-sm duration-200 transition-colors"
          >
            {hasButton.title ?? "conheça todos os nossos designers"}
          </a>
        )}
      </div>

      <aside class="flex max-w-full h-full overflow-x-scroll pb-8 gap-2 snap-start scrollbar">
        {designers?.map((designer) => <DesignersCard {...designer} />)}
      </aside>
    </section>
  );
}
