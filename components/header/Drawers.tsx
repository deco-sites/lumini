import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import Cart from "$store/components/minicart/Cart.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Button from "$store/components/ui/Button.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ComponentChildren } from "preact";
import { lazy, Suspense } from "preact/compat";

const Menu = lazy(() => import("$store/components/header/Menu.tsx"));

export interface Props {
  menu: MenuProps;
  searchbar?: SearchbarProps;
  /**
   * @ignore_gen true
   */
  children?: ComponentChildren;
  platform: ReturnType<typeof usePlatform>;
}

const Aside = (
  { title, onClose, children, isMinicart }: {
    title?: string;
    onClose?: () => void;
    children: ComponentChildren;
    isMinicart?: boolean;
  },
) => (
  <div
    class={`bg-base-100 grid h-full divide-y max-w-[100%] ${
      !isMinicart ? "w-[95%] sm:w-auto" : "w-auto grid-rows-[auto_1fr]"
    }`}
  >
    {title && (
      <div class="flex justify-between items-center">
        <h1 class="px-4 py-3">
          <span class="font-medium text-2xl lowercase">{title}</span>
        </h1>
        {onClose && (
          <Button
            title="close button"
            aria-label="close modal"
            class="btn btn-ghost"
            onClick={onClose}
          >
            <Icon id="XMark" size={24} strokeWidth={1} />
          </Button>
        )}
      </div>
    )}
    <Suspense
      fallback={
        <div class="w-screen flex items-center justify-center">
          <span class="loading loading-ring" />
        </div>
      }
    >
      {children}
    </Suspense>
  </div>
);

function Drawers({ menu, searchbar, children, platform }: Props) {
  const { displayCart, displayMenu } = useUI();

  return (
    <Drawer // left drawer
      open={displayMenu.value}
      onClose={() => {
        displayMenu.value = false;
      }}
      aside={
        <Aside
          onClose={() => {
            displayMenu.value = false;
          }}
        >
          {displayMenu.value && <Menu searchbar={searchbar} {...menu} />}
        </Aside>
      }
    >
      <Drawer // right drawer
        class="drawer-end"
        open={displayCart.value !== false}
        onClose={() => displayCart.value = false}
        aside={
          <Aside
            isMinicart={true}
            title="sacola"
            onClose={() => displayCart.value = false}
          >
            <Cart platform={platform} />
          </Aside>
        }
      >
        {children}
      </Drawer>
    </Drawer>
  );
}

export default Drawers;
