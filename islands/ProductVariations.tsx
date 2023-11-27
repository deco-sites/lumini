import { useState } from "preact/compat";
import { useUI } from "$store/sdk/useUI.ts";

export interface Props {
  possibilities: Record<string, Record<string, string[]>>;
  excludedKeys: string[];
}

interface Variations {
  [key: string]: string | undefined;
}

export default function ProductVariations(
  { possibilities, excludedKeys }: Props,
) {
  const [filteredVariations, setFilteredVariations] = useState<Variations>({});
  const { variations } = useUI();

  variations.value = filteredVariations;

  return (
    <>
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
                <p className="font-univers-next-pro-light text-lg font-medium lowercase">
                  {name}:{" "}
                  <span className="text-lightslategray lowercase">
                    {selectedValue}
                  </span>
                </p>
                <ul className="flex flex-col gap-3 w-full">
                  {filteredLinks.map(
                    ({ item }, index) => {
                      const isChecked = filteredVariations[name] === item;

                      return (
                        <li key={index}>
                          <button
                            onClick={() =>
                              setFilteredVariations((prev) => ({
                                ...prev,
                                [name]: item,
                              }))}
                            title={`Change ${name}`}
                            class={`flex py-2.5 pl-5 lowercase mt-0.5 border border-dark-gray hover:bg-dark-gray hover:text-white w-full text-sm duration-200 transition-colors font-medium font-univers-next-pro-regular ${
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
    </>
  );
}
