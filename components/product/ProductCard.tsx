import { SendEventOnClick } from "$store/components/Analytics.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import type { Platform } from "$store/apps/site.ts";
import type { Product } from "apps/commerce/types.ts";

export interface Layout {
  basics?: {
    contentAlignment?: "Left" | "Center";
    oldPriceSize?: "Small" | "Normal";
    ctaText?: string;
  };
  elementsPositions?: {
    skuSelector?: "Top" | "Bottom";
    favoriteIcon?: "Top right" | "Top left";
  };
  hide?: {
    productName?: boolean;
    productDescription?: boolean;
    allPrices?: boolean;
    installments?: boolean;
    skuSelector?: boolean;
    cta?: boolean;
  };
  onMouseOver?: {
    image?: "Change image" | "Zoom image";
    card?: "None" | "Move up";
    showFavoriteIcon?: boolean;
    showSkuSelector?: boolean;
    showCardShadow?: boolean;
    showCta?: boolean;
  };
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;
  layout?: Layout;

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

  platform?: Platform;
  isPLP?: boolean;
  isSearchbar?: boolean;
  isGridColsTwo?: boolean;
  isGridColsFour?: boolean;
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

const WIDTH = 400;
const HEIGHT = 400;

function ProductCard(
  {
    product,
    preload,
    itemListName,
    layout,
    platform,
    isPLP,
    isSearchbar,
    flagBackgroundColor = "#1d1d1b",
    flagTextColor = "#fff",
    isGridColsTwo = false,
    isGridColsFour = false,
  }: Props,
) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
    isVariantOf,
  } = product;
  const id = `product-card-${productID}`;
  const productGroupID = isVariantOf?.productGroupID;
  const description = product.description || isVariantOf?.description;
  const [front, back] = images?.filter((item) => item.name !== "skucor") ?? [];
  const [firstImage] = images?.filter((item) => item.name === "ordenacao1") ??
    [];
  const [secondImage] = images?.filter((item) => item.name === "hover") ?? [];
  const { listPrice, price: partialPrice, installments } = useOffer(offers);
  const possibilities = useVariantPossibilities(product);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});

  function calculateMaxPercentageDifference(
    validPrices: number[],
    validListPrices: number[],
  ) {
    return validPrices.length !== validListPrices.length
      ? 0
      : Math.max(...validPrices.map((price, index) =>
        Math.abs((validListPrices[index] - price) / validListPrices[index]) *
        100
      ));
  }

  const priceVariations = isVariantOf?.hasVariant?.map((item) =>
    item?.offers?.highPrice
  );
  const hasVariation = priceVariations?.every((item) => item === partialPrice);

  const validPrices = (priceVariations ?? []).filter((price): price is number =>
    typeof price === "number"
  );

  const lowestPrice = validPrices.length > 0 ? Math.min(...validPrices) : null;
  const price = lowestPrice ?? partialPrice;

  const listPriceVariations = isVariantOf?.hasVariant?.map((item) =>
    item?.offers?.offers?.[0]?.priceSpecification?.find((price) =>
      price.priceType === "https://schema.org/ListPrice"
    )?.price
  );

  const validListPrices = (listPriceVariations ?? []).filter((
    price,
  ): price is number => typeof price === "number");

  const discount = calculateMaxPercentageDifference(
    validPrices,
    validListPrices,
  );
  const discountPercentage = Math.round(discount);

  const l = layout;
  const align =
    !l?.basics?.contentAlignment || l?.basics?.contentAlignment == "Left"
      ? "left"
      : "center";
  const skuSelector = variants.map(([value, link]) => (
    <li>
      {
        /* <a href={link}>
        <Avatar
          variant={link === url ? "active" : link ? "default" : "disabled"}
          content={value}
        />
      </a> */
      }
    </li>
  ));
  const cta = (
    <a
      href={url && relative(url)}
      aria-label="view product"
      class="flex items-center justify-center w-[170px] h-[38px] cursor-pointer border text-black hover:text-white hover:bg-darkslategray text-sm"
    >
      {l?.basics?.ctaText || "adicionar ao carrinho"}
    </a>
  );

  const productCategory =
    isVariantOf?.hasVariant[0]?.additionalProperty?.filter((item) =>
      item.name == "category"
    )[1]?.value ?? "";

  return (
    <div
      id={id}
      class={`card card-compact group w-full ${
        !isGridColsFour && !isSearchbar && "xl:min-h-[487px] xl:max-h-[487px]"
      } ${align === "center" ? "text-center" : "text-start"} ${
        l?.onMouseOver?.showCardShadow ? "lg:hover:card-bordered" : ""
      }
        ${
        l?.onMouseOver?.card === "Move up" &&
        "duration-500 transition-translate ease-in-out lg:hover:-translate-y-2"
      }
      `}
      data-deco="view-product"
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
      <figure
        class="relative overflow-hidden"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      >
        {/* Wishlist button */}
        <div
          class={`absolute top-2 z-10
          ${
            l?.elementsPositions?.favoriteIcon === "Top left"
              ? "left-2"
              : "right-2"
          }
          ${
            l?.onMouseOver?.showFavoriteIcon
              ? "lg:hidden lg:group-hover:block"
              : "lg:hidden"
          }
        `}
        >
          {platform === "vtex" && (
            <WishlistButton
              size={600}
              productGroupID={productGroupID}
              productID={productID}
            />
          )}
        </div>
        {discountPercentage > 0 && (
          <div
            style={{ color: flagTextColor, background: flagBackgroundColor }}
            class="z-10 absolute top-0 right-0 flex py-1.5 px-2 items-center justify-center w-10 h-5 font-univers-next-pro-light text-xs"
          >
            <span>-{discountPercentage}%</span>
          </div>
        )}
        {/* Product Images */}
        <a
          href={url && relative(url)}
          aria-label="view product"
          class="grid grid-cols-1 grid-rows-1 w-full"
        >
          <Image
            src={(firstImage || front).url!}
            alt={(firstImage || front).alternateName}
            width={WIDTH}
            height={HEIGHT}
            class={`bg-base-100 col-span-full row-span-full w-full ${
              l?.onMouseOver?.image == "Zoom image"
                ? "duration-100 transition-scale scale-100 lg:group-hover:scale-125"
                : ""
            }`}
            // sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          {(!l?.onMouseOver?.image ||
            l?.onMouseOver?.image == "Change image") && (
            <Image
              src={(secondImage || back)?.url ?? (firstImage || front).url!}
              alt={(secondImage || back)?.alternateName ??
                (firstImage || front).alternateName}
              width={WIDTH}
              height={HEIGHT}
              class="hidden lg:block bg-base-100 col-span-full row-span-full transition-opacity w-full opacity-0 lg:group-hover:opacity-100"
              // sizes="(max-width: 640px) 50vw, 20vw"
              loading="lazy"
              decoding="async"
            />
          )}
        </a>
        <figcaption
          class={`
          absolute bottom-1 left-0 w-full flex flex-col gap-3 p-2 ${
            l?.onMouseOver?.showSkuSelector || l?.onMouseOver?.showCta
              ? "transition-opacity opacity-0 lg:group-hover:opacity-100"
              : "lg:hidden"
          }`}
        >
          {/* SKU Selector */}
          {l?.onMouseOver?.showSkuSelector && (
            <ul class="flex justify-center items-center gap-2 w-full">
              {skuSelector}
            </ul>
          )}
          {l?.onMouseOver?.showCta && cta}
        </figcaption>
      </figure>
      {/* Prices & Name */}
      <div class="flex-auto flex flex-col py-2 gap-1 md:min-h-[96px]">
        {/* SKU Selector */}
        {(!l?.elementsPositions?.skuSelector ||
          l?.elementsPositions?.skuSelector === "Top") && (
          <>
            {l?.hide?.skuSelector ? "" : (
              <ul
                class={`flex items-center gap-2 w-full overflow-auto p-3 ${
                  align === "center" ? "justify-center" : "justify-start"
                } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
              >
                {skuSelector}
              </ul>
            )}
          </>
        )}

        {l?.hide?.productName && l?.hide?.productDescription
          ? ""
          : (
            <div class="flex flex-col gap-0 lowercase">
              {l?.hide?.productName ? "" : (
                <h2
                  class={`${
                    isSearchbar ? "lg:text-sm" : "lg:text-xl"
                  } truncate text-base leading-[23px] text-[#353535] font-univers-next-pro-regular`}
                  dangerouslySetInnerHTML={{
                    __html: product?.isVariantOf?.name ?? name ?? "",
                  }}
                />
              )}
              {l?.hide?.productDescription ? "" : (
                <div
                  class="truncate text-sm lg:text-sm text-neutral"
                  dangerouslySetInnerHTML={{ __html: description ?? "" }}
                />
              )}
            </div>
          )}
        {l?.hide?.allPrices
          ? ""
          : (
            <div class="flex flex-col font-univers-next-pro-regular">
              <div
                class={`flex flex-col w-full gap-0 ${
                  l?.basics?.oldPriceSize === "Normal"
                    ? "lg:flex-row lg:gap-2"
                    : ""
                } ${align === "center" ? "justify-center" : "justify-start"}`}
              >
                <div
                  class={`flex w-full gap-1 sm:gap-0 font-univers-next-pro-regular ${
                    !isSearchbar
                      ? `justify-between ${
                        isGridColsTwo ? "flex-col lg:flex-row" : "flex-row"
                      }`
                      : "flex-col justify-start"
                  }`}
                >
                  <div class="flex flex-col">
                    {!isSearchbar && !hasVariation && discountPercentage > 0 &&
                      listPrice !== price &&
                      (
                        <span class="line-through text-xs sm:text-sm leading-4 text-[#a8a8a8]">
                          {formatPrice(listPrice, offers?.priceCurrency)}
                        </span>
                      )}

                    <span class="text-xs sm:text-base text-[#353535] leading-[18px]">
                      {!isSearchbar && !hasVariation && "a partir de "}
                      {/* {isSearchbar && "para"}{"  "} */}
                      {formatPrice(price, offers?.priceCurrency)}
                    </span>
                  </div>

                  {!isSearchbar && (
                    <span class="text-[#777] leading-[18px] text-base font-univers-next-pro-light">
                      {productCategory}
                    </span>
                  )}
                </div>
              </div>
              {!installments || l?.hide?.installments
                ? ""
                : (
                  <div class="text-base-300 text-sm">
                    ou {installments.replace(".", ",")}
                  </div>
                )}
            </div>
          )}

        {/* SKU Selector */}
        {l?.elementsPositions?.skuSelector === "Bottom" && (
          <>
            {l?.hide?.skuSelector ? "" : (
              <ul
                class={`flex items-center gap-1 w-full ${
                  align === "center" ? "justify-center" : "justify-start"
                } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
              >
                {skuSelector}
              </ul>
            )}
          </>
        )}

        {!l?.hide?.cta
          ? (
            <div
              class={`flex-auto flex items-start pt-4 ${
                l?.onMouseOver?.showCta ? "lg:hidden" : ""
              }`}
            >
              {cta}
            </div>
          )
          : ""}
      </div>
    </div>
  );
}

export default ProductCard;
