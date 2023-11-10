export interface Props {
  title: string;
  /**
   * @format html
   */
  description: string;
}

export default function InstitutionalDescription(
  { title, description }: Props,
) {
  return (
    <div class="flex flex-col gap-6 w-full">
      <h1 class="font-bold text-lg lg:text-xl">{title}</h1>
      {description && (
        <div dangerouslySetInnerHTML={{ __html: description || "" }} />
      )}
    </div>
  );
}
