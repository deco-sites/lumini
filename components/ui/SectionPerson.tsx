import { HTMLWidget } from "apps/admin/widgets.ts";
import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  imagePerson: {
    link: ImageWidget;
    description: string;
  };
  name?: string;
  subTitle?: HTMLWidget;
  socialMedia?: {
    link: ImageWidget;
    url: string;
    description: string;
  }[];
}

export default function SectionPerson(
  { imagePerson, name, subTitle, socialMedia }: Props,
) {
  return (
    <div class="w-full h-full flex items-center justify-center">
      <section class="max-w-[1536px] h-full flex items-start justify-center my-20">
        <div class="w-full h-full flex flex-col md:flex-row items-start justify-center">
          <div class="bg-cover">
            <Image
              src={imagePerson.link}
              width={593}
              height={604}
              alt={imagePerson.description}
            />
          </div>
          <div class="max-w-[593px] flex flex-col gap-4 md:ml-16">
            <p class="text-[32px] text-black mt-2 md:mt-0">
              {name}
            </p>
            <p dangerouslySetInnerHTML={{ __html: subTitle }} class="mb-2" />
            <div class="w-[24px] h-[24px] flex cursor-pointer bg-black rounded-full">
              <a href={socialMedia.url}>
                <Image
                  src={socialMedia.link}
                  width={24}
                  height={24}
                  alt={socialMedia.description}
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
