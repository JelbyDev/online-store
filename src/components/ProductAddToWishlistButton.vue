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

<script lang="ts">
import { defineComponent } from "vue";
import { useWishlistStore } from "@/stores/wishlist";

export default defineComponent({
  props: {
    productId: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      default: "small",
    },
  },
  setup() {
    const wishlistStore = useWishlistStore();
    return { wishlistStore };
  },
});
</script>
