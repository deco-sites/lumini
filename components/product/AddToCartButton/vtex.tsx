import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import { useState } from "preact/compat";
import type { Product } from "apps/commerce/types.ts";
import { useUI } from "$store/sdk/useUI.ts";

export interface Props extends Omit<BtnProps, "onAddItem" | "platform"> {
  seller: string;
  product: Product;
}

function AddToCartButton(props: Props) {
  const { variations } = useUI();

  const desiredProperties = {
    ...variations.value,
    cor: props?.product?.additionalProperty?.[0]?.value,
  };

  const filteredProducts = props?.product?.isVariantOf?.hasVariant?.filter(
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

  const [quantity, setQuantity] = useState(1);

  const { addItems } = useCart();
  const onAddItem = () =>
    addItems({
      orderItems: [{
        id: (filteredProducts && filteredProducts[0]!.productID) || "0",
        seller: props.seller,
        quantity: quantity,
      }],
    });

  return (
    <>
      <div class="flex w-full h-full gap-4 lg:gap-10">
        <QuantitySelector
          quantity={quantity}
          onChange={setQuantity}
          isPdp
        />
        <Button
          disabled={!filteredProducts ||
            (filteredProducts && filteredProducts.length !== 1)}
          onAddItem={onAddItem}
          {...props}
        />
      </div>

      <div class="flex flex-col w-full border-b border-gainsboro pb-2">
        <span class="text-lightslategray text-sm">
          os preços podem variar de acordo com as características escolhidas do
          produto.
        </span>

        {filteredProducts && filteredProducts.length === 1 && (
          <div class="font-medium text-xl text-black mt-4">
            <span>tempo de produção: 37 dias</span>
          </div>
        )}
      </div>
    </>
  );
}

export default AddToCartButton;
