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
    <details class="collapse collapse-plus join-item w-full font-univers-next-pro-regular leading-[18px] text-darkslategray">
      <summary class="collapse-title text-lg md:text-[32px] w-full border-b border-b-lightslategray/60 pb-1.5">
        downloads
      </summary>
      <div class="flex flex-col collapse-content w-full py-4 border-b border-b-lightslategray/60">
        <span class="leading-[18px] font-medium">manual de instalação</span>
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
    <details class="collapse collapse-plus join-item w-full font-univers-next-pro-regular leading-[18px] text-darkslategray">
      <summary class="collapse-title text-lg md:text-[32px] w-full border-b border-b-lightslategray/60 pb-1.5">
        dimensões
      </summary>
      <div class="collapse-content w-full py-4 flex border-b border-b-lightslategray/60">
        <img
          src={`https://tezexb.vteximg.com.br${image}`}
          alt={imageDescription}
          loading="lazy"
        />
      </div>
    </details>
  );
}

function Specification(
  { cable, lightSource, materialUsed, weight, obs, dimmable }: {
    cable?: string;
    weight?: string;
    lightSource?: string;
    materialUsed?: string;
    obs?: string;
    dimmable?: string;
  },
) {
  return (
    <details class="collapse collapse-plus join-item w-full font-univers-next-pro-regular leading-[18px] text-darkslategray">
      <summary class="collapse-title text-lg md:text-[32px] w-full border-b border-b-lightslategray/60 pb-1.5">
        especificações
      </summary>
      <div class="collapse-content w-full py-8 flex border-b border-b-lightslategray/60">
        <div class="flex flex-col gap-4 w-full">
          {lightSource && (
            <div class="flex flex-col w-full gap-1">
              <span class="leading-[18px] pb-0.5">fonte de luz</span>
              <span class="text-gray-normal/80 font-light font-univers-next-pro-light">
                {lightSource}
              </span>
            </div>
          )}

          {dimmable && (
            <div class="flex flex-col w-full gap-1">
              <span class="leading-[18px] pb-0.5">dimerizável</span>
              <span class="text-gray-normal/80 font-light font-univers-next-pro-light">
                {dimmable}
              </span>
            </div>
          )}

          {materialUsed && (
            <div class="flex flex-col w-full gap-1">
              <span class="leading-[18px] pb-0.5">material utilizado</span>
              <span class="text-gray-normal/80 font-light font-univers-next-pro-light">
                {materialUsed}
              </span>
            </div>
          )}

          {weight && (
            <div class="flex flex-col w-full gap-1">
              <span class="leading-[18px] pb-0.5">peso</span>
              <span class="text-gray-normal/80 font-light font-univers-next-pro-light">
                {weight}
              </span>
            </div>
          )}

          {obs && (
            <div class="flex flex-col w-full gap-1">
              <span class="leading-[18px] pb-0.5">obs</span>
              <span class="text-gray-normal/80 font-light font-univers-next-pro-light">
                {obs}
              </span>
            </div>
          )}

          {cable && (
            <div class="flex flex-col w-full gap-1">
              <span class="leading-[18px] pb-0.5">cabo</span>
              <span class="text-gray-normal/80 font-light font-univers-next-pro-light">
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
    <details
      open={true}
      class="collapse collapse-plus join-item w-full font-univers-next-pro-regular leading-[18px] text-darkslategray"
    >
      <summary class="collapse-title text-lg md:text-[32px] w-full border-b border-b-lightslategray/60 pb-1.5">
        descrição
      </summary>
      <div class="collapse-content w-full py-4 flex flex-row justify-between gap-3 border-b border-b-lightslategray/60">
        <div class="flex flex-col gap-4 w-full">
          <div class="flex flex-col w-full gap-1">
            <span class="leading-[18px]">fabricante</span>
            <span class="text-gray-normal/80 font-light font-univers-next-pro-light">
              lumini, brasil
            </span>
          </div>

          <div class="flex flex-col w-full gap-1">
            <span class="leading-[18px]">designer</span>
            <span class="text-gray-normal/80 font-light font-univers-next-pro-light">
              {designer}
            </span>
          </div>
        </div>

        <div class="flex flex-col gap-1 max-w-[856px]">
          <h2 class="text-darkslategray pb-1.5">sobre o produto</h2>
          <div
            class="text-gray-normal/80 font-light font-univers-next-pro-light text-justify"
            dangerouslySetInnerHTML={{ __html: description || "" }}
          />
        </div>
      </div>
    </details>
  );
}

export default function ProductDescription({ product }: Props) {
  function getProperty(product: Product, propertyName: string) {
    return (
      product?.additionalProperty?.find((item) => item.name === propertyName)
        ?.value ||
      product?.isVariantOf?.additionalProperty?.find((item) =>
        item.name === propertyName
      )?.value
    );
  }

  function getImageInfo(property?: string | null) {
    if (!property) return { image: undefined, imageDescription: undefined };

    const image = property?.match(/src="([^"]*)"/)?.[1]?.replace(/\\/g, "");
    const imageDescription = property?.match(/alt="([^"]*)"/)?.[1]?.replace(
      /\\/g,
      "",
    );

    return { image, imageDescription };
  }

  function getDownloadInfo(property?: string | null) {
    if (!property) return { downloadLink: undefined, downloadImage: undefined };

    const downloadLink = property?.match(/href="([^"]*)"/)?.[1]?.replace(
      /\\/g,
      "",
    );
    const downloadImage = property?.match(/src="([^"]*)"/)?.[1]?.replace(
      /\\/g,
      "",
    );

    return { downloadLink, downloadImage };
  }

  const description = product.description || product.isVariantOf?.description;
  const designer = getProperty(product, "designer") ||
    getProperty(product, "162");
  const lightSource = getProperty(product, "fonte de luz");
  const cable = getProperty(product, "cabo");
  const weight = getProperty(product, "peso");
  const dimmable = getProperty(product, "dimerizável");
  const obs = getProperty(product, "obs");
  const materialUsed = getProperty(product, "material utilizado");
  const imageValue = getProperty(product, "Imagem");
  const { image, imageDescription } = getImageInfo(imageValue);
  const downloadValue = getProperty(product, "manual de instalação");
  const { downloadLink, downloadImage } = getDownloadInfo(downloadValue);

  return (
    <section class="flex border-t border-t-lightslategray/60 w-full h-full bg-ice-cube pt-4 pb-8">
      <div class="flex flex-col gap-2 md:gap-4 lg:gap-8 w-full mx-auto max-w-[1250px]">
        <Description designer={designer} description={description} />
        <Specification
          dimmable={dimmable}
          obs={obs}
          weight={weight}
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
