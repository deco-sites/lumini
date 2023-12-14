import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useState } from "preact/hooks";

export interface Props {
  /** @description: sku name */
  name: string;
  productID: string;
  productGroupID: string;
  price: number;
  discount: number;
  onAddItem: () => void;
}

const useAddToCart = ({
  price,
  name,
  discount,
  productGroupID,
  productID,
  onAddItem,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const onClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      await onAddItem();

      sendEvent({
        name: "add_to_cart",
        params: {
          items: [{
            quantity: 1,
            price,
            item_name: name,
            discount: discount,
            item_id: productGroupID,
            item_variant: productID,
          }],
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return { onClick, loading };
};

export default function AddToCartButton(
  { ...props }: Props,
) {
  const btnProps = useAddToCart(props);

  return (
    <Button
      {...btnProps}
      data-deco="add-to-cart"
      hasBtn={false}
      class="btn-primary h-[46px] w-full lg:max-w-[420px] lowercase leading-[14px] disabled:opacity-60 disabled:cursor-not-allowed font-univers-next-pro-regular bg-darkslategray hover:bg-darkslategray/80"
    >
      adicionar ao carrinho
    </Button>
  );
}
