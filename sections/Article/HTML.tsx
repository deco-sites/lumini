import type { HTMLWidget } from "apps/admin/widgets.ts";

export interface Props {
  text?: HTMLWidget;
}

export default function HTML({ text }: Props) {
  return (
    <div
      class="py-6 px-4 md:px-0"
      dangerouslySetInnerHTML={{ __html: text || "" }}
    />
  );
}
