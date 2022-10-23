<template>
  <div>
    <app-page-title>Избранные товары</app-page-title>
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
import { defineComponent, Ref, ref, onMounted } from "vue";
import { getProducts } from "@/api/Product";
import { useWishlistStore } from "@/stores/wishlist";

import ProductList from "@/components/ProductList.vue";

export default defineComponent({
  components: { ProductList },
  setup() {
    const wishlistStore = useWishlistStore();

    const products: Ref<Product[]> = ref([]);

    onMounted(() => {
      if (wishlistStore.getProductsId.length > 0) {
        getProducts(undefined, undefined, undefined, {
          ids: wishlistStore.getProductsId,
        }).then((prod) => (products.value = [...prod.products]));
      }
    });

    return {
      products,
    };
  },
});
</script>

<style lang="scss"></style>
