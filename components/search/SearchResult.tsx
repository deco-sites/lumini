import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import { Layout as CardLayout } from "$store/components/product/ProductCard.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import CustomPagination from "./CustomPagination.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";

export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns?: Columns;
}

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
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

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <span>Not Found!</span>
    </div>
  );
}

function Result({
  page,
  layout,
  cardLayout,
  flagTextColor = "#fff",
  flagBackgroundColor = "#1d1d1b",
}: Omit<Props, "page"> & { page: ProductListingPage }) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;

  const isUniqueModeActive = layout?.columns?.mobile === 1;
  const isListModeActive = layout?.columns?.desktop === 4;

  const title = breadcrumb?.itemListElement?.slice(-1)[0]?.name ?? "";

  return (
    <>
      <div class="container px-4 sm:py-10 max-w-[1250px]">
        <div class="flex flex-col gap-4 w-full">
          <div class="flex flex-row items-center sm:p-0 mb-2">
            <Breadcrumb
              itemListElement={breadcrumb?.itemListElement?.slice(0, -1)}
            />
          </div>

          <h1 class="font-univers-next-pro-regular text-[#353535] text-[32px] pb-5 lg:pb-0">
            {title ?? "pendente"}
          </h1>

          <SearchControls
            sortOptions={sortOptions}
            filters={filters}
            displayFilter={layout?.variant === "drawer"}
            isUniqueModeActive={isUniqueModeActive}
            isListModeActive={isListModeActive}
            productsQuantity={pageInfo.records}
          />
        </div>

        <div class="flex flex-row mt-8">
          {layout?.variant === "aside" && filters.length > 0 && (
            <aside class="hidden sm:block w-min min-w-[250px]">
              <Filters filters={filters} />
            </aside>
          )}
          <div class="flex-grow">
            <ProductGallery
              products={products}
              layout={{
                card: cardLayout,
                columns: layout?.columns,
                flagTextColor,
                flagBackgroundColor,
              }}
            />
          </div>
        </div>

        <div class="flex justify-center my-4">
          <div class="join">
            <CustomPagination pageInfo={page?.pageInfo} />
          </div>
        </div>
      </div>
      <SendEventOnLoad
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: "",
            item_list_id: "",
            items: page.products?.map((product) =>
              mapProductToAnalyticsItem({
                ...(useOffer(product.offers)),
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

export const loader = (props: Props, req: Request) => {
  const url = new URL(req.url);

  if (url.searchParams.has("list")) {
    return {
      ...props,
      layout: { ...props.layout, columns: { desktop: 4 } },
    };
  }

  if (url.searchParams.has("unique")) {
    return {
      ...props,
      layout: { ...props.layout, columns: { mobile: 1 } },
    };
  }

  return props;
};

function SearchResult({ page, ...props }: Props) {
  if (!page) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export default SearchResult;
