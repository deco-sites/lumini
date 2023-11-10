import { Section } from "deco/blocks/section.ts";

export interface Props {
  sideMenu: Section;
  sections: Section[];
}

export default function ContainerInstitutional({ sideMenu, sections }: Props) {
  const { Component, props } = sideMenu;

  return (
    <section class="flex items-center justify-center px-4 my-16 font-univers-next-pro-light w-full">
      <div class="flex flex-col sm:flex-row container mx-auto w-full max-w-[1280px] gap-6">
        <aside class="w-[20%] md:mt-12">
          <Component {...props} />
        </aside>

        <div class="w-full lg:w-[80%]">
          {sections.map((section, index) => {
            const { Component, props } = section;
            return <Component key={index} {...props} />;
          })}
        </div>
      </div>
    </section>
  );
}
