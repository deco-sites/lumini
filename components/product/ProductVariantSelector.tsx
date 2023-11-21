import Avatar from "$store/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { usePartial } from "apps/website/hooks/usePartial.ts";

interface Props {
  product: Product;
}

function VariantSelector({ product }: Props) {
  if (!product) return null;

  const { url, isVariantOf } = product;
  const possibilities = useVariantPossibilities(product);

  const colorPossibilities = possibilities["cor"] || possibilities["COR"] || {};
  const excludedKeys = ["cor", "COR", "category", "cluster", "RefId"];

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

      {Object.entries(possibilities)
        .filter(([name]) => !excludedKeys.includes(name))
        .map(([name, links]) => {
          const selectedColor = product?.additionalProperty?.find((item) =>
            item.name === "cor"
          )?.value || product?.additionalProperty?.find((item) =>
            item.name === "COR"
          )?.value;
          "";

          const voltageLinks = name === "voltagem" && selectedColor
            ? (possibilities["cor"] || possibilities["COR"])[selectedColor] ||
              []
            : ([] as string[]);

          const getVoltageValue = (link: string) => {
            for (
              const [voltage, links] of Object.entries(possibilities.voltagem)
            ) {
              if (links.includes(link)) {
                return voltage;
              }
            }
            return ""; // ou outra lógica de fallback se o link não estiver em nenhuma chave "voltagem"
          };

          return (
            <ul key={name} className="flex flex-col gap-4 w-full">
              <li className="flex flex-col gap-2 w-full">
                <p className="font-univers-next-pro-light text-lg font-medium">
                  {name}:{" "}
                  <span className="text-lightslategray lowercase">
                    {product?.additionalProperty?.find((item) =>
                      item.name === name
                    )
                      ?.value || ""}
                  </span>
                </p>
                <ul className="flex flex-col gap-3 w-full">
                  {voltageLinks.map((link, index) => {
                    const partial = usePartial({ href: link });
                    const isChecked =
                      product?.additionalProperty?.find((item) =>
                        item.name === name
                      )
                        ?.value === getVoltageValue(link);

                    return (
                      <li key={index}>
                        <button
                          {...partial}
                          title={`Change ${name}`}
                          className={`flex py-2.5 pl-3 mt-0.5 border border-dark-gray hover:bg-dark-gray hover:text-white w-full text-sm duration-200 transition-colors font-semibold ${
                            isChecked && "bg-dark-gray text-white"
                          }`}
                        >
                          {getVoltageValue(link)}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          );
        })}
    </div>
  );
}

export default VariantSelector;
