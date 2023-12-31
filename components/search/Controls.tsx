import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";

export type Props =
  & Pick<ProductListingPage, "filters" | "sortOptions">
  & {
    displayFilter?: boolean;
    isUniqueModeActive?: boolean;
    isListModeActive?: boolean;
    productsQuantity?: number;
  };

function SearchControls(
  {
    filters,
    displayFilter,
    sortOptions,
    productsQuantity,
    isUniqueModeActive,
    isListModeActive,
  }: Props,
) {
  const open = useSignal(false);

  return (
    <Drawer
      loading="lazy"
      open={open.value}
      onClose={() => open.value = false}
      aside={
        <>
          <div class="bg-base-100 flex flex-col w-[85%] lg:w-1/4 h-full divide-y divide-base-200 py-7 px-4 lg:px-9 overflow-auto">
            <div class="flex justify-between items-center pl-1.5 pr-3 pb-4">
              <h1>
                <span class="text-black font-univers-next-pro-regular text-[25px]">
                  filtrar por
                </span>
              </h1>
              <button onClick={() => open.value = false}>
                <Icon id="XMark" size={24} strokeWidth={1} />
              </button>
            </div>
            <div class="flex-grow">
              <Filters filters={filters} />
            </div>
          </div>
        </>
      }
    >
      <div class="flex flex-col sm:flex-row justify-between mb-4 sm:mt-2 sm:mb-0 sm:gap-4 sm:h-[53px] font-univers-next-pro-light">
        <div class="flex flex-row items-center gap-6 lg:gap-24 justify-between pb-3 lg:pb-0">
          {displayFilter && (
            <button
              class={`${
                !displayFilter && "sm:hidden"
              } flex items-center gap-1.5`}
              onClick={() => {
                open.value = true;
              }}
            >
              filtrar por
              <Icon id="FilterList" width={16} height={16} />
            </button>
          )}

          <p class="flex items-center gap-1 text-sm md:text-[16px]">
            <span>produtos encontrados:</span>
            <span class="text-sm md:text-[18px]">{productsQuantity}</span>
          </p>
        </div>

        <div class="flex flex-row items-center justify-between sm:gap-[4rem] lg:gap-[5.5rem]">
          <div class="flex lg:hidden items-center gap-4">
            <a
              aria-label="change elements to grid position"
              href="?unique"
              class="flex items-center gap-1.5 hover:cursor-pointer"
            >
              {Array(1).fill("").map((_) => (
                <div
                  class={`${
                    isUniqueModeActive && "bg-black"
                  } border border-black w-4 h-4`}
                />
              ))}
            </a>

            <a
              aria-label="change elements to list position"
              href="?list"
              class="flex items-center gap-1.5 hover:cursor-pointer"
            >
              {Array(2).fill("").map((_) => (
                <div
                  class={`${
                    !isUniqueModeActive && "bg-black"
                  } border border-black w-4 h-4`}
                />
              ))}
            </a>
          </div>

          <div class="hidden lg:flex items-center gap-4">
            <a
              aria-label="change elements to grid position"
              href="?grid"
              class="flex items-center gap-1.5 hover:cursor-pointer"
            >
              {Array(3).fill("").map((_) => (
                <div
                  class={`${
                    !isListModeActive && "bg-black"
                  } border border-black w-5 h-5`}
                />
              ))}
            </a>

            <a
              aria-label="change elements to list position"
              href="?list"
              class="flex items-center gap-1.5 hover:cursor-pointer"
            >
              {Array(4).fill("").map((_) => (
                <div
                  class={`${
                    isListModeActive && "bg-black"
                  } border border-black w-5 h-5`}
                />
              ))}
            </a>
          </div>

          {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
        </div>
      </div>
    </Drawer>
  );
}

export default SearchControls;
