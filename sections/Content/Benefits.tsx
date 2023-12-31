import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import Header from "$store/components/ui/SectionHeader.tsx";

export interface Props {
  title?: string;
  description?: string;
  benefits?: Array<{
    label: string;
    icon: AvailableIcons;
    description?: string;
  }>;
  layout?: {
    variation?: "Simple" | "With border" | "Color reverse" | "Slider";
    headerAlignment?: "center" | "left";
  };
}

export default function Benefits(
  props: Props,
) {
  const {
    title = "",
    description = "",
    benefits = [{
      icon: "Truck",
      label: "Entrega em todo Brasil",
      description: "Consulte o prazo no fechamento da compra.",
    }, {
      icon: "Discount",
      label: "15% na primeira compra",
      description: "Aplicado direto na sacola de compras.",
    }, {
      icon: "ArrowsPointingOut",
      label: "Devolução grátis",
      description: "Veja as condições para devolver seu produto.",
    }],
    layout,
  } = props;

  const id = useId();

  const listOfBenefits = benefits.map((benefit, index) => {
    // const showDivider = index < benefits.length - 1;
    const showDivider = false;
    const reverse = layout?.variation === "Color reverse";
    const benefitLayout = !layout?.variation || layout?.variation === "Simple"
      ? "tiled"
      : "piledup";

    return (
      <div
        class={`${
          reverse ? "bg-primary text-primary-content p-4 lg:px-8 lg:py-4" : ""
        } flex items-center justify-center gap-4 ${
          benefitLayout == "piledup" ? "flex-col items-center text-center" : ""
        } ${
          showDivider && benefitLayout !== "piledup"
            ? "border-b border-neutral-300"
            : ""
        } ${showDivider ? "pb-4 lg:pr-8 lg:border-r lg:border-b-0" : ""} ${
          showDivider && !reverse ? "lg:pb-0" : ""
        }`}
      >
        <div class="flex-none">
          <Icon
            id={benefit.icon}
            class={reverse ? "text-base-100" : "text-primary"}
            width={36}
            height={36}
            strokeWidth={0.01}
            fill="currentColor"
          />
        </div>
        <div class="flex-auto flex flex-col gap-1 lg:gap-2">
          <div
            class={`text-base leading-7 ${
              reverse ? "text-base-100" : "text-base-content"
            }`}
          >
            {benefit.label}
          </div>
          {benefit.description && (
            <p
              class={`text-sm leading-5 ${
                reverse ? "text-base-100" : "text-neutral"
              } ${benefitLayout == "piledup" ? "hidden lg:block" : ""}`}
            >
              {benefit.description}
            </p>
          )}
        </div>
      </div>
    );
  });

  return (
    <div class="flex items-center justify-center border-b border-[#d6d6d6] w-full font-univers-next-pro-light">
      {!layout?.variation || layout?.variation === "Simple"
        ? (
          <div class="w-full container max-w-[1145px] px-4 py-6 flex flex-col gap-8 lg:gap-10 lg:px-0">
            <Header
              title={title}
              description={description}
              alignment={layout?.headerAlignment || "center"}
            />
            <div class="w-full flex justify-center">
              <div class="flex flex-col gap-4 lg:gap-8 w-full lg:grid grid-flow-col auto-cols-fr">
                {listOfBenefits}
              </div>
            </div>
          </div>
        )
        : ""}
      {layout?.variation === "With border" && (
        <div class="w-full container flex flex-col px-4 py-8 gap-8 lg:gap-10 lg:py-10 lg:px-0">
          <Header
            title={title}
            description={description}
            alignment={layout?.headerAlignment || "center"}
          />
          <div class="w-full flex justify-center">
            <div class="grid grid-cols-2 gap-4 w-full py-6 px-4 border border-base-300 lg:gap-8 lg:grid-flow-col lg:auto-cols-fr lg:p-10">
              {listOfBenefits}
            </div>
          </div>
        </div>
      )}
      {layout?.variation === "Color reverse" && (
        <div class="w-full container flex flex-col px-4 py-8 gap-8 lg:gap-10 lg:py-10 lg:px-0">
          <Header
            title={title}
            description={description}
            alignment={layout?.headerAlignment || "center"}
          />
          <div class="w-full flex justify-center">
            <div class="grid grid-cols-2 gap-4 w-full lg:gap-8 lg:grid-flow-col lg:auto-cols-fr">
              {listOfBenefits}
            </div>
          </div>
        </div>
      )}
      {layout?.variation === "Slider" && (
        <div class="w-full px-4 py-2.5 flex flex-col items-center justify-center gap-8">
          <Header
            title={title}
            description={description}
            alignment={layout?.headerAlignment || "center"}
          />
          <div id={id} class="w-full flex items-center justify-center">
            <Slider class="carousel carousel-center w-full">
              {benefits?.map((benefit, index) => (
                <Slider.Item
                  index={index}
                  class="carousel-item w-full items-center justify-center gap-1.5"
                >
                  <Icon
                    id={benefit.icon}
                    class={"text-primary"}
                    width={36}
                    height={36}
                    strokeWidth={0.01}
                    fill="currentColor"
                  />
                  <span class="text-base leading-7 text-default-text">
                    {benefit.label}
                  </span>
                </Slider.Item>
              ))}
            </Slider>
            <SliderJS rootId={id} infinite scroll="smooth" interval={6 * 1e3} />
          </div>
        </div>
      )}
    </div>
  );
}
