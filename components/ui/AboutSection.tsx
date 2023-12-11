import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { HTMLWidget } from "apps/admin/widgets.ts";

export interface Props {
  title: HTMLWidget;
  subTitle: HTMLWidget;
  titleButton: string;
  linkButton: string;
  image: {
    linkImage: ImageWidget;
    description: string;
  };
}
export default function AboutSection(
  { title, subTitle, titleButton, linkButton, image }: Props,
) {
  return (
    <section class="max-w-[1250px] flex items-center justify-center mx-auto px-4 lg:px-0">
      <div class="w-full h-full flex flex-col md:flex-row items-center justify-center gap-3 lg:gap-60">
        <div class="max-w-[540px] w-full h-full flex flex-col">
          <h1 dangerouslySetInnerHTML={{ __html: title ?? "" }} />
          <p dangerouslySetInnerHTML={{ __html: subTitle ?? "" }} />
          <div class="my-8">
            <a href={linkButton}>
              <button class="bg-transparent text-black font-semibold py-2 px-4 border border-black">
                {titleButton}
              </button>
            </a>
          </div>
        </div>
        {image && (
          <div class="max-w-[500px] w-full h-full mt-[-14px]">
            <Image
              src={image.linkImage}
              width={500}
              height={350}
              loading="lazy"
              alt={image.description}
            />
          </div>
        )}
      </div>
    </section>
  );
}
