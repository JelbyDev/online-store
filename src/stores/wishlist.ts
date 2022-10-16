import { defineStore } from "pinia";
import { Ref, ref, ComputedRef, computed } from "vue";

export const useWishlistStore = defineStore("wishlist", () => {
  const products: Ref<number[]> = ref([]);

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

  return { getProductsId, getTotalCountProducts, toggleProduct, isInWishlist };
});
