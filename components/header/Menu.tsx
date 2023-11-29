import { lazy } from "preact/compat";

import Icon from "$store/components/ui/Icon.tsx";

import type { SiteNavigationElement } from "apps/commerce/types.ts";
import type { Props as SearchbarProps } from "$store/components/search/MobileSearchbar.tsx";

const Searchbar = lazy(() =>
  import("$store/components/search/MobileSearchbar.tsx")
);

export interface Props {
  items: SiteNavigationElement[];
  searchbar?: SearchbarProps & { isMobile?: boolean };
}

function MenuItem({ item }: { item: SiteNavigationElement }) {
  const component = item?.children?.length
    ? (
      <div class="collapse collapse-plus relative items-start">
        <input
          type="checkbox"
          class="absolute left-0 w-full top-0"
        />
        <div class="collapse-title min-h-0 p-0 py-2.5 font-normal text-xl px-0 flex items-center justify-between text-[#333]">
          {item.name}
        </div>
        <div class="collapse-content px-0">
          <div class="pt-0 px-0">
            {item.children?.map(({ children }) => (
              <ul class="border-l-2 border-solid border-l-gold pl-5 gap-1.5">
                <li>
                  <a
                    href={item.url}
                    class="w-full block font-normal text-base text-[#333]"
                  >
                    {item.name}
                  </a>
                </li>
                {children?.map((child) => (
                  <>
                    <li>
                      <a
                        href={child.url}
                        class="w-full block font-normal text-base text-[#333]"
                      >
                        {child.name}
                      </a>
                    </li>
                  </>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    )
    : (
      <a
        href={item.url}
        title={item.name}
        class="w-full block py-2.5 font-normal text-lg"
      >
        {item.name}
      </a>
    );

  return component;
}

function Menu({ items, searchbar }: Props) {
  return (
    <div class="flex flex-col h-full font-univers-next-pro-light">
      {searchbar && (
        <div class="px-6 pt-6 pb-4">
          <Searchbar {...searchbar} />
        </div>
      )}

      <ul class="px-6 pt-3 flex-grow flex flex-col">
        {items.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}

        <li>
          <MenuItem
            item={{
              "@type": "SiteNavigationElement",
              name: "atendimento",
              url: "/contato",
            }}
          />
        </li>
      </ul>

      <ul class="flex flex-col py-5 bg-ice-cube border-t border-t-[#efefef]">
        <li>
          <a
            class="flex items-center gap-4 px-6 py-4"
            href="/login"
          >
            <Icon id="User" size={24} strokeWidth={2} />
            <p class="flex flex-col text-sm">
              <span>minha conta</span>
              <a href="/account" class="underline">entrar ou criar conta</a>
            </p>
          </a>
        </li>

        <li>
          <a
            class="flex items-center gap-4 px-6 py-4"
            href="/wishlist"
          >
            <Icon id="Heart" size={24} strokeWidth={2} fill="none" />
            <span class="text-sm">favoritos</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
