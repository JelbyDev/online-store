import { defineStore } from "pinia";
import { reactive, watch } from "vue";
import { setItemInStorage, getItemFromStorage } from "@/utils/Storage";

export const useCartStore = defineStore("cart", () => {
  const storageProducts = getItemFromStorage("cartProducts");
  const defaultProducts = storageProducts ? JSON.parse(storageProducts) : {};

  const products = reactive(defaultProducts);

  function addProduct(productId: number): void {
    if (products[productId]) {
      products[productId] += 1;
    } else {
      products[productId] = 1;
    }
  }

  function removeProduct(productId: number): void {
    if (checkProduct(productId)) delete products[productId];
  }

  function checkProduct(productId: number): boolean {
    if (products[productId]) return true;
    return false;
  }

  function getQuantityProducts(): number {
    const productsQuantity: Array<number> = Object.values(products);
    if (!productsQuantity) return 0;
    return productsQuantity.reduce((totalQuantities, count) => {
      return (totalQuantities += +count);
    }, 0);
  }

  watch(products, () =>
    setItemInStorage("cartProducts", JSON.stringify(products))
  );

  return { addProduct, removeProduct, checkProduct, getQuantityProducts };
});
