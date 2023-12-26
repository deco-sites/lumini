export interface Props {
  /**
   * @title The link of the video
   */
  link: string;
  width?: number;
  height?: number;
  description: string;
}

export default function SectionVideo(
  { link, width, height, description }: Props,
) {
  if (!link) return null;

  return (
    <section class="w-full h-full flex items-center justify-center mx-auto px-4 lg:px-0">
      <div class="max-w-[375px] md:max-w-[820px] lg:max-w-[1250px] w-full h-full mx-auto">
        <iframe
          title="vimeo-player"
          alt={description}
          src={link}
          width={width ?? 1300}
          height={height ?? 731}
          frameborder="0"
          allowFullScreen={true}
        />
      </div>
    </section>
  );
}
