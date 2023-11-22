/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import ProductCard from "$store/components/product/ProductCard.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useSuggestions } from "$store/sdk/useSuggestions.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { Suggestion } from "apps/commerce/types.ts";
import { Resolved } from "deco/engine/core/resolver.ts";
import { useEffect, useRef } from "preact/compat";
import type { Platform } from "$store/apps/site.ts";

// Editable props
export interface Props {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default o que você está procurando?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;

  /**
   * @title Suggestions Integration
   * @todo: improve this typings ({query: string, count: number}) => Suggestions
   */
  loader: Resolved<Suggestion | null>;

  platform?: Platform;
}

function Searchbar({
  placeholder = "o que você procura?",
  action = "/s",
  name = "q",
  loader,
  platform,
}: Props) {
  const id = useId();
  const { displaySearchPopup } = useUI();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setQuery, payload, loading } = useSuggestions(loader);
  const { products = [], searches = [] } = payload.value ?? {};
  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);

  useEffect(() => {
    if (displaySearchPopup.value === true) {
      searchInputRef.current?.focus();
    }
  }, [displaySearchPopup.value]);

  return (
    <div
      class="max-w-[800px] container w-full grid gap-8 px-4 pt-10 overflow-y-hidden"
      style={{ gridTemplateRows: "min-content auto" }}
    >
      <form
        id={id}
        action={action}
        class="flex items-center justify-center gap-4"
      >
        <input
          ref={searchInputRef}
          id="search-input"
          class="border-b border-b-black/70 pb-1 h-[38px] flex-grow pl-2 focus:outline-none placeholder:text-gray-100 text-sm"
          name={name}
          onInput={(e) => {
            const value = e.currentTarget.value;

            if (value) {
              sendEvent({
                name: "search",
                params: { search_term: value },
              });
            }

            setQuery(value);
          }}
          placeholder={placeholder}
          role="combobox"
          aria-controls="search-suggestion"
          aria-label="Barra de pesquisa"
          aria-expanded={displaySearchPopup.value}
          autocomplete="off"
        />

        <button
          type="submit"
          class="flex items-center justify-center w-[170px] h-[38px] cursor-pointer border text-black hover:text-white hover:bg-darkslategray text-sm"
          aria-label="Search"
          for={id}
          tabIndex={-1}
        >
          {loading.value
            ? <span class="loading loading-spinner loading-xs" />
            : <span>pesquisar</span>}
        </button>
      </form>

      <div
        class={`${!hasProducts && !hasTerms ? "hidden" : ""}`}
      >
        <div class="gap-4 grid grid-cols-1 sm:grid-rows-1 sm:grid-cols-[190px_1fr] md:divide-x md:divide-slate-100 pb-1">
          <div class="flex flex-col gap-6">
            <span
              role="heading"
              aria-level={3}
            >
              sugestões
            </span>
            <ul id="search-suggestion" class="flex flex-col gap-6">
              {searches.map(({ term }) => (
                <li>
                  <a
                    href={`/s?q=${term}`}
                    class="flex gap-4 items-center text-sm"
                  >
                    <span>
                      <Icon
                        id="MagnifyingGlass"
                        size={24}
                        strokeWidth={0.01}
                      />
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: term }} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div class="flex flex-col pt-6 md:pt-0 gap-6 overflow-hidden pl-5">
            <span
              role="heading"
              aria-level={3}
            >
              produtos sugeridos
            </span>
            <Slider class="carousel gap-3">
              {products?.slice(0, 3)?.map((product, index) => (
                <Slider.Item
                  index={index}
                  class="carousel-item min-w-[160px] max-w-[160px]"
                >
                  <ProductCard
                    product={product}
                    platform={platform}
                    isSearchbar={true}
                    layout={{
                      hide: {
                        productDescription: true,
                        cta: false,
                        skuSelector: true,
                      },
                      basics: {
                        contentAlignment: "Center",
                        oldPriceSize: "Small",
                      },
                    }}
                  />
                </Slider.Item>
              ))}
            </Slider>
            {
              /* {products && products.length > 0 && (
              <a
                href={`/s?q=${term}`}
                class="mt-5 underline text-gray text-xs"
              >
                veja todos os {products.length} produtos
              </a>
            )} */
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
