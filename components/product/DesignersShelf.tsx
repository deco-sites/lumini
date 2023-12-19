import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import type { Layout as CardLayout } from "$store/components/product/ProductCard.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";

export interface Layout {
  /**
   * @description Number of products per line on grid
   */
  columns?: Columns;
}

export interface Props {
  products: Product[] | null;
  title?: string;
  layout?: Layout;
  cardLayout?: CardLayout;
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
  layout,
  cardLayout,
  flagTextColor = "#fff",
  flagBackgroundColor = "#1d1d1b",
}: Props) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="w-full container max-w-[1230px] py-2 flex flex-col gap-10 px-4 xl:px-0 pb-5 lg:pb-12">
      <div class="flex w-full">
        <h1 class="text-[21px] lg:text-[40px] lg:leading-[60px] text-darkslategray font-univers-next-pro-regular">
          {title || ""}
        </h1>
      </div>

      <div class="container max-w-[1230px] flex-grow">
        <ProductGallery
          products={products}
          layout={{
            card: cardLayout,
            columns: layout?.columns,
            flagTextColor,
            flagBackgroundColor,
          }}
        />

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
    </div>
  );
}

export default ProductShelf;
