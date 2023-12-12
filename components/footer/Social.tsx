import { ImageWidget } from "apps/admin/widgets.ts";

export interface SocialItem {
  image: ImageWidget;
  description: string;
  link: string;
}

export default function Social(
  { content, vertical = false }: {
    content?: { title?: string; items?: SocialItem[] };
    vertical?: boolean;
  },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col gap-4">
          {content.title && (
            <span class="text-[18px] text-[#353535]">{content.title}</span>
          )}
          <ul
            class={`flex gap-4 ${
              vertical ? "lg:flex-col lg:items-start" : "flex-wrap items-center"
            }`}
          >
            {content.items.map((item) => {
              return (
                <li>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.description} Logo`}
                    class="flex gap-2 items-center"
                  >
                    <img
                      src={item.image}
                      alt={item.description}
                      width={24}
                      height={24}
                      loading="lazy"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
