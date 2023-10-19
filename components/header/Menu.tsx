import Icon from "$store/components/ui/Icon.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";

export interface Props {
  items: SiteNavigationElement[];
}

function MenuItem({ item }: { item: SiteNavigationElement }) {
  const component = item?.children?.length
    ? (
      <div class="collapse collapse-plus relative items-start">
        <input
          type="checkbox"
          class="absolute left-0 w-full top-0"
        />
        <div class="collapse-title min-h-0 p-0 py-2.5 font-bold text-lg px-0 flex items-center justify-between">
          {item.name}
        </div>
        <div class="collapse-content px-0">
          <div class="pt-0 px-0">
            {item.children?.map(({ children }) => (
              <ul class="border-l border-l-gold pl-3 gap-0.5">
                <li>
                  <a
                    href={item.url}
                    class="w-full block font-normal text-sm"
                  >
                    {item.name}
                  </a>
                </li>
                {children?.map((child) => (
                  <>
                    <li>
                      <a
                        href={child.url}
                        class="w-full block font-normal text-sm"
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

function Menu({ items }: Props) {
  return (
    <div class="flex flex-col h-full">
      <ul class="px-4 flex-grow flex flex-col">
        {items.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>

      <ul class="flex flex-col py-2 bg-base-200 border-t border-t-border-base-300">
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="/login"
          >
            <Icon id="User" size={24} strokeWidth={2} />
            <span class="text-sm">Minha conta</span>
          </a>
        </li>

        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="/wishlist"
          >
            <Icon id="Heart" size={24} strokeWidth={2} />
            <span class="text-sm">Favoritos</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
