import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import { useState } from "preact/compat";
import type { Product, ProductLeaf } from "apps/commerce/types.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { useOffer } from "$store/sdk/useOffer.ts";

export interface Props extends Omit<BtnProps, "onAddItem" | "platform"> {
  seller: string;
  products?: ProductLeaf[];
}

function AddToCartButton(props: Props) {
  const { variations, isBuyButtonClicked, displayCart } = useUI();

  const desiredProperties = {
    ...variations.value,
  };

  const filteredProducts = props?.products?.filter(
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

  function getAvailability(filteredProduct: ProductLeaf | undefined) {
    if (!filteredProduct) return;

    const additionalProperties = filteredProduct.additionalProperty || [];
    const inventoryLevel = filteredProduct.offers?.offers[0].inventoryLevel
      .value;

    if (inventoryLevel == 1000000) return false;

    if (
      additionalProperties.find((item) => item.value === "pronta-entrega") &&
      inventoryLevel != 1000000
    ) {
      return true;
    }

    return false;
  }

  const isAvailable = filteredProducts && filteredProducts.length === 1 &&
    getAvailability(filteredProducts[0]);

  const [quantity, setQuantity] = useState(1);

  const { addItems } = useCart();

  function onAddItem() {
    if (
      !filteredProducts || (filteredProducts && filteredProducts.length !== 1)
    ) {
      isBuyButtonClicked.value = true;

      return;
    } else {
      addItems({
        orderItems: [{
          id: (filteredProducts && filteredProducts[0]!.productID) || "0",
          seller: props.seller,
          quantity: quantity,
        }],
      });

      displayCart.value = true;
    }
  }

  return (
    <>
      <div class="flex w-full h-full gap-4 lg:gap-10">
        <QuantitySelector
          quantity={quantity}
          onChange={setQuantity}
          isPdp
        />
        <Button
          onAddItem={onAddItem}
          {...props}
        />
      </div>

      <div class="flex flex-col w-full border-b border-gainsboro pb-4">
        <span class="text-lightslategray text-sm">
          os preços podem variar de acordo com as características escolhidas do
          produto.
        </span>

        {filteredProducts && filteredProducts.length === 1 && (
          <div class="text-xl text-[#585959] font-univers-next-pro-regular my-4">
            <span class="leading-[23px]">
              {isAvailable
                ? "pronta entrega"
                : "tempo de produção: 37 dias úteis"}
            </span>
          </div>
        )}
      </div>
    </>
  );
}

export default AddToCartButton;
