export interface Props {
  alerts: {
    label: string;
    href: string;
  }[];
}

function Alert({ alerts = [] }: Props) {
  return (
    <div class="w-full">
      <div class="flex items-center justify-end w-full bg-black gap-6 py-0.5 pr-1.5 lg:pr-16">
        {alerts.map((alert) => (
          <a
            href={alert.href}
            class="text-xs text-white items-center flex h-[24px]"
          >
            {alert.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default Alert;
