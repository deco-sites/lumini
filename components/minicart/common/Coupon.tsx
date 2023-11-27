import { useState } from "preact/hooks";

import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";

export interface Props {
  coupon?: string;
  onAddCoupon: (text: string) => Promise<void>;
}

function Coupon({ coupon, onAddCoupon }: Props) {
  const [loading, setLoading] = useState(false);

  return (
    <div class="flex justify-between items-center px-4 mt-1 w-full">
      <form
        class="flex items-center justify-center w-full border-b border-b-black pb-0.5 h-[46px]"
        onSubmit={async (e) => {
          e.preventDefault();
          const { currentTarget: { elements } } = e;

          const input = elements.namedItem("coupon") as HTMLInputElement;
          const text = input.value;

          if (!text) return;

          try {
            setLoading(true);
            const coupon = await onAddCoupon(text);
            console.log(coupon);
          } finally {
            setLoading(false);
          }
        }}
      >
        <div class="flex justify-between items-center w-full h-full">
          <input
            class="flex w-full text-base-content bg-transparent pl-1.5 focus:outline-none h-full"
            name="coupon"
            type="text"
            value={coupon ?? ""}
            placeholder={"adicionar cupom"}
          />

          <button
            aria-label="coupon calculate"
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
        </div>
      </form>
    </div>
  );
}

export default Coupon;
