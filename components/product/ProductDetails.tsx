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
import ProductImageZoom from "$store/islands/ProductImageZoom.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ProductDetailsPage, ProductLeaf } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import ProductSelector from "./ProductVariantSelector.tsx";
import ProductDescription from "./ProductDescription.tsx";
import ShareButton from "$store/components/ui/ShareButton.tsx";

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
}

const WIDTH = 360;
const HEIGHT = 360;
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
            <h1 class="font-normal font-univers-next-pro-bold leading-[29px] text-[25px] text-darkslategray lowercase">
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
              productID={productID}
              productGroupID={productGroupID}
            />

            <ShareButton />
          </div>
        </div>
      </div>

      {/* Sku Selector */}
      <div class="flex flex-col gap-2 mt-4 w-full font-univers-next-pro-light leading-[21px]">
        {additionalProperty.find((item) =>
              item.name === "cor" || item.name === "COR"
            )?.value !== undefined && (
          <p class="text-lg font-medium">
            cor:{" "}
            <span class="text-lightslategray lowercase">
              {additionalProperty.find((item) =>
                item.name === "cor" || item.name === "COR"
              )?.value || ""}
            </span>
          </p>
        )}

        <ProductSelector product={product} />
      </div>

      {/* Prices */}
      <div class="border-t border-gainsboro pt-4 mt-8">
        <div class="flex flex-col gap-2 items-start normal-case">
          {(listPrice ?? 0) > price && (
            <span class="line-through text-[#a8a8a8] leading-[16px] text-sm font-univers-next-pro-light">
              {formatPrice(listPrice, offers?.priceCurrency)}
            </span>
          )}
          <span class="font-medium font-univers-next-pro-regular text-xl text-darkslategray leading-7">
            {formatPrice(price, offers?.priceCurrency)}
          </span>
        </div>
        {installments && (
          <span class="text-sm leading-4 font-univers-next-pro-light font-normal text-gray-normal">
            em até {installments.replace(".", ",")}
          </span>
        )}
      </div>
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
                  product={product}
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
      {/* Shipping Simulation */}
      <div class="mt-8">
        {platform === "vtex" && (
          <ShippingSimulation
            items={[{
              id: Number(product.sku),
              quantity: 1,
              seller: seller,
            }]}
          />
        )}
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
    item.alternateName !== "skucor" && item.name !== "hover"
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
          class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:grid-rows-1 sm:justify-center max-w-[1250px] mx-auto"
        >
          <div class="flex flex-col w-full md:gap-1.5">
            {/* Image Slider */}
            <div class="relative">
              <Slider class="carousel carousel-center gap-6 w-screen sm:w-full">
                {images.map((img, index) => (
                  <Slider.Item
                    index={index}
                    class="carousel-item w-full"
                  >
                    <Image
                      class="w-full"
                      sizes="(max-width: 640px) 100vw, 40vw"
                      style={{ aspectRatio: ASPECT_RATIO }}
                      src={img.url!}
                      alt={img.alternateName}
                      width={WIDTH}
                      height={HEIGHT}
                      // Preload LCP image for better web vitals
                      preload={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </Slider.Item>
                ))}
              </Slider>

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

              <div class="absolute top-2 right-2">
                <ProductImageZoom
                  images={images}
                  width={700}
                  height={Math.trunc(700 * HEIGHT / WIDTH)}
                />
              </div>
            </div>

            {/* Dots */}
            <ul class="flex gap-2 overflow-auto px-4 sm:px-0">
              {images.map((img, index) => (
                <li class="min-w-[63px] sm:min-w-[100px]">
                  <Slider.Dot index={index}>
                    <Image
                      style={{ aspectRatio: ASPECT_RATIO }}
                      class="group-disabled:border-base-300 group-disabled:border rounded"
                      width={100}
                      height={100}
                      src={img.url!}
                      alt={img.alternateName}
                    />
                  </Slider.Dot>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Info */}
          <div class="px-4">
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
          <li class="carousel-item min-w-[100vw] sm:min-w-[24vw]">
            <Image
              sizes="(max-width: 640px) 100vw, 24vw"
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

function ProductDetails({ page, layout }: Props) {
  if (!page || !page.product) return <NotFound />;

  return (
    <section class="flex flex-col items-center gap-20 mb-6">
      <div class="mx-auto container py-0 sm:py-10 font-univers-next-pro-light relative">
        {page && <Details page={page} layout={layout} />}
      </div>

      <ProductDescription product={page.product} />
    </section>
  );
}

export default ProductDetails;
