import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import { useState } from "preact/compat";
import type { ProductLeaf } from "apps/commerce/types.ts";
import { useUI } from "$store/sdk/useUI.ts";
import ShippingSimulation from "$store/components/ui/ShippingSimulation.tsx";

export interface Props extends Omit<BtnProps, "onAddItem" | "platform"> {
  seller: string;
  products?: ProductLeaf[];
}

function AddToCartButton(props: Props) {
  const { variations, isBuyButtonClicked, displayCart } = useUI();
  const { addItems } = useCart();
  const [quantity, setQuantity] = useState(1);

  const desiredProperties = { ...variations.value };
  const filteredProducts = props?.products?.filter(filterProducts);

  function filterProducts(product: ProductLeaf) {
    const additionalProperties = product.additionalProperty || [];
    return Object.entries(desiredProperties).every(([propName, propValue]) =>
      additionalProperties.some((prop) =>
        prop.name === propName && prop.value === propValue
      )
    );
  }

  function getAvailability(filteredProduct: ProductLeaf | undefined) {
    if (!filteredProduct) return false;

    const { additionalProperty, offers } = filteredProduct;
    const inventoryLevel = offers?.offers[0]?.inventoryLevel?.value;

    return inventoryLevel !== 1000000 &&
      additionalProperty?.some((item) => item.value === "pronta-entrega");
  }

  const isAvailable = filteredProducts?.length === 1 &&
    getAvailability(filteredProducts[0]);

  function onAddItem() {
    if (!filteredProducts || filteredProducts.length !== 1) {
      isBuyButtonClicked.value = true;
    } else {
      const [product] = filteredProducts;
      addItems({
        orderItems: [{
          id: product?.productID || "0",
          seller: props.seller,
          quantity,
        }],
      });
      displayCart.value = true;
    }
  }

  return (
    <>
      <div class="flex w-full h-full gap-4 lg:gap-10">
        <QuantitySelector quantity={quantity} onChange={setQuantity} isPdp />

        <div class="flex w-full h-full relative">
          {(!filteredProducts || filteredProducts.length !== 1) &&
            isBuyButtonClicked.value && (
            <div class="z-[1] menu p-2 shadow bg-white rounded-[2px] w-full md:w-[238px] absolute -translate-y-16">
              por favor, selecione uma opção de cada variação.
            </div>
          )}

          <Button onAddItem={onAddItem} {...props} />
        </div>
      </div>

      <div class="flex flex-col w-full border-b border-gainsboro pb-4">
        <span class="text-lightslategray text-sm">
          os preços podem variar de acordo com as características escolhidas do
          produto.
        </span>

        {filteredProducts?.length === 1 && (
          <div class="text-xl text-[#585959] font-univers-next-pro-regular my-4 lowercase">
            <span class="leading-[23px]">
              {isAvailable
                ? "pronta entrega"
                : "tempo de produção: 37 dias úteis"}
            </span>
          </div>
        )}
      </div>

      {/* Shipping Simulation */}
      <div class="mt-8">
        <ShippingSimulation
          items={[{
            id: Number(filteredProducts?.[0]?.sku),
            quantity,
            seller: props.seller,
          }]}
        />
      </div>
    </>
  );
}

export default AddToCartButton;
