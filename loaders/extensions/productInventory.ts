import { ExtensionOf } from "apps/website/loaders/extension.ts";
import { Product, ProductDetailsPage } from "apps/commerce/types.ts";

export interface Props {
  activeProductInventory?: boolean;
}

async function getProductInventory(
  { productId, skuId }: { productId: string; skuId: string },
) {
  const data = await fetch(
    `https://tezexb.vtexcommercestable.com.br/api/catalog_system/pub/products/offers/${productId}/sku/${skuId}`,
  )
    .then((response) => response.json());

  return data[0].Offers[0].OffersPerSalesChannel[0].AvailableQuantity;
}

const modifyInventory = async (variant: Product): Promise<Product> => {
  if (!variant.offers?.offers) {
    return variant;
  }

  const modifiedOffers = await Promise.all(
    variant.offers.offers.map(async (offer) => {
      const inventoryLevel = await getProductInventory({
        productId: variant.inProductGroupWithID || "",
        skuId: variant.sku || "",
      });

      return {
        ...offer,
        inventoryLevel: {
          value: inventoryLevel,
        },
      };
    }),
  );

  return {
    ...variant,
    offers: {
      ...variant.offers,
      offers: modifiedOffers,
    },
  };
};

const modifyProduct = async (product: Product): Promise<Product> => {
  if (product.isVariantOf?.hasVariant) {
    const modifiedVariantOffers = await Promise.all(
      product.isVariantOf.hasVariant.map(async (variant) =>
        await modifyInventory(variant)
      ),
    );

    return {
      ...product,
      isVariantOf: {
        ...product.isVariantOf,
        hasVariant: modifiedVariantOffers,
      },
    };
  }

  return product;
};

export default function productInventory(
  { activeProductInventory }: Props,
): ExtensionOf<ProductDetailsPage | null> {
  return async (p: ProductDetailsPage | null) => {
    if (!p) return null;

    if (activeProductInventory) {
      try {
        return {
          ...p,
          product: await modifyProduct(p.product),
        };
      } catch (error) {
        console.error("Erro ao modificar o produto:", error);
        return p;
      }
    }

    return p;
  };
}
