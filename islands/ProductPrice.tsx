import { formatPrice } from "$store/sdk/format.ts";
import { useUI } from "$store/sdk/useUI.ts";
import type { ProductLeaf } from "apps/commerce/types.ts";

export interface Props {
  listPrice?: number | null;
  price?: number | null;
  installments?: string | null;
  priceCurrency?: string;
  products?: ProductLeaf[];
}

export default function ProductPrice(
  { listPrice, price, installments, priceCurrency, products }: Props,
) {
  const priceVariations = products?.map((item) => item?.offers?.highPrice);
  const hasVariation = priceVariations?.every((item) => item === price);

  const { variations } = useUI();

  const desiredProperties = {
    ...variations.value,
  };

  const filteredProducts = products?.filter(
    (product) => {
      const additionalProperties = product.additionalProperty || [];

      return Object.entries(desiredProperties).every(
        ([propertyName, propertyValue]) => {
          if (propertyName in desiredProperties) {
            const matchingProperty = additionalProperties.find(
              (property) =>
                property.name === propertyName &&
                property.value === propertyValue,
            );

            return !!matchingProperty;
          }

          return false;
        },
      );
    },
  );

  const definitivePrice = filteredProducts && filteredProducts.length === 1 &&
    filteredProducts[0].offers?.highPrice;

  const {
    billingDuration: installmentsBillingDuration,
    billingIncrement: installmentsBillingIncrement,
  } = (filteredProducts && filteredProducts.length === 1 &&
      filteredProducts[0].offers?.offers[0].priceSpecification || [])
    .filter((item) => item.billingDuration !== undefined)
    .sort((a, b) => (b.billingDuration || 0) - (a.billingDuration || 0))
    .map(({ billingDuration, billingIncrement }) => ({
      billingDuration,
      billingIncrement,
    }))[0] || {};

  return (
    <div class="border-t border-gainsboro pt-4 mt-8">
      <div class="flex flex-col gap-2 items-start normal-case">
        {listPrice && price && (listPrice ?? 0) > price && (
          <span class="line-through text-[#a8a8a8] leading-[16px] text-sm font-univers-next-pro-light">
            {formatPrice(listPrice, priceCurrency)}
          </span>
        )}

        {price && (
          <div class="font-normal font-univers-next-pro-regular text-2xl text-darkslategray leading-7">
            {!hasVariation && !definitivePrice && <span>a partir de</span>}
            {"  "}
            <span>{formatPrice(definitivePrice || price, priceCurrency)}</span>
          </div>
        )}
      </div>

      {!installmentsBillingIncrement && installments && (
        <span class="text-sm leading-4 font-univers-next-pro-light font-normal text-gray-normal">
          em até {installments.replace(".", ",")}
        </span>
      )}

      {installmentsBillingDuration && installmentsBillingIncrement && (
        <span class="text-sm leading-4 font-univers-next-pro-light font-normal text-gray-normal">
          {`em até ${installmentsBillingDuration}x de R$${
            installmentsBillingIncrement.toString().replace(".", ",")
          } sem juros`}
        </span>
      )}
    </div>
  );
}
