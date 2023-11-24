import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { usePartial } from "apps/website/hooks/usePartial.ts";
import ProductVariations from "$store/islands/ProductVariations.tsx";

interface Props {
  product: Product;
}

function VariantSelector({ product }: Props) {
  if (!product) return null;

  const { url, isVariantOf } = product;
  const possibilities = useVariantPossibilities(product);

  const colorPossibilities = possibilities["cor"] || possibilities["COR"] || {};
  const excludedKeys = [
    "cor",
    "COR",
    "category",
    "cluster",
    "RefId",
  ];

  return (
    <div class="flex flex-col gap-4 w-full lowercase">
      {colorPossibilities && Object.entries(colorPossibilities).length > 0 && (
        <ul className="flex flex-row items-center gap-2">
          {Object.entries(colorPossibilities).map(([value, links]) => (
            <li
              key={value}
              className={`${
                links[0] === url && "border border-black"
              } w-10 h-10 cursor-pointer hover:border hover:border-black p-0.5`}
            >
              {links.length > 0 && (
                <button {...usePartial({ href: links[0] })}>
                  <img
                    src={isVariantOf?.hasVariant?.find(
                      (item) => item.url === links[0],
                    )?.image?.find(
                      (item) => item.alternateName === "skucor",
                    )?.url ?? ""}
                    width={40}
                    height={40}
                    alt={`Imagem de ${value}`}
                  />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      <ProductVariations
        possibilities={possibilities}
        excludedKeys={excludedKeys}
      />
    </div>
  );
}

export default VariantSelector;
