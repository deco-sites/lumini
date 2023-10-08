import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";

export interface Props {
  alerts: {
    label: string;
    href: string;
  }[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], interval = 5 }: Props) {
  const id = useId();

  return (
    <div id={id} class="w-full">
      <Slider class="carousel carousel-center w-full bg-black gap-6">
        {alerts.map((alert, index) => (
          <Slider.Item index={index} class="carousel-item w-full max-w-[95%]">
            <a
              href={alert.href}
              class="text-sm text-white flex justify-end items-center w-full h-[24px]"
            >
              {alert.label}
            </a>
          </Slider.Item>
        ))}
      </Slider>

      <SliderJS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default Alert;
