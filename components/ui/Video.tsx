import Video from "apps/website/components/Video.tsx";
import type { VideoWidget } from "apps/admin/widgets.ts";

export interface Props {
    /**
     * @title If you are having trouble uploading videos via the link, downloading the video may work better 
     */
    link: VideoWidget;
}

export default function SectionVideo( { link } : Props ) {
    return (
            <section class="max-w-[1536px] flex items-center justify-center mx-auto my-[70px]">
                <div class="w-full md:w-3/4 lg:w-[1250px]">
                    <Video
                        width={1250}
                        height={773}
                        muted
                        autoPlay
                        controls
                        src={link}
                        loading="lazy"
                        class="w-full h-full object-cover"
                    />
                </div>
            </section>
        )
}