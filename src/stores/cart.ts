import { defineStore } from "pinia";
import { reactive } from "vue";

interface CartProduct {
  [index: number]: number;
}

export const useCartStore = defineStore("cart", () => {
  const products = reactive({} as CartProduct);

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
    const productsQuantity = Object.values(products);
    if (!productsQuantity) return 0;
    return productsQuantity.reduce((totalQuantities, count) => {
      return (totalQuantities += +count);
    }, 0);
  }

  return { addProduct, removeProduct, checkProduct, getQuantityProducts };
});
