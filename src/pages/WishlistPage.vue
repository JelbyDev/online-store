<template>
  <div>
    <h1 class="text-h3 mb-3">Избранные товары</h1>

    <product-list
      :products="products"
      :grid-cools="12"
      :grid-sm="6"
      :grid-md="3"
    ></product-list>
  </div>
</template>

<script lang="ts">
import { Product } from "@/types";
import { defineComponent, ref, onMounted } from "vue";
import { getWishlistProducts } from "@/api/Wishlist";
import { useWishlistStore } from "@/stores/wishlist";

import ProductList from "@/components/ProductList.vue";

export default defineComponent({
  components: { ProductList },
  setup() {
    const wishlistStore = useWishlistStore();

    const products = ref([] as Product[]);

    onMounted(() => {
      getWishlistProducts(wishlistStore.getProductsId()).then(
        (prod) => (products.value = [...prod])
      );
    });

    return {
      products,
    };
  },
});
</script>

<style lang="scss"></style>
