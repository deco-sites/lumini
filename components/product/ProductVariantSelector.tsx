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

  const colorPossibilities = possibilities["cor"] || possibilities["COR"] || {};
  const excludedKeys = ["cor", "COR", "category", "cluster", "RefId"];

  return (
    <div class="flex flex-col gap-4 w-full lowercase">
      {colorPossibilities && Object.entries(colorPossibilities).length > 0 && (
        <ul class="flex flex-row items-center gap-2">
          {Object.entries(colorPossibilities).map(([value, link]) => {
            const partial = usePartial({ href: link });

            const variant = isVariantOf?.hasVariant?.find((item) =>
              item.url === link
            );

            const imageUrl = (variant?.image && variant?.image?.find((item) =>
              item.alternateName === "skucor"
            )?.url) ?? null;

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
      )}

      {Object.keys(possibilities).filter((name) => !excludedKeys.includes(name))
        .map((name) => (
          <ul class="flex flex-col gap-4 w-full">
            <li class="flex flex-col gap-2 w-full">
              <p class="font-univers-next-pro-light text-lg font-medium">
                {name}:{" "}
                <span class="text-lightslategray lowercase">
                  {product?.additionalProperty?.find((item) =>
                    item.name === name
                  )?.value || ""}
                </span>
              </p>
              <ul class="flex flex-col gap-3 w-full">
                {Object.entries(possibilities[name]).map(([value, link]) => {
                  const partial = usePartial({ href: link });
                  const isChecked = product?.additionalProperty?.find((item) =>
                    item.name === name
                  )?.value === value;

                  return (
                    <li>
                      <button
                        {...partial}
                        title={`Change ${name}`}
                        class={`flex py-2.5 pl-3 mt-0.5 border border-dark-gray hover:bg-dark-gray hover:text-white w-full text-sm duration-200 transition-colors font-semibold ${
                          isChecked && "bg-dark-gray text-white"
                        }`}
                      >
                        {value}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        ))}
    </div>
  );
}

export default VariantSelector;
