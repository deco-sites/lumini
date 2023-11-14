import { useId } from "$store/sdk/useId.ts";

const script = (id: string) => {
  const callback = () => {
    const KEY = "store-cookie-consent";
    const ACCEPTED = "accepted";
    const HIDDEN = "translate-y-[200%]";

    const consent = localStorage.getItem(KEY);
    const elem = document.getElementById(id);

    if (consent !== ACCEPTED && elem) {
      const accept = elem.querySelector("[data-button-cc-accept]");
      accept && accept.addEventListener("click", () => {
        localStorage.setItem(KEY, ACCEPTED);
        elem.classList.add(HIDDEN);
      });
      const close = elem.querySelector("[data-button-cc-close]");
      close &&
        close.addEventListener("click", () => elem.classList.add(HIDDEN));
      elem.classList.remove(HIDDEN);
    }
  };

  addEventListener("scroll", callback, { once: true });
};

export interface Props {
  title?: string;
  /** @format html */
  text?: string;
  policy?: {
    text?: string;
    link?: string;
  };
  buttons?: {
    allowText: string;
    cancelText?: string;
  };
  layout?: {
    position?: "Expanded" | "Left" | "Center" | "Right";
    content?: "Tiled" | "Piled up";
  };
}

const DEFAULT_PROPS = {
  title: "",
  text:
    "Guardamos estatísticas de visitas para melhorar sua experiência de navegação.",
  policy: {
    text: "",
    link: "",
  },
  buttons: {
    allowText: "Aceitar",
    cancelText: "",
  },
  layout: {
    position: "Expanded",
    content: "Tiled",
  },
};

function CookieConsent(props: Props) {
  const id = useId();
  const { title, text, policy, buttons, layout } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  return (
    <>
      <div
        id={id}
        class={`
          transform-gpu translate-y-[200%] transition fixed bottom-0 w-screen z-50 lg:flex
          ${layout?.position === "Left" ? "lg:justify-start" : ""}
          ${layout?.position === "Center" ? "lg:justify-center" : ""}
          ${layout?.position === "Right" ? "lg:justify-end" : ""}
        `}
      >
        <div
          class={`
          p-4 mx-4 my-2 flex flex-col gap-4 shadow bg-base-100 rounded border border-base-200 
          ${
            !layout?.position || layout?.position === "Expanded"
              ? "lg:w-full lg:mx-auto"
              : `
            ${layout?.content === "Piled up" ? "lg:w-[480px]" : ""}
            ${
                !layout?.content || layout?.content === "Tiled"
                  ? "lg:w-[520px]"
                  : ""
              }
          `
          }
          ${
            !layout?.content || layout?.content === "Tiled"
              ? "lg:flex-row lg:items-end"
              : ""
          }
          
        `}
        >
          <div class="flex flex-col lg:flex-row items-center justify-center container mx-auto">
            <div
              class={`flex-auto flex flex-col gap-4 ${
                !layout?.content || layout?.content === "Tiled"
                  ? "lg:gap-2"
                  : ""
              }`}
            >
              {title && <h3 class="text-xl">{title}</h3>}

              {text && (
                <div
                  class="text-base lg:w-[75%]"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              )}

              {policy && (
                <a href={policy.link} class="text-sm link link-secondary">
                  {policy.text}
                </a>
              )}
            </div>

            <div
              class={`flex flex-col gap-2 ${
                !layout?.position || layout?.position === "Expanded"
                  ? "lg:flex-row"
                  : ""
              }`}
            >
              <button
                class="btn btn-outline bg-black text-white hover:bg-opacity-10 hover:text-black uppercase"
                data-button-cc-accept
              >
                {buttons.allowText}
              </button>

              {buttons.cancelText && (
                <button class="btn btn-outline" data-button-cc-close>
                  {buttons.cancelText}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: `(${script})("${id}");` }}
      />
    </>
  );
}

export default CookieConsent;
