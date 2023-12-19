import { useState } from "preact/compat";
import { useUI } from "$store/sdk/useUI.ts";
import type { ProductGroup } from "apps/commerce/types.ts";

export interface Props {
  isVariantOf?: ProductGroup;
  colorPossibilities: Record<string, string[]>;
  possibilities: Record<string, Record<string, string[]>>;
  excludedKeys: string[];
}

interface Variations {
  [key: string]: string | undefined;
}

export default function ProductVariations(
  { colorPossibilities, possibilities, excludedKeys, isVariantOf }: Props,
) {
  const [filteredVariations, setFilteredVariations] = useState<Variations>({});
  const { variations, isBuyButtonClicked } = useUI();

  variations.value = filteredVariations;

  return (
    <div class="flex flex-col gap-9 w-full lowercase">
      {colorPossibilities && Object.entries(colorPossibilities).length > 0 && (
        <div class="flex flex-col gap-4 w-full">
          <p
            id="cor"
            className="font-univers-next-pro-light text-lg leading-[21px] font-medium lowercase text-[#353535]"
          >
            cor:{" "}
            <span className="text-lightslategray lowercase leading-[21px]">
              {filteredVariations["cor"]}
            </span>
            {isBuyButtonClicked.value && !filteredVariations["cor"] && (
              <span class="text-[18px] leading-[21px] text-[#ff4c4c] font-medium">
                selecione uma opção
              </span>
            )}
          </p>

          <ul class="flex flex-wrap w-full items-center gap-2 max-w-[500px]">
            {Object.entries(colorPossibilities).map(([value, links]) => (
              <li
                key={value}
                class={`${
                  filteredVariations["cor"] === value && "border border-black"
                } w-10 h-10 cursor-pointer hover:border hover:border-black p-0.5`}
              >
                {links.length > 0 && (
                  <button
                    f-partial={links[0]}
                    f-client-nav
                    onClick={() =>
                      setFilteredVariations((prev) => ({
                        "cor": value,
                      }))}
                  >
                    <img
                      src={isVariantOf?.hasVariant?.find(
                        (item) => item.url === links[0],
                      )?.image?.find(
                        (item) =>
                          item.alternateName === "skucor" ||
                          item.name === "skucor",
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
        </div>
      )}

      {Object.entries(possibilities)
        .filter(([name]) => !excludedKeys.includes(name))
        .map(([name]) => {
          const filteredLinks = possibilities[name]
            ? Object.entries(possibilities[name])
              .map(([item, itemLinks]) => ({
                item,
                commonLinks: itemLinks,
              }))
              .filter(({ commonLinks }) => commonLinks.length > 0)
            : [];

          const selectedValue = filteredVariations[name];

          return (
            <ul key={name} className="flex flex-col gap-4 w-full">
              <li className="flex flex-col gap-2 w-full">
                <p
                  id={name}
                  className="font-univers-next-pro-light text-lg leading-[21px] font-medium lowercase text-[#353535]"
                >
                  {name}:{" "}
                  <span className="text-lightslategray lowercase leading-[21px]">
                    {selectedValue}
                  </span>
                  {isBuyButtonClicked.value && !filteredVariations[name] && (
                    <span class="text-[18px] leading-[21px] text-[#ff4c4c] font-medium">
                      selecione uma opção
                    </span>
                  )}
                </p>
                <ul className="flex flex-col gap-3 w-full">
                  {filteredLinks.map(
                    ({ item, commonLinks }, index) => {
                      const isChecked = filteredVariations[name] === item;

                      const isUnavailable = !isVariantOf?.hasVariant?.some(
                        (variant) => {
                          const variantProperties =
                            variant.additionalProperty || [];
                          const variantUrl = variant.url || "";
                          const isVariantInCommonLinks = commonLinks.some((
                            commonLink,
                          ) => variantUrl.includes(commonLink));

                          if (isVariantInCommonLinks) {
                            const desiredProperties = {
                              ...filteredVariations,
                              [name]: item,
                            };

                            return Object.entries(desiredProperties).every(
                              ([propertyName, propertyValue]) => {
                                const matchingProperty = variantProperties.find(
                                  (property) =>
                                    property.name === propertyName &&
                                    property.value === propertyValue,
                                );

                                return !!matchingProperty;
                              },
                            );
                          }

                          return false;
                        },
                      );

                      return (
                        <li key={index}>
                          <button
                            disabled={isUnavailable}
                            onClick={() =>
                              setFilteredVariations((prev) => ({
                                ...prev,
                                [name]: item,
                              }))}
                            title={`Change ${name}`}
                            class={`flex py-2 pl-5 lowercase mt-0.5 border border-dark-gray hover:bg-dark-gray hover:text-white w-full duration-200 transition-colors font-medium leading-[18px] font-univers-next-pro-regular disabled:opacity-50 ${
                              isChecked && "bg-dark-gray text-white"
                            }`}
                          >
                            {item}
                          </button>
                        </li>
                      );
                    },
                  )}
                </ul>
              </li>
            </ul>
          );
        })}
    </div>
  );
}
