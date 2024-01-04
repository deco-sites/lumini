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
import { useEffect, useRef, useState } from "preact/compat";
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
  const modal = useRef<HTMLDivElement>(null);
  const { setQuery, payload, loading } = useSuggestions(loader);
  const { products = [], searches = [] } = payload.value ?? {};
  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);
  const [term, setTerm] = useState("");
  const newSuggestions = payload.value?.products?.[0]?.category;
  const [...newTerms] = newSuggestions?.split(">") ?? [];

  const filteredProducts = products?.filter((filteredItem) => {
    if (term && filteredItem?.isVariantOf?.name) {
      const termLowerCase = term.toLowerCase();
      const itemNameLowerCase = filteredItem.isVariantOf.name.toLowerCase();
      return itemNameLowerCase.includes(termLowerCase);
    } else {
      return true;
    }
  });

  const productsToDisplay = filteredProducts.length > 0
    ? filteredProducts
    : products;

  useEffect(() => {
    if (displaySearchPopup.value === true) {
      searchInputRef.current?.focus();
    }

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;

      if (
        modal.current &&
        !modal.current.contains(target) &&
        (searchInputRef.current !== target as HTMLInputElement) &&
        !target.closest('[aria-label="Search"]')
      ) {
        displaySearchPopup.value = false;
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [displaySearchPopup.value, modal]);

  return (
    <div
      class="w-full grid overflow-y-hidden"
      style={{ gridTemplateRows: "min-content auto" }}
    >
      <form
        id={id}
        action={action}
        class="flex items-center justify-center w-full pt-10 pb-2 bg-base-100"
      >
        <div class="flex items-center justify-center gap-4 max-w-[800px] container">
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
              setTerm(value);
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
        </div>
      </form>

      <div
        ref={modal}
        class={`${
          !hasProducts && !hasTerms ? "hidden" : ""
        } max-w-[800px] container bg-base-100 pt-4 h-[500px] shadow-lg`}
      >
        <div class="gap-5 grid grid-cols-1 sm:grid-rows-1 sm:grid-cols-[190px_1fr] md:divide-x md:divide-slate-100 pb-1 pr-3">
          <div class="flex flex-col gap-3">
            <span
              role="heading"
              aria-level={3}
              class="pl-3"
            >
              {searches && searches.length > 0 ? "sugestões" : "sem sugestões"}
            </span>

            <span class="pl-3 font-bold text-sm">
              {term ?? ""}
            </span>

            <ul id="first-search-suggestion" class="flex flex-col gap-1 pl-6">
              {newTerms?.map((term) => (
                <li>
                  <a
                    href={`/s?q=${term}`}
                    class="flex gap-2 items-center text-sm hover:bg-gray/20 py-1.5"
                    onMouseEnter={() => {
                      setTerm(term);
                    }}
                  >
                    {
                      /* <Icon
                      id="MagnifyingGlass"
                      size={24}
                      strokeWidth={1}
                      loading="lazy"
                    /> */
                    }
                    <span dangerouslySetInnerHTML={{ __html: term }} />
                  </a>
                </li>
              ))}
            </ul>
            <ul id="search-suggestion" class="flex flex-col gap-1">
              {searches.map(({ term: search }) => (
                <li>
                  <a
                    href={`/s?q=${search}`}
                    class="flex gap-2 items-center text-sm hover:bg-gray/20 py-1.5 pl-3"
                    onMouseEnter={() => {
                      if (term && term.length > 1) {
                        setTerm(search);
                      }
                    }}
                  >
                    {
                      /* <Icon
                      id="MagnifyingGlass"
                      size={24}
                      strokeWidth={1}
                      loading="lazy"
                    /> */
                    }
                    <span dangerouslySetInnerHTML={{ __html: search }} />
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
              {term ? `produtos para ${term}` : "produtos sugeridos"}
            </span>
            {loading.value
              ? (
                <div class="flex items-center justify-center mt-16">
                  <span class="loading loading-spinner loading-lg" />
                </div>
              )
              : (
                <>
                  <Slider class="carousel gap-3">
                    {productsToDisplay?.slice(0, 3)?.map((product, index) => (
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
                              installments: true,
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
                  {hasProducts && products && products.length > 0 && (
                    <a
                      href={`/s?q=${term}`}
                      class="flex items-center justify-center mt-10 pb-1 underline text-[#777] text-sm"
                    >
                      veja todos os {products.length} produtos
                    </a>
                  )}
                </>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
