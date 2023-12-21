import { useUser } from "apps/vtex/hooks/useUser.ts";
import Icon from "$store/components/ui/Icon.tsx";

export default function LoginElement() {
  const { user } = useUser();

  return (
    <>
      {user.value
        ? (
          <div class="dropdown dropdown-end">
            <div
              aria-label="open account modal"
              tabIndex={0}
              role="button"
              class="relative"
            >
              <Icon id="User" size={24} strokeWidth={1} />

              <div class="w-[8px] h-[8px] absolute -right-[6px] -bottom-[0px] z-10 bg-gold rounded-full p-0.5 flex" />
            </div>

            <ul
              tabIndex={0}
              class="flex flex-col justify-center text-sm leading-[16px] text-black gap-4 divide-y divide-[#e0e0e0] dropdown-content z-[1] px-4 py-2 login-popup-shadow bg-base-100 rounded-none w-[330px] h-[125px] uppercase"
            >
              <li>
                <a href="/account" class="hover:underline hover:opacity-90">
                  Minha Conta
                </a>
              </li>

              <li class="pt-4">
                <a href="/logout" class="hover:underline hover:opacity-90">
                  Sair
                </a>
              </li>
            </ul>
          </div>
        )
        : (
          <a
            class="btn btn-circle btn-sm btn-ghost hover:bg-transparent"
            href="/login"
            aria-label="Log in"
          >
            <Icon id="User" size={24} strokeWidth={1} />
          </a>
        )}
    </>
  );
}
