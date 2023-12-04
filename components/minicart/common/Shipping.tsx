import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";

import { useState } from "preact/hooks";
import { useCart } from "apps/vtex/hooks/useCart.ts";

interface Props {
  shippingValue: number | null;
  setShippingValue: (value: number | null) => void;
}

function Shipping({ shippingValue, setShippingValue }: Props) {
  const { simulate, cart } = useCart();
  const { items } = cart.value ?? { items: [] };
  const [loading, setLoading] = useState(false);
  const [cep, setCep] = useState("");

  function removeShippingValue() {
    setShippingValue(null);
    setCep("");
  }

  return (
    <div class="flex justify-between items-center px-4 mt-1 w-full">
      <form
        class="flex items-center justify-center w-full border-b border-b-black pb-0.5 h-[46px]"
        onSubmit={async (e) => {
          e.preventDefault();

          const text = cep;
          if (!text || cep === "") return;

          try {
            setLoading(true);

            const shippingValue = await simulate({
              items: items.map((item) => ({
                id: Number(item.id),
                quantity: item.quantity,
                seller: item.seller,
              })),
              postalCode: text,
              country: "BRA",
            });

            const methods = shippingValue.logisticsInfo?.reduce(
              (initial, { slas }) => {
                const price = slas.length > 0 ? slas[0].price : 0;
                return [...initial, price];
              },
              [] as number[],
            ) ?? [];

            const totalShippingPrice = methods.reduce(
              (sum, price) => sum + price,
              0,
            );

            setShippingValue(totalShippingPrice);
          } finally {
            setLoading(false);
          }
        }}
      >
        <div class="flex justify-between items-center w-full h-full">
          <input
            class="flex w-full text-base-content bg-transparent pl-1.5 focus:outline-none h-full"
            name="shipping"
            type="text"
            maxLength={9}
            value={cep}
            autocomplete="off"
            onChange={(e) => {
              if (e.target instanceof HTMLInputElement) {
                const newValue = e.target.value;
                const value = newValue.replace("-", "");
                setCep(value);
              }
            }}
            placeholder={"adicione o seu frete"}
          />

          {shippingValue === null
            ? (
              <button
                aria-label="shipping calculate"
                type="submit"
                class="disabled:loading pr-1.5 h-full"
                disabled={loading}
              >
                <img
                  alt="right arrow image"
                  width={24}
                  height={24}
                  loading="lazy"
                  src="https://tezexb.vtexassets.com/assets/vtex/assets-builder/tezexb.lumini-store-theme/1.9.3/svg/hpa-newsletter-row___ef97774d74950b40c21bc4b0ba8ffec1.svg"
                />
              </button>
            )
            : (
              <button
                aria-label="remove shipping value"
                type="button"
                onClick={removeShippingValue}
                class="disabled:loading pr-1.5 h-full"
                disabled={loading}
              >
                <Icon id="XMark" size={24} strokeWidth={1} loading="lazy" />
              </button>
            )}
        </div>
      </form>
    </div>
  );
}

export default Shipping;
