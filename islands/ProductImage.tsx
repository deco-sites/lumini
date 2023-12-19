import { FunctionComponent, h } from "preact";
import { useState } from "preact/compat";

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

  const handleImageClick = (
    event: h.JSX.TargetedMouseEvent<HTMLImageElement>,
  ) => {
    if (self.window.innerWidth < 1024) return;

    const image = event.currentTarget;

    if (isZoomed) {
      // Se a imagem já estiver com zoom, remover o zoom
      image.style.transform = "scale(1)";
      image.style.transformOrigin = "center center";
      image.style.zIndex = "0";
      setIsZoomed(false);
    } else {
      // Se a imagem não estiver com zoom, adicionar o zoom
      const handleMouseMove = (e: MouseEvent) => {
        const boundingRect = image.getBoundingClientRect();
        const mouseX = e.clientX - boundingRect.left;
        const mouseY = e.clientY - boundingRect.top;

        const percentageX = (mouseX / boundingRect.width) * 100;
        const percentageY = (mouseY / boundingRect.height) * 100;

        image.style.transform = `scale(1.8)`;
        image.style.transformOrigin = `${percentageX}% ${percentageY}%`;
        image.style.zIndex = "20";
      };

      // Remover o zoom e os event listeners quando o mouse sai da imagem
      const handleMouseLeave = () => {
        image.style.transform = "scale(1)";
        image.style.transformOrigin = "center center";
        image.style.zIndex = "0";
        setIsZoomed(false);

        image.removeEventListener("mousemove", handleMouseMove);
        image.removeEventListener("mouseleave", handleMouseLeave);
      };

      // Adicionar o zoom e os event listeners
      setIsZoomed(true);
      image.addEventListener("mousemove", handleMouseMove);
      image.addEventListener("mouseleave", handleMouseLeave);
    }
  };

  return (
    <Slider class="carousel carousel-center gap-6 w-screen sm:w-full">
      {images.map((img, index) => (
        <Slider.Item
          index={index}
          class="carousel-item w-full"
          key={index}
        >
          <Image
            class="w-full hover:cursor-zoom-in"
            sizes="(max-width: 640px) 100vw, 40vw"
            style={{ aspectRatio: ASPECT_RATIO }}
            src={img.url!}
            alt={img.alternateName}
            width={WIDTH}
            height={HEIGHT}
            onClick={(e) => handleImageClick(e)}
            preload={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
          />
        </Slider.Item>
      ))}
    </Slider>
  );
};

export default ProductImage;
