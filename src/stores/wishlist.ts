import { defineStore } from "pinia";
import { reactive, watch } from "vue";
import { setItemInStorage, getItemFromStorage } from "@/utils/Storage";

export const useWishlistStore = defineStore("wishlist", () => {
  const storageProducts = getItemFromStorage("wishlistProducts");
  const defaultProducts = storageProducts ? JSON.parse(storageProducts) : {};

  const products = reactive(defaultProducts);

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

  function getProductsId(): number[] {
    return Object.keys(products).map((product) => +product);
  }

  watch(products, () =>
    setItemInStorage("wishlistProducts", JSON.stringify(products))
  );

  return { getProductsId, toggleProduct, checkProduct };
});
