import Avatar from "$store/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { usePartial } from "apps/website/hooks/usePartial.ts";

interface Props {
  product: Product;
}

function VariantSelector({ product }: Props) {
  const { url, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant, product);
  // console.log(possibilities);

  const colorPossibilities = possibilities["cor"] || possibilities["COR"] || {};

  return (
    <ul class="flex flex-row items-center gap-2">
      {Object.entries(colorPossibilities).map(([value, link]) => {
        const partial = usePartial({ href: link });

        const variant = isVariantOf?.hasVariant?.find((item) =>
          item.url === link
        );

        const imageUrl = (variant?.image && variant?.image?.find((item) =>
          item.alternateName === "skucor"
        )?.url) ?? null;

        console.log(variant?.image);

        return (
          <li
            class={`${
              link === url && "border border-black"
            } w-10 h-10 cursor-pointer hover:border hover:border-black p-0.5`}
          >
            <button {...partial}>
              <img
                src={imageUrl ?? ""}
                width={40}
                height={40}
                alt="Imagem de cor"
              />
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default VariantSelector;
