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
                <input
                  type="text"
                  name="floating_first_name"
                  id="floating_first_name"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-black appearance-none focus:outline-none focus:ring-0 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="floating_first_name"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  nome
                </label>
              </div>
              <div class="relative z-0 w-full mb-7 group">
                <input
                  type="text"
                  name="floating_last_name"
                  id="floating_last_name"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-black appearance-none focus:outline-none focus:ring-0 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="floating_last_name"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  telefone
                </label>
              </div>
            </div>
            <div class="grid md:grid-cols-2 md:gap-6">
              <div class="relative z-0 w-full mb-7 group">
                <input
                  type="text"
                  name="floating_first_name"
                  id="floating_first_name"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-black appearance-none focus:outline-none focus:ring-0 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="floating_first_name"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  e-mail
                </label>
              </div>
              <div class="relative z-0 w-full mb-7 group">
                <input
                  type="text"
                  name="floating_last_name"
                  id="floating_last_name"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-black appearance-none focus:outline-none focus:ring-0 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="floating_last_name"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  código do pedido, caso exista
                </label>
              </div>
            </div>
            <div class="z-0 w-full mb-7 group">
              <label
                for="countries"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                assunto
              </label>
              <select
                id="countries"
                class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm py-2"
              >
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
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                mensagem
              </label>
              <textarea
                id="message"
                rows={10}
                cols={100}
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-black"
                placeholder="insira sua mensagem"
              >
              </textarea>
            </div>
            <div class="flex items-center justify-end mb-7 lg:mb-2">
              <button
                type="submit"
                class="text-white bg-[#f5be32f5] hover:bg-[#ffcb49] hover:ring-2 hover:ring-[#f5be32] font-medium text-sm w-full sm:w-auto px-28 py-2.5 text-center"
              >
                enviar
              </button>
            </div>
          </form>
          <div class="max-w-sm h-full flex flex-col items-start justify-start gap-4 text-sm mb-2 lg:mb-0">
            <div>
              <p class="text-base font-bold">
                contatos
              </p>
            </div>
            <div>
              <p>
                loja virtual
              </p>
              <p>
                segunda à sexta das 9h30 às 18h
              </p>
              <p>
                +55 11 3437 5582
              </p>
              <p>
                lojavirtual@lumini.com.br
              </p>
            </div>
            <div>
              <p>
                showroom são paulo
              </p>
              <p>
                al gabriel monteiro da silva, 1441
              </p>
              <p>
                +55 11 3898 0222
              </p>
              <p>
                lojasp@lumini.com.br
              </p>
            </div>
            <div>
              <p>
                showroom rio de janeiro
              </p>
              <p>
                casa shopping
              </p>
              <p>
                +55 21 3325 4959
              </p>
              <p>
                lojario@lumini.com.br
              </p>
            </div>
            <div>
              <p>
                showroom campinas
              </p>
              <p>
                rua américo brasiliense, 45
              </p>
              <p>
                +55 19 3251 6362
              </p>
              <p>
                lojacampinas@lumini.com.br
              </p>
            </div>
            <div>
              <p>
                corporativo são paulo
              </p>
              <p>
                +55 11 4780 9922
              </p>
              <p>
                +55 11 3437 5555
              </p>
              <p>
                corporativosp@lumini.com.br
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
