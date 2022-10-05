import { defineStore } from "pinia";
import { reactive } from "vue";

interface WishlistProduct {
  [index: number]: boolean;
}

export const useWishlistStore = defineStore("wishlist", () => {
  const products = reactive({} as WishlistProduct);

  function toggleProduct(productId: number): void {
    if (products[productId]) {
      delete products[productId];
    } else {
      products[productId] = true;
    }
  }

  function checkProduct(productId: number): boolean {
    if (products[productId]) return true;
    return false;
  }

  return { toggleProduct, checkProduct };
});
