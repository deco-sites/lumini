export default function Contact() {
  return (
    <section class="w-full h-full flex items-center justify-center ">
      <div class="max-w-[1536px] w-full h-full flex flex-col items-center justify-center mx-auto">
        <div class="w-full h-full flex items-center justify-center my-20">
          <h1 class="text-[32px]">atendimento loja virtual</h1>
        </div>
        <div class="flex flex-col lg:flex-row mb-16">
          <div class="flex flex-col ">
            <div class="flex items-center justify-center gap-2">
              <div class="flex items-center justify-center">
                <img
                  src="https://tezexb.vtexassets.com/assets/vtex/assets-builder/tezexb.lumini-store-theme/1.9.3/svg/phone___a27e116138fc7df681c54f5ca091ae86.svg"
                  width={24}
                  height={24}
                  alt="image"
                />
              </div>
              <div class="flex flex-col">
                <p class="text-[16px]">(011) 3437-5582</p>
                <p class="text-[12px]">de seg a sex das 09h ás 18h</p>
              </div>
            </div>

            <div class="flex items-center justify-center gap-2 mt-4">
              <div class="flex items-center justify-center">
                <img
                  src="https://tezexb.vtexassets.com/assets/vtex/assets-builder/tezexb.lumini-store-theme/1.9.3/svg/whatsapp___062a7a168ddac7146ac16e2f0087a3aa.png"
                  width={24}
                  height={24}
                  alt="image"
                />
              </div>
              <div class="flex flex-col">
                <p class="text-[16px]">(011) 97387-0784</p>
                <p class="text-[12px]">de seg a sex das 09h ás 18h</p>
              </div>
            </div>
          </div>

          <div class="w-[50px] h-[50px] sm:border-b md:border-r border-solid border-dark-gray lg:mt-7 ml-[100px] lg:ml-0 mb-[25px] lg:mb-0">
          </div>

          <div class="flex flex-col ">
            <div class="flex items-center justify-center gap-2 mt-[38px] ml-[50px]">
              <div class="flex items-center justify-center">
                <img
                  src="https://tezexb.vtexassets.com/assets/vtex/assets-builder/tezexb.lumini-store-theme/1.9.3/svg/email___e92d7ab101986769d3f2c421bba5c0c5.svg"
                  width={24}
                  height={24}
                  alt=""
                />
              </div>
              <div class="flex flex-col">
                <p class="text-[16px]">
                  <a href="mailto:lojavirtual@lumini.com.br">
                    lojavirtual@lumini.com.br
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
