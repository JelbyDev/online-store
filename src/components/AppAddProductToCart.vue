<template>
  <v-btn
    @click="cartStore.addProduct(product, quantity, updateQuantity)"
    :color="cartStore.isInCart(product.id) ? 'success' : 'surface-variant'"
    size="small"
    variant="tonal"
    icon="mdi-cart-arrow-down"
  ></v-btn>
</template>

<script lang="ts">
import { Product } from "@/types";
import { defineComponent } from "vue";
import { useCartStore } from "@/stores/cart";

export default defineComponent({
  name: "app-add-product-to-cart",
  props: {
    product: {
      type: Object,
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
  },
  product: {
    validator: (value: Product) => {
      return value as Product;
    },
  },
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
});
</script>

<style scoped></style>
