import { h } from "preact";

import Slider from "$store/components/ui/Slider.tsx";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  images: Array<{
    url?: string;
    alternateName?: string;
  }>;
}

const WIDTH = 709;
const HEIGHT = 709;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

export default function ProductImage({ images }: Props) {
  const handleMouseMove = (
    event: h.JSX.TargetedMouseEvent<HTMLImageElement>,
  ) => {
    if (self.window.innerWidth < 1024) return;

    const image = event.currentTarget;
    const boundingRect = image.getBoundingClientRect();

    const mouseX = event.clientX - boundingRect.left;
    const mouseY = event.clientY - boundingRect.top;

    const percentageX = (mouseX / boundingRect.width) * 100;
    const percentageY = (mouseY / boundingRect.height) * 100;

    image.style.transform = `scale(1.8)`;
    image.style.transformOrigin = `${percentageX}% ${percentageY}%`;
    image.style.zIndex = "20";
  };

  const handleMouseLeave = (
    event: h.JSX.TargetedMouseEvent<HTMLImageElement>,
  ) => {
    const image = event.currentTarget;

    image.style.transform = "scale(1)";
    image.style.transformOrigin = "center center";
    image.style.zIndex = "0";
  };

  return (
    <Slider class="carousel carousel-center gap-6 w-screen sm:w-full">
      {images.map((img, index) => (
        <Slider.Item
          index={index}
          class="carousel-item w-full"
        >
          <Image
            class="w-full hover:cursor-zoom-in"
            sizes="(max-width: 640px) 100vw, 40vw"
            style={{ aspectRatio: ASPECT_RATIO }}
            src={img.url!}
            alt={img.alternateName}
            width={WIDTH}
            height={HEIGHT}
            onMouseMove={(e) => handleMouseMove(e)}
            onMouseLeave={(e) => handleMouseLeave(e)}
            preload={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
          />
        </Slider.Item>
      ))}
    </Slider>
  );
}
