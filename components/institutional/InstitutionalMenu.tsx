export interface Group {
  groups: Array<{
    label: string;
    link: string;
  }>;
}

export default function InstitutionalMenu({ groups }: Group) {
  return (
    <ul class="flex flex-col w-full gap-5 font-univers-next-pro-regular">
      <li class="font-univers-next-pro-bold">informações</li>
      {groups?.map((group) => (
        <li>
          <a href={group.link} class="text-[16px]">{group.label}</a>
        </li>
      ))}
    </ul>
  );
}
