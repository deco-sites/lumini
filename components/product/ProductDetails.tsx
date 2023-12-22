import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import AddToCartButtonVNDA from "$store/islands/AddToCartButton/vnda.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import AddToCartButtonWake from "$store/islands/AddToCartButton/wake.tsx";
import AddToCartButtonLinx from "$store/islands/AddToCartButton/linx.tsx";
import AddToCartButtonShopify from "$store/islands/AddToCartButton/shopify.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import ProductSelector from "./ProductVariantSelector.tsx";
import ProductDescription from "./ProductDescription.tsx";
import ProductPrice from "./ProductPrice.tsx";
import ShareButton from "$store/components/ui/ShareButton.tsx";
import AugmentedReality from "$store/components/product/AugmentedReality.tsx";
import ProductImage from "$store/islands/ProductImage.tsx";
import type { ProductDetailsPage, ProductLeaf } from "apps/commerce/types.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
  skus?: ProductLeaf[];

  layout?: {
    /**
     * @title Product Image
     * @description How the main product image will be displayed
     * @default slider
     */
    image?: "front-back" | "slider";
    /**
     * @title Product Name
     * @description How product title will be displayed. Concat to concatenate product and sku names.
     * @default product
     */
    name?: "concat" | "productGroup" | "product";
  };

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

const WIDTH = 709;
const HEIGHT = 709;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

/**
 * Rendered when a not found is returned by any of the loaders run on this page
 */
function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <span class="font-medium text-2xl">Página não encontrada</span>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  );
}

