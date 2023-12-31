import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { MenuButton, SearchButton } from "$store/islands/Header/Buttons.tsx";
import CartButtonLinx from "$store/islands/Header/Cart/linx.tsx";
import CartButtonShopify from "$store/islands/Header/Cart/shopify.tsx";
import CartButtonVDNA from "$store/islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import CartButtonWake from "$store/islands/Header/Cart/wake.tsx";
import Searchbar from "$store/islands/Header/Searchbar.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import NavItem from "./NavItem.tsx";
import LoginElement from "$store/islands/LoginElement.tsx";
import { navbarHeight } from "./constants.ts";

function Navbar({ items, searchbar, logo }: {
  items: SiteNavigationElement[];
  searchbar?: SearchbarProps;
  logo?: { src: string; alt: string };
}) {
  const platform = usePlatform();

  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="md:hidden flex flex-row justify-between items-center border-b border-base-200 w-full pl-2 pr-6 gap-2"
      >
        <MenuButton />

        {logo && (
          <a
            href="/"
            class="inline-flex items-center"
            style={{ minHeight: navbarHeight }}
            aria-label="Store logo"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={126}
              height={16}
              loading="eager"
              aspect-ratio="3.51"
            />
          </a>
        )}

        <div class="flex gap-1">
          {platform === "vtex" && <CartButtonVTEX />}
          {platform === "vnda" && <CartButtonVDNA />}
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden md:flex justify-center items-center border-b border-base-200 w-full pr-6 py-3">
        <div class="flex justify-between items-center max-w-[90%] w-full">
          <div class="flex-none w-44">
            {logo && (
              <a
                href="/"
                aria-label="Store logo"
                class="block px-4 py-3 w-[160px]"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={126}
                  height={16}
                  loading="eager"
                  aspect-ratio="3.51"
                />
              </a>
            )}
          </div>
          <ul class="flex-auto flex justify-center">
            {items.map((item) => <NavItem item={item} />)}
          </ul>
          <div class="flex-none w-44 flex items-center justify-end gap-2">
            <SearchButton />
            <Searchbar searchbar={searchbar} />
            <a
              class="btn btn-circle btn-sm btn-ghost hover:bg-transparent"
              href="/wishlist"
              aria-label="Wishlist"
            >
              <Icon
                id="Heart"
                size={24}
                strokeWidth={1}
                fill="none"
              />
            </a>

            <LoginElement />

            {platform === "vtex" && <CartButtonVTEX />}
            {platform === "vnda" && <CartButtonVDNA />}
            {platform === "wake" && <CartButtonWake />}
            {platform === "linx" && <CartButtonLinx />}
            {platform === "shopify" && <CartButtonShopify />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
