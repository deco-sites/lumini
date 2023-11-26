import Icon from "$store/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
import { invoke } from "$store/runtime.ts";
import { useEffect, useRef } from "preact/compat";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface INewsletterInputProps {
  /**
   * @title Hide input?
   */
  show?: boolean;
  /**
   * @title placeholder
   */
  placeholder?: string;
}

export interface INewsletterFormProps {
  email: INewsletterInputProps;
  button: {
    /**
     * @title button label?
     * @default cadastrar
     */
    label?: string;
  };
}

export interface Props {
  /**
   * @title Newsletter Form
   */
  form: INewsletterFormProps;
  bannerImage?: {
    image: ImageWidget;
    description: string;
    width?: number;
    height?: number;
  };
  /**
   * @title newsletter message text?
   * @format html
   */
  text: string;
  description?: string;
  details?: string[];

  /**
   * @title Days to reopen modal if it is registered
   */
  modalSignExpiredDate: number;

  /**
   * @title Days to reopen moda if it is closed
   */
  modalCloseExpiredDate: number;
}

interface InputNewletterProps {
  name: string;
  placeholder: string;
  type: string;
  required: boolean;
}

function InputNewsletter(
  { name, placeholder, required, type }: InputNewletterProps,
) {
  return (
    <input
      name={name}
      type={type}
      class="input lg:h-10 h-7 px-5 join-item w-full mb-2.5 first:mt-5 border border-[#cacaca] placeholder:text-placeholder !outline-none lg:text-base text-xs"
      placeholder={placeholder}
      required={required}
    />
  );
}

export default function Popup({
  isOpen,
  form,
  text,
  description,
  details,
  modalSignExpiredDate,
  modalCloseExpiredDate,
  bannerImage,
}: Props & { isOpen: boolean }) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const loading = useSignal(false);
  const success = useSignal(false);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    }
  }, [isOpen]);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await invoke.vtex.actions.newsletter.subscribe({ email });
    } finally {
      loading.value = false;
      success.value = true;

      setCookieOnCloseModal("registered", modalSignExpiredDate);

      setTimeout(() => {
        success.value = false;
        modalRef.current?.close();
      }, 2000);
    }
  };

  const setCookieOnCloseModal = (
    cookieValue: string,
    expirationSeconds: number,
  ) => {
    // deno-lint-ignore no-var
    var date = new Date();

    date.setTime(date.getTime() + (expirationSeconds * 24 * 60 * 60 * 1000));
    // deno-lint-ignore no-var
    var expires = "expires=" + date.toUTCString();

    document.cookie = "LuminiNewsletterModal" + "=" + cookieValue + ";" +
      expires +
      ";path=/";
  };

  const emailInput = !form?.email?.show
    ? (
      <InputNewsletter
        name="email"
        required
        type="email"
        placeholder={form?.email?.placeholder || "seu e-mail"}
      />
    )
    : null;

  return (
    <>
      <dialog
        ref={modalRef}
        class="modal bg-primary-content bg-opacity-70"
      >
        <form
          method="dialog"
          class="flex md:flex-row modal-box items-center overflow-visible max-w-lg w-full md:h-1/2 bg-white rounded-none p-0 font-univers-next-pro-regular"
        >
          <div class="flex absolute top-2 right-2">
            <button
              onClick={() =>
                setCookieOnCloseModal("closed", modalCloseExpiredDate)}
              class="flex items-center justify-center gap-1.5"
              aria-label="Fechar"
            >
              <span class="hidden md:block">fechar</span>
              <Icon
                id="XMark"
                strokeWidth={2}
                width={20}
                height={20}
              />
            </button>
          </div>
          {bannerImage && (
            <div class="hidden md:block max-w-[25%] relative">
              <Image
                src={bannerImage.image}
                width={bannerImage.width || 128}
                height={bannerImage.height || 319}
                alt={bannerImage.description}
                class="object-contain object-center"
                loading="lazy"
              />
            </div>
          )}
          {success.value
            ? (
              <div class="flex items-center justify-center lg:text-xl text-lg font-univers-next-pro-bold leading-7 text-center font-bold">
                e-mail cadastrado com sucesso!
              </div>
            )
            : (
              <>
                <form
                  class="flex items-center justify-center w-full h-[85%] form-control bg-white py-2 rounded-r-lg"
                  onSubmit={handleSubmit}
                >
                  <div class="max-w-[280px] text-center flex flex-col h-full gap-2 md:gap-0 justify-between">
                    <h1
                      class="text-lg font-univers-next-pro-regular leading-7 text-start font-medium"
                      dangerouslySetInnerHTML={{
                        __html: text ||
                          "cadastre-se e ganhe 5% off na sua primeira compra.",
                      }}
                    />

                    <div class="flex flex-col gap-2 w-full">
                      {emailInput}

                      <button
                        type="submit"
                        class="px-2.5 h-9 w-full flex items-center justify-center text-lg text-black bg-lightslategray"
                        disabled={loading}
                      >
                        {form?.button?.label || "enviar"}
                      </button>

                      <p class="text-sm text-start text-gray-base/80">
                        {description ||
                          "a lumini utiliza o e-mail fornecido para enviar novidades e ofertas por e-mail. ao enviar, você confirma que leu e concorda com a política de privacidade."}
                      </p>
                    </div>

                    <div class="flex flex-col text-xs text-start">
                      {details?.map((detail) => <span>{detail}</span>)}
                    </div>
                  </div>
                </form>
              </>
            )}
        </form>
        <form method="dialog" class="modal-backdrop">
          <button
            onClick={() =>
              setCookieOnCloseModal("closed", modalCloseExpiredDate)}
          >
            fechar
          </button>
        </form>
      </dialog>
    </>
  );
}
