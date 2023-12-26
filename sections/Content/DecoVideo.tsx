import Video from "apps/website/components/Video.tsx";
import type { VideoWidget } from "apps/admin/widgets.ts";

export interface Props {
  /**
   * @title If you are having trouble uploading videos via the link, downloading the video may work better
   */
  link: VideoWidget;
  width?: number;
  height?: number;
  description: string;
}

export default function SectionVideo(
  { link, width, height, description }: Props,
) {
  return (
    <section class="w-full h-full flex items-center justify-center mx-auto px-4 lg:px-0">
      <div class="max-w-[1250px] w-full h-full">
        <Video
          width={width || 900}
          height={height || 773}
          muted
          autoPlay
          controls
          src={link}
          alt={description}
          loading="lazy"
          class="w-full h-full object-cover pt-20 pb-[60px]"
        />
      </div>
    </section>
  );
}
