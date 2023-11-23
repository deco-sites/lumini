import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx"
import { useState } from "preact/compat";

export interface Props extends Omit<BtnProps, "onAddItem" | "platform"> {
  seller: string;
}

function AddToCartButton(props: Props) {
  const [quantity, setQuantity] = useState(1);
  const { addItems } = useCart();
  const onAddItem = () =>
    addItems({
      orderItems: [{
        id: props.productID,
        seller: props.seller,
        quantity: quantity,
      }],
    });

    return (
      <div class="flex w-full h-full gap-10">
        <QuantitySelector  
           quantity={quantity}
           onChange={setQuantity}
           isPdp
        />
        <Button onAddItem={onAddItem} {...props} />
      </div>
      )
      
}

export default AddToCartButton;
