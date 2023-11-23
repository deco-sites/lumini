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
  const excludedKeys = ["voltagem"];
  const excludedSecondKeys = ["fixação"];
  const excludedThirdKeys = ["cabo"];

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
        .filter(([name]) => excludedSecondKeys.includes(name))
        .map(([name, links]) => {
          const selectedColor = product?.additionalProperty?.find(
            (item) => item.name === "cor" || item.name === "COR",
          )?.value || "";

          const colorLinks =
            (possibilities["cor"] || possibilities["COR"])[selectedColor] || [];

          const filteredLinks = possibilities["fixação"]
            ? Object.entries(possibilities["fixação"])
              .map(([item, itemLinks]) => ({
                item,
                commonLinks: itemLinks.filter((link) =>
                  colorLinks.includes(link)
                ),
              }))
              .filter(({ commonLinks }) => commonLinks.length > 0)
            : [];

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
                  {filteredLinks.map(
                    ({ item, commonLinks }, index) => {
                      const isChecked =
                        product?.additionalProperty?.find((item) =>
                          item.name === name
                        )
                          ?.value === item;

                      return (
                        <li key={index}>
                          <button
                            {...usePartial({ href: commonLinks[0] })}
                            title={`Change ${name}`}
                            className={`flex py-2.5 pl-3 mt-0.5 border border-dark-gray hover:bg-dark-gray hover:text-white w-full text-sm duration-200 transition-colors font-semibold ${
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

      {Object.entries(possibilities)
        .filter(([name]) => excludedKeys.includes(name))
        .map(([name, links]) => {
          const selectedColor = product?.additionalProperty?.find(
            (item) => item.name === "cor" || item.name === "COR",
          )?.value || "";

          const colorLinks =
            (possibilities["cor"] || possibilities["COR"])[selectedColor] || [];

          const filteredVoltageLinks = possibilities.voltagem
            ? Object.entries(possibilities.voltagem)
              .map(([voltage, voltageLinks]) => ({
                voltage,
                commonLinks: voltageLinks.filter((link) =>
                  colorLinks.includes(link)
                ),
              }))
              .filter(({ commonLinks }) => commonLinks.length > 0)
            : [];

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
                  {filteredVoltageLinks.map(
                    ({ voltage, commonLinks }, index) => {
                      const isChecked =
                        product?.additionalProperty?.find((item) =>
                          item.name === name
                        )
                          ?.value === voltage;

                      return (
                        <li key={index}>
                          <button
                            {...usePartial({ href: commonLinks[0] })}
                            title={`Change ${name}`}
                            className={`flex py-2.5 pl-3 mt-0.5 border border-dark-gray hover:bg-dark-gray hover:text-white w-full text-sm duration-200 transition-colors font-normal ${
                              isChecked && "bg-dark-gray text-white"
                            }`}
                          >
                            {voltage}
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

      {Object.entries(possibilities)
        .filter(([name]) => excludedThirdKeys.includes(name))
        .map(([name, links]) => {
          const selectedColor = product?.additionalProperty?.find(
            (item) => item.name === "cor" || item.name === "COR",
          )?.value || "";

          const colorLinks =
            (possibilities["cor"] || possibilities["COR"])[selectedColor] || [];

          const filteredLinks = possibilities["cabo"]
            ? Object.entries(possibilities["cabo"])
              .map(([item, itemLinks]) => ({
                item,
                commonLinks: itemLinks.filter((link) =>
                  colorLinks.includes(link)
                ),
              }))
              .filter(({ commonLinks }) => commonLinks.length > 0)
            : [];

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
                  {filteredLinks.map(
                    ({ item, commonLinks }, index) => {
                      const isChecked =
                        product?.additionalProperty?.find((item) =>
                          item.name === name
                        )
                          ?.value === item;

                      return (
                        <li key={index}>
                          <button
                            {...usePartial({ href: commonLinks[0] })}
                            title={`Change ${name}`}
                            className={`flex py-2.5 pl-3 mt-0.5 border border-dark-gray hover:bg-dark-gray hover:text-white w-full text-sm duration-200 transition-colors font-semibold ${
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

export default VariantSelector;
