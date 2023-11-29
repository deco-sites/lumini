import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { AnalyticsItem, PropertyValue } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useCallback, useState } from "preact/hooks";

export interface Item {
  image: {
    src: string;
    alt: string;
  };
  name: string;
  additionalProperty?: PropertyValue[];
  quantity: number;
  price: {
    sale: number;
    list: number;
  };
}

export interface Props {
  item: Item;
  index: number;

  locale: string;
  currency: string;

  onUpdateQuantity: (quantity: number, index: number) => Promise<void>;
  itemToAnalyticsItem: (index: number) => AnalyticsItem | null | undefined;
}

function CartItem(
  {
    item,
    index,
    locale,
    currency,
    onUpdateQuantity,
    itemToAnalyticsItem,
  }: Props,
) {
  const { image, name, price: { sale, list }, quantity } = item;
  const isGift = sale < 0.01;
  const [loading, setLoading] = useState(false);

  const additionalProperty = item?.additionalProperty?.filter(
    (item) =>
      item?.name && !["category", "cluster", "RefId"].includes(item.name),
  ) ?? [];

  const withLoading = useCallback(
    <A,>(cb: (args: A) => Promise<void>) => async (e: A) => {
      try {
        setLoading(true);
        await cb(e);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return (
    <div
      class="grid grid-rows-1 gap-2 min-h-[100px]"
      style={{
        gridTemplateColumns: "auto 1fr",
      }}
    >
      <Image
        src={image?.src.replace("55-55", "72-72")}
        alt={image?.alt}
        style={{ aspectRatio: "1" }}
        width={72}
        height={72}
      />

      <div class="flex flex-col">
        <div class="flex justify-between items-center">
          <div class="flex flex-col gap-0.5">
            <span class="lowercase text-[#353535]">{name}</span>

            {additionalProperty?.map((item) => (
              <div class="flex items-center justify-start text-sm text-[#353535]">
                {item.name}: {item.value}
              </div>
            ))}
          </div>
          <Button
            aria-label="remove item"
            disabled={loading || isGift}
            loading={loading}
            class="btn-ghost btn-square hover:bg-transparent"
            onClick={withLoading(async () => {
              const analyticsItem = itemToAnalyticsItem(index);

              await onUpdateQuantity(0, index);

              analyticsItem && sendEvent({
                name: "remove_from_cart",
                params: { items: [analyticsItem] },
              });
            })}
          >
            <Icon id="Trash" size={24} />
          </Button>
        </div>
        <div class="flex items-center justify-between gap-2 w-full">
          {
            /* <span class="line-through text-base-300 text-sm">
            {formatPrice(list, currency, locale)}
          </span> */
          }
          <span class="text-sm text-[#353535]">
            {isGift ? "Grátis" : formatPrice(sale, currency, locale)}
          </span>

          <QuantitySelector
            disabled={loading || isGift}
            quantity={quantity}
            onChange={withLoading(async (quantity) => {
              const analyticsItem = itemToAnalyticsItem(index);
              const diff = quantity - item.quantity;

              await onUpdateQuantity(quantity, index);

              if (analyticsItem) {
                analyticsItem.quantity = diff;

                sendEvent({
                  name: diff < 0 ? "remove_from_cart" : "add_to_cart",
                  params: { items: [analyticsItem] },
                });
              }
            })}
          />
        </div>
      </div>
    </div>
  );
}

export default CartItem;