function ProductInfo(
  { page, skus, layout }: {
    page: ProductDetailsPage;
    selectedSku?: ProductLeaf;
  } & Props,
) {
  const platform = usePlatform();
  const {
    breadcrumbList,
    product,
  } = page;
  const {
    productID,
    offers,
    name = "",
    url,
    isVariantOf,
    additionalProperty = [],
  } = product;
  const description = product.description || isVariantOf?.description;
  const {
    price = 0,
    listPrice,
    seller = "1",
    installments,
    availability,
  } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const discount = price && listPrice ? listPrice - price : 0;

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb
        itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
      />
      {/* Code and name */}
      <div class="flex flex-col gap-4 mt-4 sm:mt-8">
        <div class="lowercase text-lightslategray/60 text-xs">
          <span>
            referência:{" "}
            {additionalProperty.find((item) => item.name === "RefId")?.value}
          </span>
        </div>

        <div class="flex flex-row justify-between w-full">
          <div class="flex flex-col gap-1.5">
            <h1 class="lowercase font-normal font-univers-next-pro-regular leading-[29px] text-[25px] text-darkslategray">
              {layout?.name === "concat"
                ? `${isVariantOf?.name} ${name}`
                : layout?.name === "productGroup"
                ? isVariantOf?.name
                : name}
            </h1>

            <span class="text-gray-normal/80 leading-6">
              {breadcrumbList && breadcrumbList?.itemListElement[1].name}
            </span>
          </div>

          <div class="flex items-center justify-center">
            <WishlistButton
              variant="icon"
              size={24}
              productID={productID}
              productGroupID={productGroupID}
            />

            <ShareButton url={url || ""} />
          </div>
        </div>
      </div>

      {/* Sku Selector */}
      <div class="flex flex-col gap-2 mt-4 w-full font-univers-next-pro-light leading-[21px]">
        <ProductSelector product={product} />
      </div>

      {/* Prices */}
      <ProductPrice
        price={price}
        listPrice={listPrice}
        installments={installments}
        priceCurrency={offers?.priceCurrency}
        products={isVariantOf?.hasVariant || []}
      />

      {/* Add to Cart */}
      <div class="mt-4 mb-2.5 flex flex-col gap-2">
        {availability === "https://schema.org/InStock"
          ? (
            <>
              {platform === "vtex" && (
                <AddToCartButtonVTEX
                  name={name}
                  productID={productID}
                  productGroupID={productGroupID}
                  price={price}
                  discount={discount}
                  seller={seller}
                  products={isVariantOf?.hasVariant || []}
                />
              )}
              {platform === "wake" && (
                <AddToCartButtonWake
                  name={name}
                  productID={productID}
                  productGroupID={productGroupID}
                  price={price}
                  discount={discount}
                />
              )}
              {platform === "linx" && (
                <AddToCartButtonLinx
                  name={name}
                  productID={productID}
                  productGroupID={productGroupID}
                  price={price}
                  discount={discount}
                />
              )}
              {platform === "vnda" && (
                <AddToCartButtonVNDA
                  name={name}
                  productID={productID}
                  productGroupID={productGroupID}
                  price={price}
                  discount={discount}
                  additionalProperty={additionalProperty}
                />
              )}
              {platform === "shopify" && (
                <AddToCartButtonShopify
                  name={name}
                  productID={productID}
                  productGroupID={productGroupID}
                  price={price}
                  discount={discount}
                />
              )}
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>
      {/* Description card */}
      {
        /* <div class="mt-4 sm:mt-6">
        <span class="text-sm">
          {description && (
            <details>
              <summary class="cursor-pointer">Descrição</summary>
              <div
                class="ml-2 mt-2"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </details>
          )}
        </span>
      </div> */
      }
      {/* Analytics Event */}
      <SendEventOnLoad
        event={{
          name: "view_item",
          params: {
            items: [
              mapProductToAnalyticsItem({
                product,
                breadcrumbList,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
    </>
  );
}

function Details(props: { page: ProductDetailsPage } & Props) {
  const id = useId();

  const { page: { product: { image: imagesAvailable = [] } }, layout } = props;
  const images = imagesAvailable.filter((item) =>
    item.alternateName !== "skucor" && item.name !== "hover" &&
    item.alternateName !== "ordenacao1"
  );

  const augmentedReality =
    props.page.product?.isVariantOf?.additionalProperty?.find((item) =>
      item.name === "Realidade Aumentada"
    )?.value || null;

  const {
    price = 0,
    listPrice,
  } = useOffer(props.page.product.offers);

  const discountPercentage = Math.round(
    ((listPrice! - price!) / listPrice!) * 100,
  );

  const variant = layout?.image ?? "slider";

  /**
   * Product slider variant
   *
   * Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
   * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
   * we rearrange each cell with col-start- directives
   */
  if (variant === "slider") {
    return (
      <>
        <div
          id={id}
          class="grid grid-cols-1 gap-4 sm:gap-1 sm:grid-cols-[57%_1fr] sm:grid-rows-1 sm:justify-center max-w-[1230px] mx-auto"
        >
          <div class="flex flex-col w-full md:gap-1.5">
            {/* Image Slider */}
            <div class="relative">
              {listPrice && price && listPrice > price && (
                <div
                  style={{
                    color: props.flagTextColor,
                    background: props.flagBackgroundColor,
                  }}
                  class="z-10 absolute top-0 left-0 flex py-2 px-4 items-center justify-center w-10 h-5 font-univers-next-pro-light text-xs"
                >
                  <span>-{discountPercentage}%</span>
                </div>
              )}

              <ProductImage images={images} />

              {images && images.length > 1 && (
                <>
                  <Slider.PrevButton
                    class="no-animation absolute left-2 top-1/2"
                    disabled
                  >
                    <Icon size={24} id="ChevronLeft" strokeWidth={0.8} />
                  </Slider.PrevButton>

                  <Slider.NextButton
                    class="no-animation absolute right-2 top-1/2"
                    disabled={images.length < 2}
                  >
                    <Icon size={24} id="ChevronRight" strokeWidth={0.8} />
                  </Slider.NextButton>
                </>
              )}
            </div>

            {/* Dots */}
            {images && images.length > 1 && (
              <ul
                class={`flex gap-[13px] overflow-auto sm:px-0 scrollbar-slider ${
                  images.length >= 5 ? "px-1" : "px-4"
                }`}
              >
                {images.map((img, index) => (
                  <li
                    class={`${
                      images.length >= 5 ? "min-w-[17%]" : "min-w-[63px]"
                    } sm:min-w-[130px]`}
                  >
                    <Slider.Dot index={index}>
                      <Image
                        style={{ aspectRatio: ASPECT_RATIO }}
                        class="group-disabled:border-base-300 group-disabled:border rounded"
                        width={130}
                        height={130}
                        src={img.url!}
                        alt={img.alternateName}
                      />
                    </Slider.Dot>
                  </li>
                ))}
              </ul>
            )}

            {augmentedReality && <AugmentedReality html={augmentedReality} />}
          </div>

          {/* Product Info */}
          <div class="sm:pt-0.5 px-4">
            <ProductInfo
              {...props}
              skus={props?.page?.product?.isVariantOf?.hasVariant}
            />
          </div>
        </div>
        <SliderJS rootId={id} />
      </>
    );
  }

  /**
   * Product front-back variant.
   *
   * Renders two images side by side both on mobile and on desktop. On mobile, the overflow is
   * reached causing a scrollbar to be rendered.
   */
  return (
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-[50vw_25vw] sm:grid-rows-1 sm:justify-center">
      {/* Image slider */}
      <ul class="carousel carousel-center gap-6">
        {[images[0], images[1] ?? images[0]].map((img, index) => (
          <li class="carousel-item min-w-[129vw] sm:min-w-[24vw]">
            <Image
              sizes="(max-width: 640px) 129vw, 24vw"
              style={{ aspectRatio: ASPECT_RATIO }}
              src={img.url!}
              alt={img.alternateName}
              width={WIDTH}
              height={HEIGHT}
              // Preload LCP image for better web vitals
              preload={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </li>
        ))}
      </ul>

      {/* Product Info */}
      <div class="px-4 sm:pr-0 sm:pl-6">
        <ProductInfo {...props} />
      </div>
    </div>
  );
}

function ProductDetails(
  { page, layout, flagTextColor = "#fff", flagBackgroundColor = "#1d1d1b" }:
    Props,
) {
  if (!page || !page.product) return <NotFound />;

  return (
    <section class="flex flex-col items-center gap-20 mb-6">
      <div class="mx-auto container py-0 sm:pt-[23px] sm:pb-4 font-univers-next-pro-light relative">
        {page && (
          <Details
            page={page}
            layout={layout}
            flagTextColor={flagTextColor}
            flagBackgroundColor={flagBackgroundColor}
          />
        )}
      </div>

      <ProductDescription product={page.product} />
    </section>
  );
}

export default ProductDetails;
