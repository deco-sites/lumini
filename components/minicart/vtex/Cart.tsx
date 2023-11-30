import { itemToAnalyticsItem, useCart } from "apps/vtex/hooks/useCart.ts";
import BaseCart from "../common/Cart.tsx";
import { invoke } from "$store/runtime.ts";
import { useEffect, useState } from "preact/compat";
import { Product } from "apps/commerce/types.ts";

function Cart() {
  const { cart, loading, updateItems, addCouponsToCart } = useCart();
  const { items, totalizers } = cart.value ?? { items: [] };
  const total = totalizers?.find((item) => item.id === "Items")?.value || 0;
  const discounts =
    totalizers?.find((item) => item.id === "Discounts")?.value || 0;
  const locale = cart.value?.clientPreferencesData.locale ?? "pt-BR";
  const currency = cart.value?.storePreferencesData.currencyCode ?? "BRL";
  const coupon = cart.value?.marketingData?.coupon ?? undefined;

  const [newProperties, setNewProperties] = useState<Product[] | null>([]);

  useEffect(() => {
    async function getData() {
      if (!items || items.length === 0) return;

      const ids = items.map((item) => item.id);

      const data = await invoke.vtex.loaders.intelligentSearch.productList({
        props: {
          ids,
          count: items.length,
        },
      });

      if (data) {
        setNewProperties(data);
      }
    }

    getData();
  }, [items]);

  return (
    <BaseCart
      items={items.map((item) => {
        const productCategoriesArray = Object.values(item.productCategories);
        const categoryName =
          productCategoriesArray[productCategoriesArray.length - 1] ?? null;

        const correspondingProduct = newProperties?.find(
          (product) => product.inProductGroupWithID === item.productId,
        ) || null;

        const matcherItem = correspondingProduct?.isVariantOf?.hasVariant?.find(
          (filteredProduct) => filteredProduct.productID === item.id,
        ) || null;

        return {
          image: { src: item.imageUrl, alt: item.skuName },
          quantity: item.quantity,
          name: categoryName || item.name,
          additionalProperty: matcherItem?.additionalProperty || [],
          price: {
            sale: item.sellingPrice / 100,
            list: item.listPrice / 100,
          },
        };
      })}
      total={(total + discounts) / 100}
      subtotal={total / 100}
      discounts={discounts / 100}
      locale={locale}
      currency={currency}
      loading={loading.value}
      freeShippingTarget={1000}
      coupon={coupon}
      onAddCoupon={(text) => addCouponsToCart({ text })}
      onUpdateQuantity={(quantity, index) =>
        updateItems({ orderItems: [{ index, quantity }] })}
      itemToAnalyticsItem={(index) => {
        const item = items[index];
        return item && itemToAnalyticsItem({ ...item, coupon }, index);
      }}
      checkoutHref="/checkout"
    />
  );
}

export default Cart;
