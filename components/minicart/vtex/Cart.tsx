import { itemToAnalyticsItem, useCart } from "apps/vtex/hooks/useCart.ts";
import BaseCart from "../common/Cart.tsx";
import { invoke } from "$store/runtime.ts";
import { useEffect, useState } from "preact/compat";

function Cart() {
  const { cart, loading, updateItems, addCouponsToCart } = useCart();
  const { items, totalizers } = cart.value ?? { items: [] };
  const total = totalizers?.find((item) => item.id === "Items")?.value || 0;
  const discounts =
    totalizers?.find((item) => item.id === "Discounts")?.value || 0;
  const locale = cart.value?.clientPreferencesData.locale ?? "pt-BR";
  const currency = cart.value?.storePreferencesData.currencyCode ?? "BRL";
  const coupon = cart.value?.marketingData?.coupon ?? undefined;

  // const [additionalPropertiesMap, setAdditionalPropertiesMap] = useState([]);

  // useEffect(() => {
  //   async function getData() {
  //     if (!items || items.length === 0) return;

  //     const ids = items.map(item => item.id);

  //     const data = await invoke.vtex.loaders.intelligentSearch.productList({
  //       props: {
  //         ids,
  //         count: 10
  //       }
  //     });

  //     const map = data?.reduce((result, product) => {
  //       result = product?.isVariantOf?.hasVariant || [];

  //       return result;
  //     }, []);

  //     setAdditionalPropertiesMap(map || []);
  //   }

  //   getData();
  // }, [items]);

  return (
    <BaseCart
      items={items.map((item) => {
        const productCategoriesArray = Object.values(item.productCategories);
        const categoryName =
          productCategoriesArray[productCategoriesArray.length - 1] ?? null;

        // const additionalProperties = additionalPropertiesMap || [];

        return {
          image: { src: item.imageUrl, alt: item.skuName },
          quantity: item.quantity,
          name: categoryName || item.name,
          additionalProperty: [],
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
