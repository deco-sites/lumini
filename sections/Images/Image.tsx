import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  image: {
    url: ImageWidget;
    description: string;
    width?: number;
    height?: number;
    loading?: "eager" | "lazy";
  };
}

export default function ImageSection({ image }: Props) {
  if (!image) return null;

  return (
    <div class="w-full h-full px-4 md:px-0">
      <Image
        src={image.url}
        alt={image.description}
        width={image.width || 500}
        height={image.height || 500}
        loading={image.loading || "lazy"}
      />
    </div>
  );
}
