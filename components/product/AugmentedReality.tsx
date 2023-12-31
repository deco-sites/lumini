export interface Props {
  html?: string;
}

export default function AugmentedReality({ html }: Props) {
  if (!html) return null;

  return (
    <div class="mt-2 lg:mt-0">
      <div dangerouslySetInnerHTML={{ __html: html || "" }} />

      {/* 3RD Script */}
      <script src="https://mobiliar3d.com/js/mobiliar.widgets.min.js" defer />
    </div>
  );
}
