<template>
  <v-btn
    @click="wishlistStore.toggleProduct(productId)"
    :color="wishlistStore.isInWishlist(productId) ? 'green' : 'surface-variant'"
    size="small"
    variant="tonal"
    icon="mdi-heart"
  ></v-btn>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useWishlistStore } from "@/stores/wishlist";

export default defineComponent({
  name: "app-add-product-to-wishlist",
  props: {
    productId: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const wishlistStore = useWishlistStore();
    return { wishlistStore };
  },
});
</script>

<style scoped></style>
