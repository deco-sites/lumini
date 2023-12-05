import { ExtensionOf } from "apps/website/loaders/extension.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";

export interface Props {
  activeProductInventory?: boolean;
}

export default function productInventory(
  { activeProductInventory }: Props,
): ExtensionOf<ProductDetailsPage | null> {
  return (p: ProductDetailsPage | null) => {
    if (!p) return null;

    if (activeProductInventory && p.product.offers?.offers) {
      const modifiedOffers = p.product.offers.offers.map((offer) => {
        return {
          ...offer,
          inventoryLevel: {
            value: 1000000,
          },
        };
      });

      return {
        ...p,
        product: {
          ...p.product,
          offers: {
            ...p.product.offers,
            offers: modifiedOffers,
          },
        },
      };
    }

    return p;
  };
}
