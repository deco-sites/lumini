import Icon from "$store/components/ui/Icon.tsx";

export default function ShareButton() {
  return (
    <>
      <a href="#my_modal_8">
        <Icon
          id="Share"
          size={24}
          strokeWidth={0.9}
          fill="none"
        />
      </a>

      <div class="modal" role="dialog" id="my_modal_8">
        <div class="modal-box lg:w-[325px] border border-black/40 rounded-none bg-ice-cube">
          <h3 class="text-center text-lg font-light font-univers-next-pro-light">
            compartilhar
          </h3>

          <div class="flex items-center justify-center gap-1.5 mt-2">
            <button
              class="bg-[#3b5998] hover:bg-opacity-60 transition-opacity duration-150 text-white p-1 rounded-full shadow-lg"
              aria-label="Chat on Facebook"
            >
              <Icon id="Facebook" size={20} stroke="0.01" loading="lazy" />
            </button>

            <button
              class="bg-[#45D268] hover:bg-opacity-60 transition-opacity duration-150 text-white p-1 rounded-full shadow-lg"
              aria-label="Chat on WhatsApp"
            >
              <Icon id="WhatsApp" size={20} stroke="0.01" loading="lazy" />
            </button>

            <button
              class="bg-[#00aced] hover:bg-opacity-60 transition-opacity duration-150 text-white p-1 rounded-full shadow-lg"
              aria-label="Chat on Twitter"
            >
              <Icon id="Twitter" size={20} stroke="0.01" loading="lazy" />
            </button>
          </div>

          <div class="modal-action absolute top-[-15px] right-3">
            <a href="#">X</a>
          </div>
        </div>
      </div>
    </>
  );
}
