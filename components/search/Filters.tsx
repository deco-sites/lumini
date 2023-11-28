import Avatar from "$store/components/ui/Avatar.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <a href={url} class="flex items-center gap-2">
      <div aria-checked={selected} class="checkbox" />
      <span class="text-sm">{label}</span>
      {/* {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>} */}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = "flex-col";

  return (
    <div class={`flex flex-wrap gap-2 ${flexDirection}`}>
      {values.map((item) => {
        if (key === "cor" || key === "tamanho") {
          return (
            <ValueItem
              {...item}
            />
          );
        }

        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
            />
          );
        }

        return <ValueItem {...item} />;
      })}
    </div>
  );
}

function Filters({ filters }: Props) {
  const definitiveFilters = filters.filter((filter) => filter.key !== "price");

  return (
    <div class="flex flex-col gap-2 lowercase">
      {definitiveFilters
        .filter(isToggle)
        .map((filter) => (
          <div class="flex flex-col gap-4 border-b border-base-200">
            <div class="collapse collapse-arrow rounded-none">
              <input
                type="checkbox"
                name="pdc-filters"
                class="min-h-[0px]"
                aria-label="Filtros"
                checked={filter.values.some((item) => item.selected === true)}
              />
              <div class="collapse-title flex justify-between cursor-pointer min-h-[0px] pl-2">
                <span class="flex content-center flex-wrap h-9">
                  {filter.label}
                </span>
              </div>
              <div class="collapse-content transition-all duration-700 pt-1 max-h-[255px] overflow-auto pl-2">
                <FilterValues {...filter} />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Filters;
