import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import ProductVariations from "$store/islands/ProductVariations.tsx";

interface Props {
  product: Product;
}

function VariantSelector({ product }: Props) {
  if (!product) return null;

  const { url, isVariantOf } = product;
  const possibilities = useVariantPossibilities(product);

  const colorPossibilities = possibilities["cor"] || possibilities["COR"] || {};
  const excludedKeys = [
    "cor",
    "COR",
    "category",
    "cluster",
    "RefId",
  ];

  return (
    <ProductVariations
      isVariantOf={isVariantOf}
      colorPossibilities={colorPossibilities}
      possibilities={possibilities}
      excludedKeys={excludedKeys}
    />
  );
}

export default VariantSelector;
