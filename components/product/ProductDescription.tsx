import type { Product } from "apps/commerce/types.ts";

export interface Props {
  product: Product;
}

function Downloads(
  { downloadLink, downloadImage }: {
    downloadLink?: string;
    downloadImage?: string;
  },
) {
  if (!downloadLink || !downloadImage) return null;

  return (
    <details class="collapse collapse-plus join-item w-full">
      <summary class="collapse-title text-lg md:text-[32px] w-full border-b border-b-lightslategray/60 pb-1.5">
        downloads
      </summary>
      <div class="flex flex-col collapse-content w-full py-4 border-b border-b-lightslategray/60">
        <span>manual de instalação</span>
        <a
          href={downloadLink}
          class="w-[150px] h-10"
        >
          <img
            src={downloadImage}
            width={150}
            height={40}
            loading="lazy"
            alt="Manual de Instalação"
          />
        </a>
      </div>
    </details>
  );
}

function Dimensions(
  { image, imageDescription }: { image?: string; imageDescription?: string },
) {
  return (
    <details class="collapse collapse-plus join-item w-full">
      <summary class="collapse-title text-lg md:text-[32px] w-full border-b border-b-lightslategray/60 pb-1.5">
        dimensões
      </summary>
      <div class="collapse-content w-full py-4 flex border-b border-b-lightslategray/60">
        <img
          src={`https://tezexb.vteximg.com.br${image}`}
          alt={imageDescription}
        />
      </div>
    </details>
  );
}

function Specification(
  { cable, lightSource, materialUsed }: {
    cable?: string;
    lightSource?: string;
    materialUsed?: string;
  },
) {
  return (
    <details class="collapse collapse-plus join-item w-full">
      <summary class="collapse-title text-lg md:text-[32px] w-full border-b border-b-lightslategray/60 pb-1.5">
        especificações
      </summary>
      <div class="collapse-content w-full py-4 flex border-b border-b-lightslategray/60">
        <div class="flex flex-col gap-4 w-full">
          {lightSource && (
            <div class="flex flex-col w-full gap-1">
              <span class="leading-[.04em]">fonte de luz</span>
              <span class="text-gray-normal">
                {lightSource}
              </span>
            </div>
          )}

          {materialUsed && (
            <div class="flex flex-col w-full gap-1">
              <span class="leading-[.04em]">material utilizado</span>
              <span class="text-gray-normal">alumínio pintado e concreto</span>
            </div>
          )}

          {cable && (
            <div class="flex flex-col w-full gap-1">
              <span class="leading-[.04em]">cabo</span>
              <span class="text-gray-normal">
                {cable}
              </span>
            </div>
          )}
        </div>
      </div>
    </details>
  );
}

function Description(
  { designer, description }: { designer?: string; description?: string },
) {
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
            <span class="text-gray-normal">{designer}</span>
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

export default function ProductDescription({ product }: Props) {
  const description = product.description || product.isVariantOf?.description;
  const designer =
    product?.additionalProperty?.find((item) => item.name === "designer")
      ?.value ||
    product?.isVariantOf?.additionalProperty?.find((item) =>
      item.name === "designer"
    )?.value ||
    product?.additionalProperty?.find((item) => item.propertyID === "162")
      ?.value ||
    product?.isVariantOf?.additionalProperty?.find((item) =>
      item.propertyID === "162"
    )?.value;
  const lightSource =
    product?.additionalProperty?.find((item) => item.name === "fonte de luz")
      ?.value ||
    product?.isVariantOf?.additionalProperty?.find((item) =>
      item.name === "fonte de luz"
    )?.value;
  const cable =
    product?.additionalProperty?.find((item) => item.name === "cabo")?.value ||
    product?.isVariantOf?.additionalProperty?.find((item) =>
      item.name === "cabo"
    )?.value;
  const materialUsed =
    product?.additionalProperty?.find((item) =>
      item.name === "material utilizado"
    )?.value || product?.isVariantOf?.additionalProperty?.find((item) =>
      item.name === "material utilizado"
    )?.value;
  const imageValue =
    product?.additionalProperty?.find((item) => item.name === "Imagem")
      ?.value ||
    product?.isVariantOf?.additionalProperty?.find((item) =>
      item.name === "Imagem"
    )?.value;
  const image = imageValue &&
    imageValue.match(/src="([^"]*)"/)?.[1]?.replace(/\\/g, "");
  const imageDescription = imageValue &&
    imageValue.match(/alt="([^"]*)"/)?.[1]?.replace(/\\/g, "");
  const downloadValue =
    product?.additionalProperty?.find((item) =>
      item.name === "manual de instalação"
    )?.value || product?.isVariantOf?.additionalProperty?.find((item) =>
      item.name === "manual de instalação"
    )?.value;
  const downloadLink = downloadValue &&
    downloadValue.match(/href="([^"]*)"/)?.[1]?.replace(/\\/g, "");
  const downloadImage = downloadValue &&
    downloadValue.match(/src="([^"]*)"/)?.[1]?.replace(/\\/g, "");

  return (
    <section class="flex border-t border-t-lightslategray w-full h-full bg-ice-cube pt-4 pb-8">
      <div class="flex flex-col gap-6 w-full mx-auto max-w-[1250px]">
        <Description designer={designer} description={description} />
        <Specification
          materialUsed={materialUsed}
          cable={cable}
          lightSource={lightSource}
        />
        <Dimensions image={image} imageDescription={imageDescription} />
        <Downloads downloadLink={downloadLink} downloadImage={downloadImage} />
      </div>
    </section>
  );
}
