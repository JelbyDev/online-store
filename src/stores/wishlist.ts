import { defineStore } from "pinia";
import { Ref, ref, ComputedRef, computed, watch } from "vue";
import { setItemInStorage, getItemFromStorage } from "@/utils/storage";

export const useWishlistStore = defineStore("wishlist", () => {
  const storageProducts = getItemFromStorage("wishlistProducts");
  const defaultProducts = storageProducts ? JSON.parse(storageProducts) : [];
  const products: Ref<number[]> = ref(defaultProducts);

  function toggleProduct(productId: number): void {
    const foundProductInWishlist = products.value.indexOf(productId);
    if (foundProductInWishlist !== -1) {
      products.value.splice(foundProductInWishlist, 1);
    } else {
      products.value.push(productId);
    }
  }

  function isInWishlist(productId: number): boolean {
    return products.value.includes(productId);
  }

  const getProductsId: ComputedRef<number[]> = computed(() => {
    return [...products.value];
  });

  const getTotalCountProducts = computed(() => {
    return products.value.length;
  });

  watch(
    products,
    () => setItemInStorage("wishlistProducts", JSON.stringify(products.value)),
    { deep: true }
  );

  return { getProductsId, getTotalCountProducts, toggleProduct, isInWishlist };
});
