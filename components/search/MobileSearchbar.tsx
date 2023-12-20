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

import Icon from "$store/components/ui/Icon.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import Image from "apps/website/components/Image.tsx";
import { useAutocomplete } from "apps/vtex/hooks/useAutocomplete.ts";
import { useEffect, useRef, useState } from "preact/compat";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { useId } from "$store/sdk/useId.ts";

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
   * TODO: Receive querystring from parameter in the server-side
   */
  query?: string;
}

function Searchbar({
  placeholder = "o que você procura?",
  action = "/s",
  name = "q",
  query,
}: Props) {
  const id = useId();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const modal = useRef<HTMLDivElement>(null);

  const { setSearch, suggestions, loading } = useAutocomplete();
  const { products = [], searches = [] } = suggestions.value ?? {};

  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);
  const notFound = !hasProducts && !hasTerms &&
    (searchInputRef.current && searchInputRef.current.value.length > 0);

  const searchTerm = searchInputRef.current ? searchInputRef.current.value : "";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modal.current && !modal.current.contains(event.target as HTMLElement) &&
        (searchInputRef.current !== event.target as HTMLInputElement)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modal, searchTerm]);

  return (
    <div class="flex-grow flex flex-col relative z-[70]">
      <form
        id={id}
        action={action}
        class="flex flex-grow relative h-[40px] px-0 border-b"
      >
        <input
          ref={searchInputRef}
          id={useId()}
          class="flex-grow w-[80%] outline-none placeholder-shown:sibling:hidden placeholder:text-sm placeholder:text-[#333]"
          aria-label="Barra de pesquisa"
          aria-expanded={showSuggestions ? "true" : "false"}
          name={name}
          defaultValue={query}
          onClick={() => setShowSuggestions(true)}
          onFocus={() => setShowSuggestions(true)}
          onInput={(e) => {
            setShowSuggestions(true);
            const value = e.currentTarget.value;

            if (value) {
              sendEvent({
                name: "search",
                params: { search_term: value },
              });
            }

            setSearch(value);
          }}
          placeholder={"o que você procura?"}
          role="combobox"
          aria-controls="search-suggestion"
          autocomplete="off"
        />
        {
          /* <button
          onClick={() => {
            setShowSuggestions(false);
          }}
        >
          <Icon id="XMark" size={16} strokeWidth={2} class="text-dark-pink" />
        </button> */
        }
        <button
          type="submit"
          class="btn-ghost bg-transparent border-none"
          aria-label="Search"
          for={id}
        >
          {loading.value
            ? <span class="loading loading-spinner loading-xs" />
            : (
              <Icon
                id="MagnifyingGlass"
                size={24}
                strokeWidth={1}
                loading="lazy"
              />
            )}
        </button>
      </form>

      {showSuggestions && (
        <div
          ref={modal}
          class="flex flex-col w-full gap-6 divide-y-2 absolute flex-grow top-10 px-[15px] pt-2 rounded-md max-h-[375px] bg-white overflow-y-auto z-[9999999]"
        >
          {notFound
            ? (
              <span
                class="font-bold lowercase py-2"
                role="heading"
                aria-level={3}
              >
                Sem sugestões
              </span>
            )
            : (
              <>
                <div
                  class={hasProducts
                    ? "flex flex-col pt-6 pb-1 md:pt-0 gap-6"
                    : "hidden"}
                >
                  <span
                    class="font-bold lowercase"
                    role="heading"
                    aria-level={3}
                  >
                    Produtos para {searchInputRef.current?.value}
                  </span>
                  <div class="flex flex-col gap-2.5 w-full">
                    {products?.slice(0, 3)?.map((product) => {
                      const [front] = product?.image?.filter((item) =>
                        item.alternateName !== "skucor"
                      ) ?? [];
                      const { price } = useOffer(product.offers);

                      const relative = (url: string) => {
                        const link = new URL(url);
                        return `${link.pathname}${link.search}`;
                      };

                      return (
                        <a
                          href={product.url && relative(product.url)}
                          class="flex w-full h-full gap-3"
                        >
                          <Image
                            src={front.url!}
                            alt={front.alternateName}
                            width={48}
                            height={48}
                            preload={false}
                            loading="lazy"
                            decoding="async"
                          />

                          <div class="flex flex-col gap-0">
                            <h2
                              class="truncate text-base lg:text-lg text-black lowercase"
                              dangerouslySetInnerHTML={{
                                __html: product?.isVariantOf?.name ?? name ??
                                  "",
                              }}
                            />

                            <span class="text-sm">
                              {formatPrice(
                                price,
                                product.offers?.priceCurrency,
                              )}
                            </span>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                  <a
                    href={`/s?q=${searchInputRef.current?.value}`}
                    class="text-black text-center underline py-3"
                  >
                    ver todos os produtos
                  </a>
                </div>
              </>
            )}
        </div>
      )}
    </div>
  );
}

export default Searchbar;
