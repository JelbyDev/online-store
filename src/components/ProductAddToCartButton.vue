<template>
  <v-btn
    v-if="text"
    @click="cartStore.addProduct(product, quantity, updateQuantity)"
    :color="cartStore.isInCart(product.id) ? 'success' : 'surface-variant'"
    :size="size"
    :loading="cartStore.getIsCartLoading"
    variant="tonal"
    prepend-icon="mdi-cart-arrow-down"
    >{{ text }}
  </v-btn>
  <v-btn
    v-else
    @click="cartStore.addProduct(product, quantity, updateQuantity)"
    :color="cartStore.isInCart(product.id) ? 'success' : 'surface-variant'"
    :size="size"
    :loading="cartStore.getIsCartLoading"
    variant="tonal"
    icon="mdi-cart-arrow-down"
  >
  </v-btn>
</template>

<script lang="ts">
import { Product } from "@/types";
import { defineComponent, PropType } from "vue";
import { useCartStore } from "@/stores/cart";

export default defineComponent({
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    updateQuantity: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "small",
    },
    text: {
      type: String,
      default: "",
    },
  },
  setup() {
    const cartStore = useCartStore();

    return { cartStore };
  },
});
</script>
