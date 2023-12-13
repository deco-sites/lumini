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
      <section class="max-w-[1250px] h-full flex items-start justify-center my-20">
        <div class="w-full h-full flex flex-col md:flex-row items-start justify-center">
          <div class="bg-cover pt-[5px]">
            <Image
              src={imagePerson.link}
              width={593}
              height={604}
              alt={imagePerson.description}
            />
          </div>
          <div class="max-w-[593px] flex flex-col gap-2 md:ml-16">
            <p class="text-4xl font-univers-next-pro-regular text-black">
              {name}
            </p>
            <p
              dangerouslySetInnerHTML={{ __html: subTitle ?? "" }}
              class="mb-2"
            />
            {socialMedia && socialMedia.length > 0 && (
              <div class="w-[24px] h-[24px] flex gap-1.5 cursor-pointer bg-black rounded-full">
                {socialMedia?.map((item) => (
                  <a href={item.url}>
                    <Image
                      src={item.link}
                      width={24}
                      height={24}
                      alt={item.description}
                    />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
