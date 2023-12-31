import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { headerHeight } from "./constants.ts";

function NavItem({ item }: { item: SiteNavigationElement }) {
  const { url, name, children } = item;
  const image = item?.image?.[0];

  return (
    <li class="group flex items-center">
      <a href={url} class="px-4 py-3">
        <span class="group-hover:underline font-univers-next-pro-regular font-normal leading-[18px]">
          {name}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="fixed hidden hover:flex group-hover:flex bg-base-100 z-50 items-start justify-center gap-6 border-t border-base-200 w-screen"
            style={{ top: "0px", left: "0px", marginTop: headerHeight }}
          >
            {image?.url && (
              <Image
                class="p-6"
                src={image.url}
                alt={image.alternateName}
                width={300}
                height={332}
                loading="lazy"
              />
            )}
            <ul class="flex items-start justify-center gap-6 mr-[80px]">
              {children.map((node) => (
                <li class="p-6">
                  <ul class="h-full" style={{ columnCount: 2 }}>
                    <li class="pb-0.5">
                      <a href={node.url}>
                        <span class="font-univers-next-pro-regular text-black/90">
                          {node.name}
                        </span>
                      </a>
                    </li>

                    {node.children?.map((leaf) => (
                      <li class="pb-0.5">
                        <a href={leaf.url}>
                          <span class="font-univers-next-pro-regular text-black/90">
                            {leaf.name}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
