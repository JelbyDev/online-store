import { defineStore } from "pinia";
import { reactive, watch, computed } from "vue";
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

  function updateProduct(productId: number, quantity: number): void | boolean {
    if (!products[productId]) return false;

    if (quantity === 0) {
      removeProduct(productId);
    } else {
      products[productId] = quantity;
    }
  }

  function removeProduct(productId: number): void {
    if (isInCart(productId)) delete products[productId];
  }

  function isInCart(productId: number): boolean {
    if (products[productId]) return true;
    return false;
  }

  function getProducts(): { [index: number]: number }[] {
    return { ...products };
  }

  const getTotalQuantityProducts = computed(() => {
    const productsQuantity: Array<number> = Object.values(products);
    if (!productsQuantity) return 0;
    return productsQuantity.reduce((totalQuantities, count) => {
      return (totalQuantities += +count);
    }, 0);
  });

  watch(products, () =>
    setItemInStorage("cartProducts", JSON.stringify(products))
  );

  return {
    getProducts,
    addProduct,
    updateProduct,
    removeProduct,
    isInCart,
    getTotalQuantityProducts,
  };
});
