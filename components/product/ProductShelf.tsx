import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import ProductCard, {
  Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

export interface Props {
  products: Product[] | null;
  title?: string;
  cardLayout?: cardLayout;
}

function ProductShelf({
  products,
  title,
  cardLayout,
}: Props) {
  const id = useId();
  const platform = usePlatform();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div
      id={id}
      class="w-full container max-w-[1230px] py-8 flex flex-col gap-12 lg:gap-16 lg:py-10"
    >
      <div class="flex justify-between w-full px-6 lg:px-0">
        <h1 class="text-[21px] lg:text-4xl font-univers-next-pro-bold">
          {title || ""}
        </h1>

        <div class="flex gap-6">
          <div class="relative block z-10 col-start-1 row-start-3">
            <Slider.PrevButton class="absolute right-1/2 hover:cursor-pointer disabled:opacity-70">
              <Icon size={24} id="ChevronLeft" strokeWidth={3} />
            </Slider.PrevButton>
          </div>

          <div class="relative block z-10 col-start-3 row-start-3">
            <Slider.NextButton class="absolute left-1/2 rotate-180 hover:cursor-pointer disabled:opacity-70">
              <Icon size={24} id="ChevronLeft" strokeWidth={3} />
            </Slider.NextButton>
          </div>
        </div>
      </div>

      <div class="container max-w-[1230px] grid grid-cols-[48px_1fr_48px]">
        <Slider class="carousel carousel-center sm:carousel-end gap-6 col-span-full row-start-2 row-end-5">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-[270px] sm:w-[385px] lg:h-[410px] first:pl-6 sm:first:pl-0 last:pr-6 sm:last:pr-0"
            >
              <ProductCard
                product={product}
                itemListName={title}
                layout={cardLayout}
                platform={platform}
              />
            </Slider.Item>
          ))}
        </Slider>

        <SendEventOnLoad
          event={{
            name: "view_item_list",
            params: {
              item_list_name: title,
              items: products.map((product) =>
                mapProductToAnalyticsItem({
                  product,
                  ...(useOffer(product.offers)),
                })
              ),
            },
          }}
        />
      </div>

      <SliderJS rootId={id} />
    </div>
  );
}

export default ProductShelf;
