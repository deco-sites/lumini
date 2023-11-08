export interface Props {
  description?: string;
}

function Downloads() {
  return (
    <details class="collapse collapse-plus join-item w-full">
      <summary class="collapse-title text-lg md:text-[32px] w-full border-b border-b-lightslategray/60 pb-1.5">
        downloads
      </summary>
      <div class="flex flex-col collapse-content w-full py-4 border-b border-b-lightslategray/60">
        <span>manual de instalação</span>
        <a
          href="https://www.dropbox.com/s/ggufkyps9tl7r06/gap%20s_manual%20de%20instala%C3%A7%C3%A3o.pdf?dl=0"
          class="w-[150px] h-10"
        >
          <img
            src="https://tezexb.vteximg.com.br/arquivos/btn-downlaod.png"
            width={150}
            height={40}
            alt="Manual de Instalação"
          />
        </a>
      </div>
    </details>
  );
}

function Dimensions() {
  return (
    <details class="collapse collapse-plus join-item w-full">
      <summary class="collapse-title text-lg md:text-[32px] w-full border-b border-b-lightslategray/60 pb-1.5">
        dimensões
      </summary>
      <div class="collapse-content w-full py-4 flex border-b border-b-lightslategray/60">
        <img
          src="https://lojavirtual.lumini.com.br/arquivos/gap_cota.png"
          alt="Foto Dimensões Luminária"
        />
      </div>
    </details>
  );
}

function Specification() {
  return (
    <details class="collapse collapse-plus join-item w-full">
      <summary class="collapse-title text-lg md:text-[32px] w-full border-b border-b-lightslategray/60 pb-1.5">
        especificações
      </summary>
      <div class="collapse-content w-full py-4 flex border-b border-b-lightslategray/60">
        <div class="flex flex-col gap-4 w-full">
          <div class="flex flex-col w-full gap-1">
            <span class="leading-[.04em]">fonte de luz</span>
            <span class="text-gray-normal">
              módulo led 9w (direto) + 15w (indireto) | 2700k - incluso
            </span>
          </div>

          <div class="flex flex-col w-full gap-1">
            <span class="leading-[.04em]">material utilizado</span>
            <span class="text-gray-normal">alumínio pintado e concreto</span>
          </div>
        </div>
      </div>
    </details>
  );
}

function Description({ description }: { description?: string }) {
  return (
    <details class="collapse collapse-plus join-item w-full">
      <summary class="collapse-title text-lg md:text-[32px] w-full border-b border-b-lightslategray/60 pb-1.5">
        descrição
      </summary>
      <div class="collapse-content w-full py-4 flex flex-row justify-between border-b border-b-lightslategray/60">
        <div class="flex flex-col gap-4 w-full">
          <div class="flex flex-col w-full gap-1">
            <span class="leading-[.04em]">fabricante</span>
            <span class="text-gray-normal">lumini, brasil</span>
          </div>

          <div class="flex flex-col w-full gap-1">
            <span class="leading-[.04em]">designer</span>
            <span class="text-gray-normal">claudia moreira salles</span>
          </div>
        </div>

        <div class="flex flex-col gap-1 w-full">
          <h2 class="text-darkslategray">sobre o produto</h2>
          <div
            class="contents text-gray-normal"
            dangerouslySetInnerHTML={{ __html: description || "" }}
          />
        </div>
      </div>
    </details>
  );
}

export default function ProductDescription({ description }: Props) {
  return (
    <section class="flex border-t border-t-lightslategray w-full h-full bg-ice-cube pt-4 pb-8">
      <div class="flex flex-col gap-2.5 w-full mx-auto max-w-[1250px]">
        <Description description={description} />
        <Specification />
        <Dimensions />
        <Downloads />
      </div>
    </section>
  );
}
