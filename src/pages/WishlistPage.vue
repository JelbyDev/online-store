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

<script lang="ts">
import { defineComponent } from "vue";
import { useWishlistStore } from "@/stores/wishlist";
import { useProductsList } from "@/hooks/useProductsList";
import ProductsList from "@/components/ProductsList.vue";

export default defineComponent({
  components: { ProductsList },
  setup() {
    const wishlistStore = useWishlistStore();
    const { products, isLoadingProducts } = useProductsList({
      ids: wishlistStore.getProductsId,
    });

    return {
      products,
      isLoadingProducts,
    };
  },
});
</script>
