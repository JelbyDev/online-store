<script setup lang="ts">
import { useWishlistStore } from "@/stores/wishlist";
import { useProductsList } from "@/composables/useProductsList";
import ProductsList from "@/components/ProductsList.vue";

const wishlistStore = useWishlistStore();
const { products, isLoadingProducts } = useProductsList({
  ids: wishlistStore.getProductsId,
});
</script>

<template>
  <div>
    <app-page-title>Избранные товары</app-page-title>

    <products-list
      :products="products"
      :isLoadingProducts="isLoadingProducts"
      :grid-cools="12"
      :grid-sm="6"
      :grid-md="3"
    ></products-list>
  </div>
</template>
