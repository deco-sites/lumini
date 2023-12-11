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
    <section class="w-full h-full flex items-center justify-center my-4 mx-auto">
      <div class="max-w-[1250px] w-full h-full p-4 md:p-0">
        <Video
          width={width || 900}
          height={height || 773}
          muted
          autoPlay
          controls
          src={link}
          alt={description}
          loading="lazy"
          class="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
