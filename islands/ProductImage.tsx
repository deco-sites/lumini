import { FunctionComponent, h } from "preact";
import { useEffect, useState } from "preact/hooks";

import Slider from "$store/components/ui/Slider.tsx";
import Image from "apps/website/components/Image.tsx";

interface ImageProps {
  url?: string;
  alternateName?: string;
}

const WIDTH = 709;
const HEIGHT = 709;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

const ProductImage: FunctionComponent<{ images: ImageProps[] }> = (
  { images },
) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mouseMoveListener, setMouseMoveListener] = useState<
    ((e: MouseEvent) => void) | null
  >(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const image = e.currentTarget as HTMLImageElement;
      const boundingRect = image.getBoundingClientRect();
      const mouseX = e.clientX - boundingRect.left;
      const mouseY = e.clientY - boundingRect.top;

      const percentageX = (mouseX / boundingRect.width) * 100;
      const percentageY = (mouseY / boundingRect.height) * 100;

      image.style.transform = `scale(1.8)`;
      image.style.transformOrigin = `${percentageX}% ${percentageY}%`;
      image.style.zIndex = "20";
    };

    if (isZoomed) {
      setMouseMoveListener(() => handleMouseMove);
    } else {
      setMouseMoveListener(null);
    }

    return () => {
      setMouseMoveListener(null);
    };
  }, [isZoomed]);

  const handleImageClick = (
    event: h.JSX.TargetedMouseEvent<HTMLImageElement>,
  ) => {
    if (self.window.innerWidth < 1024) return;

    const image = event.currentTarget;

    if (isZoomed) {
      image.style.transform = "scale(1)";
      image.style.transformOrigin = "center center";
      image.style.zIndex = "0";
      setIsZoomed(false);
    } else {
      setIsZoomed(true);
    }
  };

  return (
    <Slider class="carousel carousel-center gap-6 w-screen sm:w-full">
      {images.map((img, index) => (
        <Slider.Item index={index} class="carousel-item w-full" key={index}>
          <Image
            class={`w-full hover:cursor-zoom-in ${
              isZoomed ? "zoomed-image" : ""
            }`}
            sizes="(max-width: 640px) 100vw, 40vw"
            style={{ aspectRatio: ASPECT_RATIO }}
            src={img.url!}
            alt={img.alternateName}
            width={WIDTH}
            height={HEIGHT}
            onClick={(e) =>
              handleImageClick(e)}
            onMouseLeave={(e) => {
              const image = e.currentTarget as HTMLImageElement;
              image.style.transform = "scale(1)";
              image.style.transformOrigin = "center center";
              image.style.zIndex = "0";

              setIsZoomed(false);
            }}
            onMouseMove={mouseMoveListener
              ? (e) =>
                mouseMoveListener(e)
              : undefined}
            preload={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
          />
        </Slider.Item>
      ))}
    </Slider>
  );
};

export default ProductImage;
