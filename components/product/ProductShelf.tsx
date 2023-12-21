import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import ProductCard, {
  Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
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
  /**
   * @format color
   * @default #fff
   */
  flagTextColor?: string;
  /**
   * @format color
   * @default #1d1d1b
   */
  flagBackgroundColor?: string;
}

function ProductShelf({
  products,
  title,
  cardLayout,
  flagTextColor = "#fff",
  flagBackgroundColor = "#1d1d1b",
}: Props) {
  const id = useId();
  const platform = usePlatform();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section
      id={id}
      class="w-full container max-w-[1230px] py-2 flex flex-col gap-5 px-2 xl:px-0"
    >
      <div class="flex items-center justify-between w-full max-h-[60px]">
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
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-full sm:w-[32.3%] xl:w-[400px] h-full"
            >
              <ProductCard
                product={product}
                itemListName={title}
                layout={cardLayout}
                platform={platform}
                flagTextColor={flagTextColor}
                flagBackgroundColor={flagBackgroundColor}
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

      <SliderJS rootId={id} infinite scroll="smooth" />
    </section>
  );
}

export default ProductShelf;
