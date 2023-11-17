import Icon from "$store/components/ui/Icon.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";

export interface PaymentItem {
  image: ImageWidget;
  description: string;
}

export default function PaymentMethods(
  { content }: { content?: { title?: string; items?: PaymentItem[] } },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col lg:flex-row flex-wrap items-start lg:items-center justify-center gap-4">
          {content.title && <span class="text-[16px]">{content.title}</span>}
          <ul class="flex items-center gap-1.5 flex-wrap">
            {content.items.map((item) => {
              return (
                <li
                  title={item.description}
                >
                  <img
                    src={item.image}
                    alt={item.description}
                    width={43}
                    height={30}
                    loading="lazy"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
