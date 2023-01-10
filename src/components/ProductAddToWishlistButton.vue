<script setup lang="ts">
import { defineProps, withDefaults } from "vue";
import { useWishlistStore } from "@/stores/wishlist";

withDefaults(
  defineProps<{
    productId: number;
    size?: string;
  }>(),
  {
    size: "small",
  }
);

const wishlistStore = useWishlistStore();
</script>

<template>
  <v-btn
    @click="wishlistStore.toggleProduct(productId)"
    :color="
      wishlistStore.isInWishlist(productId) ? 'success' : 'surface-variant'
    "
    :size="size"
    variant="tonal"
    icon="mdi-heart"
  ></v-btn>
</template>
