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
      <p class="font-univers-next-pro-regular text-xl text-[#353535] lg:text-2xl">
        {title}
      </p>
      {description && (
        <div
          class="font-univers-next-pro-regular"
          dangerouslySetInnerHTML={{ __html: description || "" }}
        />
      )}
    </div>
  );
}
