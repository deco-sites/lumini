import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import type { JSX } from "preact";

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  content: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: Form;
  };
  layout?: {
    tiled?: boolean;
  };
}

function Newsletter(
  { content, layout = {} }: Props,
) {
  const { tiled = false } = layout;
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await invoke.vtex.actions.newsletter.subscribe({ email });
    } finally {
      loading.value = false;
    }
  };

  return (
    <div
      class={`flex ${
        tiled
          ? "flex-col gap-4 lg:flex-row lg:w-full lg:justify-between"
          : "flex-col gap-4"
      }`}
    >
      <div class="flex flex-col gap-4">
        {content?.title && (
          <h3 class={tiled ? "text-2xl lg:text-3xl" : "text-lg"}>
            {content?.title}
          </h3>
        )}
        {content?.description && <div>{content?.description}</div>}
      </div>
      <div class="flex flex-col gap-4">
        <form
          class="flex items-center justify-center w-full border-b border-b-black pb-0.5 h-[46px]"
          onSubmit={handleSubmit}
        >
          <div class="flex justify-between items-center w-full h-full">
            <input
              name="email"
              class="flex w-full text-base-content bg-transparent pl-1.5 focus:bg-none focus:border-none h-full"
              placeholder={content?.form?.placeholder || "insira seu email"}
            />

            <button
              type="submit"
              class="disabled:loading pr-1.5 h-full"
              disabled={loading}
            >
              <img
                alt="right arrow image"
                width={24}
                height={24}
                loading="lazy"
                src="https://tezexb.vtexassets.com/assets/vtex/assets-builder/tezexb.lumini-store-theme/1.9.3/svg/hpa-newsletter-row___ef97774d74950b40c21bc4b0ba8ffec1.svg"
              />
            </button>
          </div>
        </form>
        {
          /* {content?.form?.helpText && (
          <div
            class="text-sm"
            dangerouslySetInnerHTML={{ __html: content?.form?.helpText }}
          />
        )} */
        }
      </div>
    </div>
  );
}

export default Newsletter;
