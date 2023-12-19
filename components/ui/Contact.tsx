export default function Contact() {
  return (
    <section class="w-full h-full flex items-center justify-center font-univers-next-pro-regular px-4 lg:p-0">
      <div class="max-w-[1296px] container w-full h-full flex flex-col items-center justify-between">
        <div class="w-full h-full flex items-center justify-center my-14">
          <h1 class="text-[32px]">atendimento loja virtual</h1>
        </div>

        <div class="w-full flex flex-col lg:flex-row items-start justify-between">
          <form class="max-w-3xl">
            <div class="grid md:grid-cols-2 md:gap-6">
              <div class="relative z-0 w-full mb-7 group">
                  <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-black appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                  <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">nome</label>
              </div>
              <div class="relative z-0 w-full mb-7 group">
                  <input type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-black appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                  <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">telefone</label>
              </div>
            </div>
            <div class="grid md:grid-cols-2 md:gap-6">
              <div class="relative z-0 w-full mb-7 group">
                  <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-black appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                  <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">e-mail</label>
              </div>
              <div class="relative z-0 w-full mb-7 group">
                  <input type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-black appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                  <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">código do pedido, caso exista</label>
              </div>
            </div>
            <div class="z-0 w-full mb-7 group">
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">assunto</label>
                  <select id="countries" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm py-2">
                    <option>selecione</option>
                    <option>informações sobre pedido</option>
                    <option>prazo de entrega</option>
                    <option>cancelamento</option>
                    <option>trocas e devoluções</option>
                    <option>sugestão</option>
                    <option>reclamação</option>
                    <option>outros</option>
                  </select>
            </div>
            <div class="relative z-0 w-full mb-7 max-w-3xl mx-auto group">
              <label for="message" class="block mb-2 text-sm font-medium text-gray-900">mensagem</label>
              <textarea id="message" rows={10} cols={100} class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-black" placeholder="insira sua mensagem"></textarea>
            </div>
            <div class="flex items-center justify-end mb-7 lg:mb-2"> 
              <button type="submit" class="text-white bg-[#f5be32f5] hover:bg-[#ffcb49] hover:ring-2 hover:ring-[#f5be32] font-medium text-sm w-full sm:w-auto px-28 py-2.5 text-center">enviar</button>
            </div> 
          </form>
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
                    <p class="text-base">(011) 3437-5582</p>
                    <p class="text-xs">de seg a sex das 09h ás 18h</p>
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
                    <p class="text-base">(011) 97387-0784</p>
                    <p class="text-xs">de seg a sex das 09h ás 18h</p>
                  </div>
                </div>
              </div>

              <div class="w-[25px] h-[25px] md:w-[50px] md:h-[50px] border-b md:border-b-0 md:border-r border-solid border-dark-gray lg:mt-7 ml-[100px] lg:ml-0 mb-[0px] lg:mb-0">
              </div>

              <div class="flex flex-col">
                <div class="flex items-center justify-center gap-2 mt-10 md:ml-10">
                  <div class="flex items-center justify-center ">
                    <img
                      src="https://tezexb.vtexassets.com/assets/vtex/assets-builder/tezexb.lumini-store-theme/1.9.3/svg/email___e92d7ab101986769d3f2c421bba5c0c5.svg"
                      width={24}
                      height={24}
                      alt="image"
                    />
                  </div>
                  <div class="flex flex-col">
                    <p class="text-base">
                      <a href="mailto:lojavirtual@lumini.com.br">
                        lojavirtual@lumini.com.br
                      </a>
                    </p>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
