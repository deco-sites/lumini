export interface Props {
  html?: string;
}

export default function AugmentedReality({ html }: Props) {
  if (!html) return null;

  return <div dangerouslySetInnerHTML={{ __html: html || "" }} />;
}
